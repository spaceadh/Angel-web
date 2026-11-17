"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
    Brevo?: unknown[];
  }
}

const consentKey = "malaika-analytics-consent";
// A GA measurement ID is public by design. The environment variable lets each
// deployment override this value while keeping production measurement active.
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XHNJHFGC3B";
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const brevoClientKey = "v2b1m4jxleys2rcw6pf0bfqb";
let gaInitialised = false;
let marketingInitialised = false;
let analyticsReady = false;

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/**
 * GA4 runs for every visitor using Google Consent Mode. Until someone taps
 * "Accept analytics", storage is denied, so GA4 sends cookieless pings with
 * no visitor ID. Accepting upgrades it to normal measurement with cookies.
 */
function initialiseGa(granted: boolean) {
  if (gaInitialised || !gaId) return;
  gaInitialised = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the `arguments` object, so this must be a plain function.
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: granted ? "granted" : "denied",
    // No Google Ads on this site, so advertising storage stays off.
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  // Route changes are reported explicitly in AnalyticsPageViews, so the
  // initial page isn't counted twice.
  window.gtag("config", gaId, { anonymize_ip: true, send_page_view: false });
  loadScript(
    "malaika-ga4",
    `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
  );

  analyticsReady = true;
  window.dispatchEvent(new Event("malaika:analytics-ready"));
}

export function isAnalyticsReady() {
  return analyticsReady;
}

/** Meta Pixel and Brevo identify visitors, so they only load after consent. */
function initialiseMarketing() {
  if (marketingInitialised) return;
  marketingInitialised = true;

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

  // Brevo web tracking is a marketing tracker, so it waits for consent too.
  window.Brevo = window.Brevo || [];
  window.Brevo.push(["init", { client_key: brevoClientKey }]);
  loadScript("malaika-brevo", "https://cdn.brevo.com/js/sdk-loader.js");
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
  // GA4 itself respects the consent state (cookieless until accepted).
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
        : path.startsWith("/blog/")
          ? "blog_post"
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
  const eventId = crypto.randomUUID();
  const parameters = {
    ...getPageContext(),
    lead_channel: "whatsapp",
    cta_placement: placement,
  };
  trackEvent("generate_lead", parameters);
  // Meta only hears about the lead from visitors who accepted.
  if (!hasAnalyticsConsent()) return;
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
    initialiseGa(saved === "granted");
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
    if (choice === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      initialiseMarketing();
    } else if (choice === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      window.fbq?.("consent", "revoke");
    }
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
