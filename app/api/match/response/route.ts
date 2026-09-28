import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, priceResponse, sessionId } = body as {
      email?: string;
      priceResponse: string;
      sessionId?: string;
    };

    if (!priceResponse) {
      return NextResponse.json({ error: "Response key is required." }, { status: 400 });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const environment = process.env.NODE_ENV || "production";
    if (brevoApiKey && environment === "production" && email) {
      try {
        await fetch("https://api.brevo.com/v3/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey
          },
          body: JSON.stringify({
            event_name: "malaika_match_price_response",
            email: email.toLowerCase().trim(),
            event_properties: {
              price_response: priceResponse,
              match_session_id: sessionId
            }
          })
        });

        await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": brevoApiKey
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            attributes: {
              MATCH_PRICE_RESPONSE: priceResponse
            },
            updateEnabled: true
          })
        });
      } catch (err) {
        console.warn("Brevo price response logging warning:", err);
      }
    }

    return NextResponse.json({ success: true, priceResponse });
  } catch (error) {
    console.error("Match price response API error:", error);
    return NextResponse.json({ error: "Failed to record response." }, { status: 500 });
  }
}
