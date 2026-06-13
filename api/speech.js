export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { opening, body, closing } = req.body || {};

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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const raw = await apiRes.text();
    let data;
    try { data = JSON.parse(raw); } catch(e) { return res.status(500).json({ error: 'Parse error: ' + raw.slice(0,200) }); }

    if (data.error) return res.status(500).json({ error: data.error.message || JSON.stringify(data.error) });

    const text = (data.content || []).map(b => b.text || '').join('');
    if (!text) return res.status(500).json({ error: 'No content. Raw: ' + JSON.stringify(data).slice(0,300) });

    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
