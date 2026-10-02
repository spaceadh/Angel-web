/**
 * lib/pricing.ts
 *
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SINGLE SOURCE OF TRUTH — ALL MALAIKA STUDIOS PRICING           ║
 * ║  Update prices here → reflects on /pricing and /match instantly  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type OfferingKey = "website" | "email" | "seo" | "growth" | "social";
export type BudgetBandId = "20-50" | "50-100" | "100-200" | "200+";
export type ConfigTag = "Essential" | "Recommended" | "Expanded";

export interface PricingConfigItem {
  name: string;
  price: string;
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

// ─── Budget Bands ─────────────────────────────────────────────────────────────

export const BUDGET_BANDS: readonly BudgetBand[] = [
  { id: "20-50",   label: "Starter",   range: "KSh 20k – 50k"   },
  { id: "50-100",  label: "Growth",    range: "KSh 50k – 100k"  },
  { id: "100-200", label: "Strategic", range: "KSh 100k – 200k" },
  { id: "200+",    label: "Bespoke",   range: "KSh 200k+"        },
] as const;

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
    description: "Turn attention into repeat business with email and automation.",
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
    architecture:  "Architecture & Design",
    hospitality:   "Hospitality & Travel",
    professional:  "Professional Services",
    "real-estate": "Real Estate",
    retail:        "Retail & Products",
    wellness:      "Wellness & Lifestyle",
    creative:      "Creative & Cultural",
    other:         "Other Business",
  },
  offering: {
    website: "Websites & Digital Experiences",
    email:   "Email & Retention",
    seo:     "SEO & Search Presence",
    growth:  "Digital Growth & Automation",
    social:  "Social & Content",
  },
  ambition: {
    foundation:  "Foundation",
    growth:      "Growth",
    strategic:   "Strategic",
    distinctive: "Distinctive",
  },
  timeline: {
    exploring:      "Just exploring",
    "three-months": "Within 3 months",
    "one-month":    "Within 30 days",
    ready:          "Ready to start",
  },
  budget: {
    "20-50":   "KSh 20k–50k",
    "50-100":  "KSh 50k–100k",
    "100-200": "KSh 100k–200k",
    "200+":    "KSh 200k+",
    unsure:    "Not sure yet",
  },
};

// ─── CONFIGS ──────────────────────────────────────────────────────────────────
//
// Format: [configName, price, [deliverable, deliverable, ...]]
// Index 0 = Essential  |  Index 1 = Recommended  |  Index 2 = Expanded
//
// ┌─────────────────────────────────────────────────────────────────────┐
// │  TO UPDATE PRICING: edit the values below.                          │
// │  Changes automatically reflect on /pricing and /match result pages. │
// └─────────────────────────────────────────────────────────────────────┘

export const CONFIGS: Record<OfferingKey, Record<BudgetBandId, Array<[string, string, string[]]>>> = {

  // ── WEBSITES ──────────────────────────────────────────────────────────
  website: {
    "20-50": [
      ["Foundation",  "KSh 25,000", ["Up to 4 pages", "Up to 2 unique layouts", "1 form", "Analytics", "Basic SEO", "2 revision rounds"]],
      ["Focused",     "KSh 35,000", ["Up to 5 pages", "Up to 3 unique layouts", "1 form", "Analytics + Search Console", "Basic SEO", "2 revision rounds"]],
      ["Expanded",    "KSh 45,000", ["Up to 7 pages", "Up to 4 unique layouts", "2 forms", "Analytics + Search Console", "Basic SEO", "2 revision rounds"]],
    ],
    "50-100": [
      ["Essential Growth", "KSh 55,000", ["Up to 6 pages", "Up to 4 unique layouts", "2 forms", "Analytics + Search Console", "Basic / on-page SEO", "3 revision rounds"]],
      ["Growth Build",     "KSh 75,000", ["Up to 8 pages", "Up to 6 unique layouts", "2 forms", "Event tracking", "Strong SEO foundation", "4 revision rounds"]],
      ["Experience Build", "KSh 95,000", ["Up to 10 pages", "Up to 7 unique layouts", "3 forms", "Advanced tracking", "Strong SEO", "4 revision rounds"]],
    ],
    "100-200": [
      ["Strategic Build",      "KSh 110,000", ["Up to 10 pages", "Up to 7 unique layouts", "3 forms", "GA4 + GSC + GTM", "Strategic SEO", "4 revision rounds"]],
      ["Digital Growth Build", "KSh 150,000", ["Up to 14 pages", "Up to 10 unique layouts", "4 forms", "Advanced tracking", "Advanced SEO", "4 revision rounds"]],
      ["Digital Experience",   "KSh 190,000", ["Up to 18 pages", "Up to 12 unique layouts", "4+ forms", "Deep tracking", "Advanced SEO", "5 revision rounds"]],
    ],
    "200+": [
      ["Bespoke",            "From KSh 220,000",  ["Bespoke page scope", "Custom layouts", "Custom functionality", "Analytics + tracking", "Strategic SEO", "Scoped revisions"]],
      ["Bespoke Growth",     "From KSh 275,000",  ["Expanded experience", "Advanced interactions", "Growth systems", "Deep tracking", "Advanced SEO", "Scoped revisions"]],
      ["Bespoke Experience", "From KSh 350,000+", ["Fully bespoke digital experience", "Custom functionality", "Advanced interactions", "Growth infrastructure", "Deep analytics", "Scoped revisions"]],
    ],
  },

  // ── EMAIL ─────────────────────────────────────────────────────────────
  email: {
    "20-50": [
      ["Email Foundation", "KSh 25,000", ["Platform setup", "Domain authentication", "1 reusable template", "1 campaign", "Basic reporting"]],
      ["Email Starter",    "KSh 35,000", ["Platform setup", "Authentication", "1 template", "2 campaigns", "Basic segmentation", "Reporting"]],
      ["Email Active",     "KSh 45,000", ["Platform setup", "2 templates", "3 campaigns", "Basic segmentation", "Signup integration", "Reporting"]],
    ],
    "50-100": [
      ["Email Essential", "KSh 55,000", ["Platform integration", "2 templates", "3 campaigns", "Audience segmentation", "Basic automation", "Reporting"]],
      ["Email Growth",    "KSh 75,000", ["Platform integration", "3 campaigns", "1 reusable system", "Segmentation", "1 automated sequence", "Reporting + optimisation"]],
      ["Email Retention", "KSh 95,000", ["Platform integration", "4 campaigns", "Segmentation", "2 automated sequences", "A/B test setup", "Optimisation + reporting"]],
    ],
    "100-200": [
      ["Retention Foundation", "KSh 110,000", ["Strategy", "4 campaigns", "Segmentation", "2 sequences", "Platform optimisation", "Reporting"]],
      ["Retention Growth",     "KSh 150,000", ["Strategy", "6 campaigns", "Multiple segments", "3 sequences", "A/B testing", "Optimisation"]],
      ["Retention System",     "KSh 190,000", ["Retention strategy", "8 campaigns", "Advanced segmentation", "4 sequences", "Testing framework", "Ongoing optimisation setup"]],
    ],
    "200+": [
      ["Bespoke Email",       "From KSh 220,000",  ["Custom retention strategy", "Campaign system", "Advanced automation", "Segmentation architecture", "Testing", "Reporting"]],
      ["Email Growth System", "From KSh 275,000",  ["Advanced lifecycle system", "Multiple sequences", "Campaign engine", "Optimisation framework", "Reporting"]],
      ["Retention Engine",    "From KSh 350,000+", ["Fully bespoke lifecycle system", "Advanced automation", "Deep segmentation", "Testing + optimisation", "Custom reporting"]],
    ],
  },

  // ── SEO ───────────────────────────────────────────────────────────────
  seo: {
    "20-50": [
      ["Search Foundation", "KSh 25,000", ["Technical baseline", "Search Console", "Keyword research", "Up to 5 pages optimised", "Metadata", "Indexing checks"]],
      ["Search Starter",    "KSh 35,000", ["Technical baseline", "Search Console", "Keyword research", "Up to 8 pages optimised", "Metadata", "Internal linking"]],
      ["Search Local",      "KSh 45,000", ["Search foundation", "Local SEO setup", "Keyword research", "Up to 10 pages", "Business Profile optimisation", "Reporting"]],
    ],
    "50-100": [
      ["SEO Essential",   "KSh 55,000", ["Technical audit", "Keyword research", "Up to 10 pages", "Search Console", "Metadata + internal linking", "Reporting"]],
      ["Search Growth",   "KSh 75,000", ["Technical audit", "Competitor analysis", "Up to 15 pages", "Keyword strategy", "On-page optimisation", "Reporting + optimisation"]],
      ["Search Authority","KSh 95,000", ["Technical audit", "Competitor analysis", "Up to 20 pages", "Content direction", "On-page + local SEO", "Reporting + optimisation"]],
    ],
    "100-200": [
      ["Strategic SEO",           "KSh 110,000", ["Technical audit", "Competitor research", "Up to 20 pages", "Keyword strategy", "Content briefs", "Technical + on-page SEO"]],
      ["Search Growth System",    "KSh 150,000", ["Full search strategy", "Competitor research", "Up to 30 pages", "Content briefs", "Local / GEO considerations", "Optimisation cycles"]],
      ["Search Authority System", "KSh 190,000", ["Advanced search strategy", "Deep competitor research", "Up to 40 pages", "Content system", "Technical + local + GEO", "Optimisation framework"]],
    ],
    "200+": [
      ["Bespoke Search",       "From KSh 220,000",  ["Custom search strategy", "Technical SEO", "Content architecture", "Entity / brand optimisation", "Advanced reporting"]],
      ["Search Growth System", "From KSh 275,000",  ["Advanced search programme", "Content system", "Local / GEO strategy", "Testing + optimisation", "Deep reporting"]],
      ["Search Authority",     "From KSh 350,000+", ["Bespoke search ecosystem", "Advanced technical work", "Content + entity strategy", "Multi-location capability", "Deep optimisation"]],
    ],
  },

  // ── GROWTH ────────────────────────────────────────────────────────────
  growth: {
    "20-50": [
      ["Tracking Foundation", "KSh 25,000", ["Analytics setup", "Core conversion goals", "Basic event tracking", "WhatsApp tracking", "Simple reporting"]],
      ["Lead Foundation",     "KSh 35,000", ["Analytics", "Conversion points", "Lead routing", "WhatsApp flow", "Basic reporting"]],
      ["Growth Starter",      "KSh 45,000", ["Analytics", "Conversion tracking", "Lead routing", "1 automation", "WhatsApp / Instagram flow", "Reporting"]],
    ],
    "50-100": [
      ["Growth Essential",  "KSh 55,000", ["Analytics", "Conversion goals", "Lead routing", "1 automation", "WhatsApp integration", "Reporting"]],
      ["Growth System",     "KSh 75,000", ["Funnel mapping", "Event tracking", "Lead routing", "2 automations", "WhatsApp / Instagram flows", "Reporting"]],
      ["Growth Automation", "KSh 95,000", ["Funnel mapping", "Advanced events", "Lead routing", "3 automations", "Multiple flows", "Optimisation + reporting"]],
    ],
    "100-200": [
      ["Digital Growth",        "KSh 110,000", ["Funnel strategy", "Advanced tracking", "Lead routing", "3 automations", "CRM / booking integration", "Reporting"]],
      ["Growth Engine",         "KSh 150,000", ["Conversion strategy", "Advanced analytics", "Multiple automations", "CRM integrations", "Experiments", "Optimisation cycles"]],
      ["Growth Infrastructure", "KSh 190,000", ["Growth architecture", "Deep tracking", "Advanced automation", "Multiple integrations", "Experiments", "Optimisation framework"]],
    ],
    "200+": [
      ["Bespoke Growth",                "From KSh 220,000",  ["Custom growth architecture", "Advanced tracking", "Custom automations", "Integrations", "Experiments", "Reporting"]],
      ["Growth Engine",                 "From KSh 275,000",  ["Advanced funnel system", "Automation architecture", "CRM ecosystem", "Testing", "Optimisation"]],
      ["Digital Growth Infrastructure", "From KSh 350,000+", ["Fully bespoke growth system", "Advanced automation", "Deep analytics", "Multiple integrations", "Continuous optimisation framework"]],
    ],
  },

  // ── SOCIAL ────────────────────────────────────────────────────────────
  social: {
    "20-50": [
      ["Content Foundation", "KSh 25,000", ["Content strategy", "2 content pillars", "6 static creatives", "Copy direction", "1 platform"]],
      ["Social Starter",     "KSh 35,000", ["Strategy", "3 content pillars", "8 creatives", "Copywriting", "1 platform"]],
      ["Social Active",      "KSh 45,000", ["Strategy", "3 pillars", "10 creatives", "Copywriting", "2 platforms", "Basic reporting"]],
    ],
    "50-100": [
      ["Social Essential", "KSh 55,000", ["Strategy", "3 pillars", "10 creatives", "Copywriting", "2 platforms", "Reporting"]],
      ["Social Growth",    "KSh 75,000", ["Strategy", "4 pillars", "12 creatives", "Campaign concept", "2 platforms", "Reporting"]],
      ["Social Campaign",  "KSh 95,000", ["Strategy", "4 pillars", "16 creatives", "Campaign production", "3 platforms", "Performance analysis"]],
    ],
    "100-200": [
      ["Content Strategy",       "KSh 110,000", ["Content strategy", "4 pillars", "16 creatives", "Campaign planning", "3 platforms", "Reporting"]],
      ["Social Growth System",   "KSh 150,000", ["Strategy", "5 pillars", "20 creatives", "Campaigns", "3 platforms", "Performance analysis"]],
      ["Social Content Engine",  "KSh 190,000", ["Strategy", "5 pillars", "24 creatives", "Multiple campaigns", "3+ platforms", "Optimisation"]],
    ],
    "200+": [
      ["Bespoke Social",        "From KSh 220,000",  ["Custom strategy", "Content system", "Campaigns", "Creative production", "Multi-platform", "Reporting"]],
      ["Social Growth System",  "From KSh 275,000",  ["Advanced content engine", "Campaign system", "Creative direction", "Multi-platform", "Optimisation"]],
      ["Social Content Engine", "From KSh 350,000+", ["Fully bespoke social system", "Advanced creative production", "Campaign architecture", "Multi-platform", "Deep reporting"]],
    ],
  },
};

// ─── Helper ───────────────────────────────────────────────────────────────────

const CONFIG_TAGS: ConfigTag[] = ["Essential", "Recommended", "Expanded"];

/** Returns typed PricingConfigItem[] for a given offering + budget band */
export function getPricingConfigs(
  offering: OfferingKey,
  band: BudgetBandId
): PricingConfigItem[] {
  return CONFIGS[offering][band].map((item, i) => ({
    name:  item[0],
    price: item[1],
    items: item[2],
    tag:   CONFIG_TAGS[i],
  }));
}

/** Extracts the numeric portion of a price string for Schema.org */
export function extractPriceNumber(priceStr: string): string | undefined {
  const match = priceStr.match(/[\d,]+/);
  return match ? match[0].replace(/,/g, "") : undefined;
}
