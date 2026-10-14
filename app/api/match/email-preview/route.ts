import { calculateMatchResult } from "@/lib/malaika-match/config";
import { buildQuoteEmail } from "@/lib/malaika-match/quote-email";

/**
 * Development-only preview of the quote email:
 *   /api/match/email-preview?offering=website&budget=50-100
 * Any MatchAnswers key can be passed as a query parameter.
 */
export function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const params = new URL(req.url).searchParams;
  const answers = {
    business: "hospitality",
    offering: "website",
    budget: "50-100",
    ambition: "growth",
    timeline: "month",
    ...Object.fromEntries(params),
  };
  const { html, text, subject } = buildQuoteEmail({
    contact: { name: "Wanjiku Kamau", email: "preview@example.com" },
    result: calculateMatchResult(answers),
    sessionId: "match_preview_abc1234",
  });
  if (params.get("format") === "text") {
    return new Response(`Subject: ${subject}\n\n${text}`, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
