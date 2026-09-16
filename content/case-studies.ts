export type WorkArtwork = "cocktails" | "beads" | "digitally-sly" | "polar";

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  art: WorkArtwork;
  pill: string;
  serviceLine: string;
  tags: string;
  challenge: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "neighborhood-cocktails",
    title: "Neighborhood Cocktails",
    description:
      "Neighborhood Cocktails case study — website, branding and digital presence.",
    art: "cocktails",
    pill: "Website · Branding",
    serviceLine: "A premium cocktail brand with a bold online presence.",
    tags: "Website / Branding / Digital Presence",
    challenge:
      "Neighborhood Cocktails had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
  },
  {
    slug: "beads-world-africa",
    title: "Beads World Africa",
    description:
      "Beads World Africa case study — website, branding and digital presence.",
    art: "beads",
    pill: "E-commerce · Automation",
    serviceLine: "E-commerce / Email / WhatsApp Automation.",
    tags: "E-commerce / Email / WhatsApp Automation",
    challenge:
      "Beads World Africa had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
  },
  {
    slug: "digitally-sly",
    title: "Digitally Sly",
    description:
      "Digitally Sly case study — website, branding and digital presence.",
    art: "digitally-sly",
    pill: "Website · Marketing",
    serviceLine: "Website / Branding / Strategy.",
    tags: "Website / Branding / Strategy",
    challenge:
      "Digitally Sly had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
  },
  {
    slug: "polar-bison",
    title: "Polar Bison",
    description:
      "Polar Bison case study — website, branding and digital presence.",
    art: "polar",
    pill: "Website · Growth",
    serviceLine: "Website / Strategy / Growth.",
    tags: "Website / Strategy / Growth",
    challenge:
      "Polar Bison had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
