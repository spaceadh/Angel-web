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
  price: string;
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
  email: string;
  phone?: string;
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
      { value: "other", label: "Other" }
    ]
  },
  {
    key: "offering",
    title: "What would you like Malaika to help you improve?",
    help: "Pick the area where you’d like to make the biggest difference.",
    options: [
      { value: "website", label: "Websites & Digital Experiences", description: "Build or improve the digital experience." },
      { value: "email", label: "Email & Retention", description: "Turn attention into repeat business." },
      { value: "seo", label: "SEO & Search Presence", description: "Help the right people find you." },
      { value: "growth", label: "Digital Growth & Automation", description: "Connect leads, conversations and follow-up." },
      { value: "social", label: "Social & Content", description: "Build a stronger, more consistent presence." }
    ]
  }
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
        { value: "custom", label: "Something more custom" }
      ]
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
        { value: "growth", label: "Become a serious digital growth channel" }
      ]
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
        { value: "interactions", label: "Custom interactions" }
      ]
    }
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
        { value: "improve", label: "We have a system but it needs improvement" }
      ]
    },
    {
      key: "emailGoal",
      title: "What do you want email to do?",
      help: "Choose the outcomes that matter most.",
      options: [
        { value: "campaigns", label: "Run better campaigns" },
        { value: "retention", label: "Improve customer retention" },
        { value: "followup", label: "Automate follow-up" },
        { value: "newsletter", label: "Build a newsletter / regular communication" },
        { value: "promotion", label: "Promote products or services" },
        { value: "reengage", label: "Re-engage inactive customers" }
      ]
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
        { value: "optimisation", label: "Optimisation" }
      ]
    }
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
        { value: "brand", label: "General brand visibility" }
      ]
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
        { value: "seo", label: "An existing SEO programme" }
      ]
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
        { value: "competitors", label: "Competitor analysis" }
      ]
    }
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
        { value: "multiple", label: "Multiple channels" }
      ]
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
        { value: "unknown", label: "We’re not sure yet" }
      ]
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
        { value: "notifications", label: "Lead notifications" }
      ]
    }
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
        { value: "promotion", label: "Product / service promotion" }
      ]
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
        { value: "reporting", label: "Reporting" }
      ]
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
        { value: "multiple", label: "Multiple platforms" }
      ]
    }
  ]
};

export const COMMON_QUESTIONS: Question[] = [
  {
    key: "ambition",
    title: "How far do you want to take this?",
    help: "There’s no right answer. This simply tells us how much depth to design for.",
    options: [
      { value: "foundation", label: "Foundation — get the essentials working properly." },
      { value: "growth", label: "Growth — actively support the business." },
      { value: "strategic", label: "Strategic — connect the work to a larger growth system." },
      { value: "distinctive", label: "Distinctive — push the experience, sophistication and impact further." }
    ]
  },
  {
    key: "timeline",
    title: "When would you like to get moving?",
    help: "This helps us understand the project window.",
    options: [
      { value: "exploring", label: "Just exploring" },
      { value: "three-months", label: "Within the next 3 months" },
      { value: "one-month", label: "Within the next 30 days" },
      { value: "ready", label: "Ready to start" }
    ]
  },
  {
    key: "budget",
    title: "What are you comfortable investing in this project?",
    help: "Your budget helps us understand the territory we’re working within. It isn’t automatically the price of the project.",
    options: [
      { value: "20-50", label: "KSh 20k – 50k" },
      { value: "50-100", label: "KSh 50k – 100k" },
      { value: "100-200", label: "KSh 100k – 200k" },
      { value: "200+", label: "KSh 200k+" },
      { value: "unsure", label: "I’m not sure yet — I need guidance" }
    ]
  }
];

export const LABELS = {
  business: {
    architecture: "Architecture & Design",
    hospitality: "Hospitality & Travel",
    professional: "Professional Services",
    "real-estate": "Real Estate",
    retail: "Retail & Products",
    wellness: "Wellness & Lifestyle",
    creative: "Creative & Cultural",
    other: "Other Business"
  },
  offering: {
    website: "Websites & Digital Experiences",
    email: "Email & Retention",
    seo: "SEO & Search Presence",
    growth: "Digital Growth & Automation",
    social: "Social & Content"
  },
  ambition: {
    foundation: "Foundation",
    growth: "Growth",
    strategic: "Strategic",
    distinctive: "Distinctive"
  },
  timeline: {
    exploring: "Just exploring",
    "three-months": "Within 3 months",
    "one-month": "Within 30 days",
    ready: "Ready to start"
  },
  budget: {
    "20-50": "KSh 20k–50k",
    "50-100": "KSh 50k–100k",
    "100-200": "KSh 100k–200k",
    "200+": "KSh 200k+",
    unsure: "Not sure yet"
  }
};

