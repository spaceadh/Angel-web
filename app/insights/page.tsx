import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import SiteFooter from "../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, routeMeta } from "../seoConfig";
import styles from "./Insights.module.css";
import { insights } from "./insightData";

export const metadata: Metadata = {
  title: routeMeta.insights.title,
  description: routeMeta.insights.description,
  alternates: { canonical: absoluteUrl(routeMeta.insights.path) },
  openGraph: {
    title: routeMeta.insights.title,
    description: routeMeta.insights.description,
    url: absoluteUrl(routeMeta.insights.path),
  },
};

export default function InsightsPage() {
  return (
    <main className="seo-page malaika-dots">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Insights navigation">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/insights">Insights</Link>
          <a href="/contact">Start a project ↗</a>
        </nav>
      </header>

      <section className="seo-hero seo-hero--split seo-hero--compact">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            INSIGHTS
          </p>
        <div>
          <h1>Insights & Answers on Digital Presence</h1>
          <p>
            Learn how Kenyan and African businesses use websites, client magnet systems, and digital strategy to look better, communicate clearly, and convert effectively.
          </p>
        </div>
      </section>

      <section className={styles.insightsList} aria-label="Malaika Studios insights">
        {insights.map((insight) => (
          <Link href={`/insights/${insight.slug}`} className={styles.insightCard} key={insight.slug}>
            <div className={styles.insightDate}>{insight.date}</div>
            <div className={styles.insightContent}>
              <h2 className={styles.insightTitle}>{insight.title}</h2>
              <p className={styles.insightExcerpt}>{insight.excerpt}</p>
            </div>
            <div className={styles.insightArrow} aria-hidden="true">↗</div>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
