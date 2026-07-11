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
    headline: "Making a technical product catalogue feel easier to explore—and easier to buy from.",
    intro: "Bewama is a B2B ecommerce and sourcing platform for construction and industrial products. The work connects product discovery, assisted quoting, checkout and repeat purchasing in one commercial journey.",
    image: "/work/projects/bewama/landing-page.png",
    secondary: "/work/projects/bewama/requestQuot.png",
    logo: "/work/projects/bewama/logo.png",
    liveUrl: "https://bewama.com",
    palette: "#ee4f23",
    challenge: "Technical buyers do not always arrive ready to check out. They compare specifications, prepare budgets and sometimes need a human-assisted quote. A standard online-shop pattern would leave too much intent behind.",
    approach: ["Structured product discovery", "Guided quote-request journey", "Loyalty and return-customer mechanics", "Search-led product content"],
    outcomes: ["100+ products structured for discovery", "Quote and checkout paths working side by side", "90%+ recorded SEO health", "A clearer route from interest to sales conversation"],
  },
  {
    slug: "somafix-kenya",
    name: "Somafix Kenya",
    kind: "Commissioned work",
    sector: "Construction chemicals · Website",
    headline: "Turning a serious product business into a credible, searchable digital presence.",
    intro: "Somafix Kenya needed more than a brochure. The website gives contractors, installers and professional buyers a clearer way to understand products, use cases and the company behind them.",
    image: "/work/projects/somafix/landing-page.png",
    secondary: "/work/projects/somafix/site-overview.png",
    logo: "/work/projects/somafix/logo.png",
    liveUrl: "https://somafixkenya.co.ke",
    palette: "#d4252a",
    challenge: "A technical catalogue had to feel organised and approachable without losing the authority expected by professional construction buyers.",
    approach: ["Brand-led editorial structure", "Product and use-case architecture", "Mobile-first technical optimisation", "Search-ready page foundations"],
    outcomes: ["98 recorded performance score", "94 recorded accessibility score", "100 recorded best-practices score", "100 recorded SEO score"],
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
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=88",
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
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=88",
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
