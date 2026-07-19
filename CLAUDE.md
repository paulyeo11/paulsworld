# Paul's World — CLAUDE.md

## Owner / Profile Context
- Paul Yeo — 70-year-old retired male (retired at **67**).
- Hobbies: travel, adventure sports, learning AI.
- Wife: **Joanne** (joanneng16@yahoo.com). Married at age **32**.
- Baptised **29 April 2026**.
- Worked at **ECO for 9 years**.
- Holds a **Singapore driving licence** and an **International Driving Permit (IDP)** — already has both, not just planning to get one. (Added 2026-07-19.)
- **Index Page Rule:** the homepage must always display **"Retired at 67"** — never 70.
- **Favourite singers/music:** Susan Wong, Julienne Taylor.

## Paul's Abbreviations (Standing Glossary)
- **IG** = **Iron Condor** (the options strategy). When Paul says "trade IG", "IG setup", etc. he means the Iron Condor strategy — NOT the IG broker/platform or IG Group stock. (Added 2026-07-15.)

## Contacts
- **IBKR (Interactive Brokers) help email:** help@interactivebrokers.com

## IBKR Raw Data via Google Drive (Standing Default — added 2026-07-19)
Paul is often on phone-only (no PC/IB Gateway), so he can't always run the automated `ibkr_positions.py` / `refresh-ibkr.bat` script (which pushes straight to GitHub with zero manual steps — that's still the best option whenever his PC + IB Gateway are available).
- **Source folder:** the **"IBKR" folder in Paul's Google Drive** (folder id `1csY623IELGv_1UWFlAPAOpkaBPGEFBb2`, owner paul11ipad@gmail.com). Paul saves/overwrites his raw IBKR export(s) there — no need for him to paste a Drive link or attach the file in chat each time (a pasted link/attachment doesn't persist across sessions or authenticate reliably; the Drive MCP connector does).
- **Trigger phrases — treat both the same way:** "check the IBKR folder in Drive" and "update my IBKR raw data". On either phrase: look up the latest file(s) in that Drive folder via the Google Drive MCP tools, read the raw data, and update the relevant dashboard(s)/positions data from it.
- If the Google Drive MCP tools return an approval/auth error, don't keep silently retrying — tell Paul plainly that the connector needs re-authorization via claude.ai → Settings → Connectors → Google Drive (this has happened before; a "Yes" typed in chat does not resolve it, only the actual connector settings page does).

## IG (Iron Condor) Cushion Watch — Log
- **2026-07-17:** Dashboard "Share Price vs Selling Put" check flagged **NVDA** (⚠️ Tight, $202.81 vs 195P, +4.01% variance) and **QQQ** (⚠️ Tight, $695.33 vs 680P, +2.25% variance) as close to their short put strike. **AVGO** (+5.95%) and **SMH** (+8.06%) were ✅ Safe. Summary emailed as a draft to paul11ipad@gmail.com (Gmail MCP only creates drafts, not sends — Paul reviews/sends manually).
- **2026-07-17: Started IC (Iron Condor) option position(s).** Entry date marked per Paul's request.

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
