"use client";

import { useEffect, useRef, useState } from "react";
import { ContactInfo, normalisePhone } from "@/lib/malaika-match/config";
import styles from "./match.module.css";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const turnstileScriptId = "cf-turnstile-script";

export type ContactSubmission = ContactInfo & {
  turnstileToken?: string;
  website?: string;
};

interface MatchContactProps {
  onSubmitContact: (contact: ContactSubmission) => void;
  onBack: () => void;
  isSubmitting?: boolean;
  serverError?: string;
  initialContact?: ContactInfo | null;
}

export function MatchContact({
  onSubmitContact,
  onBack,
  isSubmitting = false,
  serverError,
  initialContact,
}: MatchContactProps) {
  const [name, setName] = useState(initialContact?.name ?? "");
  const [email, setEmail] = useState(initialContact?.email ?? "");
  const [phone, setPhone] = useState(initialContact?.phone ?? "");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const turnstileRef = useRef<HTMLDivElement>(null);

  // Cloudflare Turnstile: invisible to most people, blocks bots from using
  // the form to send estimate emails to strangers.
  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;
    let widgetId: string | undefined;
    const element = turnstileRef.current;

    const render = () => {
      if (!window.turnstile || widgetId) return;
      widgetId = window.turnstile.render(element, {
        sitekey: turnstileSiteKey,
        appearance: "interaction-only",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(undefined),
        "error-callback": () => setTurnstileToken(undefined),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      let script = document.getElementById(
        turnstileScriptId,
      ) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = turnstileScriptId;
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
    }

    return () => {
      document
        .getElementById(turnstileScriptId)
        ?.removeEventListener("load", render);
      if (widgetId) window.turnstile?.remove(widgetId);
      widgetId = undefined;
    };
  }, []);

  function fail(message: string) {
    setError(message);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) return fail("Please tell us your name.");
    if (!normalisePhone(phone)) {
      return fail(
        "That WhatsApp number doesn't look right. Try 0712 345 678 or +254 712 345 678.",
      );
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return fail("That email address doesn't look right. Please check it.");
    }

    onSubmitContact({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      turnstileToken,
      website: honeypot || undefined,
    });
  }

  const shownError = error || serverError;

  return (
    <section className={styles.screen}>
      <div className={`${styles.transitionWrap} ${styles.fadeIn}`}>
        <div className={styles.qKicker}>Last step · Your estimate is ready</div>
        <h2>
          Where can we <span className={styles.blue}>reach you?</span>
        </h2>
        <p>
          Your estimate shows on the next screen: three ways to build it, with
          real prices, and our recommendation. Add your email if you&apos;d like
          a copy to share with your team.
        </p>

        <ul className={styles.contactPerks} aria-label="What you'll get">
          <li>Match score</li>
          <li>3 priced options</li>
          <li>Our recommendation</li>
        </ul>

        <form
          className={`${styles.form} ${isShaking ? styles.shake : ""}`}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.field}>
            <label htmlFor="name">Your name *</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="e.g. Wanjiku Kamau"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">WhatsApp number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={30}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">
              Email{" "}
              <span className={styles.optional}>(optional, for a copy)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@business.co.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
            />
          </div>

          {/* Honeypot: hidden from people and screen readers; bots fill it. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {turnstileSiteKey && <div ref={turnstileRef} />}

          {shownError && (
            <div className={styles.error} role="alert">
              {shownError}
            </div>
          )}

          <div className={styles.submitRow}>
            <button
              type="submit"
              className={styles.cta}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Preparing your estimate…" : "Show my estimate →"}
            </button>
            <div className={styles.micro} style={{ justifyContent: "center" }}>
              We only use your details to follow up about this project. No spam.
            </div>
          </div>
        </form>

        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Change my answers
        </button>
      </div>
    </section>
  );
}
