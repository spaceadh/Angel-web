import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { JsonLd } from "@/components/seo/json-ld";
import styles from "@/components/tools/tools.module.css";
import { tools } from "@/lib/tools";
import { absoluteUrl, defaultOgImage, site } from "@/lib/site";

const title = "Free Business Tools for Kenya: M-Pesa, WhatsApp & Website Costs";
const description =
  "Free tools for Kenyan businesses: a WhatsApp link and QR code generator, plus calculators for M-Pesa charges, WhatsApp Business API costs and website prices.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/tools") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/tools"),
    type: "website",
    images: [defaultOgImage],
  },
};

export default function ToolsPage() {
  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                name: "Free business tools",
                description,
                url: absoluteUrl("/tools"),
                publisher: { "@id": `${site.url}/#organization` },
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: tools.map((tool, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: tool.name,
                    url: absoluteUrl(`/tools/${tool.slug}`),
                  })),
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { name: "Home", item: site.url },
                  { name: "Free tools", item: absoluteUrl("/tools") },
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
            <h1>
              <span className={styles.kicker}>Free tools</span>
              Answers in shillings, in seconds.
            </h1>
            <p className={styles.lede}>
              Tools for the questions every Kenyan business asks: how customers
              reach you on WhatsApp, what M-Pesa takes, what WhatsApp costs and
              what a website should cost. Built on current official rates, free
              to use, no sign-up.
            </p>
          </div>
        </section>
        <section className={styles.container}>
          <ul className={styles.toolCards}>
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`}>
                  <h2 className={styles.cardTitle}>{tool.name}</h2>
                  <p>{tool.summary}</p>
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
