import Link from "next/link";
import { HomeNavigation } from "@/components/home/home-navigation";
import { HomeFooter } from "@/components/home/home-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { PricingNav } from "./pricing-nav";
import {
  OFFERINGS,
  BUDGET_BANDS,
  LABELS,
  getPricingConfigs,
  extractPriceNumber,
} from "@/lib/pricing";
import { site } from "@/lib/site";
import styles from "./pricing.module.css";

// ─── Schema.org JSON-LD ────────────────────────────────────────────────────────
// All 60 configurations are declared as Offers so Google can read pricing directly.
function buildJsonLd() {
  const offers = OFFERINGS.flatMap((offering) =>
    BUDGET_BANDS.flatMap((band) =>
      getPricingConfigs(offering.key, band.id).map((cfg) => ({
        "@type": "Offer",
        name: `${cfg.name} — ${offering.fullLabel}`,
        description: cfg.items.join(". "),
        price: extractPriceNumber(cfg.price),
        priceCurrency: "KES",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: extractPriceNumber(cfg.price),
          priceCurrency: "KES",
          minPrice: extractPriceNumber(cfg.price),
        },
        offeredBy: {
          "@type": "LocalBusiness",
          name: site.name,
          url: site.url,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
        },
      })),
    ),
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Malaika Studios — Digital Services Pricing in Kenya",
    description:
      "Transparent pricing for website design, email marketing, SEO, digital growth and social content in Kenya. Configurations from KSh 25,000.",
    url: `${site.url}/pricing`,
    itemListElement: offers.map((offer, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: offer,
    })),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PricingPage() {
  return (
    <div className={styles.page}>
      <HomeNavigation />
      <JsonLd data={buildJsonLd()} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>Malaika Studios / Pricing</p>
          <h1>
            Transparent pricing
            <br />
            for <em>every</em> stage.
          </h1>
          <p className={styles.lede}>
            Every configuration is tailored to your brief — not sold off the
            shelf. Use the estimate tool to get the right scope for your
            business, or browse everything below.
          </p>
          <div className={styles.heroActions}>
            <Link
              href="/match?source=pricing_hero"
              className={styles.ctaPrimary}
            >
              Get Your Instant Estimate →
            </Link>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              Talk on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Sticky Service Nav (client) ───────────────────────────── */}
      <PricingNav offerings={OFFERINGS} />

      {/* ── Service Sections — all rendered in HTML for full SEO ─── */}
      {OFFERINGS.map((offering) => (
        <section
          key={offering.key}
          id={`section-${offering.key}`}
          className={styles.serviceSection}
          aria-labelledby={`heading-${offering.key}`}
        >
          <div className={styles.container}>
            {/* Service header */}
            <div className={styles.serviceHead}>
              <div className={styles.serviceHeadLeft}>
                <span
                  className={styles.servicePill}
                  style={{
                    color: offering.accentColor,
                    borderColor: offering.accentColor + "44",
                    background: offering.accentColor + "14",
                  }}
                >
                  {offering.label}
                </span>
                <h2 id={`heading-${offering.key}`}>
                  {LABELS.offering[offering.key]}
                </h2>
                <p className={styles.serviceDesc}>{offering.description}</p>
              </div>
              <Link
                href={`/services/${offering.serviceSlug}`}
                className={styles.serviceLink}
              >
                See service details →
              </Link>
            </div>

            {/* Budget bands */}
            {BUDGET_BANDS.map((band) => {
              const configs = getPricingConfigs(offering.key, band.id);
              return (
                <div key={band.id} className={styles.bandSection}>
                  <div className={styles.bandHeader}>
                    <span className={styles.bandRange}>{band.range}</span>
                    <span className={styles.bandLabel}>{band.label}</span>
                  </div>

                  <div className={styles.configGrid}>
                    {configs.map((cfg) => (
                      <article
                        key={`${offering.key}-${band.id}-${cfg.name}`}
                        className={`${styles.configCard} ${
                          cfg.tag === "Recommended" ? styles.recommended : ""
                        }`}
                      >
                        {cfg.tag === "Recommended" && (
                          <div
                            className={styles.recBadge}
                            aria-label="Recommended configuration"
                          >
                            ★ Recommended
                          </div>
                        )}

                        <p className={styles.cardTag}>{cfg.tag}</p>
                        <h3 className={styles.cardName}>{cfg.name}</h3>
                        <p className={styles.cardPrice}>{cfg.price}</p>

                        <ul className={styles.cardItems}>
                          {cfg.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>

                        <Link
                          href={`/match?source=pricing_${offering.key}_${band.id}`}
                          className={styles.cardCta}
                        >
                          Start with this →
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className={styles.bottomCta}>
        <div className={styles.container}>
          <p className={styles.bottomKicker}>Not sure which fits?</p>
          <h2>Let the tool do the thinking.</h2>
          <p>
            Answer 8 questions about your business and get a configuration built
            for your brief — with a price to match.
          </p>
          <Link
            href="/match?source=pricing_bottom"
            className={styles.ctaPrimary}
          >
            Get Your Instant Estimate →
          </Link>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
