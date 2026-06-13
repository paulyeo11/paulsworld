export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { opening, body, closing } = req.body || {};

  const prompt = `You are a Toastmasters speech coach helping a 70-year-old retired adventurer named Paul write a speech in Chinese (Mandarin) for his Toastmasters club.

The speech topic is: "My Last One Month AI Experience" — Paul's personal journey discovering AI tools like Claude over the past month.

Write a complete, polished Toastmasters speech IN CHINESE (Mandarin, Simplified characters). Keep Paul's warm, personal, first-person storytelling style. The speech should be 4–6 minutes when read aloud (~600–900 Chinese characters). Use vivid, conversational language. Include natural Toastmaster structure: strong hook, clear main points, memorable close. After the Chinese speech, add "--- 英文参考 (English Reference) ---" with a clean English version.

Paul's draft notes:
OPENING: ${opening || "(no notes — write a compelling hook about discovering AI at age 70)"}
BODY: ${body || "(no notes — write about discovering Claude, using it for trip planning, story writing, portfolio management)"}
CLOSING: ${closing || "(no notes — write an inspiring close about learning new things at 70)"}

Start directly with the speech — no preamble.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = (data.content || []).map(b => b.text || '').join('');
    if (!text) throw new Error('Empty: ' + JSON.stringify(data));
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
