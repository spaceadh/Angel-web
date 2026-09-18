import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import after from "@/assets/work-after.svg";
import beadsLanding from "@/assets/beads-world/beads-world-africa-landing.png";
import digitallySlyLogo from "@/assets/digitally-sly/digitaly-sly-logo.png";
import polarBisonLogo from "@/assets/polarbison/StackedLogowithtagline-Orange-Black.png";
import before from "@/assets/work-before.svg";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import neighborhoodLanding from "@/assets/neighbourhood-cocktails/neighbourhood-landing-page.png";
import visual from "@/assets/why-malaika-image.png";
import type {
  CaseStudy,
  CaseStudyCard,
  CaseStudyImage,
} from "@/content/case-studies";
import { workArtwork } from "./artwork";
import { Footer } from "./our-work-page";
import styles from "./work.module.css";

const sectionImages: Record<CaseStudyImage, { src: string }> = {
  "generic-before": before,
  "generic-after": after,
  "neighborhood-landing": neighborhoodLanding,
  "beads-landing": beadsLanding,
  "polar-logo": polarBisonLogo,
  "digitally-sly-logo": digitallySlyLogo,
};

const whatsappLink = "https://wa.me/254745474586";

function ComparisonCard({ side }: { side: CaseStudy["comparison"]["before"] }) {
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
  const { challenge, comparison, hero, outcomes, system } = caseStudy;

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
              <div className={styles.caseArt}>
                <img
                  src={art.src}
                  alt={`${caseStudy.title} website presentation`}
                />
              </div>
            </div>
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

          {system ? (
            <CardSection section={system} className={styles.capabilities} />
          ) : null}
          <CardSection section={outcomes} className={styles.results} />
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
