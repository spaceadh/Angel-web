import Link from "next/link";
import after from "@/assets/work-after.svg";
import before from "@/assets/work-before.svg";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import type { CaseStudy } from "@/content/case-studies";
import { workArtwork } from "./artwork";
import { Footer } from "./our-work-page";
import styles from "./work.module.css";

const solution = [
  "Modern, fast and responsive website",
  "Bold, on-brand visual identity",
  "Clear menu, story and contact paths",
  "Simple UX for browsing and ordering",
];
const results = [
  ["★", "Clearer", "Brand story and visual hierarchy"],
  ["↗", "Faster", "Path from discovery to action"],
  ["♥", "Stronger", "Perceived quality and consistency"],
  ["▥", "Ready", "Foundation for future campaigns and growth"],
] as const;

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
          <div className={styles.split}>
            <div>
              <div className={styles.eyebrow}>01 / The challenge</div>
              <h2 className={styles.display}>
                GOOD PRODUCT.
                <br />
                QUIET PRESENCE.
              </h2>
              <p>{caseStudy.challenge}</p>
            </div>
            <div className={styles.solution}>
              <div className={styles.eyebrow}>02 / The solution</div>
              {solution.map((item) => (
                <div className={styles.check} key={item}>
                  <b>✓</b>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.transform}>
            <div className={styles.eyebrow}>03 / The transformation</div>
            <h2 className={styles.display}>BEFORE → AFTER.</h2>
            <div className={styles.beforeAfter}>
              <div className={styles.shot}>
                <div className={styles.shotLabel}>Before</div>
                <img src={before.src} alt="Before website" />
              </div>
              <div className={styles.swap}>→</div>
              <div className={styles.shot}>
                <div className={styles.shotLabel}>After</div>
                <img src={after.src} alt="After website" />
              </div>
            </div>
          </div>
          <div className={styles.results}>
            <div className={styles.eyebrow}>04 / What changed</div>
            <h2 className={styles.display}>
              FROM PRESENCE
              <br />
              TO EXPERIENCE.
            </h2>
            <div className={styles.resultGrid}>
              {results.map(([icon, title, copy]) => (
                <div className={styles.result} key={title}>
                  <div className={styles.icon}>{icon}</div>
                  <strong>{title}</strong>
                  <span>{copy}</span>
                </div>
              ))}
            </div>
          </div>
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
