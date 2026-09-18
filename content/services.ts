export type Service = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  hero: string;
  introduction: string;
  outcomes: readonly string[];
  process: readonly [string, string][];
  keywords: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "website-design-development",
    title: "Website design & development",
    seoTitle: "Web Design & Development in Nairobi",
    description:
      "Strategic, high-performing websites for businesses in Nairobi, Kenya and around the world.",
    hero: "A website people can understand, trust and act on.",
    introduction:
      "Malaika Studios designs and builds websites that make the next step clear. We bring positioning, content, design and conversion paths into one considered digital home for your business.",
    outcomes: [
      "Clear service and offer structure",
      "Responsive website design and development",
      "Search-ready technical foundations",
      "A direct path to WhatsApp or email",
    ],
    process: [
      [
        "Find the story",
        "We identify what customers need to understand before they can choose you.",
      ],
      [
        "Shape the experience",
        "We turn that story into an original, useful web journey.",
      ],
      [
        "Launch with a way forward",
        "Your website connects discovery to a real next step, not a dead end.",
      ],
    ],
    keywords: [
      "web design agency Nairobi",
      "website development Kenya",
      "web design for growing businesses",
    ],
  },
  {
    slug: "brand-identity-digital-design",
    title: "Brand identity & digital design",
    seoTitle: "Branding & Digital Design in Nairobi",
    description:
      "Brand identity and digital design for businesses ready to show up clearly in Nairobi and beyond.",
    hero: "A brand that looks like it knows what it is doing.",
    introduction:
      "A good identity gives your business a recognisable way to enter a room. We clarify the visual and verbal cues that make a brand feel consistent across its website, social channels and customer touchpoints.",
    outcomes: [
      "Brand positioning and visual direction",
      "Identity systems for digital use",
      "Website and campaign design",
      "Content direction that stays recognisable",
    ],
    process: [
      [
        "Get specific",
        "We identify the character, customer and category your brand needs to meet.",
      ],
      [
        "Build the system",
        "We create a flexible visual language rather than a logo left to fend for itself.",
      ],
      [
        "Put it to work",
        "We apply it where customers actually make decisions.",
      ],
    ],
    keywords: [
      "branding agency Nairobi",
      "brand identity design Kenya",
      "digital design studio Africa",
    ],
  },
  {
    slug: "whatsapp-email-crm-automation",
    title: "WhatsApp, email & CRM automation",
    seoTitle: "WhatsApp Automation & CRM Setup in Kenya",
    description:
      "WhatsApp, email and CRM automation that turns interest into a more useful customer conversation.",
    hero: "Less chasing. Better follow-through.",
    introduction:
      "When someone is ready to ask, buy or book, the handoff should feel easy. We connect WhatsApp, email, lead capture and CRM workflows so customer interest has somewhere useful to go.",
    outcomes: [
      "WhatsApp lead journeys",
      "Email campaigns and follow-up",
      "CRM and lead-capture workflows",
      "Connected automations that reduce manual work",
    ],
    process: [
      [
        "Map the handoff",
        "We find the moments where interest is currently getting lost.",
      ],
      [
        "Connect the tools",
        "We design the practical flow between conversations, records and follow-up.",
      ],
      [
        "Make it usable",
        "Your team gets a system that supports the customer without becoming another chore.",
      ],
    ],
    keywords: [
      "WhatsApp automation Kenya",
      "CRM setup Nairobi",
      "email marketing automation Kenya",
    ],
  },
  {
    slug: "digital-growth-strategy-analytics",
    title: "Digital growth strategy & analytics",
    seoTitle: "Digital Growth Strategy & Analytics in Nairobi",
    description:
      "Digital growth strategy, conversion tracking and campaign improvement for businesses in Nairobi and globally.",
    hero: "Know what is working. Then make it work harder.",
    introduction:
      "Growth is not more activity for its own sake. We use useful measurement, campaigns and conversion improvements to help your business learn from the attention it is already earning.",
    outcomes: [
      "Conversion and customer-journey review",
      "Analytics and campaign measurement",
      "Search and paid-media foundations",
      "Prioritised growth experiments",
    ],
    process: [
      [
        "Set the signal",
        "We agree on the actions that represent real business interest.",
      ],
      [
        "Read the pattern",
        "We identify where people arrive, hesitate and act.",
      ],
      [
        "Improve with intent",
        "We turn those lessons into focused next steps rather than vanity reporting.",
      ],
    ],
    keywords: [
      "digital marketing strategy Nairobi",
      "conversion tracking Kenya",
      "growth marketing agency Nairobi",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
