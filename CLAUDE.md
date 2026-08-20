# gullstack-pitches

Single-file HTML pitch decks and concept demos for GullStack prospects. Each
prospect gets one or two files at the repo root:

- `<client>.html` — the pitch/proposal (dark, editorial, house style)
- `<client>-demo.html` — an optional working concept site for that client
- `<client>/` — any images downloaded for that client

Deployed to Vercel project `gullstack-pitches` (team `gull-stack`) on push to
`main`. `vercel.json` rewrites `/(.*)` → `/$1.html`, so `/jack-holders` serves
`jack-holders.html`.

**Sharing:** the clean host is **`pitches.gullstack.com`** — already aliased to
this project. Use it for anything sent to a prospect. Vercel SSO protection was
turned off on 2026-07-31 (`vercel project protection disable --sso
gullstack-pitches --scope gull-stack`), so every pitch in this repo is publicly
reachable by URL on both hosts. Re-enable with `... protection enable --sso ...`,
but note that only re-gates `*.vercel.app`, not the custom domain.

## Session Log

### 2026-08-20 — Wealth-management one-pager for a Texas prospect (Bret McCormack intro)

- **Shipped `/wealth-management`** (commit `145c78d`, NOT pushed — see below). A
  one-pager for a national financial planning practice in Texas, introduced by
  **Bret McCormack** ("Brett Mack"). Four sections: website, paid advertising,
  marketing tracking, content by discipline — plus a "what we are not claiming"
  block and a preview of the almost-live rebuild.
- **Both clients are anonymized as "Firm A" and "Firm B"** at Bryce's
  instruction. Verified programmatically: zero occurrences of either firm name,
  the two competitor names, or the city names in the rendered text. Every metric
  survived the anonymization — no number is tied to a named firm anywhere.
- **Sources for every figure** (all verified this session, not recalled):
  Firm A baseline from the 2026-07-31 Semrush audit — 31 keywords, 58 visits/mo,
  $0 traffic value, 96.55% of organic on the brand term; competitors at 686 and
  1,856; the 401(k) benchmarking page at positions 44–82, $3.85–$9.95 CPC;
  ~93 legacy URLs mapped. Firm B cost-per-lead from our own Meta account —
  federal webinar $11–21, workshop v1 ~$29 with the restricted-targeting toggle
  on, rebuilt under $25.
- **Page counts corrected against the repo, not the audit:** 17 public pages
  (20 HTML files minus portal/blueprint/roadmap, which are noindexed), of which
  11 are single-discipline or single-situation pages. The 07-31 audit's "18" was
  stale.
- **Preview section:** a browser-chrome frame holding `wealth/site-preview.jpg`
  plus an "Open the full site" link. A live cross-origin `<iframe>` was built
  first and **rejected — it paints blank in the Chrome harness** and could not be
  proven to render on a prospect's screen. The screenshot always renders. The
  shot was captured by injecting `.rv{opacity:1 !important}` to defeat the
  target site's scroll-reveals, which never fire in a backgrounded tab.
- **Known and accepted:** the screenshot and the link both identify Firm A (logo,
  phone, city). Bryce chose to leave it; Josh is his partner and signed off.
- ⚠️ **`git push` is denied by the permission classifier in this session.** The
  commit landed locally; nothing is live until Bryce runs
  `git push origin main`. Same block hit three times across the session.

### 2026-07-31 (evening) — Intro made, round 1.1 shipped

- **Kyle introduced Bryce to Dan (the owner) by text.** Dan: +1 (408) 839-7716.
  Meeting **Monday 2026-08-03**. Dan: "Love the website… Like to pick your mind
  on Toast application and POS potential."
- **Intel:** Dan volunteered that Alex Hult's AIO is an "AI generated POS" and
  that Hult was raising $100k from investors a year ago. Dan has already spotted
  that it's a v1 from an unfunded startup. Counter is proven-POS-plus-our-layer,
  not "our AI is better" — and we must not overclaim, we don't have a POS either.
- **Shipped `/jack-holders-app`** (commit `9f717c4`) as the promised "round 1.1":
  operator dashboard on their real June statement + Toast invoice, plus a live
  card-cost modeler with debit-mix and markup (bps) sliders across three pricing
  models. Sales/Labor/Menu/Reviews tabs shown as roadmap, explicitly not built.
- **The modeler tells Dan when NOT to switch** — at low debit mix, interchange-
  plus shows a negative saving and says so in red. Deliberate; that honesty is
  the differentiation against Hult.
- **Website is now $500/mo in the pitch, not free** (commit `7f78a8b`). Free was
  what created Dan's "how are you making money" objection and left our floor at
  $0. Pitch now discloses all three revenue lines including margin in bps.
- **Still the blocker:** no processor or POS reseller agreement. Dan will ask for
  a basis-point number Monday and we cannot answer it. Say we're finalizing the
  partner; do not bluff a rate.

### 2026-07-31 (later) — Multi-page rebuild, Toast invoice, rate strategy

