import type { CaseStudy } from "./types";

const media = "/work/neighborhood-cocktails";

export const neighborhoodCocktails: CaseStudy = {
  slug: "neighborhood-cocktails",
  title: "Neighborhood Cocktails",
  description:
    "How Malaika Studios built Neighborhood Cocktails, a Nairobi mobile cocktail bar, a website that prices events, takes bookings and follows up automatically.",
  art: "cocktails",
  hero: {
    pill: "Website · Booking · Automation",
    intro:
      "A Nairobi mobile cocktail bar that went from Instagram-only to a website clients can price, book and come back to.",
    tags: "Website / Booking & Budget Tools / Email Automation / SEO",
  },
  heroMedia: {
    src: `${media}/home.webp`,
    alt: "Neighborhood Cocktails home page on a laptop: “You make the memories. We bring the cocktails.”",
    device: "desktop",
    width: 2268,
    height: 1304,
  },
  results: {
    items: [
      {
        value: "Priced upfront",
        label: "Clients see a budget range for their event before they ask.",
      },
      {
        value: "Booked online",
        label: "Every request is confirmed by email and lands with the team.",
      },
      {
        value: "Found on Google",
        label: "A page for each kind of event people search for in Nairobi.",
      },
    ],
  },
  challenge: {
    eyebrow: "01 / The challenge",
    title: "ACTIVE ON INSTAGRAM.\nINVISIBLE ON SEARCH.",
    copy: "Neighborhood Cocktails was busy on Instagram, but people searching for a cocktail bar for their wedding or company event couldn't find it, and every enquiry started from scratch in the DMs.",
    keyPoints: {
      eyebrow: "What was missing",
      title: "NO WAY TO FIND, PRICE OR BOOK.",
      items: [
        "No website, so the business couldn't be found beyond Instagram.",
        "Every price question and booking was handled by hand.",
      ],
    },
  },
  walkthrough: {
    eyebrow: "02 / How it works",
    title: "PRICE IT, PICK IT,\nBOOK IT.",
    steps: [
      {
        title: "Clients price their event themselves.",
        copy: "A budget calculator turns guest numbers, event length and drink styles into a price range on the spot, so the first conversation starts with a realistic budget.",
        media: {
          src: `${media}/budget-calculator.mp4`,
          poster: `${media}/budget-calculator-poster.webp`,
          alt: "On a laptop: the “Calculate your drinks budget” tool, changing guests and drink styles while the price range updates.",
          device: "desktop",
          width: 1104,
          height: 740,
        },
      },
      {
        title: "A page for every kind of event.",
        copy: "Weddings, corporate events, private parties and masterclasses each get their own page, with what's included and a booking button, written for what people search.",
        media: {
          src: `${media}/event-pages.mp4`,
          poster: `${media}/event-pages-poster.webp`,
          alt: "On a phone: the mobile bar service page and the Signature Weddings page with what's included.",
          device: "phone",
          width: 660,
          height: 1346,
        },
      },
      {
        title: "The work sells itself.",
        copy: "A gallery of past setups, sorted by event type, lets people see the bar before they book it.",
        media: {
          src: `${media}/gallery.mp4`,
          poster: `${media}/gallery-poster.webp`,
          alt: "On a phone: the gallery filtered by event type, opening photos of past bar setups.",
          device: "phone",
          width: 660,
          height: 1346,
        },
      },
    ],
  },
  automation: {
    eyebrow: "03 / Behind the scenes",
    title: "WHAT HAPPENS\nAFTER “BOOK”.",
    intro:
      "A booking request used to mean a string of DMs. Now the website handles the first steps on its own.",
    steps: [
      {
        label: "Website",
        title: "Request sent",
        copy: "The client fills in the event, guests and bar setup in one form.",
      },
      {
        label: "Email",
        title: "Team alerted",
        copy: "The team gets the full request by email, ready to reply.",
      },
      {
        label: "Email",
        title: "Client confirmed",
        copy: "The client gets an email straight away confirming the request arrived.",
      },
      {
        label: "CRM",
        title: "Contact saved",
        copy: "The client is added to the Brevo email list, ready for future offers.",
      },
      {
        label: "Ads",
        title: "Lead counted",
        copy: "With the visitor's consent, Meta records the booking as a lead so ads can find more people like them.",
      },
    ],
    note: "Guest feedback works the same way: happy guests and unhappy ones go to separate email lists, and poor reviews alert the team at once.",
  },
  gallery: {
    eyebrow: "04 / The site",
    title: "AS BOLD\nAS THE BAR.",
    items: [
      {
        src: `${media}/events.webp`,
        alt: "“Events made to feel personal” with corporate events, masterclasses and weddings.",
        caption: "Events",
        device: "desktop",
        width: 2268,
        height: 1304,
      },
      {
        src: `${media}/calculator.webp`,
        alt: "The drinks budget calculator, step one: event size and duration.",
        caption: "Budget calculator",
        device: "desktop",
        width: 2268,
        height: 1304,
      },
      {
        src: `${media}/booking.webp`,
        alt: "The booking request form with event details and bar configuration.",
        caption: "Booking request",
        device: "desktop",
        width: 2268,
        height: 1304,
      },
    ],
  },
  services: [
    "website-design-development",
    "whatsapp-email-crm-automation",
    "digital-growth-strategy-analytics",
  ],
  system: {
    eyebrow: "05 / Also in the build",
    title: "EVERYTHING ELSE\nTHAT KEEPS IT RUNNING.",
    items: [
      {
        icon: "✎",
        title: "Easy updates",
        copy: "The team edits cocktails, photos and prices themselves, no developer needed.",
      },
      {
        icon: "◉",
        title: "WhatsApp button",
        copy: "A WhatsApp shortcut on every page for people who'd rather just chat.",
      },
      {
        icon: "#",
        title: "SEO",
        copy: "Pages and structure built so local event searches lead to the site.",
      },
      {
        icon: "↗",
        title: "Ad tracking",
        copy: "Meta tracking, only after consent, so ad spend can be measured.",
      },
    ],
  },
};
