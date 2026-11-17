/**
 * WhatsApp Business Platform rates for Kenya, which Meta bills at its
 * "Rest of Africa" rates. From Meta's USD rate card effective 1 October 2026
 * (checked 2026-11-17): https://developers.facebook.com/docs/whatsapp/pricing
 *
 * Volume discounts for utility messages start above 100,000 a month and for
 * authentication above 300,000, so they're left out for small businesses.
 */

export const WHATSAPP_SOURCE = {
  title:
    "Pricing on the WhatsApp Business Platform (USD rate card, Rest of Africa)",
  publisher: "Meta for Developers",
  url: "https://developers.facebook.com/docs/whatsapp/pricing",
  updated: "2026-10-01",
};
export const WHATSAPP_CHECKED = "2026-11-17";

/** USD per message. */
export const WHATSAPP_RATES = {
  marketing: 0.0225,
  utility: 0.004,
  authentication: 0.004,
  service: 0.004,
} as const;

/** Free service messages per business phone number per month. */
export const FREE_SERVICE_MESSAGES = 1_000;

export type WhatsappVolumes = Record<keyof typeof WHATSAPP_RATES, number>;

export function whatsappCost(volumes: WhatsappVolumes) {
  const billable = {
    ...volumes,
    service: Math.max(0, volumes.service - FREE_SERVICE_MESSAGES),
  };
  const lines = (Object.keys(WHATSAPP_RATES) as (keyof WhatsappVolumes)[]).map(
    (key) => ({
      key,
      messages: volumes[key],
      billable: billable[key],
      usd: billable[key] * WHATSAPP_RATES[key],
    }),
  );
  return { lines, usd: lines.reduce((sum, line) => sum + line.usd, 0) };
}
