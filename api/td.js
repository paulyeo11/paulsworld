// Yahoo Finance proxy — tries v7 batch quote first (most reliable), falls back to v8 chart.
// No API key needed. Server-side to avoid CORS.
// Call: /api/td?symbols=FDS,POOL,ZTS,9988.HK,HKD=X
// Returns: { "FDS": {price, prevClose, currency}, ... }

export default async function handler(req, res) {
  const symbols = String(req.query.symbols || '')
    .split(',').map(s => s.trim()).filter(Boolean).slice(0, 40);
  if (!symbols.length) {
    return res.status(400).json({ error: 'no_symbols' });
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'application/json,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://finance.yahoo.com',
    'Referer': 'https://finance.yahoo.com/',
  };

  // Try v7 batch quote (can fetch all symbols in one request)
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols.join(','))}&fields=regularMarketPrice,regularMarketPreviousClose,currency`;
    const r = await fetch(url, { headers });
    if (r.ok) {
      const j = await r.json();
      const quotes = j && j.quoteResponse && j.quoteResponse.result;
      if (quotes && quotes.length > 0) {
        const out = {};
        // mark symbols that came back
        const seen = new Set();
        for (const q of quotes) {
          if (q.regularMarketPrice != null) {
            out[q.symbol] = {
              price: q.regularMarketPrice,
              prevClose: q.regularMarketPreviousClose ?? null,
              currency: q.currency ?? null,
            };
            seen.add(q.symbol);
          }
        }
        // fill missing with error
        for (const s of symbols) {
          if (!seen.has(s)) out[s] = { error: true };
        }
        res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
        return res.status(200).json(out);
      }
    }
  } catch (_) {}

  // Fallback: v8 chart per symbol (parallel)
  const out = {};
  await Promise.all(symbols.map(async (sym) => {
    const hosts = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com'];
    for (const host of hosts) {
      try {
        const url = `https://${host}/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d`;
        const r = await fetch(url, { headers });
        const j = await r.json();
        const m = j?.chart?.result?.[0]?.meta;
        if (m && m.regularMarketPrice != null) {
          out[sym] = {
            price: m.regularMarketPrice,
            prevClose: m.chartPreviousClose ?? m.previousClose ?? null,
            currency: m.currency ?? null,
          };
          return;
        }
      } catch (_) {}
    }
    out[sym] = { error: true };
  }));

  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
  res.status(200).json(out);
}
