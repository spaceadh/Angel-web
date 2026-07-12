# Malaika Studios v2 SEO and AI Search Strategy

Status date: 2026-07-12

## Executive Score

Current truthful score: **56/100**

This is lower than the first-pass score of 60/100 because the second audit included AI-search readiness, public crawl controls, and competitor/answer-engine visibility. The website has a strong brand foundation and static rendering, but it is not yet built as a search acquisition system.

Projected score after priority fixes:

- Technical SEO foundation only: **70-74/100**
- Technical foundation plus expanded service/case content: **80-86/100**
- Full SEO plus AI-search authority, local proof, Search Console, Bing Webmaster Tools, Google Business Profile, third-party mentions, and review signals: **88+/100**

## Audit Evidence From The Current Codebase

Audited app: `MalaikaWebsite-v2`

Build and rendering:

- `pnpm build` passed on 2026-07-12.
- Homepage is static.
- Dynamic project pages are statically generated through `generateStaticParams`.
- First-load JS reported by Next build: **106 kB** for homepage and project pages.
- Public project routes generated: 7 case-study pages.

Rendered SEO checks from local production server:

| URL | Status | Visible words | Title | Canonical | JSON-LD | OG image |
| --- | ---: | ---: | --- | --- | --- | --- |
| `/` | 200 | 465 | Present | `/` | Missing | Missing |
| `/projects/bewama` | 200 | 221 | Present | `/projects/bewama` | Missing | Missing |
| `/projects/somafix-kenya` | 200 | 197 | Present | `/projects/somafix-kenya` | Missing | Missing |
| `/projects/kumbusha` | 200 | 193 | Present | `/projects/kumbusha` | Missing | Missing |
| `/projects/tena-crm` | 200 | 194 | Present | `/projects/tena-crm` | Missing | Missing |
| `/projects/ibiza-platform` | 200 | 177 | Present | `/projects/ibiza-platform` | Missing | Missing |
| `/projects/kairi-tours-concept` | 200 | 207 | Present | `/projects/kairi-tours-concept` | Missing | Missing |
| `/projects/roja-consultancy-concept` | 200 | 208 | Present | `/projects/roja-consultancy-concept` | Missing | Missing |
| `/robots.txt` | 404 | 15 | Not found page | `/` | Missing | Missing |
| `/sitemap.xml` | 404 | 15 | Not found page | `/` | Missing | Missing |

Technical findings:

- `robots.txt` is missing.
- `sitemap.xml` is missing.
- Canonical URLs are relative, not absolute.
- No page has structured data.
- No page has an Open Graph or Twitter image.
- Case-study content is thin for organic discovery.
- The homepage H1 is strong brand copy but weak category copy: `Made to be noticed. Built to be chosen.`
- Next build warns repeatedly about raw `<img>` usage, which can increase LCP and bandwidth.
- Largest local image is approximately **1.1 MB**: `public/work/projects/kumbusha/landing-page.png`.
- Public assets total approximately **6.9 MB**.
- Public test page exists and should not be crawlable: `public/brand/exploration/transparent-wing-check.html`.
- `patrick.html` is currently deleted in the worktree before this strategy was created; this audit did not touch it.

## Search Reality In 2026

### Google AI Overviews and AI Mode

Google's current Search Central guidance says AI Overviews and AI Mode do not require a separate AI-specific optimization layer. Pages must be eligible for normal Google Search, crawlable, indexable, and eligible to show a snippet. Google also says useful AI-search preparation still means foundational SEO: crawl access, internal links, page experience, textual content, high-quality images/videos, structured data that matches visible content, and up-to-date Business Profile information.

Implication for Malaika Studios:

The missing sitemap, missing robots file, thin textual content, missing structured data, and weak local/business profile signals directly limit both normal Search and AI Overview eligibility.

### ChatGPT Search

OpenAI documents `OAI-SearchBot` as the crawler used to surface websites in ChatGPT search features. Sites that opt out of `OAI-SearchBot` will not be shown in ChatGPT search answers, though they can still appear as navigational links. OpenAI also separates `OAI-SearchBot` from `GPTBot`, meaning a site can allow search visibility while disallowing model-training use.

Implication for Malaika Studios:

The future `robots.txt` should explicitly allow `OAI-SearchBot` for ChatGPT search visibility. If the business wants to avoid training use, it can disallow `GPTBot` separately while keeping `OAI-SearchBot` allowed.

### Bing, Copilot, And AI Citation Tracking

Bing Webmaster Tools has moved toward AI visibility reporting through AI Performance-style citation reporting. Even where tools are still evolving, Bing/Copilot visibility depends on crawlability, indexability, sitemaps, strong content structure, and citation-worthy facts.

Implication for Malaika Studios:

