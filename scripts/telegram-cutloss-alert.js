// Checks live prices against T29's cut-loss bands (cutloss-thresholds.json, mirrors the
// STOCKS array in options-breadboard.html) and sends a Telegram message if any symbol has
// dropped to/below its low band or risen to/above its high band. Run on a schedule by
// .github/workflows/telegram-cutloss-alert.yml. No message is sent when nothing breaches.
const fs = require('fs');
const path = require('path');

const THRESHOLDS = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'cutloss-thresholds.json'), 'utf8')
);

async function fetchQuotes(symbols) {
  const url = `https://paulsworld.vercel.app/api/td?symbols=${encodeURIComponent(symbols.join(','))}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('price fetch failed: HTTP ' + res.status);
  return res.json();
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
  if (process.env.FORCE_TEST_MESSAGE === 'true') {
    await sendTelegram('✅ Test message from Paul\'s World cut-loss alert workflow — Telegram delivery is working.');
    console.log('Forced test message sent.');
    return;
  }

  const quotes = await fetchQuotes(THRESHOLDS.map((s) => s.sym));

  const breaches = [];
  for (const s of THRESHOLDS) {
    const q = quotes[s.sym];
    if (!q || q.error || typeof q.price !== 'number') continue;
    if (q.price <= s.low) {
      breaches.push(`⛔ ${s.sym} $${q.price} — dropped to/below cut-loss $${s.low}`);
    } else if (q.price >= s.high) {
      breaches.push(`⛔ ${s.sym} $${q.price} — rose to/above cut-loss $${s.high}`);
    }
  }

  if (breaches.length === 0) {
    console.log('No breaches — all symbols within their cut-loss bands.');
    return;
  }

  const text =
    `🚨 Cut-loss alert (T29)\n\n${breaches.join('\n')}\n\n` +
    `Check: https://paulsworld.vercel.app/options-breadboard.html`;
  await sendTelegram(text);
  console.log('Alert sent:\n' + breaches.join('\n'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
