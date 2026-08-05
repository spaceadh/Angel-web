"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function IntroVideo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoPlaceholder} onClick={() => setIsOpen(true)}>
        <div className={styles.videoOverlay}>
          <div className={styles.playButton} aria-label="Play video">
            <svg width="16" height="20" viewBox="0 0 16 20">
              <path d="M0 0 L16 10 L0 20 Z" />
            </svg>
          </div>
          <h3 className={styles.videoTitle}>45-Second Introduction</h3>
          <p className={styles.videoSubtitle}>How we build for conversion & growth</p>
        </div>
      </div>

      {isOpen && (
        <div className={styles.videoModal} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setIsOpen(false)} aria-label="Close video">
              ✕
            </button>
            <video
              src="/video/intro.mp4"
              poster="/work/somafix-landing.png"
              controls
              autoPlay
              className={styles.videoElement}
            />
          </div>
        </div>
      )}
    </div>
  );
}
