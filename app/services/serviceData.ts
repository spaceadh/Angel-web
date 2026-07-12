export type Service = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  intro: string;
  whoFor: string[];
  includes: string[];
  outcomes: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const services: Service[] = [
  {
    slug: "website-design-kenya",
    title: "Website Design in Kenya",
    kicker: "Websites built to earn trust and inquiries",
    description:
      "Website design and redesign for Kenyan businesses that need clearer messaging, stronger proof, responsive pages, SEO foundations, and inquiry paths that convert attention into real conversations.",
    intro:
      "Malaika Studios designs websites for businesses that are already good at what they do, but whose online presence does not yet show that clearly. We shape the story, structure the pages, design the experience, and make the next step easy for the right customer.",
    whoFor: [
      "Growing SMEs whose current website looks smaller than the real business.",
      "Founders who need a sharper first impression before calls, visits, or consultations.",
      "Teams that need a website connected to WhatsApp, forms, bookings, or follow-up workflows.",
    ],
    includes: [
      "Website structure and page journey",
      "Copy direction and offer clarity",
      "Responsive visual design",
      "Portfolio, proof, and trust sections",
      "Social media links or feed integration where useful",
      "Email capture or newsletter form where scoped",
      "SEO foundations for titles, metadata, headings, internal links, and indexable pages",
      "Inquiry paths through email, WhatsApp, forms, booking, or handover to a follow-up system",
    ],
    outcomes: [
      "Customers understand what you do faster.",
      "The business feels more credible before the first conversation.",
      "Visitors have a clearer route from interest to inquiry.",
      "The site has a stronger foundation for Google, AI search, and future content.",
    ],
    faqs: [
      {
        question: "Do you build new websites or redesign existing websites?",
        answer:
          "Both. Some businesses need a new site from scratch, while others need a clearer structure, stronger copy, better visuals, and a cleaner inquiry path on an existing site.",
      },
      {
        question: "Is SEO included in website design?",
        answer:
          "Every serious website should include SEO foundations: crawlable pages, clear headings, metadata, internal links, image handling, and useful text. Ongoing SEO content and ranking work can be scoped separately.",
      },
      {
        question: "Can the website connect to WhatsApp or follow-up automation?",
        answer:
          "Yes. Malaika Studios shapes the customer-facing inquiry path, including WhatsApp, social media links, email capture, and contact forms. Rotsi can support deeper automation, CRM, email marketing, and follow-up systems when the business needs that layer.",
      },
    ],
  },
  {
    slug: "digital-presence-audit",
    title: "Digital Presence Audit",
    kicker: "Find where trust, clarity, and inquiries are leaking",
    description:
      "A practical audit of your website, search presence, social proof, message clarity, customer journey, and inquiry path so you know what to fix before rebuilding or marketing harder.",
    intro:
      "A digital presence audit is for businesses that feel good offline but unclear online. We look at what a customer sees before they contact you: the website, search result, proof, words, pages, speed, mobile experience, and next step.",
    whoFor: [
      "Businesses unsure whether to redesign, rewrite, rebuild, or improve what already exists.",
      "Founders who want a clear priority list instead of random website changes.",
      "Teams preparing for campaigns, outreach, referrals, or sales conversations.",
    ],
    includes: [
      "Website clarity and trust review",
      "Search and AI-search readiness check",
      "Mobile experience and page-journey review",
      "Offer, proof, and CTA review",
      "Inquiry-path review across forms, WhatsApp, email, booking, social media, and follow-up",
      "Prioritised recommendations for what to fix, strip, rewrite, or rebuild",
    ],
    outcomes: [
      "You know which gaps are costing trust.",
      "You avoid paying for design changes that do not improve conversion.",
      "You get a clearer plan for content, SEO, proof, and customer action.",
      "You can decide whether the business needs a refresh, a rebuild, or a client magnet system.",
    ],
    faqs: [
      {
        question: "Is the audit only for websites?",
        answer:
          "No. The website is central, but the audit also considers search appearance, brand consistency, social proof, customer understanding, and how inquiries are handled.",
      },
      {
        question: "Will the audit tell us exactly what to remove?",
        answer:
          "Yes. A useful audit should identify what needs to be strengthened, what should be simplified, and what should be stripped because it weakens trust or distracts from action.",
      },
      {
        question: "Can the audit come before a website quote?",
        answer:
          "Yes. For many serious businesses, an audit is the best first step because it makes the redesign scope more accurate.",
      },
    ],
  },
  {
    slug: "client-magnet-system",
    title: "Client Magnet System",
    kicker: "Attract, convert, and retain with one connected journey",
    description:
      "A client magnet system combines website strategy, content structure, proof, inquiry paths, and follow-up readiness so a good business becomes easier to find, trust, choose, and return to.",
    intro:
      "A client magnet is not just a prettier website. It is a customer-facing system that helps the right people notice the business, understand the value, trust the proof, take the next step, and stay connected after the first inquiry.",
    whoFor: [
      "Service businesses that depend on consultations, bookings, calls, or repeat clients.",
      "B2B and professional businesses whose buyers need proof before taking action.",
      "Founders who want the website, message, inquiry path, and follow-up to work together.",
    ],
    includes: [
      "Attract: search-ready structure, audience clarity, and memorable first impression",
      "Convert: proof, offers, comparison clarity, CTAs, and inquiry flow",
      "Retain: handoff to follow-up, reminders, CRM, or automation-ready systems",
      "Brand and content direction",
      "Website or landing-page execution",
      "Social media, email capture, and email marketing readiness where useful",
      "Measurement plan for organic interest and inquiries",
    ],
    outcomes: [
      "The business becomes easier to discover and understand.",
      "The website supports sales conversations instead of only existing as a brochure.",
      "Inquiries move into a clearer follow-up path.",
      "Malaika builds the public-facing presence while Rotsi can support the deeper engine.",
    ],
    faqs: [
      {
        question: "How is a client magnet system different from a normal website?",
        answer:
          "A normal website may only present information. A client magnet system is planned around attraction, trust, inquiry conversion, and follow-up readiness.",
      },
      {
        question: "Does this include automation?",
        answer:
          "It can. Malaika Studios handles the customer-facing presence, while Rotsi can support CRM, reminders, WhatsApp flows, email marketing, lead routing, and automation where the business needs it.",
      },
      {
        question: "Is this right for a very early business?",
        answer:
          "It is best for businesses with a real offer, real customers, and enough proof or direction to justify building a stronger acquisition journey.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
