import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { renderChart } from "./blog-charts";
import { getSeries, type SeriesKey } from "./blog-series";

/**
 * Blog content layer.
 *
 * Posts live in `content/blog/<slug>.md` as Markdown with YAML frontmatter.
 * The file name is the URL: `content/blog/website-cost-kenya.md` →
 * `/blog/website-cost-kenya`. See `content/blog/_README.md`.
 */

const postsDirectory = path.join(process.cwd(), "content/blog");
const wordsPerMinute = 220;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
  /** Recurring series this post belongs to (see lib/blog-series.ts). */
  series?: SeriesKey;
  /** Headline number for link previews and the post header. */
  keyStat?: { value: string; label: string };
  sources: PostSource[];
  /** Date the facts were last verified against the sources. */
  factChecked?: string;
  /** 2–4 one-line answers shown at the top; also helps AI search summarise. */
  takeaways: string[];
  /** Service slug (content/services.ts) promoted in the mid-article call to action. */
  service?: string;
};

export type FaqItem = { question: string; answer: string };

export type PostSource = {
  title: string;
  url: string;
  publisher: string;
  date?: string;
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type Post = PostMeta & {
  html: string;
  headings: Heading[];
  faqs: FaqItem[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function toIsoDate(value: unknown, field: string, file: string) {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`content/blog/${file}: "${field}" is not a valid date`);
  }
  return date.toISOString().slice(0, 10);
}

function readPostFile(file: string) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "date"]) {
    if (!data[field]) {
      throw new Error(`content/blog/${file}: missing "${field}" frontmatter`);
    }
  }

  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: toIsoDate(data.date, "date", file),
    updated: data.updated
      ? toIsoDate(data.updated, "updated", file)
      : undefined,
    author: data.author ? String(data.author) : "Malaika Studios",
    category: data.category ? String(data.category) : "Insights",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    series: getSeries(data.series)?.key,
    keyStat:
      data.keyStat?.value && data.keyStat?.label
        ? {
            value: String(data.keyStat.value),
            label: String(data.keyStat.label),
          }
        : undefined,
    sources: Array.isArray(data.sources)
      ? data.sources.map((source: Record<string, unknown>) => ({
          title: String(source.title ?? ""),
          url: String(source.url ?? ""),
          publisher: String(source.publisher ?? ""),
          date: source.date
            ? toIsoDate(source.date, "sources.date", file)
            : undefined,
        }))
      : [],
    factChecked: data.factChecked
      ? toIsoDate(data.factChecked, "factChecked", file)
      : undefined,
    takeaways: Array.isArray(data.takeaways) ? data.takeaways.map(String) : [],
    service: data.service ? String(data.service) : undefined,
    readingMinutes: Math.max(
      1,
      Math.round(content.split(/\s+/).filter(Boolean).length / wordsPerMinute),
    ),
  };
  return { meta, content };
}

function listPostFiles() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"));
}

/** Posts go live at 06:00 Nairobi time (EAT, UTC+3) on their `date`. */
export function publishTime(date: string) {
  return new Date(`${date}T06:00:00+03:00`);
}

/**
 * In production a post is public once it is not a draft and its publish time
 * has passed. Approved posts can be merged early and appear on schedule:
 * blog pages revalidate every 15 minutes. In `pnpm dev` everything shows.
 */
function isPublished(meta: PostMeta) {
  if (process.env.NODE_ENV !== "production") return true;
  return !meta.draft && publishTime(meta.date) <= new Date();
}

export function getAllPosts(): PostMeta[] {
  return listPostFiles()
    .map((file) => readPostFile(file).meta)
    .filter(isPublished)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!listPostFiles().includes(file)) return undefined;
  const { meta, content } = readPostFile(file);
  if (!isPublished(meta)) return undefined;

  const headings: Heading[] = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2 || depth === 3) headings.push({ id, text, depth });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        const external =
          /^https?:\/\//.test(href) &&
          !href.includes("malaikastudios.rotsi.co.ke");
        const titleAttr = title ? ` title="${title}"` : "";
        const rel = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${href}"${titleAttr}${rel}>${text}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const img = `<img src="${href}" alt="${text}" loading="lazy" decoding="async" />`;
        // ![alt](src "Caption") becomes a captioned figure.
        return title
          ? `<figure>${img}<figcaption>${title}</figcaption></figure>`
          : img;
      },
      code({ text, lang }: Tokens.Code) {
        if (lang === "chart") {
          try {
            return renderChart(text);
          } catch (err) {
            throw new Error(`content/blog/${file}: ${(err as Error).message}`);
          }
        }
        return false;
      },
    },
  });

  const html = marked.parse(content, { async: false });
  return { ...meta, html, headings, faqs: extractFaqs(marked, content) };
}

/**
 * Questions (###) under a "Frequently asked questions" (##) section become
 * FAQPage structured data, which search engines and AI assistants read.
 */
function extractFaqs(marked: Marked, content: string): FaqItem[] {
  const faqs: FaqItem[] = [];
  let inFaq = false;
  let current: { question: string; parts: string[] } | undefined;
  const flush = () => {
    if (current && current.parts.length) {
      faqs.push({
        question: current.question,
        answer: current.parts.join(" "),
      });
    }
    current = undefined;
  };
  for (const token of marked.lexer(content)) {
    if (token.type === "heading" && token.depth === 2) {
      flush();
      inFaq = /question/i.test(token.text);
    } else if (inFaq && token.type === "heading" && token.depth === 3) {
      flush();
      current = { question: token.text, parts: [] };
    } else if (inFaq && current && token.type === "paragraph") {
      // Plain text: strip Markdown links and emphasis.
      current.parts.push(
        token.text
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/[*_`]/g, ""),
      );
    }
  }
  flush();
  return faqs;
}

export function getRelatedPosts(post: PostMeta, limit = 3) {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.tags.filter((tag) => post.tags.includes(tag)).length +
        (candidate.category === post.category ? 1 : 0) +
        (post.series && candidate.series === post.series ? 2 : 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score || b.candidate.date.localeCompare(a.candidate.date),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getPostsBySeries(series: SeriesKey) {
  return getAllPosts().filter((post) => post.series === series);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
