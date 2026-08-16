export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
};

export const insights: Insight[] = [
  {
    slug: "website-redesign-cost-nairobi-2026",
    title: "How much does a website redesign cost in Nairobi in 2026?",
    excerpt: "Understanding the true cost of a website redesign in Kenya, what you should expect to pay, and why a cheap website often costs more in the long run.",
    content: "When considering a website redesign in Nairobi in 2026, business owners often find a wide range of pricing—from KES 15,000 to over KES 250,000. Why the massive gap? The answer lies in what you are actually buying.\n\nAt the lower end, you are typically purchasing a template populated with your logo and basic text. While affordable, these sites rarely convert visitors into customers because they lack a structured journey. \n\nA mid-tier redesign (KES 85,000 - KES 150,000) involves actual strategy. This means understanding your target audience, designing clear navigation, optimizing for mobile, and ensuring the site loads fast. \n\nAt the premium tier (KES 180,000+), you are investing in a 'Client Magnet System'. This isn't just a website; it's a digital presence integrated with your business operations—such as WhatsApp booking flows, automated email follow-ups, and advanced SEO architecture.\n\nThe real question isn't 'how much does a website cost?' but rather, 'how much revenue are we losing because our current website doesn't clearly communicate our value?' A well-designed website earns its place by improving visibility, clarity, trust, and inquiry conversion.",
    date: "2026-08-16",
  },
  {
    slug: "why-kenyan-sme-needs-client-magnet-system",
    title: "Why your Kenyan SME needs a client magnet system",
    excerpt: "A website is no longer enough. To grow in today's digital landscape, your business needs a system that attracts, converts, and retains clients.",
    content: "Many Kenyan SMEs have a website that acts as a digital brochure—it lists services and a phone number, but does little else. A 'Client Magnet System' transforms that brochure into an active business asset.\n\n### Attract\nThe first step is getting the right eyes on your business. This means proper technical SEO so you show up in local searches, fast loading times on mobile devices, and clear messaging that immediately tells the visitor they are in the right place.\n\n### Convert\nAttention is useless without action. A client magnet system uses clear calls-to-action (CTAs) and structured forms. Instead of just a 'Contact Us' page, it provides guided paths—like a WhatsApp inquiry button for immediate questions or a structured quote form for larger B2B transactions.\n\n### Retain\nThe journey doesn't end when they reach out. The system should integrate with your follow-up process, whether that's an automated email confirming receipt of their inquiry, or a CRM that helps your team track the conversation.\n\nBy upgrading from a static website to a client magnet system, your business looks as good online as it actually is in person, building trust before the first conversation even begins.",
    date: "2026-08-10",
  }
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}
