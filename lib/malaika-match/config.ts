// Pricing data lives in lib/pricing.ts — update prices there, not here.
// Changes in lib/pricing.ts reflect on both /match and /pricing automatically.
export { LABELS } from "@/lib/pricing";
import { LABELS, getPricingConfigs, PACKAGES } from "@/lib/pricing";
import type { OfferingKey, BudgetBandId } from "@/lib/pricing";

export interface MatchOption {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  key: string;
  title: string;
  help?: string;
  multi?: boolean;
  options: MatchOption[];
}

export interface ConfigItem {
  name: string;
  /** "USD 250" or "From USD 2,500". */
  price: string;
  usd: number;
  from: boolean;
  unit?: string;
  /** Shilling equivalent at the day's rate, e.g. "KSh 32,450". */
  priceKes?: string;
  delivery: string;
  items: string[];
  tag: string;
}

export interface MatchAnswers {
  business?: string;
  offering?: string;
  websiteState?: string;
  websiteOutcome?: string;
  websiteNeeds?: string[];
  emailState?: string;
  emailGoal?: string;
  emailScope?: string[];
  seoVisibility?: string;
  seoFoundation?: string;
  seoFocus?: string[];
  growthSources?: string[];
  growthDropoff?: string;
  growthConnect?: string[];
  socialGoal?: string;
  socialSupport?: string[];
  socialPlatforms?: string[];
  ambition?: string;
  timeline?: string;
  budget?: string;
  [key: string]: string | string[] | undefined;
}

export interface ContactInfo {
  name: string;
  /** WhatsApp number, required: most Kenyan leads answer there first. */
  phone: string;
  /** Optional; only used to email a copy of the estimate. */
  email?: string;
}

export interface MatchResultPayload {
  score: number;
  category: string;
  headline: string;
  lede: string;
  brief: {
    business: string;
    offering: string;
    outcome: string;
    investment: string;
  };
  configs: ConfigItem[];
  recommendation: ConfigItem;
  recommendationCopy: string;
  recommendationReasons: string[];
  recommendationSpecs: Array<[string, string]>;
  whatsappUrl: string;
}

export const BASE_QUESTIONS: Question[] = [
  {
    key: "business",
    title: "Tell us a little about what you do.",
    help: "This helps us understand the context your digital presence needs to operate in.",
    options: [
      { value: "architecture", label: "Architecture & Design" },
      { value: "hospitality", label: "Hospitality & Travel" },
      { value: "professional", label: "Professional Services" },
      { value: "real-estate", label: "Real Estate" },
      { value: "retail", label: "Retail & Products" },
      { value: "wellness", label: "Wellness & Lifestyle" },
      { value: "creative", label: "Creative & Cultural" },
      { value: "other", label: "Other" },
    ],
  },
  {
    key: "offering",
    title: "What would you like Malaika to help you improve?",
    help: "Pick the area where you’d like to make the biggest difference.",
    options: [
      {
        value: "website",
        label: "Websites & Digital Experiences",
        description: "Build or improve the digital experience.",
      },
      {
        value: "email",
        label: "Email & Retention",
        description: "Turn attention into repeat business.",
      },
      {
        value: "seo",
        label: "SEO & Search Presence",
        description: "Help the right people find you.",
      },
      {
        value: "growth",
        label: "Digital Growth & Automation",
        description: "Connect leads, conversations and follow-up.",
      },
      {
        value: "social",
        label: "Social & Content",
        description: "Build a stronger, more consistent presence.",
      },
    ],
  },
];

