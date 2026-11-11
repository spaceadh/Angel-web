/**
 * lib/pricing.ts
 *
 * SINGLE SOURCE OF TRUTH FOR ALL MALAIKA STUDIOS PRICING.
 * Edit a package here and it updates /pricing, /match, the service pages,
 * the estimate emails and /llms.txt.
 *
 * Prices are set in US dollars and stay fixed. Shilling amounts are worked
 * out from the day's exchange rate (lib/fx.ts), so a weaker shilling never
 * eats into the price. Every package has a fixed scope and a delivery
 * deadline in working days.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type OfferingKey = "website" | "email" | "seo" | "growth" | "social";
export type BudgetBandId = "starter" | "growth" | "strategic" | "bespoke";
export type ConfigTag = "Essential" | "Recommended" | "Expanded";

export interface Package {
  name: string;
  /** Price in US dollars. */
  usd: number;
  /** True for "from" prices (bespoke work, scoped in writing). */
  from?: boolean;
  /** Delivery deadline in working days; null when it's set in writing. */
  days: number | null;
  /** Shown after the price, e.g. "per month". */
  unit?: string;
  /** Exactly what's delivered. */
  items: string[];
}

export interface PricingConfigItem {
  name: string;
  /** "USD 250" or "From USD 2,500". */
  price: string;
  usd: number;
  from: boolean;
  unit?: string;
  /** "Delivered in 10 working days" or "Deadline agreed in writing". */
  delivery: string;
  items: string[];
  tag: ConfigTag;
}

export interface BudgetBand {
  id: BudgetBandId;
  label: string;
  range: string;
}

export interface OfferingMeta {
  key: OfferingKey;
  label: string;
  fullLabel: string;
  description: string;
  serviceSlug: string;
  accentColor: string;
}

// ─── Budget bands (used by /match) ────────────────────────────────────────────

export const BUDGET_BANDS: readonly BudgetBand[] = [
  { id: "starter", label: "Starter", range: "Under USD 400" },
  { id: "growth", label: "Growth", range: "USD 400 – 800" },
  { id: "strategic", label: "Strategic", range: "USD 800 – 1,500" },
  { id: "bespoke", label: "Bespoke", range: "USD 1,500+" },
] as const;

/** Which package in each ladder a budget band points to. */
const BAND_PACKAGE_INDEX: Record<BudgetBandId, number> = {
  starter: 0,
  growth: 1,
  strategic: 2,
  bespoke: 3,
};

// ─── Offerings ────────────────────────────────────────────────────────────────

export const OFFERINGS: readonly OfferingMeta[] = [
  {
    key: "website",
    label: "Websites",
    fullLabel: "Websites & Digital Experiences",
    description: "Build or improve the digital experience for your business.",
    serviceSlug: "website-design-development",
    accentColor: "#2563ff",
  },
  {
    key: "email",
    label: "Email",
    fullLabel: "Email & Retention",
    description:
      "Turn attention into repeat business with email and automation.",
    serviceSlug: "whatsapp-email-crm-automation",
    accentColor: "#ff5a5f",
  },
  {
    key: "seo",
    label: "SEO",
    fullLabel: "SEO & Search Presence",
    description: "Help the right people find you in search.",
    serviceSlug: "digital-growth-strategy-analytics",
    accentColor: "#16b88a",
  },
  {
    key: "growth",
    label: "Growth",
    fullLabel: "Digital Growth & Automation",
    description: "Connect leads, conversations and follow-up into one system.",
    serviceSlug: "digital-growth-strategy-analytics",
    accentColor: "#ffd400",
  },
  {
    key: "social",
    label: "Social",
    fullLabel: "Social & Content",
    description: "Build a stronger, more consistent social presence.",
    serviceSlug: "digital-growth-strategy-analytics",
    accentColor: "#a855f7",
  },
] as const;

// ─── Labels ───────────────────────────────────────────────────────────────────

export const LABELS = {
  business: {
    architecture: "Architecture & Design",
    hospitality: "Hospitality & Travel",
    professional: "Professional Services",
    "real-estate": "Real Estate",
    retail: "Retail & Products",
    wellness: "Wellness & Lifestyle",
    creative: "Creative & Cultural",
    other: "Other Business",
  },
  offering: {
    website: "Websites & Digital Experiences",
    email: "Email & Retention",
    seo: "SEO & Search Presence",
    growth: "Digital Growth & Automation",
    social: "Social & Content",
  },
  ambition: {
    foundation: "Foundation",
    growth: "Growth",
    strategic: "Strategic",
    distinctive: "Distinctive",
  },
  timeline: {
    exploring: "Just exploring",
    "three-months": "Within 3 months",
    "one-month": "Within 30 days",
    ready: "Ready to start",
  },
  budget: {
    starter: "Under USD 400",
    growth: "USD 400–800",
    strategic: "USD 800–1,500",
    bespoke: "USD 1,500+",
    unsure: "Not sure yet",
  },
};

// ─── Terms that apply to every package ────────────────────────────────────────

