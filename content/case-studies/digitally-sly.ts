import type { CaseStudy } from "./types";

export const digitallySly: CaseStudy = {
  slug: "digitally-sly",
  title: "Digitally Sly",
  description:
    "Digitally Sly case study — website, branding and digital presence.",
  art: "digitally-sly",
  hero: {
    pill: "Website · Email Marketing",
    intro: "Website / Email Marketing / Digital Presence.",
    tags: "Website / Email Marketing / Digital Presence",
  },
  challenge: {
    eyebrow: "01 / The challenge",
    title: "GOOD PRODUCT.\nQUIET PRESENCE.",
    copy: "Digitally Sly had a strong product and a clear brand vibe, but the online experience didn’t communicate that quality. The opportunity was to make the business feel as considered online as it does in person.",
    keyPoints: {
      eyebrow: "02 / The solution",
      items: [
        "Modern, fast and responsive website",
        "Bold, on-brand visual identity",
        "Clear menu, story and contact paths",
        "Simple UX for browsing and ordering",
      ],
    },
  },
  comparison: {
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
      image: "digitally-sly-logo",
    },
  },
  outcomes: {
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
};
