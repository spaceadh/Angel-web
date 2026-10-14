# Writing a blog post

Posts are plain Markdown files in `content/blog/`. No CMS or database is involved: add a file, commit, deploy.

## Publish a post in 5 steps

1. Copy `content/blog/_template.md` to `content/blog/<your-url-slug>.md`.
   The file name becomes the URL: `website-cost-kenya.md` → `/blog/website-cost-kenya`.
   Use lowercase words joined by hyphens. Don't rename a file after it's published, because that breaks links and loses search ranking.
2. Fill in the frontmatter (the block between the `---` lines):

   | Field | Required | Notes |
   | --- | --- | --- |
   | `title` | yes | Under ~60 characters. Put the main search phrase near the start. |
   | `description` | yes | 120–160 characters. Shown on Google and on social shares. |
   | `date` | yes | `YYYY-MM-DD`. Newest posts appear first. |
   | `updated` | no | Set when you meaningfully revise a post; it's sent to Google. |
   | `author` | no | Defaults to "Malaika Studios". |
   | `category` | no | One of: Websites, Branding, SEO, Automation, Growth. Defaults to "Insights". |
   | `tags` | no | 2–4 keyword phrases. Used for related posts and meta keywords. |
   | `draft` | no | `true` shows the post only in `pnpm dev`, never in production. |

3. Write the body in Markdown. Use `##` for main sections (these build the "On this page" menu) and `###` for sub-sections. Tables, quotes (`>`), lists and links all work.
4. Preview with `pnpm dev` and open `http://localhost:3000/blog`.
5. Set `draft: false`, commit and deploy. Then run `pnpm indexnow:submit` so Bing picks it up quickly.

## What happens automatically

Each published post gets:

- A static page at `/blog/<slug>` with its canonical URL, Open Graph and Twitter tags
- A branded 1200×630 share image (`/blog/<slug>/opengraph-image`)
- `BlogPosting` and `BreadcrumbList` structured data
- An entry in `/sitemap.xml` with its real date, and in the RSS feed at `/blog/rss.xml`
- A table of contents, reading time, related posts and an estimate/WhatsApp CTA

## Images

Put images in `public/blog/<slug>/` and reference them as `![Describe the image](/blog/<slug>/photo.webp)`.
Use WebP, keep files under ~200 KB, and always write the alt text.

## Writing posts that rank

- **One question per post.** Pick a phrase a Kenyan customer would actually search for, such as "how much does a website cost in Kenya" or "WhatsApp Business API Kenya".
- **Answer it in the first paragraph,** then go deeper.
- **Link internally.** Every post should link to at least one service page, `/pricing` or `/match?source=blog_<slug>`, and to one other post.
- **Add an FAQ section** with `###` questions. These match "People also ask" searches.
- **Use real numbers** from `lib/pricing.ts`, and update the post (and its `updated` date) when prices change.
- **Publish steadily.** Two posts a month for six months beats ten posts in one week.