export const CONFIGS: Record<string, Record<string, Array<[string, string, string[]]>>> = {
  website: {
    "20-50": [
      ["Foundation", "KSh 25,000", ["Up to 4 pages", "Up to 2 unique layouts", "1 form", "Analytics", "Basic SEO", "2 revision rounds"]],
      ["Focused", "KSh 35,000", ["Up to 5 pages", "Up to 3 unique layouts", "1 form", "Analytics + Search Console", "Basic SEO", "2 revision rounds"]],
      ["Expanded", "KSh 45,000", ["Up to 7 pages", "Up to 4 unique layouts", "2 forms", "Analytics + Search Console", "Basic SEO", "2 revision rounds"]]
    ],
    "50-100": [
      ["Essential Growth", "KSh 55,000", ["Up to 6 pages", "Up to 4 unique layouts", "2 forms", "Analytics + Search Console", "Basic / on-page SEO", "3 revision rounds"]],
      ["Growth Build", "KSh 75,000", ["Up to 8 pages", "Up to 6 unique layouts", "2 forms", "Event tracking", "Strong SEO foundation", "4 revision rounds"]],
      ["Experience Build", "KSh 95,000", ["Up to 10 pages", "Up to 7 unique layouts", "3 forms", "Advanced tracking", "Strong SEO", "4 revision rounds"]]
    ],
    "100-200": [
      ["Strategic Build", "KSh 110,000", ["Up to 10 pages", "Up to 7 unique layouts", "3 forms", "GA4 + GSC + GTM", "Strategic SEO", "4 revision rounds"]],
      ["Digital Growth Build", "KSh 150,000", ["Up to 14 pages", "Up to 10 unique layouts", "4 forms", "Advanced tracking", "Advanced SEO", "4 revision rounds"]],
      ["Digital Experience", "KSh 190,000", ["Up to 18 pages", "Up to 12 unique layouts", "4+ forms", "Deep tracking", "Advanced SEO", "5 revision rounds"]]
    ],
    "200+": [
      ["Bespoke", "From KSh 220,000", ["Bespoke page scope", "Custom layouts", "Custom functionality", "Analytics + tracking", "Strategic SEO", "Scoped revisions"]],
      ["Bespoke Growth", "From KSh 275,000", ["Expanded experience", "Advanced interactions", "Growth systems", "Deep tracking", "Advanced SEO", "Scoped revisions"]],
      ["Bespoke Experience", "From KSh 350,000+", ["Fully bespoke digital experience", "Custom functionality", "Advanced interactions", "Growth infrastructure", "Deep analytics", "Scoped revisions"]]
    ]
  },
  email: {
    "20-50": [
      ["Email Foundation", "KSh 25,000", ["Platform setup", "Domain authentication", "1 reusable template", "1 campaign", "Basic reporting"]],
      ["Email Starter", "KSh 35,000", ["Platform setup", "Authentication", "1 template", "2 campaigns", "Basic segmentation", "Reporting"]],
      ["Email Active", "KSh 45,000", ["Platform setup", "2 templates", "3 campaigns", "Basic segmentation", "Signup integration", "Reporting"]]
    ],
    "50-100": [
      ["Email Essential", "KSh 55,000", ["Platform integration", "2 templates", "3 campaigns", "Audience segmentation", "Basic automation", "Reporting"]],
      ["Email Growth", "KSh 75,000", ["Platform integration", "3 campaigns", "1 reusable system", "Segmentation", "1 automated sequence", "Reporting + optimisation"]],
      ["Email Retention", "KSh 95,000", ["Platform integration", "4 campaigns", "Segmentation", "2 automated sequences", "A/B test setup", "Optimisation + reporting"]]
    ],
    "100-200": [
      ["Retention Foundation", "KSh 110,000", ["Strategy", "4 campaigns", "Segmentation", "2 sequences", "Platform optimisation", "Reporting"]],
      ["Retention Growth", "KSh 150,000", ["Strategy", "6 campaigns", "Multiple segments", "3 sequences", "A/B testing", "Optimisation"]],
      ["Retention System", "KSh 190,000", ["Retention strategy", "8 campaigns", "Advanced segmentation", "4 sequences", "Testing framework", "Ongoing optimisation setup"]]
    ],
    "200+": [
      ["Bespoke Email", "From KSh 220,000", ["Custom retention strategy", "Campaign system", "Advanced automation", "Segmentation architecture", "Testing", "Reporting"]],
      ["Email Growth System", "From KSh 275,000", ["Advanced lifecycle system", "Multiple sequences", "Campaign engine", "Optimisation framework", "Reporting"]],
      ["Retention Engine", "From KSh 350,000+", ["Fully bespoke lifecycle system", "Advanced automation", "Deep segmentation", "Testing + optimisation", "Custom reporting"]]
    ]
  },
  seo: {
    "20-50": [
      ["Search Foundation", "KSh 25,000", ["Technical baseline", "Search Console", "Keyword research", "Up to 5 pages optimised", "Metadata", "Indexing checks"]],
      ["Search Starter", "KSh 35,000", ["Technical baseline", "Search Console", "Keyword research", "Up to 8 pages optimised", "Metadata", "Internal linking"]],
      ["Search Local", "KSh 45,000", ["Search foundation", "Local SEO setup", "Keyword research", "Up to 10 pages", "Business Profile optimisation", "Reporting"]]
    ],
    "50-100": [
      ["SEO Essential", "KSh 55,000", ["Technical audit", "Keyword research", "Up to 10 pages", "Search Console", "Metadata + internal linking", "Reporting"]],
      ["Search Growth", "KSh 75,000", ["Technical audit", "Competitor analysis", "Up to 15 pages", "Keyword strategy", "On-page optimisation", "Reporting + optimisation"]],
      ["Search Authority", "KSh 95,000", ["Technical audit", "Competitor analysis", "Up to 20 pages", "Content direction", "On-page + local SEO", "Reporting + optimisation"]]
    ],
    "100-200": [
      ["Strategic SEO", "KSh 110,000", ["Technical audit", "Competitor research", "Up to 20 pages", "Keyword strategy", "Content briefs", "Technical + on-page SEO"]],
      ["Search Growth System", "KSh 150,000", ["Full search strategy", "Competitor research", "Up to 30 pages", "Content briefs", "Local / GEO considerations", "Optimisation cycles"]],
      ["Search Authority System", "KSh 190,000", ["Advanced search strategy", "Deep competitor research", "Up to 40 pages", "Content system", "Technical + local + GEO", "Optimisation framework"]]
    ],
    "200+": [
      ["Bespoke Search", "From KSh 220,000", ["Custom search strategy", "Technical SEO", "Content architecture", "Entity / brand optimisation", "Advanced reporting"]],
      ["Search Growth System", "From KSh 275,000", ["Advanced search programme", "Content system", "Local / GEO strategy", "Testing + optimisation", "Deep reporting"]],
      ["Search Authority", "From KSh 350,000+", ["Bespoke search ecosystem", "Advanced technical work", "Content + entity strategy", "Multi-location capability", "Deep optimisation"]]
    ]
  },
  growth: {
    "20-50": [
      ["Tracking Foundation", "KSh 25,000", ["Analytics setup", "Core conversion goals", "Basic event tracking", "WhatsApp tracking", "Simple reporting"]],
      ["Lead Foundation", "KSh 35,000", ["Analytics", "Conversion points", "Lead routing", "WhatsApp flow", "Basic reporting"]],
      ["Growth Starter", "KSh 45,000", ["Analytics", "Conversion tracking", "Lead routing", "1 automation", "WhatsApp / Instagram flow", "Reporting"]]
    ],
    "50-100": [
      ["Growth Essential", "KSh 55,000", ["Analytics", "Conversion goals", "Lead routing", "1 automation", "WhatsApp integration", "Reporting"]],
      ["Growth System", "KSh 75,000", ["Funnel mapping", "Event tracking", "Lead routing", "2 automations", "WhatsApp / Instagram flows", "Reporting"]],
      ["Growth Automation", "KSh 95,000", ["Funnel mapping", "Advanced events", "Lead routing", "3 automations", "Multiple flows", "Optimisation + reporting"]]
    ],
    "100-200": [
      ["Digital Growth", "KSh 110,000", ["Funnel strategy", "Advanced tracking", "Lead routing", "3 automations", "CRM / booking integration", "Reporting"]],
      ["Growth Engine", "KSh 150,000", ["Conversion strategy", "Advanced analytics", "Multiple automations", "CRM integrations", "Experiments", "Optimisation cycles"]],
      ["Growth Infrastructure", "KSh 190,000", ["Growth architecture", "Deep tracking", "Advanced automation", "Multiple integrations", "Experiments", "Optimisation framework"]]
    ],
    "200+": [
      ["Bespoke Growth", "From KSh 220,000", ["Custom growth architecture", "Advanced tracking", "Custom automations", "Integrations", "Experiments", "Reporting"]],
      ["Growth Engine", "From KSh 275,000", ["Advanced funnel system", "Automation architecture", "CRM ecosystem", "Testing", "Optimisation"]],
      ["Digital Growth Infrastructure", "From KSh 350,000+", ["Fully bespoke growth system", "Advanced automation", "Deep analytics", "Multiple integrations", "Continuous optimisation framework"]]
    ]
  },
  social: {
    "20-50": [
      ["Content Foundation", "KSh 25,000", ["Content strategy", "2 content pillars", "6 static creatives", "Copy direction", "1 platform"]],
      ["Social Starter", "KSh 35,000", ["Strategy", "3 content pillars", "8 creatives", "Copywriting", "1 platform"]],
      ["Social Active", "KSh 45,000", ["Strategy", "3 pillars", "10 creatives", "Copywriting", "2 platforms", "Basic reporting"]]
    ],
    "50-100": [
      ["Social Essential", "KSh 55,000", ["Strategy", "3 pillars", "10 creatives", "Copywriting", "2 platforms", "Reporting"]],
      ["Social Growth", "KSh 75,000", ["Strategy", "4 pillars", "12 creatives", "Campaign concept", "2 platforms", "Reporting"]],
      ["Social Campaign", "KSh 95,000", ["Strategy", "4 pillars", "16 creatives", "Campaign production", "3 platforms", "Performance analysis"]]
    ],
    "100-200": [
      ["Content Strategy", "KSh 110,000", ["Content strategy", "4 pillars", "16 creatives", "Campaign planning", "3 platforms", "Reporting"]],
      ["Social Growth System", "KSh 150,000", ["Strategy", "5 pillars", "20 creatives", "Campaigns", "3 platforms", "Performance analysis"]],
      ["Social Content Engine", "KSh 190,000", ["Strategy", "5 pillars", "24 creatives", "Multiple campaigns", "3+ platforms", "Optimisation"]]
    ],
    "200+": [
      ["Bespoke Social", "From KSh 220,000", ["Custom strategy", "Content system", "Campaigns", "Creative production", "Multi-platform", "Reporting"]],
      ["Social Growth System", "From KSh 275,000", ["Advanced content engine", "Campaign system", "Creative direction", "Multi-platform", "Optimisation"]],
      ["Social Content Engine", "From KSh 350,000+", ["Fully bespoke social system", "Advanced creative production", "Campaign architecture", "Multi-platform", "Deep reporting"]]
    ]
  }
};

