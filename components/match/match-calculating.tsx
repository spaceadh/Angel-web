"use client";

import { useEffect, useState } from "react";
import styles from "./match.module.css";

/** Each step's duration (ms). The flow waits for both these and the API. */
export const CALCULATING_STEPS = [
  { label: "Reading your brief", ms: 700 },
  { label: "Scoring how well we fit", ms: 800 },
  { label: "Pricing three ways to build it", ms: 900 },
  { label: "Choosing our recommendation", ms: 700 },
  { label: "Writing up your estimate email", ms: 700 },
] as const;

export const CALCULATING_TOTAL_MS = CALCULATING_STEPS.reduce(
  (sum, step) => sum + step.ms,
  0,
);

export function MatchCalculating({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= CALCULATING_STEPS.length) return;
    const timer = setTimeout(
      () => setActiveStep((step) => step + 1),
      CALCULATING_STEPS[activeStep].ms,
    );
    return () => clearTimeout(timer);
  }, [activeStep]);

  const firstName = name.split(/\s+/)[0];
  const progress = Math.min(1, activeStep / CALCULATING_STEPS.length);

  return (
    <section className={styles.screen} aria-live="polite" aria-busy="true">
      <div className={`${styles.calculating} ${styles.fadeIn}`}>
        <div className={styles.calcRing} aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <circle className={styles.calcTrack} cx="60" cy="60" r="52" />
            <circle
              className={styles.calcFill}
              cx="60"
              cy="60"
              r="52"
              style={{ strokeDashoffset: 327 * (1 - progress) }}
            />
          </svg>
          <span>{Math.round(progress * 100)}%</span>
        </div>

        <div className={styles.qKicker}>Hang tight, {firstName}</div>
        <h2>Putting your estimate together…</h2>

        <ol className={styles.calcSteps}>
          {CALCULATING_STEPS.map((step, index) => {
            const state =
              index < activeStep
                ? "done"
                : index === activeStep
                  ? "active"
                  : "waiting";
            return (
              <li key={step.label} data-state={state}>
                <span className={styles.calcIcon} aria-hidden="true">
                  {state === "done" ? "✓" : index + 1}
                </span>
                {step.label}
                <span className="sr-only">
                  {state === "done"
                    ? " (done)"
                    : state === "active"
                      ? " (in progress)"
                      : ""}
                </span>
              </li>
            );
          })}
        </ol>

        <p className={styles.calcNote}>
          A copy will land in <strong>{email}</strong>.
        </p>
      </div>
    </section>
  );
}
