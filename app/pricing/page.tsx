import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import SiteFooter from "../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, routeMeta, siteUrl } from "../seoConfig";

export const metadata: Metadata = {
  title: routeMeta.pricing.title,
  description: routeMeta.pricing.description,
  alternates: { canonical: absoluteUrl(routeMeta.pricing.path) },
  openGraph: {
    title: routeMeta.pricing.title,
    description: routeMeta.pricing.description,
    url: absoluteUrl(routeMeta.pricing.path),
  },
};

const priceBands = [
  {
    name: "Digital Presence Check",
    price: "KES 15,000",
    numericPrice: 15000,
    range: "Small package",
    summary: "A focused review of your website, search presence, social proof, customer journey, and inquiry path.",
    bestFor: "Budget-conscious founders who need to know what is wrong before spending more.",
    includes: ["Website/search/social review", "Homepage clarity check", "Inquiry path review", "SEO basics check", "Short action report"],
  },
  {
    name: "Website Refresh Audit",
    price: "KES 25,000",
    numericPrice: 25000,
    range: "Small package",
    summary: "A deeper audit for existing websites that need a serious fix plan before redesign or marketing.",
    bestFor: "Businesses with a site that looks outdated, unclear, slow, or weak on inquiries.",
    includes: ["Full website audit", "SEO and content review", "Trust/proof review", "Mobile review", "Prioritized fix plan"],
  },
  {
    name: "Client Magnet Starter Page",
    price: "From KES 45,000",
    numericPrice: 45000,
    range: "Starter build",
    summary: "One polished page built to explain your offer clearly and guide visitors to WhatsApp, email, booking, or a form.",
    bestFor: "Lean founders, campaigns, launches, and service offers that need one strong action path.",
    includes: ["1-page website or landing page", "Responsive design", "Copy cleanup", "WhatsApp/email CTA", "Contact form", "Basic SEO", "Analytics setup", "Launch support"],
  },
  {
    name: "Business Website Refresh",
    price: "From KES 85,000",
    numericPrice: 85000,
    range: "Refresh build",
    summary: "A sharper version of your current website with stronger structure, copy, design, SEO foundations, and inquiry paths.",
    bestFor: "Growing SMEs with real proof and an existing presence that no longer reflects the business.",
    includes: ["4-7 page refresh", "Homepage/service/contact pages", "Copy restructuring", "Responsive design", "Image optimization", "Basic schema", "SEO metadata", "Analytics"],
  },
  {
    name: "Full Business Website",
    price: "From KES 120,000",
    numericPrice: 120000,
    range: "Full website",
    summary: "A complete multi-page business website with service pages, inquiry paths, social links, email capture, SEO setup, and launch support.",
    bestFor: "Serious SMEs that need a proper business website, not only a digital brochure.",
    includes: ["5-10 pages", "Content structure", "Custom design direction", "Service pages", "Contact/inquiry paths", "Social media integration", "Email capture", "SEO foundations", "Schema", "Analytics"],
  },
  {
    name: "E-commerce / Product Catalogue",
    price: "From KES 150,000",
    numericPrice: 150000,
    range: "Product build",
    summary: "Product or catalogue websites with product structure, quote or checkout flow, payment support where scoped, and SEO foundations.",
    bestFor: "Product-based businesses that need catalogue, quote, checkout, or M-Pesa/payment support.",
    includes: ["Product/catalogue structure", "Product pages", "Quote or cart flow", "Payment/M-Pesa support where scoped", "Customer inquiry path", "Analytics", "SEO foundations"],
  },
  {
    name: "Full Client Magnet Website",
    price: "From KES 180,000",
    numericPrice: 180000,
    range: "Strategic website",
    summary: "Strategy, copy direction, custom page structure, proof sections, SEO foundations, email marketing readiness, and conversion flow.",
    bestFor: "Businesses that need the website to actively support trust, inquiries, and growth.",
    includes: ["Strategy and copy direction", "7-12 pages", "Service/pricing/proof pages", "Social media integration", "Lead capture", "Email marketing readiness", "Advanced SEO foundations", "Schema", "Conversion flow"],
  },
  {
    name: "Website + Follow-Up System",
    price: "From KES 250,000",
    numericPrice: 250000,
    range: "Connected system",
    summary: "A website connected to CRM/contact capture, WhatsApp flows, email marketing, booking, lead routing, and automation planning with Rotsi.",
    bestFor: "Teams that lose opportunities after the first inquiry or need follow-up built into the journey.",
    includes: ["Website plus CRM/contact capture", "WhatsApp flow", "Forms or booking", "Lead routing", "Email marketing setup where scoped", "Automation planning", "Reporting handoff"],
  },
];

const operationalExtras = [
  "DNS guidance or DNS management",
  "Domain connection",
  "Hosting setup guidance",
  "SSL setup/check",
  "Business email setup guidance",
  "Contact form routing",
  "WhatsApp click-to-chat setup",
  "Social media links/feed integration where useful",
  "Email capture/newsletter form",
  "Email marketing platform connection where scoped",
  "Google Analytics",
  "Google Search Console",
  "Sitemap and robots setup",
  "Basic schema/structured data",
  "Image optimization",
  "Launch QA",
  "Handover notes",
  "Post-launch support",
];

