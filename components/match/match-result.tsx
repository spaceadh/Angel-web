"use client";

import { useState } from "react";
import { MatchResultPayload } from "@/lib/malaika-match/config";
import styles from "./match.module.css";

interface MatchResultProps {
  result: MatchResultPayload;
  contactEmail?: string;
  sessionId?: string;
  onRestart: () => void;
  onSelectPriceResponse?: (responseKey: string) => void;
}

export function MatchResult({
  result,
  contactEmail,
  sessionId,
  onRestart,
  onSelectPriceResponse
}: MatchResultProps) {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [responseLogged, setResponseLogged] = useState(false);

  const priceResponseOptions = [
    { key: "good_start", label: "That feels like a good place to start" },
    { key: "shape_scope", label: "We’re close — can we shape the scope?" },
    { key: "not_right_yet", label: "Not quite right for us yet" }
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
            sessionId
          })
        });
      } catch (err) {
        console.warn("Failed to submit price response event:", err);
      }
    }
  }

  return (
    <section className={styles.screen}>
      <div className={`${styles.resultContainer} ${styles.fadeIn}`}>
        <div className={styles.reveal}>
          {/* BLOCK 01 — THE MATCH */}
          <section className={`${styles.revealBlock} ${styles.matchReveal}`}>
            <div>
              <div className={styles.revealKicker}>
                <i /> 01 · The Match
              </div>
              <h2 dangerouslySetInnerHTML={{ __html: result.headline }} />
              <p className={styles.revealLede}>{result.lede}</p>
            </div>
            <div className={styles.matchScoreArt} aria-label="Malaika Match score">
              <span className={styles.score}>{result.score}%</span>
              <span className={styles.scoreLabel}>{result.category}</span>
              <div className={styles.scribble} />
            </div>
          </section>

          {/* BLOCK 02 — WE UNDERSTOOD YOUR BRIEF */}
          <section className={styles.revealBlock}>
            <div className={styles.revealKicker}>
              <i /> 02 · We understood your brief
            </div>
            <h3 className={styles.briefHeading}>
              Here's what we know about <span className="blue">{result.brief.business}.</span>
            </h3>
            <p className={styles.briefSub}>
              You told us what you're building. We translated that into a practical direction.
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
          <section className={styles.revealBlock}>
            <div className={styles.revealKicker}>
              <i /> 03 · Three ways to build it
            </div>
            <div className={styles.configHeading}>
              <h3>Three tailored configurations.</h3>
              <p>Same goal. Different levels of scope, detail and investment.</p>
            </div>
            <div className={styles.configGrid}>
              {result.configs.map((c, i) => {
                const isRec = i === 1 || c.tag === "Recommended";
                return (
                  <article
                    key={c.name}
                    className={`${styles.configCard} ${isRec ? styles.recommended : ""}`}
                  >
                    {isRec && <span className={styles.recommendedBadge}>Recommended</span>}
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
                    <div className={styles.configLink}>See what changes →</div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* BLOCK 04 — OUR RECOMMENDATION */}
          <section className={`${styles.revealBlock} ${styles.recommendation}`}>
            <div className={styles.revealKicker}>
              <i /> 04 · Our recommendation
            </div>
            <div className={styles.recGrid}>
              <div>
                <h3 className={styles.recTitle}>
                  {result.recommendation.name}
                  <br />
                  <span className={styles.recPrice}>{result.recommendation.price}</span>
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
          <section className={`${styles.revealBlock} ${styles.finalReveal}`}>
            <div className={styles.revealKicker}>
              <i /> 05 · Let's build it
            </div>
            <h3>
              This feels like the <span className="blue">right direction.</span>
            </h3>
            <p>Let's talk about the project and fine-tune the details together.</p>

            <div className={styles.resultActions}>
              <a
                className={styles.cta}
                href={result.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start the conversation →
              </a>
              <button className={styles.secondaryBtn} onClick={onRestart} type="button">
                Start over
              </button>
            </div>

            {/* Price response choices */}
            <div className={styles.priceResponses}>
              <span className={styles.respTitle}>How does this direction feel to you?</span>
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

            <p className={styles.finalNote}>No commitment. Just a conversation about the project.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
