import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, siteUrl } from "../../seoConfig";
import { getInsight, insights } from "../insightData";

export function generateStaticParams() {
  return insights.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  if (!insight) return {};

  return {
    title: `${insight.title} | Malaika Studios`,
    description: insight.excerpt,
    alternates: { canonical: absoluteUrl(`/insights/${insight.slug}`) },
    openGraph: {
      title: `${insight.title} | Malaika Studios`,
      description: insight.excerpt,
      url: absoluteUrl(`/insights/${insight.slug}`),
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Malaika Studios",
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/insights/${insight.slug}`),
    },
  };

  return (
    <main className="seo-page malaika-dots">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Insights", path: "/insights" },
        { name: insight.title, path: `/insights/${insight.slug}` },
      ])} />
      <JsonLd data={articleJsonLd} />

      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Insight page navigation">
          <Link href="/insights">Insights</Link>
          <Link href="/services">Services</Link>
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
            {insight.date}
          </p>
        <h1>{insight.title}</h1>
        <p>{insight.excerpt}</p>
      </section>

      <section className="seo-columns">
        <article style={{ gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto", paddingBottom: "4rem" }}>
          {insight.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} style={{ marginTop: "2rem", marginBottom: "1rem" }}>{paragraph.replace("### ", "")}</h3>;
            }
            return <p key={i} style={{ marginBottom: "1rem", lineHeight: "1.6" }}>{paragraph}</p>;
          })}
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
