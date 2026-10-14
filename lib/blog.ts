import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

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
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type Post = PostMeta & { html: string; headings: Heading[] };

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

/** Drafts are visible in `pnpm dev` but never built for production. */
function isPublished(meta: PostMeta) {
  return !meta.draft || process.env.NODE_ENV !== "production";
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
        const titleAttr = title ? ` title="${title}"` : "";
        return `<img src="${href}" alt="${text}"${titleAttr} loading="lazy" decoding="async" />`;
      },
    },
  });

  const html = marked.parse(content, { async: false });
  return { ...meta, html, headings };
}

export function getRelatedPosts(post: PostMeta, limit = 3) {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.tags.filter((tag) => post.tags.includes(tag)).length +
        (candidate.category === post.category ? 1 : 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score || b.candidate.date.localeCompare(a.candidate.date),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