export function scoreMatch(a: MatchAnswers): { score: number; category: string } {
  let score = 70;
  if (a.offering) score += 6;
  if (a.business && a.business !== "other") score += 4;
  if (a.ambition === "growth") score += 5;
  if (a.ambition === "strategic") score += 7;
  if (a.ambition === "distinctive") score += 9;
  if (a.timeline === "ready") score += 4;
  if (a.timeline === "one-month") score += 3;
  if (a.budget && a.budget !== "unsure") score += 4;
  const multiCount = (a.websiteNeeds || a.emailScope || a.seoFocus || a.growthConnect || a.socialSupport || []).length;
  if (multiCount >= 3) score += 3;
  
  const finalScore = Math.min(99, Math.max(35, score));
  const category = finalScore >= 85 ? "Strong Match" : finalScore >= 70 ? "Good Match" : finalScore >= 55 ? "Potential Match" : "Let's Talk First";
  return { score: finalScore, category };
}

export function offeringOutcome(a: MatchAnswers): string {
  const maps: Record<string, Record<string, string>> = {
    website: { new: "New website", redesign: "Website redesign", improve: "Website improvement", store: "E-commerce experience", custom: "Custom digital experience" },
    email: { campaigns: "Email campaigns", retention: "Customer retention", followup: "Automated follow-up", newsletter: "Regular communication", promotion: "Product / service promotion", reengage: "Re-engagement" },
    seo: { google: "Google visibility", local: "Local search", services: "Service visibility", products: "Product visibility", locations: "Location visibility", discovery: "AI / search discovery", brand: "Brand visibility" },
    growth: { enquiry: "Lead journey", followup: "Lead follow-up", booking: "Booking journey", purchase: "Customer journey", unknown: "Conversion journey" },
    social: { consistent: "Consistent presence", awareness: "Brand awareness", authority: "Authority & trust", leads: "Lead generation", campaigns: "Campaigns", promotion: "Product / service promotion" }
  };
  const keyMap: Record<string, string> = { website: "websiteOutcome", email: "emailGoal", seo: "seoVisibility", growth: "growthDropoff", social: "socialGoal" };
  const keyName = a.offering ? keyMap[a.offering] : undefined;
  const ansValue = keyName ? (a[keyName] as string) : undefined;
  
  if (a.offering && maps[a.offering] && ansValue && maps[a.offering][ansValue]) {
    return maps[a.offering][ansValue];
  }
  return a.offering ? LABELS.offering[a.offering as keyof typeof LABELS.offering] || "your project" : "your project";
}

