import Link from "next/link";
import { HomeNavigation } from "@/components/home/home-navigation";
import { HomeFooter } from "@/components/home/home-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { PricingNav } from "./pricing-nav";
import { OFFERINGS, LABELS, PRICING_TERMS, getLadder } from "@/lib/pricing";
import { formatKes, getUsdKesRate } from "@/lib/fx";
import { site } from "@/lib/site";
import styles from "./pricing.module.css";

// ─── Schema.org JSON-LD ────────────────────────────────────────────────────────
// Every package is declared as an Offer so Google can read pricing directly.
function buildJsonLd() {
  const offers = OFFERINGS.flatMap((offering) =>
    getLadder(offering.key).map((cfg) => ({
      "@type": "Offer",
      name: `${cfg.name} — ${offering.fullLabel}`,
      description: `${cfg.items.join(". ")}. ${cfg.delivery}.`,
      price: String(cfg.usd),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: String(cfg.usd),
        priceCurrency: "USD",
        minPrice: String(cfg.usd),
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
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Malaika Studios — Digital Services Pricing in Kenya",
    description:
      "Transparent pricing for website design, email marketing, SEO, digital growth and social content in Kenya and worldwide. Packages from USD 250, each with a fixed scope and delivery deadline.",
    url: `${site.url}/pricing`,
    itemListElement: offers.map((offer, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: offer,
    })),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export async function PricingPage() {
  const fx = await getUsdKesRate();
  const rateDate = new Date(`${fx.date}T00:00:00Z`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  );
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
            Fixed packages in US dollars, each with exactly what&apos;s included
            and a delivery deadline. Shilling amounts use today&apos;s exchange
            rate (USD 1 = KSh {fx.rate.toFixed(2)}, {rateDate}).
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

            <div className={`${styles.configGrid} ${styles.ladderGrid}`}>
              {getLadder(offering.key).map((cfg) => (
                <article
                  key={`${offering.key}-${cfg.name}`}
                  className={`${styles.configCard} ${
                    cfg.tag === "Recommended" ? styles.recommended : ""
                  }`}
                >
                  {cfg.tag === "Recommended" && (
                    <div
                      className={styles.recBadge}
                      aria-label="Recommended package"
                    >
                      Recommended
                    </div>
                  )}

                  <h3 className={styles.cardName}>{cfg.name}</h3>
                  <p className={styles.cardPrice}>
                    {cfg.price}
                    {cfg.unit && (
                      <span className={styles.cardUnit}> {cfg.unit}</span>
                    )}
                  </p>
                  <p className={styles.cardKes}>
                    {cfg.from ? "From about " : "About "}
                    {formatKes(cfg.usd, fx.rate)} today
                  </p>
                  <p className={styles.cardDelivery}>{cfg.delivery}</p>

                  <ul className={styles.cardItems}>
                    {cfg.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <Link
                    href={`/match?source=pricing_${offering.key}_${cfg.name.toLowerCase().replace(/\s+/g, "_")}`}
                    className={styles.cardCta}
                  >
                    Start with this →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Terms ────────────────────────────────────────────────── */}
      <section className={styles.terms} aria-labelledby="pricing-terms">
        <div className={styles.container}>
          <h2 id="pricing-terms">How every package works</h2>
          <ul>
            {PRICING_TERMS.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      </section>

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
