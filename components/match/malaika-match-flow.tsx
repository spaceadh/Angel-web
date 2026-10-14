"use client";

import Link from "next/link";
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
import { MatchContact, type ContactSubmission } from "./match-contact";
import { MatchCalculating, CALCULATING_TOTAL_MS } from "./match-calculating";
import { MatchResult } from "./match-result";
import styles from "./match.module.css";

import logo from "@/assets/malaika-full-logo.svg";

const STORAGE_KEY = "malaika_match_state_v1";

type ScreenName = "intro" | "quiz" | "contact" | "calculating" | "result";
export type EmailStatus = "sent" | "failed" | "skipped";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function MalaikaMatchFlow() {
  const [screen, setScreen] = useState<ScreenName>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MatchAnswers>({});
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [result, setResult] = useState<MatchResultPayload | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string>();
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("skipped");

  // Each screen starts at the top, especially the long result page.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [screen]);

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

  function handleContactSubmit(submission: ContactSubmission) {
    const { turnstileToken, website, ...contactData } = submission;
    setContact(contactData);
    setSubmitError(undefined);
    setScreen("calculating");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const source =
      new URLSearchParams(window.location.search).get("source") ?? undefined;

    startTransition(async () => {
      try {
        // The reveal sequence always plays in full so the result feels earned,
        // and it hides any network or email-sending delay.
        const [res] = await Promise.all([
          fetch("/api/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answers,
              contact: contactData,
              turnstileToken,
              website,
              source,
            }),
          }),
          wait(reducedMotion ? 900 : CALCULATING_TOTAL_MS + 300),
        ]);

        const data = await res.json();
        if (data.success && data.result) {
          setResult(data.result);
          setSessionId(data.sessionId);
          setEmailStatus(data.emailStatus ?? "skipped");
          setScreen("result");
          trackGaEvent("match_result_revealed", {
            score: data.result.score,
            category: data.result.category,
            email_status: data.emailStatus,
          });
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
        } else {
          setSubmitError(
            data.error ||
              "Something went wrong preparing your estimate. Please try again.",
          );
          setScreen("contact");
        }
      } catch (err) {
        console.error("Match submission error:", err);
        setSubmitError(
          "We couldn't reach our server. Please check your connection and try again.",
        );
        setScreen("contact");
      }
    });
  }

  function handleBackFromContact() {
    setCurrentIndex(questions.length - 1);
    setScreen("quiz");
  }

  function handleRestart() {
    setSubmitError(undefined);
    setEmailStatus("skipped");
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
        <Link
          href="/"
          className={styles.brand}
          aria-label="Malaika Studios home"
        >
          <img
            src={logo.src}
            alt="Malaika Studios"
            className={styles.brandLogo}
          />
        </Link>
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
            onBack={handleBackFromContact}
            isSubmitting={isPending}
            serverError={submitError}
            initialContact={contact}
          />
        )}

        {screen === "calculating" && contact && (
          <MatchCalculating name={contact.name} email={contact.email} />
        )}

        {screen === "result" && result && (
          <MatchResult
            result={result}
            contactEmail={contact?.email}
            contactName={contact?.name}
            emailStatus={emailStatus}
            sessionId={sessionId}
            onRestart={handleRestart}
            onSelectPriceResponse={handlePriceResponse}
          />
        )}
      </main>
    </div>
  );
}
