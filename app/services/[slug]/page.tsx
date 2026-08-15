import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, siteUrl } from "../../seoConfig";
import { getService, services } from "../serviceData";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: {
      title: `${service.title} | Malaika Studios`,
      description: service.description,
      url: absoluteUrl(`/services/${service.slug}`),
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.description,
    areaServed: ["Nairobi", "Kenya", "East Africa"],
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    serviceType: service.title,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="seo-page malaika-dots">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ])} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd} />

      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Service page navigation">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <a href="/contact">Start a project ↗</a>
        </nav>
      </header>

      <section className="seo-hero">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            {service.kicker}
          </p>
        <h1>{service.title}</h1>
        <p>{service.intro}</p>
      </section>

      <section className="seo-columns">
        <article>
          <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            WHO THIS IS FOR
          </p>
          <ul>{service.whoFor.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            WHAT IS INCLUDED
          </p>
          <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </section>

      <section className="seo-proof">
        <div>
          <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            USEFUL OUTCOMES
          </p>
          <h2>Design earns its place when the business becomes easier to find, understand, trust, and contact.</h2>
        </div>
        <ul>{service.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="seo-faq" aria-label={`${service.title} frequently asked questions`}>
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            QUESTIONS BUYERS ASK
          </p>
        {service.faqs.map((faq) => (
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
            NEXT STEP
          </p>
        <h2>Not sure what level of website or system your business needs?</h2>
        <Link href="/pricing">Use the pricing guide as a starting point ↗</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