export const OFFERING_QUESTIONS: Record<string, Question[]> = {
  website: [
    {
      key: "websiteState",
      title: "What are we working with?",
      help: "Tell us where the digital experience is today.",
      options: [
        { value: "new", label: "Starting from scratch" },
        { value: "redesign", label: "An existing website needs a redesign" },
        { value: "improve", label: "An existing website needs improvement" },
        { value: "store", label: "An online store / e-commerce experience" },
        { value: "custom", label: "Something more custom" },
      ],
    },
    {
      key: "websiteOutcome",
      title: "What does the experience need to do?",
      help: "Choose the outcome that matters most to the business.",
      options: [
        { value: "clarity", label: "Communicate clearly" },
        { value: "enquiries", label: "Generate enquiries" },
        { value: "bookings", label: "Drive bookings" },
        { value: "sell", label: "Sell products" },
        { value: "trust", label: "Build trust and authority" },
        { value: "growth", label: "Become a serious digital growth channel" },
      ],
    },
    {
      key: "websiteNeeds",
      title: "What needs to be part of it?",
      help: "Pick the capabilities that matter to your project.",
      multi: true,
      options: [
        { value: "services", label: "Services / offerings" },
        { value: "projects", label: "Projects / portfolio" },
        { value: "cases", label: "Case studies" },
        { value: "products", label: "Products" },
        { value: "booking", label: "Booking" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "forms", label: "Forms" },
        { value: "content", label: "Blog / content" },
        { value: "analytics", label: "Analytics" },
        { value: "seo", label: "Search visibility" },
        { value: "interactions", label: "Custom interactions" },
      ],
    },
  ],
  email: [
    {
      key: "emailState",
      title: "Where are you today with email?",
      help: "This tells us how much foundation already exists.",
      options: [
        { value: "none", label: "We don’t have an email system yet" },
        { value: "list", label: "We have a list but rarely use it" },
        { value: "manual", label: "We send campaigns manually" },
        { value: "automation", label: "We already have automated emails" },
        {
          value: "improve",
          label: "We have a system but it needs improvement",
        },
      ],
    },
    {
      key: "emailGoal",
      title: "What do you want email to do?",
      help: "Choose the outcomes that matter most.",
      options: [
        { value: "campaigns", label: "Run better campaigns" },
        { value: "retention", label: "Improve customer retention" },
        { value: "followup", label: "Automate follow-up" },
        {
          value: "newsletter",
          label: "Build a newsletter / regular communication",
        },
        { value: "promotion", label: "Promote products or services" },
        { value: "reengage", label: "Re-engage inactive customers" },
      ],
    },
    {
      key: "emailScope",
      title: "What would you like Malaika to handle?",
      help: "Select the level of support you need.",
      multi: true,
      options: [
        { value: "strategy", label: "Strategy" },
        { value: "setup", label: "Platform setup" },
        { value: "templates", label: "Templates" },
        { value: "campaigns", label: "Campaign production" },
        { value: "automation", label: "Automation" },
        { value: "reporting", label: "Reporting" },
        { value: "optimisation", label: "Optimisation" },
      ],
    },
  ],
  seo: [
    {
      key: "seoVisibility",
      title: "Where do you want to become more visible?",
      help: "Search can work differently depending on what people are looking for.",
      options: [
        { value: "google", label: "Google search" },
        { value: "local", label: "Local search" },
        { value: "services", label: "Specific services" },
        { value: "products", label: "Specific products" },
        { value: "locations", label: "Specific locations" },
        { value: "discovery", label: "AI / search discovery" },
        { value: "brand", label: "General brand visibility" },
      ],
    },
    {
      key: "seoFoundation",
      title: "What do you already have?",
      help: "We’ll build from what exists rather than starting blindly.",
      options: [
        { value: "nothing", label: "Nothing structured yet" },
        { value: "search-console", label: "Google Search Console" },
        { value: "gbp", label: "Google Business Profile" },
        { value: "content", label: "Existing search content" },
        { value: "seo", label: "An existing SEO programme" },
      ],
    },
    {
      key: "seoFocus",
      title: "Where should we focus?",
      help: "Choose the areas you want included.",
      multi: true,
      options: [
        { value: "technical", label: "Technical SEO" },
        { value: "onpage", label: "On-page optimisation" },
        { value: "keywords", label: "Keyword research" },
        { value: "local", label: "Local SEO" },
        { value: "content", label: "Content" },
        { value: "competitors", label: "Competitor analysis" },
      ],
    },
  ],
  growth: [
    {
      key: "growthSources",
      title: "Where are people currently coming from?",
      help: "Think about the channels that create attention or leads today.",
      multi: true,
      options: [
        { value: "website", label: "Website" },
        { value: "instagram", label: "Instagram" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "google", label: "Google" },
        { value: "email", label: "Email" },
        { value: "multiple", label: "Multiple channels" },
      ],
    },
    {
      key: "growthDropoff",
      title: "Where do you lose people?",
      help: "If you’re not sure, that’s useful information too.",
      options: [
        { value: "enquiry", label: "Before enquiry" },
        { value: "followup", label: "After enquiry / during follow-up" },
        { value: "booking", label: "During booking" },
        { value: "purchase", label: "After purchase" },
        { value: "unknown", label: "We’re not sure yet" },
      ],
    },
    {
      key: "growthConnect",
      title: "What would you like connected?",
      help: "Pick the systems you want Malaika to help connect.",
      multi: true,
      options: [
        { value: "website", label: "Website" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "instagram", label: "Instagram" },
        { value: "email", label: "Email" },
        { value: "crm", label: "CRM" },
        { value: "booking", label: "Booking" },
        { value: "analytics", label: "Analytics" },
        { value: "notifications", label: "Lead notifications" },
      ],
    },
  ],
  social: [
    {
      key: "socialGoal",
      title: "What are you trying to build?",
      help: "Choose the outcome behind your social presence.",
      options: [
        { value: "consistent", label: "A consistent presence" },
        { value: "awareness", label: "Brand awareness" },
        { value: "authority", label: "Authority and trust" },
        { value: "leads", label: "Lead generation" },
        { value: "campaigns", label: "Campaigns" },
        { value: "promotion", label: "Product / service promotion" },
      ],
    },
    {
      key: "socialSupport",
      title: "What do you need help with?",
      help: "Choose the areas where you want Malaika involved.",
      multi: true,
      options: [
        { value: "strategy", label: "Strategy" },
        { value: "creative", label: "Creative direction" },
        { value: "production", label: "Content production" },
        { value: "copy", label: "Copywriting" },
        { value: "publishing", label: "Publishing" },
        { value: "campaigns", label: "Campaigns" },
        { value: "reporting", label: "Reporting" },
      ],
    },
    {
      key: "socialPlatforms",
      title: "Where do you want to show up?",
      help: "Select the platforms that matter to your business.",
      multi: true,
      options: [
        { value: "instagram", label: "Instagram" },
        { value: "facebook", label: "Facebook" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "x", label: "X" },
        { value: "multiple", label: "Multiple platforms" },
      ],
    },
  ],
};

