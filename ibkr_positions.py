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
import json, sys, os, subprocess
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
# Upload now goes through the LOCAL git clone (this directory is a working
# clone of paulyeo11/paulsworld, remote 'origin', branch 'main') using the
# already-configured git credential helper. No token is stored or used here.
GITHUB_FILE   = "positions.json"
GITHUB_BRANCH = "main"
# ────────────────────────────────────────────────────────────

# Manual fill-price record (premium per share actually sold/bought).
# IBKR avgCost is net of commission, so it differs by a cent — these are the
# real fills. ADD A LINE HERE whenever Paul opens a new option position.
# Key: "UNDERLYING|YYYY-MM-DD|STRIKE|RIGHT"
FILL_PRICES = {
    "FDS|2026-07-17|320.0|C": 2.56,
    "POOL|2026-07-17|260.0|C": 0.50,
}

# Underlying stock price at the time each option was filled (manual, static).
# ADD A LINE whenever Paul opens a new option position.
# Key: "UNDERLYING|YYYY-MM-DD|STRIKE|RIGHT"  (same key format as FILL_PRICES)
FILL_UNDERLYING = {
    "FDS|2026-07-17|320.0|C": 255.0,
    "POOL|2026-07-17|260.0|C": 185.0,
}

def fetch_positions():
    util.startLoop()
    ib = IB()
    print(f"Connecting to IBKR at {HOST}:{PORT} ...")
    ib.connect(HOST, PORT, clientId=CLIENT_ID)
    print("✅ Connected!")

    positions    = ib.positions()
    account_vals = ib.accountValues()

    # Allow delayed market data so option Greeks can populate even without a
    # live options market-data subscription. The original script never set a
    # market-data type (it relies on avgCost / positions(), not live quotes),
    # so enabling delayed (3) here is safe and won't disturb stock handling.
    # 3 = delayed, 4 = delayed-frozen, 1 = live (only if entitled).
    try:
        ib.reqMarketDataType(3)
    except Exception as e:
        print(f"⚠️  Could not set delayed market data type: {e}")

    def fetch_option_greeks(contract):
        """Return (delta, iv, theta, undPrice) model Greeks for an option
        contract, or None for any value that's missing.
        Never raises — missing entitlement / errors gracefully yield None so the
        dashboard keeps showing its '—' fallback."""
        try:
            try:
                ib.qualifyContracts(contract)  # defensive; should already be qualified
            except Exception:
                pass
            ticker = ib.reqMktData(contract, genericTickList="106",
                                   snapshot=False, regulatorySnapshot=False)
            # Greeks arrive asynchronously — poll up to ~4s for modelGreeks.
            delta = iv = theta = und_price = None
            for _ in range(8):
                ib.sleep(0.5)
                mg = ticker.modelGreeks
                if mg is not None:
                    d = mg.delta
                    v = mg.impliedVol
                    th = mg.theta
                    up = mg.undPrice
                    if d is not None and d == d:        # not None / not NaN
                        delta = round(float(d), 3)
                    if v is not None and v == v:        # not None / not NaN
                        iv = round(float(v), 4)
                    if th is not None and th == th:     # not None / not NaN
                        theta = round(float(th), 4)
                    if up is not None and up == up:     # not None / not NaN
                        und_price = round(float(up), 2)
                    if delta is not None:
                        break
            ib.cancelMktData(contract)
            return delta, iv, theta, und_price
        except Exception as e:
            print(f"⚠️  Greeks unavailable for {getattr(contract, 'localSymbol', contract)}: {e}")
            try:
                ib.cancelMktData(contract)
            except Exception:
                pass
            return None, None, None, None

    pos_list = []
    opt_list = []
    for p in positions:
        # Fetch live/delayed market price for this contract
        mkt_price = None
        try:
            ticker = ib.reqMktData(p.contract, snapshot=True)
            ib.sleep(2)
            # Use last price, or mid, or close as fallback
            for attr in ('last', 'close', 'bid', 'ask'):
                v = getattr(ticker, attr, None)
                if v is not None and v == v and v > 0:
                    mkt_price = float(v)
                    break
            ib.cancelMktData(p.contract)
        except Exception as e:
            print(f"⚠️  Could not get market price for {p.contract.symbol}: {e}")

        if mkt_price is None:
            # Fallback: use avgCost (P&L will show 0 but avoids crash)
            mkt_price = p.avgCost

        mkt_value   = round(float(p.position) * mkt_price, 2)
        cost_basis  = round(float(p.position) * float(p.avgCost), 2)
        unreal_pnl  = round(mkt_value - cost_basis, 2)

        pos_list.append({
            "account"       : p.account,
            "symbol"        : p.contract.symbol,
            "secType"       : p.contract.secType,
            "exchange"      : p.contract.exchange or p.contract.primaryExchange or "—",
            "currency"      : p.contract.currency,
            "position"      : p.position,
            "avgCost"       : round(p.avgCost, 4),
            "mktPrice"      : round(mkt_price, 4),
            "marketValue"   : mkt_value,
            "unrealizedPnl" : unreal_pnl,
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

            # Fetch model Greeks (delta, theta) + implied vol + underlying
            # price via market data. Safe None fallback if no entitlement /
            # Greeks unavailable.
            delta, iv, theta, und_price = fetch_option_greeks(p.contract)

            # Look up Paul's real fill price (premium per share). Build the key
            # from the SAME strike/expiry/right variables the dict uses so the
            # FILL_PRICES lookup always matches. None if not in the record →
            # the card falls back to avgCost.
            strike = round(p.contract.strike, 2)
            right  = p.contract.right
            symbol = p.contract.symbol
            key    = f"{symbol}|{expiry}|{strike}|{right}"
            fill   = FILL_PRICES.get(key)
            fill_und = FILL_UNDERLYING.get(key)

            opt_list.append({
                "underlying": symbol,
                "strike"    : strike,
                "expiry"    : expiry,
                "right"     : right,
                "qty"       : p.position,
                "avgCost"   : round(p.avgCost / mult, 2),
                "fillPrice" : fill,   # real premium/share from FILL_PRICES, or None
                "fillUnderlying": fill_und,  # stock price at fill from FILL_UNDERLYING, or None
                "delta"     : delta,   # model greek, 3dp, or None -> dashboard shows "—"
                "iv"        : iv,      # implied vol decimal (0.25), 4dp, or None
                "theta"     : theta,   # per-share daily decay, 4dp, or None (×100 = per-contract)
                "undPrice"  : und_price,  # underlying price, 2dp, or None (for % OTM)
            })

    def get_val(tag, currency='USD'):
        # Try exact currency match first, then empty string (IBKR sometimes omits currency on P&L fields)
        result = next((av.value for av in account_vals if av.tag == tag and av.currency == currency), None)
        if result is None:
            result = next((av.value for av in account_vals if av.tag == tag and av.currency == ''), None)
        return result

    net_liq        = get_val('NetLiquidation')
    unrealized_pnl = get_val('UnrealizedPnL')
    realized_pnl   = get_val('RealizedPnL')
    gross_pos_val  = get_val('GrossPositionValue')
    cash           = get_val('TotalCashValue')

    # Daily P&L: use IBKR DailyPnL tag if available; else compute from
    # today net_liq minus previous net_liq stored in existing positions.json.
    daily_pnl = get_val('DailyPnL')
    if daily_pnl is None:
        try:
            with open("positions.json", "r") as _f:
                _prev = json.load(_f)
            _prev_liq = float(_prev.get("netLiquidation") or 0)
            _today_liq = float(net_liq or 0)
            _prev_date = (_prev.get("fetchedAt") or "")[:10]
            _today_date = datetime.now().strftime("%Y-%m-%d")
            # Only use prev value if it was from a different fetch (not same run)
            if _prev_liq > 0 and _today_liq > 0:
                daily_pnl = round(_today_liq - _prev_liq, 2)
                print(f"Daily P&L computed: {_today_liq} - {_prev_liq} = {daily_pnl}")
        except Exception as e:
            print(f"Note (daily pnl fallback): {e}")

    output = {
        "fetchedAt"       : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "netLiquidation"  : net_liq,
        "unrealizedPnL"   : unrealized_pnl,
        "realizedPnL"     : realized_pnl,
        "dailyPnL"        : daily_pnl,
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

    # Upload to GitHub (via local git clone + credential helper — no token)
    upload_to_github()

def upload_to_github():
    """Push positions.json to GitHub using the LOCAL git clone and its already
    configured credential helper — NO embedded token, no GitHub REST API.

    This directory is a working clone of paulyeo11/paulsworld (origin/main).
    The working tree may contain unrelated edits (.gitignore, HTML, etc.), so
    we stage ONLY positions.json and never `git add .`.

    Divergence handling: commit positions.json first so the index is clean,
    then push. If the remote has advanced (push rejected), stash any unrelated
    *unstaged* changes, `git pull --rebase`, push again, then restore the
    stash. Stashing keeps the rebase from failing on dirty working-tree files.

    Any failure prints a ❌ but never crashes the script — the data is already
    saved locally regardless.
    """
    repo_dir = os.path.dirname(os.path.abspath(__file__))

    def git(*args, check=True):
        """Run a git command in the repo dir; return CompletedProcess.
        Captures stdout/stderr as text. raise on non-zero only if check=True."""
        return subprocess.run(
            ["git", *args],
            cwd=repo_dir,
            capture_output=True,
            text=True,
            check=check,
        )

    try:
        # a. Stage ONLY positions.json (never other working-tree edits).
        git("add", GITHUB_FILE)

        # b. Anything actually staged? `git diff --cached --quiet` exits 0 when
        #    there are NO staged changes, non-zero (1) when there are.
        staged = git("diff", "--cached", "--quiet", "--", GITHUB_FILE, check=False)
        if staged.returncode == 0:
            print("ℹ️  positions.json unchanged, nothing to push.")
            return

        # c. Commit just this file.
        commit = git("commit", "-m",
                     "Auto-refresh IBKR positions data [skip ci]", check=False)
        print((commit.stdout or commit.stderr).strip())

        # d. Try to push; on rejection, rebase onto the advanced remote.
        push = git("push", "origin", f"HEAD:{GITHUB_BRANCH}", check=False)
        if push.returncode != 0:
            print("⚠️  Push rejected (remote advanced) — rebasing...")
            print((push.stderr or push.stdout).strip())

            # Stash unrelated UNSTAGED changes so the rebase can't fail on a
            # dirty tree. `git diff --quiet` exits non-zero if unstaged edits
            # exist. (Our commit already captured positions.json.)
            dirty = git("diff", "--quiet", check=False)
            stashed = False
            if dirty.returncode != 0:
                git("stash", "push", "-m", "auto-refresh-stash", check=False)
                stashed = True

            try:
                pull = git("pull", "--rebase", "origin", GITHUB_BRANCH, check=False)
                print((pull.stdout or pull.stderr).strip())
                push = git("push", "origin", f"HEAD:{GITHUB_BRANCH}", check=False)
            finally:
                # Always restore the stashed unrelated changes.
                if stashed:
                    pop = git("stash", "pop", check=False)
                    if pop.returncode != 0:
                        print("⚠️  Could not auto-restore stashed changes:")
                        print((pop.stderr or pop.stdout).strip())

        # e. Report final push result (commit SHA / "main -> main" line).
        if push.returncode == 0:
            print((push.stderr or push.stdout).strip())
            print("✅ Uploaded to GitHub successfully!")
            print("🌐 Visit: https://paulsworld.vercel.app/ai5.html")
        else:
            print(f"❌ GitHub push failed:\n{(push.stderr or push.stdout).strip()}")

    except Exception as e:
        print(f"❌ GitHub push failed (data is saved locally): {e}")

if __name__ == "__main__":
    fetch_positions()
