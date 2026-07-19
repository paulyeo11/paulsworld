// Netlify Functions port of api/claude.js (Vercel). Not currently referenced by any page
// (kept for parity in case something starts using it). Requires ANTHROPIC_API_KEY to be
// set in Netlify's project environment variables.

exports.handler = async function (event) {
  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: event.body,
    });
    const data = await response.text();
    return { statusCode: response.status, headers: { ...headers, 'Content-Type': 'application/json' }, body: data };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Proxy error' }) };
  }
};