Submit the sitemap to Bing Webmaster Tools after launch, use IndexNow if practical, and track whether Malaika appears for prompts such as "best website design studio for Kenyan SMEs", "website redesign agency Nairobi", and "digital presence audit Kenya".

### AI Search Ranking Pattern

Current research and market observation point to a consistent pattern:

- AI answers prefer pages that are easy to extract from.
- Strong pages use clear definitions, comparisons, numbered processes, facts, proof, and direct answers.
- Earned media and third-party validation matter because AI systems often cite sources beyond the brand's own website.
- AI systems are sensitive to wording, freshness, authority, and entity clarity.

Implication for Malaika Studios:

The site cannot rely only on beautiful portfolio pages. It needs answer-ready pages that define what Malaika does, who it serves, where it operates, how the method works, what packages include, what outcomes are realistic, and what proof exists.

## Competitive Pattern

Observed competitor examples:

- Dotsavvy positions itself as an award-winning digital marketing agency in Kenya and Africa, states that it is Kenya's first digital business agency, lists a broad service catalog, shows Nairobi contact details, and claims 1000 finished projects.
- Quest Website Developers uses very search-explicit positioning: "Kenya's AI, Web & Mobile agency", "Kenya's web developers for the AI era", 500+ websites shipped, M-Pesa/AI/custom software claims, services, pricing tiers, process, industries, locations, testimonials, reviews, and case-study result claims.

What they do better than the current Malaika site:

- Clear service keywords in visible headings.
- Location and service-area content.
- Pricing/tiers or commercial starting points.
- Industry pages or industry sections.
- Review/testimonial proof.
- More visible service depth.
- More machine-extractable facts.
- More conversion paths beyond email.
- Published pricing or starting-price anchors that can match high-intent cost searches.

What Malaika can do differently:

- Avoid generic agency bulk.
- Own the sharper category: **client magnet studio for visibility-ready founders**.
- Use editorial quality and proof-backed case studies instead of inflated claims.
- Connect website design to client acquisition, inquiry conversion, and follow-up readiness.

## Target Position

Primary SEO positioning:

**Malaika Studios is a Nairobi-based client magnet studio helping Kenyan and African SMEs improve website design, digital presence, brand clarity, inquiry journeys, and follow-up-ready customer systems.**

Primary commercial search clusters:

1. Website design Kenya
2. Website design Nairobi
3. Website redesign Kenya
4. Digital presence audit Kenya
5. Website audit Kenya
6. Small business website Kenya
7. SME website design Kenya
8. Brand and website strategy Kenya
9. Landing page design Kenya
10. Client acquisition website Kenya
11. B2B website design Kenya
12. E-commerce product catalogue website Kenya
13. Professional services website Kenya
14. Construction company website Kenya
15. Hospitality website design Kenya
16. Website design prices Nairobi
17. Website design cost Kenya
18. Website packages Kenya
19. How much does a website cost in Kenya?
20. SME website redesign cost Nairobi

AI-search prompt targets:

- Who are the best website design studios in Kenya for SMEs?
- Which Nairobi studio helps businesses improve digital presence?
- Who can redesign a business website in Kenya to improve inquiries?
- What is a digital presence audit and who offers it in Kenya?
- Which agency builds websites connected to WhatsApp inquiries and follow-up?
- What should a Kenyan SME website include to attract customers?
- How much should a serious business website in Kenya include beyond design?
- How much does a professional business website cost in Nairobi?
- What should a Kenyan SME budget for a website redesign?

## Pricing SEO Strategy

Recommendation: **Publish clear starting prices while protecting the brand from cheap-website positioning.**

Pricing content can improve search visibility because cost queries usually show strong buyer intent. Someone searching "website design prices Nairobi", "website design cost Kenya", or "how much does a website cost in Kenya" is often closer to buying than someone searching broad inspiration terms. Competitors already use pricing as an SEO and conversion device; Quest publishes project tiers with starting prices, which gives Google and AI systems concrete facts to extract.

The risk is that visible prices can also reduce Malaika Studios to a commodity if presented carelessly. The brand should not compete as "cheap website design Kenya". Malaika should capture low-end searches through a limited `Digital Presence Check` and `Client Magnet Starter Page`, then clearly separate those from full websites and connected client-magnet systems.

### Pricing Page Positioning

Recommended page: `/pricing`

Recommended H1:

**Website design prices in Nairobi for businesses that need more than a basic site**

Recommended opening answer:

**A serious business website in Nairobi can range from a focused landing page to a full client-magnet system. Malaika Studios prices depend on strategy depth, page count, content work, integrations, SEO foundations, and follow-up readiness.**

This lets the page rank for cost intent without promising one fixed price before scope is understood.

### Suggested Price Architecture

Use fixed prices for small diagnostic packages and "from" prices for build packages. Do not pretend every full website fits a fixed package.

