"""
IBKR Position Fetcher — Auto-uploads to GitHub
================================================
Requirements:
  pip install ib_async requests

Before running:
  - Open IB Gateway
  - Enable API: Configure > Settings > API > Enable ActiveX and Socket Clients
  - Port: 4001 (IB Gateway) | 7496 (TWS Live) | 7497 (TWS Paper)
  - Tick "Read-Only API" for safety

Run: python ibkr_positions.py
Then visit: https://paulsworld.vercel.app/ai5.html
"""

from ib_async import IB, util
import json, base64, requests, sys
from datetime import datetime

# Make stdout/stderr UTF-8 so emoji (✅) don't crash the Windows cp1252 console
try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

# ── IBKR CONFIG ─────────────────────────────────────────────
HOST      = '127.0.0.1'
PORT      = 4001        # 4001=IB Gateway, 7496=TWS Live, 7497=TWS Paper
CLIENT_ID = 1
# ── GITHUB CONFIG ───────────────────────────────────────────
GITHUB_TOKEN = "YOUR_GITHUB_TOKEN_HERE"  # paste your token here
GITHUB_REPO  = "paulyeo11/Dynamic-Index"
GITHUB_FILE  = "positions.json"
GITHUB_BRANCH = "main"
# ────────────────────────────────────────────────────────────

def fetch_positions():
    util.startLoop()
    ib = IB()
    print(f"Connecting to IBKR at {HOST}:{PORT} ...")
    ib.connect(HOST, PORT, clientId=CLIENT_ID)
    print("✅ Connected!")

    positions    = ib.positions()
    account_vals = ib.accountValues()

    pos_list = []
    opt_list = []
    for p in positions:
        pos_list.append({
            "account"    : p.account,
            "symbol"     : p.contract.symbol,
            "secType"    : p.contract.secType,
            "exchange"   : p.contract.exchange or p.contract.primaryExchange or "—",
            "currency"   : p.contract.currency,
            "position"   : p.position,
            "avgCost"    : round(p.avgCost, 4),
            "marketValue": round(p.position * p.avgCost, 2),
        })

        # Collect option positions for the T20 dashboard Options tab
        if p.contract.secType == "OPT":
            # IBKR reports option avgCost as total premium × the contract
            # multiplier (usually 100). The dashboard wants the per-share quote.
            try:
                mult = float(p.contract.multiplier) if p.contract.multiplier else 100.0
            except (ValueError, TypeError):
                mult = 100.0
            if mult == 0:
                mult = 100.0

            # Reformat IBKR expiry "YYYYMMDD" -> "YYYY-MM-DD"
            raw_exp = p.contract.lastTradeDateOrContractMonth or ""
            expiry  = f"{raw_exp[0:4]}-{raw_exp[4:6]}-{raw_exp[6:8]}" if len(raw_exp) >= 8 else raw_exp

            opt_list.append({
                "underlying": p.contract.symbol,
                "strike"    : round(p.contract.strike, 2),
                "expiry"    : expiry,
                "right"     : p.contract.right,
                "qty"       : p.position,
                "avgCost"   : round(p.avgCost / mult, 2),
            })

    def get_val(tag, currency='USD'):
        return next((av.value for av in account_vals
                     if av.tag == tag and av.currency == currency), None)

    net_liq        = get_val('NetLiquidation')
    unrealized_pnl = get_val('UnrealizedPnL')
    realized_pnl   = get_val('RealizedPnL')
    gross_pos_val  = get_val('GrossPositionValue')
    cash           = get_val('TotalCashValue')

    output = {
        "fetchedAt"       : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "netLiquidation"  : net_liq,
        "unrealizedPnL"   : unrealized_pnl,
        "realizedPnL"     : realized_pnl,
        "grossPositionVal": gross_pos_val,
        "cashBalance"     : cash,
        "positions"       : sorted(pos_list, key=lambda x: x["currency"] + x["symbol"]),
        "options"         : sorted(opt_list, key=lambda x: (x["underlying"], x["expiry"], x["strike"]))
    }

    ib.disconnect()
    print(f"✅ Disconnected. {len(pos_list)} positions found.")

    # Save locally
    with open("positions.json", "w") as f:
        json.dump(output, f, indent=2)
    print("✅ Saved positions.json locally.")

    # Upload to GitHub
    upload_to_github(output)

def upload_to_github(data):
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{GITHUB_FILE}"

    # Get existing SHA (needed for update)
    r = requests.get(f"{url}?ref={GITHUB_BRANCH}", headers=headers)
    sha = r.json().get("sha") if r.status_code == 200 else None

    content = base64.b64encode(json.dumps(data, indent=2).encode()).decode()
    payload = {
        "message": f"Update positions {data['fetchedAt']}",
        "content": content,
        "branch" : GITHUB_BRANCH
    }
    if sha:
        payload["sha"] = sha

    r = requests.put(url, headers=headers, json=payload)
    if r.status_code in (200, 201):
        print("✅ Uploaded to GitHub successfully!")
        print("🌐 Visit: https://paulsworld.vercel.app/ai5.html")
    else:
        print(f"❌ GitHub upload failed: {r.status_code} — {r.json().get('message')}")

if __name__ == "__main__":
    fetch_positions()
