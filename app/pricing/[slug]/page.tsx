import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, siteUrl } from "../../seoConfig";
import { priceBands } from "../pricingData";

export async function generateStaticParams() {
  return priceBands.map((band) => ({
    slug: band.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const band = priceBands.find((b) => b.slug === params.slug);
  if (!band) return {};

  const title = `${band.name} Pricing | Malaika Studios by Rotsi`;
  const description = band.summary;
  const path = `/pricing/${band.slug}`;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
    },
  };
}

export default function PricingDetailPage({ params }: { params: { slug: string } }) {
  const band = priceBands.find((b) => b.slug === params.slug);
  if (!band) return notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/pricing/${band.slug}#service`,
    name: band.name,
    description: band.summary,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: band.numericPrice,
      priceCurrency: "KES",
      description: band.summary,
    },
  };

  return (
    <main className="seo-page malaika-dots">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
          { name: band.name, path: `/pricing/${band.slug}` },
        ])}
      />
      <JsonLd data={serviceJsonLd} />

      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Pricing navigation">
          <Link href="/services">Services</Link>
          <Link href="/#work">Work</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/pricing">Pricing</Link>
          <a href="/contact">Request a fit estimate ↗</a>
        </nav>
      </header>

      <section className="seo-hero">
        <p className="malaika-label">
          <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
            <span className="malaika-signature-color"></span>
            <span className="malaika-signature-color"></span>
            <span className="malaika-signature-color"></span>
          </span>
          {band.range.toUpperCase()}
        </p>
        <div>
          <h1>{band.name}</h1>
          <p style={{ fontSize: '24px', fontWeight: 600, marginTop: '24px' }}>{band.price}</p>
          <p style={{ marginTop: '16px', maxWidth: '600px' }}>{band.summary}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0' }}>
        <article className="malaika-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '20px', fontFamily: 'var(--sans)', fontWeight: 600, marginBottom: '16px' }}>Best For</h2>
          <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>{band.bestFor}</p>

          <h2 style={{ fontSize: '20px', fontFamily: 'var(--sans)', fontWeight: 600, marginBottom: '16px' }}>What's Included</h2>
          <ul className="pricing-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {band.includes.map((item) => (
              <li key={item} style={{ padding: '12px 0', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="malaika-signature" style={{ width: '12px', height: '2px', flexShrink: 0 }}>
                  <span className="malaika-signature-color"></span>
                  <span className="malaika-signature-color"></span>
                  <span className="malaika-signature-color"></span>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
             <a href="/contact" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 32px' }}>
                Request this package
             </a>
          </div>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
