import { NextResponse } from "next/server";
import { brevoEnabled, brevoRequest } from "@/lib/brevo";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, priceResponse, sessionId } = body as {
      email?: string;
      priceResponse: string;
      sessionId?: string;
    };

    if (!priceResponse) {
      return NextResponse.json(
        { error: "Response key is required." },
        { status: 400 },
      );
    }

    if (brevoEnabled() && email) {
      const cleanEmail = email.toLowerCase().trim();
      const settled = await Promise.allSettled([
        brevoRequest("/events", {
          event_name: "malaika_match_price_response",
          identifiers: { email_id: cleanEmail },
          event_properties: {
            price_response: priceResponse,
            match_session_id: sessionId,
          },
        }),
        brevoRequest("/contacts", {
          email: cleanEmail,
          attributes: {
            MATCH_PRICE_RESPONSE: priceResponse,
            MATCH_PRICE_RESPONSE_AT: new Date().toISOString(),
          },
          updateEnabled: true,
        }),
      ]);
      settled.forEach((outcome) => {
        if (outcome.status === "rejected") {
          console.warn("Brevo price response step failed:", outcome.reason);
        }
      });
    }

    return NextResponse.json({ success: true, priceResponse });
  } catch (error) {
    console.error("Match price response API error:", error);
    return NextResponse.json(
      { error: "Failed to record response." },
      { status: 500 },
    );
  }
}
