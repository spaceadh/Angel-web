import { NextRequest, NextResponse } from "next/server";

// ─── Inline UA parser (zero deps) ─────────────────────────────────────────────
function parseUserAgent(ua: string): { browser: string; os: string; deviceType: string } {
  // Browser
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
  else if (/MSIE|Trident/.test(ua)) browser = "Internet Explorer";

  // OS
  let os = "Unknown";
  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua) && !/iPhone|iPad/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua) && !/Android/.test(ua)) os = "Linux";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone/.test(ua)) os = "iOS";
  else if (/iPad/.test(ua)) os = "iPadOS";

  // Device type
  let deviceType = "Desktop";
  if (/Mobi|Android|iPhone/.test(ua)) deviceType = "Mobile";
  else if (/iPad|Tablet/.test(ua)) deviceType = "Tablet";

  return { browser, os, deviceType };
}

// ─── IP Geolocation via ip-api.com (free, no key needed) ──────────────────────
async function getLocation(ip: string): Promise<{ city: string; country: string }> {
  // Skip private/local IPs
  if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return { city: "Local", country: "Local" };
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=city,country,status`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return { city: "Unknown", country: "Unknown" };
    const data = await res.json();
    if (data.status !== "success") return { city: "Unknown", country: "Unknown" };
    return { city: data.city ?? "Unknown", country: data.country ?? "Unknown" };
  } catch {
    return { city: "Unknown", country: "Unknown" };
  }
}

// ─── Supabase REST helpers (no SDK needed) ─────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_SUPABASE_ANON_KEY ?? "";

async function upsertSession(payload: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  await fetch(`${SUPABASE_URL}/rest/v1/page_analytics`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(payload),
  });
}

async function updateDuration(sessionId: string, durationSeconds: number) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  await fetch(
    `${SUPABASE_URL}/rest/v1/page_analytics?session_id=eq.${sessionId}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        duration_seconds: durationSeconds,
        last_ping_at: new Date().toISOString(),
      }),
    }
  );
}

// ─── Telegram notification ─────────────────────────────────────────────────────
async function sendTelegramAlert(message: string) {
  const token = process.env.NEXT_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_TELEGRAM_CHAT_ID;
  console.log("[heartbeat] Sending Telegram alert:", message);
  console.log("[heartbeat] Telegram bot token:", token ? "present" : "missing");
  console.log("[heartbeat] Telegram chat ID:", chatId ? "present" : "missing");
  if (!token || !chatId) return;
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
    if (!response.ok) {
      console.warn("[heartbeat] Telegram API response not OK:", response.status, await response.text());
      return;
    }

    const data = await response.json();
    if (!data.ok) {
      console.warn("[heartbeat] Telegram API returned error:", data);
      return;
    }
    // console.log("[heartbeat] Telegram API response:", data);
    // console.log("[heartbeat] Telegram alert sent successfully");
  } catch {
    // Non-critical — silently swallow
    console.warn("[heartbeat] Failed to send Telegram alert");
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // console.log("[heartbeat] Received payload:", body);
    
    const { sessionId, type, durationSeconds, pagePath } = body as {
      sessionId: string;
      type: "visit" | "ping" | "exit";
      durationSeconds?: number;
      pagePath?: string;
    };

    // console.log("[heartbeat] Processing session:", sessionId);

    if (!sessionId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // console.log(`[heartbeat] Type: ${type}, Duration: ${durationSeconds}, Page Path: ${pagePath}`);

    // ── Initial visit ────────────────────────────────────────────────────────
    if (type === "visit") {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "";
      const ua = req.headers.get("user-agent") ?? "";
      const { browser, os, deviceType } = parseUserAgent(ua);
      const { city, country } = await getLocation(ip);

      await upsertSession({
        session_id: sessionId,
        page_path: pagePath ?? "/connect/alvin",
        ip_address: ip,
        location_city: city,
        location_country: country,
        browser,
        os,
        device_type: deviceType,
        duration_seconds: 0,
        created_at: new Date().toISOString(),
        last_ping_at: new Date().toISOString(),
      });

      // console.log(`[heartbeat] New visit Recorded: ${sessionId} from ${city}, ${country} (${browser} on ${deviceType})`);

      // Immediate Telegram alert on new visit
      await sendTelegramAlert(
        `👁 <b>New visitor</b> on /connect/alvin\n` +
          `📍 ${city}, ${country}\n` +
          `🖥 ${browser} on ${deviceType} (${os})\n` +
          `🌐 IP: <code>${ip || "hidden"}</code>`
      );

      // console.log(`[heartbeat] Telegram alert sent for session: ${sessionId}`);
    }

    // ── Heartbeat ping ───────────────────────────────────────────────────────
    if (type === "ping" && durationSeconds !== undefined) {
      await updateDuration(sessionId, durationSeconds);
    }

    // ── Exit beacon ──────────────────────────────────────────────────────────
    if (type === "exit" && durationSeconds !== undefined) {
      await updateDuration(sessionId, durationSeconds);

      const mins = Math.floor(durationSeconds / 60);
      const secs = durationSeconds % 60;
      const timeLabel =
        mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

      await sendTelegramAlert(
        `✅ <b>Session ended</b> on /connect/alvin\n` +
          `⏱ Time on page: <b>${timeLabel}</b>\n` +
          `🔑 Session: <code>${sessionId.slice(0, 8)}…</code>`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[heartbeat] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}