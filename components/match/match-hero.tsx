"use client";

import styles from "./match.module.css";

interface MatchHeroProps {
  onStart: () => void;
}

export function MatchHero({ onStart }: MatchHeroProps) {
  return (
    <section className={styles.screen}>
      <div className={`${styles.hero} ${styles.fadeIn}`}>
        <div className={styles.eyebrow}>
          <i /> The Malaika Match
        </div>
        <h1 className={styles.heroTitle}>
          Are we a <span className={styles.accent}>match</span> for your
          project?
          <span className={styles.scriptNote}>let's find out</span>
        </h1>
        <p className={styles.lede}>
          Answer a few focused questions about what you’re building, what
          success looks like and the investment territory you’re comfortable
          working within. We’ll calculate your match score and shape three
          realistic ways to build it.
        </p>

        <div className={styles.heroFeatures}>
          <div className={styles.featurePill}>
            <span>⚡</span> Takes 2 minutes
          </div>
          <div className={styles.featurePill}>
            <span>🎯</span> Clear price options
          </div>
          <div className={styles.featurePill}>
            <span>🤝</span> Zero commitment
          </div>
        </div>

        <button className={styles.cta} onClick={onStart}>
          Start The Malaika Match →
        </button>
        <div className={styles.micro}>
          <span>🔒</span> Your information is safe. We use your details strictly
          to share your results.
        </div>
      </div>
    </section>
  );
}
