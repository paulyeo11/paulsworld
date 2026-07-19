// Netlify Functions port of api/td.js (the Vercel version). Same logic — Yahoo Finance
// proxy with crumb auth, Stooq fallback for the full=1 chart-history path — adapted to
// Netlify's handler signature: (event) -> {statusCode, headers, body} instead of Vercel's
// (req, res). Deployed as a parallel test site to check whether Vercel or the deploy
// pipeline itself was the reason recent pushes weren't reaching production.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function getCrumb() {
  const r1 = await fetch('https://finance.yahoo.com/', {
    headers: { 'User-Agent': UA, 'Accept': 'text/html' },
    redirect: 'follow',
  });
  const cookies = r1.headers.get('set-cookie') || '';
  const cookieHeader = cookies.split(',').map((c) => c.split(';')[0].trim()).join('; ');
  const r2 = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': UA, 'Cookie': cookieHeader },
  });
  const crumb = await r2.text();
  return { crumb: crumb.trim(), cookie: cookieHeader };
}

async function fetchStooqDaily(symbol) {
  const url = `https://stooq.com/q/d/l/?s=${encodeURIComponent(symbol.toLowerCase())}.us&i=d`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error('stooq_bad_response');
  const text = await r.text();
  const lines = text.trim().split('\n');
  if (lines.length < 3 || !/^Date,/.test(lines[0])) throw new Error('stooq_no_data');
  const closes = lines.slice(1).map((line) => parseFloat(line.split(',')[4])).filter((c) => !isNaN(c));
  if (closes.length < 2) throw new Error('stooq_insufficient');
  const recent = closes.slice(-252);
  return {
    price: closes[closes.length - 1],
    prevClose: closes[closes.length - 2],
    fiftyTwoWeekHigh: Math.max.apply(null, recent),
    fiftyTwoWeekLow: Math.min.apply(null, recent),
    closes: closes.slice(-135),
  };
}

exports.handler = async function (event) {
  const params = event.queryStringParameters || {};
  const symbols = String(params.symbols || '')
    .split(',').map((s) => s.trim()).filter(Boolean).slice(0, 40);
  if (!symbols.length) {
    return { statusCode: 400, body: JSON.stringify({ error: 'no_symbols' }) };
  }

  let crumbPromise = null;
  function ensureCrumb() {
    if (!crumbPromise) crumbPromise = getCrumb().catch(() => ({ crumb: '', cookie: '' }));
    return crumbPromise;
  }

  const out = {};
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 's-maxage=20, stale-while-revalidate=40' };

  if (params.full === '1') {
    const range = String(params.range || '6mo');
    await Promise.all(symbols.map(async (sym) => {
      if (!/[.=]/.test(sym)) {
        try {
          const s = await fetchStooqDaily(sym);
          out[sym] = { price: s.price, prevClose: s.prevClose, fiftyTwoWeekHigh: s.fiftyTwoWeekHigh, fiftyTwoWeekLow: s.fiftyTwoWeekLow, currency: 'USD', closes: s.closes, _src: 'stooq' };
          return;
        } catch (_) { /* fall through to Yahoo below */ }
      }
      const { crumb, cookie } = await ensureCrumb();
      const baseHeaders = { 'User-Agent': UA, 'Accept': 'application/json' };
      if (cookie) baseHeaders['Cookie'] = cookie;
      for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
        try {
          const crumbParam = crumb ? `&crumb=${encodeURIComponent(crumb)}` : '';
          const url = `https://${host}/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=${encodeURIComponent(range)}${crumbParam}`;
          const r = await fetch(url, { headers: baseHeaders });
          const j = await r.json();
          const result = j?.chart?.result?.[0];
          const m = result?.meta;
          if (m?.regularMarketPrice != null) {
            const closes = (result?.indicators?.quote?.[0]?.close || []).filter((c) => typeof c === 'number');
            out[sym] = {
              price: m.regularMarketPrice,
              prevClose: m.chartPreviousClose ?? m.previousClose ?? null,
              fiftyTwoWeekHigh: m.fiftyTwoWeekHigh ?? null,
              fiftyTwoWeekLow: m.fiftyTwoWeekLow ?? null,
              currency: m.currency ?? null,
              closes,
              _src: 'yahoo',
            };
            return;
          }
        } catch (_) {}
      }
      out[sym] = { error: true };
    }));
    return { statusCode: 200, headers, body: JSON.stringify(out) };
  }

  const { crumb, cookie } = await ensureCrumb();
  const baseHeaders = { 'User-Agent': UA, 'Accept': 'application/json' };
  if (cookie) baseHeaders['Cookie'] = cookie;

  try {
    const crumbParam = crumb ? `&crumb=${encodeURIComponent(crumb)}` : '';
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(','))}${crumbParam}&fields=regularMarketPrice,regularMarketPreviousClose,currency,earningsTimestamp,earningsTimestampStart,earningsTimestampEnd`;
    const r = await fetch(url, { headers: baseHeaders });
    if (r.ok) {
      const j = await r.json();
      const quotes = j?.quoteResponse?.result;
      if (quotes && quotes.length > 0) {
        const seen = new Set();
        for (const q of quotes) {
          if (q.regularMarketPrice != null) {
            const earn = q.earningsTimestampStart ?? q.earningsTimestamp ?? null;
            out[q.symbol] = { price: q.regularMarketPrice, prevClose: q.regularMarketPreviousClose ?? null, currency: q.currency ?? null, name: q.shortName ?? q.longName ?? null, earningsDate: earn ? earn * 1000 : null };
            seen.add(q.symbol);
          }
        }
        for (const s of symbols) if (!seen.has(s)) out[s] = { error: true };
        return { statusCode: 200, headers, body: JSON.stringify(out) };
      }
    }
  } catch (_) {}

  await Promise.all(symbols.map(async (sym) => {
    for (const host of ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']) {
      try {
        const crumbParam = crumb ? `&crumb=${encodeURIComponent(crumb)}` : '';
        const url = `https://${host}/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d${crumbParam}`;
        const r = await fetch(url, { headers: baseHeaders });
        const j = await r.json();
        const m = j?.chart?.result?.[0]?.meta;
        if (m?.regularMarketPrice != null) {
          out[sym] = { price: m.regularMarketPrice, prevClose: m.chartPreviousClose ?? m.previousClose ?? null, currency: m.currency ?? null, name: m.shortName ?? m.instrumentType ?? null };
          return;
        }
      } catch (_) {}
    }
    out[sym] = { error: true };
  }));

  return { statusCode: 200, headers, body: JSON.stringify(out) };
};
