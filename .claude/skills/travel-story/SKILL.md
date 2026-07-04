---
name: travel-story
description: Write a new Travel Story (S-series, e.g. S28.html) for Paul's World in SWEETIE's voice — Paul's personal travel/life-reflection stories, publish-ready HTML. Use whenever Paul asks to write a travel story, add a trip writeup, or says "SWEETIE, write about...".
---

# Travel Story (SWEETIE)

Write in Paul's own voice: warm, reflective, first-person, plain language — a 70-year-old
retiree recounting travel and adventure. Not marketing copy.

## Steps

1. **Number it.** Find the highest existing `S<NN>.html` in the repo root, use the next
   2-digit number. Title and `<title>`/`<h1>` MUST start with `S<NN>: <Title>` — never
   create the file without this prefix.
2. **Images.** Create `img_S<NN>/`, place resized (orientation-fixed) photos there,
   reference via `img_S<NN>/name.jpg`. Tell Paul the exact folder name to upload into
   if photos aren't provided yet.
3. **Bilingual.** Every visible text node wrapped `<span class="en">…</span><span class="zh">…</span>`
   (or `en-block`/`zh-block`), include `bilingual.js`, English active by default. No bare
   text anywhere on the page.
4. **Standard chrome:** Home button to `https://paulsworld.vercel.app/`, `<script src="/view-counter.js"></script>`
   just before the footer, Share button (see CLAUDE.md Share Button Rule for exact markup).
5. **Photo Journal section** at the end of the story: each photo full-width, "Photo XX of YY"
   label + a paragraph of what's shown/what Paul felt, tap-to-lightbox. Reference `S23.html`.
6. **Route/map:** if the story involves a hike/travel route with a sequence of locations,
   build the full interactive Leaflet map (satellite/street toggle, numbered colour markers,
   dashed route line, photo popups, fullscreen, legend) per CLAUDE.md's Interactive Route Map
   Rule. Reference `S23.html`.
7. **Map links / currency:** if specific places are named, add Google/Baidu/Amap buttons
   (Map Links Rule). If any foreign currency amount appears, show `~S$` conversion alongside.
8. **Style:** Playfair Display + Source Serif 4 fonts, `--blue:#4a6cf7` / `--accent:#f4813f`,
   mobile-responsive.
9. **Wire it in:**
   - Add a chapter card to `AC02.html` (correct number, title, emoji, location line) and
     bump the story count in its cover subtitle + footer.
   - `index.html` auto-discovers `S<NN>` up to the max — no manual edit needed there.
10. **Ship it:** commit the new `S<NN>.html`, its `img_S<NN>/` folder, and the updated
    `AC02.html` together in one commit. `git fetch origin main && git rebase origin/main`
    before pushing. Confirm filename + commit SHA, then verify the live URL with WebFetch
    after ~2 min before telling Paul it's ready.

All the detailed markup patterns (share button HTML/CSS, bilingual completeness self-check,
Leaflet map code, map-link button styles) live in `/home/user/paulsworld/CLAUDE.md` — read
it for exact snippets rather than improvising new ones.
