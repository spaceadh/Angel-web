/** Free tools at /tools/<slug>. The hub, sitemap and llms.txt read this list. */
export type Tool = {
  slug: string;
  name: string;
  /** One line for cards and link lists. */
  summary: string;
  /** schema.org applicationCategory. */
  category: string;
};

export const tools: readonly Tool[] = [
  {
    slug: "whatsapp-link-generator",
    name: "WhatsApp link and QR code generator",
    summary:
      "Make a wa.me link with a ready-typed message, plus a QR code for posters, menus and receipts.",
    category: "UtilitiesApplication",
  },
  {
    slug: "mpesa-charges-calculator",
    name: "M-Pesa charges calculator",
    summary:
      "What a sale really costs on a Till, Pochi la Biashara or personal number, and what you keep.",
    category: "FinanceApplication",
  },
  {
    slug: "whatsapp-business-api-cost-calculator",
    name: "WhatsApp Business API cost calculator",
    summary:
      "Your monthly WhatsApp bill in shillings, from Meta's rate card for Kenya.",
    category: "BusinessApplication",
  },
  {
    slug: "website-cost-calculator",
    name: "Website cost calculator",
    summary:
      "Pick what your site needs and see the fixed price and delivery deadline.",
    category: "BusinessApplication",
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
