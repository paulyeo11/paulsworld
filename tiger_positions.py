"""
Tiger Brokers Position Fetcher
================================
pip install tigeropen
python tiger_positions.py

Job: call the Tiger API -> write tiger_positions.json into this folder.
Deploy/push is handled separately by a normal `git` commit+push (e.g. via gh CLI),
NOT by this script. No GitHub token is read or stored here.

The Tiger RSA private key is a SECRET and is NOT stored in this file. It is read
at runtime from either:
  1. the TIGER_PRIVATE_KEY environment variable, or
  2. a gitignored file `tiger_private_key.pem` in this same folder.
"""
from tigeropen.tiger_open_config import TigerOpenClientConfig
from tigeropen.common.consts import Language
from tigeropen.trade.trade_client import TradeClient
import json, os, sys
from datetime import datetime

TIGER_ID = "20159583"
ACCOUNT  = "50686489"
LICENSE  = "TBSG"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
KEY_FILE   = os.path.join(SCRIPT_DIR, "tiger_private_key.pem")
OUT_FILE   = os.path.join(SCRIPT_DIR, "tiger_positions.json")

# FX rates to convert all P&L to USD
FX = {"HKD": 7.8, "SGD": 1.35, "USD": 1.0}


def load_private_key():
    """Load the Tiger RSA private key from env var or gitignored .pem file."""
    key = os.environ.get("TIGER_PRIVATE_KEY")
    if key and key.strip():
        return key.strip()
    if os.path.exists(KEY_FILE):
        with open(KEY_FILE) as f:
            key = f.read().strip()
        if key:
            return key
    sys.exit(
        "ERROR: Tiger private key not found.\n"
        "Set the TIGER_PRIVATE_KEY environment variable, or place the key in:\n"
        f"  {KEY_FILE}\n"
        "(this file is gitignored and must never be committed)."
    )


def fetch_positions():
    print("Connecting to Tiger Brokers...")
    client_config = TigerOpenClientConfig(sandbox_debug=False)
    client_config.tiger_id    = TIGER_ID
    client_config.account     = ACCOUNT
    client_config.private_key  = load_private_key()
    client_config.license     = LICENSE
    client_config.language    = Language.en_US

    trade_client = TradeClient(client_config)
    positions = trade_client.get_positions(account=ACCOUNT)
    print(f"Found {len(positions)} positions")

    pos_list = []
    for p in positions:
        c = p.contract
        currency = c.currency or "USD"
        raw_pnl  = round(float(p.unrealized_pnl or 0), 2)
        raw_mkt  = round(float(p.market_value or 0), 2)
        # Convert P&L and market value to USD for display
        rate     = FX.get(currency.upper(), 1.0)
        pnl_usd  = round(raw_pnl / rate, 2)
        mkt_usd  = round(raw_mkt / rate, 2)

        # Cost basis. Tiger returns avgCost = 0.0 for fractional-share lots
        # (e.g. AAPL qty 0.23735), which made the dashboard render S$0.00 and
        # drop the position. Back-fill a derived cost (≈ market price) and flag it.
        try:
            avg_cost = float(p.average_cost or 0)
        except (TypeError, ValueError):
            avg_cost = 0.0
        cost_unknown = False
        qty = p.quantity or 0
        if (avg_cost <= 0 or avg_cost != avg_cost) and raw_mkt and qty:
            avg_cost = raw_mkt / qty   # original currency, matches marketValue
            cost_unknown = True
        avg_cost = round(avg_cost, 4)

        pos_list.append({
            "symbol"        : c.symbol,
            "secType"       : str(c.sec_type) if hasattr(c, "sec_type") else "STK",
            "currency"      : currency,
            "exchange"      : c.exchange or "—",
            "quantity"      : p.quantity,
            "avgCost"       : avg_cost,
            "costUnknown"   : cost_unknown,  # True = avgCost derived from market, not reported
            "marketValue"   : raw_mkt,      # original currency
            "marketValueUSD": mkt_usd,      # converted to USD
            "unrealizedPnl" : raw_pnl,      # original currency
            "unrealizedPnlUSD": pnl_usd,   # converted to USD
        })

    net_value, cash = None, None
    account_open_pnl_usd, realized_pnl_usd, daily_pnl_usd = None, None, None

    def _f(v):
        try:
            return float(v)
        except (TypeError, ValueError):
            return None

    try:
        assets = trade_client.get_assets(account=ACCOUNT)
        if assets:
            summary = assets[0].summary
            net_value = float(summary.net_liquidation or 0)
            cash      = float(summary.cash or 0)
            account_open_pnl_usd = _f(getattr(summary, "unrealized_pnl", None))
            realized_pnl_usd     = _f(getattr(summary, "realized_pnl", None))
            # Daily P&L from summary
            daily_pnl_usd        = _f(getattr(summary, "daily_pnl", None))
            if daily_pnl_usd is None:
                daily_pnl_usd    = _f(getattr(summary, "today_profit_loss", None))
            # Debug: print all summary attributes to find Tiger app P&L field
            print("=== summary attrs ===")
            for a in [x for x in dir(summary) if not x.startswith('_')]:
                print(f"  {a} = {getattr(summary, a, None)}")
            print("=====================")
    except Exception as e:
        print(f"Note: {e}")

    print(f"Final accountOpenPnlUSD: {account_open_pnl_usd}")
    print(f"Final dailyPnlUSD: {daily_pnl_usd}")

    # Fallback: compute daily P&L from net value delta vs previous run
    if daily_pnl_usd is None:
        try:
            with open(OUT_FILE, "r") as _f:
                _prev = json.load(_f)
            _prev_val = float(_prev.get("netValue") or 0)
            _today_val = float(net_value or 0)
            if _prev_val > 0 and _today_val > 0:
                # Convert SGD delta to USD
                _sgd_usd = 1.0 / 1.35  # approx SGD→USD
                daily_pnl_usd = round((_today_val - _prev_val) * _sgd_usd, 2)
                print(f"Daily P&L computed from netValue delta: {_today_val} - {_prev_val} = {daily_pnl_usd} USD")
        except Exception as e:
            print(f"Note (daily pnl fallback): {e}")

    output = {
        "fetchedAt"         : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "netValue"          : net_value,
        "cash"              : cash,
        "accountOpenPnlUSD" : account_open_pnl_usd,
        "dailyPnlUSD"       : daily_pnl_usd,
        "realizedPnlUSD"    : realized_pnl_usd,
        "netLiquidationUSD" : net_value,
        "positions"         : sorted(pos_list, key=lambda x: x["currency"] + x["symbol"])
    }

    with open(OUT_FILE, "w") as f:
        json.dump(output, f, indent=2)
    print(f"Saved {OUT_FILE}")
    print("Now commit + push tiger_positions.json with git/gh to deploy.")


if __name__ == "__main__":
    fetch_positions()
