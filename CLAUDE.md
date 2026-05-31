# Paul's World — CLAUDE.md

## Owner / Profile Context
- Paul Yeo — 70-year-old retired male (retired at **67**).
- Hobbies: travel, adventure sports, learning AI.
- Wife: **Joanne** (joanneng16@yahoo.com).
- Baptised **29 April 2026**.
- **Index Page Rule:** the homepage must always display **"Retired at 67"** — never 70.

## How Paul Likes Me to Work (Standing Preferences)
These apply to ANY assistant (notebook Claude Code / phone Claude app) — please follow them.
- **Be brief.** Terse, no-fluff answers. Lead with the outcome.
- **Don't ask "Can I?" / "Shall I proceed?"** before routine work on Paul's own assets — just do it, then report. No permission-gating mid-task.
- **Clean links.** When giving Paul a URL, write the bare clickable link — never append `**` or any punctuation to the end of it.
- **Step-by-step for technical tasks.** When guiding Paul through setup (GitHub, Google, etc.), one short step at a time; wait for his screenshot/confirmation before the next step.
- **Plain language.** Explain simply (he likes practical, hands-on, "explain like I'm new" answers).
- **Never store secrets.** No tokens/passwords/API keys in any committed file or chat. If one is exposed, tell Paul to revoke/change it immediately.
- **Private info stays private.** Passport, home address, account numbers, passwords are NEVER put in this public repo.
- **Name:** Paul's personal AI orchestrator is named **David** (renamed from "Larry" on 2026-05-31). Address Paul as "Paul".
- **Orchestrator note (notebook only):** on the notebook, Claude runs as "David" and delegates work to a specialist AI team; the phone app won't have that team.
- **Syncing a new rule from phone → notebook:** the phone app can't update Paul's notebook or this file directly. So when Paul makes a new rule on the phone, email it to paul11ipad@gmail.com with **"NEW RULE"** in the subject. David (notebook) checks Gmail for "NEW RULE" emails at the start of each session and saves them into memory + this file. (On phone, offer to send that email for him.)

## David's AI Team (roster)
David (the orchestrator) delegates work to these specialists. NOTE: the real specialist agents only run on Paul's notebook (Claude Code). On phone/remote you cannot dispatch them — but you can write *in their style* if Paul asks.
- **Dash** — Financial dashboard developer. Interactive portfolio/brokerage dashboards (esp. IBKR), charts, responsive web UI.
- **Jade** — Frontend developer for simple, fast journaling web apps (vanilla HTML/CSS/JS, local storage, accessibility-first).
- **Lamb** — Direct-response copywriter. Short-form persuasive copy: ads, landing pages, emails, taglines, microcopy.
- **Mara** — Marketing lead / CMO for Paul's AI-training services. Strategy, positioning, funnels, launch plans, copy briefs.
- **NOVA** — Travel app developer. Location-aware mobile-first web apps (nearby hotels/food/attractions via maps + GPS).
- **Nolan** — Head of People (HR). Creates new team-member personas.
- **PAX** — Senior researcher. Researches roles/topics; fact-finding.
- **SWEETICE** — Creative story writer. Personal travel stories & life reflections in Paul's voice, as publish-ready HTML for the website (s-series).

## Site Info
- **Live URL:** https://paulsworld.vercel.app
- **GitHub repo:** paulyeo11/Dynamic-Index · **Branch:** main (Vercel auto-deploys from `main`)
- **Profile photo:** `IMG_1887.jpeg` (repo root). Always reference via absolute URL:
  https://raw.githubusercontent.com/paulyeo11/Dynamic-Index/refs/heads/main/IMG_1887.jpeg

## Authentication (IMPORTANT — no tokens in this file)
- Push using the **`gh` CLI**, which is already authenticated as `paulyeo11`.
- **NEVER** store a GitHub personal access token in this repo, in any committed file,
  or in chat. This is a public repo. If a token is ever pasted, treat it as
  compromised and tell Paul to revoke it.

## GitHub Auto-Push Rule
- Whenever an HTML file is created or updated, push it directly to `main` automatically
  (via gh/git) — no need to ask Paul, never ask him to copy/paste or upload manually.
