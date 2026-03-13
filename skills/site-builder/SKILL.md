# Skill: GullStack Site Builder

Build premium client websites to GullStack's Tier-S standard. Every site uses 11ty, follows Editorial Light design, StoryBrand messaging, and ships with full AEO.

---

## Pre-Build Checklist

Before writing ANY code, read these files (resolve paths relative to the agent's workspace):

1. `playbooks/design-standard-v3.md` — Editorial Light template (the ONLY standard)
2. `playbooks/storybrand.md` — SB7 messaging framework
3. `playbooks/website-conversion.md` — conversion optimization
4. `DEPLOYMENT-CHECKLIST.md` — mandatory post-deploy verification
5. `CLIENT-MONITORING.md` — ongoing verification protocol

If any of these files are missing from your workspace, STOP and tell the user. Do not build without them.

---

## Build Standards

### Tech Stack
- **11ty (Eleventy)** — static site generator, always
- **Nunjucks (.njk)** — templating language
- **Vanilla CSS** — no Tailwind, no frameworks. Custom properties for brand colors.
- **No JS frameworks** — vanilla JS only, minimal. Native HTML elements preferred (`<details>` for FAQ, CSS animations for marquees)

### Design: Editorial Light v3
- **80% light backgrounds** (#f5f5f0 or white), dark only for nav + footer
- **Full-bleed hero imagery** — edge-to-edge, NO heavy overlays (20-30% opacity max gradient)
- **Big typography** — H1: `clamp(2rem, 5vw, 3.5rem)`, Hero: `clamp(2.25rem, 5.5vw, 3.75rem)`
- **Generous whitespace** — section padding `6rem 0` desktop, `4rem 0` mobile
- **Inter font** (or similar clean sans-serif)
- **NO emojis** — use SVG icons or nothing

### Homepage Section Order (minimum 6 of these)
1. Hero — full-bleed image, big headline, subtitle, CTA
2. Partners/Logos — scrolling marquee, grayscale
3. Who We Serve — bold headline + category descriptions
4. Project/Work Showcase — image cards grid (3-up desktop)
5. Testimonials — star rating, quote, name/title
6. Benefits — checkmark icons + descriptions
7. How to Start — 3-step process cards
8. Comparison Table — us vs. alternatives (green checks / gray X's)
9. FAQ — `<details>` accordion, 5-6 questions
10. Contact Form — background image + floating white card

**Required minimum:** Hero + Partners + Showcase + Comparison + FAQ + Contact

### Mandatory Social Proof
Every homepage needs at least 3 of:
- Scrolling client logos
- Comparison table (this is the killer — answers objections visually)
- Testimonial cards
- FAQ accordion
- "How to Start" process cards

### Color Strategy
```css
--color-primary-dark   /* nav, footer, headings */
--color-accent         /* CTAs, highlights, step numbers */
--color-light          /* section backgrounds (#f5f5f0 or warm neutral) */
--color-white          /* cards, form backgrounds */
/* Body text: #333-#555, never pure black */
```

---

## Messaging: StoryBrand (SB7)

- **Customer is the hero.** Brand is the guide. Never position the brand as the star.
- **Lead with the problem.** External problem → internal frustration → philosophical wrong.
- **Clarity over cleverness.** Kill corporate fluff. No "committed to excellence."
- **3-step plan max.** Reduce cognitive load.
- **Bold CTAs.** Ask for the sale. Passive = "we don't believe in our product."
- **The grunt test:** Could a caveman understand what you offer in 5 seconds?

---

## AEO (Answer Engine Optimization) — EVERY Build

### Required Schema (in `<head>`)
- **Organization** — name, url, logo, sameAs (socials)
- **LocalBusiness** — address, phone, hours, geo coordinates
- **FAQPage** — on every service page
- **BreadcrumbList** — on all pages

### Required Content Patterns
- Structured Q&A sections (answer LLM queries directly)
- E-E-A-T signals: credentials, founding date, author info, reviews
- Service pages answer "how much does X cost" and "best X near me" patterns

---

## Deployment

### Git Workflow
1. `git pull --rebase origin main` — ALWAYS pull first
2. Make changes
3. `git add` + `git commit -m "Bot [YourName]: [what changed]"`
4. `git push origin main` — if rejected, pull and retry
5. **Never force push. Ever.**
6. **NEVER hardcode tokens/keys/secrets in source code**

### Vercel
- **Free plan** for all new/prospect sites
- Only move to paid/GullStack team when they become paying customers
- Auto-deploy via GitHub → Vercel integration
- Verify `vercel.json` has correct `buildCommand` and `outputDirectory`

### Post-Deploy Verification (MANDATORY)
Run the full `DEPLOYMENT-CHECKLIST.md`:
- [ ] Live URL loads
- [ ] Homepage displays correctly
- [ ] All images load
- [ ] Navigation works
- [ ] Internal links work (no 404s)
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] Broken link scan
- [ ] Sitemap validation
- [ ] Structured data validation

---

## Dynamic Sitemap (11ty)

Every site MUST have a dynamic sitemap. Add to root:

```njk
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{%- for page in collections.all %}
  <url>
    <loc>{{ site.url }}{{ page.url }}</loc>
    <lastmod>{{ page.date | dateToISO }}</lastmod>
  </url>
{%- endfor %}
</urlset>
```

---

## GullStack Footer (MANDATORY)

Every client site must include a GullStack attribution footer:
```html
<div class="gullstack-credit">
  Built by <a href="https://gullstack.com">GullStack</a>
</div>
```

---

## Forms — MUST Work on Day One

Every contact form needs a real backend before launch. No `action="#"` placeholder forms.

### Required Setup
- **Vercel serverless function** at `api/submit-lead.js`
- **SendGrid** for email delivery (confirmation to prospect + notification to client)
- **CC bryce@gullstack.com** on all lead notifications
- **Honeypot field** for spam protection (hidden input, reject if filled)
- **Client-side JS handler** — `fetch('/api/submit-lead')` with loading state + success/error messages
- **Env vars on Vercel:** `SENDGRID_API_KEY`, `SITE_EMAIL`, `FROM_EMAIL`, `SUPABASE_URL` (if using), `SUPABASE_SERVICE_KEY` (if using)
- **Test the form** after deploy — actually submit and verify emails arrive

### Don't
- ❌ Never ship a form with `action="#"` — a form that goes nowhere is worse than no form
- ❌ Never put a generic `e.preventDefault()` handler on ALL forms in main.js — it will block real form submissions
- ❌ Never assume the form works because the page loads — test the actual submission

---

## Mobile — Test Everything

- **Always test the hamburger menu.** CSS `display: none` on nav-links will override any JS `.active` toggle. Use `opacity`/`visibility` for show/hide on mobile, not display.
- **Test all CTAs on mobile.** Buttons need to be tappable (min 44px hit target).
- **Header buttons (Contact, Phone)** should be styled as real buttons in the nav — not just text links that get lost.

---

## Shared Components — No Drift

- **Homepage is the source of truth** for header/footer style. Every page must match.
- **Never build a page with its own bespoke header.** Use the shared partial.
- **If the site has duplicated headers across files, convert to 11ty immediately.**

---

## Deployment Verification (EXPANDED)

After `git push` and Vercel deploy:
1. **Verify the live production URL** — `git push` ≠ live. Check the actual site.
2. **Check GitHub Actions** — if using CI, verify the run succeeded. Stale credentials fail silently.
3. **Verify Vercel build command** — `@11ty/eleventy` not `eleventy` (wrong npm package). Use `npm run build` or `npx @11ty/eleventy`.
4. **Check canonical URLs** exist on every page (`<link rel="canonical">`).
5. **Test contact form submission** end-to-end.

---

## Client Feedback Patterns (Lessons Learned)

- **Decorative UI gets killed.** Tilted/slanted cards, fancy animations — if the client doesn't like it, straighten it out. Prefer clean + professional with subtle hover effects over gimmicky.
- **Loop indexes leaking into UI** ("Service 4", "Service 5") is amateur hour. QA every template loop output.
- **"Service numbers" on service pages aren't needed.** Service name + description + CTA is enough.

---

## What NOT To Do
- ❌ No dark-heavy "SaaS template" designs (Falling Waters is retired)
- ❌ No emoji on websites
- ❌ No Tailwind or CSS frameworks
- ❌ No JS frameworks (React, Vue, etc.)
- ❌ No hardcoded API keys or tokens
- ❌ No generic copy ("committed to excellence", "your trusted partner")
- ❌ No deploying without running the full checklist
- ❌ No force pushing
- ❌ No standalone HTML files with duplicated headers/footers — 11ty from day one
- ❌ No forms without a working backend
- ❌ No shipping without testing mobile nav
