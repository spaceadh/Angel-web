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
          Answer 8 quick questions about your business and what you need.
          You&apos;ll get three ways to build it, with real prices. Websites
          start from USD 250.
        </p>

        <div className={styles.heroFeatures}>
          <div className={styles.featurePill}>Takes 2 minutes</div>
          <div className={styles.featurePill}>Clear prices</div>
          <div className={styles.featurePill}>No commitment</div>
        </div>

        <button className={styles.cta} onClick={onStart}>
          Start The Malaika Match →
        </button>
        <div className={styles.micro}>
          We only use your details to share your results.
        </div>
      </div>
    </section>
  );
}
