// Sends QQQ's current share price to Telegram every time this script runs (unlike
// telegram-cutloss-alert.js, which only messages on a band breach — this one is a plain
// hourly price ping). Run on a schedule by .github/workflows/telegram-qqq-price-alert.yml.
// Reuses the same /api/td price endpoint and TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID secrets
// as the cut-loss alert.

async function fetchQuote(symbol) {
  const url = `https://paulsworld.vercel.app/api/td?symbols=${encodeURIComponent(symbol)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('price fetch failed: HTTP ' + res.status);
  const data = await res.json();
  return data[symbol];
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram send failed: HTTP ${res.status} ${body}`);
  }
}

async function main() {
  const q = await fetchQuote('QQQ');
  if (!q || q.error || typeof q.price !== 'number') {
    throw new Error('QQQ quote unavailable: ' + JSON.stringify(q));
  }

  const change = typeof q.prevClose === 'number' ? q.price - q.prevClose : null;
  const pct = change !== null && q.prevClose ? (change / q.prevClose) * 100 : null;
  const arrow = change === null ? '' : change >= 0 ? '📈' : '📉';
  const changeText =
    change === null ? '' : ` (${change >= 0 ? '+' : ''}${change.toFixed(2)} / ${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)`;

  const text = `${arrow} QQQ $${q.price.toFixed(2)}${changeText}`;
  await sendTelegram(text);
  console.log('Sent:', text);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
