import type { ReactNode } from "react";
import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import { JsonLd } from "@/components/seo/json-ld";
import { getTool, tools } from "@/lib/tools";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./tools.module.css";

export type ToolSource = {
  title: string;
  publisher: string;
  url: string;
  updated?: string;
};

type Props = {
  slug: string;
  /** Search phrase shown above the H1. */
  kicker: string;
  heading: string;
  lede: string;
  /** The calculator itself (a client component). */
  children: ReactNode;
  /** Explainer sections under the calculator. */
  explainer: ReactNode;
  faqs: readonly { question: string; answer: string }[];
  sources: readonly ToolSource[];
  checked: string;
  cta: { title: string; copy: string; service: string; serviceLabel: string };
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ToolPage({
  slug,
  kicker,
  heading,
  lede,
  children,
  explainer,
  faqs,
  sources,
  checked,
  cta,
}: Props) {
  const tool = getTool(slug)!;
  const url = absoluteUrl(`/tools/${slug}`);
  const others = tools.filter((other) => other.slug !== slug);

  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": `${url}#app`,
                name: tool.name,
                description: tool.summary,
                url,
                applicationCategory: tool.category,
                operatingSystem: "Any",
                browserRequirements: "Requires JavaScript",
                isAccessibleForFree: true,
                inLanguage: "en-KE",
                offers: { "@type": "Offer", price: 0, priceCurrency: "KES" },
                provider: { "@id": `${site.url}/#organization` },
                dateModified: checked,
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { name: "Home", item: site.url },
                  { name: "Free tools", item: absoluteUrl("/tools") },
                  { name: tool.name, item: url },
                ].map((crumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  ...crumb,
                })),
              },
            ],
          }}
        />

        <section className={styles.hero}>
          <div className={styles.container}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href="/tools">Free tools</Link> <span>/</span> {tool.name}
            </nav>
            <h1>
              <span className={styles.kicker}>{kicker}</span>
              {heading}
            </h1>
            <p className={styles.lede}>{lede}</p>
          </div>
        </section>

        <section className={styles.toolBand}>
          <div className={styles.container}>{children}</div>
        </section>

        <article className={`${styles.container} ${styles.explainer}`}>
          {explainer}
        </article>

        <section className={styles.ctaBand}>
          <div className={`${styles.container} ${styles.ctaInner}`}>
            <div>
              <p className={styles.kicker}>Want this handled?</p>
              <h2>{cta.title}</h2>
              <p>{cta.copy}</p>
            </div>
            <div className={styles.ctaActions}>
              <TrackedWhatsappLink
                className={styles.ctaPrimary}
                placement={`tool_${slug}`}
              >
                <FaWhatsapp /> Chat with us on WhatsApp
              </TrackedWhatsappLink>
              <Link className={styles.ctaSecondary} href={cta.service}>
                {cta.serviceLabel} <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <p className={styles.kicker}>Questions</p>
          <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
          <div className={styles.faqs}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={`${styles.container} ${styles.sources}`}>
          <h2>Where these numbers come from</h2>
          <ul>
            {sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
                , {source.publisher}
                {source.updated
                  ? `, updated ${formatDate(source.updated)}`
                  : ""}
              </li>
            ))}
          </ul>
          <p>
            Checked by Malaika Studios on {formatDate(checked)}. Rates change,
            so confirm big decisions with the provider.
          </p>
        </section>

        <section className={`${styles.container} ${styles.section}`}>
          <p className={styles.kicker}>More free tools</p>
          <ul className={styles.toolCards}>
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/tools/${other.slug}`}>
                  <h3>{other.name}</h3>
                  <p>{other.summary}</p>
                  <span>
                    Open the tool <FaArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
