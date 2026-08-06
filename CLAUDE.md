# Paul's World — CLAUDE.md

## Owner / Profile Context
- Paul Yeo — 70-year-old retired male (retired at **67**).
- Hobbies: travel, adventure sports, learning AI.
- Wife: **Joanne** (joanneng16@yahoo.com). Married at age **32**.
- Baptised **29 April 2026**.
- Worked at **ECO for 9 years**.
- Holds a **Singapore driving licence** and an **International Driving Permit (IDP)** — already has both, not just planning to get one. (Added 2026-07-19.)
- Owns a **DJI Mini 5 Pro** drone. (Added 2026-07-19.)
- **22 July 2026** was a significant personal/anniversary date for Paul and Joanne — a major family financial disclosure between them. Specific figures kept private and out of this public repo. (Added 2026-07-23.)
- **Index Page Rule:** the homepage must always display **"Retired at 67"** — never 70.
- **Favourite singers/music:** Susan Wong, Julienne Taylor.

## Paul's Abbreviations (Standing Glossary)
- **IG** = **Iron Condor** (the options strategy). When Paul says "trade IG", "IG setup", etc. he means the Iron Condor strategy — NOT the IG broker/platform or IG Group stock. (Added 2026-07-15.)

## Contacts
- **IBKR (Interactive Brokers) help email:** help@interactivebrokers.com
- **Caroline Koh (Phillip)** — carolinekoh@phillip.com.sg — contact for Joanne's insurance/legacy policies (Supplement Retirement Cash Flow & Legacy Planning). (Added 2026-07-22.)

## Reminders Rule (Standing Default — added 2026-07-19)
Whenever Paul asks to be reminded of something, always create a **Google Calendar event** (via the Google Calendar MCP tools) — never use a chat-only/session-based reminder. Default reminder popup at event time unless Paul specifies otherwise. Use `Asia/Singapore` timezone unless told otherwise.
- **Active reminder — 10pm IBKR raw data (added 2026-07-24):** daily recurring Google Calendar event "IBKR sends raw data to Gmail" at **10:00pm SGT**, popup at event time. Ties to the "Two separate clocks" note below (IBKR usually emails the report ~8:45–9:30pm SGT, Mondays earlier ~6:10–6:20pm SGT).

## IBKR Raw Data via Google Drive (Standing Default — added 2026-07-19)
Paul is often on phone-only (no PC/IB Gateway), so he can't always run the automated `ibkr_positions.py` / `refresh-ibkr.bat` script (which pushes straight to GitHub with zero manual steps — that's still the best option whenever his PC + IB Gateway are available).
- **Source folder:** the **"IBKR" folder in Paul's Google Drive** (folder id `1csY623IELGv_1UWFlAPAOpkaBPGEFBb2`, owner paul11ipad@gmail.com). Paul saves/overwrites his raw IBKR export(s) there — no need for him to paste a Drive link or attach the file in chat each time (a pasted link/attachment doesn't persist across sessions or authenticate reliably; the Drive MCP connector does).
- **Trigger phrases — treat all the same way:** "check the IBKR folder in Drive", "update my IBKR raw data", and "update IBKR data". On any of these: look up the latest file(s) in that Drive folder via the Google Drive MCP tools, read the raw data, and update the relevant dashboard(s)/positions data from it (currently T29 = `options-breadboard.html`).
- If the Google Drive MCP tools return an approval/auth error, don't keep silently retrying — tell Paul plainly that the connector needs re-authorization via claude.ai → Settings → Connectors → Google Drive (this has happened before; a "Yes" typed in chat does not resolve it, only the actual connector settings page does).
- **Two separate clocks — don't conflate them (clarified 2026-07-24 via Gmail search across 10 "PortfolioAnalyst Report" emails, `donotreply@interactivebrokers.com`):**
  1. **IBKR emails the report** — the report for date D lands in Paul's inbox the **evening of D+1, ~8:45pm–9:30pm SGT** (e.g. the 22 Jul report email arrived 23 Jul 9:15pm SGT). **Monday deliveries arrive earlier, ~6:10–6:20pm SGT** (seen for the 10 Jul and 17 Jul reports). This is IBKR's own send time — nothing Paul or the Apps Script controls.
  2. **Apps Script (`saveIBKRAttachmentsToDrive`) copies that email's attachment into Drive** — separately observed at **~6–7am SGT the following morning** (i.e. the morning after IBKR's evening send; corrected 2026-07-22 — file timestamps showed `Since_Inception_Detailed_11_20260717.pdf` saved 2026-07-21 ~6:59am SGT and `..._20260720.pdf` saved 2026-07-22 ~6:12am SGT). Paul hasn't confirmed the actual Apps Script trigger setting, so treat ~6–7am SGT as best-evidence, not Paul-confirmed.
  - So the full chain for report date D: IBKR sends the email ~9pm SGT on D+1 → Apps Script saves it to Drive ~6–7am SGT on D+2. The newest statement is normally sitting in Drive by early morning — no need for Paul to manually export/upload, and no need to expect anything new until that morning's run.
- **Cross-check before writing numbers:** IBKR PortfolioAnalyst PDF text extraction comes out jumbled (chart-axis numbers interleave with table numbers). Before updating any dashboard figure, verify it against at least one other section that should reconcile to the same total (e.g. Account Overview NAV walk vs. Allocation Long/Short totals vs. monthly NAV chart — they should all tie out to the same Ending NAV). If a section can't be confidently cross-checked, leave it unchanged rather than guess — say so explicitly rather than silently smoothing over an uncertain number.

