---
name: repo-conventions
description: Use when adding new code to this repository that should match existing patterns — creating a new endpoint, route, model, migration, component, service, test file, or module. Also use when unsure how this project structures a particular kind of change, or before proposing an architectural decision. Do NOT use for one-off scripts, debugging, or edits confined to a single existing file.
---

# gullstack-pitches Conventions

Single-file HTML pitch decks and concept demos for GullStack prospects. **No root package.json / no app framework** — static files deployed to Vercel project `gullstack-pitches` (team `gull-stack`). Clean host: **https://pitches.gullstack.com**.

## Layout

- Root `*.html` — one pitch or demo per prospect (`jack-holders.html`, `platos-closet.html`, `capital-wealth.html`, …).
- Optional `<client>-demo.html` — working concept site for that client.
- Optional `<client>/` or `<client>-demo/` — assets (images, CSS, multi-page demos).
- `hvac/` — large set of HVAC prospect HTML pages (+ nested mini-sites).
- `assets/` — shared images.
- `pitch-requests/` — request notes / backups.
- `skills/` — local agent skills (`site-builder`, `seo-master`) used when building related artifacts.
- `vercel.json` — rewrite `/(.*)` → `/$1.html` so `/jack-holders` serves `jack-holders.html`.
- `index.html` — directory/home surface.
- Occasional one-off: `competitive-traffic-analysis.py`, nested `cw-trifold-v16-option/` (has its own mini package.json).

## Commands

No unified install/test/typecheck at repo root.

- Preview locally: open HTML files in a browser, or `npx serve .` / Vercel CLI if available.
- Deploy: push to `main` (Vercel integration) or `vercel --prod` against project `gullstack-pitches` / scope `gull-stack`.
- Typecheck: **N/A** (static HTML). Do not add a fake always-green typecheck.

## How things are added here

### New prospect pitch
1. Create `/Users/thorsnode/gullstack-pitches/<slug>.html` at repo root (kebab-case client slug).
2. Self-contained: inline CSS preferred (see `jack-holders.html` structure — dark editorial, Inter/Fraunces/JetBrains, CSS variables for brand).
3. Optional assets folder `<slug>/` for images referenced relatively.
4. Optional demo: `<slug>-demo.html` and/or multi-page folder (e.g. `jack-holders-demo/`).
5. Confirm URL: `https://pitches.gullstack.com/<slug>` (rewrite strips need for `.html` in shared links).
6. `noindex` is common for prospect-only decks (`meta name="robots" content="noindex,nofollow"` in exemplars).

### HVAC batch page
1. Prefer `hvac/<company-slug>.html` (or folder with `index.html` when multi-file).
2. Keep pattern consistent with siblings in `hvac/`.

### House-style reference
1. Recent high-quality exemplars: `jack-holders.html`, `jack-holders-app.html` (operator dashboard concept).
2. Dark editorial palette, honest numbers (e.g. modeler that shows when **not** to switch — CLAUDE.md sales doctrine).

### Agent-assisted site (not a pitch deck)
1. If building a full marketing site, follow `skills/site-builder/SKILL.md` (11ty, Editorial Light) — that is a different deliverable shape than root pitch HTML.

## Non-obvious rules

- **Public by design on pitches.gullstack.com** — CLAUDE.md documents SSO protection disabled (2026-07-31). Do not put secrets, private financials beyond intended pitch content, or internal credentials in HTML.
- **Sharing link = pitches.gullstack.com**, not only `*.vercel.app`.
- **vercel.json rewrite** assumes file name = path slug + `.html`. Breaking that mapping 404s clean URLs.
- **Cache-Control public max-age=3600** on all paths via vercel.json — expect CDN caching after deploy.
- **Do not force-push**; treat as production marketing surface.
- **Prospect pricing/copy decisions** may be recorded in CLAUDE.md session log (e.g. website $500/mo for Jack Holder's) — read before "fixing" commercial claims.

## Things that look wrong but are intentional

- **Hundreds of root HTML files** — one-file-per-prospect is the product; do not migrate wholesale to a framework without a decision.
- **Duplicated CSS across files** — pitches are intentionally portable single files for email/share and offline review.
- **`skills/site-builder` describes 11ty sites** while most of this repo is raw HTML pitches — different output modes coexist.
- **CLAUDE.md is a long sales session log** — operational memory; do not replace with a short stub without human OK.

## Open questions

- Whether HVAC pitches should stay flat files forever vs generator.
- Policy for retiring stale pitches (delete vs archive folder).
- Whether `cw-trifold-v16-option` nested deploy should be extracted to its own project.
