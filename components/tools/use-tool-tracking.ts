"use client";

import { useRef } from "react";
import {
  getPageContext,
  trackEvent,
} from "@/components/analytics/consent-and-analytics";

/** Sends one `tool_used` event the first time someone changes an input. */
export function useToolTracking(tool: string) {
  const sent = useRef(false);
  return () => {
    if (sent.current) return;
    sent.current = true;
    trackEvent("tool_used", { ...getPageContext(), tool_name: tool });
  };
}

/** "KSh 1,250" or "KSh 27.50" when there are cents. */
export function kes(amount: number) {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return `KSh ${amount.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
