import Link from "next/link";
import after from "@/assets/work-after.svg";
import before from "@/assets/work-before.svg";
import neighborhoodLanding from "@/assets/neighbourhood-landing-page.png";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import type {
  CaseStudy,
  CaseStudyImage,
  CaseStudySection,
} from "@/content/case-studies";
import { workArtwork } from "./artwork";
import { Footer } from "./our-work-page";
import styles from "./work.module.css";

const sectionImages: Record<CaseStudyImage, { src: string }> = {
  "generic-before": before,
  "generic-after": after,
  "neighborhood-landing": neighborhoodLanding,
};

function StorySection({ section }: { section: CaseStudySection }) {
  if (section.type === "challenge") {
    return (
      <div className={styles.split}>
        <div>
          <div className={styles.eyebrow}>{section.eyebrow}</div>
          <h2 className={`${styles.display} ${styles.sectionTitle}`}>
            {section.title}
          </h2>
          <p>{section.copy}</p>
        </div>
        {section.aside ? (
          <div className={styles.solution}>
            <div className={styles.eyebrow}>{section.aside.eyebrow}</div>
            {section.aside.title ? (
              <h3 className={`${styles.display} ${styles.solutionTitle}`}>
                {section.aside.title}
              </h3>
            ) : null}
            {section.aside.items.map((item) => (
              <div className={styles.check} key={item}>
                <b>✓</b>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (section.type === "comparison") {
    return (
      <div className={styles.transform}>
        <div className={styles.eyebrow}>{section.eyebrow}</div>
        <h2 className={`${styles.display} ${styles.sectionTitle}`}>
          {section.title}
        </h2>
        <div className={styles.beforeAfter}>
          <ComparisonCard side={section.before} />
          <div className={styles.swap}>→</div>
          <ComparisonCard side={section.after} />
        </div>
      </div>
    );
  }

  const isCapability = section.type === "capabilities";
  return (
    <div className={isCapability ? styles.capabilities : styles.results}>
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

function ComparisonCard({
  side,
}: {
  side: Extract<CaseStudySection, { type: "comparison" }>["before"];
}) {
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

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const art = workArtwork[caseStudy.art];
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
                <span className={styles.pill}>{caseStudy.pill}</span>
                <h1 className={`${styles.display} ${styles.caseTitle}`}>
                  {caseStudy.title}.
                </h1>
                <p className={styles.caseCopy}>{caseStudy.serviceLine}</p>
                <div className={styles.caseTags}>{caseStudy.tags}</div>
              </div>
              <div className={styles.caseArt}>
                <div className={styles.shape1} />
                <div className={styles.shape2} />
                <img
                  src={art.src}
                  alt={`${caseStudy.title} website presentation`}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          {caseStudy.sections.map((section, index) => (
            <StorySection key={`${section.type}-${index}`} section={section} />
          ))}
        </section>
        <section className={styles.caseCta}>
          <div className={`${styles.container} ${styles.caseCtaGrid}`}>
            <div className={styles.caseCtaCopy}>
              <div className={styles.eyebrow}>Let&apos;s make</div>
              <h2 className={styles.display}>YOU LOOK GOOD.</h2>
              <p>Ready to build a digital presence that actually works?</p>
              <a
                className={styles.caseCtaButton}
                href="https://wa.me/254712345678"
              >
                ◉ &nbsp; Talk to Malaika →
              </a>
            </div>
            <div className={styles.caseCtaArt}>
              <img src={art.src} alt="" />
            </div>
          </div>
        </section>
      </main>
      <Footer logoIcon={logoIcon} />
    </div>
  );
}
