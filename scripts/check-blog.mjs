#!/usr/bin/env node
/**
 * Blog quality gate. Every post must pass before it is published.
 *
 *   pnpm blog:check                 # all posts
 *   pnpm blog:check <slug> [...]    # specific posts
 *
 * Errors fail the check (exit 1). Warnings are for the editor to judge.
 * Standards live in content/blog/_EDITORIAL.md.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDir = path.join(root, "content/blog");
const publicDir = path.join(root, "public");

// Keep in sync with lib/blog-series.ts.
const SERIES = {
  "kenya-lens": {
    name: "Kenya Lens",
    weekday: 1,
    minSources: 3,
    minCharts: 1,
    minVisuals: 1,
    words: [900, 1800],
  },
  "global-brief": {
    name: "Global Brief",
    weekday: 5,
    minSources: 8,
    minCharts: 1,
    minVisuals: 2,
    words: [800, 1800],
  },
};
const DEFAULT_RULES = {
  minSources: 0,
  minCharts: 0,
  minVisuals: 0,
  words: [500, 2500],
};
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Phrases that make writing sound generic or machine-made.
// Developer vocabulary that loses a business reader. Fine once if explained;
// flagged when it piles up. Keep in sync with _EDITORIAL.md → "Voice".
const JARGON = [
  "api",
  "sdk",
  "mcp",
  "cve",
  "ghsa",
  "rce",
  "ssrf",
  "xss",
  "webhook",
  "endpoint",
  "framework",
  "backend",
  "deploy",
  "repo",
  "token",
  "tokens",
  "lts",
  "beta",
  "self-hosted",
  "open-source",
  "llm",
  "server",
  "runtime",
  "changelog",
];

const CLICHES = [
  "in today's fast-paced",
  "in today’s fast-paced",
  "delve",
  "game-changer",
  "game changer",
  "unlock the",
  "unleash",
  "navigate the landscape",
  "ever-evolving",
  "ever-changing landscape",
  "in conclusion",
  "it's worth noting",
  "it’s worth noting",
  "a testament to",
  "revolutionize",
  "revolutionise",
  "seamless",
  "cutting-edge",
  "harness the power",
  "elevate your",
];

function isoDate(value) {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function checkPost(file) {
  const errors = [];
  const warnings = [];
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(
    fs.readFileSync(path.join(postsDir, file), "utf8"),
  );
  const series = SERIES[data.series];
  const rules = series ?? DEFAULT_RULES;

  // Slug
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    errors.push("slug must be lowercase words joined by hyphens");
  if (slug.length > 75) warnings.push(`slug is long (${slug.length} chars)`);

  // Frontmatter basics
  for (const field of ["title", "description", "date"]) {
    if (!data[field]) errors.push(`missing "${field}"`);
  }
  if (data.series && !series)
    errors.push(
      `unknown series "${data.series}" (use ${Object.keys(SERIES).join(" or ")})`,
    );

  const title = String(data.title ?? "");
  if (title.length > 70)
    errors.push(`title is ${title.length} chars; Google truncates around 60`);
  else if (title.length > 60)
    warnings.push(`title is ${title.length} chars; aim for 60 or fewer`);

  const description = String(data.description ?? "");
  if (description.length < 70 || description.length > 200) {
    errors.push(`description is ${description.length} chars; aim for 120–160`);
  } else if (description.length < 110 || description.length > 165) {
    warnings.push(
      `description is ${description.length} chars; aim for 120–160`,
    );
  }

  const date = isoDate(data.date);
  if (!date) errors.push(`"date" is not a valid date`);
  if (series && date && date.getUTCDay() !== series.weekday) {
    errors.push(
      `${series.name} publishes on ${WEEKDAYS[series.weekday]}s, but date is a ${WEEKDAYS[date.getUTCDay()]}`,
    );
  }

  if (series) {
    if (!data.keyStat?.value || !data.keyStat?.label)
      errors.push(
        "series posts need keyStat.value and keyStat.label (used in link previews)",
      );
    else if (String(data.keyStat.value).length > 9)
      warnings.push(
        "keyStat.value is long; keep it to a short number like 52.3m or +19.5%",
      );
    if (!data.factChecked)
      errors.push(
        `series posts need "factChecked" (the date facts were verified)`,
      );
    const takeaways = Array.isArray(data.takeaways) ? data.takeaways : [];
    if (takeaways.length < 2 || takeaways.length > 4)
      errors.push(
        "series posts need 2–4 takeaways (shown at the top; used by AI search)",
      );
    if (takeaways.some((item) => String(item).split(/\s+/).length > 25))
      warnings.push("keep each takeaway under 25 words");
    if (!data.service)
      errors.push(
        `series posts need "service" (the service the post promotes)`,
      );
  }
  if (data.service) {
    const servicesSource = fs.readFileSync(
      path.join(root, "content/services.ts"),
      "utf8",
    );
    if (!servicesSource.includes(`slug: "${data.service}"`))
      errors.push(
        `unknown service "${data.service}" (see content/services.ts)`,
      );
  }
  const factChecked = data.factChecked ? isoDate(data.factChecked) : null;
  if (factChecked && date && factChecked > date)
    warnings.push("factChecked is after the publish date");

  // Sources
  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (sources.length < rules.minSources)
    errors.push(
      `${sources.length} sources listed; needs at least ${rules.minSources}`,
    );
  sources.forEach((source, i) => {
    if (!source?.title || !source?.publisher)
      errors.push(`source #${i + 1} needs title and publisher`);
    if (!/^https:\/\//.test(String(source?.url ?? "")))
      errors.push(`source #${i + 1} needs an https URL`);
  });
  const sourceUrls = new Set(sources.map((s) => String(s?.url ?? "")));
  if (sourceUrls.size !== sources.length)
    warnings.push("duplicate source URLs");

  // Body structure
  const body = content.replace(/```[\s\S]*?```/g, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < rules.words[0])
    errors.push(
      `${words} words; ${series?.name ?? "posts"} need at least ${rules.words[0]}`,
    );
  if (words > rules.words[1])
    warnings.push(`${words} words; consider trimming below ${rules.words[1]}`);
  if (/^#\s/m.test(body))
    errors.push(
      "do not use a level-1 heading (#) in the body; the title is the H1",
    );
  const h2 = (body.match(/^##\s/gm) ?? []).length;
  if (h2 < 3)
    warnings.push(
      `only ${h2} section headings (##); 3+ helps scanning and the table of contents`,
    );

  // Links
  const links = [...body.matchAll(/\[[^\]]*\]\(([^)\s]+)/g)]
    .map((m) => m[1])
    .filter(
      (href) =>
        !href.startsWith("/blog/") || !/\.(webp|png|jpe?g|svg)$/.test(href),
    );
  const internal = links.filter((href) => href.startsWith("/"));
  for (const href of links) {
    if (/^http:\/\//.test(href)) errors.push(`insecure link: ${href}`);
  }
  if (internal.length < 2)
    warnings.push(
      `${internal.length} internal links; link at least 2 related pages (a service, /pricing, /match or another post)`,
    );
  for (const href of internal) {
    const clean = href.split(/[?#]/)[0];
    if (clean.startsWith("/blog/") && !clean.startsWith("/blog/series/")) {
      const target = path.join(postsDir, `${clean.replace("/blog/", "")}.md`);
      if (!fs.existsSync(target)) errors.push(`broken internal link: ${href}`);
      else if (
        data.draft !== true &&
        matter(fs.readFileSync(target, "utf8")).data.draft === true
      ) {
        errors.push(`links to a draft post (404 in production): ${href}`);
      }
    }
  }

  // Images
  for (const [, alt, src] of content.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    if (!alt.trim()) errors.push(`image without alt text: ${src}`);
    if (src.startsWith("/")) {
      const filePath = path.join(publicDir, src);
      if (!fs.existsSync(filePath))
        errors.push(`missing image file: public${src}`);
      else if (fs.statSync(filePath).size > 300_000)
        warnings.push(`image over 300 KB: ${src}`);
    }
  }

  // Charts
  const charts = [...content.matchAll(/```chart\n([\s\S]*?)```/g)];
  if (charts.length < rules.minCharts)
    errors.push(
      `${charts.length} charts; ${series?.name ?? "posts"} need at least ${rules.minCharts}`,
    );
  // Visuals = charts + Markdown comparison tables (counted by separator rows).
  const tables = (body.match(/^\|\s*:?-{3,}/gm) ?? []).length;
  if (charts.length + tables < rules.minVisuals)
    errors.push(
      `${charts.length + tables} visuals (charts + tables); ${series?.name ?? "posts"} need at least ${rules.minVisuals}`,
    );
  charts.forEach(([, json], i) => {
    try {
      const spec = JSON.parse(json);
      if (!spec.title || !spec.source)
        errors.push(`chart #${i + 1} needs "title" and "source"`);
      if (!["bar", "column", "line"].includes(spec.type))
        errors.push(`chart #${i + 1} has unknown type "${spec.type}"`);
      if (
        spec.type === "line" &&
        spec.series?.some((s) => s.values?.length !== spec.labels?.length)
      ) {
        errors.push(`chart #${i + 1}: every series needs one value per label`);
      }
    } catch (err) {
      errors.push(`chart #${i + 1} is not valid JSON (${err.message})`);
    }
  });

  // Style
  const lower = content.toLowerCase();
  const proseWords = body.toLowerCase().match(/[a-z][a-z-]*/g) ?? [];
  const jargonHits = JARGON.map((term) => [
    term,
    proseWords.filter((w) => w === term).length,
  ]).filter(([, n]) => n > 0);
  const jargonTotal = jargonHits.reduce((sum, [, n]) => sum + n, 0);
  if (jargonTotal > 4)
    warnings.push(
      `too technical for business readers (${jargonTotal} jargon words: ${jargonHits.map(([w, n]) => `${w}×${n}`).join(", ")})`,
    );
  const found = CLICHES.filter((phrase) => lower.includes(phrase));
  if (found.length)
    warnings.push(`generic phrasing: ${found.map((p) => `"${p}"`).join(", ")}`);
  const prose = body
    .split("\n")
    .filter((line) => !line.trim().startsWith("|"))
    .join("\n");
  const sentences = prose
    .split(/(?<=[.!?]["”’*]{0,2})\s+|\n+/)
    .filter((s) => s.split(/\s+/).length > 3);
  const long = sentences.filter((s) => s.split(/\s+/).length > 35).length;
  if (long > 2)
    warnings.push(
      `${long} sentences over 35 words; split them for mobile readers`,
    );

  // Approved posts with a future date go live at 06:00 EAT on that date.
  let schedule;
  if (data.draft !== true && date) {
    const goLive = new Date(
      `${date.toISOString().slice(0, 10)}T06:00:00+03:00`,
    );
    if (goLive > new Date())
      schedule = `scheduled: goes live ${goLive.toISOString().slice(0, 10)} 06:00 EAT`;
  }

  return {
    schedule,
    slug,
    draft: data.draft === true,
    series: series?.name,
    words,
    errors,
    warnings,
  };
}

const requested = process.argv.slice(2);
const files = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
  .filter(
    (file) =>
      !requested.length || requested.includes(file.replace(/\.md$/, "")),
  );

if (requested.length && files.length !== requested.length) {
  console.error("Some requested posts were not found in content/blog/.");
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  const result = checkPost(file);
  const status = result.errors.length
    ? "✗ FAIL"
    : result.warnings.length
      ? "⚠ PASS with warnings"
      : "✓ PASS";
  console.log(
    `\n${status}  ${result.slug}${result.draft ? "  [draft]" : result.schedule ? `  [${result.schedule}]` : ""}  · ${result.series ?? "standalone"} · ${result.words} words`,
  );
  for (const error of result.errors) console.log(`   ✗ ${error}`);
  for (const warning of result.warnings) console.log(`   ⚠ ${warning}`);
  if (result.errors.length) failed++;
}
console.log(`\n${files.length - failed}/${files.length} posts passed.`);
process.exit(failed ? 1 : 0);
