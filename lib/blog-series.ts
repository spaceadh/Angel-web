/**
 * Recurring blog series. Rename a series or change its colour here; posts opt
 * in with `series: <key>` in their frontmatter.
 */
export const BLOG_SERIES = {
  "kenya-lens": {
    key: "kenya-lens",
    name: "Kenya Lens",
    cadence: "Every Monday",
    /** 0 = Sunday … 6 = Saturday, checked by `pnpm blog:check`. */
    weekday: 1,
    tagline:
      "One well-researched Kenyan story each week, with the data behind it and what it means for local businesses.",
    accent: "#16b88a",
  },
  "global-brief": {
    key: "global-brief",
    name: "Global Brief",
    cadence: "Every Friday",
    weekday: 5,
    tagline:
      "The week's biggest moves in email, WhatsApp, websites, search, social and AI tools, and what they mean for businesses in Kenya and Africa.",
    accent: "#2563ff",
  },
} as const;

export type SeriesKey = keyof typeof BLOG_SERIES;
export type BlogSeries = (typeof BLOG_SERIES)[SeriesKey];

export function getSeries(key: string | undefined): BlogSeries | undefined {
  return key && key in BLOG_SERIES ? BLOG_SERIES[key as SeriesKey] : undefined;
}
