export type WorkArtwork = "cocktails" | "beads" | "digitally-sly";

export type CaseStudyImage =
  | "generic-before"
  | "digitally-sly-logo";

export type CaseStudyCard = {
  icon: string;
  title: string;
  copy: string;
};

/** A screenshot or silent clip; `src` ending in .mp4 renders as a video. */
export type CaseStudyMedia = {
  src: string;
  alt: string;
  poster?: string;
  device: "desktop" | "phone";
  width: number;
  height: number;
  /** Short caption; falls back to `alt`. */
  caption?: string;
};

export type CaseStudyResult = {
  value: string;
  label: string;
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
  /** Replaces the logo artwork in the hero. */
  heroMedia?: CaseStudyMedia;
  /** Highlights shown under the hero; `source` says where any figure came from. */
  results?: {
    items: readonly CaseStudyResult[];
    source?: string;
  };
  /** What runs automatically behind the scenes, in order. */
  automation?: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly { label: string; title: string; copy: string }[];
    note?: string;
  };
  comparison?: {
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
  walkthrough?: {
    eyebrow: string;
    title: string;
    steps: readonly { title: string; copy: string; media: CaseStudyMedia }[];
  };
  gallery?: {
    eyebrow: string;
    title: string;
    items: readonly CaseStudyMedia[];
  };
  /** Slugs from content/services.ts. */
  services?: readonly string[];
  outcomes?: {
    eyebrow: string;
    title: string;
    items: readonly CaseStudyCard[];
  };
};
