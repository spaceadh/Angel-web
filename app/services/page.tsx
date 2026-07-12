import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import SiteFooter from "../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, routeMeta } from "../seoConfig";
import { services } from "./serviceData";

export const metadata: Metadata = {
  title: routeMeta.services.title,
  description: routeMeta.services.description,
  alternates: { canonical: absoluteUrl(routeMeta.services.path) },
  openGraph: {
    title: routeMeta.services.title,
    description: routeMeta.services.description,
    url: absoluteUrl(routeMeta.services.path),
  },
};

export default function ServicesPage() {
  return (
    <main className="seo-page">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Services navigation">
          <Link href="/pricing">Pricing</Link>
          <Link href="/#work">Work</Link>
          <a href="mailto:business@rotsi.co.ke">Start a project ↗</a>
        </nav>
      </header>

      <section className="seo-hero seo-hero--split seo-hero--compact">
        <p className="eyebrow">Services</p>
        <div>
          <h1>Website design, digital presence audits, and client magnet systems for growing Kenyan businesses.</h1>
          <p>
            Malaika Studios helps serious businesses improve how they look, communicate, and convert online. The work
            starts with presence, but it is judged by clarity, trust, inquiries, and the customer journey after the first click.
          </p>
        </div>
      </section>

      <section className="seo-list" aria-label="Malaika Studios services">
        {services.map((service, index) => (
          <Link href={`/services/${service.slug}`} className="seo-list-row" key={service.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>{service.kicker}</p>
              <h2>{service.title}</h2>
            </div>
            <p>{service.description}</p>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </section>

      <section className="seo-band">
        <p className="eyebrow eyebrow--light">How the work connects</p>
        <h2>Attract the right people. Convert interest into action. Retain attention through better follow-up.</h2>
        <Link href="/pricing">See website pricing guidance ↗</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
