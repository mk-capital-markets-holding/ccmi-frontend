# PRD — MK Capital Markets Technologies Ltd (Corporate Website)

## Problem Statement
Build a premium, institutional corporate website for **MK Capital Markets Technologies Ltd** (Dubai, UAE) — publisher of the **CCMI** platform, targeting African emerging capital markets. Must:
- Serve as commercial/marketing reference for investors, regulators, banks, family offices
- Present CCMI platform and its 6 modules + 4 future modules
- Generate qualified leads through 6 form types
- Support Series B fundraising (gated data room)
- Attract fintech talent (careers form)
- Reinforce Dubai as fintech corridor for Africa
- Bilingual EN default + `/fr/` prefix for French, architected for Arabic RTL in Phase 2

**Non-negotiable design constraint**: Must NEVER look like an AI-generated SaaS template. Editorial identity like a branding agency for an investment bank / stock exchange (LSE, Nasdaq, Clearstream, Euroclear, Financial Times aesthetic).

## Stack
- Frontend: React (CRA) + React Router + react-helmet-async + Tailwind + shadcn/ui + lucide-react + framer-motion + react-query + axios
- Backend: FastAPI + Motor + MongoDB
- i18n: custom React Context (`/app/frontend/src/i18n/context.jsx`)
- Fonts: Newsreader (serif) + IBM Plex Sans (body) + IBM Plex Mono
- Palette: `#0A1628` (deep midnight blue) + `#C9A961` (discreet gold/bronze) + `#F8F7F4` (warm off-white)

## Architecture — Routes delivered

| Path | Purpose |
|---|---|
| `/` | Homepage: hero + value prop + modules + industries + testimonials + insights + CTA |
| `/about` | Mission, vision, timeline (2019-2026), founder card, Africa presence grid (9 markets), values, Dubai HQ + Google Maps, licenses, certifications |
| `/founder` | Founder bio, career, awards, upcoming events, media |
| `/solutions` | Hub of 6 CCMI modules + link to roadmap |
| `/solutions/roadmap` | Future modules (Phase 2) + quarterly schedule |
| `/solutions/:slug` | Module template (6 slugs: investor-registry, corporate-governance, campaign-workspace, financial-engineering, investor-portal, ipo-hub) |
| `/industries` | Hub of 7 industry pages |
| `/industries/:slug` | Industry template (7 slugs: exchanges, regulators, banks, brokers, asset-managers, issuers, investors) |
| `/investors` | Public hero + KPIs + 4 thesis sections; gated data room unlocked via demo code |
| `/technology` | 5 architecture pillars + reference architecture 5-layer diagram |
| `/insights` | Blog listing with category filter + live search |
| `/insights/:slug` | Article detail with reading progress bar + share links |
| `/contact` | 6 form tabs (general, demo, investor, careers with CV upload, partnership, support) |
| `/legal/privacy` \| `/legal/terms` \| `/legal/cookies` | GDPR-aligned legal pages |
| `/search` | Global search page grouped by content type |
| `/fr/*` | All routes mirrored under FR prefix |

## Backend endpoints (`/api` prefix)
- `POST /api/contact` — 6 form types stored to Mongo
- `POST /api/newsletter/subscribe` — email upsert
- `GET /api/articles?category=&q=&limit=` — 6 seeded articles
- `GET /api/articles/{slug}` — full article
- `GET /api/search?q=` — grouped results (solutions/industries/pages/articles)
- `POST /api/investors/access` — simulated auth; demo codes `MKCMT2026`, `INVESTOR-DEMO`, `DUBAI` grant a session token
- `POST /api/investors/verify` — verify a stored token
- `POST /api/investors/nda` — record NDA
- `GET /api/site/stats` — homepage KPI counters

## What has been implemented (2026-02)
- ✅ Complete architecture per FRD (all 30+ pages, all interconnected)
- ✅ Responsive (mobile / tablet / desktop / ultra-wide)
- ✅ Six form types with validation, mocked notifications, CV upload
- ✅ Investor gated area with simulated NDA + demo access codes
- ✅ i18n shell (EN default, `/fr/` prefix, hreflang tags in `<Layout />`)
- ✅ SEO meta per page (title, description, canonical, OG, Twitter Cards)
- ✅ Legal pages (Privacy, Terms, Cookies) — GDPR/DIFC DP Law aligned
- ✅ Cookie banner with Accept/Reject choices, persists to localStorage
- ✅ Global search modal + dedicated `/search` page
- ✅ Reading progress bar on article pages
- ✅ Ticker on hero; testimonials; timeline; Google Maps embed
- ✅ 6 CCMI modules + 4 future modules data-driven
- ✅ 7 industry pages data-driven
- ✅ 6 seeded blog articles with categories, tags, cover images
- ✅ Design tokens: Newsreader serif + IBM Plex Sans, midnight+bronze palette, no purple/violet gradients, no generic SaaS aesthetics
- ✅ 100% backend test pass (24/24), 100% frontend test pass (24 flows)

## Prioritized backlog

### P0 — Ready to unlock with real integrations (no code change needed, just keys)
1. HubSpot CRM sync for contact submissions
2. Mailchimp for newsletter double opt-in
3. Google Analytics 4 + Meta Pixel + LinkedIn Insight tag
4. Google reCAPTCHA v3 site key
5. Calendly embed on Investors + Founder pages

### P1 — Phase 2 items architected but deferred
1. Arabic (RTL) locale — i18n architecture ready; add `ar` dictionary + RTL CSS pass
2. Full CMS admin UI with content versioning (currently seed data in `/data/*.js` + `ARTICLES` in server.py)
3. Blog comments (moderated)
4. Full authenticated investor space (Phase 2 per FRD)
5. Support ticketing backend (currently form only)
6. XML sitemap + robots.txt auto-generation
7. Schema.org structured data for Organization/Product/Article
8. Full French translation of page bodies (i18n shell is in place)

### P2 — Optimisation
1. Image optimization pipeline (WebP/AVIF served via next-gen format detection)
2. Lighthouse audit + Core Web Vitals tuning
3. E2E accessibility audit for WCAG 2.2 AA compliance
4. Investor session TTL / expiry

## Investor demo access (for QA)
Codes granting immediate access to gated data room:
- `MKCMT2026`
- `INVESTOR-DEMO`
- `DUBAI`
Use with any valid email at `/investors` "Request access" form.
