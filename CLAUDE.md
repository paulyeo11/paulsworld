# Paul's World — CLAUDE.md

## Owner / Profile Context
- Paul Yeo — 70-year-old retired male (retired at **67**).
- Hobbies: travel, adventure sports, learning AI.
- Wife: **Joanne** (joanneng16@yahoo.com). Married at age **32**.
- Baptised **29 April 2026**.
- Worked at **ECO for 9 years**.
- **Index Page Rule:** the homepage must always display **"Retired at 67"** — never 70.

## How Paul Likes Me to Work (Standing Preferences)
These apply to ANY assistant (notebook Claude Code / phone Claude app) — please follow them.
- **Be brief.** Terse, no-fluff answers. Lead with the outcome.
- **Don't ask "Can I?" / "Shall I proceed?"** before routine work on Paul's own assets — just do it, then report. No permission-gating mid-task.
- **Commit and push immediately** after every change — no need to inform Paul before committing. Just do it silently and confirm with the result.
- **EXCEPTION — always get approval before creating anything NEW & outward-facing:** never create a new website, new GitHub repo, new Vercel project, or new domain without Paul's explicit OK first. (Editing/pushing to repos he already owns is fine.)
- **Clean links.** When giving Paul a URL, write the bare clickable link — never append `**` or any punctuation to the end of it.
- **Always show the link.** When an action opens a website/page, give the real clickable URL — never just say "opens in your browser" or "shows a link." Paul taps it on his phone.
- **Step-by-step for technical tasks.** When guiding Paul through setup (GitHub, Google, etc.), one short step at a time; wait for his screenshot/confirmation before the next step.
- **Plain language.** Explain simply (he likes practical, hands-on, "explain like I'm new" answers).
- **Never store secrets.** No tokens/passwords/API keys in any committed file or chat. If one is exposed, tell Paul to revoke/change it immediately.
- **Private info stays private.** Passport, home address, account numbers, passwords are NEVER put in this public repo.
- **Name:** Paul's personal AI orchestrator is named **David** (renamed from "Larry" on 2026-05-31). Address Paul as "Paul".
- **Orchestrator note (notebook only):** on the notebook, Claude runs as "David" and delegates work to a specialist AI team; the phone app won't have that team.
- **Syncing a new rule from phone → notebook:** the phone app can't update Paul's notebook or this file directly. So when Paul makes a new rule on the phone, email it to paul11ipad@gmail.com with **"NEW RULE"** in the subject. David (notebook) checks Gmail for "NEW RULE" emails at the start of each session and saves them into memory + this file. (On phone, offer to send that email for him.)
- **Chinese Translation Preference (Standing Default — added 2026-06-24):** Paul prefers all AI responses and content to be available in Chinese (中文) whenever requested. When Paul says "translate to Chinese" without specifying what, translate the most recent content/response or the relevant page to Chinese. All standing preferences in this file apply to both English and Chinese interactions. The bilingual rule (English + 中文 toggle) already applies to all website pages — this extends it to AI responses on demand.

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

## Site Info
- **Live URL:** https://paulsworld.vercel.app
- **GitHub repo:** paulyeo11/paulsworld · **Branch:** main (Vercel auto-deploys from `main`)
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
- After every successful push, confirm with the **file name and commit SHA**.

## Interactive Route Map Rule (Standing Default)
Whenever Paul's article/story includes a hiking route, travel route, or any sequence of locations with photos — **always build an interactive Leaflet.js map** with ALL of the following, automatically, without being asked:

- **Tiles:** ESRI satellite (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`)
- **Markers:** Numbered coloured circle markers — 🔴 red = Start/End, 🟠 orange = road/transport section, 🟢 green = forest/nature section, 🔵 blue = water/reservoir section
- **Route line:** Orange dashed polyline connecting all stops in order
- **Photo popup:** Tapping any marker shows a popup with the photo + caption + "View Full Photo" button (opens lightbox)
- **Fullscreen button:** CSS-based (NOT browser requestFullscreen API — doesn't work on iOS). Use `position:fixed; top:0; left:0; width:100vw; height:100vh` on the map div with a visible "✕ Close Map" button top-right
- **"Open Full Screen Map" button:** Prominent button above the map (accent colour, rounded pill style)
- **Legend:** Bottom-left corner showing colour key
- **Leaflet fullscreen plugin** for the corner expand icon: `https://cdnjs.cloudflare.com/ajax/libs/leaflet.fullscreen/1.6.0/Control.FullScreen.min.css` + `.min.js`
- **Map placement:** Right below the hero section (NOT buried at the bottom)
- **Note:** If GPS was stripped from uploaded photos, estimate coordinates from Google Maps screenshots or known geography — place markers in route sequence order

Reference implementation: `S23.html` (The Secret BKE Trail, 18 June 2026)

## Map Links Rule
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

## 🌐 Bilingual Rule (English + Chinese) — Standing Default
Every page and article on Paul's World must include an **English / 中文 language toggle**. This applies to ALL pages, including travel itineraries, stories, AI articles, health pages, tools, etc.

- Add toggle buttons: `🇬🇧 English` and `🇨🇳 中文`
- Buttons styled as pill-shaped, gold highlight on active
- Toggling switches ALL text content (titles, descriptions, labels, section headers) to the selected language
- English is default (active on load)
- Reference implementation: `MT12.html` Itinerary panel (June 2026)

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
New article/page filename AND title must start with the category prefix + number.
Format: `[PREFIX][NUMBER]: [Article Title]`

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
| Travel | travel | | |
| Special | **SP** | SP01=Dream Destinations, SP02=Adventure List, SP03=Why Retire at 65, SP04=Dashboard | (hardcoded cards in index.html; custom card titles, no auto-number) |

- **All `loadSection` calls use `pad: 2`** (in index.html `init()`) so discovery looks for 2-digit names (`AI01`…`AI09`, then `AI10`). New page = `<PREFIX><2-digit>.html` (e.g. `S15.html`, `AI11.html`), image folder `img_<PREFIX><2-digit>` (e.g. `img_S15`), and `<title>`/`<h1>` start with the same `<PREFIX><2-digit>:` label.
- **Investment Tools** links are hardcoded in index.html (T01–T06) and its number label comes from CSS `counter(tool, decimal-leading-zero)` — T pages have NO number in their title. Update both the file and the hardcoded link when adding one.
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
