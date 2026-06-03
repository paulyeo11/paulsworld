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

export default async function handler(req, res) {
  const symbols = String(req.query.symbols || '')
    .split(',').map(s => s.trim()).filter(Boolean).slice(0, 40);
  if (!symbols.length) return res.status(400).json({ error: 'no_symbols' });

  let crumb = '', cookie = '';
  try {
    ({ crumb, cookie } = await getCrumb());
  } catch (e) {
    // crumb fetch failed — try without it
  }

  const baseHeaders = { 'User-Agent': UA, 'Accept': 'application/json' };
  if (cookie) baseHeaders['Cookie'] = cookie;

  const out = {};

  // Try v7 batch quote (one request for all symbols)
  try {
    const crumbParam = crumb ? `&crumb=${encodeURIComponent(crumb)}` : '';
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(','))}${crumbParam}&fields=regularMarketPrice,regularMarketPreviousClose,currency`;
    const r = await fetch(url, { headers: baseHeaders });
    if (r.ok) {
      const j = await r.json();
      const quotes = j?.quoteResponse?.result;
      if (quotes && quotes.length > 0) {
        const seen = new Set();
        for (const q of quotes) {
          if (q.regularMarketPrice != null) {
            out[q.symbol] = { price: q.regularMarketPrice, prevClose: q.regularMarketPreviousClose ?? null, currency: q.currency ?? null };
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
          out[sym] = { price: m.regularMarketPrice, prevClose: m.chartPreviousClose ?? m.previousClose ?? null, currency: m.currency ?? null };
          return;
        }
      } catch (_) {}
    }
    out[sym] = { error: true };
  }));

  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
  res.status(200).json(out);
}