export const COMMON_QUESTIONS: Question[] = [
  {
    key: "ambition",
    title: "How far do you want to take this?",
    help: "There’s no right answer. This simply tells us how much depth to design for.",
    options: [
      {
        value: "foundation",
        label: "Foundation — get the essentials working properly.",
      },
      { value: "growth", label: "Growth — actively support the business." },
      {
        value: "strategic",
        label: "Strategic — connect the work to a larger growth system.",
      },
      {
        value: "distinctive",
        label:
          "Distinctive — push the experience, sophistication and impact further.",
      },
    ],
  },
  {
    key: "timeline",
    title: "When would you like to get moving?",
    help: "This helps us understand the project window.",
    options: [
      { value: "exploring", label: "Just exploring" },
      { value: "three-months", label: "Within the next 3 months" },
      { value: "one-month", label: "Within the next 30 days" },
      { value: "ready", label: "Ready to start" },
    ],
  },
  {
    key: "budget",
    title: "What are you comfortable investing in this project?",
    help: "This helps us suggest the right package. It isn’t automatically the price of the project.",
    options: [
      { value: "starter", label: "Under USD 400 (about KSh 50,000)" },
      { value: "growth", label: "USD 400 – 800 (about KSh 50,000 – 100,000)" },
      {
        value: "strategic",
        label: "USD 800 – 1,500 (about KSh 100,000 – 195,000)",
      },
      { value: "bespoke", label: "USD 1,500+ (about KSh 195,000+)" },
      { value: "unsure", label: "I’m not sure yet — I need guidance" },
    ],
  },
];

