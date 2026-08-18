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

import { priceBands } from "./pricingData";

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
    <main className="seo-page malaika-dots">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Pricing navigation">
          <Link href="/services">Services</Link>
          <Link href="/#work">Work</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
          <a href="/contact">Request a fit estimate ↗</a>
        </nav>
      </header>

      <section className="seo-hero seo-hero--split">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            WEBSITE DESIGN PRICES IN NAIROBI
          </p>
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

      <section className="pricing-grid" aria-label="Website pricing scope bands" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', margin: '40px 3.25vw 80px' }}>
        {priceBands.map((band, index) => (
          <Link href={`/pricing/${band.slug}`} key={band.name} style={{ display: 'block' }}>
            <article className="malaika-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <span className="malaika-signature" style={{ width: '24px', height: '2px', marginBottom: '16px' }}>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
                <span className="malaika-signature-color"></span>
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>{String(index + 1).padStart(2, "0")}</span>
                <small style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)' }}>{band.range}</small>
              </div>
              <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', fontFamily: 'var(--sans)', fontWeight: 600 }}>{band.name}</h2>
              <p className="pricing-price" style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0' }}>{band.price}</p>
              <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#5f5d57', marginBottom: '24px', flexGrow: 1 }}>{band.summary}</p>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>View details &rarr;</span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <section className="seo-proof">
        <div>
          <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            THE PRACTICAL THINGS
          </p>
          <h2>A website does not only need design. It needs to be connected, trackable, secure, findable, and easy to contact from.</h2>
        </div>
        <ul>{operationalExtras.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="seo-columns">
        <article>
          <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            WHAT AFFECTS PRICE
          </p>
          <ul>
            <li>Whether the project is a new website, redesign, landing page, or audit.</li>
            <li>How much copywriting, content structure, and proof gathering is needed.</li>
            <li>Page count, visual depth, imagery, case-study needs, and responsive states.</li>
            <li>SEO foundations, schema, performance work, and launch handover.</li>
            <li>Integrations such as social media, email marketing, WhatsApp, forms, booking, CRM, or follow-up automation.</li>
          </ul>
        </article>
        <article>
          <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            USEFUL ADD-ONS
          </p>
          <ul>{addOns.map(([name, price]) => <li key={name}><strong>{name}</strong><br />{price}</li>)}</ul>
        </article>
      </section>

      <section className="terms-grid" aria-label="Payment terms">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            PAYMENT TERMS
          </p>
        {paymentTerms.map(([label, terms]) => (
          <article key={label}>
            <h2>{label}</h2>
            <p>{terms}</p>
          </article>
        ))}
      </section>

      <section className="seo-faq" aria-label="Website pricing questions">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            PRICING QUESTIONS
          </p>
        {pricingFaqs.map((faq) => (
          <details key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>

      <section className="seo-band">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            FIT BEFORE FIGURE
          </p>
        <h2>If your business is good but the website does not show it, start with the right level of work.</h2>
        <a href="/contact">Request a fit-and-scope estimate ↗</a>
      </section>

      <SiteFooter />
    </main>
  );
}
