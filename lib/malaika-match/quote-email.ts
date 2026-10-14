import type { ContactInfo, MatchResultPayload } from "./config";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Builds the "your estimate" email sent after the Malaika Match, plus the
 * internal lead alert for the team. Table-based with inline styles so it
 * renders in Gmail, Outlook and Apple Mail.
 */

const ink = "#101b1b";
const cream = "#f7f5ee";
const paper = "#fffdf8";
const yellow = "#ffd400";
const blue = "#2563ff";
const muted = "#657070";
const line = "#e3e1d8";
const font =
  "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Headline from config contains a <span class="blue"> accent; email gets plain text. */
function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, "");
}

export function quoteReference(sessionId: string) {
  return `MS-${sessionId.slice(-6).toUpperCase()}`;
}

function whatsappFor(configName: string, price: string, reference: string) {
  const text = `Hi Malaika Studios, I'd like to talk about the ${configName} option (${price}) from my estimate ${reference}.`;
  return `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

function button(href: string, label: string, primary = true) {
  return `<a href="${href}" style="display:inline-block;background:${primary ? ink : paper};color:${primary ? paper : ink};border:2px solid ${ink};border-radius:999px;padding:14px 24px;font-family:${font};font-size:15px;font-weight:700;text-decoration:none;">${label}</a>`;
}

export function buildQuoteEmail({
  contact,
  result,
  sessionId,
}: {
  contact: ContactInfo;
  result: MatchResultPayload;
  sessionId: string;
}) {
  const firstName = escapeHtml(contact.name.trim().split(/\s+/)[0] || "there");
  const reference = quoteReference(sessionId);
  const rec = result.recommendation;
  const subject = `Your ${result.brief.offering} estimate: ${rec.name} from ${rec.price} (${reference})`;

  const briefRows = [
    ["Your business", result.brief.business],
    ["What you need", result.brief.offering],
    ["What success looks like", result.brief.outcome],
    ["Investment territory", result.brief.investment],
  ]
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${line};font-family:${font};font-size:13px;color:${muted};width:45%;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${line};font-family:${font};font-size:15px;color:${ink};font-weight:700;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  const configCards = result.configs
    .map((config, index) => {
      const isRec = config.name === rec.name;
      const bg = isRec ? ink : paper;
      const fg = isRec ? paper : ink;
      const sub = isRec ? "#b9c2c2" : muted;
      const items = config.items
        .map(
          (item) =>
            `<li style="margin:0 0 6px;font-family:${font};font-size:14px;color:${fg};">${escapeHtml(item)}</li>`,
        )
        .join("");
      return `
      <tr><td style="padding:0 0 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};border:2px solid ${ink};border-radius:20px;">
          <tr><td style="padding:22px 24px;">
            ${isRec ? `<div style="display:inline-block;background:${yellow};color:${ink};border-radius:999px;padding:4px 12px;font-family:${font};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">Our recommendation</div>` : ""}
            <div style="font-family:${font};font-size:12px;color:${sub};letter-spacing:1px;">0${index + 1} · ${escapeHtml(config.tag)}</div>
            <div style="font-family:${font};font-size:22px;font-weight:800;color:${fg};margin:4px 0 2px;">${escapeHtml(config.name)}</div>
            <div style="font-family:${font};font-size:26px;font-weight:800;color:${isRec ? yellow : blue};margin:0 0 14px;">${escapeHtml(config.price)}</div>
            <ul style="margin:0 0 16px;padding-left:18px;">${items}</ul>
            <a href="${whatsappFor(config.name, config.price, reference)}" style="font-family:${font};font-size:14px;font-weight:700;color:${isRec ? yellow : ink};text-decoration:underline;">Talk about this option →</a>
          </td></tr>
        </table>
      </td></tr>`;
    })
    .join("");

  const reasons = result.recommendationReasons
    .map(
      (reason) =>
        `<li style="margin:0 0 8px;font-family:${font};font-size:15px;color:${ink};">${escapeHtml(reason)}</li>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${cream};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your ${result.score}% match, three tailored options and our recommendation: ${escapeHtml(rec.name)} at ${escapeHtml(rec.price)}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${cream};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

  <tr><td style="padding:0 0 24px;">
    <img src="${absoluteUrl("/icon-192.png")}" width="44" height="44" alt="Malaika Studios" style="display:inline-block;vertical-align:middle;border-radius:10px;">
    <span style="font-family:${font};font-size:16px;font-weight:800;color:${ink};vertical-align:middle;margin-left:10px;letter-spacing:1px;">MALAIKA STUDIOS</span>
  </td></tr>

  <tr><td style="background:${paper};border:2px solid ${ink};border-radius:24px;padding:32px 28px;">
    <div style="font-family:${font};font-size:12px;font-weight:700;letter-spacing:1.5px;color:${muted};text-transform:uppercase;">Your estimate · ${reference}</div>
    <h1 style="font-family:${font};font-size:30px;line-height:1.1;color:${ink};margin:12px 0 14px;">Hi ${firstName}, ${escapeHtml(stripTags(result.headline)).replace(/^./, (c) => c.toLowerCase())}</h1>
    <p style="font-family:${font};font-size:16px;line-height:1.6;color:#364343;margin:0 0 22px;">Thanks for completing the Malaika Match. Here's your project estimate so you have it in one place, ready to share with your team.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background:${yellow};border:2px solid ${ink};border-radius:18px;">
      <tr><td style="padding:14px 22px;font-family:${font};">
        <span style="font-size:36px;font-weight:800;color:${ink};">${result.score}%</span>
        <span style="font-size:15px;font-weight:700;color:${ink};margin-left:8px;">${escapeHtml(result.category)}</span>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:28px 4px 8px;">
    <h2 style="font-family:${font};font-size:20px;color:${ink};margin:0 0 8px;">Your brief</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${briefRows}</table>
  </td></tr>

  <tr><td style="padding:28px 4px 8px;">
    <h2 style="font-family:${font};font-size:20px;color:${ink};margin:0 0 4px;">Three ways to build it</h2>
    <p style="font-family:${font};font-size:14px;color:${muted};margin:0 0 16px;">Same goal, different levels of scope, detail and investment.</p>
  </td></tr>
  ${configCards}

  <tr><td style="padding:14px 4px 8px;">
    <h2 style="font-family:${font};font-size:20px;color:${ink};margin:0 0 8px;">Why we recommend ${escapeHtml(rec.name)}</h2>
    <p style="font-family:${font};font-size:15px;line-height:1.6;color:#364343;margin:0 0 12px;">${escapeHtml(result.recommendationCopy)}</p>
    <ul style="margin:0;padding-left:18px;">${reasons}</ul>
  </td></tr>

  <tr><td style="padding:28px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ink};border-radius:24px;">
      <tr><td style="padding:30px 28px;">
        <h2 style="font-family:${font};font-size:24px;color:${paper};margin:0 0 8px;">Next step: a short conversation.</h2>
        <p style="font-family:${font};font-size:15px;line-height:1.6;color:#b9c2c2;margin:0 0 20px;">We'll confirm the scope together and adjust anything that doesn't fit. No commitment.</p>
        <a href="${whatsappFor(rec.name, rec.price, reference)}" style="display:inline-block;background:${yellow};color:${ink};border-radius:999px;padding:14px 24px;font-family:${font};font-size:15px;font-weight:700;text-decoration:none;margin:0 8px 8px 0;">Chat on WhatsApp →</a>
        <a href="mailto:${site.email}?subject=${encodeURIComponent(`Estimate ${reference}`)}" style="display:inline-block;color:${paper};border:2px solid ${paper};border-radius:999px;padding:12px 22px;font-family:${font};font-size:15px;font-weight:700;text-decoration:none;">Reply by email</a>
      </td></tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 4px 8px;font-family:${font};font-size:12px;line-height:1.6;color:${muted};">
    Prices are estimates in Kenyan shillings based on your answers. We'll confirm the final scope and quote with you before any work begins. Reference ${reference}.<br><br>
    ${button(absoluteUrl("/pricing"), "See all pricing", false)}<br><br>
    Malaika Studios · ${escapeHtml(site.location)} · <a href="mailto:${site.email}" style="color:${muted};">${site.email}</a><br>
    You're receiving this because you requested an estimate at ${site.url.replace("https://", "")}.
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Hi ${contact.name.trim().split(/\s+/)[0] || "there"},`,
    "",
    `Thanks for completing the Malaika Match. Your estimate (${reference}):`,
    "",
    `Match score: ${result.score}% (${result.category})`,
    `Business: ${result.brief.business}`,
    `What you need: ${result.brief.offering}`,
    `Success looks like: ${result.brief.outcome}`,
    `Investment territory: ${result.brief.investment}`,
    "",
    "THREE WAYS TO BUILD IT",
    ...result.configs.flatMap((config, index) => [
      "",
      `0${index + 1}. ${config.name}: ${config.price}${config.name === rec.name ? " (recommended)" : ""}`,
      ...config.items.map((item) => `   - ${item}`),
    ]),
    "",
    `WHY ${rec.name.toUpperCase()}`,
    result.recommendationCopy,
    "",
    `Chat on WhatsApp: ${whatsappFor(rec.name, rec.price, reference)}`,
    `Or reply to this email.`,
    "",
    "Prices are estimates in Kenyan shillings based on your answers. We'll confirm the final scope and quote before any work begins.",
    "",
    `Malaika Studios · ${site.location} · ${site.email}`,
  ].join("\n");

  return { subject, html, text, reference };
}

/** Plain internal alert so the team can follow up fast. */
export function buildLeadAlertEmail({
  contact,
  result,
  sessionId,
  source,
  verified,
}: {
  contact: ContactInfo;
  result: MatchResultPayload;
  sessionId: string;
  source?: string;
  verified: boolean;
}) {
  const reference = quoteReference(sessionId);
  const rows: Array<[string, string]> = [
    ["Name", contact.name],
    ["Email", contact.email],
    ["Phone / WhatsApp", contact.phone || "Not given"],
    ["Score", `${result.score}% (${result.category})`],
    ["Business", result.brief.business],
    ["Needs", result.brief.offering],
    ["Outcome", result.brief.outcome],
    ["Budget", result.brief.investment],
    [
      "Recommended",
      `${result.recommendation.name} · ${result.recommendation.price}`,
    ],
    ["Source", source || "direct"],
    ["Bot check", verified ? "Passed" : "Not verified (quote email not sent)"],
    ["Session", sessionId],
  ];
  const phoneDigits = contact.phone?.replace(/[^\d]/g, "");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:${ink};">
<h2 style="margin:0 0 12px;">New Malaika Match lead · ${reference}</h2>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
${rows.map(([k, v]) => `<tr><td style="color:${muted};border-bottom:1px solid ${line};">${escapeHtml(k)}</td><td style="font-weight:bold;border-bottom:1px solid ${line};">${escapeHtml(v)}</td></tr>`).join("\n")}
</table>
${phoneDigits ? `<p><a href="https://wa.me/${phoneDigits}">Open WhatsApp chat with ${escapeHtml(contact.name)}</a></p>` : ""}
</div>`;
  return {
    subject: `New lead: ${contact.name} · ${result.brief.offering} · ${result.recommendation.price}`,
    html,
    reference,
  };
}