const addOns = [
  ["Extra page after agreed scope", "KES 8,000-15,000/page"],
  ["Copywriting/content cleanup", "From KES 20,000"],
  ["SEO setup upgrade", "From KES 25,000"],
  ["Google Business Profile setup", "KES 10,000"],
  ["Monthly website care", "From KES 7,500/mo"],
  ["Monthly SEO/content support", "From KES 25,000/mo"],
  ["WhatsApp/contact flow setup", "From KES 15,000"],
  ["M-Pesa/payment integration", "From KES 25,000"],
  ["Business email account setup", "From KES 5,000"],
  ["Domain/hosting procurement support", "From KES 5,000"],
];

const paymentTerms = [
  ["Small packages", "70% upfront, 30% on delivery"],
  ["Website builds", "50% deposit, 40% design/build milestone, 10% before launch"],
  ["Large systems", "Milestone-based payment plan agreed before work begins"],
];

const pricingFaqs = [
  {
    question: "How much does a professional business website cost in Nairobi?",
    answer:
      "Malaika Studios website work starts with a Digital Presence Check at KES 15,000. A focused starter page starts from KES 45,000, full business websites start from KES 120,000, and connected client magnet systems start from KES 250,000.",
  },
  {
    question: "Can I start small before paying for a full website?",
    answer:
      "Yes. The Digital Presence Check and Website Refresh Audit exist for founders who need quick feedback before committing to a full website build.",
  },
  {
    question: "Can an existing website be improved instead of rebuilt?",
    answer:
      "Yes. If the structure is usable, a refresh can improve copy, proof, design, page speed, SEO foundations, and inquiry flow without rebuilding everything.",
  },
  {
    question: "Does website pricing include SEO?",
    answer:
      "Every website project should include SEO foundations such as crawlable pages, titles, descriptions, headings, internal links, image handling, and useful text. Ongoing content and ranking work can be scoped separately.",
  },
  {
    question: "Can the website connect to social media, email marketing, and automations?",
    answer:
      "Yes. Social media integration, email capture, email marketing readiness, WhatsApp flows, CRM/contact capture, and automation planning can be included depending on the package and scope.",
  },
];

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/pricing#website-pricing`,
    name: "Website design pricing in Nairobi and Kenya",
    description: routeMeta.pricing.description,
    areaServed: ["Nairobi", "Kenya", "East Africa"],
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Malaika Studios website packages",
      itemListElement: priceBands.map((band) => ({
        "@type": "Offer",
        name: band.name,
        price: band.numericPrice,
        priceCurrency: "KES",
        description: band.summary,
      })),
    },
  };

  return (
    <main className="seo-page">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Pricing navigation">
          <Link href="/services">Services</Link>
          <Link href="/#work">Work</Link>
          <a href="mailto:hello@malaikastudios.co.ke">Request a fit estimate ↗</a>
        </nav>
      </header>

      <section className="seo-hero seo-hero--split">
        <p className="eyebrow">Website design prices in Nairobi</p>
        <div>
          <h1>What should a serious business website cost?</h1>
          <p>
            Website prices in Nairobi vary because not every website is solving the same business problem. Some
            businesses need a clean starter page. Others need a full client magnet system with proof, SEO, social
            integrations, email capture, automation, and follow-up.
          </p>
        </div>
      </section>

      <section className="pricing-note">
        <p>
          These are practical starting points. Final pricing depends on page count, content readiness, design depth,
          integrations, SEO, social media connections, email marketing, automation, and whether the website needs to
          connect into a wider client journey.
        </p>
      </section>

      <section className="pricing-grid" aria-label="Website pricing scope bands">
        {priceBands.map((band, index) => (
          <article key={band.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>{band.range}</small>
            <h2>{band.name}</h2>
            <p className="pricing-price">{band.price}</p>
            <p>{band.summary}</p>
            <strong>{band.bestFor}</strong>
            <ul className="pricing-list">
              {band.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="seo-proof">
        <div>
          <p className="eyebrow">The practical things</p>
          <h2>A website does not only need design. It needs to be connected, trackable, secure, findable, and easy to contact from.</h2>
        </div>
        <ul>{operationalExtras.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="seo-columns">
        <article>
          <p className="eyebrow">What affects price</p>
          <ul>
            <li>Whether the project is a new website, redesign, landing page, or audit.</li>
            <li>How much copywriting, content structure, and proof gathering is needed.</li>
            <li>Page count, visual depth, imagery, case-study needs, and responsive states.</li>
            <li>SEO foundations, schema, performance work, and launch handover.</li>
            <li>Integrations such as social media, email marketing, WhatsApp, forms, booking, CRM, or follow-up automation.</li>
          </ul>
        </article>
        <article>
          <p className="eyebrow">Useful add-ons</p>
          <ul>{addOns.map(([name, price]) => <li key={name}><strong>{name}</strong><br />{price}</li>)}</ul>
        </article>
      </section>

      <section className="terms-grid" aria-label="Payment terms">
        <p className="eyebrow">Payment terms</p>
        {paymentTerms.map(([label, terms]) => (
          <article key={label}>
            <h2>{label}</h2>
            <p>{terms}</p>
          </article>
        ))}
      </section>

      <section className="seo-faq" aria-label="Website pricing questions">
        <p className="eyebrow">Pricing questions</p>
        {pricingFaqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section className="seo-band">
        <p className="eyebrow eyebrow--light">Fit before figure</p>
        <h2>If your business is good but the website does not show it, start with the right level of work.</h2>
        <a href="mailto:hello@malaikastudios.co.ke">Request a fit-and-scope estimate ↗</a>
      </section>

      <SiteFooter />
    </main>
  );
}
