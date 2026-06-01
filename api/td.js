// Free live-quote proxy using Yahoo Finance (covers HK · SG · US + FX).
// No API key needed. Server-side fetch avoids browser CORS and rate issues.
// Call: /api/td?symbols=9988.HK,1211.HK,GRAB,AAPL,HKD=X,SGD=X
// Returns: { "9988.HK": {price, prevClose, currency}, ... }  (error:true if a symbol fails)

export default async function handler(req, res) {
  const symbols = String(req.query.symbols || "")
    .split(",").map(s => s.trim()).filter(Boolean).slice(0, 40);
  if (!symbols.length) {
    res.status(400).json({ error: "no_symbols" });
    return;
  }

  const out = {};
  await Promise.all(symbols.map(async (sym) => {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d`;
      const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const j = await r.json();
      const m = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
      if (m && m.regularMarketPrice != null) {
        out[sym] = {
          price: m.regularMarketPrice,
          prevClose: (m.chartPreviousClose != null ? m.chartPreviousClose
                     : (m.previousClose != null ? m.previousClose : null)),
          currency: m.currency || null
        };
      } else {
        out[sym] = { error: true };
      }
    } catch (e) {
      out[sym] = { error: true };
    }
  }));

  res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=40");
  res.status(200).json(out);
}