| Offer | Suggested public framing | SEO intent captured |
| --- | --- | --- |
| Digital Presence Check | KES 15,000 | website audit cost Kenya, digital presence audit Kenya, cheap website review Kenya |
| Website Refresh Audit | KES 25,000 | website redesign audit Kenya, website refresh Nairobi |
| Client Magnet Starter Page | From KES 45,000 | landing page design cost Kenya, starter website Nairobi |
| Business Website Refresh | From KES 85,000 | website redesign cost Kenya, website refresh Nairobi |
| Full Business Website | From KES 120,000 | business website cost Kenya, website design prices Nairobi |
| E-commerce / Product Catalogue | From KES 150,000 | ecommerce website cost Kenya, product catalogue website Kenya |
| Full Client Magnet Website | From KES 180,000 | client acquisition website Kenya, high quality website design Nairobi |
| Website + Follow-Up System | From KES 250,000 | website with WhatsApp automation Kenya, email marketing website Kenya, inquiry follow-up system |

Payment terms:

- Small packages: 70% upfront, 30% on delivery.
- Website builds: 50% deposit, 40% design/build milestone, 10% before launch.
- Large systems: milestone-based payment plan agreed before work begins.

### Pricing Content That Should Be On The Page

The page should answer:

- How much does a business website cost in Nairobi?
- Why are some websites cheap and others expensive?
- What affects website pricing in Kenya?
- What is included in a Malaika Studios website?
- What is not included by default?
- How long does a website project take?
- Do we offer payment milestones?
- Is hosting/domain/email included?
- Does the website include SEO?
- Does the website include WhatsApp, forms, booking, or CRM follow-up?
- Can an existing website be improved instead of rebuilt?

### Brand-Safe Pricing Rules

- Use "starting from" or "typical range", not rigid menu pricing.
- Anchor around outcomes: clarity, trust, inquiries, follow-up, retention.
- Do not lead with discounts.
- Avoid "affordable website design" as a main phrase; use it only in an FAQ if needed.
- Do not use bargain-market wording like "cheap", "low cost", or "budget website" unless explaining why Malaika is not the right fit for those searches.
- Include a "not for everyone" qualifier: Malaika is for businesses that already have value and need their presence to reflect it.
- Make the CTA consultative: "Get a fit-and-scope estimate" instead of "Buy now".

### Pricing Schema

If pricing is published, use `Service` schema with `offers` only when the displayed price/range is real and visible on the page. Do not add hidden pricing schema that users cannot see.

### SEO Value

Adding a pricing page should raise the projected score because it creates a high-intent commercial landing page and gives AI systems concrete extractable answers.

Updated projected score with a well-written pricing page:

- Technical foundation plus pricing page: **74-78/100**
- Technical foundation plus pricing, service pages, and expanded case studies: **82-88/100**
- Full SEO plus local trust, reviews, third-party mentions, AI-search tracking, and pricing proof: **90/100 potential**

## Required Site Structure

Add or strengthen these crawlable pages:

1. `/`
   - Keep as the brand homepage, but make the category unmistakable.
   - Add a visible sentence near the top: "Website design, digital presence audits, and client magnet systems for growing Kenyan businesses."

2. `/services`
   - Overview of all services.
   - Internally link to all service pages.

3. `/services/website-design-kenya`
   - Main money page.
   - Explain website design, website redesign, inquiry paths, mobile, SEO foundations, WhatsApp/form conversion, and follow-up readiness.

4. `/services/digital-presence-audit`
   - Explain what the audit covers: website, search, social proof, messaging, inquiry path, trust signals, follow-up.

5. `/services/client-magnet-system`
   - Define the Attract, Convert, Retain model.
   - Explain how Malaika Studios builds the face while Rotsi builds the engine.

6. `/pricing`
   - Capture "website prices Nairobi/Kenya" searches.
   - Use ranges or starting prices only after business confirmation.
   - Explain what changes price and what a serious website should include.

7. `/work`
   - Portfolio index with filters: commissioned work, Rotsi products, studio concepts.

8. Expanded `/projects/[slug]`
   - Each case study should become a real story, not a short visual page.
   - Target 600-1,000 words for strong cases.

9. `/about`
   - Entity clarity: Malaika Studios by Rotsi, Nairobi, Kenya, relationship to Rotsi Labs, ideal customers, values.

10. `/contact`
   - Email, WhatsApp/phone if available, location/service area, response expectations.

11. `/insights`
   - Optional but valuable once core pages are done.
   - Publish practical, local, answer-ready content.

## Content Standards

Every important service/case page should include:

- One clear H1 with service and/or market intent.
- A short direct answer paragraph in the first 100 words.
- Who the service is for.
- Problems it solves.
- What is included.
- Process.
- Proof.
- Realistic outcomes.
- FAQs.
- Clear CTA.
- Internal links to related service and case-study pages.

