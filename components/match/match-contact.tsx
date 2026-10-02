"use client";

import { useState } from "react";
import { ContactInfo } from "@/lib/malaika-match/config";
import styles from "./match.module.css";

interface MatchContactProps {
  onSubmitContact: (contact: ContactInfo) => void;
  isSubmitting?: boolean;
}

export function MatchContact({
  onSubmitContact,
  isSubmitting = false,
}: MatchContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !email.includes("@")) {
      setError("Please provide your name and a valid email address.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    onSubmitContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
    });
  }

  return (
    <section className={styles.screen}>
      <div className={`${styles.transitionWrap} ${styles.fadeIn}`}>
        <div className={styles.qKicker}>ALMOST THERE</div>
        <h2>
          Where should we send your{" "}
          <span style={{ color: "var(--blue, #2563ff)" }}>match details?</span>
        </h2>
        <p>
          We’ve calculated your project fit score and shaped three build options
          around your brief. Tell us who you are so we can reveal your
          breakdown.
        </p>

        <form
          className={`${styles.form} ${isShaking ? styles.shake : ""}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.field}>
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              placeholder="sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Phone / WhatsApp (Optional)</label>
            <input
              type="tel"
              id="phone"
              placeholder="+254 700 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.submitRow}>
            <button
              type="submit"
              className={styles.cta}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Calculating Match..."
                : "Reveal My Match Results →"}
            </button>
            <div className={styles.micro} style={{ justifyContent: "center" }}>
              <span>🔒</span> We’ll email you a summary copy of your results as
              well.
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
