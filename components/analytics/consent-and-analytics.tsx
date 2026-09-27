"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const consentKey = "malaika-analytics-consent";
// A GA measurement ID is public by design. The environment variable lets each
// deployment override this value while keeping production measurement active.
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-MYY8S3XWWE";
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
let analyticsInitialised = false;

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initialiseAnalytics() {
  if (analyticsInitialised) return;
  analyticsInitialised = true;

  if (gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    // Route changes are reported explicitly in AnalyticsPageViews. This avoids
    // GA4 counting the initial page twice after a visitor grants consent.
    window.gtag("config", gaId, { anonymize_ip: true, send_page_view: false });
    loadScript(
      "malaika-ga4",
      `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
    );
  }

  if (metaPixelId && !window.fbq) {
    const fbq = (...args: unknown[]) => {
      (fbq as typeof fbq & { queue: unknown[][] }).queue.push(args);
    };
    (
      fbq as typeof fbq & {
        queue: unknown[][];
        loaded: boolean;
        version: string;
      }
    ).queue = [];
    (
      fbq as typeof fbq & {
        queue: unknown[][];
        loaded: boolean;
        version: string;
      }
    ).loaded = true;
    (
      fbq as typeof fbq & {
        queue: unknown[][];
        loaded: boolean;
        version: string;
      }
    ).version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
    loadScript(
      "malaika-meta-pixel",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
  }

  window.dispatchEvent(new Event("malaika:analytics-ready"));
}

export function hasAnalyticsConsent() {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem(consentKey) === "granted"
  );
}

export function trackEvent(
  name: string,
  parameters: Record<string, string> = {},
) {
  if (!hasAnalyticsConsent()) return;
  window.gtag?.("event", name, parameters);
}

export function getPageContext() {
  const path = location.pathname;
  const context: Record<string, string> = {
    page_path: path,
    page_title: document.title,
    page_type: path.startsWith("/services/")
      ? "service"
      : path.startsWith("/our-work/work/")
        ? "case_study"
        : path === "/contact"
          ? "contact"
          : "site_page",
  };
  if (path.startsWith("/services/")) {
    context.service_slug = path.split("/").at(-1) ?? "";
  }
  if (path.startsWith("/our-work/work/")) {
    context.case_study_slug = path.split("/").at(-1) ?? "";
  }
  return context;
}

export async function trackWhatsappLead(placement: string) {
  if (!hasAnalyticsConsent()) return;
  const eventId = crypto.randomUUID();
  const parameters = {
    ...getPageContext(),
    lead_channel: "whatsapp",
    cta_placement: placement,
  };
  trackEvent("generate_lead", parameters);
  window.fbq?.("track", "Contact", parameters, { eventID: eventId });
  await fetch("/api/meta/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventId,
      eventSourceUrl: location.href,
      consent: true,
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
    }),
  }).catch(() => undefined);
}

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((value) => value.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

export function ConsentAndAnalytics() {
  const [choice, setChoice] = useState<"unknown" | "granted" | "denied">(
    "unknown",
  );

  useEffect(() => {
    const saved = localStorage.getItem(consentKey);
    const frame = requestAnimationFrame(() => {
      if (saved === "granted" || saved === "denied") setChoice(saved);
    });
    const openSettings = () => setChoice("unknown");
    window.addEventListener("malaika:open-consent", openSettings);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("malaika:open-consent", openSettings);
    };
  }, []);

  useEffect(() => {
    if (choice === "granted") initialiseAnalytics();
  }, [choice]);

  const save = (value: "granted" | "denied") => {
    localStorage.setItem(consentKey, value);
    setChoice(value);
  };

  if (choice !== "unknown") return null;
  return (
    <aside className="consentBanner" aria-label="Cookie preferences">
      <p>
        We use optional analytics to understand site use and improve our
        marketing. You can change this choice anytime.
      </p>
      <div className="consentActions">
        <button type="button" onClick={() => save("denied")}>
          Only essential
        </button>
        <button type="button" onClick={() => save("granted")}>
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