Avoid:

- Unsupported metrics.
- Generic AI-style listicles.
- Vague claims like "world-class digital solutions" without proof.
- Overcrowding the brand with every possible service.
- Publishing concept work as if it was commissioned.

## Structured Data Plan

Add JSON-LD that matches visible page content:

- Homepage: `Organization`, `ProfessionalService`, `WebSite`.
- Service pages: `Service`, `FAQPage`, `BreadcrumbList`.
- Case studies: `CreativeWork`, `BreadcrumbList`.
- Contact page: `LocalBusiness` or `ProfessionalService`, with real contact and service-area details.

Do not add fake ratings, fake reviews, or unsupported aggregate scores.

## Robots And AI Crawler Policy

Recommended default:

```txt
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Disallow: /

Sitemap: https://malaikastudiosrotsi..co.ke/sitemap.xml
```

Rationale:

- Allow normal search crawling.
- Allow ChatGPT search visibility through `OAI-SearchBot`.
- Allow user-initiated ChatGPT browsing.
- Disallow training crawler if the business wants search visibility without training permission.
- Final policy should be confirmed by the business owner before launch.

## What Should Be Stripped Or Blocked

Strip from public production:

- `public/brand/exploration/transparent-wing-check.html`
- Public exploration HTML/test files.
- Public-only logo exploration assets that are not used by the site.
- Old one-off prototype pages that are unrelated to Malaika Studios.
- Unsupported proof claims unless the source report is archived and can be referenced.

Keep if useful but do not index:

- Internal design explorations.
- Screenshot QA files.
- Prototype references.

## Measurement Plan

Set up:

- Google Search Console.
- Bing Webmaster Tools.
- Google Analytics or privacy-friendly analytics.
- Google Business Profile if Malaika will compete locally.
- Bing Places if appropriate.

Track:

- Indexed pages.
- Sitemap coverage.
- Brand query impressions.
- Non-brand service query impressions.
- Click-through rate by page.
- Queries triggering homepage vs service pages.
- AI-search citation checks in ChatGPT, Perplexity, Gemini, and Copilot.
- Leads from organic search.
- Contact CTA conversion.

Monthly AI visibility prompts:

- "Best website design studio for Kenyan SMEs"
- "Nairobi website redesign agency"
- "Digital presence audit Kenya"
- "Client acquisition website design Kenya"
- "Who helps Kenyan businesses improve online presence?"

Record:

- Whether Malaika appears.
- Whether competitors appear.
- Which pages are cited.
- Which proof points are reused.
- Whether the answer correctly explains Malaika Studios by Rotsi.

## Updated Execution Plan

### Phase 1: Crawl And Index Foundation

- Add `robots.txt`.
- Add `sitemap.xml`.
- Add absolute canonical URLs.
- Add metadata base URL.
- Add OG/Twitter image.
- Remove or block public test pages.
- Submit sitemap to Google Search Console and Bing Webmaster Tools.

### Phase 2: Entity And Local Trust

- Create/strengthen About and Contact pages.
- Add clear Nairobi/Kenya service-area language.
- Add real phone/WhatsApp if available.
- Add Organization/ProfessionalService schema.
- Add same-as links when official social profiles exist.
- Create or update Google Business Profile.

### Phase 3: Money Pages

- Build service pages for website design, digital presence audits, and client magnet systems.
- Add a pricing page for website design prices in Nairobi/Kenya, using confirmed ranges or starting prices.
- Make each page answer-ready and commercially useful.
- Add FAQs based on real buyer objections.
- Link service pages from homepage, footer, and relevant case studies.

### Phase 4: Case Study Depth

- Expand Somafix, Bewama, Kumbusha, Tena, and IBIZA into proof-backed case studies.
- Keep concept projects clearly labelled.
- Remove unsupported metrics or attach source proof.
- Add before/after context where available.

### Phase 5: AI Search And Authority

- Publish answer-ready insights.
- Create third-party profiles and references where appropriate: LinkedIn, Google Business Profile, Clutch/GoodFirms only if maintained honestly.
- Encourage real client reviews.
- Seek credible mentions from Kenyan business, SME, tech, design, and founder communities.
- Run monthly prompt tracking across ChatGPT, Gemini, Copilot, and Perplexity.

## Source Notes

- Google Search Central, "AI features and your website", last updated 2025-12-10: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, "SEO Starter Guide": https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- OpenAI crawler documentation: https://developers.openai.com/api/docs/bots
- Dotsavvy homepage, competitor positioning and service catalog: https://www.dotsavvyafrica.com/
- Quest Website Developers homepage, competitor positioning, services, pricing, proof, and local/service-area structure: https://www.questdesigners.com/
