import { site } from "@/lib/site";

/**
 * Thin wrapper over Brevo's REST API (no SDK needed).
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

const apiBase = "https://api.brevo.com/v3";

export function brevoApiKey() {
  return process.env.BREVO_API_KEY;
}

/**
 * Brevo calls run in production only, so local testing never creates real
 * contacts or emails. Set BREVO_ENABLE_IN_DEV=true to test sending locally.
 */
export function brevoEnabled() {
  return Boolean(
    brevoApiKey() &&
    (process.env.NODE_ENV === "production" ||
      process.env.BREVO_ENABLE_IN_DEV === "true"),
  );
}

export async function brevoRequest(path: string, body: unknown) {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": brevoApiKey() ?? "",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo ${path} failed (${res.status}): ${detail}`);
  }
  return res;
}

export function sendTransactionalEmail({
  to,
  subject,
  html,
  text,
  replyTo,
  tags,
}: {
  to: { email: string; name?: string };
  subject: string;
  html: string;
  text?: string;
  replyTo?: { email: string; name?: string };
  tags?: string[];
}) {
  return brevoRequest("/smtp/email", {
    // The sender must be a verified sender (or on an authenticated domain) in Brevo.
    sender: {
      name: site.name,
      email: process.env.BREVO_SENDER_EMAIL || site.email,
    },
    to: [to],
    replyTo: replyTo ?? { email: site.email, name: site.name },
    subject,
    htmlContent: html,
    textContent: text,
    tags,
  });
}
