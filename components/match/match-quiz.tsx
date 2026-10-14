"use client";

import { useEffect, useRef } from "react";

/** Lets the chosen option light up before the next question slides in. */
const ADVANCE_DELAY_MS = 220;
import { Question, MatchAnswers } from "@/lib/malaika-match/config";
import styles from "./match.module.css";

interface MatchQuizProps {
  questions: Question[];
  currentIndex: number;
  answers: MatchAnswers;
  onSelectOption: (key: string, value: string, isMulti?: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MatchQuiz({
  questions,
  currentIndex,
  answers,
  onSelectOption,
  onNext,
  onBack,
}: MatchQuizProps) {
  const currentQuestion = questions[currentIndex];
  const advancing = useRef(false);

  useEffect(() => {
    advancing.current = false;
  }, [currentIndex]);

  function choose(value: string) {
    if (!currentQuestion || advancing.current) return;
    onSelectOption(currentQuestion.key, value, currentQuestion.multi);
    if (!currentQuestion.multi) {
      advancing.current = true;
      setTimeout(onNext, ADVANCE_DELAY_MS);
    }
  }
  const total = questions.length;

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.key]
    : undefined;
  const isMulti = currentQuestion?.multi;
  const selectedValues = isMulti
    ? Array.isArray(currentAnswer)
      ? currentAnswer
      : []
    : currentAnswer;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!currentQuestion) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= currentQuestion.options.length) {
        choose(currentQuestion.options[num - 1].value);
      } else if (e.key === "Backspace" && currentIndex > 0) {
        onBack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, currentIndex, onSelectOption, onNext, onBack]);

  if (!currentQuestion) return null;

  const progressPercent = ((currentIndex + 1) / total) * 100;

  return (
    <section className={styles.screen}>
      <div className={styles.quizWrap}>
        <div className={styles.progressRow}>
          <div className={styles.progressBadge}>
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div
            className={styles.tip}
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            Question {currentIndex + 1} of {total}
          </div>
        </div>

        <div className={styles.fadeIn} key={currentQuestion.key}>
          <div className={styles.qKicker}>
            Question {String(currentIndex + 1).padStart(2, "0")}
          </div>
          <h2 className={styles.question}>{currentQuestion.title}</h2>
          {currentQuestion.help && (
            <p className={styles.qHelp}>{currentQuestion.help}</p>
          )}

          <div
            className={styles.options}
            role="group"
            aria-label={currentQuestion.title}
          >
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = isMulti
                ? (selectedValues as string[]).includes(opt.value)
                : selectedValues === opt.value;

              return (
                <button
                  key={opt.value}
                  className={`${styles.option} ${isSelected ? styles.selected : ""}`}
                  onClick={() => choose(opt.value)}
                  type="button"
                  aria-pressed={isSelected}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={styles.num}>{idx + 1}</span>
                    <span className={styles.optionText}>{opt.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={styles.keyHint}>Key {idx + 1}</span>
                    <span className={styles.optionArrow}>
                      {isMulti ? "+" : "→"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {isMulti ? (
            <div className={styles.navRow}>
              <button
                className={styles.backBtn}
                onClick={onBack}
                disabled={currentIndex === 0}
                type="button"
              >
                ← Back
              </button>
              <button
                className={styles.cta}
                onClick={onNext}
                disabled={!(selectedValues as string[]).length}
                type="button"
                style={{ padding: "12px 24px", fontSize: "14px" }}
              >
                Continue →
              </button>
              <div className={styles.tip}>💡 Select all that apply</div>
            </div>
          ) : (
            <div className={styles.navRow}>
              <button
                className={styles.backBtn}
                onClick={onBack}
                disabled={currentIndex === 0}
                type="button"
              >
                ← Back
              </button>
              <div className={styles.tip}>
                💡 Press number keys or click an option
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
