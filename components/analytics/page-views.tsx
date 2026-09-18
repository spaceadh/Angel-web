"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "./consent-and-analytics";

export function AnalyticsPageViews() {
  const pathname = usePathname();
  useEffect(() => {
    const pageType = pathname.startsWith("/services/")
      ? "service"
      : pathname.startsWith("/our-work/work/")
        ? "case_study"
        : "site_page";
    trackEvent("page_view", { page_path: pathname, page_type: pageType });
    if (pageType === "service")
      trackEvent("service_view", {
        service_slug: pathname.split("/").at(-1) ?? "",
      });
    if (pageType === "case_study")
      trackEvent("case_study_view", {
        case_study_slug: pathname.split("/").at(-1) ?? "",
      });
    if (pathname === "/contact") trackEvent("contact_view");
  }, [pathname]);
  return null;
}
