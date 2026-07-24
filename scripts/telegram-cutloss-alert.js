// Checks live prices against T29's cut-loss bands (cutloss-thresholds.json, mirrors the
// STOCKS array in options-breadboard.html) and sends a Telegram message the first time a
// symbol breaches (drops to/below its low band or rises to/above its high band). Once a
// symbol is breached it won't alert again on every run — cutloss-alert-state.json tracks
// which symbols are already-alerted-and-still-breached, so a repeat alert only fires after
// the price clears the band and breaches again. Run on a schedule by
// .github/workflows/telegram-cutloss-alert.yml, which commits the state file back when it
// changes.
const fs = require('fs');
const path = require('path');

const THRESHOLDS_PATH = path.join(__dirname, '..', 'cutloss-thresholds.json');
const STATE_PATH = path.join(__dirname, '..', 'cutloss-alert-state.json');

const THRESHOLDS = JSON.parse(fs.readFileSync(THRESHOLDS_PATH, 'utf8'));

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  } catch (_) {
    return {};
  }
}

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
  const state = loadState();
  const newBreaches = [];
  const nextState = {};

  for (const s of THRESHOLDS) {
    const q = quotes[s.sym];
    if (!q || q.error || typeof q.price !== 'number') {
      if (state[s.sym]) nextState[s.sym] = state[s.sym];
      continue;
    }
    const breached =
      q.price <= s.low
        ? `⛔ ${s.sym} $${q.price} — dropped to/below cut-loss $${s.low}`
        : q.price >= s.high
        ? `⛔ ${s.sym} $${q.price} — rose to/above cut-loss $${s.high}`
        : null;

    if (breached) {
      nextState[s.sym] = true;
      if (!state[s.sym]) newBreaches.push(breached);
    }
    // else: price is back within band — leave nextState[s.sym] unset, so a future
    // breach alerts again.
  }

  const stateChanged = JSON.stringify(state) !== JSON.stringify(nextState);
  if (stateChanged) {
    fs.writeFileSync(STATE_PATH, JSON.stringify(nextState, null, 2) + '\n');
  }

  if (newBreaches.length === 0) {
    console.log('No new breaches — either all safe, or already-alerted breaches unchanged.');
    return;
  }

  const text =
    `🚨 Cut-loss alert (T29)\n\n${newBreaches.join('\n')}\n\n` +
    `Check: https://paulsworld.vercel.app/options-breadboard.html`;
  await sendTelegram(text);
  console.log('Alert sent:\n' + newBreaches.join('\n'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
