import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return new NextResponse(null, { status: 204 });

  const body = (await request.json().catch(() => null)) as {
    eventId?: string;
    eventSourceUrl?: string;
    consent?: boolean;
    fbp?: string;
    fbc?: string;
  } | null;
  if (!body?.consent || !body.eventId || !body.eventSourceUrl) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }
  let eventOrigin: string;
  try {
    eventOrigin = new URL(body.eventSourceUrl).origin;
  } catch {
    return NextResponse.json(
      { error: "Invalid event source" },
      { status: 400 },
    );
  }
  if (eventOrigin !== site.url) {
    return NextResponse.json(
      { error: "Invalid event source" },
      { status: 400 },
    );
  }

  const clientIp = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const userAgent = request.headers.get("user-agent");
  const userData: Record<string, string> = {};
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;
  if (body.fbp) userData.fbp = body.fbp;
  if (body.fbc) userData.fbc = body.fbc;

  const payload = {
    data: [
      {
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        action_source: "website",
        event_source_url: body.eventSourceUrl,
        user_data: userData,
        custom_data: { lead_channel: "whatsapp" },
      },
    ],
    partner_agent: "malaika-studios-next",
  };

  const response = await fetch(
    `https://graph.facebook.com/v22.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok)
    return NextResponse.json({ error: "Meta event rejected" }, { status: 502 });
  return new NextResponse(null, { status: 204 });
}
