import { NextResponse } from "next/server";
import {
  calculateMatchResult,
  MatchAnswers,
  ContactInfo,
} from "@/lib/malaika-match/config";
import {
  buildLeadAlertEmail,
  buildQuoteEmail,
} from "@/lib/malaika-match/quote-email";
import {
  brevoEnabled,
  brevoRequest,
  sendTransactionalEmail,
} from "@/lib/brevo";
import { site } from "@/lib/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance throttle. It stops a single client hammering the
// endpoint; Turnstile is the real bot defence.
const recentSubmissions = new Map<string, number[]>();
const rateWindowMs = 10 * 60 * 1000;
const rateLimit = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter(
    (time) => now - time < rateWindowMs,
  );
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > rateLimit;
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured: rely on honeypot + throttle.
  if (!token) return false;
  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip !== "unknown") formData.append("remoteip", ip);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.warn("Turnstile verification failed to run:", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers, contact, turnstileToken, website, source } = body as {
      answers: MatchAnswers;
      contact: ContactInfo;
      turnstileToken?: string;
      /** Honeypot: hidden from people, often filled by bots. */
      website?: string;
      source?: string;
    };

    const email = contact?.email?.toLowerCase().trim() ?? "";
    const name = contact?.name?.trim().slice(0, 80) ?? "";
    const phone = contact?.phone?.trim().slice(0, 30) || undefined;

    if (!name || !emailPattern.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Please provide your name and a valid email address." },
        { status: 400 },
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "You've requested several estimates in a short time. Please wait a few minutes and try again.",
        },
        { status: 429 },
      );
    }

    const result = calculateMatchResult(answers || {});
    const matchSessionId = `match_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Bots get a normal-looking response but nothing is stored or emailed.
    if (website) {
      return NextResponse.json({
        success: true,
        sessionId: matchSessionId,
        result,
        emailStatus: "sent",
      });
    }

    const verified = await verifyTurnstile(turnstileToken, ip);
    const cleanContact: ContactInfo = { name, email, phone };
    let emailStatus: "sent" | "failed" | "skipped" = "skipped";

    if (brevoEnabled()) {
      const [firstName, ...lastNameParts] = name.split(/\s+/);
      const quote = buildQuoteEmail({
        contact: cleanContact,
        result,
        sessionId: matchSessionId,
      });
      const alert = buildLeadAlertEmail({
        contact: cleanContact,
        result,
        sessionId: matchSessionId,
        source,
        verified,
      });

      const tasks = {
        contact: brevoRequest("/contacts", {
          email,
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastNameParts.join(" ") || undefined,
            SMS: phone,
            MATCH_BUSINESS_TYPE: result.brief.business,
            MATCH_PROJECT_TYPE: result.brief.offering,
            MATCH_PRIMARY_GOAL: result.brief.outcome,
            MATCH_INVESTMENT_COMFORT: result.brief.investment,
            MATCH_SCORE: result.score,
            MATCH_CATEGORY: result.category,
            MATCH_ESTIMATE_RANGE: result.recommendation.price,
            MATCH_COMPLETED_AT: new Date().toISOString(),
            MATCH_SESSION_ID: matchSessionId,
          },
          updateEnabled: true,
        }),
        event: brevoRequest("/events", {
          event_name: "malaika_match_completed",
          identifiers: { email_id: email },
          event_properties: {
            match_session_id: matchSessionId,
            score: result.score,
            category: result.category,
            recommendation_name: result.recommendation.name,
            recommendation_price: result.recommendation.price,
            quote_reference: quote.reference,
          },
        }),
        // Only email addresses that passed the bot check, so the form can't
        // be used to send mail to strangers.
        quote: verified
          ? sendTransactionalEmail({
              to: { email, name },
              subject: quote.subject,
              html: quote.html,
              text: quote.text,
              tags: ["malaika-match", "quote"],
            })
          : Promise.reject(new Error("Bot check not passed; quote not sent")),
        alert: sendTransactionalEmail({
          to: {
            email: process.env.MATCH_TEAM_EMAIL || site.email,
            name: site.name,
          },
          replyTo: { email, name },
          subject: alert.subject,
          html: alert.html,
          tags: ["malaika-match", "lead-alert"],
        }),
      };

      const names = Object.keys(tasks) as Array<keyof typeof tasks>;
      const settled = await Promise.allSettled(Object.values(tasks));
      settled.forEach((outcome, index) => {
        if (outcome.status === "rejected") {
          console.warn(`Match ${names[index]} step failed:`, outcome.reason);
        }
      });
      emailStatus =
        settled[names.indexOf("quote")].status === "fulfilled"
          ? "sent"
          : "failed";
    }

    return NextResponse.json({
      success: true,
      sessionId: matchSessionId,
      result,
      emailStatus,
    });
  } catch (error) {
    console.error("Match submission API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while calculating your match." },
      { status: 500 },
    );
  }
}
