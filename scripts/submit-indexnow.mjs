const origin = "https://malaikastudios.rotsi.co.ke";
const key = process.env.INDEXNOW_KEY;

if (!key || key.startsWith("replace-with")) {
  throw new Error("Set INDEXNOW_KEY before submitting URLs.");
}

const sitemap = await fetch(`${origin}/sitemap.xml`);
if (!sitemap.ok)
  throw new Error(`Could not read the production sitemap (${sitemap.status}).`);
const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
if (!urls.length)
  throw new Error("The production sitemap did not contain any URLs.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(origin).host,
    key,
    keyLocation: `${origin}/${key}.txt`,
    urlList: urls,
  }),
});
if (!response.ok)
  throw new Error(`IndexNow rejected the submission (${response.status}).`);
console.log(`Submitted ${urls.length} canonical URLs to IndexNow.`);
