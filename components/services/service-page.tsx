import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import type { Service } from "@/content/services";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./service-page.module.css";

export function ServicePage({ service }: { service: Service }) {
  const serviceUrl = absoluteUrl(`/services/${service.slug}`);
  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: serviceUrl,
            provider: {
              "@type": "ProfessionalService",
              name: site.name,
              url: site.url,
            },
            areaServed: site.serviceAreas,
          }}
        />
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.kicker}>Malaika Studios / {service.title}</p>
            <h1>{service.hero}</h1>
            <p className={styles.lede}>{service.introduction}</p>
            <TrackedWhatsappLink
              className={styles.cta}
              placement={`service_${service.slug}_hero`}
            >
              <FaWhatsapp /> Talk to Malaika
            </TrackedWhatsappLink>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.sectionHead}>
            <p>What this gives you</p>
            <h2>A stronger next step for the business.</h2>
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
        <section className={`${styles.container} ${styles.related}`}>
          <p>Part of the Malaika system</p>
          <h2>Every good piece works better when it connects to the rest.</h2>
          <Link href="/what-we-do">
            See how Malaika builds a connected digital presence <FaArrowRight />
          </Link>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
