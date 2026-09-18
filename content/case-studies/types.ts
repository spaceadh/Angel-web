export type WorkArtwork = "cocktails" | "beads" | "digitally-sly" | "polar";

export type CaseStudyImage =
  "generic-before" | "generic-after" | "neighborhood-landing" | "beads-landing" | "polar-logo" | "digitally-sly-logo";

export type CaseStudyCard = {
  icon: string;
  title: string;
  copy: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  art: WorkArtwork;
  hero: {
    pill: string;
    intro: string;
    tags: string;
  };
  challenge: {
    eyebrow: string;
    title: string;
    copy: string;
    keyPoints?: {
      eyebrow: string;
      title?: string;
      items: readonly string[];
    };
  };
  comparison: {
    eyebrow: string;
    title: string;
    before: {
      label: string;
      title: string;
      copy: string;
      image?: CaseStudyImage;
    };
    after: {
      label: string;
      title: string;
      copy: string;
      image?: CaseStudyImage;
    };
  };
  system?: {
    eyebrow: string;
    title: string;
    items: readonly CaseStudyCard[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    items: readonly CaseStudyCard[];
  };
};
