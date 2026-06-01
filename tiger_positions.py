"""
Tiger Brokers Position Fetcher
================================
pip install tigeropen requests
python tiger_positions.py
"""
from tigeropen.tiger_open_config import TigerOpenClientConfig
from tigeropen.common.consts import Language
from tigeropen.trade.trade_client import TradeClient
import json, base64, requests, os
from datetime import datetime

TIGER_ID    = "20159583"
ACCOUNT     = "50686489"
LICENSE     = "TBSG"
PRIVATE_KEY = "MIICXAIBAAKBgQCXjMARtSd91iMsfebC2fRE2xL9x/rLiTg6CRQ4UTIH1yjj1ctf6i3HUmpnb4MZ6I5ThnoOtsYWRHcaC5taBDbf+OuLTLTaNezKxSjNKCxONDvg8xSBf7hLl3bdUZ11pLq+Ou+9Xx1PNpzxRy7So0iwuyXgQFIQ4pCVksTCtYfvxQIDAQABAoGAJ6074+bvrexQTSexMLZrU1Ofxz2CFaOZSuhxmMT5OkBEflHM6xGeZp7XKLlzM2dFS+zbK9sCRXYrUHBVfd24l8UqqIjTeA1mEG+Ezkrvv5m+HwRAZknTseNycvfYaZLZaqg2/hEvd1HBeBt025Yq1ieBCmDPSY4H+6L5lBM6CUkCQQD1X5UrA0y5iQzH8P2PTXuZ8s1/bx6nN04M+iZRx79OhFdfepX2n30ok6Zf+jlRCeBUvizwA8p9KQWXUKGaOe07AkEAnhz1wFq77y78qPXWOb0noBQgwUT2ymPASqdZttMnl30C5dFESnqmYVazTPJO2rqG9TuZJV7cWpRT7eNUF3vG/wJAWBngqlf99WQS9bs+n3R3m7gFNutD+1AtMxWiKpzowJ1d7cdLDwkG3EnfY/ipGcLNDEBYTDlgO/49pq3pyEFiPwJAap0+fKDx/nshdVCnTjGk6YUI/Slie+A9RlmH3gaNuNFbxdmRAeOoExSiPG1bDJQf8nZoctF/JjjESzExf9A/wwJBAMLPJY8qu/eniSPm3xvjlGZQmuJqJqr2sR5LrK5gGmjI9Q0YgESiuKVZTZ1NY7Co4F/PmAVFG+cs8q7mHCnZM5Y="

# Read GitHub token from config file
CONFIG_FILE = os.path.join(os.path.dirname(__file__), "tiger_config.txt")
GITHUB_TOKEN = open(CONFIG_FILE).read().strip()
GITHUB_REPO   = "paulyeo11/Dynamic-Index"
GITHUB_FILE   = "tiger_positions.json"
GITHUB_BRANCH = "main"

def fetch_and_upload():
    print("Connecting to Tiger Brokers...")
    client_config = TigerOpenClientConfig(sandbox_debug=False)
    client_config.tiger_id    = TIGER_ID
    client_config.account     = ACCOUNT
    client_config.private_key = PRIVATE_KEY
    client_config.license     = LICENSE
    client_config.language    = Language.en_US

    trade_client = TradeClient(client_config)
    positions = trade_client.get_positions(account=ACCOUNT)
    print(f"Found {len(positions)} positions")

    pos_list = []
    for p in positions:
        pos_list.append({
            "symbol"       : p.contract.symbol,
            "secType"      : p.contract.security_type,
            "currency"     : p.contract.currency,
            "exchange"     : p.contract.exchange or "—",
            "quantity"     : p.quantity,
            "avgCost"      : round(float(p.average_cost or 0), 4),
            "marketValue"  : round(float(p.market_value or 0), 2),
            "unrealizedPnl": round(float(p.unrealized_pnl or 0), 2),
        })

    net_value, cash = None, None
    try:
        assets = trade_client.get_assets(account=ACCOUNT)
        if assets:
            net_value = float(assets[0].summary.net_liquidation or 0)
            cash      = float(assets[0].summary.cash or 0)
    except: pass

    output = {
        "fetchedAt" : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "netValue"  : net_value,
        "cash"      : cash,
        "positions" : sorted(pos_list, key=lambda x: x["currency"] + x["symbol"])
    }

    with open("tiger_positions.json", "w") as f:
        json.dump(output, f, indent=2)
    print("Saved tiger_positions.json")
    upload_to_github(output)

def upload_to_github(data):
    gh_headers = {"Authorization": f"token {GITHUB_TOKEN}", "Accept": "application/vnd.github.v3+json"}
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{GITHUB_FILE}"
    r = requests.get(f"{url}?ref={GITHUB_BRANCH}", headers=gh_headers)
    sha = r.json().get("sha") if r.status_code == 200 else None
    content = base64.b64encode(json.dumps(data, indent=2).encode()).decode()
    payload = {"message": f"Update Tiger positions {data['fetchedAt']}", "content": content, "branch": GITHUB_BRANCH}
    if sha: payload["sha"] = sha
    r2 = requests.put(url, headers=gh_headers, json=payload)
    if r2.status_code in (200, 201):
        print("Uploaded to GitHub!")
        print("Visit: https://paulsworld.vercel.app/T08.html")
    else:
        print(f"Upload failed: {r2.status_code} {r2.json().get('message')}")

if __name__ == "__main__":
    fetch_and_upload()
