// Secure server-side proxy for Twelve Data.
// The API key lives ONLY in the Vercel env var TWELVEDATA_API_KEY — never in the
// public repo and never exposed to the browser. The dashboard calls /api/td?...
// and this function adds the key and forwards the request to Twelve Data.

export default async function handler(req, res) {
  const key = process.env.TWELVEDATA_API_KEY;
  if (!key) {
    res.status(503).json({ error: "not_configured",
      message: "Set TWELVEDATA_API_KEY in Vercel env variables." });
    return;
  }

  // Allowed Twelve Data endpoints
  const allowed = ["quote", "price", "exchange_rate", "time_series"];
  const { path = "quote", ...params } = req.query || {};
  if (!allowed.includes(path)) {
    res.status(400).json({ error: "bad_path" });
    return;
  }

  const qs = new URLSearchParams({ ...params, apikey: key }).toString();
  const url = `https://api.twelvedata.com/${path}?${qs}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    // small CDN cache so quick refreshes don't burn API credits
    res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=40");
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: "upstream_error", message: String(e) });
  }
}
