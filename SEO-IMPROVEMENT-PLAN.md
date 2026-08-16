# Malaika Studios - SEO Improvement Plan

## 1. Current State & Technical SEO

After reviewing the current codebase for `MalaikaWebsite-v2`, here is the state of your technical SEO foundation:
- **`robots.txt`**: This is already handled correctly. Next.js dynamically generates the `robots.txt` file via the existing `app/robots.ts` file. It successfully allows normal search crawling and specifically allows `OAI-SearchBot` for ChatGPT search visibility, while disallowing `GPTBot` (training).
- **`sitemap.xml`**: Similarly, this is handled dynamically via `app/sitemap.ts`. It successfully maps your static routes, services, and projects.

To expand your reach, **two new service pages** have been added to the application to capture specific commercial search clusters outlined in the SEO strategy:
- `Website Redesign in Kenya`
- `E-Commerce & Product Catalogues`

---

## 2. Action Plan to Boost SEO Significantly

To move the website from a foundational SEO score (~74/100) to an elite, highly-visible search engine asset (90+/100), the following steps should be prioritized:

### A. Performance Optimization (Core Web Vitals)
- **Fix Raw `<img>` Usage**: The application currently has Next.js build warnings about raw `<img>` tags. Replace all raw `<img>` tags with Next.js `<Image />` components to ensure proper compression, modern formats (WebP/AVIF), and lazy loading. This significantly improves Largest Contentful Paint (LCP) and mobile page speed scores.
- **Asset Optimization**: Some local image assets are very large (e.g., `landing-page.png` is ~1.1MB). Compress these assets before serving them or ensure the Next.js image optimization pipeline is correctly sizing them for different viewports.

### B. Content Depth & "Answer-Engine" Readiness
- **Deep-Dive Case Studies**: Search engines (and AI models like ChatGPT) favor rich, extractable content. Expand the current project pages (Somafix, Bewama, Kumbusha) into 600-1000 word case studies. Include concrete details: the client's problem, the exact Malaika Studios process, and measurable outcomes.
- **Insights & Blog Articles**: Create an `/insights` section targeting long-tail informational keywords. Write answer-ready content such as *"How much does a website redesign cost in Nairobi in 2026?"* or *"Why your Kenyan SME needs a client magnet system"*.

### C. Local SEO & Entity Trust
- **Google Business Profile (GBP)**: Ensure Malaika Studios has a verified, completely filled-out Google Business Profile with the Nairobi location. Keep operating hours, services, and contact information up-to-date.
- **Client Reviews**: Actively encourage satisfied clients to leave reviews on your Google Business Profile. Reviews are a massive ranking factor for local searches like *"website design agency Nairobi"*.
- **Bing Places**: Mirror your Google Business Profile setup on Bing Places to capture Copilot and Bing Search traffic.

### D. Structured Data (Schema Markup)
- While some JSON-LD has been added, ensure that `FAQPage` schema is strictly implemented on all service pages (including the newly added ones). 
- Implement `CreativeWork` schema comprehensively on the expanded case studies.
- Ensure the `LocalBusiness` schema on the contact page perfectly matches the NAP (Name, Address, Phone Number) used on your Google Business Profile.

### E. Off-Page SEO & Backlinks
- **Digital PR**: Get featured in Kenyan business directories, SME roundups, and tech/design blogs. 
- **Portfolio Links**: Where permissible by the client, include a subtle, high-quality backlink in the footer of the sites you build (e.g., *"Digital Presence by Malaika Studios"* linking to the homepage).
