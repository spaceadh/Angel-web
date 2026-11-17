"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ComponentProps } from "react";
import {
  getPageContext,
  trackEvent,
  trackWhatsappLead,
} from "./consent-and-analytics";
import { site } from "@/lib/site";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { placement: string };

export function TrackedWhatsappLink({ placement, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) void trackWhatsappLead(placement);
      }}
    />
  );
}

export function TrackedEmailLink({
  onClick,
  ...props
}: Omit<Props, "placement">) {
  return (
    <a
      {...props}
      href={`mailto:${site.email}`}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented)
          trackEvent("email_click", {
            ...getPageContext(),
            lead_channel: "email",
          });
      }}
    />
  );
}

const matchSourceKey = "malaika-match-source";

/**
 * Link to /match without a `?source=` query, so search engines see one URL.
 * The placement is kept for the lead record (sessionStorage) and sent to GA.
 */
export function MatchLink({
  placement,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { placement: string }) {
  return (
    <Link
      {...props}
      href="/match"
      onClick={(event) => {
        onClick?.(event);
        try {
          sessionStorage.setItem(matchSourceKey, placement);
        } catch {
          // Storage can be blocked; the lead just has no placement then.
        }
        trackEvent("match_cta_click", {
          ...getPageContext(),
          cta_placement: placement,
        });
      }}
    />
  );
}

/** Placement of the link that opened /match; `?source=` (ads, bio links) wins. */
export function readMatchSource() {
  const fromUrl = new URLSearchParams(window.location.search).get("source");
  if (fromUrl) return fromUrl;
  try {
    return sessionStorage.getItem(matchSourceKey) ?? undefined;
  } catch {
    return undefined;
  }
}
