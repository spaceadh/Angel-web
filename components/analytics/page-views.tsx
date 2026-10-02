"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "./consent-and-analytics";

export function AnalyticsPageViews() {
  const pathname = usePathname();
  const [isAnalyticsReady, setIsAnalyticsReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsAnalyticsReady(true);
    window.addEventListener("malaika:analytics-ready", handleReady);
    return () =>
      window.removeEventListener("malaika:analytics-ready", handleReady);
  }, []);

  useEffect(() => {
    if (!isAnalyticsReady) return;
    const pageType = pathname.startsWith("/services/")
      ? "service"
      : pathname.startsWith("/our-work/work/")
        ? "case_study"
        : "site_page";
    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      page_type: pageType,
    });
    if (pageType === "service")
      trackEvent("service_view", {
        service_slug: pathname.split("/").at(-1) ?? "",
      });
    if (pageType === "case_study")
      trackEvent("case_study_view", {
        case_study_slug: pathname.split("/").at(-1) ?? "",
      });
    if (pathname === "/contact") trackEvent("contact_view");
  }, [isAnalyticsReady, pathname]);
  return null;
}
