// Tells Bing and other IndexNow engines which live URLs to recrawl.
//   node scripts/submit-indexnow.mjs            every URL in the live sitemap
//   node scripts/submit-indexnow.mjs --today    only URLs whose lastmod is today (EAT)
//   add --dry-run to print the URLs without submitting.
import { readdirSync, readFileSync } from "node:fs";

const origin = "https://malaikastudios.rotsi.co.ke";
const args = new Set(process.argv.slice(2));

// The key is public by design: it is served at /<key>.txt from public/.
function findKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  const file = readdirSync(new URL("../public/", import.meta.url)).find(
    (name) => /^[0-9a-f]{32}\.txt$/.test(name),
  );
  if (!file) throw new Error("No IndexNow key file found in public/.");
  return readFileSync(new URL(`../public/${file}`, import.meta.url), "utf8").trim();
}

const key = findKey();
const keyLocation = `${origin}/${key}.txt`;

const live = await fetch(keyLocation);
if (!live.ok || (await live.text()).trim() !== key)
  throw new Error(`${keyLocation} is not live yet (${live.status}).`);

const sitemap = await fetch(`${origin}/sitemap.xml`);
if (!sitemap.ok)
  throw new Error(`Could not read the production sitemap (${sitemap.status}).`);
const entries = [...(await sitemap.text()).matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  ([, body]) => ({
    url: body.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: body.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }),
);

// Scheduled posts go live at 06:00 EAT without a deploy, with lastmod = their date.
const today = new Date(Date.now() + 3 * 3600_000).toISOString().slice(0, 10);
const urls = entries
  .filter((entry) => entry.url && (!args.has("--today") || entry.lastmod?.startsWith(today)))
  .map((entry) => entry.url);

if (!urls.length) {
  console.log(args.has("--today") ? `Nothing published on ${today}.` : "The sitemap is empty.");
  process.exit(args.has("--today") ? 0 : 1);
}
if (args.has("--dry-run")) {
  console.log(urls.join("\n"));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList: urls }),
});
// 200 = submitted, 202 = received while the key is still being validated.
if (!response.ok)
  throw new Error(`IndexNow rejected the submission (${response.status}).`);
console.log(`Submitted ${urls.length} URLs to IndexNow (${response.status}).`);