### IBKR Update Log Rule (Standing Default — added 2026-07-20; index.html wiring changed 2026-07-23; moved off index.html to tools.html 2026-07-23)
Whenever Paul says **"update IBKR data"** (or any of the trigger phrases above), after refreshing T29: also write a new dated article, **IB\<next-number\>.html**, summarizing what changed — Ending NAV vs. last update, unrealized P&L moves, deposits, and any position changes — in plain language, bilingual (en/zh), following the standard page rules (Home button opens in new tab, Share button, view counter, footer, number-first title in `<title>`/`<h1>`). Reference implementation: `IB01.html`. Content = a short data recap (not a personal reflection piece) — see the Categories table above for the **IB** prefix/section details.
- **⚠️ IBKR Update Log section removed from index.html entirely (2026-07-23):** it previously showed one static hardcoded link to `ibkr-update-log.html` (after the 2026-07-23 tab-consolidation change described below). Paul asked to move it off the homepage onto the **Investment Tools hub** (`tools.html`) instead — it now lives there as its own section, **"A. IBKR Update Log"** (jump-nav anchor `#ibklog`), with one card linking to `ibkr-update-log.html`. There is **no more `ibklog-card`/`ibklog-status`/`ibklog-list` anything on index.html** — don't re-add it there.
- **Tab consolidation (2026-07-23):** Paul asked to consolidate IB01–IB04 into one page with clickable "Page 1"–"Page 4" tabs (`ibkr-update-log.html`). So for every new IB\<next-number\>.html going forward: still create the standalone dated file as before (it's the source of truth / individually shareable/linkable), but **also** manually add a new tab + `.page-panel` to `ibkr-update-log.html` (copy the pattern of the existing pages: add a `<button class="tab-btn" id="tab-N">` to `.tabs-bar`, a matching `<div class="page-panel" id="page-N">` with the article's content, bump the `setPage()`/`setLang()` loop bound to N). Also update the page-count/description text on the **`tools.html`** "A. IBKR Update Log" card (the `<div class="cnt">` next to the section header and the card's `tdesc`/date range) — this replaces the old index.html `ibklog-status` update step. Commit + push the dated IB file, `ibkr-update-log.html`, and `tools.html` together in the same commit.
- **Section moved to top + given a T-number (2026-07-23):** Paul asked to move the whole section to the top of `tools.html` (now **"A. IBKR Update Log"**, first section after Featured, with the other sections re-lettered B–G) and to label the card **"T45: IBKR Update Log — All Statements"** (tnum circle shows `45`) so it matches the numbered-card look of the rest of the hub. **T45 is a display label only — there is no `T45-*.html` file**, the card still links to `ibkr-update-log.html`. Because of this, the next real numbered tool page after T44 was **T46** (used 2026-07-24 for `T46-Update-IBKR-Data-Guide.html`, moved in from the old ADA01.html) — so **T47** is next, when following the "Investment Tools T07 and up" rule's `ls T*.html` numbering check below.

### IC Order Screenshot Review Rule (Standing Default — added 2026-08-04)
Whenever Paul shares an Iron Condor **Buy Order** screenshot (the broker's order-preview screen with the 4 legs: Sell Put / Buy Put / Sell Call / Buy Call) — e.g. asking "Correct?" — always compute and show the **% cushion** of the short (sold) strikes vs current share price, not just verify the leg structure/math:
- **Put side %:** `(Share Price − Sell Put Strike) / Share Price`
- **Call side %:** `(Sell Call Strike − Share Price) / Share Price`
- Pull live share price if available (quote fetch); if not available in the moment, say so explicitly and either use the best reference price visible (e.g. implied from breakevens) or ask Paul, rather than guessing.
- Present both % figures side by side so Paul can see whether the put or call side is tighter (lower % = less cushion = closer to being tested) — same spirit as the existing "Share Price vs Selling Put/Call" Cushion Watch table on T29, and follows the Formula Labels Rule (label the inputs, put the formula in the header).
- Do this automatically on every future IC order screenshot review — Paul doesn't need to ask for it again.

## IG (Iron Condor) Cushion Watch — Log
- **2026-07-17:** Dashboard "Share Price vs Selling Put" check flagged **NVDA** (⚠️ Tight, $202.81 vs 195P, +4.01% variance) and **QQQ** (⚠️ Tight, $695.33 vs 680P, +2.25% variance) as close to their short put strike. **AVGO** (+5.95%) and **SMH** (+8.06%) were ✅ Safe. Summary emailed as a draft to paul11ipad@gmail.com (Gmail MCP only creates drafts, not sends — Paul reviews/sends manually).
- **2026-07-17: Started IC (Iron Condor) option position(s).** Entry date marked per Paul's request.
- **2026-07-21: SPY 4-leg IC FILLED** at 23:20 SGT. Aug31'26 (41 DTE) expiry: Sold 715P @$5.80 / Bought 705P @$4.56 / Sold 770C @$4.47 / Bought 780C @$2.15, $10 wings both sides. **Net credit ~$353** (after $3.04 commissions). Max Loss ~$647, Max Return ~$353. Breakevens 711.47 / 773.53 vs spot ~$744.95. **Close target: buy back at ~$1.76 (50% of credit) for ~$176 profit.** Consider closing/rolling around 21 DTE (~10 Aug 2026) regardless of profit level.
- **2026-07-23: MSFT IC — flagged, NOT entered.** Paul asked about opening an MSFT Iron Condor tonight. **MSFT reports Q4 FY26 earnings after close on Wed 29 Jul 2026 — only 6 days out**, so a standard-cycle IC opened tonight would carry earnings-gap risk inside the expiration window (unlike the event-free SPY/index ICs above). Recommendation given: either wait until after the 29 Jul earnings to open a normal IC, or if doing a deliberate earnings-IV play, size small/wide and plan to close the next morning regardless of P&L. No position opened — live MSFT price/IV rank not pulled (fetches to Barchart/OptionCharts were blocked); check IV rank on IBKR before sizing if proceeding.
- **2026-07-23: IWM 4-leg IC FILLED** at 23:02 SGT. Aug28'26 (36 DTE) expiry: Sold 282P @$4.03 / Bought 277P @$3.00 / Sold 305C @$2.34 / Bought 310C @$1.23, $5 wings both sides. **Net credit ~$211** (after $3.02 commissions). Max Loss ~$289, Max Return ~$211. Breakevens 279.89 / 307.11 vs spot ~$294.20. **Close target: buy back at ~$1.07 (50% of credit) for ~$107 profit.** Consider closing/rolling around 21 DTE (~7 Aug 2026) regardless of profit level. No earnings risk (index ETF).
- **2026-07-29: SMH 4-leg IC CLOSED** at 23:59:25 SGT (opened 17 Jul, Aug21'26 expiry: Sold 515P/Bought 505P/Sold 650C/Bought 660C, $435 premium collected). Closed via real fills: Bought 650C @$1.19 / Sold 660C @$0.97 / Sold 505P @$28.00 / Bought 515P @$32.80, $4.60 closing commission. **Realized P&L: −$76.19** (small real loss, confirmed via Tiger trade blotter — had shown +$11.89 unrealized just the day before per the 28 Jul IBKR statement). Logged in `IB11.html` and reflected on T29 (Table 420/900).
- **2026-07-29: GOOGL single-leg short put OPENED** at 22:48:30 SGT. Sold 1× GOOGL Sep 11'26 305 Put @ $4.43 (MERCURY exchange), 44 DTE at entry. **Net credit ~$441.86** (after $1.14 commission). Not a 4-leg Iron Condor — a standalone cash-secured/naked put. Order ID 015f0c16.00017253.6a6a0…, Exch. Exec. ID 1156009. New "GOOGL" tab added to T29's Table 660 (Bang Trade Analysis) — Table 610 (Fee), Table 620 (Premium vs Fee), Table 630 (P&L), Table 640 (Timeline). No IBKR statement mark yet (filled after the 29 Jul PortfolioAnalyst cutoff) — P&L will populate once GOOGL appears in a live statement.
- **2026-07-31: AAPL — flagged, NOT entered, leg-type undecided.** AAPL reported Q3 FY26 earnings 30 Jul (beat: rev $109.42B, EPS $2.02) but sold off ~7%+ over two days to ~$302.91 on a Services revenue miss + weaker margin guidance (tariff/supply pressure) — a "sell the news" move, and the margin-guidance concern is fundamental, not just sentiment. **Earnings for this cycle are already behind** (unlike the MSFT precedent above where the event was still ahead), so no more gap risk this cycle — favors selling premium now vs waiting. Recommendation given: 1-leg cash-secured put if bullish on a bounce and OK owning shares (GOOGL-style); 4-leg Iron Condor if expecting AAPL to range now that earnings are out, sized with the put side wide since the stock is only 1-2 days off a violent move and may still be finding a bottom. No position opened — no strikes/leg-type chosen yet, live AAPL option chain/IV rank not pulled (check IV rank on IBKR before sizing).
- **2026-08-04: SMH 4-leg IC FILLED (re-opened)** at 22:35:13 SGT. Sep18'26 (45 DTE) expiry: Sold 510P @$17.95 / Bought 500P @$15.45 / Sold 620C @$21.47 / Bought 630C @$18.57, $10 wings both sides. **Net credit ~$536.90** (after $3.10 commissions). Max Loss ~$463.10, Max Return ~$536.90. Breakevens ~504.63 / ~625.37. Cushion vs a search-derived reference price (~$552.45 — live quote fetch was blocked in-session, not a confirmed tick): Put side ~7.7%, Call side ~12.2% (put side tighter). This re-opens SMH after the 29 Jul close (`IB11.html`) — new position, separate from that one.
- **2026-08-04: NVDA 4-leg IC FILLED (re-opened)** at 23:40:33 SGT. Sep18'26 (45 DTE) expiry: Sold 190P @$4.58 / Bought 185P @$3.47 / Sold 225C @$7.00 / Bought 230C @$5.56, $5 wings both sides. **Net credit ~$250.44** (after $4.56 commissions). Max Loss ~$245.00, Max Return ~$255.00. Breakevens ~187.45 / ~227.55. Cushion vs a search-derived reference price (~$206.83 — live quote fetch was blocked in-session, not a confirmed tick): Put side ~8.1%, Call side ~8.8% (put side slightly tighter). This re-opens NVDA after the 29 Jul close (`IB11.html`) — new position, separate from that one. Logged on T29 (Table 1510 Gauge card, Table 7 Win/Loss, Table 900 P&L Summary, Table 8 Premium by Symbol, Trade Log "All Option Trades" tab).
- **2026-08-04: SPY 4-leg IC CLOSED** at 23:57:24 SGT (opened 21 Jul, Aug31'26 expiry: Sold 715P/Bought 705P/Sold 770C/Bought 780C, $356 net credit). Closed via real fills: Sold 705P @$1.04 / Bought 715P @$1.38 / Bought 770C @$11.29 / Sold 780C @$6.66. **Realized P&L: −$148.60**, confirmed via broker trade blotter (12 trades that day, "Aug 04, 2026" REALIZED P&L −$148.6). Root cause: SPY rallied hard toward the 770 short call strike — even without breaching it, the 770C's proximity-driven price jump (Bought back @$11.29 vs sold @$4.47) cost far more than the put spread's gain (Put side +$90 vs Call side −$231). Paul asked why he lost money closing before price crossed the short strike — answered: IC P&L depends on distance-to-strike and IV, not just ITM/OTM breach. Logged in `IB16.html` and reflected on T29 (Table 1505 Gauge card now CLOSED, Table 900 P&L Summary, Unrealized P&L by Year card).
- **2026-08-05: NVDA2 earnings-gap risk flagged (retroactive).** NVDA's confirmed next earnings date is **26 Aug 2026 (after close)**. The re-opened NVDA condor (Table 1510, "NVDA2", filled 4 Aug 2026, Sep18'26/45 DTE expiry) sits **23 days before** that report — inside the open window, unlike the earlier closed Aug21'26 NVDA condor where earnings fell safely after expiry. This wasn't caught before the 4 Aug fill (Table 343 Earning Date wasn't re-checked). Too late to avoid entering — flagged on T29 instead: Table 1510's gauge note now shows the 26 Aug date + risk warning, and Table 343 got a new NVDA2 row (⛔ Risk, Gap −23 days) alongside the old NVDA (Aug21, closed) row. Action: watch cushion closely into 26 Aug, be ready to close/roll before the report if strikes are threatened.
- **2026-08-06: AVGO — cost-to-close explainer published, position still OPEN (not exited).** Paul asked why AVGO lost money "when exiting" and why cost to close was high. Clarified: AVGO's 17 Jul condor (Sold 350P/430C, Bought 340P/440C, $475 credit, Aug28'26 expiry) has **not** been closed — real unrealized mark per Table 900/1512 is **−$11.85** (5 Aug 21:33 SGT Tiger app), down from +$19.80 on 30 Jul. Cause: AVGO rallied hard this week (search-derived reference price ~$421.38, 6 Aug — not a confirmed broker tick) toward the 430 short call, narrowing Call Cushion (C−A)/A to ~2.0% vs Put Cushion (A−B)/A ~16.9% — same proximity/IV mechanic as SPY's IB16 loss, not a strike breach. Confirmed via web search that the rally is AI-sector/Apple-deal driven, not an AVGO earnings reaction — Broadcom's own Q3 FY26 report is scheduled **2 Sep 2026 after close** (matches T29 Table 343's existing entry), safely after this condor's 28 Aug expiry. Published as `IB20.html` + added as Page 20 to `ibkr-update-log.html` + updated the T45 card's page-range on `tools.html` (Page 1-19 → Page 1-20). No position action taken — decision to close vs hold left to Paul.
- **2026-08-06: GOOGL single-leg short put CLOSED** at 22:57:00 SGT (opened 29 Jul, Sep11'26 305 Put, Sold @$4.43, $441.86 net credit after $1.14 commission). Closed via real fill: Bought to close 305 Put @$1.10 (SAPPHIRE exchange), $0.836357 commission, Order ID 015f0c16.00017253.6a740b18.0002. **Realized P&L: +$331.02** (74.7% of the $443 max credit), confirmed via broker trade blotter ("Aug 06, 2026" REALIZED P&L $331.02) and Trade Details screen. Held 9 days of the original 44 DTE — closed after the 50%-of-credit close-target trigger fired on the 4 Aug statement (+84.8% at the time) rather than waiting out the remaining ~36 days for a shrinking additional reward; the protective put leg considered on 31 Jul was never filled, Paul closed the whole position outright instead. Logged in `IB22.html` (added as Page 22 to `ibkr-update-log.html`, T45 card page-range on `tools.html` bumped Page 1-21 → Page 1-22) and reflected on T29 (Table 1509 Gauge card now CLOSED, Table 900 P&L Summary, Table 1512 Final P&L, Unrealized P&L by Year card, Table 610/620/630/640/1516 on the GOOGL Bang tab). Also found and fixed a stale duplicate: `UNREAL_OPTIONS` (feeding the Unrealized tab's grand total) was hardcoded and had drifted out of sync with Table 900 — now derives live from `PNL_AMT`/Table 900 instead, same derive-don't-duplicate fix as `MTD_PREMIUM`/`PNL_AMT`.

## T29 Options Dashboard — Standing Notes (added 2026-07-23; renamed from "Table 30" to "T29" 2026-07-24)
- `options-breadboard.html` is nicknamed **T29** (previously "Table 30"). Its filename stays `options-breadboard.html` — only the display label/nickname changed, so all existing links still work.
- **T29 already had an internal sub-section called "Trading Rules" that used the number T29 too** (a `T29: Trading Rules` label on the Cushion tab) — renumbered to **T50: Trading Rules** on 2026-07-24 to avoid a duplicate T29 on the same page.
- The **Account Value** card (NAV chart, $54,940.59, since-inception %, period buttons) lives only on the **Positions** tab of `options-breadboard.html`. **Do not duplicate or move it into other tabs** (e.g. the new IC Benefits tab) — Paul confirmed this explicitly when reviewing the IC Benefits tab.
- **Table 900 auto-update on every IBKR data refresh (Standing Default — added 2026-07-30):** whenever Paul refreshes IBKR raw data (any trigger phrase from the "IBKR Raw Data via Google Drive" rule above — "check the IBKR folder in Drive", "update my IBKR raw data", "update IBKR data"), automatically scan the new statement/trade confirmation for any option trade not yet reflected in **Table 900 (P&L Summary)** on `options-breadboard.html` — new symbol opened, existing position closed, or a P&L/premium figure that changed — and update Table 900 accordingly (add new row with `data-sym` + `POSITION_STATUS`/`MTD_PREMIUM` entries, or refresh an existing row's status/P&L). Don't wait for Paul to separately say "add X to Table 900" — folding it into the regular IBKR update step is now the default. Only use real numbers pulled from the statement (per the No-Guessed-Coordinates-style rule: never fabricate a fill price/premium) — if a trade filled after the statement's cutoff and isn't in the data yet, leave it out and say so explicitly, same as the GOOGL/FDS precedent, rather than guessing.
- **Live share price auto-refresh cadence (Standing Default — added 2026-07-31):** all live share prices on `options-breadboard.html` (T6 tables, cut-loss cards, etc. — every symbol fetched via `fetchQuotes`/`loadAll`/`loadShares`/`loadPutOnlyStocks`) auto-refresh **every 1 minute during US market trading hours** (9:30am–4:00pm ET, Mon–Fri) instead of the old flat 5-minute interval; outside trading hours it falls back to every 5 minutes since prices aren't moving. Apply this same cadence to any future live-price dashboard on the site, not just T29.

## How Paul Likes Me to Work (Standing Preferences)
These apply to ANY assistant (notebook Claude Code / phone Claude app) — please follow them.
- **Be brief.** Terse, no-fluff answers. Lead with the outcome.
- **Don't ask "Can I?" / "Shall I proceed?"** before routine work on Paul's own assets — just do it, then report. No permission-gating mid-task. This includes structural/design calls (e.g. how a page or nav section should be laid out) and follow-through steps like opening a pull request on a repo Paul already owns — use best judgement and proceed, don't pause for confirmation. (Added 2026-07-23, after being asked twice in one session not to gate on this.)
- **Reaffirmed 2026-08-04:** this also covers opening a PR as a fallback when a direct push to `main` is blocked (e.g. a session's git access is scoped to a feature branch only) — just open the PR and report the link, don't ask first. General principle: never end a turn with "want me to do X?" for routine follow-through on Paul's own repo — do X, then say what was done.
- **Reaffirmed 2026-08-06:** also covers merging that PR once CI is green — don't wait for Paul to say "merge it," just merge and report the result (with a live-link check afterward, per "After Every Deployment" below).
- **Commit and push immediately** after every change — no need to inform Paul before committing. Just do it silently and confirm with the result.
- **EXCEPTION — always get approval before creating anything NEW & outward-facing:** never create a new website, new GitHub repo, new hosting project (Netlify, Vercel, etc.), or new domain without Paul's explicit OK first. (Editing/pushing to repos he already owns is fine.)
- **Clean links.** When giving Paul a URL, write the bare clickable link — never append `**` or any punctuation to the end of it.
- **Always show the link.** When an action opens a website/page, give the real clickable URL — never just say "opens in your browser" or "shows a link." Paul taps it on his phone.
- **Step-by-step for technical tasks.** When guiding Paul through setup (GitHub, Google, etc.), one short step at a time; wait for his screenshot/confirmation before the next step.
- **Plain language.** Explain simply (he likes practical, hands-on, "explain like I'm new" answers).
- **Screenshot = PDF.** When Paul shares a screenshot of a document (booking, confirmation, receipt, etc.), automatically convert it to PDF, push it to the repo, and add a "📄 View PDF" link button to the relevant page — no need to ask.
- **Never store secrets.** No tokens/passwords/API keys in any committed file or chat. If one is exposed, tell Paul to revoke/change it immediately.
- **Private info stays private.** Passport, home address, account numbers, passwords are NEVER put in this public repo.
- **Name:** Paul's personal AI orchestrator is named **David** (renamed from "Larry" on 2026-05-31). Address Paul as "Paul".
- **Orchestrator note (notebook only):** on the notebook, Claude runs as "David" and delegates work to a specialist AI team; the phone app won't have that team.
- **Syncing a new rule from phone → notebook:** the phone app can't update Paul's notebook or this file directly. So when Paul makes a new rule on the phone, email it to paul11ipad@gmail.com with **"NEW RULE"** in the subject. David (notebook) checks Gmail for "NEW RULE" emails at the start of each session and saves them into memory + this file. (On phone, offer to send that email for him.)

## Screenshot After Every Task (Standing Rule)
After completing ANY task that changes a page or adds a feature:
1. Take a screenshot of the result using Playwright (standalone HTML if external fonts block the full page load).
2. Send it to Paul immediately — before saying "done".
3. Then give the live link.

## Verify Before Sharing Links
Before telling Paul to check any live URL, always verify the result yourself first:
1. Attempt WebFetch or Bash curl **immediately after every push** — do not wait for Paul to ask.
2. Do not lazy-load tools — have WebFetch ready before pushing so the check happens with no delay.
3. Only THEN tell Paul it's ready with the confirmed live link.
4. If the environment blocks the test (network restricted), say so explicitly and immediately — never say "check in X minutes" without first attempting verification.

## Self-Fix Rule (no approval needed)
If something is not working after a fix attempt, do NOT wait for Paul's approval to try again.
- Immediately find a workaround and apply it.
- Keep Paul updated with a short status: what failed, what you tried next.
- Only stop and ask Paul if you are completely stuck with no remaining options.

## David's AI Team (roster)
David (the orchestrator) delegates work to these specialists. NOTE: the real specialist agents only run on Paul's notebook (Claude Code). On phone/remote you cannot dispatch them — but you can write *in their style* if Paul asks.
- **Dash** — Financial dashboard developer. Interactive portfolio/brokerage dashboards (esp. IBKR), charts, responsive web UI.
- **Jade** — Frontend developer for simple, fast journaling web apps (vanilla HTML/CSS/JS, local storage, accessibility-first).
- **Lamb** — Direct-response copywriter. Short-form persuasive copy: ads, landing pages, emails, taglines, microcopy.
- **Mara** — Marketing lead / CMO for Paul's AI-training services. Strategy, positioning, funnels, launch plans, copy briefs.
- **NOVA** — Travel app developer. Location-aware mobile-first web apps (nearby hotels/food/attractions via maps + GPS).
- **Nolan** — Head of People (HR). Creates new team-member personas.
- **PAX** — Senior researcher. Researches roles/topics; fact-finding.
- **SWEETIE** — Creative story writer. Personal travel stories & life reflections in Paul's voice, as publish-ready HTML for the website (s-series). **IMPORTANT:** Every story/article title and filename MUST start with the category prefix + zero-padded 2-digit number (e.g. `S20:`, `AI06:`). Never write a title or create a file without the number prefix.

## MT09 — Xinjiang 2026 Trip Notes
- **Flight booked:** Scoot TR134 · SIN→XIY · 28 Aug 2026 19:05 → 00:40 (+1) · Booking ref **LDSCTQ** · SGD 702.73 (3 pax)
- **MT09.html** has an **✈️ Air Ticket** tab with full booking details + PDF download (`MT09_flight_SIN_XIY.pdf`)
- **Share button** added to MT09 header (top right, next to 中文 toggle)

## Trip Photo → Daily Log Rule (Standing Default — added 2026-07-03)
Whenever Paul sends a photo during an active trip (e.g. MT09, MT10), automatically add it to that trip's **current day's log page** (e.g. `MT10-day3.html`) — no need to ask which page or wait to be told "add this photo."
- Resize/reduce resolution before embedding, fix orientation, save into that day's `img_<PAGE-NAME>` folder (e.g. `img_MT10-day3`).
- Add it to the page's photo journal (`galleryPhotos` array or equivalent) with a bilingual `en`/`zh` caption + short story paragraph, per the Photo Journal Rule.
- Commit and push immediately.
- If it's genuinely unclear which day/trip a photo belongs to, ask once — otherwise default to "today's" day page for the currently active trip.

### 🎬 Video Poster Frame Rule (Standing Default — added 2026-07-08)
Whenever a video is added to a photo journal (`galleryPhotos` array or equivalent), always extract the thumbnail/poster image from **frame at 0:02** (not frame 0) — `ffmpeg -y -ss 2 -i input.mp4 -vframes 1 poster.jpg` or equivalent. Frame 0 is often still mid-transition/blank; 0:02 is a safer default for a clean poster. Set it via the `poster` attribute on the `<video>` element (both the grid thumbnail and the lightbox) so it displays that frame instead of a black box before playback. Only deviate if Paul specifies a different timestamp.
- **Play hint text (generic, not content-specific):** the tap-to-play overlay caption must always read **"Tap ▶ to play video"** (bilingual: `<span class="en">Tap ▶ to play video</span><span class="zh">点击▶播放视频</span><span class="ja">▶をタップして再生</span>`) — never reference the subject of the photo (e.g. not "Tap mountain to play"), since future videos won't always show a mountain.

## Site Info
- **Live URL:** https://paulsworld.vercel.app
- **GitHub repo:** paulyeo11/paulsworld · **Branch:** main (Vercel auto-deploys from `main`)
- **Hosting note (added 2026-07-19, reverted same night):** briefly migrated to Netlify after Vercel's production deployment got stuck on an old commit for over an hour despite clean pushes to `main` — a recurring problem (see AIT10, AIT12). Netlify deployed reliably during testing, but Paul chose to move back to Vercel the same night after Vercel started working again. `netlify.toml` and `netlify/functions/*.js` are left in the repo as inert leftovers from that attempt, not the active deploy path — the live serverless functions are `api/*.js` (Vercel's `(req, res)` handler signature). If Vercel's deployment freezes again, Netlify is already fully wired up (same repo, same GitHub connection) as a fast fallback — see AIT12.html for the full story.
- **Dual-site rule (added 2026-07-21):** Paul wants **both** https://paulsworld.vercel.app and https://paulsworld.netlify.app kept live and up to date going forward — not just Vercel. Both sites auto-deploy from the same GitHub repo/branch (`main`), so the normal `git push` workflow already updates both with zero extra steps — no separate action needed per site. **Known caveat:** Netlify's account is on the Free plan, which now includes a monthly "operational credits" allotment for production deploys/Agent Runners. If that runs out mid-cycle, Netlify pauses new deploys (site stays live on its last successful deploy) until either the next billing cycle resets it or Paul upgrades the team plan — this is a Netlify account-level pause, not something fixable via a script, git push, or the Netlify MCP tools. When this happens: tell Paul plainly (don't keep silently retrying), point him to netlify.app dashboard → paulsworld → Deploys → "Trigger deploy" (only works once credits are available again), and confirm Vercel is unaffected in the meantime.
- **Netlify credits exhausted — confirmed unusable until 16 Aug 2026 (added 2026-07-26):** Paul confirmed the Free-plan operational-credits pause above has actually hit — Netlify (paulsworld.netlify.app) is stuck serving a stale old build (observed still showing pre-2026-07 tabs/layout) and won't pick up new pushes until credits reset. Don't suggest the Netlify link as a live fallback/mirror until after 16 Aug 2026 — treat Vercel as the only reliable live site until then.
- **Vercel free-plan daily deployment cap — 100/day (confirmed 2026-07-24, see AIT14) — RESOLVED 2026-08-04, Paul upgraded to a paid Vercel plan, no more 100/day cap.** Previously: Vercel's free plan hard-capped at **100 deployments per day**. Once hit, any new push (auto-deploy or manual "Create Deployment") failed with `Resource is limited — try again in 24 hours (more than 100, code: api-deployments-free-per-day)`, and the site stayed frozen on its last successful deployment until the cap reset ~24h later — this was the cause of the "deployment stuck / pushes not showing up live" symptom (see AIT10/AIT12/AIT14). **This no longer applies** — don't cite the 100/day cap as an explanation for a stuck/frozen deployment going forward; if a push doesn't go live now, check the Vercel dashboard → Deployments tab for the actual status/error instead of assuming this cap.
- **Profile photo:** `IMG_1887.jpeg` (repo root). Always reference via absolute URL:
  https://raw.githubusercontent.com/paulyeo11/paulsworld/refs/heads/main/IMG_1887.jpeg

## Authentication (IMPORTANT — no tokens in this file)
- Push using the **`gh` CLI**, which is already authenticated as `paulyeo11`.
- **NEVER** store a GitHub personal access token in this repo, in any committed file,
  or in chat. This is a public repo. If a token is ever pasted, treat it as
  compromised and tell Paul to revoke it.

## GitHub Auto-Push Rule
- Whenever an HTML file is created or updated, push it directly to `main` automatically
  (via gh/git) — no need to ask Paul, never ask him to copy/paste or upload manually.
- **Explicitly applies to Filtec dashboard pages too** (`filtec-sales-dashboard.html` and any
  other `filtec-*.html` files) — confirmed 2026-07-29 after Paul said "Always remember push to
  Filtec." Same commit-and-push-to-`main`-immediately workflow as every other page on the site,
  nothing Filtec-specific about the mechanics.
- After every successful push, confirm with the **file name and commit SHA**.
- **ALWAYS fetch + rebase before pushing** — never push cold. Every push must follow:
  `git fetch origin main && git rebase origin/main && git push -u origin main`
  This prevents the "remote contains work you do not have" rejection that happens when
  another session or commit has already advanced `main`. Never skip this step.

### ⚠️ Feature/session branches MUST land on `main` the same turn (learned 2026-07-03)
Vercel **only deploys from `main`**. On Claude Code web/remote sessions, the harness may assign
a separate working branch (e.g. `claude/day-3-my83ms`) instead of `main`. If work is committed
and pushed only to that branch, it is invisible on the live site — Paul will see "photo not
appear" even though the push "succeeded." To prevent this:
- After pushing to a session/feature branch, **immediately also merge that branch into `main`
  and push `main`** in the same turn (`git checkout main && git pull && git merge --no-edit
  <branch> && git push origin main`), so every change goes live right away.
- Do this for every commit in the session, not just at the end — don't let changes pile up
  unmerged on a side branch.
- If a session's branch instructions ever conflict with "changes must appear live," resolve
  it by keeping `main` in sync after every push, since a live, working site takes priority.
- Always verify the live URL afterward (per "After Every Deployment" rule below) — that catches
  this class of bug immediately instead of Paul discovering it later.

### Number-First Place Titles (Standing Default — added 2026-07-11)
Whenever a place/stop appears in a numbered itinerary or route (day-log section headers, "Today's Visit"/"Today's Plan" titles, map marker names/popups, photo captions tied to a stop) — the **label always goes in front of the place name**, as the very first thing in the title: `D. Camp Site (Niseko Sahina Campsite)`, not `Camp Site (Niseko Sahina Campsite) D` or `Camp Site — Stop D`. Applies to English, Chinese, and Japanese versions alike. If the map already auto-labels markers/popups via code, don't also bake a label into the `name` field there — only add the explicit label to static text (section headers, body copy) that isn't auto-labelled, so it doesn't double up.

**Letters, not numbers (Standing Default — added 2026-07-11):** Use **A, B, C…** for this sequence, not 1, 2, 3. This applies everywhere the sequence appears — map markers/popups, arrival-card labels, day-log section titles, body text — for ALL trip maps and day logs going forward, not just one page. Auto-generate the letter from array position (e.g. `String.fromCharCode(65 + i)`) rather than hardcoding. No need to ask each time — this is now the default; only revert if Paul explicitly asks for numbers again.

### Day Log Starting Point Rule (Standing Default — added 2026-07-11)
Every day-log route/map (the `stops` array, section list, and any "Today's Visit" sequence) **always starts with Paul's hotel for that night as Stop A** — the first stop in the sequence, before any food/sightseeing stops. This applies automatically to every trip day log going forward, not just when Paul explicitly says "starting at my hotel." Pull the hotel name/address/coordinates from that trip's existing hotel data (already used on other day pages for the same stay, e.g. the `type: "start"` stop) rather than asking Paul. If the day already has other stops logged (created before the hotel was added), insert the hotel as the new Stop A and re-letter the rest (B, C, D…) — don't ask, just do it and confirm after.

### Nearest-Next Stop Ordering Rule (Standing Default — added 2026-07-11)
After Stop A (the hotel, per the rule above), **auto-arrange the remaining stops by proximity — always route to the nearest not-yet-visited location next**, rather than keeping whatever order photos/notes happened to arrive in. Do this automatically for every day-log route/map, without being asked:
- Starting from Stop A, repeatedly pick the closest remaining stop (straight-line distance from lat/lng is fine — no need for a full driving-time API) to build the sequence: A → nearest → next-nearest-from-there → … This is a simple nearest-neighbor route, not the shortest overall route — good enough for a day log.
- Re-letter stops (A, B, C…) to match the new nearest-first order.
- Update section titles, map markers/popups, and the `stops` array together so everything stays in sync — don't leave the array in one order and the section headers in another.
- If Paul gives an explicit fixed order or a stop has a fixed time commitment (e.g. a booked lunch reservation, a scheduled tour), respect that override instead of re-sorting by distance — only auto-arrange when order isn't otherwise specified.
- Applies to all trip day logs and route maps going forward, not just one page.

### Distance-Between-Stops Table (Standing Default — added 2026-07-12, driving-time column added 2026-07-12)
Every day-log route/map with 2+ stops must include a **"Distance Between Stops" table** right below the map legend, before the per-stop "Today's Visit" sections — automatically, without being asked. One row per consecutive leg (A → B, B → C, …), with **three columns: Leg, Distance, Driving Time**.
- **Distance:** straight-line (great-circle) distance in km, e.g. `~1.1 km`. Straight-line from lat/lng is fine — no distance API needed (same reasoning as the Nearest-Next Stop Ordering Rule).
- **Driving Time:** an estimate in minutes, e.g. `~15 min`. Derive it from the straight-line distance using a rough average speed — ~30 km/h for short in-town/single-turn legs, ~40–45 km/h for longer rural/highway legs — no live routing API needed. This is a ballpark for the reader, not a precise ETA.
- Always add a small note under the table that distance is straight-line (not driving distance) and driving time is a typical-speed estimate, not live traffic.
- Reference implementation: `MT10-niseko-day6.html`.
- If a stop's time/order changes later, keep this table in sync with the `stops` array (re-letter rows and recompute distance + driving time) in the same edit — don't leave it stale.
- Applies to all trip day logs and route maps going forward, not just one page.

## Interactive Route Map Rule (Standing Default)
Whenever Paul's article/story includes a hiking route, travel route, or any sequence of locations with photos — **always build an interactive Leaflet.js map** with ALL of the following, automatically, without being asked:

- **Map Type Toggle (MANDATORY — always include):** Two buttons top-right of the map: `🛰 Satellite` and `🗺 Street`. **Street is the default (gold highlight)**; Satellite = ESRI World Imagery. Implementation pattern:
  ```javascript
  var tileLayers = {
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'© Esri',maxZoom:18}),
    street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19})
  };
  tileLayers.street.addTo(map);
  var currentTile = 'street';
  function setMapType(type) {
    if (type === currentTile) return;
    map.removeLayer(tileLayers[currentTile]);
    tileLayers[type].addTo(map);
    currentTile = type;
    // update button styles: active = gold bg + dark text, inactive = translucent
  }
  ```
  Button HTML (place inside the map's `position:relative` wrapper):
  ```html
  <div style="position:absolute;top:10px;right:48px;z-index:1000;display:flex;gap:4px;">
    <button onclick="setMapType('satellite')" id="btn-satellite" style="background:rgba(255,255,255,0.18);color:#fff;border:1px solid rgba(255,255,255,0.35);border-radius:20px;padding:5px 12px;font-size:0.75rem;font-weight:700;cursor:pointer;">🛰 Satellite</button>
    <button onclick="setMapType('street')" id="btn-street" style="background:#f59e0b;color:#0d1117;border:none;border-radius:20px;padding:5px 12px;font-size:0.75rem;font-weight:700;cursor:pointer;">🗺 Street</button>
  </div>
  ```
- **Tiles:** Street (OSM) is the default. Satellite = ESRI (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`)
- **Markers:** Lettered (A, B, C…) coloured circle markers — 🔴 red = Start/End, 🟠 orange = road/transport section, 🟢 green = forest/nature section, 🔵 blue = water/reservoir section. (Changed from numbers 1,2,3 to letters A,B,C — standing default since 2026-07-11.)
- **Route line:** Orange dashed polyline connecting all stops in order
- **Photo popup:** Tapping any marker shows a popup with the photo + caption + "View Full Photo" button (opens lightbox)
- **Fullscreen button:** CSS-based (NOT browser requestFullscreen API — doesn't work on iOS). Use `position:fixed; top:0; left:0; width:100vw; height:100vh` on the map div with a visible "✕ Close Map" button top-right
- **"Open Full Screen Map" button:** Prominent button above the map (accent colour, rounded pill style)
- **Legend:** Bottom-left corner showing colour key
- **Leaflet fullscreen plugin** for the corner expand icon: `https://cdnjs.cloudflare.com/ajax/libs/leaflet.fullscreen/1.6.0/Control.FullScreen.min.css` + `.min.js`
- **Map placement:** Right below the hero section (NOT buried at the bottom)
- **Note:** If GPS was stripped from uploaded photos, estimate coordinates from Google Maps screenshots or known geography — place markers in route sequence order

Reference implementation: `S23.html` (The Secret BKE Trail, 18 June 2026)

**Applies to simple trip maps too (added 2026-07-05):** Even a simple point-to-point map (e.g. a day-log travel map showing hotel → airport → airport → next hotel, with no photos on the markers) should still get the CSS-based fullscreen toggle — "⛶ Open Full Screen Map" button above the map + "✕ Close Map" button. Reference: `MT10-day6.html`. The satellite/street toggle, numbered markers, and legend are optional for these simpler maps if the route only has a couple of stops — but fullscreen is not optional.

**Also applies to standalone single-map pages (added 2026-07-06):** `MT10-day6-map.html` (a standalone animated transfer map, not embedded in a day-log page) shipped without the fullscreen toggle — this rule was missed because the page had no other content around the map. Any page whose whole purpose *is* a map — animated or not — still needs the same "⛶ Open Full Screen Map" / "✕ Close Map" buttons as above. Don't assume a dedicated map page is exempt just because it's simple.

### "Make animated map" default style (reverted 2026-07-10)
When Paul just says **"make animated map"** for a trip day, build the **standard simple style** described at the top of this section — a normal-sized embedded map on the page (not fullscreen by default), numbered pins, dashed route line, satellite/street toggle, legend, Play/Speed controls below the map, and a manual "Open Full Screen Map" button. Reference implementation: `MT10-niseko-day3-map.html` / `MT10-niseko-day4-map.html`.
- **Tried and reverted:** a "full-page alternating slideshow" variant (car fullscreen between stops, then a full-page photo takeover on arrival, looping automatically) was built and shipped on 2026-07-10, but Paul didn't like it after seeing it live — too small/unclear on the log page and not what he wanted opening the map to look like. Reverted same day. **Do not default to this style again** — only build something like it if Paul very explicitly re-describes that exact full-page/slideshow behavior in detail.
- Pull stops, order, photos, and addresses straight from that day's existing log page (`img_<PAGE-NAME>` folder + gallery captions) — only ask Paul for info that isn't already there (e.g. a missing address, or ambiguous stop order).
- Filename pattern: `<DAY-LOG-NAME>-map.html` (e.g. `MT10-niseko-day5-map.html` for `MT10-niseko-day5.html`).

### 🐛 Bug learned from MT10-niseko-day6 "car not moving" (fixed 2026-07-11)
Despite the rule above, `MT10-niseko-day6.html` shipped with the reverted full-page slideshow style and — worse — never actually added a car marker at all, so the "Animated Route Map" had nothing moving on it. The revert instruction existed in this file but wasn't checked against before building.
- **Self-check before shipping any "Animated Route Map" page:** it must contain an actual moving marker (`carIcon` + `mover`, the 🚗 emoji driving along the route) — not just a map with static pins. If you wrote "Animated Route Map" in a title/section and there's no `carIcon` in the script, it's broken.
- **Pre-push hook now enforces this automatically** (`.githooks/pre-push`, `check_animated_map`) — blocks any push of an HTML file containing "Animated Route Map" that (a) has no `carIcon`/🚗 marker, or (b) resurrects the reverted `slideshow-active` + `arrival-card` pattern.
- **Lesson:** a standing instruction written in this file is not self-enforcing — when a rule exists specifically to prevent a repeat mistake, back it with an automated check (like the bilingual pre-push check above) rather than relying on remembering to re-read CLAUDE.md every time.

### 🚗 Real-Road Routing Rule (Standing Default — added 2026-07-12)
Every "Animated Route Map" car — and its route line — **must follow the real driving road (turns included), never a straight line** between stops. This is the default for ALL trip day-log maps going forward; Paul never needs to ask for it.
- Fetch each leg's real road geometry client-side from OSRM (free, no key, CORS-enabled): `https://router.project-osrm.org/route/v1/driving/{lng1},{lat1};{lng2},{lat2}?overview=full&geometries=geojson`
- Swap the placeholder straight dashed line for the real road points once fetched; animate the car marker along those points (by cumulative distance, not simple 2-point lerp) so it actually turns at bends.
- Rotate the 🚗 marker to face the direction of travel — use a short look-ahead point along the current road segment (not just the straight stop-to-stop bearing) so it steers smoothly through turns.
- Always keep a straight-line fallback (2-point "route") for a leg if the OSRM fetch fails or hasn't resolved yet — never leave the car stuck with no path.
- Reference implementation: `MT10-niseko-day6.html` (`buildRoads()` / `pointAtFraction()` / `fetchRoadSegment()`) and `MT10-niseko-day5-map.html`.

## Map Links Rule
**Photo with GPS EXIF data (added 2026-07-08):** Whenever Paul sends a photo, always check its EXIF metadata for GPS coordinates first.
- If GPS is present: automatically create all three map links (Google/Baidu/Amap) from those exact coordinates and place them directly below the photo — no need to ask, no address required from Paul.
- If GPS is missing (common when photos are stripped of metadata by messaging apps): tell Paul explicitly that there's no GPS data, and ask him for the address instead of guessing the location.
- Never guess a location from photo content alone (e.g. assuming a flower photo was taken at a specific shop) — only use it if GPS coordinates are actually embedded, or Paul confirms the location.

Whenever Paul asks to "add map link", "add google location", or similar — always add **all three** map buttons together:
1. **Google Maps** — `https://maps.google.com/?q=LAT,LNG&label=Name`
2. **百度地图** — `https://map.baidu.com/search/URL_ENCODED_CHINESE_NAME`
3. **Amap (高德地图)** — `https://uri.amap.com/marker?position=LNG,LAT&name=URL_ENCODED_NAME`

Button style pattern:
```html
<a href="GOOGLE_URL" target="_blank" style="background:rgba(66,133,244,0.2);border:1px solid rgba(66,133,244,0.4);color:#74b9ff;font-size:0.72rem;padding:5px 9px;border-radius:8px;text-decoration:none;white-space:nowrap;">🗺️ Google</a>
<a href="BAIDU_URL" target="_blank" style="background:rgba(228,31,25,0.15);border:1px solid rgba(228,31,25,0.4);color:#ff6b6b;font-size:0.72rem;padding:5px 9px;border-radius:8px;text-decoration:none;white-space:nowrap;">百度地图</a>
<a href="AMAP_URL" target="_blank" style="background:rgba(30,180,100,0.15);border:1px solid rgba(30,180,100,0.4);color:#2ecc71;font-size:0.72rem;padding:5px 9px;border-radius:8px;text-decoration:none;white-space:nowrap;">高德地图</a>
```

### 🚫 No-Guessed-Coordinates Rule (Standing Default — added 2026-07-12)
**Learned the hard way:** a hand-estimated lat/lng for Kutchan Catholic Church (guessed from nearby block numbers, no real geocode) was used as the actual map pin and Directions destination. Paul tapped Directions, was routed to the wrong spot, and missed his appointment. Never let that happen again:

- **Never invent a lat/lng and treat it as real.** If a real geocode isn't available (Nominatim/Photon/etc. blocked, no EXIF GPS, no confirmation from Paul), do NOT fabricate coordinates from nearby streets/block numbers and use them as the actual pin/destination — a wrong-looking pin someone might sanity-check is far safer than a wrong pin fed straight into "Directions."
- **Every stop object gets an explicit `verifiedGps` flag:** `true` only if the coordinate came from a photo's GPS EXIF, Paul's own confirmation/screenshot, or a geocoding API call that actually returned a result — never from estimation/guessing. Default/absent = not verified.
- **Directions and the primary Google Maps button must be address-based, not coordinate-based, whenever `verifiedGps` is not `true`.** Build the URL from the literal address/name text (`https://www.google.com/maps/dir/?api=1&destination=` + encoded "Name, Address", and `https://www.google.com/maps/search/?api=1&query=` + encoded "Name, Address") so Google's own geocoding resolves it correctly — this makes an imprecise guess harmless because the button never routes off the guess. Only use `lat,lng` directly in these links once `verifiedGps: true`.
- **A guessed pin still shown on the embedded map must carry a visible, on-page warning** (not a muted footnote) telling Paul not to trust the pin and to use the address-based button instead — until it's corrected. Reference: `MT10-niseko-day6.html`.
- **To actually verify and close this out:** ask Paul to send a screenshot of the correct Google Maps pin (or the GPS-tagged photo) — then set real `lat`/`lng`, flip `verifiedGps: true`, switch the buttons back to coordinate-based, and remove the warning banner.
- Applies to every stop added to any day-log/route map going forward — not just this one page.

## Formula Labels Rule (Standing Default — added 2026-07-23)
Whenever a table/report shows a calculated column (variance, %, ratio, cushion, etc.), label the inputs with single letters (e.g. `Share Price (A)`) and put the formula right in the calculated column's header using those same letters (e.g. `Variance (A−B)/A`), not just in a note paragraph below the table. Keep letters consistent across the whole table (same letter = same input everywhere it's used). Apply this automatically to every new calculated-column table going forward — no need to ask each time. Reference implementation: the Cushion tab's "Share Price vs Selling Put & Call" table on `options-breadboard.html` (Share Price (A), Selling Put (B), Selling Call (C), Put Variance (A−B)/A, Call Variance (C−A)/A).
- **Trigger phrase for existing/older tables:** "add formula to label" (or similar) — retrofit this same A/B/C-letter + header-formula treatment onto whichever table/report Paul is currently looking at, even if it predates this rule.

## Table & Chart Numbering Rule (Standing Default — added 2026-07-24)
Every table and every chart added anywhere on the site from now on must carry a visible number label — e.g. `Table 31`, `Chart 4` — shown right in its heading/title (not just referenced elsewhere), so it can always be uniquely pointed to. Applies to data tables and charts alike (line/bar/pie/NAV charts, comparison tables, etc.), on any page/category — not just Investment Tools.
- **Before assigning a number:** grep the repo for existing `Table \d+` / `Chart \d+` usage (same numbering-check pattern as the `T<number>`/`S<number>` rules elsewhere in this file) and use the next unused number in that sequence — tables and charts are numbered in separate sequences (`Table N` vs `Chart N`).
- Bilingual as always (`Table 31` / `Chart 4` stay the same in `en`/`zh` — only surrounding text translates, per existing convention e.g. `Table 60` on `options-breadboard.html`).
- Do this automatically going forward — Paul never needs to ask each time.
- **Column-fit rule (added 2026-08-01):** for any table report with **2 to 5 columns**, lay it out so all columns fit on one screen/page — no horizontal scrolling or cut-off columns on mobile. Prefer a vertical (label/value row-per-field) layout when a horizontal row would overflow the viewport; only use a horizontal one-row-per-item layout when it comfortably fits. Learned from `options-breadboard.html` Table 10 (Gap tab) — an initial horizontal 5-column layout got cut off on Paul's phone and had to be rebuilt vertically.
- **No stale subtitles when a table's data scope changes (Standing Default — added 2026-08-04):** whenever a table/card's underlying symbol list, row count, or coverage changes (e.g. adding a new position to an existing table), grep the whole file for every other place that count/list is mentioned in prose — subtitles (`c-meta`), notes below the table, JS comments — not just the render function or the row you're adding. A table's data and its descriptive subtitle are easy to drift apart because they live in different places (one in a JS array, one in static HTML text), and only fixing the array leaves a wrong-looking label sitting right above correct data. Learned from `options-breadboard.html` Table 10 (Gap tab): SPY/IWM/XLE were added to the render loop and the table showed all 7 rows correctly, but a separate hardcoded subtitle line ("All 4 flagship Bang Iron Condors — QQQ, NVDA, SMH, AVGO") right above it was missed and kept showing 4 — Paul saw the mismatch and reported the table as "not displaying" when it actually was.
  - **Prefer generating the subtitle from the same array/config the table renders from**, rather than hand-writing prose that has to be kept in sync manually — e.g. Table 10's subtitle (`#gapTable10Meta`) is now built by `renderGapTable10Meta()` from `GAP_TABLE10_SYMS`/`BANG_4_SYMS`/`POSITION_STATUS`, so it can never go stale again no matter how that list changes later. Do this for any future table/card whose subtitle states a count or list that's also driven by a JS array.
  - Applies to every table/card on the site going forward, not just Table 10.
- **No duplicated P&L/premium numbers across JS objects (Standing Default — added 2026-08-06):** the same lesson as above applies to *numbers*, not just subtitle prose. Never hand-copy a position's P&L, premium, or status into a second JS object (e.g. a standalone `PNL_AMT = {...}` map feeding a different table) when a canonical table (e.g. Table 900's `data-pnl`/`data-premium` row attributes) already holds that number — the copy *will* drift the next time only the canonical table gets updated, exactly like `MTD_PREMIUM`/`PNL_AMT` did on `options-breadboard.html` (IWM and GOOGL went stale after a Table 900 refresh on 2026-08-04, only caught 2026-08-06). **Derive the second object from the canonical table's DOM at load time instead** (see `buildTable900Lookup()` on `options-breadboard.html` — reads every `#table900Body tr[data-sym]`'s attributes into a lookup object) so every downstream table/gauge/dashboard automatically tracks the canonical source with nothing to edit twice.
- **Symbol-key reuse audit (Standing Default — added 2026-08-06):** when a position **closes and later re-opens under the same ticker** (e.g. SMH closed 29 Jul, re-opened 4 Aug), decide up front whether the *same* symbol key keeps referring to the new position (with the old one renamed, e.g. `SMH` → `SMH_JUL`) or gets a fresh key instead (e.g. `NVDA` stayed the closed one, the new one became `NVDA2`) — then **grep the whole file for every data structure keyed by that symbol** (`RAIL_CFG`/`GAP_TABLE10_EXTRA`/`POSITION_STATUS`/any symbol-array like `sortedByPutCushion()`'s base list) and update all of them together, not just the one you're actively editing. A renamed-but-not-re-registered key doesn't error — it just silently vanishes from every table/filter that builds its row list from a hardcoded symbol array, which is exactly what happened to the closed SMH (Jul) condor on `options-breadboard.html`: it disappeared from Table 6 (Share Price vs Selling Put & Call) under every filter, with no error, because `sortedByPutCushion()`'s array was never updated to include the renamed key.
- **Whole-tab prose refresh, not just the one table asked about (Standing Default — added 2026-08-06):** the two rules above cover numbers duplicated into a second *table* or *JS object* — but a symbol's live P&L also gets hand-copied into free-text **notes**: the tab's top banner, the "Simple answer" note under its own P&L table, and its Timeline card. None of those are driven by an array, so grepping for a stale table row doesn't catch them. Whenever a symbol's real mark changes (any Table 900 refresh, or any one-off ask like "update Table 450"), grep that symbol's **entire tab** for its old dollar figure(s) and date(s) in prose — not just the table named in the request — and refresh every "current"/"today"/"latest" mention together in the same edit; leave only clearly-labeled historical timeline entries untouched. Learned from `options-breadboard.html`'s AVGO tab: Table 450 got extended and correctly flagged its own divergence from Table 900, but the tab's banner, Table 460, Table 470, and Table 480 still quoted the older +$19.80 mark until a follow-up pass caught it — Paul had to ask "update the rest" instead of it happening in one pass. Where practical, prefer converting these notes into a JS-populated `<span id>` sourced from `buildTable900Lookup()` (same pattern as Table 10's subtitle) so they can't drift again — see the AVGO tab as the pilot candidate if Paul wants this built out.

## Hotel Booking Data Consistency Rule (Standing Default — added 2026-08-06)
**Learned from MT09:** the same hotel's booking info (Booking No., confirmation PDF link) is duplicated across multiple separate JS arrays on one trip page — e.g. on `MT09.html`, `stopsData` (map popups), `quickRefData` (Stops tab quick-reference table), and `itinData`/similar (Itinerary tab) each hold their own copy of the same hotel's `stay`/`hotel` text. When a new confirmation email came in for the Xi'an hotel, only `stopsData` got updated at first — `quickRefData` was missed entirely, and it turned out **4 other already-booked hotels** (Fuhai Kangmei, Jiu Xi Hostel, Hemu Sanbaisuo Homestay, Birch Forest Resort) had been missing Booking No./PDF in `quickRefData` all along, undetected until Paul spotted it by scrolling. Same root cause as the "No duplicated P&L/premium numbers across JS objects" lesson already logged for `options-breadboard.html` — copied data drifts the moment only one copy gets updated.
- **Whenever a hotel confirmation (booking no., PDF, price, dates) is added or changed on any trip page,** grep the whole file for that hotel's name (and old booking number, if replacing one) to find **every** array/section it appears in — check `stopsData`, `quickRefData`/quick-reference tables, `itinData`/Itinerary entries, and any others — and update all of them together in the same edit. Don't stop at the first match.
- **After finishing, do one audit pass** over the *other* already-booked hotels on that same page (not just the one you were asked about) checking for the same category of gap (e.g. `grep` each hotel's `hotel:`/`stay:` field for `Booking No` and `PDF` — a `✅ BOOKED` hotel missing either is a red flag) — this is cheap right after touching the file's booking-data patterns and catches exactly the kind of pre-existing gap that shipped silently before.
- Applies to every trip page with a Stops/quick-reference table (MT09, MT10, future MT-prefix trips), not just this one.

## Currency Conversion Rule (Standing Default — added 2026-07-02)
Whenever a foreign currency amount (¥ JPY, etc.) appears anywhere on a trip page — timelines, receipts, cost breakdowns, transport fares — always show the approximate **SGD** conversion alongside it, e.g. `¥4,345 (~S$38.10)`. Use a consistent approximate rate (~¥114 = S$1 unless Paul provides a more current rate) and label it as approximate (`~S$`), not exact. Applies to both English and Chinese spans. Do this automatically going forward — no need to ask each time.

## After Every Deployment — MANDATORY
1. Wait ~2 minutes for Vercel to deploy.
2. Use **WebFetch** to check the live URL and confirm the change is visible yourself.
3. Only THEN tell Paul it's ready — include the confirmed live link.
- Never say "check in 1-2 minutes" without verifying it first.

## Wikimedia / Wikipedia Images Rule
Learned from MT09 Xi'an city walk task (took hours due to network block).

**NEVER use hardcoded Wikimedia thumbnail URLs** (the `upload.wikimedia.org/wikipedia/commons/thumb/{hash1}/{hash2}/...` format). The hash requires MD5 of the exact filename and cannot be verified in this cloud environment (Wikimedia is blocked).

**ALWAYS use the Wikipedia REST API via JavaScript instead:**
```javascript
fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(wikiTitle))
  .then(r => r.json())
  .then(d => { if (d.thumbnail) img.src = d.thumbnail.source; });
```
- This is CORS-enabled — works from any browser.
- No hash needed — Wikipedia returns the correct thumbnail URL.
- Use `display:none` on the img initially; show it only after src is set.
- Do NOT use `onerror="this.style.display='none'"` as a fallback — it hides failures silently, making debugging impossible.

**Also:** When pushing large files (>50KB) via `mcp__github__push_files`, always verify the `content` parameter is non-empty before calling — an accidental empty string wipes the file on GitHub.

### Wikipedia Photo on Map Markers (Standing Default — added 2026-07-11)
Whenever a route/day-log map stop doesn't have one of Paul's own photos, **always try to fetch a Wikipedia photo for it and show it on the map marker popup / arrival card** — don't leave it as a bare emoji icon if a real photo is available.
- Give each stop a `wikiTitle` field with its best-match Wikipedia article title (only set it when there's a genuine, specific match — e.g. a mountain, marsh, national park, famous landmark; don't set it for small private businesses/shops/local churches that have no dedicated article, and never point it at a generic town/region article and pass it off as a photo of the specific place).
- On page load, for every stop with `wikiTitle` and no `img`, fetch the thumbnail client-side via the REST summary API (same CORS-enabled pattern as the rule above) and set `s.img` once it resolves, then refresh the marker popup content.
- If no thumbnail comes back (or `wikiTitle` isn't set), leave the icon fallback as-is — don't fabricate or substitute an unrelated photo.
- Reference implementation: `MT10-niseko-day6.html` (`fetchWikiThumb()` + the `buildPopupHtml()` refactor).

## 🌐 Bilingual Rule (English + Chinese) — Standing Default
Every page and article on Paul's World must include an **English / 中文 language toggle**. This applies to ALL pages, including travel itineraries, stories, AI articles, health pages, tools, etc.

- Add toggle buttons: `🇬🇧 English` and `🇨🇳 中文`
- Buttons styled as pill-shaped, gold highlight on active
- Toggling switches ALL text content (titles, descriptions, labels, section headers) to the selected language
- English is default (active on load)
- Reference implementation: `MT12.html` Itinerary panel (June 2026)

### ⚠️ Bilingual Completeness Rule (learned from MT10 bug — 2026-06-28)
**Including `bilingual.js` is NOT enough.** The toggle only works if every visible text node is wrapped:
```html
<span class="en">English text</span><span class="zh">中文翻译</span>
```
For block elements use `en-block` / `zh-block`. **Never write plain text inside a page that has `bilingual.js`.**

**Pre-push hook enforces this automatically** (`.githooks/pre-push`) — a push will be blocked if any HTML file has `bilingual.js` but zero `.zh` elements.

**Self-check command** (run before pushing if unsure):
```bash
for f in *.html; do grep -q 'bilingual.js' "$f" && ! grep -q 'class="zh"' "$f" && echo "MISSING ZH: $f"; done
```

## CSS Layout Rule — Grid over Flex for Row Cards
**NEVER use `margin-left:auto` inside a flex row when the middle element must fill space.**
`margin-left:auto` on a flex child consumes ALL remaining free space, collapsing the content
div next to it to zero width (text becomes invisible). This caused the MT15 itinerary blank-card bug.

**Always use CSS Grid for icon/title/action row layouts:**
```css
/* CORRECT — badge | title (fills) | chevron */
.row-header { display:grid; grid-template-columns:auto 1fr auto; align-items:start; gap:10px; }
```
This guarantees:
- Column 1 (`auto`): icon/badge takes its natural size
- Column 2 (`1fr`): title/content always fills the remaining space
- Column 3 (`auto`): action/chevron sits flush right

Never use flexbox + `margin-left:auto` for this 3-column pattern.

## 🐛 Debug Pattern: Text Invisible in a Row Layout
**Symptom:** Left icon shows ✅, right chevron shows ✅, middle title text invisible ❌

**Diagnosis checklist (in order — stop when found):**
1. **Check for `margin-left:auto` on any sibling** — this is the #1 cause. It eats all free space, collapsing the middle element to zero width.
2. **Check the middle div has `flex:1;min-width:0`** (flex) or `grid-column:auto` with `1fr` column (grid).
3. **Check color** — is text color same as background? (`color:#0d1117` on dark bg = invisible text).
4. **Check overflow** — parent `overflow:hidden` + zero height/width clips content silently.
5. **Nuclear option** — rebuild with `createElement` + `textContent` + inline `style.cssText`. Bypasses ALL CSS inheritance. If this also fails, the element is not in the DOM.

**Fix order (fastest to most drastic):**
1. Switch to `display:grid; grid-template-columns:auto 1fr auto` — solves 90% of cases.
2. If grid doesn't fix it: use `createElement`+`textContent`+inline styles.
3. If still broken: the panel/container itself may have zero size — check parent heights.

## Standing Rules for All Pages & Articles

### 🏠 Home Button
Every page/article must have a visible **Home button** that returns to
https://paulsworld.vercel.app/

### 🔗 New-Tab Navigation Rule (Standing Default — added 2026-07-19)
Every navigation link that takes Paul AWAY from the current page — the Home button, any "back to hub" floating button (e.g. the 📈 Investment Tools shortcut), and similar nav links — must open in a **new tab** (`target="_blank"`), so he never loses the page he was reading. This applies automatically to every new page going forward. In-page controls that don't navigate away (language toggle, tabs, accordions) are unaffected. If Paul asks to retrofit this onto older existing pages site-wide, treat it as a separate bulk task — don't assume it's already done everywhere.

### 🗂️ Category Breadcrumb Rule (Standing Default — added 2026-07-21)
Every page/article must show its **category breadcrumb at the top of the page**, right below the Home button / above or inside the hero title — so Paul always sees which section he's in. Format: `[Section] › [Sub-section] › [PREFIX+Number]`, e.g. `Investment Tools › 🦅 Options & Iron Condor › T41`. Each crumb before the current page links back to that section (e.g. `/tools.html` and `/tools.html#options`); the current page's own number is shown plain (not a link), highlighted in the accent gold colour. Bilingual (en/zh) like all other text. Apply this to every new page going forward, across every category (Travel Stories, AI Journey, Health, Investment Tools, IBKR Update Log, etc. — not just Investment Tools) — Paul never needs to ask again. Reference implementation: `T41-Update-IBKR-Data-Guide.html` (`.breadcrumb` block). If Paul asks to retrofit this onto older existing pages site-wide, treat that as a separate bulk task — don't assume it's already done everywhere.

### 👁️ View Counter
Add a visible view counter at the **end of every article, just before the footer**,
using exactly: `<script src="/view-counter.js"></script>`

### 📸 Image Handling
- Reduce resolution of all shared images before embedding.
- Preserve correct **orientation** — always fix rotation when resizing.
- For every article with images:
  - Create a dedicated folder named **`img_<PAGE-NAME>`** — i.e. `img_` + the page's own
    filename prefix+number. So a Story S15 uses **`img_S15`**, AI Journey AI11 uses `img_AI11`,
    Health h4 uses `img_h4`, etc. (Do NOT name folders by topic like `img_patagonia`; match the page.)
  - Place all the article's images inside it.
  - Update all `<img>` paths to reference that folder (e.g. `img_S15/01-photo.jpg`).
  - **Tell Paul the exact folder name** he needs to create on GitHub before uploading.
- **Image Folder Deployment Rule:** once images are added to a new folder, immediately
  push a small update to the linked HTML so Vercel picks up the new folder in the same deploy.

### 🖼️ Photo Journal Rule (Standing Default)
Every article/story that contains photos **must** include a **Photo Journal** section at the end — after the main story text. Each photo must be displayed with **visible descriptive text beneath it** (not hover-only captions). Format:
- Photo displayed full-width (or near full-width)
- Below it: "Photo XX of YY" label + a paragraph describing what is shown, what was happening, and what Paul was thinking or feeling
- Tap photo to open lightbox
- **Date stamp (added 2026-07-08):** every photo must show the date it was taken as a small badge overlaid at the **bottom-right corner of the photo itself** (not just in the surrounding text). Use the photo's EXIF date if available, otherwise the day-log's known date. Bilingual: `<span class="en">7 Jul 2026</span><span class="zh">2026年7月7日</span>` inside a `.pj-date` badge (`position:absolute;bottom:8px;right:10px;background:rgba(0,0,0,.6);color:#f4c869;font-size:.7rem;font-weight:600;padding:3px 9px;border-radius:6px;`), with the photo wrapper set to `position:relative`. Also append the date to the lightbox caption. Reference implementation: `MT10-niseko-day1.html`.
- Reference implementation: `S23.html` photo journal section

### 🔗 Share Button Rule (Standing Default — added 2026-06-20)
Every story, article, and page must include a **Share button**. Place it prominently — on stories/articles put it in the hero/header area (e.g. below the subtitle or near the top CTA). On ebook/contents pages put it on the cover section next to the main CTA.

Standard implementation:
```html
<!-- in <style> -->
.share-btn{display:inline-block;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.4);color:#fff;font-weight:700;letter-spacing:.04em;padding:11px 28px;border-radius:30px;cursor:pointer;font-size:1rem;font-family:'Source Serif 4',Georgia,serif;margin-left:12px;transition:background .2s;}
.share-btn:hover{background:rgba(255,255,255,.25);}
.share-toast{display:none;position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#1c1c1e;color:#fff;padding:10px 24px;border-radius:24px;font-size:.9rem;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.3);}

<!-- in <body> — place button next to hero CTA -->
<button class="share-btn" onclick="shareThisPage()">🔗 Share</button>
<div class="share-toast" id="shareToast">✅ Link copied!</div>

<!-- before </body> -->
<script>
function shareThisPage(){
  var url=window.location.href;
  var title=document.title;
  if(navigator.share){
    navigator.share({title:title,url:url}).catch(function(){});
  } else {
    navigator.clipboard.writeText(url).then(function(){
      var t=document.getElementById('shareToast');
      t.style.display='block';
      setTimeout(function(){t.style.display='none';},2200);
    });
  }
}
</script>
```
- On iPhone: opens native iOS share sheet (WhatsApp, Messages, etc.)
- On desktop/other: copies the link and shows "✅ Link copied!" toast
- Use `window.location.href` (not a hardcoded URL) so it works on any page

### 📖 eBook Generation
When generating an eBook, download all images and **embed** them — no external image
links. Every eBook must be fully self-contained.

### 🔢 File Naming & Title Rule
New article/page filename, `<title>` tag, AND the visible on-page `<h1>` heading must ALL start with the category prefix + number — not just the `<title>` tag.
Format: `[PREFIX][NUMBER]: [Article Title]` (apply to both `<h1 class="en">` and `<h1 class="zh">`, e.g. `AI218: Why I Now...` / `AI218：为什么我现在...`).

### New Page Workflow
When creating a new page (e.g. `new-app`): create it, auto-update `index.html` to insert
it into the right category, then push to GitHub.

### 📚 AC02 eBook Auto-Update Rule (Standing Default — added 2026-06-20)
Whenever a **new Travel Story** (S-prefix file, e.g. `S27.html`) is created:
1. Automatically add a new `<a class="chapter-card">` entry to **AC02.html** with the correct chapter number, title, and an appropriate emoji + location meta line.
2. Update the story count in the cover subtitle (e.g. "26 true stories" → "27 true stories") and in the footer.
3. Push both the new story file **and** the updated `AC02.html` together in the same commit.
Paul never needs to ask — this happens automatically every time.

## Counter API (Dashboard) Rule
- Always use the **read-only GET** endpoint:
  `https://api.counterapi.dev/v1/paulsworld/{key}/` — never `/up` or `/down`.
- Only `view-counter.js` on article pages may call `/up`.

## Categories / Page Index
Base: `https://raw.githubusercontent.com/paulyeo11/paulsworld/refs/heads/main/[filename].html`

**NAMING CONVENTION (updated 2026-05-31): UPPERCASE prefix + ZERO-PADDED 2-DIGIT number for EVERY section (S01, AI01, AIT01, AC01, B01, T01, h01 …). Files, image folders, and on-screen labels/titles all use the same 2-digit number.** Prefixes are case-sensitive on Vercel — always use the exact case below. To add a page, create `<PREFIX><2-digit next#>.html` and it auto-appears in the right section (index.html auto-discovers each prefix up to its max).

| Category | Prefix | Files | Label shown |
|----------|--------|-------|-------------|
| Travel Stories | **S** | S01.html → S14.html (S07 missing) | from title "S01:" … |
| AI Journey | **AI** | AI01.html → AI10.html | from title "AI01:" … |
| AI Tools | **AIT** | AIT01.html → AIT04.html | from title "AIT01:" … |
| Achievements | **AC** | AC01.html → AC03.html | from title "AC01:" … |
| Books | **B** | B01.html, B02.html, B11.html (max 10 shown) | from title "B01:" … |
| Investment Tools | **T** | T01.html → T06.html (T03 = `T03/` folder = Tiger) | T01–T06 via CSS counter (leading-zero) |
| **Health** | **h** | h01.html → h05.html (max 10). Green-teal `#10b981`, placed **between AI Journey and Achievements**. | (no number label) |
| **Dream Journal** | **D** | D01.html → (max 10). Midnight indigo `#4f46e5`, placed **right after Health & Wellness**. Real dreams Paul had, written up bilingual, not travel stories — kept out of the AC02 travel eBook. | from title "D01:" … |
| **IBKR Update Log** | **IB** | IB01.html → (max 10). Amber/gold `#f59e0b`. Auto-written portfolio-update summaries — see "IBKR Update Log Rule" below. **Not on index.html** — moved 2026-07-23 to the Investment Tools hub (`tools.html`), section **"A. IBKR Update Log"**, linking to the consolidated `ibkr-update-log.html` tabs page. | from title "IB01:" … |
| **AI Data Analyse** | **ADA** | Empty (added 2026-07-22, its only entry moved out 2026-07-24). Slate/graphite `#475569` category shell existed on index.html for how-to/operating guides on feeding raw data into Paul's dashboards, but Paul asked to move its one article (the old `ADA01.html`, "How to Update IBKR Raw Data...") into Investment Tools instead — it's now `T46-Update-IBKR-Data-Guide.html` in `tools.html`'s Options & Iron Condor section. The `adadata` section-card, its CSS, and its `loadSection` call were removed from index.html since the category has nothing left in it. If Paul adds a new ADA-prefixed guide later, the section will need to be re-added. | — |
| Travel | travel | | |
| Special | **SP** | SP01=Dream Destinations, SP02=Adventure List, SP03=Why Retire at 65, SP04=Dashboard | (hardcoded cards in index.html; custom card titles, no auto-number) |

- **All `loadSection` calls use `pad: 2`** (in index.html `init()`) so discovery looks for 2-digit names (`AI01`…`AI09`, then `AI10`). New page = `<PREFIX><2-digit>.html` (e.g. `S15.html`, `AI11.html`), image folder `img_<PREFIX><2-digit>` (e.g. `img_S15`), and `<title>`/`<h1>` start with the same `<PREFIX><2-digit>:` label.
- **Investment Tools T01–T06** links are hardcoded in index.html and their number label comes from CSS `counter(tool, decimal-leading-zero)` — these old pages have NO number in their title.
- **Investment Tools T07 and up (Standing Default — added 2026-07-19):** live in **`tools.html`** (the Investment Hub, linked from "My Investments"), not index.html. For every new one: filename `T<next-number>-<Slug>.html` (next number = 1 + the highest existing `T##` filename in the repo, check with `ls T*.html`), `<title>` tag starts with `T<number>:`, the **visible on-page `<h1>` heading must ALSO start with `T<number>:`** in both `<span class="en">` and `<span class="zh">` (e.g. `<h1><span class="en">T38: TDS Technology...</span><span class="zh">T38：TDS Technology...</span></h1>` — reference: `T28-Cut-Loss-Alerts.html`, `T36-Sell-3-Shares.html`, `T37-Deposits-and-Sell-Summary.html`), and add a matching `<a class="tool" href="...">` card to the correct section in `tools.html` with the same number in `<div class="tnum">`. Do this automatically — Paul never needs to ask.
- **⋮ Page Menu — Share + Pin page (Standing Default — added 2026-07-24):** every Investment Tools page (T-prefix, plus `options-breadboard.html`/T29 and `ibkr-update-log.html`/T45) must have a **⋮ (three-dot) button** fixed/absolute top-right of the header — below the language toggle if one occupies that corner — that opens a dropdown with two items: **🔗 Share** and **📌 Pin page**. Any standalone `.share-btn` in the hero is removed/replaced by this menu (Share moves into the dropdown, it doesn't stay as its own button). Reference implementations: `options-breadboard.html` (`.page-menu-wrap`/`#pageMenuDropdown`/`togglePinThisPage()`) and `ibkr-update-log.html` (same pattern, dark-hero theme).
  - **Pin mechanism:** client-side only (no backend) — stored in `localStorage` under the shared key **`pw_pinned_pages`**, an array of `{url, title, titleZh, icon, pinnedAt}`. Each page sets its own `PAGE_URL` (its filename), `PAGE_TITLE`/`PAGE_TITLE_ZH`, and `PAGE_ICON` (an emoji matching its `<h1>`), and toggles itself in/out of that array on click. This means pinning is **per-browser/per-device**, and **per-site** (vercel.app and netlify.app do not share localStorage, since they're different origins).
  - **Pinned pages render on `tools.html` only** (the Investment Tools hub) — Paul explicitly chose this over the main homepage (`index.html`) on 2026-07-24, since that hub is what his pages' Home/Investments button actually goes to. `tools.html` has a `#pinnedWrap`/`#pinnedList` block at the very top of `.wrap` (above "Featured") that reads `pw_pinned_pages` on load and renders a gold-bordered row per pinned page, with an ✕ unpin button; hidden entirely when nothing is pinned.
  - Toast copy on pin/unpin should say "Shows at top of Investment Tools" (not "Home page") to match where it actually appears.
  - Apply this to every new Investment Tools page going forward — Paul never needs to ask again.
- **Stories/AI/AIT/AC/Books** get their number from the page **title** (not a CSS counter) — so the title MUST start with the padded label, and there is NO CSS counter for those cards.

## Code Style
- AI articles follow the style of `ai7.html` / `ai8.html`.
- Fonts: Playfair Display + Source Serif 4. Colours: `--blue: #4a6cf7`, `--accent: #f4813f`.
- Always include Home button, view counter, footer. Always mobile-responsive.

## Step-by-Step Guidance Rule
When guiding Paul through any technical task (GitHub, Google Analytics, setup, etc.),
go **one step at a time**. Wait for his screenshot/confirmation before the next step.
Keep each step short, with clear instructions on exactly what to click or type.

## Weekly HWMR Rule
Trigger: **"Process this week's HWMR — start from Book [number]"**.
When Paul uploads a Morning Revival PDF: extract English only, identify all days,
create one HTML per day (Mon–Sat) in the Books category as `B<next-number>.html`.
Each file has 3 tabs: Full Reading · 5 Key Points (simple words) · Half Page + prayer.
Green theme, Home button, view counter. Push to GitHub; confirm filenames and SHAs.
