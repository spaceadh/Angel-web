import type { CaseStudy } from "./types";

const media = "/work/digitally-sly";

export const digitallySly: CaseStudy = {
  slug: "digitally-sly",
  title: "Digitally Sly",
  description:
    "How Malaika Studios is building Digitally Sly, a Kenyan social media and content studio, a mobile-first website true to its brand.",
  art: "digitally-sly",
  hero: {
    pill: "Website · In development",
    intro:
      "A social media and content studio in Kenya, getting a website that looks as good as the content it makes. Launching soon.",
    tags: "Website / Mobile-first Design / Enquiries",
  },
  heroMedia: {
    src: `${media}/home.webp`,
    alt: "Digitally Sly home page on a laptop: “Good content does more.”",
    device: "desktop",
    width: 1100,
    height: 740,
  },
  results: {
    items: [
      {
        value: "Phone first",
        label: "Designed for the phone, where its audience scrolls, then scaled up.",
      },
      {
        value: "On brand",
        label: "Built from Digitally Sly's own brand guidelines, colour for colour.",
      },
      {
        value: "One form",
        label: "Every kind of enquiry goes through a single, short form.",
      },
    ],
  },
  challenge: {
    eyebrow: "01 / The challenge",
    title: "GOOD CONTENT.\nQUIET PRESENCE.",
    copy: "Digitally Sly makes content for other brands, but had nowhere of its own to show what it does, who's behind it and how to work with it.",
    keyPoints: {
      eyebrow: "What it needed",
      title: "A HOME AS SHARP AS THE WORK.",
      items: [
        "Say clearly what the studio does and who it's for.",
        "Turn interest from social media into real enquiries.",
      ],
    },
  },
  walkthrough: {
    eyebrow: "02 / How it works",
    title: "SEE IT, GET IT,\nGET IN TOUCH.",
    steps: [
      {
        title: "The first screen says what they do.",
        copy: "Strategy, content and growth, said plainly up top, with the four services one scroll away.",
        media: {
          src: `${media}/homepage.mp4`,
          poster: `${media}/homepage-poster.webp`,
          alt: "On a laptop: the Digitally Sly home page scrolling from “Good content does more” to the four services.",
          device: "desktop",
          width: 1100,
          height: 740,
        },
      },
      {
        title: "Built for the phone first.",
        copy: "A social media studio's audience is on their phones, so every section was designed there before it was scaled up for laptops.",
        media: {
          src: `${media}/mobile-tour.mp4`,
          poster: `${media}/mobile-tour-poster.webp`,
          alt: "On a phone: the home page, the studio's story and the service cards.",
          device: "phone",
          width: 664,
          height: 1352,
        },
      },
      {
        title: "One form for every enquiry.",
        copy: "Whether someone wants a strategy, content or a one-off event shoot, they pick what they need in one short form.",
        media: {
          src: `${media}/enquiry-form.mp4`,
          poster: `${media}/enquiry-form-poster.webp`,
          alt: "On a laptop: the contact page, with sections about you, what you need and the details.",
          device: "desktop",
          width: 1100,
          height: 740,
        },
      },
    ],
  },
  gallery: {
    eyebrow: "03 / The site",
    title: "BOLD, WARM\nAND ON BRAND.",
    items: [
      {
        src: `${media}/about.webp`,
        alt: "About page: “The strategist behind the scroll” and the founder's story.",
        caption: "About",
        device: "desktop",
        width: 1100,
        height: 740,
      },
      {
        src: `${media}/services.webp`,
        alt: "Services page: “Content with a reason to exist.”",
        caption: "Services",
        device: "desktop",
        width: 1100,
        height: 740,
      },
      {
        src: `${media}/event-content.webp`,
        alt: "The Event content service page with booking and enquiry buttons.",
        caption: "Event content",
        device: "desktop",
        width: 1100,
        height: 740,
      },
    ],
  },
  services: ["website-design-development"],
  system: {
    eyebrow: "04 / In the build",
    title: "WHAT'S GOING\nINTO IT.",
    items: [
      {
        icon: "▥",
        title: "Service pages",
        copy: "A page for each service, saying who it's for and what's included.",
      },
      {
        icon: "✦",
        title: "Founder story",
        copy: "An about page that puts the person behind the studio up front.",
      },
      {
        icon: "?",
        title: "FAQs",
        copy: "Answers to the questions people ask before they get in touch.",
      },
      {
        icon: "◎",
        title: "Considered motion",
        copy: "Moving sections can be paused and calm down for people who prefer less motion.",
      },
    ],
  },
};
