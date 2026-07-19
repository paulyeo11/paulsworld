// Netlify Functions port of api/speech.js (Vercel). Same logic, adapted handler signature.
// Requires the ANTHROPIC_API_KEY environment variable to be set in Netlify's project
// settings (Site configuration -> Environment variables) — not committed here, per the
// "never store secrets in the repo" rule.

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const { opening, body, closing } = JSON.parse(event.body || '{}');

    const prompt = `You are a Toastmasters speech coach helping a 70-year-old retired adventurer named Paul write a speech in Chinese (Mandarin) for his Toastmasters club.

The speech topic is: "My Last One Month AI Experience".

Write a complete Toastmasters speech IN CHINESE (Mandarin, Simplified characters). Warm, personal, first-person style. 4-6 minutes (~600-900 Chinese characters). Strong hook, clear main points, memorable close. After the Chinese speech add "--- 英文参考 (English Reference) ---" with English version.

OPENING: ${opening || "I never expected AI would become my daily companion at 70"}
BODY: ${body || "I used Claude to plan my Xinjiang trip, write stories, manage my portfolio"}
CLOSING: ${closing || "AI is not just for the young. At 70, it is never too late to learn"}

Start the speech directly.`;

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const raw = await apiRes.text();
    let data;
    try { data = JSON.parse(raw); } catch (e) { return { statusCode: 500, headers, body: JSON.stringify({ error: 'Parse error: ' + raw.slice(0, 200) }) }; }

    if (data.error) return { statusCode: 500, headers, body: JSON.stringify({ error: data.error.message || JSON.stringify(data.error) }) };

    const text = (data.content || []).map((b) => b.text || '').join('');
    if (!text) return { statusCode: 500, headers, body: JSON.stringify({ error: 'No content. Raw: ' + JSON.stringify(data).slice(0, 300) }) };

    return { statusCode: 200, headers, body: JSON.stringify({ text }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
