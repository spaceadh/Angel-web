"use client";

import { useEffect, useRef, useState } from "react";
import { MatchResultPayload } from "@/lib/malaika-match/config";
import { site } from "@/lib/site";
import type { EmailStatus } from "./malaika-match-flow";
import styles from "./match.module.css";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Counts the score up from zero once, easing out. */
function useCountUp(target: number, durationMs = 1400) {
  // The result only renders after user interaction, so window is available.
  const [value, setValue] = useState(() =>
    prefersReducedMotion() ? target : 0,
  );
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);
  return value;
}

/** Adds data-visible to each reveal block as it scrolls into view. */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const blocks = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!blocks?.length) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      blocks.forEach((block) => (block.dataset.visible = "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function optionWhatsappUrl(name: string, price: string) {
  const text = `Hi Malaika Studios, I just did the Malaika Match and I'd like to talk about the ${name} option (${price}).`;
  return `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

interface MatchResultProps {
  result: MatchResultPayload;
  contactEmail?: string;
  contactName?: string;
  emailStatus?: EmailStatus;
  sessionId?: string;
  onRestart: () => void;
  onSelectPriceResponse?: (responseKey: string) => void;
}

export function MatchResult({
  result,
  contactEmail,
  contactName,
  emailStatus = "skipped",
  sessionId,
  onRestart,
  onSelectPriceResponse,
}: MatchResultProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [responseLogged, setResponseLogged] = useState(false);
  const score = useCountUp(result.score);
  const revealRef = useScrollReveal();
  const firstName = contactName?.split(/\s+/)[0];

  const priceResponseOptions = [
    { key: "good_start", label: "That feels like a good place to start" },
    { key: "shape_scope", label: "We’re close — can we shape the scope?" },
    { key: "not_right_yet", label: "Not quite right for us yet" },
  ];

  async function handleResponseClick(key: string) {
    setSelectedResponse(key);
    if (onSelectPriceResponse) {
      onSelectPriceResponse(key);
    }
    if (contactEmail && !responseLogged) {
      setResponseLogged(true);
      try {
        await fetch("/api/match/response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: contactEmail,
            priceResponse: key,
            sessionId,
          }),
        });
      } catch (err) {
        console.warn("Failed to submit price response event:", err);
      }
    }
  }

  return (
    <section className={styles.screen}>
      <div className={`${styles.resultContainer} ${styles.fadeIn}`}>
        {emailStatus === "sent" && contactEmail && (
          <div className={styles.emailBanner} role="status">
            <span aria-hidden="true">📩</span>
            <p>
              <strong>Sent!</strong> A copy of this estimate is on its way to{" "}
              <strong>{contactEmail}</strong>. Not there in a few minutes? Check
              your Promotions or Spam folder.
            </p>
          </div>
        )}
        {emailStatus === "failed" && (
          <div
            className={`${styles.emailBanner} ${styles.emailBannerWarn}`}
            role="status"
          >
            <span aria-hidden="true">⚠️</span>
            <p>
              We couldn&apos;t email your copy just now, but your estimate is
              below and our team has your details.{" "}
              <a
                href={result.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on WhatsApp
              </a>{" "}
              and we&apos;ll send it over.
            </p>
          </div>
        )}
        <div className={styles.reveal} ref={revealRef}>
          {/* BLOCK 01 — THE MATCH */}
          <section
            className={`${styles.revealBlock} ${styles.matchReveal}`}
            data-reveal
            data-visible="true"
          >
            <div>
              <div className={styles.revealKicker}>
                <i /> 01 · The Match
              </div>
              {firstName && (
                <p className={styles.greeting}>
                  {firstName}, here&apos;s your estimate.
                </p>
              )}
              <h2 dangerouslySetInnerHTML={{ __html: result.headline }} />
              <p className={styles.revealLede}>{result.lede}</p>
            </div>
            <div
              className={styles.matchScoreArt}
              role="img"
              aria-label={`Malaika Match score: ${result.score}%, ${result.category}`}
            >
              <span className={styles.score} aria-hidden="true">
                {score}%
              </span>
              <span className={styles.scoreLabel}>{result.category}</span>
              <div className={styles.scribble} />
            </div>
          </section>

          {/* BLOCK 02 — WE UNDERSTOOD YOUR BRIEF */}
          <section className={styles.revealBlock} data-reveal>
            <div className={styles.revealKicker}>
              <i /> 02 · We understood your brief
            </div>
            <h3 className={styles.briefHeading}>
              Here's what we know about{" "}
              <span className="blue">{result.brief.business}.</span>
            </h3>
            <p className={styles.briefSub}>
              You told us what you're building. We translated that into a
              practical direction.
            </p>
            <div className={styles.briefGrid}>
              <div className={styles.briefItem}>
                <span className={styles.icon}>✦</span>
                <span className={styles.label}>Your Business</span>
                <span className={styles.value}>{result.brief.business}</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.icon}>↗</span>
                <span className={styles.label}>What You Need</span>
                <span className={styles.value}>{result.brief.offering}</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.icon}>✦</span>
                <span className={styles.label}>What Success Looks Like</span>
                <span className={styles.value}>{result.brief.outcome}</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.icon}>◌</span>
                <span className={styles.label}>Investment Territory</span>
                <span className={styles.value}>{result.brief.investment}</span>
              </div>
            </div>
          </section>

          {/* BLOCK 03 — THREE WAYS TO BUILD IT */}
          <section className={styles.revealBlock} data-reveal>
            <div className={styles.revealKicker}>
              <i /> 03 · Three ways to build it
            </div>
            <div className={styles.configHeading}>
              <h3>Three tailored configurations.</h3>
              <p>
                Same goal. Different levels of scope, detail and investment.
              </p>
            </div>
            <div className={styles.configGrid}>
              {result.configs.map((c, i) => {
                const isRec = i === 1 || c.tag === "Recommended";
                return (
                  <article
                    key={c.name}
                    className={`${styles.configCard} ${isRec ? styles.recommended : ""}`}
                  >
                    {isRec && (
                      <span className={styles.recommendedBadge}>
                        Recommended
                      </span>
                    )}
                    <div className={styles.configNum}>0{i + 1}</div>
                    <h4>{c.name}</h4>
                    <div className={styles.configPrice}>{c.price}</div>
                    <div className={styles.configTagline}>
                      {i === 0
                        ? "The smallest sensible version."
                        : i === 1
                          ? "The balanced version for your brief."
                          : "More depth, sophistication and room to grow."}
                    </div>
                    <ul className={styles.configList}>
                      {c.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a
                      className={styles.configLink}
                      href={optionWhatsappUrl(c.name, c.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Talk about this option →
                    </a>
                  </article>
                );
              })}
            </div>
          </section>

          {/* BLOCK 04 — OUR RECOMMENDATION */}
          <section
            className={`${styles.revealBlock} ${styles.recommendation}`}
            data-reveal
          >
            <div className={styles.revealKicker}>
              <i /> 04 · Our recommendation
            </div>
            <div className={styles.recGrid}>
              <div>
                <h3 className={styles.recTitle}>
                  {result.recommendation.name}
                  <br />
                  <span className={styles.recPrice}>
                    {result.recommendation.price}
                  </span>
                </h3>
                <p className={styles.recCopy}>{result.recommendationCopy}</p>
              </div>
              <div>
                <div className={styles.recReasons}>
                  {result.recommendationReasons.map((r) => (
                    <div key={r} className={styles.recReason}>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.recSpecs}>
              {result.recommendationSpecs.map(([val, lbl]) => (
                <div key={lbl} className={styles.recSpec}>
                  <strong>{val}</strong>
                  <span>{lbl}</span>
                </div>
              ))}
            </div>
          </section>

          {/* BLOCK 05 — LET'S BUILD IT */}
          <section
            className={`${styles.revealBlock} ${styles.finalReveal}`}
            data-reveal
          >
            <div className={styles.revealKicker}>
              <i /> 05 · Let's build it
            </div>
            <h3>
              This feels like the <span className="blue">right direction.</span>
            </h3>
            <p>
              Let's talk about the project and fine-tune the details together.
            </p>

            <div className={styles.resultActions}>
              <a
                className={styles.cta}
                href={result.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start the conversation →
              </a>
              <button
                className={styles.secondaryBtn}
                onClick={onRestart}
                type="button"
              >
                Start over
              </button>
            </div>

            {/* Price response choices */}
            <div className={styles.priceResponses}>
              <span className={styles.respTitle}>
                How does this direction feel to you?
              </span>
              <div className={styles.respBtns}>
                {priceResponseOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    className={`${styles.respBtn} ${
                      selectedResponse === opt.key ? styles.activeResp : ""
                    }`}
                    onClick={() => handleResponseClick(opt.key)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedResponse && (
              <p className={styles.respThanks} role="status">
                {selectedResponse === "good_start"
                  ? "Great. We'll be in touch shortly to plan next steps."
                  : selectedResponse === "shape_scope"
                    ? "Noted. We'll suggest a few ways to shape the scope to fit."
                    : "Thanks for being honest. We'll share some lighter ways to get started."}
              </p>
            )}

            <p className={styles.finalNote}>
              No commitment. Just a conversation about the project.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
