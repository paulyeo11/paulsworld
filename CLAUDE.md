# Paul's World — CLAUDE.md

## Site Info
- **Live URL:** https://paulsworld.vercel.app
- **GitHub repo:** paulyeo11/Dynamic-Index
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Dev branch:** claude/adoring-curie-9YgGl

## After Every Deployment — MANDATORY STEPS
After merging any PR to main, I must:
1. Wait 2 minutes for Vercel to deploy
2. Use WebFetch to check the live URL and confirm the change is visible
3. Only THEN tell Paul to check — include the confirmed live link

Never say "check in 1-2 minutes" without first verifying it myself.

## Site Structure
- AI Journey articles: ai1.html → ai10.html (auto-discovered by index.html)
- Travel stories: s1.html → s12.html
- Health: h1.html → h3.html
- Books: book1.html → book11.html
- Achievements: ac1.html → ac3.html

## Paul's Profile Photo
- File: IMG_1887.jpeg (in repo root)
- Always use absolute URL: https://raw.githubusercontent.com/paulyeo11/Dynamic-Index/refs/heads/main/IMG_1887.jpeg

## Code Style
- All AI articles follow the style of ai7.html / ai8.html
- Fonts: Playfair Display + Source Serif 4
- Colours: --blue: #4a6cf7, --accent: #f4813f
- Always include Home button, view counter, and footer
- Always mobile-responsive

## Git Workflow
- Develop on branch: claude/adoring-curie-9YgGl
- Always create PR → squash merge → verify live → notify Paul
