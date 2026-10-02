"use client";

import { useState, useEffect, useTransition } from "react";
import {
  BASE_QUESTIONS,
  OFFERING_QUESTIONS,
  COMMON_QUESTIONS,
  Question,
  MatchAnswers,
  ContactInfo,
  MatchResultPayload,
} from "@/lib/malaika-match/config";
import { MatchHero } from "./match-hero";
import { MatchQuiz } from "./match-quiz";
import { MatchContact } from "./match-contact";
import { MatchResult } from "./match-result";
import styles from "./match.module.css";

import logo from "@/assets/malaika-full-logo.svg";

const STORAGE_KEY = "malaika_match_state_v1";

type ScreenName = "intro" | "quiz" | "contact" | "result";

export function MalaikaMatchFlow() {
  const [screen, setScreen] = useState<ScreenName>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MatchAnswers>({});
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [result, setResult] = useState<MatchResultPayload | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  // Restore draft state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          setAnswers(parsed.answers);
        }
      }
    } catch (err) {
      console.warn("Could not restore local match state:", err);
    }
  }, []);

  // Save answers draft to localStorage
  useEffect(() => {
    try {
      if (Object.keys(answers).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers }));
      }
    } catch (err) {
      console.warn("Could not save local match state:", err);
    }
  }, [answers]);

  // Compute question list based on dynamic offering choice
  const questions: Question[] = [
    ...BASE_QUESTIONS,
    ...(answers.offering ? OFFERING_QUESTIONS[answers.offering] || [] : []),
    ...COMMON_QUESTIONS,
  ];

  function trackGaEvent(eventName: string, params?: Record<string, unknown>) {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gtag?: Function }).gtag
    ) {
      (window as unknown as { gtag: Function }).gtag(
        "event",
        eventName,
        params,
      );
    }
  }

  function handleStart() {
    trackGaEvent("match_started");
    setCurrentIndex(0);
    setScreen("quiz");
  }

  function handleSelectOption(key: string, value: string, isMulti?: boolean) {
    setAnswers((prev) => {
      if (isMulti) {
        const currentArr = Array.isArray(prev[key])
          ? (prev[key] as string[])
          : [];
        const nextArr = currentArr.includes(value)
          ? currentArr.filter((v) => v !== value)
          : [...currentArr, value];
        return { ...prev, [key]: nextArr };
      }
      return { ...prev, [key]: value };
    });
  }

  function handleNextQuestion() {
    trackGaEvent("match_question_completed", {
      question_index: currentIndex,
      total_questions: questions.length,
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      trackGaEvent("match_contact_captured");
      setScreen("contact");
    }
  }

  function handleBackQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleContactSubmit(contactData: ContactInfo) {
    setContact(contactData);

    startTransition(async () => {
      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            contact: contactData,
          }),
        });

        const data = await res.json();
        if (data.success && data.result) {
          setResult(data.result);
          setSessionId(data.sessionId);
          setScreen("result");
          trackGaEvent("match_result_revealed", {
            score: data.result.score,
            category: data.result.category,
          });
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
        } else {
          alert(
            data.error ||
              "Something went wrong calculating your match. Please try again.",
          );
        }
      } catch (err) {
        console.error("Match submission error:", err);
        alert(
          "Unable to complete submission right now. Please check your network and try again.",
        );
      }
    });
  }

  function handleRestart() {
    setAnswers({});
    setContact(null);
    setResult(null);
    setCurrentIndex(0);
    setScreen("intro");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  function handlePriceResponse(responseKey: string) {
    trackGaEvent("match_price_response_selected", {
      price_response: responseKey,
    });
  }

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <a href="/" className={styles.brand} aria-label="Malaika Studios home">
          <img
            src={logo.src}
            alt="Malaika Studios"
            className={styles.brandLogo}
          />
        </a>
        <div className={styles.topNote}>The Malaika Match</div>
      </header>

      <main className={styles.main}>
        {screen === "intro" && <MatchHero onStart={handleStart} />}

        {screen === "quiz" && (
          <MatchQuiz
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
            onBack={handleBackQuestion}
          />
        )}

        {screen === "contact" && (
          <MatchContact
            onSubmitContact={handleContactSubmit}
            isSubmitting={isPending}
          />
        )}

        {screen === "result" && result && (
          <MatchResult
            result={result}
            contactEmail={contact?.email}
            sessionId={sessionId}
            onRestart={handleRestart}
            onSelectPriceResponse={handlePriceResponse}
          />
        )}
      </main>
    </div>
  );
}