export const PRICING_TERMS: readonly string[] = [
  "Prices are in US dollars. Clients in Kenya pay in shillings at the exchange rate on the invoice date.",
  "Delivery deadlines are in working days. The clock starts when we have your content (logo, text, photos) and the first payment.",
  "Each package lists exactly what's included. Extra pages, extra revision rounds and new features are quoted before we start them.",
  "Not included unless listed: domain and hosting fees, paid tools and subscriptions, ad spend, photography.",
];

// ─── Packages ─────────────────────────────────────────────────────────────────
//
// One ladder per service: four fixed packages, then bespoke.
// Change a price or a line here and every page follows.

export const PACKAGES: Record<OfferingKey, readonly Package[]> = {
  website: [
    {
      name: "Launch",
      usd: 250,
      days: 10,
      items: [
        "Up to 4 pages, built for phones first",
        "1 enquiry form or WhatsApp button",
        "Basic SEO: titles, descriptions, sitemap",
        "Google Analytics",
        "2 revision rounds",
      ],
    },
    {
      name: "Business",
      usd: 450,
      days: 15,
      items: [
        "Up to 7 pages",
        "2 forms, with WhatsApp and email alerts",
        "On-page SEO for every page",
        "Google Analytics + Search Console",
        "Linked to your Google Business Profile",
        "2 revision rounds",
      ],
    },
    {
      name: "Growth",
      usd: 850,
      days: 25,
      items: [
        "Up to 12 pages",
        "Edit your own content (CMS or blog)",
        "Booking or enquiry flow",
        "Leads saved to a CRM or sheet, with alerts",
        "Event tracking on every call to action",
        "3 revision rounds",
      ],
    },
    {
      name: "Commerce",
      usd: 1500,
      days: 35,
      items: [
        "Online catalogue, up to 50 products",
        "Orders to WhatsApp, already written out",
        "Admin to edit products and prices",
        "Order alert emails and a customer list",
        "Product SEO and tracking",
        "3 revision rounds",
      ],
    },
    {
      name: "Bespoke",
      usd: 2500,
      from: true,
      days: null,
      items: [
        "Custom features, like a product builder or quiz",
        "Integrations with your systems",
        "Scope, price and deadline agreed in writing",
      ],
    },
  ],
  email: [
    {
      name: "Email Setup",
      usd: 250,
      days: 7,
      items: [
        "Email platform set up (e.g. Brevo)",
        "Domain authentication, so emails land in the inbox",
        "Sign-up form on your website",
        "1 branded template",
        "1 welcome email",
      ],
    },
    {
      name: "Email Starter",
      usd: 450,
      days: 10,
      items: [
        "Everything in Email Setup",
        "Your contact list imported and cleaned",
        "2 audience segments",
        "2 campaigns written, designed and sent",
        "Results report",
      ],
    },
    {
      name: "Retention",
      usd: 800,
      days: 20,
      items: [
        "Everything in Email Starter",
        "3 automated sequences: welcome, follow-up, win-back",
        "4 campaigns written, designed and sent",
        "Segments by interest or purchase",
        "Results report",
      ],
    },
    {
      name: "Lifecycle",
      usd: 1400,
      days: 30,
      items: [
        "Everything in Retention",
        "Email and WhatsApp follow-up linked to your CRM",
        "5 automated sequences",
        "6 campaigns, with A/B tests",
        "Results report and next-step plan",
      ],
    },
    {
      name: "Bespoke",
      usd: 2500,
      from: true,
      days: null,
      items: [
        "Custom lifecycle system across email and WhatsApp",
        "Integrations with your store or CRM",
        "Scope, price and deadline agreed in writing",
      ],
    },
  ],
  seo: [
    {
      name: "Search Setup",
      usd: 250,
      days: 7,
      items: [
        "Technical check, with up to 10 fixes",
        "Google Search Console + Analytics",
        "Sitemap and indexing checked",
        "Titles and descriptions for up to 5 pages",
        "Google Business Profile set up or cleaned up",
      ],
    },
    {
      name: "Local SEO",
      usd: 450,
      days: 15,
      items: [
        "Everything in Search Setup",
        "Keyword research (20 keywords)",
        "Up to 10 pages optimised",
        "Google Business Profile optimised",
        "10 local directory listings",
        "Results report",
      ],
    },
    {
      name: "Search Growth",
      usd: 850,
      days: 30,
      items: [
        "Everything in Local SEO",
        "Competitor analysis",
        "Up to 20 pages optimised",
        "2 new pages or articles written",
        "Structured data for Google and AI search",
        "Results report at day 30",
      ],
    },
    {
      name: "Search Authority",
      usd: 1500,
      days: 45,
      items: [
        "Everything in Search Growth",
        "Up to 30 pages optimised",
        "4 articles written",
        "3-month content plan",
        "Multiple locations",
        "Results report and next-step plan",
      ],
    },
    {
      name: "Bespoke",
      usd: 2500,
      from: true,
      days: null,
      items: [
        "Ongoing search programme",
        "Content, technical and local work together",
        "Scope, price and deadline agreed in writing",
      ],
    },
  ],
  growth: [
    {
      name: "Tracking Setup",
      usd: 250,
      days: 7,
      items: [
        "Google Analytics with up to 3 goals",
        "WhatsApp and call click tracking",
        "Meta Pixel, with a consent banner",
        "Simple results dashboard",
      ],
    },
    {
      name: "Lead Flow",
      usd: 450,
      days: 10,
      items: [
        "Everything in Tracking Setup",
        "Enquiries sent to WhatsApp and email",
        "Leads saved to a CRM or sheet",
        "1 automated follow-up",
      ],
    },
    {
      name: "Lead System",
      usd: 900,
      days: 20,
      items: [
        "Everything in Lead Flow",
        "CRM set up for your team",
        "3 automations: follow-up, reminders, booking",
        "Instagram and WhatsApp messages routed to one place",
        "Monthly results report",
      ],
    },
    {
      name: "Growth Engine",
      usd: 1600,
      days: 30,
      items: [
        "Everything in Lead System",
        "Customer journey mapped end to end",
        "5 automations",
        "Booking, payment and CRM connected",
        "Meta Conversions API",
        "Monthly results report",
      ],
    },
    {
      name: "Bespoke",
      usd: 2500,
      from: true,
      days: null,
      items: [
        "Custom growth system and integrations",
        "Built around how your team works",
        "Scope, price and deadline agreed in writing",
      ],
    },
  ],
  social: [
    {
      name: "Content Starter",
      usd: 250,
      unit: "per month",
      days: 7,
      items: [
        "1 platform",
        "8 posts a month (images or carousels)",
        "Captions written",
        "Content calendar",
      ],
    },
    {
      name: "Content Plus",
      usd: 450,
      unit: "per month",
      days: 7,
      items: [
        "2 platforms",
        "12 posts a month, including 4 Reels",
        "Captions written",
        "Scheduling",
        "Content calendar",
      ],
    },
    {
      name: "Social Growth",
      usd: 800,
      unit: "per month",
      days: 10,
      items: [
        "2 platforms",
        "16 posts a month, including 6 Reels",
        "1 campaign idea a month",
        "Scheduling",
        "Month-end report",
      ],
    },
    {
      name: "Content Engine",
      usd: 1400,
      unit: "per month",
      days: 10,
      items: [
        "3 platforms",
        "24 posts a month, including 10 Reels or motion graphics",
        "2 campaigns a month",
        "Ad creatives",
        "Month-end report",
      ],
    },
    {
      name: "Bespoke",
      usd: 2500,
      from: true,
      unit: "per month",
      days: null,
      items: [
        "Full content production and campaigns",
        "Shoots, motion and ads",
        "Scope, price and deadline agreed in writing",
      ],
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatUsd(usd: number, from = false) {
  return `${from ? "From " : ""}USD ${usd.toLocaleString("en-US")}`;
}

function deliveryLabel(pkg: Package) {
  if (pkg.days === null) return "Deadline agreed in writing";
  return pkg.unit === "per month"
    ? `First posts within ${pkg.days} working days`
    : `Delivered in ${pkg.days} working days`;
}

export function toConfigItem(pkg: Package, tag: ConfigTag): PricingConfigItem {
  return {
    name: pkg.name,
    price: formatUsd(pkg.usd, pkg.from),
    usd: pkg.usd,
    from: Boolean(pkg.from),
    unit: pkg.unit,
    delivery: deliveryLabel(pkg),
    items: pkg.items,
    tag,
  };
}

/** The full ladder for a service, as shown on /pricing. */
export function getLadder(offering: OfferingKey): PricingConfigItem[] {
  return PACKAGES[offering].map((pkg, i) =>
    toConfigItem(
      pkg,
      i === 1 ? "Recommended" : i === 0 ? "Essential" : "Expanded",
    ),
  );
}

/**
 * Three neighbouring packages for a budget band: the one that fits the
 * budget (Recommended) plus the one below and the one above it.
 */
export function getPricingConfigs(
  offering: OfferingKey,
  band: BudgetBandId,
): PricingConfigItem[] {
  const ladder = PACKAGES[offering];
  const rec = BAND_PACKAGE_INDEX[band] ?? 1;
  const start = Math.max(0, Math.min(rec - 1, ladder.length - 3));
  return ladder.slice(start, start + 3).map((pkg, i) => {
    const index = start + i;
    const tag: ConfigTag =
      index === rec ? "Recommended" : index < rec ? "Essential" : "Expanded";
    return toConfigItem(pkg, tag);
  });
}

/** Cheapest package for a service, e.g. "USD 250". */
export function startingPrice(offering: OfferingKey) {
  return formatUsd(PACKAGES[offering][0].usd);
}

/** Extracts the numeric portion of a price string for Schema.org */
export function extractPriceNumber(priceStr: string): string | undefined {
  const match = priceStr.match(/[\d,]+/);
  return match ? match[0].replace(/,/g, "") : undefined;
}
