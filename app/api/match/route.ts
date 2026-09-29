import { NextResponse } from "next/server";
import { calculateMatchResult, MatchAnswers, ContactInfo } from "@/lib/malaika-match/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers, contact, turnstileToken } = body as {
      answers: MatchAnswers;
      contact: ContactInfo;
      turnstileToken?: string;
    };

    if (!contact || !contact.name || !contact.email) {
      return NextResponse.json(
        { error: "Please provide your name and a valid email address." },
        { status: 400 }
      );
    }

    // Optional Cloudflare Turnstile Verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      try {
        const formData = new URLSearchParams();
        formData.append("secret", turnstileSecret);
        formData.append("response", turnstileToken);
        const cfRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          body: formData
        });
        const cfData = await cfRes.json();
        if (!cfData.success) {
          return NextResponse.json(
            { error: "Security check failed. Please try submitting again." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.warn("Turnstile verification check encountered an issue:", err);
      }
    }

    // Calculate official server-side Match result
    const result = calculateMatchResult(answers || {});
    const matchSessionId = `match_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Optional Brevo API Integration
    const brevoApiKey = process.env.BREVO_API_KEY;
    const environment = process.env.NODE_ENV || "production";
    if (brevoApiKey && environment === "production") {
      try {
        const [firstName, ...lastNameParts] = contact.name.trim().split(" ");
        const lastName = lastNameParts.join(" ");

        const brevoPayload = {
          email: contact.email.toLowerCase().trim(),
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName || undefined,
            SMS: contact.phone || undefined,
            MATCH_BUSINESS_TYPE: result.brief.business,
            MATCH_PROJECT_TYPE: result.brief.offering,
            MATCH_PRIMARY_GOAL: result.brief.outcome,
            MATCH_INVESTMENT_COMFORT: result.brief.investment,
            MATCH_SCORE: result.score,
            MATCH_CATEGORY: result.category,
            MATCH_ESTIMATE_RANGE: result.recommendation.price,
            MATCH_COMPLETED_AT: new Date().toISOString(),
            MATCH_SESSION_ID: matchSessionId
          },
          updateEnabled: true
        };

        await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey
          },
          body: JSON.stringify(brevoPayload)
        });

        // Track custom event in Brevo
        await fetch("https://api.brevo.com/v3/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey
          },
          body: JSON.stringify({
            event_name: "malaika_match_completed",
            email: contact.email.toLowerCase().trim(),
            identifiers: {
              email: contact.email.toLowerCase().trim()
            },
            event_properties: {
              match_session_id: matchSessionId,
              score: result.score,
              category: result.category,
              recommendation_name: result.recommendation.name,
              recommendation_price: result.recommendation.price
            }
          })
        }).catch(() => {});
      } catch (brevoErr) {
        console.warn("Brevo contact submission warning:", brevoErr);
      }
    }

    return NextResponse.json({
      success: true,
      sessionId: matchSessionId,
      result
    });
  } catch (error) {
    console.error("Match submission API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while calculating your match." },
      { status: 500 }
    );
  }
}