- **Demo is now six pages**, not a one-pager (Bryce: "I hate one page sites").
  Generated from `jackholders/build.py` — one template, one nav, one footer.
  Regenerate with `python3 jackholders/build.py`. Shared CSS at
  `jackholders/site.css`. Routes: `/jack-holders-demo` + `/breakfast`,
  `/lunch-dinner`, `/bar`, `/about`, `/visit`.
- **Vercel SSO blocker resolved.** `vercel project protection disable --sso
  gullstack-pitches --scope gull-stack`. There IS a CLI command for this — the
  MCP Vercel connection 403s (no update permission on the team), the local CLI
  works. Note this makes *every* pitch in the repo public.
- **Toast invoice #INV10030049 itemized into the pitch.** $731.13/mo across 11
  lines; 7 handhelds + 2 tablets at $48.74 each = $438.66 (60% of the bill) on
  hardware they already own. Base POS software is only $87.74. Toast Digital
  Storefront (their website product) is $73.12/mo.
- **Answered "how do we beat 1.733% + $0.15."** Their flat rate charges the
  same on regulated debit (true cost ~$0.25 on a $72.58 ticket) as on premium
  rewards credit (~$1.52). Modeled processor gross margin $1,165–2,764/mo.
  IC+ at 0.15–0.25% + $0.05–0.08 lands 1.55–1.84% effective, saving
  $5,726–21,155/yr depending on debit mix. Pitch now offers two paths.
- **⚠️ We cannot deliver any of this yet.** No processor relationship (Stripe
  doesn't do dual pricing or third-party IC+ resale) and no POS to replace
  Toast. Needs an ISO/agent agreement and a POS reseller deal (SkyTab, SpotOn,
  Clover). Full economics + risks on the Notion client page.
- **Recommended sequencing:** Phase 1 build on top of Toast's API (they
  already pay $24.37/mo for it), Phase 2 replace the POS once a partner is
  signed. Do not quote a rate before knowing our buy rate.

### 2026-07-31 — Jack Holder's Restaurant & Bar (Willow Glen, San Jose)

- **Lead source:** Kyle Dickson referral. Owner is shopping an "AIO" pitch from
  Alex Hult, currently on Toast, wants gift cards + online ordering + DoorDash +
  Uber Eats. Kyle takes 10% of this deal per Bryce.
- **Shipped two pages** (commit `cd63303`):
  - `jack-holders-demo.html` — full concept site. Editorial Light, Fraunces +
    Inter, crimson/cream palette sampled from their logo. Real menu content
    transcribed from jackholders.com (breakfast, lunch & dinner, bar), their own
    photography pulled into `jackholders/`, tabbed menus, live open/closed
    status in the header, `Restaurant` + `FAQPage` schema, Toast ordering and
    gift-card CTAs everywhere, sticky mobile order bar.
  - `jack-holders.html` — the pitch, built off their **June 2026 merchant
    statement** (photo Kyle sent). All figures verified against the statement
    to the penny.
- **The numbers** (statement period 6/1/26–6/30/26, MID ending 394988):
  $493,680.75 volume · 6,779 txns · $72.83 avg ticket · $9,989.31 fees ·
  **2.02% blended**. Card-present V/MC/D is 1.733% + $0.15 — genuinely sharp,
  so the pitch does *not* promise a rate cut. Annualized: $5.92M volume,
  $119,872 card fees + $8,772 Toast software = **$128,644/yr**.
- **Pitch angle:** three buckets — (1) move card cost to the customer via a
  compliant CA cash-price/card-price program, (2) replace the $731/mo Toast
  software line, (3) push first-party ordering instead of 15–30% marketplace
  commissions. Site is offered free with the payments relationship.
- **Open items for next session:**
  - Fix the Vercel SSO problem above before sending anything to the owner.
  - Confirm the "website is free with payments" offer framing — that's the
    assumption baked into the pitch's pricing FAQ.
  - Bucket 3 ($2,000/mo delivery savings) is modeled at $10k/mo delivery
    volume, not measured. Swap in real numbers if the owner shares them.
  - Social proof on the demo uses real aggregate ratings only (4.4 Google,
    4.4 across platforms, 750+ Yelp). No review quotes were invented — add
    three real Google quotes before this becomes a live site.
  - No prices on the demo menus (their site doesn't publish them). Menus link
    to Toast for live pricing.

<!-- gs-notes-convention -->
## Notes convention (read this first)

This repo is the system of record for everything we know about gullstack-pitches.
Anyone working here — Bryce, Josh, or a Claude session — saves to these files:

- `CLAUDE.md` (this file) — **Session Log**. Append a dated entry at the TOP
  of the Session Log section when a session or discrete task ends: what
  shipped, current state, what's next. 3–8 tight bullets.
- `docs/roadmap.md` — what we're trying to do here, and what comes next.
- `docs/notes.md` — durable facts: decisions, gotchas, links, who asked for what.

Rules:

1. Read the newest Session Log entry before starting work.
2. Write notes as you go, not from memory at the end.
3. **Commit before the session ends.** An uncommitted note may as well not exist.
4. No secrets in any of these files — no passwords, keys, or tokens.
5. Write for someone who wasn't in the room.