export function buildConfigs(a: MatchAnswers): ConfigItem[] {
  const offering = a.offering || "website";
  const budget = (a.budget && a.budget !== "unsure") ? a.budget : "50-100";
  const categoryConfigs = CONFIGS[offering] || CONFIGS.website;
  const list = categoryConfigs[budget] || categoryConfigs["50-100"];

  return list.map((x, i) => ({
    name: x[0],
    price: x[1],
    items: x[2],
    tag: i === 1 ? "Recommended" : i === 0 ? "Essential" : "Expanded"
  }));
}

export function getRecommendationCopy(a: MatchAnswers): string {
  const names: Record<string, string> = {
    website: "This gives your digital presence enough room to communicate clearly, support conversion and measure what happens after people arrive.",
    email: "This gives your retention system enough room to move beyond isolated campaigns and start supporting repeat engagement.",
    seo: "This gives your search presence enough room to build a real foundation while focusing on the visibility you actually want.",
    growth: "This gives the customer journey enough room to connect the important touchpoints without adding automation for its own sake.",
    social: "This gives your content presence enough room to establish a clear direction and produce consistently without turning it into noise."
  };
  return a.offering && names[a.offering] ? names[a.offering] : names.website;
}

export function getRecommendationReasons(a: MatchAnswers): string[] {
  const outcome = offeringOutcome(a);
  const reasons = [
    `Built around your objective (${outcome})`,
    "Designed for clarity and customer conversion",
    "Measurement framework to track outcomes",
    "Room for refinement without unnecessary complexity"
  ];
  if (a.ambition === "distinctive") {
    reasons[3] = "Scope to build a distinctive digital presence";
  }
  return reasons;
}

