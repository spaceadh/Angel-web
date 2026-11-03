import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import visual from "@/assets/why-malaika-image.webp";
import type { CaseStudy, CaseStudyCard } from "@/content/case-studies";
import { services as allServices } from "@/content/services";
import { CaseMedia } from "./case-media";
import { Footer } from "./our-work-page";
import styles from "./work.module.css";

function CardSection({
  section,
  className,
}: {
  section: { eyebrow: string; title: string; items: readonly CaseStudyCard[] };
  className: string;
}) {
  return (
    <div className={className}>
      <div className={styles.eyebrow}>{section.eyebrow}</div>
      <h2 className={`${styles.display} ${styles.sectionTitle}`}>
        {section.title}
      </h2>
      <div className={styles.resultGrid}>
        {section.items.map((item) => (
          <div className={styles.result} key={item.title}>
            <div className={styles.icon}>{item.icon}</div>
            <strong>{item.title}</strong>
            <span>{item.copy}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const {
    automation,
    challenge,
    gallery,
    hero,
    heroMedia,
    results,
    system,
    walkthrough,
  } = caseStudy;
  const usedServices = (caseStudy.services ?? []).flatMap(
    (slug) => allServices.find((service) => service.slug === slug) ?? [],
  );

  return (
    <div className={styles.page}>
      <main>
        <section className={styles.caseHero}>
          <div className={styles.container}>
            <Link className={styles.back} href="/our-work">
              ← &nbsp; Back to Our Work
            </Link>
            <div className={styles.caseLayout}>
              <div>
                <span className={styles.pill}>{hero.pill}</span>
                <h1 className={`${styles.display} ${styles.caseTitle}`}>
                  {caseStudy.title}.
                </h1>
                <p className={styles.caseCopy}>{hero.intro}</p>
                <div className={styles.caseTags}>{hero.tags}</div>
              </div>
              <div className={styles.caseHeroMedia}>
                <CaseMedia media={heroMedia} priority />
              </div>
            </div>
            {results ? (
              <div className={styles.caseResults}>
                <dl>
                  {results.items.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd className={styles.display}>{item.value}</dd>
                    </div>
                  ))}
                </dl>
                {results.source ? <p>{results.source}</p> : null}
              </div>
            ) : null}
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.split}>
            <div>
              <div className={styles.eyebrow}>{challenge.eyebrow}</div>
              <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                {challenge.title}
              </h2>
              <p>{challenge.copy}</p>
            </div>
            {challenge.keyPoints ? (
              <div className={styles.solution}>
                <div className={styles.eyebrow}>
                  {challenge.keyPoints.eyebrow}
                </div>
                {challenge.keyPoints.title ? (
                  <h3 className={`${styles.display} ${styles.solutionTitle}`}>
                    {challenge.keyPoints.title}
                  </h3>
                ) : null}
                {challenge.keyPoints.items.map((item) => (
                  <div className={styles.check} key={item}>
                    <b>✓</b>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {walkthrough ? (
            <div className={styles.walkthrough}>
              <div className={styles.eyebrow}>{walkthrough.eyebrow}</div>
              <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                {walkthrough.title}
              </h2>
              {walkthrough.steps.map((step, index) => (
                <article
                  className={`${styles.step} ${
                    step.media.device === "phone"
                      ? styles.stepPhone
                      : styles.stepDesktop
                  }`}
                  key={step.title}
                >
                  <div className={styles.stepMedia}>
                    <div className={styles.device}>
                      <CaseMedia media={step.media} />
                    </div>
                  </div>
                  <div className={styles.stepCopy}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className={styles.display}>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>

        {automation ? (
          <section className={styles.automation}>
            <div className={styles.container}>
              <div className={styles.automationHead}>
                <div>
                  <div className={styles.eyebrow}>{automation.eyebrow}</div>
                  <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                    {automation.title}
                  </h2>
                </div>
                <p>{automation.intro}</p>
              </div>
              <ol className={styles.flow}>
                {automation.steps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.flowNode}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.flowLabel}>{step.label}</span>
                    <strong className={styles.display}>{step.title}</strong>
                    <p>{step.copy}</p>
                  </li>
                ))}
              </ol>
              {automation.note ? (
                <p className={styles.flowNote}>{automation.note}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className={`${styles.container} ${styles.sectionAfter}`}>
          {gallery ? (
            <div className={styles.gallery}>
              <div className={styles.eyebrow}>{gallery.eyebrow}</div>
              <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                {gallery.title}
              </h2>
              <div className={styles.galleryGrid}>
                {gallery.items.map((item) => (
                  <figure key={item.src}>
                    <CaseMedia media={item} />
                    <figcaption>{item.caption ?? item.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}

          {system ? (
            <CardSection section={system} className={styles.capabilities} />
          ) : null}

          {usedServices.length ? (
            <div className={styles.usedServices}>
              <div className={styles.eyebrow}>Services used</div>
              <ul>
                {usedServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`}>
                      <strong>{service.title}</strong>
                      <span>{service.heading} →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
        <section className={styles.caseCta}>
          <div className={`${styles.container} ${styles.caseCtaGrid}`}>
            <div className={styles.caseCtaCopy}>
              <div className={styles.eyebrow}>Let&apos;s make</div>
              <h2 className={styles.display}>YOU LOOK GOOD.</h2>
              <p>Ready to build a digital presence that actually works?</p>
              <TrackedWhatsappLink
                className={styles.caseCtaButton}
                placement="case_study_cta"
              >
                <FaWhatsapp /> &nbsp; Talk to Malaika →
              </TrackedWhatsappLink>
              <Link
                className={styles.caseCtaEstimate}
                href={`/match?source=case_${caseStudy.slug}`}
              >
                Or get an instant estimate →
              </Link>
            </div>
            <div className={styles.caseCtaArt}>
              <img src={visual.src} alt="" />
            </div>
          </div>
        </section>
      </main>
      <Footer logoIcon={logoIcon} />
    </div>
  );
}
