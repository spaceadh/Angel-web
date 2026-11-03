import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import digitallySlyLogo from "@/assets/digitally-sly/digitaly-sly-logo.png";
import before from "@/assets/work-before.svg";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import visual from "@/assets/why-malaika-image.webp";
import type {
  CaseStudy,
  CaseStudyCard,
  CaseStudyImage,
} from "@/content/case-studies";
import { services as allServices } from "@/content/services";
import { workArtwork } from "./artwork";
import { CaseMedia } from "./case-media";
import { Footer } from "./our-work-page";
import styles from "./work.module.css";

const sectionImages: Record<CaseStudyImage, { src: string }> = {
  "generic-before": before,
  "digitally-sly-logo": digitallySlyLogo,
};

const whatsappLink = "https://wa.me/254745474586";

type ComparisonSide = NonNullable<CaseStudy["comparison"]>["before"];

function ComparisonCard({ side }: { side: ComparisonSide }) {
  const image = side.image ? sectionImages[side.image] : undefined;

  return (
    <article
      className={`${styles.shot} ${image ? "" : styles.shotWithoutImage}`}
    >
      <div className={styles.shotLabel}>{side.label}</div>
      {image ? (
        <img src={image.src} alt={`${side.label}: ${side.title}`} />
      ) : null}
      <div className={styles.shotCopy}>
        <h3 className={styles.display}>{side.title}</h3>
        <p>{side.copy}</p>
      </div>
    </article>
  );
}

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
  const art = workArtwork[caseStudy.art];
  const {
    automation,
    challenge,
    comparison,
    gallery,
    hero,
    heroMedia,
    outcomes,
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
              {heroMedia ? (
                <div className={styles.caseHeroMedia}>
                  <CaseMedia media={heroMedia} priority />
                </div>
              ) : (
                <div className={styles.caseArt}>
                  <img
                    src={art.src}
                    alt={`${caseStudy.title} website presentation`}
                  />
                </div>
              )}
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

          {comparison ? (
            <div className={styles.transform}>
              <div className={styles.eyebrow}>{comparison.eyebrow}</div>
              <h2 className={`${styles.display} ${styles.sectionTitle}`}>
                {comparison.title}
              </h2>
              <div className={styles.beforeAfter}>
                <ComparisonCard side={comparison.before} />
                <div className={styles.swap}>→</div>
                <ComparisonCard side={comparison.after} />
              </div>
            </div>
          ) : null}

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
          {outcomes ? (
            <CardSection section={outcomes} className={styles.results} />
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
