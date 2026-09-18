"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent, trackWhatsappLead } from "./consent-and-analytics";
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
          trackEvent("email_click", { lead_channel: "email" });
      }}
    />
  );
}
