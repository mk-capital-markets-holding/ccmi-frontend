# MK Capital Markets Technologies Ltd — PRD

## Original Problem Statement
Build a premium, institutional corporate website for **MK Capital Markets Technologies Ltd** (CCMI platform) — a fintech serving African emerging markets & the Gulf. High-end, credible, distinctly not "AI-slop". Full bilingual (EN default, FR at `/fr/*`) from Phase 1.

## Design System
- Palette: Deep Midnight Blue (`#0A1628`) + Bronze (`#C9A961`) + Off-white
- Typography: serif headings (Playfair-style) + clean sans-serif body
- Grain overlay, tri-color mono/serif/sans mix, disciplined institutional feel

## Tech Stack
- **Frontend**: CRA (React 19) + React Router + React Helmet Async + Tailwind + shadcn/ui
- **Backend**: FastAPI + Motor + MongoDB
- **i18n**: JSON dictionaries under `/app/frontend/src/i18n/locales/{en,fr}.json`, `t()` helper for static strings, `L()` helper for bilingual data objects, `/fr/*` URL prefix + `mk-lang` localStorage

## Pages (all fully bilingual)
Home · About · Founder · Solutions Hub · Module × 6 · Roadmap · Industries Hub · Industry × 7 · Investors (gated data-room) · Technology · Insights · Article detail · Contact (6 forms) · Legal × 3 · Search · 404

## Backend Endpoints
- `GET /api/stats`
- `GET /api/articles?lang=&category=&q=` and `GET /api/articles/{slug}?lang=`
- `GET /api/search?q=&lang=`
- `POST /api/contact` (6 form types)
- `POST /api/investors/access` (codes: MKCMT2026 / INVESTOR-DEMO / DUBAI)
- `POST /api/newsletter`

## Data Models
- `ContactSubmission { form_type, payload, lang, created_at }`
- `Article { slug, title{en,fr}, excerpt{en,fr}, body{en,fr}, tags[], category, cover, author, published_at, lang served }`

## What's Implemented (as of Feb 2026)
- ✅ Full design system + Tailwind config with custom `mk-ink`/`mk-bronze`/`mk-paper` colors
- ✅ Backend: all endpoints (24/24 pytest passed, iteration_1)
- ✅ i18n architecture: JSON dictionaries (439 keys × 2 languages), `t()` + `L()` helpers, `/fr/*` routes
- ✅ **All 24 pages fully bilingual** — verified end-to-end by testing agent (iteration_3): 24/24 pages FR-clean, language toggle switches URL prefix AND translates content live without full reload
- ✅ Investor gated data-room (simulated auth) + 6 forms + Search + Insights filter + Article detail with localized tags
- ✅ Google Maps embed language now switches with UI language
- ✅ Brand tagline localized ("Dubai" → "Dubaï" in FR)

## Prioritized Backlog

### P1 — Content & polish
- Add more mocked articles per category for richer Insights page
- Case studies / detailed customer stories page under `/industries/{sector}`
- Company timeline animation (parallax/scroll-driven reveals)

### P2 — Phase 2 features
- Arabic (RTL) architecture preparation
- Live GA4 / HubSpot / Calendly / LinkedIn / reCAPTCHA integrations (Phase 1 = mocked)
- CMS wiring for insights/articles (currently mocked in backend)

### P3 — Nice-to-have
- URL-vs-localStorage precedence tightening: when user is on non-`/fr` URL, ignore stale FR localStorage state
- Rich SEO / OG image generation per article
- Investor data-room: real document downloads (mock PDF blobs)

## Test Credentials
See `/app/memory/test_credentials.md` — Investor access codes: **MKCMT2026** / **INVESTOR-DEMO** / **DUBAI**.

## Testing Reports
- `/app/test_reports/iteration_1.json` — backend, 24/24 pass
- `/app/test_reports/iteration_3.json` — frontend i18n regression, 24/24 pages FR-clean

## Mocked Integrations (Phase 1)
HubSpot, Calendly, GA4, reCAPTCHA, LinkedIn Insight, Meta Pixel — per user directive.
