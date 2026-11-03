# AGENTS.md — Agent Logbook & Operations Standard

## Overview

This file serves as the official **Agent Logbook** for the Malaika Studios repository (`MS-STUDIOS-WEBSITE`). Every AI coding assistant or autonomous agent making changes to this codebase MUST follow the logging standard documented below and append a log entry for every significant action, feature addition, refactor, or bug fix.

---

## Agent Protocol & Logging Standard

When completing any modification, task, or iteration in this codebase, the agent MUST append a new entry to the [Change Log](#change-log) section below.

### Log Entry Template

```markdown
### [YYYY-MM-DD HH:MM:SS TZ] — <Agent Model / Name> (<Role / Task Title>)

- **Timestamp:** YYYY-MM-DDTHH:MM:SS+TZ
- **Model / Assistant:** <Model Name, e.g. Gemini 3.6 Flash / Antigravity>
- **Role:** <Role Name, e.g. Lead Engineer / UI Specialist / Codebase Researcher>
- **Task / Scope:** <Brief explanation of what was done>
- **Files Modified / Created:**
  - `path/to/modified-file-1`
  - `path/to/created-file-2`
- **Key Decisions & Implementation Details:**
  - Decision 1...
  - Decision 2...
- **Verification & Status:** <Commands executed, verification results, or status>
```

---

## Change Log

### [2026-09-27 23:25:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-27T23:25:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Created `reference/the-malaika-match-v6.html` standard reference file and initialized repository `AGENTS.md` logbook.
- **Files Modified / Created:**
  - `reference/the-malaika-match-v6.html` (Created)
  - `AGENTS.md` (Created)
- **Key Decisions & Implementation Details:**
  - Constructed `reference/the-malaika-match-v6.html` by combining the full v5 dynamic questionnaire flow (multi-branch question sequence, options, keyboard shortcuts, contact screen, state scoring logic) with the expressive v3 multi-block reveal result page (`.reveal`, `.reveal-block` 01-05 sections, `.match-reveal`, `.brief-grid`, `.config-grid` 3-card pricing matrix, dark `.recommendation` card, `.final-reveal` call to action).
  - Established `AGENTS.md` as the agent logbook standard for all future AI agent modifications on this project.
- **Verification & Status:**
  - `reference/the-malaika-match-v6.html` successfully written and verified.
  - Initial logbook established.

### [2026-09-27 23:38:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-27T23:38:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Implemented "The Malaika Match" inside the Next.js App Router project following `docs/malaika-match-implementation-plan.md` and reference standard `v6.html`.
- **Files Modified / Created:**
  - `lib/malaika-match/config.ts` (Created — Single typed configuration module with question taxonomy, scoring algorithm, price matrix, project modifiers, recommendation generators)
  - `app/api/match/route.ts` (Created — Server-side calculation & Brevo API lead upsert route with optional Cloudflare Turnstile verification)
  - `app/api/match/response/route.ts` (Created — Server-side API endpoint for recording negotiation choices to Brevo)
  - `components/match/match.module.css` (Created — CSS module for quiz interaction & v3 multi-block reveal result screen)
  - `components/match/match-hero.tsx` (Created — Intro screen component)
  - `components/match/match-quiz.tsx` (Created — Dynamic question slide component with single/multi-select & keyboard shortcuts)
  - `components/match/match-contact.tsx` (Created — Contact capture screen with required validation & optional Turnstile)
  - `components/match/match-result.tsx` (Created — Rich 5-block reveal result view with score badge, summary grid, 3-card pricing matrix, dark recommendation block, and final CTA with WhatsApp link)
  - `components/match/malaika-match-flow.tsx` (Created — Client orchestrator component managing state, localStorage draft persistence, back button navigation, and GA4 analytics triggers)
  - `app/match/page.tsx` (Created — Page route at `/match`)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - Implemented `/match` App Router page leveraging typed config in `lib/malaika-match/config.ts`.
  - Enforced server-side score calculation and Brevo lead processing in `app/api/match/route.ts`.
  - Built client components matching `v6.html` standard, featuring single & multi-choice questions, keyboard shortcut navigation (`1`-`9`, `Backspace`), state draft persistence in `localStorage`, and the v3 5-block reveal result view.
  - Verified local environment fallback when Brevo and Turnstile credentials are absent.
- **Verification & Status:**
  - Executed `pnpm build` — compiled successfully with zero errors.
  - Route `/match` and API routes `/api/match` and `/api/match/response` verified.

### [2026-09-28 05:51:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-28T05:51:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Updated topbar logo styling to render `assets/malaika-full-logo.svg`, updated site-wide CTAs across navigation, homepage, services, why-malaika, and contact pages to point to `/match` with clear non-technical estimate copy, and authored testing/operations guide.
- **Files Modified / Created:**
  - `components/match/match.module.css` (Updated — brand logo styles)
  - `components/match/malaika-match-flow.tsx` (Updated — topbar logo image rendering)
  - `reference/the-malaika-match-v6.html` (Updated — brand logo image rendering)
  - `components/home/home-navigation.tsx` (Updated — added `Estimate & Pricing` nav link and `Get Instant Estimate →` header CTA button)
  - `components/home/home-page.tsx` (Updated — hero button `Calculate Scope & Pricing →` and final CTA `Get An Instant Estimate →`)
  - `components/services/service-page.tsx` (Updated — service CTA `Calculate Scope & Pricing →`)
  - `components/what-we-do/what-we-do-page.tsx` (Updated — final CTA `Get An Instant Estimate →`)
  - `components/why-malaika/why-malaika-page.tsx` (Updated — final CTA `Calculate Scope & Pricing →`)
  - `components/work/our-work-page.tsx` (Updated — final CTA `Calculate Your Project Scope →`)
  - `components/contact-page.tsx` (Updated — added `Get An Instant Estimate →` primary CTA)
  - `docs/malaika-match-testing-and-operations-guide.md` (Created — full end-to-end testing, Brevo/Turnstile/GA4 setup & config customization guide)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - Replaced internal jargon ("The Match") on public CTAs with intuitive, benefit-driven copy (*"Get Instant Estimate →"*, *"Calculate Scope & Pricing →"*, *"Estimate & Pricing"* nav item) understandable by technical and non-technical visitors.
  - Included source tracking parameters (`/match?source=nav`, `home_hero`, `services`, etc.) for funnel analytics.
  - Confirmed Brevo automation plan availability (Brevo Free Plan includes 2,000 automation contacts and 300 emails/day for free).
- **Verification & Status:**
  - `pnpm build` verified — zero compilation or type errors.

### [2026-09-28 06:17:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-28T06:17:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Implemented Brevo 3-branch email automation system for post-estimate price response follow-up. Enhanced price response API, built 3 branded HTML email templates, and authored full Brevo setup + verification guide.
- **Files Modified / Created:**
  - `app/api/match/response/route.ts` (Updated — added `MATCH_PRICE_RESPONSE_AT` timestamp to Brevo contact update)
  - `docs/brevo-email-templates/good-start.html` (Created — `good_start` branch email)
  - `docs/brevo-email-templates/shape-scope.html` (Created — `shape_scope` branch email)
  - `docs/brevo-email-templates/not-right-yet.html` (Created — `not_right_yet` branch email)
  - `docs/brevo-automation-setup.md` (Created — full Brevo setup + 8-step verification checklist)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - Automation delays tuned to intent: `good_start` 1hr, `shape_scope` 30min, `not_right_yet` 2hrs.
  - Brevo gated by `NODE_ENV === 'production'` — dev never pollutes contacts.
  - Templates use `{{ params.variable_name }}` Brevo dynamic syntax mapped to stored contact attributes.
- **Verification & Status:**
  - `pnpm build` — exit code 0, zero errors.

### [2026-09-28 06:26:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-28T06:26:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Enhanced HTML email templates styling with Malaika Studios vibrant brand color system, integrated official brand logo assets from `malaikastudios.rotsi.co.ke`, and updated static public assets.
- **Files Modified / Created:**
  - `public/malaika-full-logo.svg` (Created — copied from `assets/malaika-full-logo.svg` for public root serving)
  - `docs/brevo-email-templates/good-start.html` (Updated — vibrant Malaika color palette `#2563ff`, `#ffd400`, `#ff5a5f`, `#101b1b`, hosted logo integration, styled score badge & recommendation card)
  - `docs/brevo-email-templates/shape-scope.html` (Updated — vibrant color system, option cards with accent edges, logo integration, callout boxes)
  - `docs/brevo-email-templates/not-right-yet.html` (Updated — vibrant brand accents, styled step cards, soft outline CTA button, logo header)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - Integrated `https://malaikastudios.rotsi.co.ke/icon-512.png` and `https://malaikastudios.rotsi.co.ke/malaika-full-logo.svg` for cross-client email rendering compatibility.
  - Aligned email template design token values with `app/globals.css`: Ink (`#101b1b`), Cream (`#f7f5ee`), Paper (`#fffdf8`), Electric Blue (`#2563ff`), Yellow (`#ffd400`), Coral (`#ff5a5f`), Green (`#16b88a`).
- **Verification & Status:**
  - `pnpm build` verified — exit code 0.

### [2026-09-28 13:20:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-28T13:20:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Enhanced Brevo v3 Events API payloads across match submit and price response endpoints to include both top-level `email` and nested `identifiers: { email }` objects for full compliance with Brevo's REST API schema.
- **Files Modified / Created:**
  - `app/api/match/route.ts` (Updated — added `identifiers: { email }` to `malaika_match_completed` event POST payload)
  - `app/api/match/response/route.ts` (Updated — added `identifiers: { email }` to `malaika_match_price_response` event POST payload)
  - `AGENTS.md` (Updated)
- **Verification & Status:**
  - `pnpm build` verified — exit code 0.

### [2026-09-28 13:31:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-09-28T13:31:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Updated Brevo setup guide (`docs/brevo-automation-setup.md`) to document the Contact Attribute Updated trigger as the primary automation setup method.
- **Files Modified / Created:**
  - `docs/brevo-automation-setup.md` (Updated — Part 4 updated with exact step-by-step instructions for Contact Attribute Updated trigger across all 3 branches)
  - `AGENTS.md` (Updated)
- **Verification & Status:**
  - Documentation updated and verified.

### [2026-10-02 13:04:00 +03:00] — Gemini 3.6 Flash / Antigravity (Lead AI Coding Assistant)

- **Timestamp:** 2026-10-02T13:04:00+03:00
- **Model / Assistant:** Gemini 3.6 Flash (Antigravity CLI)
- **Role:** Lead AI Coding Assistant
- **Task / Scope:** Centralized all pricing data into a canonical `lib/pricing.ts` and built the `/pricing` page — SEO-optimized, Malaika-themed, fully indexed, with a sticky service nav and 3-column config grid. All 60 configurations (5 services × 4 budget bands × 3 configs) are rendered in static HTML for Google. The match flow and pricing page now share a single source of truth for all prices.
- **Files Modified / Created:**
  - `lib/pricing.ts` (Created — canonical pricing source of truth: `OfferingKey`, `BudgetBandId`, `OFFERINGS`, `BUDGET_BANDS`, `LABELS`, `CONFIGS`, `getPricingConfigs()`, `extractPriceNumber()`)
  - `lib/malaika-match/config.ts` (Updated — removed duplicate `LABELS` and `CONFIGS` definitions; now imports + re-exports both from `lib/pricing.ts`; added `OfferingKey`/`BudgetBandId` type casts in `buildConfigs()`)
  - `components/pricing/pricing.module.css` (Created — full page styles: dark hero, sticky nav with per-service accent colors, budget band sections, 3-column config grid, dark/yellow recommended card, bottom CTA, mobile responsive)
  - `components/pricing/pricing-nav.tsx` (Created — `"use client"` sticky nav using IntersectionObserver to highlight active service section as user scrolls; smooth-scroll on click)
  - `components/pricing/pricing-page.tsx` (Created — server component; renders all 60 configs in static HTML for SEO; JSON-LD `ItemList` + `Offer` schema for Google rich results)
  - `app/pricing/page.tsx` (Created — App Router page route at `/pricing`; full `Metadata` export with title, description, keywords, OG, canonical targeting Kenyan digital marketing price queries)
  - `components/home/home-navigation.tsx` (Updated — added `/pricing` Pricing link + `isActive` check)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - `lib/pricing.ts` is the **one place to update prices** — changes propagate to `/match` result screen and `/pricing` page with zero code duplication.
  - All 60 configuration cards are rendered server-side in the HTML (not hidden by client-side state), ensuring Google crawls every price, deliverable, and config name.
  - `PricingNav` is the only client island — it adds scrollspy/sticky behaviour without hiding content from crawlers.
  - Recommended card (index 1 per band) styled dark ink + yellow — visually prominent on all screen sizes.
  - Mobile: single column with recommended card moved to top via `order: -1`.
  - Schema.org `ItemList` with per-config `Offer` items targeting `"website design price Kenya"`, `"digital marketing pricing Nairobi"` etc.
- **Verification & Status:**
  - `pnpm build` — exit code 0, zero type errors, zero compilation errors.
  - `/pricing` confirmed in build output as static (`○`) prerendered page.
  - All 27 pages built successfully.

### [2026-10-14 08:25:31 +03:00] — Claude Opus 5.5 / Claude Code (SEO & UX Audit, Blog System)

- **Timestamp:** 2026-10-14T08:25:31+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** SEO / UX Auditor & Lead Engineer
- **Task / Scope:** Audited the live site (malaikastudios.rotsi.co.ke) and codebase. Fixed canonical, title, Open Graph and consent bugs, improved navigation, and built a Markdown-powered blog with full SEO plumbing.
- **Files Modified / Created:**
  - `app/layout.tsx` (Updated — removed root `canonical: "/"` that leaked onto `/match`, `/blog` and 404s; removed hard-coded GA4 + Brevo scripts that loaded before consent and double-counted page views; self-hosted fonts via `next/font`; richer Organization schema; `summary_large_image` Twitter card)
  - `components/analytics/consent-and-analytics.tsx` (Updated — Brevo tracker now loads only after consent; `blog_post` page type)
  - `app/page.tsx`, `app/match/page.tsx`, `app/pricing/page.tsx`, `app/contact/page.tsx`, `app/what-we-do/why-malaika/page.tsx` (Updated — explicit canonicals, de-duplicated "| Malaika Studios" titles, keyword-led titles/descriptions)
  - `app/services/[slug]/page.tsx`, `app/our-work/work/[slug]/page.tsx` (Updated — OG image restored)
  - `content/case-studies/*.ts` (Updated — unique meta descriptions in place of templated ones)
  - `app/opengraph-image.tsx`, `lib/og-image.tsx` (Created — branded 1200×630 social cards)
  - `app/not-found.tsx` (Created — branded 404 with recovery links)
  - `app/sitemap.ts` (Updated — dropped fake `new Date()` lastmod; added blog index + posts with real dates)
  - `lib/blog.ts`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/[slug]/opengraph-image.tsx`, `app/blog/rss.xml/route.ts`, `components/blog/*` (Created — blog system)
  - `content/blog/how-much-does-a-website-cost-in-kenya.md`, `content/blog/_template.md`, `content/blog/_README.md` (Created — first post, template, writing guide)
  - `components/home/home-navigation.tsx`, `components/home/home-footer.tsx`, `components/home/home-page.module.css` (Updated — Blog link; removed redundant Home/"Get Your Estimate" links; hamburger below 1180px so labels never wrap; aria-labels on social icons)
  - `app/globals.css`, `tokens.css`, `lib/site.ts`, `package.json` (Updated — font variables, `phone`, `defaultOgImage`, `gray-matter` + `marked`)
- **Key Decisions & Implementation Details:**
  - Blog is file-based Markdown (`content/blog/<slug>.md`, frontmatter). No CMS, everything static. `draft: true` posts only show in dev; files starting with `_` are ignored.
  - Each post gets BlogPosting + BreadcrumbList JSON-LD, a dynamic OG image, a TOC, related posts, a `/match` + WhatsApp CTA, and sitemap/RSS entries.
  - The first post uses the real prices from `lib/pricing.ts`; update it when prices change.
- **Verification & Status:**
  - `pnpm build` — exit 0, 32 pages. Verified rendered canonicals, titles, og:image, robots, sitemap and RSS on `pnpm start`; checked layout at 375 / 1024 / 1280 px with no horizontal overflow.

### [2026-10-14 08:44:25 +03:00] — Claude Opus 5.5 / Claude Code (Malaika Match: estimate email & reveal experience)

- **Timestamp:** 2026-10-14T08:44:25+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / UX
- **Task / Scope:** Made `/match` actually email the estimate it promised. Added a team lead alert, a staged "calculating" reveal, and an animated result page. Fixed dead buttons and hardened the endpoint against abuse.
- **Files Modified / Created:**
  - `lib/brevo.ts` (Created — fetch-based Brevo REST helper, `brevoEnabled()`, `sendTransactionalEmail()`)
  - `lib/malaika-match/quote-email.ts` (Created — branded, email-client-safe HTML + plain-text estimate email; internal lead-alert email)
  - `app/api/match/route.ts` (Updated — sends quote + team alert alongside contact/event upserts via `Promise.allSettled`; returns `emailStatus`; server-side email validation, honeypot, per-IP throttle; Turnstile token now required to send the quote email when `TURNSTILE_SECRET_KEY` is set)
  - `app/api/match/email-preview/route.ts` (Created — dev-only email preview; 404 in production)
  - `components/match/match-calculating.tsx` (Created — 5-step progress sequence with ring, ~3.8s, reduced-motion aware)
  - `components/match/malaika-match-flow.tsx` (Updated — calculating screen, inline errors instead of `alert()`, source tracking, back-from-contact, scroll-to-top per screen)
  - `components/match/match-contact.tsx` (Updated — Turnstile widget, honeypot, autocomplete, clearer copy, perks row)
  - `components/match/match-result.tsx` (Updated — email sent/failed banner, personal greeting, score count-up, scroll reveals, WhatsApp link per option replacing dead "See what changes", price-response acknowledgement)
  - `components/match/match-quiz.tsx` (Updated — brief selection highlight before advancing, Back button on multi-select, aria-pressed)
  - `components/match/match.module.css`, `app/globals.css` (Updated — styles for the above, `.sr-only`)
  - `.env.example` (Updated — `BREVO_SENDER_EMAIL`, `MATCH_TEAM_EMAIL`, `BREVO_ENABLE_IN_DEV`)
- **Key Decisions & Implementation Details:**
  - No new npm dependencies; Brevo's `/v3/smtp/email` is called with `fetch`.
  - Quote emails go only to submissions that pass Turnstile, so the form can't be used to email strangers. The team alert is always sent and marks unverified leads.
  - The reveal sequence always plays in full and runs in parallel with the API, which hides email-sending latency.
  - Found: the Brevo account has IP allow-listing on, which rejects requests from unlisted IPs (confirmed from a dev machine). Vercel has no fixed egress IPs, so production Brevo calls are likely failing. It must be disabled in Brevo → Security → Authorised IPs.
- **Verification & Status:**
  - `pnpm build` exit 0 (33 pages). Walked the full flow in the browser at 1280px and 375px with no horizontal overflow. Calculating sequence measured: steps at 0.7/1.5/2.4/3.2/3.8s, result at 4.1s. Email preview reviewed. Production: preview route returns 404 and invalid email returns 400. Real email sending not exercised (requires Brevo IP fix).

### [2026-10-14 09:03:52 +03:00] — Claude Opus 5.5 / Claude Code (Malaika Match: live Brevo send test & event fix)

- **Timestamp:** 2026-10-14T09:03:52+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer
- **Task / Scope:** Ran the first live end-to-end send after Brevo IP allow-listing was disabled. Fixed the broken Brevo Events payload and a Turnstile double-render in dev.
- **Files Modified / Created:**
  - `app/api/match/route.ts` (Updated — Brevo event identifier `email` → `email_id`)
  - `app/api/match/response/route.ts` (Updated — same identifier fix; now uses `brevoEnabled()`/`brevoRequest()` so failures are logged and `BREVO_ENABLE_IN_DEV` is honoured)
  - `components/match/match-contact.tsx` (Updated — remove Turnstile load listener on unmount; prevents duplicate render under React StrictMode)
  - `.gitignore` (Updated — `.env*.local`)
  - `.env.local` (Created, gitignored — Cloudflare's always-pass Turnstile test keys for localhost only)
- **Key Decisions & Implementation Details:**
  - Brevo Events API rejects `identifiers.email` (400 "Invalid identifier passed email"). `malaika_match_completed` and `malaika_match_price_response` had never been recorded before this fix.
  - Brevo domain `rotsi.co.ke` is authenticated (DKIM via brevo1/brevo2, DMARC quarantine). Sender set to the verified `partnerships@rotsi.co.ke`. Free plan: 300 emails/day, 2 per estimate.
- **Verification & Status:**
  - Live test to makaveli@orderly.co.ke: estimate email **delivered**, team alert to malaikastudios@rotsi.co.ke **delivered**, contact attributes written, `/events` accepted after the fix (no errors logged). `BREVO_ENABLE_IN_DEV` set back to `false`. `pnpm build` exit 0.

### [2026-10-21 13:01:53 +03:00] — GPT-6 / Codex (Blog Research & Editorial Samples)

- **Timestamp:** 2026-10-21T13:01:53+03:00
- **Model / Assistant:** GPT-6 / Codex
- **Role:** Researcher / Content Editor
- **Task / Scope:** Prepared separate Kenyan and international technology blog samples with primary-source research, practical business analysis, and original explanatory charts.
- **Files Modified / Created:**
  - `content/blog/kenya-smartphone-growth-business-websites.md` (Created)
  - `content/blog/google-ai-search-links-businesses.md` (Created)
  - `public/blog/kenya-smartphone-growth-business-websites/research-chart.webp` (Created)
  - `public/blog/google-ai-search-links-businesses/research-chart.webp` (Created)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - Both posts remain `draft: true`; no publication or deployment performed.
  - Local article uses CA Q4 FY 2025/26 figures, distinguishing connected devices and subscriptions from unique people.
  - International article covers Google's 15 October 2026 AI Search announcement, distinguishing tests from rollouts and contextualising historical US click data from Pew Research Center.
  - Added original WebP charts using source data, zero-based axes, descriptive alt text, captions, and study limitations. Visually inspected both chart previews.
  - Linked supporting research inline and separated editorial recommendations from measured findings.
- **Verification & Status:**
  - Prettier completed for both posts. Markdown/frontmatter parsing and image-path checks passed; confirmed both draft flags.
  - `pnpm build` attempted; failed because the environment could not fetch the existing Google Fonts dependencies (Bricolage Grotesque, Caveat, DM Sans). Full production build remains unverified.

### [2026-10-21 13:28:57 +03:00] — Claude Opus 5.5 / Claude Code (Recurring blog series: Kenya Lens & Global Brief)

- **Timestamp:** 2026-10-21T13:28:57+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / Editor
- **Task / Scope:** Built the system for two researched, graphical posts a week (Kenya Lens on Mondays, Global Brief on Fridays), with richer link previews and a quality gate. Produced one vetted sample of each for review. Fixed a site-wide social-preview bug.
- **Files Modified / Created:**
  - `lib/blog-series.ts` (Created — series config: name, cadence, weekday, accent)
  - `lib/blog-charts.ts` (Created — ```chart Markdown blocks → responsive HTML bar/column/line charts with a data table)
  - `lib/blog.ts` (Updated — `series`, `keyStat`, `sources`, `factChecked` frontmatter; chart blocks; captioned figures; series-aware related posts)
  - `lib/og-image.tsx` (Updated — key-stat card layout, series accent, bundled brand fonts)
  - `assets/fonts/*.woff` (Created — Bricolage Grotesque 800, DM Sans 500/700 from @fontsource 5.2.8, OFL)
  - `app/blog/[slug]/opengraph-image.tsx` (Updated), `app/blog/[slug]/twitter-image.tsx` (Created)
  - `app/blog/series/[series]/page.tsx`, `app/blog/series/[series]/opengraph-image.tsx` (Created — series landing pages)
  - `components/blog/blog-post.tsx`, `components/blog/blog-index.tsx`, `components/blog/blog.module.css` (Updated — series badge/nav, key stat, Sources section with citation JSON-LD, fact-checked date, chart styles)
  - `app/sitemap.ts`, `app/blog/rss.xml/route.ts` (Updated — series pages and names)
  - `app/layout.tsx` (Updated — removed root openGraph/twitter title & description that every page inherited)
  - `scripts/check-blog.mjs` + `pnpm blog:check` (Created — quality gate)
  - `content/blog/_EDITORIAL.md` (Created — formats, research rules, chart spec, SEO, 40-point vetting rubric), `content/blog/_README.md` (Updated)
  - `content/blog/kenya-smartphone-growth-business-websites.md` (Rewritten as Kenya Lens, dated Mon 26 Oct 2026, draft)
  - `content/blog/global-brief-oil-shock-kenya-fuel-prices.md` (Created — Global Brief, dated Fri 23 Oct 2026, draft)
- **Key Decisions & Implementation Details:**
  - Charts are data in Markdown, not images, so they're crisp on mobile, crawlable and easy for an automated job to produce.
  - Every figure in both samples was checked against the primary source (CA PDFs ×3, CBK MPC + weekly bulletin, KNBS CPI, EPRA, BLS, Fed, FRED/EIA). IMF Africa figures were confirmed via two outlets because imf.org blocks automated access. Unverifiable items were left out (IMF Kenya forecast, Brent futures quotes, EPRA DG remarks).
  - Pre-existing bug fixed: pages without their own openGraph (contact, blog, match, etc.) showed the homepage title in link previews, and every page's twitter:title was the homepage's.
  - The Codex draft `google-ai-search-links-businesses.md` was left untouched. It overlaps with Global Brief story 5.
- **Verification & Status:**
  - `pnpm blog:check`: 4/4 pass. `pnpm build`: exit 0, 38 pages; drafts excluded from production. Share cards rendered and inspected; meta tags verified on the home, post, pricing, contact and series pages; layout checked at 1000px and 375px with no horizontal overflow.

### [2026-10-21 13:53:57 +03:00] — Claude Opus 5.5 / Claude Code (Global Brief refocus & Next.js security patch)

- **Timestamp:** 2026-10-21T13:53:57+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / Editor
- **Task / Scope:** Refocused the Global Brief on martech (the tools and platforms behind our services), following owner feedback that the macro and oil angle was off-track. Wrote a new sample issue. Patched the site's Next.js after a critical advisory surfaced in research.
- **Files Modified / Created:**
  - `package.json`, `pnpm-lock.yaml` (Updated — `next` and `eslint-config-next` 16.3.5 → 16.4.1; fixes GHSA-673q-mjm6-r5xr, CVE-2026-96889, GHSA-p3m5-59mp-jv5r)
  - `lib/blog-series.ts` (Updated — Global Brief tagline)
  - `content/blog/_EDITORIAL.md` (Updated — both series stay on the digital-tools beat; Global Brief beats table mapped to services; new structure with notable mentions and "what to do this week")
  - `scripts/check-blog.mjs` (Updated — "visuals" rule (charts + tables); Global Brief needs ≥1 chart and ≥2 visuals; quote-aware sentence splitting)
  - `lib/og-image.tsx` (Updated — key stat never wraps)
  - `content/blog/global-brief-braze-whatsapp-fees-meta-ads.md` (Created — draft, Fri 23 Oct 2026)
  - `content/blog/global-brief-oil-shock-kenya-fuel-prices.md` (Deleted — off-brief draft)
- **Key Decisions & Implementation Details:**
  - Stories: Salesforce–Braze (SEC filing), WhatsApp per-message billing with Kenya rates (parsed from Meta's official rate-card file: Rest of Africa marketing $0.0225, service/utility/auth $0.004, 4th-cheapest of 47 markets), Meta product browsing on 28 Oct (two trade outlets; no Meta page, stated in text), AI agent pricing at HubSpot, Zapier and Klaviyo, a patch table (Next.js, WordPress, n8n) with a W3Techs CMS chart, and Africa watch (Microsoft ADC as "proposed changes" with no headcount; Meta AI Academy pitchathon).
  - Shilling conversions use the CBK rate of KSh 129.81/USD (15 Oct 2026), not an assumed rate.
  - Corrected during verification: the Click-to-WhatsApp free window is "up to 7 days", not 72 hours; ratio wording changed to 10–12×.
  - Restarted the local dev server, which was still running 16.3.5 after the upgrade.
- **Verification & Status:**
  - `pnpm blog:check` 4/4 pass; `pnpm build` exit 0 on Next.js 16.4.1 (38 pages); page, charts, table and share card inspected in the browser. **The Next.js patch is not deployed** — it must ship before the post's claim "We've updated this website" is true.

### [2026-10-21 14:11:35 +03:00] — Claude Opus 5.5 / Claude Code (Blog: business-first voice, lead capture, AI-search readiness)

- **Timestamp:** 2026-10-21T14:11:35+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / Editor
- **Task / Scope:** Owner feedback: the Global Brief was too technical ("I'm trying to get paid, not teach"). Repositioned the blog as business-first content that creates value, ranks, gets cited by AI assistants and drives enquiries.
- **Files Modified / Created:**
  - `lib/blog.ts` (Updated — `takeaways` and `service` frontmatter; FAQ extraction from the "Frequently asked questions" section)
  - `components/blog/blog-post.tsx`, `components/blog/blog.module.css` (Updated — Key takeaways box; "How we can help" service card after section 2 with a WhatsApp call to action; FAQPage JSON-LD; `abstract` in BlogPosting)
  - `app/llms.txt/route.ts` (Created — plain-language site map for AI assistants: services, starting prices, case studies, posts)
  - `app/blog/[slug]/page.tsx` (Updated — removed `dynamicParams = false` so new posts appear without restarting the dev server)
  - `scripts/check-blog.mjs` (Updated — series posts require 2–4 takeaways and a valid `service`; jargon warning; Global Brief 800–1,800 words; bold-aware sentence split)
  - `content/blog/_EDITORIAL.md` (Updated — purpose statement, "Voice: business first", "Written for search and AI answers", new Global Brief structure, "Business value" rubric criterion)
  - `content/blog/whatsapp-fees-cost-kenyan-businesses.md` (Created — business-voice Global Brief, replaces `global-brief-braze-whatsapp-fees-meta-ads.md`)
  - `content/blog/kenya-smartphone-growth-business-websites.md`, `content/blog/how-much-does-a-website-cost-in-kenya.md` (Updated — takeaways, service; live post description shortened to 147 chars)
- **Key Decisions & Implementation Details:**
  - Developer-only stories (security patches, API changes) are reduced to one plain line in Quick hits.
  - Headings are written as questions with the answer in the first sentence; FAQ sections become structured data automatically.
  - During review I removed an invented motive (HubSpot "after customers worried") and an overstatement about Braze's customers.
- **Verification & Status:**
  - `pnpm blog:check` 4/4 pass (no jargon warnings on the Global Brief). `pnpm build` exit 0 (39 pages, incl. `/llms.txt`). FAQPage, abstract, takeaways and the service card verified in rendered HTML; layout checked at 1000px and 375px.

### [2026-10-21 14:23:56 +03:00] — Claude Opus 5.5 / Claude Code (Scheduled publishing, deploy & automation)

- **Timestamp:** 2026-10-21T14:23:56+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer
- **Task / Scope:** Date-based publishing so approved posts go live on schedule; approved both sample posts; deployed to production; set up the twice-weekly drafting routines.
- **Files Modified / Created:**
  - `lib/blog.ts` (Updated — `publishTime()`; production shows posts only when `draft: false` and 06:00 EAT on `date` has passed)
  - `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/series/[series]/page.tsx`, `app/sitemap.ts`, `app/blog/rss.xml/route.ts`, `app/llms.txt/route.ts` (Updated — `revalidate = 900`, replacing force-static)
  - `scripts/check-blog.mjs` (Updated — shows the scheduled go-live time)
  - `content/blog/_EDITORIAL.md` (Updated — workflow for the automated draft → PR → approve → auto-publish pipeline)
  - `content/blog/whatsapp-fees-cost-kenyan-businesses.md` (approved; live Fri 23 Oct 2026 06:00 EAT), `content/blog/kenya-smartphone-growth-business-websites.md` (approved; live Mon 26 Oct 2026 06:00 EAT)
- **Key Decisions & Implementation Details:**
  - Deploys go to `origin/master`, which is what Vercel serves. `origin/main` has unrelated history (a different site) and was deliberately left untouched.
  - ISR (15 min) instead of a deploy hook: no secrets or cron needed for posts to appear on time.
- **Verification & Status:**
  - `pnpm build` exit 0; production server confirmed both scheduled posts return 404 and are absent from `/blog` and the sitemap before their publish time, while the live post stays 200. `pnpm blog:check` 4/4.

### [2026-11-02 20:42:00 +03:00] — Claude Opus 5.5 / Claude Code (Search fixes: service pages, redirects, internal links)

- **Timestamp:** 2026-11-02T20:42:00+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** SEO / Lead Engineer
- **Task / Scope:** Search Console export (last 6 months) showed only brand-name queries (5 clicks, ~330 impressions) and three old-site URLs returning 404. Made the service pages say plainly what Malaika sells and where, expanded them, and fixed redirects and internal links.
- **Files Modified / Created:**
  - `next.config.ts` (Updated — 308 redirects: `/projects/*` → `/our-work`, `/services/digital-presence-audit` → `/services/digital-growth-strategy-analytics`)
  - `content/services.ts` (Updated — `heading`, `audience`, `pricing`, `caseStudies`, `faqs` per service; keyword-led `seoTitle`/`description`; `{from:<offering>}` price tokens and `fillPrices()`)
  - `components/services/service-page.tsx`, `components/services/service-page.module.css` (Updated — search phrase inside the H1, audience copy, starter prices from `lib/pricing.ts`, related case studies, FAQ accordion, links to the other services; Service + AggregateOffer, FAQPage and BreadcrumbList JSON-LD)
  - `app/services/[slug]/page.tsx`, `components/blog/blog-post.tsx`, `app/llms.txt/route.ts` (Updated — resolve price tokens in descriptions)
  - `components/home/home-page.tsx`, `components/home/home-page.module.css` (Updated — hero copy and the five system steps link to service pages)
  - `components/what-we-do/what-we-do-page.tsx` (Updated — footer links go to service pages instead of all pointing at `/what-we-do`)
  - `app/layout.tsx` (Updated — default title names services; `priceRange` in ProfessionalService schema)
  - `AGENTS.md` (Updated)
- **Key Decisions & Implementation Details:**
  - Prices on service pages, meta descriptions and FAQs are read from `lib/pricing.ts`, so they can't drift from `/pricing`.
  - Branding has no entry in `lib/pricing.ts`, so its page shows no price and points to a WhatsApp quote instead of an invented figure.
  - Kept the brand slogans as the large display line; the search phrase sits above it in the same H1.
  - FAQ copy only states what the repo already supports (pricing configs, case studies, the website-cost post's timelines).
- **Verification & Status:**
  - `tsc --noEmit` clean; `pnpm build` exit 0. On the dev server: redirects resolve to 200, no unresolved `{from:` tokens, JSON-LD parses, no console errors, no horizontal overflow at 375px. Not deployed or committed. Off-site steps (Google Business Profile, directory listings, client backlinks) are for the owner.

### [2026-11-02 20:58:00 +03:00] — Claude Opus 5.5 / Claude Code (Removed Polar Bison case study)

- **Timestamp:** 2026-11-02T20:58:00+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer
- **Task / Scope:** Owner asked to remove Polar Bison from the site completely.
- **Files Modified / Created:**
  - `content/case-studies/polar-bison.ts`, `assets/polarbison/` (Deleted)
  - `content/case-studies/index.ts`, `content/case-studies/types.ts` (Updated — removed the entry and the `polar` / `polar-logo` types)
  - `components/work/artwork.ts`, `components/work/case-study-page.tsx` (Updated — removed logo imports)
  - `components/home/home-page.tsx` (Updated — removed the owner's commented-out card and import)
  - `content/services.ts` (Updated — branding and growth pages now cite other case studies; branding FAQ example now uses Digitally Sly)
  - `components/work/work.module.css` (Updated — Our Work grid is 3 columns so three projects fill one row)
  - `next.config.ts` (Updated — 308 redirect `/our-work/work/polar-bison` → `/our-work`)
- **Key Decisions & Implementation Details:**
  - Redirect rather than 404, because the old URL may be indexed or linked.
  - Earlier logbook entries that mention Polar Bison were left as history. The gitignored `guidingDraft/` design drafts still mention it; they are local-only and never deployed.
- **Verification & Status:**
  - `tsc --noEmit` clean; `pnpm build` exit 0 with 3 case study pages. Home, Our Work, both affected service pages, sitemap and `llms.txt` contain no "Polar"/"Bison". Old URL redirects to `/our-work` (200). Not committed or deployed.

### [2026-11-03 10:12:05 +03:00] — Claude Opus 5.5 / Claude Code (Beads World Africa case study redesign)

- **Timestamp:** 2026-11-03T10:12:05+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / Editor
- **Task / Scope:** Rebuilt the Beads World Africa case study around real screenshots, short screen recordings and measured results, using media the owner dropped in the BWA project root.
- **Files Modified / Created:**
  - `public/work/beads-world-africa/` (Created — 7 laptop mockups; 3 silent MP4 clips with WebP posters, 2.6 MB in total)
  - `content/case-studies/types.ts`, `content/case-studies/index.ts` (Updated — optional `heroMedia`, `results`, `walkthrough`, `gallery`, `services`; `comparison` and `outcomes` now optional)
  - `content/case-studies/beads-world-africa.ts` (Updated — new hero, results, walkthrough, gallery and services; before/after and outcomes cards removed)
  - `components/work/case-media.tsx` (Created — image or clip; clips autoplay muted only while on screen and never for reduced-motion users, who get controls)
  - `components/work/case-study-page.tsx`, `components/work/work.module.css` (Updated — results strip, alternating walkthrough rows, gallery, services-used links, estimate link in the closing CTA)
  - `app/our-work/work/[slug]/page.tsx` (Updated — social image uses `heroMedia` when set)
- **Key Decisions & Implementation Details:**
  - Source videos were 2-minute, 26–30 MB H.264-in-WebM files. Cut to 10–17 s H.264 MP4s (`faststart`, no audio); the builder clip plays at 1.5×.
  - The phone recording showed a name, phone number and personal email in the checkout form (≈0:38–0:58) and the newsletter field (≈1:15–1:17, ≈1:45). Every clip was checked frame by frame; the builder clip is spliced around the footer to exclude the email.
  - Results only use verifiable figures: Search Console position (#1.0 “tigers eye bracelet”, 1.6 “tiger eye bracelet”, 13 Sep–30 Oct), 28 stones shown in the builder, and the site's own “no account or password” copy. Sources are printed under the figures. Order or enquiry numbers can be added to `results` when the owner shares them.
  - The other case studies render exactly as before.
- **Verification & Status:**
  - `tsc --noEmit` clean; `pnpm build` exit 0. On the dev server at desktop width and 375px: no horizontal overflow, clips play only while visible and pause off-screen, social image and description verified. Not committed or deployed.

### [2026-11-03 15:05:00 +03:00] — Claude Opus 5.5 / Claude Code (BWA case study: durable claims, automation flow, design pass)

- **Timestamp:** 2026-11-03T15:05:00+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / Editor
- **Task / Scope:** Owner feedback: figures needing daily upkeep had to go, the page needed a stronger design, and the WhatsApp/automation work wasn't visible.
- **Files Modified / Created:**
  - `content/case-studies/types.ts` (Updated — optional `automation` section, media `caption`, `results.source` optional)
  - `content/case-studies/beads-world-africa.ts` (Updated — highlights without numbers; 5-step "What happens after order" flow; shorter gallery captions; "Also in the build" cards trimmed to 6)
  - `components/work/case-study-page.tsx`, `components/work/work.module.css` (Updated — dark automation band with an animated flow line (vertical below 1100px, static for reduced motion); hero mockup on a yellow panel; highlight cards; coloured stages for the clips; bento gallery with caption chips)
  - `public/work/beads-world-africa/find-your-bracelet.mp4` and poster (Updated — cropped to the laptop lid so no grey backdrop shows)
- **Key Decisions & Implementation Details:**
  - Removed figures that drift: the Google position, the stone count and "four questions".
  - The automation steps were checked against the BWA codebase:
    - orders and customers are saved to the store database;
    - the WhatsApp message is prefilled;
    - a Brevo order-alert email with a "WhatsApp the customer" button goes to the team;
    - entries are queued to the main CRM (`crm_sync_outbox`);
    - newsletter sign-ups go to a Brevo list;
    - builder designs are saved as leads (`design_leads`).
  - WhatsApp broadcasts are credited to Malaika's own internal WhatsApp tool, as the owner confirmed. AI is not mentioned, because the store has none and its use in the WhatsApp tool for BWA is unconfirmed.
- **Verification & Status:**
  - `tsc --noEmit` is clean and `pnpm build` passes.
  - Checked at 1024px, 1440px and 375px with no horizontal overflow; all three case study pages return 200.
  - Not committed or deployed.

### [2026-11-03 16:10:00 +03:00] — Claude Opus 5.5 / Claude Code (Neighborhood Cocktails case study, IndexNow automation)

- **Timestamp:** 2026-11-03T16:10:00+03:00
- **Model / Assistant:** Claude Opus 5.5 (Claude Code)
- **Role:** Lead Engineer / Editor
- **Task / Scope:** Rebuilt the Neighborhood Cocktails case study in the BWA format from the owner's recordings, removed leftovers, and made IndexNow submissions automatic.
- **Files Modified / Created:**
  - `public/work/neighborhood-cocktails/` (Created — 4 laptop mockups; 3 silent MP4 clips with posters, 3.2 MB)
  - `content/case-studies/neighborhood-cocktails.ts` (Rewritten — highlights, walkthrough, "What happens after Book" flow, gallery, services, trimmed system cards; no figures that need upkeep)
  - `content/case-studies/types.ts`, `components/work/case-study-page.tsx` (Updated — removed unused comparison image keys)
  - `assets/beads-world/beads-world-africa-landing.webp`, `assets/beads-world/beads-world-africa-shop.png`, `assets/work-after.svg` (Deleted — unreferenced)
  - `scripts/submit-indexnow.mjs` (Updated — reads the key from `public/`, checks it is live, `--today` and `--dry-run`)
  - `.github/workflows/indexnow.yml` (Rewritten — runs after Vercel Production deploys and daily at 06:30 EAT; replaces a copy from the BWA repo that targeted `main` and called Python scripts that don't exist here)
  - `public/e49946c5e9994414b37d8d67660e24de.txt` (Added — IndexNow key)
  - `ANALYTICS_SEO_SETUP.md`, `content/blog/_README.md`, `content/blog/_EDITORIAL.md` (Updated — IndexNow is automatic)
  - `.gitignore` (Updated — `recordingOfwork` raw recordings)
- **Key Decisions & Implementation Details:**
  - Automation steps checked against the NC codebase:
    - `app/api/booking/route.js`: team email, client confirmation, Brevo list contact, and a Meta Conversions lead that requires consent.
    - `app/api/feedback/route.js`: promoter and critique lists, a thank-you email and a critical-feedback alert.
    - Sanity CMS handles content editing.
  - The "Top five" ranking claim was removed because it needs regular upkeep.
  - Clips were checked frame by frame. The booking form only appears empty, with placeholders.
- **Verification & Status:** `tsc --noEmit` clean; `pnpm build` exit 0. NC page checked at 1440px and 375px (no overflow, no console errors); Digitally Sly and BWA unaffected.
