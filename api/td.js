// Yahoo Finance proxy with crumb authentication (required since 2024).
// No API key needed. Server-side to avoid CORS.
// Call: /api/td?symbols=FDS,POOL,ZTS,9988.HK
// Returns: { "FDS": {price, prevClose, currency}, ... }

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function getCrumb() {
  // Step 1: hit Yahoo Finance to get a session cookie
  const r1 = await fetch('https://finance.yahoo.com/', {
    headers: { 'User-Agent': UA, 'Accept': 'text/html' },
    redirect: 'follow',
  });
  const cookies = r1.headers.get('set-cookie') || '';
  // extract the A3 / GUC cookie
  const cookieHeader = cookies.split(',').map(c => c.split(';')[0].trim()).join('; ');

  // Step 2: get crumb
  const r2 = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': UA, 'Cookie': cookieHeader },
  });
  const crumb = await r2.text();
  return { crumb: crumb.trim(), cookie: cookieHeader };
}

// Stooq — free, keyless, no crumb/cookie dance. Used as the primary source for the full=1
// (chart-history) path below, since Yahoo's crumb auth is frequently blocked from cloud/
// server IPs (Vercel included), which is why the site's live prices went dark. Only handles
// plain US-listed tickers (".us" suffix); HK tickers and FX pairs still go through Yahoo.
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

export default async function handler(req, res) {
  const symbols = String(req.query.symbols || '')
    .split(',').map(s => s.trim()).filter(Boolean).slice(0, 40);
  if (!symbols.length) return res.status(400).json({ error: 'no_symbols' });

  // Crumb is only fetched lazily, the first time a Yahoo call actually needs it — full=1
  // requests for plain US tickers now resolve entirely via Stooq and never touch this.
  let crumbPromise = null;
  function ensureCrumb() {
    if (!crumbPromise) crumbPromise = getCrumb().catch(() => ({ crumb: '', cookie: '' }));
    return crumbPromise;
  }

  const out = {};

  // full=1&range=6mo etc — 52-week range + historical daily closes for a price chart
  // (e.g. T39's Profit Zone chart).
  if (req.query.full === '1') {
    const range = String(req.query.range || '6mo');
    await Promise.all(symbols.map(async (sym) => {
      // Plain US ticker (no exchange suffix / FX marker) — try Stooq first.
      if (!/[.=]/.test(sym)) {
        try {
          const s = await fetchStooqDaily(sym);
          out[sym] = { price: s.price, prevClose: s.prevClose, fiftyTwoWeekHigh: s.fiftyTwoWeekHigh, fiftyTwoWeekLow: s.fiftyTwoWeekLow, currency: 'USD', closes: s.closes };
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
            };
            return;
          }
        } catch (_) {}
      }
      out[sym] = { error: true };
    }));
    res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
    return res.status(200).json(out);
  }

  const { crumb, cookie } = await ensureCrumb();
  const baseHeaders = { 'User-Agent': UA, 'Accept': 'application/json' };
  if (cookie) baseHeaders['Cookie'] = cookie;

  // Try v7 batch quote (one request for all symbols)
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
        res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
        return res.status(200).json(out);
      }
    }
  } catch (_) {}

  // Fallback: v8 chart per symbol
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

  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
  res.status(200).json(out);
}
