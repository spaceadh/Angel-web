# Production analytics and search setup

1. Create a Malaika-owned GA4 property, Meta Business Manager/Dataset, Google Search Console property, and Bing Webmaster Tools property. Grant at least two Malaika team members administrative access.
2. Add the GA4 measurement ID (`G-MYY8S3XWWE`), Meta Pixel ID, and Meta Conversions API token to the host using the names in `.env.example`. Never expose the CAPI token as a `NEXT_PUBLIC_` variable.
3. In Meta Events Manager, verify `malaikastudios.rotsi.co.ke`, test a WhatsApp CTA after accepting analytics, and confirm the browser `Contact` and server `Contact` events share the same event ID. Configure that Contact event as the Aggregated Event Measurement priority.
4. Verify the domain in Search Console and Bing Webmaster Tools, then submit `https://malaikastudios.rotsi.co.ke/sitemap.xml` in both tools.
5. Generate an IndexNow key in Bing Webmaster Tools. Set `INDEXNOW_KEY`, add a production file named `<INDEXNOW_KEY>.txt` at the site root containing only that key, then run `pnpm indexnow:submit` after deploys that change public URLs. This script submits canonical URLs taken directly from the live sitemap.
6. In GA4 Admin, mark `generate_lead` as the primary key event and `email_click` as a secondary key event. Register `cta_placement`, `lead_channel`, `page_type`, `service_slug`, and `case_study_slug` as event-scoped custom dimensions. Build reporting around WhatsApp starts, organic landing pages, search impressions/clicks, and Meta cost per WhatsApp start.
7. Link the GA4 property to Search Console, exclude internal Malaika traffic, and build a Looker Studio view for organic sessions, engaged sessions, WhatsApp starts, conversion rate, and high-performing landing pages. GA page views are sent explicitly after consent (including client-side route changes), so do not add a second pasted `gtag.js` snippet.

All analytics and Meta code remains inactive until a visitor explicitly accepts optional analytics from the consent notice.