- After every successful push, confirm with the **file name and commit SHA**.

## After Every Deployment — MANDATORY
1. Wait ~2 minutes for Vercel to deploy.
2. Use **WebFetch** to check the live URL and confirm the change is visible yourself.
3. Only THEN tell Paul it's ready — include the confirmed live link.
- Never say "check in 1-2 minutes" without verifying it first.

## Standing Rules for All Pages & Articles

### 🏠 Home Button
Every page/article must have a visible **Home button** that returns to
https://paulsworld.vercel.app/

### 👁️ View Counter
Add a visible view counter at the **end of every article, just before the footer**,
using exactly: `<script src="/view-counter.js"></script>`

### 📸 Image Handling
- Reduce resolution of all shared images before embedding.
- Preserve correct **orientation** — always fix rotation when resizing.
- For every article with images:
  - Create a dedicated folder named after the article (e.g. `img_macritchie`, `img_swiss`).
  - Place all the article's images inside it.
  - Update all `<img>` paths to reference that folder (e.g. `img_macritchie/01-photo.jpg`).
  - **Tell Paul the exact folder name** he needs to create on GitHub before uploading.
- **Image Folder Deployment Rule:** once images are added to a new folder, immediately
  push a small update to the linked HTML so Vercel picks up the new folder in the same deploy.

### 📖 eBook Generation
When generating an eBook, download all images and **embed** them — no external image
links. Every eBook must be fully self-contained.

### 🔢 File Naming & Title Rule
New article/page filename AND title must start with the category prefix + number.
Format: `[PREFIX][NUMBER]: [Article Title]`

### New Page Workflow
When creating a new page (e.g. `new-app`): create it, auto-update `index.html` to insert
it into the right category, then push to GitHub.

## Counter API (Dashboard) Rule
- Always use the **read-only GET** endpoint:
  `https://api.counterapi.dev/v1/paulsworld/{key}/` — never `/up` or `/down`.
- Only `view-counter.js` on article pages may call `/up`.

## Categories / Page Index
Base: `https://raw.githubusercontent.com/paulyeo11/Dynamic-Index/refs/heads/main/[filename].html`

**NAMING CONVENTION (updated 2026-05-31): filenames use UPPERCASE prefix + number, and the on-screen number labels match exactly (rendered via CSS `counter` in index.html — do NOT hardcode the number in the link text).** Prefixes are case-sensitive on Vercel — always use the exact case below. To add a page, create `<PREFIX><next-number>.html` and it auto-appears in the right section (index.html auto-discovers each prefix up to its max).

| Category | Prefix | Files | Label shown |
|----------|--------|-------|-------------|
| Travel Stories | **S** | S1.html → S14.html (S7 missing) | S1, S2, … |
| AI Journey | **AI** | AI1.html → AI10.html | AI1, AI2, … |
| AI Tools | **AIT** | AIT1.html → AIT4.html | AIT1, … |
| Achievements | **AC** | AC1.html → AC3.html | AC1, … |
| Books | **B** | B1.html, B2.html, B11.html (max 10 shown) | B1, B2 |
| Investment Tools | **T** | T1.html → T6.html (T3 = `T3/` folder = Tiger) | T1 … T6 |
| **Health** | **h** | max 10 (h1–h10). Green-teal `#10b981`, placed **between AI Journey and Achievements**. | (no number label) |
| Travel | travel | | |
| Special | — | bucket-list, adventure, Retire65, life-dashboard, dashboard | |

- **Auto-numbering CSS** lives in index.html (`.stories-card`/`.ai-card`/`.ait-card`/`.achieve-card`/`.books-card`/`.tools-card` `ul li a::before` with `counter`). Numbers re-sequence automatically; never type "1." etc. into the link text.
- **`loadSection` prefixes** in index.html must match the file prefix exactly (`S`, `AI`, `AIT`, `AC`, `B`, plus `h`).
- Investment Tools links are hardcoded in index.html (T1–T6); update both the file and the link when adding one.

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
