export type CaseStudyLayout = "v1-standard";

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  source: string;
  layout: CaseStudyLayout;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "neighborhood-cocktails",
    title: "Neighborhood Cocktails",
    description:
      "Neighborhood Cocktails case study — website, branding and digital presence.",
    source: "our-work/work/neighborhood-cocktails.html",
    layout: "v1-standard",
  },
  {
    slug: "beads-world-africa",
    title: "Beads World Africa",
    description:
      "Beads World Africa case study — website, branding and digital presence.",
    source: "our-work/work/beads-world-africa.html",
    layout: "v1-standard",
  },
  {
    slug: "digitally-sly",
    title: "Digitally Sly",
    description:
      "Digitally Sly case study — website, branding and digital presence.",
    source: "our-work/work/digitally-sly.html",
    layout: "v1-standard",
  },
  {
    slug: "polar-bison",
    title: "Polar Bison",
    description:
      "Polar Bison case study — website, branding and digital presence.",
    source: "our-work/work/polar-bison.html",
    layout: "v1-standard",
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
