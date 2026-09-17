import type { CaseStudy } from "./types";

export const neighborhoodCocktails: CaseStudy = {
  slug: "neighborhood-cocktails",
  title: "Neighborhood Cocktails",
  description:
    "Neighborhood Cocktails case study — website, branding and digital presence.",
  art: "cocktails",
  hero: {
    pill: "Website · Email Marketing",
    intro: "A premium cocktail brand with a bold online presence.",
    tags: "Website / Email Marketing",
  },
  challenge: {
    eyebrow: "01 / The challenge",
    title: "ACTIVE ON INSTAGRAM.\nINVISIBLE ON SEARCH.",
    copy: "Neighborhood Cocktails was active on Instagram, but could not be found through search—closing off an important sales channel.",
    keyPoints: {
      eyebrow: "What was missing",
      title: "THE SALES CHANNEL WAS CLOSED.",
      items: [
        "No website, so the business was not reachable online.",
        "No search visibility, limiting discovery beyond Instagram.",
      ],
    },
  },
  comparison: {
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
  system: {
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
  outcomes: {
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
};
