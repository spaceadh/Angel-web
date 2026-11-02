import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { fillPrices, services, type Service } from "@/content/services";
import { getCaseStudy } from "@/content/case-studies";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import { JsonLd } from "@/components/seo/json-ld";
import {
  OFFERINGS,
  extractPriceNumber,
  getPricingConfigs,
} from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./service-page.module.css";

export function ServicePage({ service }: { service: Service }) {
  const serviceUrl = absoluteUrl(`/services/${service.slug}`);
  const pricing = service.pricing.map((key) => ({
    offering: OFFERINGS.find((offering) => offering.key === key)!,
    configs: getPricingConfigs(key, "20-50"),
  }));
  const lowPrices = pricing
    .map(({ configs }) => Number(extractPriceNumber(configs[0].price)))
    .filter(Boolean);
  const caseStudies = service.caseStudies.flatMap(
    (slug) => getCaseStudy(slug) ?? [],
  );
  const faqs = service.faqs.map(([question, answer]) => ({
    question,
    answer: fillPrices(answer),
  }));
  const otherServices = services.filter(({ slug }) => slug !== service.slug);

  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: service.title,
                serviceType: service.heading,
                description: fillPrices(service.description),
                url: serviceUrl,
                provider: { "@id": `${site.url}/#organization` },
                areaServed: site.serviceAreas,
                ...(lowPrices.length
                  ? {
                      offers: {
                        "@type": "AggregateOffer",
                        priceCurrency: "KES",
                        lowPrice: Math.min(...lowPrices),
                        url: absoluteUrl("/pricing"),
                      },
                    }
                  : {}),
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
                  { name: "What we do", item: absoluteUrl("/what-we-do") },
                  { name: service.title, item: serviceUrl },
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
              <span className={styles.kicker}>{service.heading}</span>
              {service.hero}
            </h1>
            <p className={styles.lede}>{service.introduction}</p>
            <Link
              href={`/match?source=service_${service.slug}`}
              className={styles.cta}
            >
              Calculate Scope &amp; Pricing →
            </Link>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p>What this gives you</p>
            <h2>A stronger next step for the business.</h2>
            <p className={styles.body}>{service.audience}</p>
          </div>
          <ul className={styles.outcomes}>
            {service.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>
        <section className={styles.processBand}>
          <div className={`${styles.container} ${styles.process}`}>
            <div>
              <p>How we approach it</p>
              <h2>Work with a reason behind it.</h2>
            </div>
            <ol>
              {service.process.map(([title, copy], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p>What it costs</p>
            <h2>
              {pricing.length
                ? "Starting prices, in the open."
                : "Priced to the project."}
            </h2>
          </div>
          {pricing.length ? (
            pricing.map(({ offering, configs }) => (
              <div className={styles.priceGroup} key={offering.key}>
                <h3>{offering.fullLabel}</h3>
                <ul className={styles.prices}>
                  {configs.map((config) => (
                    <li key={config.name}>
                      <span>{config.name}</span>
                      <strong>{config.price}</strong>
                      <p>{config.items.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  className={styles.textLink}
                  href={`/pricing#section-${offering.key}`}
                >
                  See every {offering.label.toLowerCase()} package{" "}
                  <FaArrowRight />
                </Link>
              </div>
            ))
          ) : (
            <p className={styles.body}>
              {faqs.find(({ question }) => question.includes("cost"))?.answer}{" "}
              <TrackedWhatsappLink
                className={styles.textLink}
                placement={`service_${service.slug}_pricing`}
              >
                <FaWhatsapp /> Ask for a quote on WhatsApp
              </TrackedWhatsappLink>
            </p>
          )}
        </section>
        {caseStudies.length > 0 && (
          <section className={styles.workBand}>
            <div className={`${styles.container} ${styles.section}`}>
              <div className={styles.sectionHead}>
                <p>Work like this</p>
                <h2>Businesses we have done it for.</h2>
              </div>
              <ul className={styles.work}>
                {caseStudies.map((caseStudy) => (
                  <li key={caseStudy.slug}>
                    <Link href={`/our-work/work/${caseStudy.slug}`}>
                      <h3>{caseStudy.title}</h3>
                      <p>{caseStudy.description}</p>
                      <span>
                        Read the case study <FaArrowRight />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p>Questions</p>
            <h2>Frequently asked questions</h2>
          </div>
          <div className={styles.faqs}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={`${styles.container} ${styles.related}`}>
          <p>Part of the Malaika system</p>
          <h2>Every good piece works better when it connects to the rest.</h2>
          <ul className={styles.otherServices}>
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link href={`/services/${other.slug}`}>
                  {other.heading} <FaArrowRight />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/what-we-do">
                See how Malaika builds a connected digital presence{" "}
                <FaArrowRight />
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
