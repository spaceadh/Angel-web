import { CONFIGS, type OfferingKey } from "@/lib/pricing";

/**
 * `{from:<offering>}` in seoTitle, description or FAQ answers is replaced with
 * that offering's lowest price from lib/pricing.ts, so copy never goes stale.
 */
export type Service = {
  slug: string;
  title: string;
  /** Plain search phrase shown above the hero line and inside the H1. */
  heading: string;
  seoTitle: string;
  description: string;
  hero: string;
  introduction: string;
  audience: string;
  outcomes: readonly string[];
  process: readonly [string, string][];
  /** Offerings from lib/pricing.ts whose starter packages are shown. */
  pricing: readonly OfferingKey[];
  caseStudies: readonly string[];
  faqs: readonly [string, string][];
  keywords: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "website-design-development",
    title: "Website design & development",
    heading: "Website design in Nairobi",
    seoTitle: "Website Design & Development in Nairobi, Kenya",
    description:
      "Website design and development in Nairobi for Kenyan businesses, with SEO, analytics and a WhatsApp path built in. Packages from {from:website}.",
    hero: "A website people can understand, trust and act on.",
    introduction:
      "Malaika Studios designs and builds websites that make the next step clear. We bring positioning, content, design and conversion paths into one considered digital home for your business.",
    audience:
      "We build websites for businesses in Nairobi, across Kenya and abroad: service firms, hospitality, retail and product brands, real estate and creative businesses. Whether you have no website yet or one that looks fine but brings in nothing, the goal is the same: a site that explains what you do in seconds and makes it easy to call, book, buy or message you on WhatsApp.",
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
    pricing: ["website"],
    caseStudies: [
      "neighborhood-cocktails",
      "beads-world-africa",
      "digitally-sly",
    ],
    faqs: [
      [
        "How much does a website cost in Kenya?",
        "Our website packages start at {from:website} for a focused site of up to four pages, with analytics and basic SEO included. Larger sites with more pages, forms and tracking are priced in clear bands on our pricing page, and the free estimate tool gives you a range in about two minutes.",
      ],
      [
        "How long does it take to build a website?",
        "A starter website usually takes two to four weeks once your content is ready. Larger builds with more pages or integrations take six weeks or more, depending on reviews and the systems we connect.",
      ],
      [
        "Is SEO included in your website packages?",
        "Yes. Every package includes basic SEO and analytics, so Google can read your pages and you can see where visitors come from. Higher packages add Search Console, event tracking and a stronger SEO foundation.",
      ],
      [
        "Can you build an online shop?",
        "Yes. We built Beads World Africa an e-commerce store connected to email marketing and WhatsApp outreach, so the business could sell beyond one-to-one sales.",
      ],
      [
        "Do you work with businesses outside Nairobi?",
        "Yes. We are based in Nairobi and work remotely with businesses across Kenya, East Africa and further afield.",
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
    heading: "Branding and logo design in Nairobi",
    seoTitle: "Branding & Logo Design Agency in Nairobi, Kenya",
    description:
      "Brand identity, logo and digital design in Nairobi for Kenyan businesses that want to look consistent across their website, social media and campaigns.",
    hero: "A brand that looks like it knows what it is doing.",
    introduction:
      "A good identity gives your business a recognisable way to enter a room. We clarify the visual and verbal cues that make a brand feel consistent across its website, social channels and customer touchpoints.",
    audience:
      "Branding is for businesses that have outgrown a quick logo: new ventures that want to launch looking established, and growing businesses whose website, Instagram and printed material no longer look like the same company. We design the identity and then apply it where customers actually decide.",
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
    pricing: [],
    caseStudies: ["digitally-sly", "neighborhood-cocktails"],
    faqs: [
      [
        "What is included in a brand identity?",
        "Brand positioning and visual direction, an identity system built for digital use, and the design of the places it appears first, such as your website and campaigns. You get a consistent look across channels, not just a logo file.",
      ],
      [
        "Do you only design logos?",
        "We design logos as part of a wider identity system. A logo on its own rarely fixes a brand that looks different on every channel, so we build the colours, type and rules that keep it consistent.",
      ],
      [
        "How much does branding cost in Kenya?",
        "Branding is quoted per project, because a refresh of an existing brand and a new identity are very different jobs. Message us on WhatsApp with what you have today and we will reply with a quote.",
      ],
      [
        "Can you refresh an existing brand?",
        "Yes. Digitally Sly had a strong product but a quiet online presence. We gave it a bold, on-brand visual identity and carried it into a new website and email marketing.",
      ],
      [
        "Do you work with businesses outside Nairobi?",
        "Yes. We are based in Nairobi and work remotely with businesses across Kenya, East Africa and further afield.",
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
    heading: "WhatsApp automation and CRM setup in Kenya",
    seoTitle: "WhatsApp Business Automation & CRM Setup in Kenya",
    description:
      "WhatsApp Business automation, email marketing and CRM setup for Kenyan businesses: instant replies, lead follow-up and broadcasts. Packages from {from:email}.",
    hero: "Less chasing. Better follow-through.",
    introduction:
      "When someone is ready to ask, buy or book, the handoff should feel easy. We connect WhatsApp, email, lead capture and CRM workflows so customer interest has somewhere useful to go.",
    audience:
      "This is for Kenyan businesses whose customers already message them on WhatsApp, but where enquiries get missed, replies come late or nobody follows up. We set up the replies, lead capture, email and customer records so every enquiry is answered and tracked, without your team living on one phone.",
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
    pricing: ["email", "growth"],
    caseStudies: ["beads-world-africa", "neighborhood-cocktails"],
    faqs: [
      [
        "What can be automated on WhatsApp?",
        "Instant first replies, questions that qualify a lead, routing enquiries to the right person, reminders and follow-ups, and broadcasts to customers who have opted in. Your team still handles the conversations that need a person.",
      ],
      [
        "Do I need the WhatsApp Business app or the WhatsApp Business API?",
        "The free WhatsApp Business app works for a small team answering by hand. Automation, several team members and connections to a CRM need the WhatsApp Business API, which runs through a Meta-approved provider, and Meta charges per message for some message types. We help you choose and set up the right one.",
      ],
      [
        "How much does WhatsApp and email automation cost?",
        "Email and automation packages start at {from:email}, and lead and WhatsApp flow packages start at {from:growth}. WhatsApp API message fees are paid to Meta separately and depend on how many messages you send.",
      ],
      [
        "Which tools do you use?",
        "We usually use Brevo for email marketing and contact records, connected to WhatsApp and your website forms. If you already pay for a CRM or email tool, we work with it rather than replace it.",
      ],
      [
        "Do I need a website first?",
        "No. WhatsApp and email flows can start from Instagram, ads or a simple link. A website helps, because it gives you somewhere to capture leads and measure what works.",
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
    heading: "SEO and digital marketing strategy in Nairobi",
    seoTitle: "SEO & Digital Marketing Strategy in Nairobi, Kenya",
    description:
      "SEO, Google Business Profile, analytics and digital marketing strategy for businesses in Nairobi and across Kenya. Packages from {from:seo}.",
    hero: "Know what is working. Then make it work harder.",
    introduction:
      "Growth is not more activity for its own sake. We use useful measurement, campaigns and conversion improvements to help your business learn from the attention it is already earning.",
    audience:
      "This is for businesses that post, advertise or run a website but cannot say which of it brings in customers. We set up the measurement, improve how you show up on Google, and turn what we learn into a short list of changes worth making.",
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
    pricing: ["seo", "growth"],
    caseStudies: ["neighborhood-cocktails", "beads-world-africa"],
    faqs: [
      [
        "Do you offer SEO services in Kenya?",
        "Yes. SEO packages start at {from:seo} and cover the technical baseline, Search Console, keyword research and optimising your key pages. Local packages add Google Business Profile optimisation so you show up in Maps and nearby searches.",
      ],
      [
        "How long does SEO take to show results?",
        "Technical fixes and a complete Google Business Profile can help within weeks, but ranking for competitive searches usually takes several months of steady work. Tracking set up on day one shows you what is changing along the way.",
      ],
      [
        "Do you run ads?",
        "Yes. We set up the tracking that ads depend on, such as Google Analytics and the Meta Pixel, and plan and manage campaigns so you can see which ones bring in enquiries.",
      ],
      [
        "What does digital growth strategy include?",
        "A review of how customers find and contact you, analytics and conversion tracking, search and paid-media foundations, and a prioritised list of experiments. You get decisions, not a long report.",
      ],
      [
        "What do I need to get started?",
        "Access to any Google Analytics, Search Console, Business Profile or ad accounts you already have. If you have none, setting them up is part of the first package.",
      ],
    ],
    keywords: [
      "digital marketing strategy Nairobi",
      "SEO services Kenya",
      "growth marketing agency Nairobi",
    ],
  },
];

export function fillPrices(text: string) {
  return text.replace(
    /\{from:(\w+)\}/g,
    (_, key: OfferingKey) => CONFIGS[key]["20-50"][0][1],
  );
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
