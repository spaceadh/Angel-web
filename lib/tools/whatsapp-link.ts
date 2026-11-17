/**
 * wa.me click-to-chat links. WhatsApp's format is https://wa.me/<number>
 * with the full international number (no +, spaces or leading zero) and an
 * optional URL-encoded `text`: https://faq.whatsapp.com/5913398998672934
 */

/** Kenyan numbers typed as 07…, 01…, 7… or +254… become 2547…; others need a country code. */
export function toWhatsappNumber(raw: string): string | null {
  const trimmed = raw.trim();
  let digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return null;
  if (trimmed.startsWith("+")) {
    // already international
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (/^0[17]\d{8}$/.test(digits)) {
    digits = `254${digits.slice(1)}`;
  } else if (/^[17]\d{8}$/.test(digits)) {
    digits = `254${digits}`;
  }
  // Country codes never start with 0, so a leftover leading 0 means a typo.
  if (digits.startsWith("0")) return null;
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

export function whatsappLink(number: string, message: string) {
  const text = message.trim();
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
