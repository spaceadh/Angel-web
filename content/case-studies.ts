export type WorkArtwork = "cocktails" | "beads" | "digitally-sly" | "polar";

export type CaseStudyImage =
  "generic-before" | "generic-after" | "neighborhood-landing";

type CaseStudyFeature = {
  icon: string;
  title: string;
  copy: string;
};

type CaseStudyComparisonSide = {
  label: string;
  title: string;
  copy: string;
  image?: CaseStudyImage;
};

export type CaseStudySection =
  | {
      type: "challenge";
      eyebrow: string;
      title: string;
      copy: string;
      aside?: {
        eyebrow: string;
        title?: string;
        items: readonly string[];
      };
    }
  | {
      type: "comparison";
      eyebrow: string;
      title: string;
      before: CaseStudyComparisonSide;
      after: CaseStudyComparisonSide;
    }
  | {
      type: "capabilities";
      eyebrow: string;
      title: string;
      items: readonly CaseStudyFeature[];
    }
  | {
      type: "outcomes";
      eyebrow: string;
      title: string;
      items: readonly CaseStudyFeature[];
    };

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  art: WorkArtwork;
  pill: string;
  serviceLine: string;
  tags: string;
  sections: readonly CaseStudySection[];
};

const standardSections = (challenge: string): readonly CaseStudySection[] => [
  {
    type: "challenge",
    eyebrow: "01 / The challenge",
    title: "GOOD PRODUCT.\nQUIET PRESENCE.",
    copy: challenge,
    aside: {
      eyebrow: "02 / The solution",
      items: [
        "Modern, fast and responsive website",
        "Bold, on-brand visual identity",
        "Clear menu, story and contact paths",
        "Simple UX for browsing and ordering",
      ],
    },
  },
  {
    type: "comparison",
    eyebrow: "03 / The transformation",
    title: "BEFORE → AFTER.",
    before: {
      label: "Before",
      title: "A QUIET DIGITAL PRESENCE.",
      copy: "A business that was harder to discover, understand and act on online.",
      image: "generic-before",
    },
    after: {
      label: "After",
      title: "A CLEARER WAY IN.",
      copy: "A focused digital experience that gives people a route from discovery to action.",
      image: "generic-after",
    },
  },
  {
    type: "outcomes",
    eyebrow: "04 / What changed",
    title: "FROM PRESENCE\nTO EXPERIENCE.",
    items: [
      { icon: "★", title: "Clearer", copy: "Brand story and visual hierarchy" },
      { icon: "↗", title: "Faster", copy: "Path from discovery to action" },
      {
        icon: "♥",
        title: "Stronger",
        copy: "Perceived quality and consistency",
      },
      {
        icon: "▥",
        title: "Ready",
        copy: "Foundation for future campaigns and growth",
      },
    ],
  },
];

const neighborhoodSections: readonly CaseStudySection[] = [
  {
    type: "challenge",
    eyebrow: "01 / The challenge",
    title: "ACTIVE ON INSTAGRAM.\nINVISIBLE ON SEARCH.",
    copy: "Neighborhood Cocktails was active on Instagram, but could not be found through search—closing off an important sales channel.",
    aside: {
      eyebrow: "What was missing",
      title: "THE SALES CHANNEL WAS CLOSED.",
      items: [
        "No website, so the business was not reachable online.",
        "No search visibility, limiting discovery beyond Instagram.",
      ],
    },
  },
  {
    type: "comparison",
    eyebrow: "02 / Before and after",
    title: "NO WEBSITE →\nA CONNECTED SALES CHANNEL.",
    before: {
      label: "Before",
      title: "NO WEBSITE.\nNO ONLINE REACH.",
      copy: "People could see the work on Instagram, but there was no dedicated destination to find, explore or enquire through.",
    },
    after: {
      label: "After",
      title: "AN INTERACTIVE SITE\nBUILT TO CONVERT.",
      copy: "A website that brings the work, booking flow and pricing conversation into one place.",
      image: "neighborhood-landing",
    },
  },
  {
    type: "capabilities",
    eyebrow: "03 / The system",
    title: "BUILT TO BE FOUND,\nBOOKED & FOLLOWED UP.",
    items: [
      {
        icon: "⌁",
        title: "Booking form",
        copy: "Inquiries are captured in Brevo, ready for email marketing and follow-up.",
      },
      {
        icon: "÷",
        title: "Pricing calculator",
        copy: "Clients can get an estimate by number of guests or glasses before they enquire.",
      },
      {
        icon: "▥",
        title: "Work gallery",
        copy: "A gallery gives prospective clients a clear view of previous cocktail experiences.",
      },
      {
        icon: "◉",
        title: "Meta Pixel",
        copy: "Better data supports more informed advertising and campaign improvement.",
      },
    ],
  },
  {
    type: "outcomes",
    eyebrow: "04 / What changed",
    title: "A SALES CHANNEL\nTHAT KEEPS WORKING.",
    items: [
      {
        icon: "#5",
        title: "Top five",
        copy: "Ranking in the top five search results makes the business easier to discover.",
      },
      {
        icon: "↗",
        title: "More inquiries",
        copy: "The website gives people a direct route to ask, book and spend.",
      },
      {
        icon: "✉",
        title: "Brevo-ready",
        copy: "Contact details can now support considered email marketing.",
      },
      {
        icon: "◎",
        title: "Smarter ads",
        copy: "Meta Pixel data helps make future advertising more effective.",
      },
    ],
  },
];

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "neighborhood-cocktails",
    title: "Neighborhood Cocktails",
    description:
      "Neighborhood Cocktails case study — website, branding and digital presence.",
    art: "cocktails",
    pill: "Website · Email Marketing",
    serviceLine: "A premium cocktail brand with a bold online presence.",
    tags: "Website / Email Marketing",
    sections: neighborhoodSections,
  },
  {
    slug: "beads-world-africa",
    title: "Beads World Africa",
    description:
      "Beads World Africa case study — website, branding and digital presence.",
    art: "beads",
    pill: "E-commerce · Email Marketing",
    serviceLine: "E-commerce / Email Marketing / WhatsApp Outreach Automation.",
    tags: "E-commerce / Email Marketing / WhatsApp Outreach Automation",
    sections: standardSections(
      "Beads World Africa had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
    ),
  },
  {
    slug: "digitally-sly",
    title: "Digitally Sly",
    description:
      "Digitally Sly case study — website, branding and digital presence.",
    art: "digitally-sly",
    pill: "Website · Email Marketing",
    serviceLine: "Website / Email Marketing / Digital Presence.",
    tags: "Website / Email Marketing / Digital Presence",
    sections: standardSections(
      "Digitally Sly had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
    ),
  },
  {
    slug: "polar-bison",
    title: "Polar Bison",
    description:
      "Polar Bison case study — website, branding and digital presence.",
    art: "polar",
    pill: "Website · Growth",
    serviceLine:
      "Brand Positioning / Email Marketing / Growth Strategy/ Social Media Strategy",
    tags: "Brand Positioning / Email Marketing / Growth Strategy/ Social Media Strategy",
    sections: standardSections(
      "Polar Bison had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
    ),
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
