export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { opening, body: bodyText, closing } = body;

    const prompt = `You are a Toastmasters speech coach helping a 70-year-old retired adventurer named Paul write a speech in Chinese (Mandarin) for his Toastmasters club.

The speech topic is: "My Last One Month AI Experience" — Paul's personal journey discovering AI tools like Claude over the past month.

Your job is to:
1. Write a complete, polished Toastmasters speech IN CHINESE (Mandarin, Simplified characters)
2. Keep Paul's warm, personal, first-person storytelling style
3. The speech should be 4–6 minutes when read aloud (~600–900 Chinese characters)
4. Use vivid, conversational language — not stiff or formal
5. Include natural Toastmaster structure: strong hook, clear main points, memorable close
6. After the Chinese speech, add a section "--- 英文参考 (English Reference) ---" with a clean English version

Paul's draft notes:

OPENING:
${opening || "(no notes — write a compelling hook about discovering AI at age 70)"}

BODY:
${bodyText || "(no notes — write about discovering Claude, using it for trip planning, story writing, portfolio management)"}

CLOSING:
${closing || "(no notes — write an inspiring close about learning new things at 70, AI as a life companion)"}

Write the Chinese speech now. Start directly with the speech — no preamble.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = (data.content || []).map(b => b.text || '').join('');

    return new Response(JSON.stringify({ text }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