/**
 * Turns what people type into international digits for wa.me and Brevo:
 * "0712 345 678" and "712345678" become "254712345678"; "+44 7700 900123"
 * becomes "447700900123". Returns null when it can't be a phone number.
 */
export function normalisePhone(raw: string | undefined): string | null {
  if (!raw) return null;
  let digits = raw.replace(/[^\d]/g, "");
  if (raw.trim().startsWith("+")) {
    // already international
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (/^0[17]\d{8}$/.test(digits)) {
    digits = `254${digits.slice(1)}`;
  } else if (/^[17]\d{8}$/.test(digits)) {
    digits = `254${digits}`;
  }
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

export function scoreMatch(a: MatchAnswers): {
  score: number;
  category: string;
} {
  // Budget and timeline carry most of the weight, so the score sorts leads:
  // a ready buyer with a budget lands high, "just exploring, not sure" lands
  // under 60 and reads "Let's Talk First".
  const budgetPoints: Record<string, number> = {
    bespoke: 20,
    strategic: 16,
    growth: 12,
    starter: 6,
    unsure: 0,
  };
  const timelinePoints: Record<string, number> = {
    ready: 15,
    "one-month": 12,
    "three-months": 7,
    exploring: 0,
  };
  const ambitionPoints: Record<string, number> = {
    foundation: 2,
    growth: 4,
    strategic: 5,
    distinctive: 6,
  };

  let score = 50;
  if (a.offering) score += 5;
  if (a.business && a.business !== "other") score += 3;
  score += budgetPoints[a.budget ?? ""] ?? 0;
  score += timelinePoints[a.timeline ?? ""] ?? 0;
  score += ambitionPoints[a.ambition ?? ""] ?? 0;
  const multiCount = (
    a.websiteNeeds ||
    a.emailScope ||
    a.seoFocus ||
    a.growthConnect ||
    a.socialSupport ||
    []
  ).length;
  if (multiCount >= 3) score += 3;

  const finalScore = Math.min(99, Math.max(35, score));
  const category =
    finalScore >= 85
      ? "Strong Match"
      : finalScore >= 72
        ? "Good Match"
        : finalScore >= 60
          ? "Potential Match"
          : "Let's Talk First";
  return { score: finalScore, category };
}

export function offeringOutcome(a: MatchAnswers): string {
  const maps: Record<string, Record<string, string>> = {
    website: {
      new: "New website",
      redesign: "Website redesign",
      improve: "Website improvement",
      store: "E-commerce experience",
      custom: "Custom digital experience",
    },
    email: {
      campaigns: "Email campaigns",
      retention: "Customer retention",
      followup: "Automated follow-up",
      newsletter: "Regular communication",
      promotion: "Product / service promotion",
      reengage: "Re-engagement",
    },
    seo: {
      google: "Google visibility",
      local: "Local search",
      services: "Service visibility",
      products: "Product visibility",
      locations: "Location visibility",
      discovery: "AI / search discovery",
      brand: "Brand visibility",
    },
    growth: {
      enquiry: "Lead journey",
      followup: "Lead follow-up",
      booking: "Booking journey",
      purchase: "Customer journey",
      unknown: "Conversion journey",
    },
    social: {
      consistent: "Consistent presence",
      awareness: "Brand awareness",
      authority: "Authority & trust",
      leads: "Lead generation",
      campaigns: "Campaigns",
      promotion: "Product / service promotion",
    },
  };
  const keyMap: Record<string, string> = {
    website: "websiteOutcome",
    email: "emailGoal",
    seo: "seoVisibility",
    growth: "growthDropoff",
    social: "socialGoal",
  };
  const keyName = a.offering ? keyMap[a.offering] : undefined;
  const ansValue = keyName ? (a[keyName] as string) : undefined;

  if (
    a.offering &&
    maps[a.offering] &&
    ansValue &&
    maps[a.offering][ansValue]
  ) {
    return maps[a.offering][ansValue];
  }
  return a.offering
    ? LABELS.offering[a.offering as keyof typeof LABELS.offering] ||
        "your project"
    : "your project";
}

export function buildConfigs(a: MatchAnswers): ConfigItem[] {
  const offering = (a.offering || "website") as OfferingKey;
  const bands: BudgetBandId[] = ["starter", "growth", "strategic", "bespoke"];
  // Unsure, or an old saved answer: start from the second package.
  const budget = bands.includes(a.budget as BudgetBandId)
    ? (a.budget as BudgetBandId)
    : "growth";
  return getPricingConfigs(PACKAGES[offering] ? offering : "website", budget);
}

export function getRecommendationCopy(a: MatchAnswers): string {
  const names: Record<string, string> = {
    website:
      "This gives your digital presence enough room to communicate clearly, support conversion and measure what happens after people arrive.",
    email:
      "This gives your retention system enough room to move beyond isolated campaigns and start supporting repeat engagement.",
    seo: "This gives your search presence enough room to build a real foundation while focusing on the visibility you actually want.",
    growth:
      "This gives the customer journey enough room to connect the important touchpoints without adding automation for its own sake.",
    social:
      "This gives your content presence enough room to establish a clear direction and produce consistently without turning it into noise.",
  };
  return a.offering && names[a.offering] ? names[a.offering] : names.website;
}

export function getRecommendationReasons(a: MatchAnswers): string[] {
  const outcome = offeringOutcome(a);
  const reasons = [
    `Built around your objective (${outcome})`,
    "Designed for clarity and customer conversion",
    "Measurement framework to track outcomes",
    "Room for refinement without unnecessary complexity",
  ];
  if (a.ambition === "distinctive") {
    reasons[3] = "Scope to build a distinctive digital presence";
  }
  return reasons;
}

export function calculateMatchResult(
  answers: MatchAnswers,
): MatchResultPayload {
  const { score, category } = scoreMatch(answers);
  const configs = buildConfigs(answers);
  const recommendation =
    configs.find((c) => c.tag === "Recommended") ?? configs[0];
  const offering = answers.offering
    ? LABELS.offering[answers.offering as keyof typeof LABELS.offering] ||
      "your project"
    : "your project";
  const business = answers.business
    ? LABELS.business[answers.business as keyof typeof LABELS.business] ||
      "your business"
    : "your business";
  const outcome = offeringOutcome(answers);
  const investment = answers.budget
    ? LABELS.budget[answers.budget as keyof typeof LABELS.budget] ||
      "Not sure yet"
    : "Not sure yet";

  const headline =
    score >= 80
      ? 'Looks like you’re building something <span class="blue">great.</span>'
      : score >= 60
        ? 'This looks <span class="blue">promising.</span>'
        : 'There’s something to <span class="blue">explore here.</span>';

  const lede = `We understood what you’re trying to improve, what success looks like and how far you want to take it. Here’s what we’d build around your brief.`;

  const recCopy = getRecommendationCopy(answers);
  const recReasons = getRecommendationReasons(answers);
  const recSpecs: Array<[string, string]> = [
    [recommendation.items[0] || "Custom scope", "Main deliverable"],
    [recommendation.delivery, "Deadline"],
    [
      recommendation.items[recommendation.items.length - 1] || "Included",
      "Also included",
    ],
  ];

  const whatsappText = `Hi Malaika Studios, I completed The Malaika Match! Score: ${score}%. Focus: ${offering}. Recommended configuration: ${recommendation.name} (${recommendation.price}). I'd like to talk about the project and refine the scope.`;
  const whatsappUrl = `https://wa.me/254745474586?text=${encodeURIComponent(whatsappText)}`;

  return {
    score,
    category,
    headline,
    lede,
    brief: {
      business,
      offering,
      outcome,
      investment,
    },
    configs,
    recommendation,
    recommendationCopy: recCopy,
    recommendationReasons: recReasons,
    recommendationSpecs: recSpecs,
    whatsappUrl,
  };
}