export function calculateMatchResult(answers: MatchAnswers): MatchResultPayload {
  const { score, category } = scoreMatch(answers);
  const configs = buildConfigs(answers);
  const recommendation = configs[1] || configs[0];
  const offering = answers.offering ? LABELS.offering[answers.offering as keyof typeof LABELS.offering] || "your project" : "your project";
  const business = answers.business ? LABELS.business[answers.business as keyof typeof LABELS.business] || "your business" : "your business";
  const outcome = offeringOutcome(answers);
  const investment = answers.budget ? LABELS.budget[answers.budget as keyof typeof LABELS.budget] || "Not sure yet" : "Not sure yet";

  const headline = score >= 80 
    ? 'Looks like you’re building something <span class="blue">great.</span>' 
    : score >= 60 
    ? 'This looks <span class="blue">promising.</span>' 
    : 'There’s something to <span class="blue">explore here.</span>';

  const lede = `We understood what you’re trying to improve, what success looks like and how far you want to take it. Here’s what we’d build around your brief.`;

  const recCopy = getRecommendationCopy(answers);
  const recReasons = getRecommendationReasons(answers);
  const recSpecs: Array<[string, string]> = [
    [recommendation.items[0] || "Custom Scope", "Scope & Deliverables"],
    [recommendation.items[1] || "Custom Depth", "Structure & Depth"],
    [recommendation.items[3] || recommendation.items[2] || "Included", "Analytics & Tracking"]
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
      investment
    },
    configs,
    recommendation,
    recommendationCopy: recCopy,
    recommendationReasons: recReasons,
    recommendationSpecs: recSpecs,
    whatsappUrl
  };
}
