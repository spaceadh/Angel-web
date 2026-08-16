export type Project = {
  slug: string;
  name: string;
  kind: "Commissioned work" | "Studio concept" | "Rotsi product";
  sector: string;
  headline: string;
  intro: string;
  image: string;
  secondary?: string;
  logo?: string;
  liveUrl?: string;
  palette: string;
  challenge: string;
  body?: string[];
  approach: string[];
  outcomes: string[];
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "bewama",
    name: "Bewama",
    kind: "Commissioned work",
    sector: "B2B commerce · Product design",
    headline: "Making a technical construction catalogue feel easier to explore, specify, and buy from.",
    intro: "Bewama is a B2B ecommerce and sourcing platform designed specifically for the heavy construction and industrial supply sectors. We were tasked with building a digital experience that bridges the gap between complex technical specifications and a modern, consumer-grade checkout flow. The resulting work connects product discovery, assisted quoting, direct checkout, and repeat purchasing in one unified commercial journey, tailored for Kenyan procurement teams.",
    image: "/work/projects/bewama/landing-page.png",
    secondary: "/work/projects/bewama/requestQuot.png",
    logo: "/work/projects/bewama/logo.png",
    liveUrl: "https://bewama.com",
    palette: "#ee4f23",
    challenge: "Technical buyers in Kenya's construction industry do not always arrive ready to check out with a credit card. They need to compare structural specifications, prepare detailed internal budgets, request bulk discounts, and sometimes require human-assisted quotes before procurement approval. A standard online-shop pattern would leave too much intent behind and fail to convert high-value buyers who need a consultation first.",
    body: [
      "The heavy construction industry operates on trust and precision. When procurement managers are sourcing materials for a massive commercial development, they aren't just 'adding to cart'. They need exact specifications, lead times, and negotiated pricing. Our initial audit of Bewama's digital presence revealed that their previous platform was treating complex industrial sales like a consumer retail shop.",
      "Malaika Studios approached this challenge by rethinking the entire digital journey. We mapped out the 'Visibility-Ready Founder' avatar for Bewama—realizing that they needed a platform that served both as a product discovery engine and a B2B sales enabler.",
      "We structured the new platform so that a user could easily search for technical terms (e.g., 'high-yield reinforcement steel Nairobi'), land on a highly-optimized product page, and then—crucially—choose between an immediate purchase or a guided 'Request Quote' flow.",
      "This hybrid approach meant that Bewama stopped losing high-value buyers who weren't ready to pull out a credit card immediately. By connecting this quote request flow directly into their sales team's WhatsApp and CRM, we built a true Client Magnet System that converted anonymous traffic into actionable business conversations."
    ],
    approach: [
      "Designed a structured product discovery system optimized for mobile buyers on construction sites",
      "Built a guided, multi-step quote-request journey that integrates directly into their sales WhatsApp",
      "Created loyalty and repeat-customer mechanics to encourage contractors to reuse the platform",
      "Implemented search-led product content architecture to capture 'buy cement Nairobi' style queries"
    ],
    outcomes: [
      "100+ technical products structured cleanly for organic search discovery",
      "Quote and direct checkout paths working side-by-side without confusing the user",
      "90%+ recorded technical SEO health on launch",
      "A clearer, measurable route from initial interest to a qualified sales conversation"
    ],
  },
  {
    slug: "somafix-kenya",
    name: "Somafix Kenya",
    kind: "Commissioned work",
    sector: "Construction chemicals · Website",
    headline: "Turning a serious construction chemicals business into a credible, searchable digital presence.",
    intro: "Somafix Kenya needed more than a digital brochure. They required a platform that would establish them as the definitive authority on construction chemicals and adhesives in East Africa. The new website gives contractors, installers, and professional buyers a much clearer way to understand the complex products, view real-world use cases, and immediately trust the company behind them.",
    image: "/work/projects/somafix/landing-page.png",
    secondary: "/work/projects/somafix/site-overview.png",
    logo: "/work/projects/somafix/logo.png",
    liveUrl: "https://somafixkenya.co.ke",
    palette: "#d4252a",
    challenge: "Construction chemicals are inherently technical. A catalogue had to feel highly organized and approachable for a general contractor, without losing the strict technical authority expected by professional engineers and architects. Previously, inquiries were lost because the product applications were unclear, and the website didn't surface in local searches for adhesives or sealants.",
    body: [
      "Somafix Kenya had a robust, high-quality product line, but their digital footprint was practically invisible. Their previous website operated like a static PDF, making it impossible for contractors to search for specific solutions, compare products, or understand application methods.",
      "The strategy was to build an 'answer-engine' ready platform. We reorganized their entire inventory into an intuitive taxonomy, ensuring that whether a user was searching for PU foam, silicone sealants, or specialized anchors, they found an authoritative page immediately.",
      "Design-wise, we deployed a clean, editorial layout that stripped away industry jargon and replaced it with clear, benefit-driven copy. We implemented structured data (JSON-LD) across the catalogue, ensuring Google and AI search engines could parse and recommend their exact products.",
      "The result was a total transformation of their inbound inquiry flow. Instead of fielding general questions about what they sold, the Somafix sales team began receiving highly-specific WhatsApp inquiries from contractors who had already educated themselves on the platform."
    ],
    approach: [
      "Developed a brand-led editorial structure that explains the 'why' before the 'what'",
      "Created a scalable product and use-case architecture to handle future inventory growth",
      "Focused heavily on mobile-first technical optimization for contractors looking up specs on-site",
      "Built deep, search-ready page foundations for every individual chemical category"
    ],
    outcomes: [
      "98/100 recorded Google Lighthouse performance score",
      "94/100 recorded accessibility score",
      "100/100 recorded SEO score, outperforming legacy competitors",
      "Significantly reduced sales friction, as buyers now call in with exact product knowledge"
    ],
  },
  {
    slug: "kumbusha",
    name: "Kumbusha",
    kind: "Rotsi product",
    sector: "Culture workflows · Product experience",
    headline: "A warm product for the small moments busy managers should never miss.",
    intro: "Kumbusha turns employee birthdays, anniversaries and appreciation moments into practical reminder and action workflows.",
    image: "/work/projects/kumbusha/landing-page.png",
    secondary: "/work/projects/kumbusha/dashboard.png",
    logo: "/work/projects/kumbusha/logo.png",
    palette: "#f05a3c",
    challenge: "The intention to appreciate people is often present; operational follow-through is not. The experience needed to make the next action feel immediate and human.",
    body: [
      "Corporate gifting and employee appreciation usually suffer from two extremes: they are either heavily automated and feel robotic, or they are entirely manual and often forgotten. Kumbusha was built by Rotsi to solve this, but it needed a front-end experience that matched the warmth of its premise.",
      "Malaika Studios stepped in to design the interface and customer journey. We started by mapping the manager's state of mind—busy, distracted, but well-intentioned. The UI needed to remove friction completely. We adopted a palette that felt urgent yet warm, moving away from sterile corporate dashboards.",
      "The core workflow was simplified into three steps: Intend, Choose, and Act. By integrating WhatsApp-ready reminders directly into the interface, managers didn't have to log into a complex system; they received actionable notifications where they already spent their time.",
      "This approach turned a simple reminder app into a holistic culture workflow tool, validating our belief that good design isn't just about aesthetics—it's about making the right action the easiest action."
    ],
    approach: ["Milestone intake", "WhatsApp-ready reminder logic", "Clear manager actions", "Vendor coordination pathway"],
    outcomes: ["A focused milestone dashboard", "A practical reminder-to-action journey", "A clear foundation for real-world validation"],
    note: "A Rotsi product presented through Malaika Studios’ customer-experience and interface lens.",
  },
  {
    slug: "tena-crm",
    name: "Tena CRM",
    kind: "Rotsi product",
    sector: "Service CRM · Booking and retention",
    headline: "Helping service businesses remember the customer—not just the appointment.",
    intro: "Tena brings clients, bookings, follow-ups and retention signals into one calmer workspace for appointment-led businesses.",
    image: "/work/projects/tena/site-overview.png",
    logo: "/work/projects/tena/logo.png",
    liveUrl: "https://crm.rotsi.co.ke",
    palette: "#5448c8",
    challenge: "Customer history is easily fragmented across notebooks, staff phones and chat threads. That makes repeat visits and thoughtful follow-up harder than they need to be.",
    approach: ["Client history and segmentation", "Booking and staff workflows", "Public booking surface", "WhatsApp-ready follow-up"],
    outcomes: ["One customer workspace", "A clearer repeat-booking loop", "Useful no-show and retention signals"],
    note: "A Rotsi product presented through Malaika Studios’ customer-experience and interface lens.",
  },
  {
    slug: "ibiza-platform",
    name: "IBIZA",
    kind: "Commissioned work",
    sector: "Internal platform · Operations",
    headline: "Giving a growing distributor one controlled view of customers, stock and activity.",
    intro: "IBIZA is Somafix Kenya’s internal operations platform—designed to protect continuity while making everyday work easier to understand.",
    image: "/work/projects/somafix/site-overview.png",
    logo: "/work/projects/ibiza/logo.png",
    palette: "#aa191f",
    challenge: "Important business context was at risk of living across individuals and disconnected processes instead of remaining visible to the organisation.",
    approach: ["Central customer records", "Inventory-movement visibility", "Role-based permissions", "Operational reporting"],
    outcomes: ["One shared operating surface", "Four visible stock states", "Cleaner access and approval control"],
  },
  {
    slug: "kairi-tours-concept",
    name: "Kairi Tours",
    kind: "Studio concept",
    sector: "Travel · Website redesign concept",
    headline: "What if booking the journey felt like the first beautiful part of it?",
    intro: "A self-initiated redesign study exploring how a Kenyan travel brand could turn destination imagery, itinerary clarity and trust into a stronger inquiry journey.",
    image: "/work/projects/kairi-tours/landing-page.png",
    liveUrl: "https://kair-tours.vercel.app/",
    palette: "#5d6b57",
    challenge: "Travel websites often show beautiful places but make comparison, confidence and inquiry feel like separate tasks.",
    approach: ["Cinematic destination-led hero", "Useful trip metadata", "Trust before inquiry", "Mobile-first WhatsApp path"],
    outcomes: ["A demonstration of our travel-web direction", "A shareable redesign concept", "A clearer model for destination-to-inquiry storytelling"],
    note: "Independent Malaika Studios concept. Not commissioned by or affiliated with a real client of this name.",
  },
  {
    slug: "roja-consultancy-concept",
    name: "Roja Consultancy",
    kind: "Studio concept",
    sector: "Insurance · Brand and website concept",
    headline: "Making complex protection feel calmer, clearer and easier to trust.",
    intro: "A self-initiated identity and website direction for a modern advisory business—built to demonstrate how clarity can replace the cold, document-heavy language of insurance.",
    image: "/work/projects/roja-consultancy/landing-page.png",
    liveUrl: "http://rojaconsultancy.netlify.app/",
    palette: "#8c3f36",
    challenge: "Advisory businesses need authority, but familiar corporate patterns can make the experience feel remote and difficult to understand.",
    approach: ["Plain-language offer structure", "Warm editorial art direction", "Visible advisory process", "Consultation-first conversion path"],
    outcomes: ["A demonstration of our professional-services direction", "A shareable redesign concept", "A stronger model for trust-led service pages"],
    note: "Independent Malaika Studios concept. Not commissioned by or affiliated with a real client of this name.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}