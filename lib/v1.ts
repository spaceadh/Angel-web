import { readFile } from "node:fs/promises";
import path from "node:path";

const referenceRoot = path.join(process.cwd(), "reference", "v1");

export type V1Document = {
  html: string;
  styles: string;
  header: string;
  footer: string;
};

const routeMap: Record<string, string> = {
  "index.html": "/",
  "what-we-do/index.html": "/what-we-do",
  "what-we-do/why-malaika.html": "/what-we-do/why-malaika",
  "our-work/index.html": "/our-work",
  "our-work/work/neighborhood-cocktails.html":
    "/our-work/work/neighborhood-cocktails",
  "our-work/work/beads-world-africa.html": "/our-work/work/beads-world-africa",
  "our-work/work/digitally-sly.html": "/our-work/work/digitally-sly",
  "our-work/work/polar-bison.html": "/our-work/work/polar-bison",
};

function insideReferenceRoot(filePath: string) {
  return (
    filePath === referenceRoot ||
    filePath.startsWith(`${referenceRoot}${path.sep}`)
  );
}

function localAssetUrl(value: string, sourceFile: string): string {
  if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(value)) return value;
  const [pathname, suffix = ""] = value.split(/(?=[?#])/);
  const assetPath = path.posix.normalize(
    path.posix.join(path.posix.dirname(sourceFile), pathname),
  );
  return `/v1/${assetPath}${suffix}`;
}

function internalRoute(value: string, sourceFile: string): string {
  if (/^(?:https?:|mailto:|tel:|#)/i.test(value)) return value;
  const [pathname, suffix = ""] = value.split(/(?=[?#])/);
  const normalized = path.posix.normalize(
    path.posix.join(path.posix.dirname(sourceFile), pathname),
  );
  return `${routeMap[normalized] ?? `/${normalized.replace(/\.html$/, "")}`}${suffix}`;
}

function rewriteMarkup(markup: string, sourceFile: string): string {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(
      /\bsrc=(['\"])(.*?)\1/gi,
      (_match, quote: string, value: string) => {
        return `src=${quote}${localAssetUrl(value, sourceFile)}${quote}`;
      },
    )
    .replace(
      /\bhref=(['\"])(.*?)\1/gi,
      (_match, quote: string, value: string) => {
        return `href=${quote}${internalRoute(value, sourceFile)}${quote}`;
      },
    );
}

async function readSourceFile(relativePath: string): Promise<string> {
  const target = path.resolve(referenceRoot, relativePath);
  if (!insideReferenceRoot(target)) throw new Error("Invalid V1 source path.");
  return readFile(target, "utf8");
}

async function extractStyles(
  source: string,
  sourceFile: string,
): Promise<string> {
  const inlineStyles = [
    ...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi),
  ].map((match) => match[1]);
  const linkedStyles = [
    ...source.matchAll(/<link\b[^>]*href=(['\"])([^'\"]+\.css)\1[^>]*>/gi),
  ].map((match) => match[2]);
  const css = await Promise.all(
    linkedStyles.map(async (href) => {
      const cssPath = path.posix.normalize(
        path.posix.join(path.posix.dirname(sourceFile), href),
      );
      return readSourceFile(cssPath);
    }),
  );
  return [...css, ...inlineStyles]
    .join("\n")
    .replace(
      /url\((['\"]?)(?!data:|https?:)(.*?)\1\)/gi,
      (_match, quote: string, value: string) => {
        return `url(${quote}${localAssetUrl(value, sourceFile)}${quote})`;
      },
    );
}

function extractTag(
  source: string,
  tagName: "body" | "header" | "footer",
): string {
  const match = source.match(
    new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"),
  );
  return match ? match[1] : "";
}

export async function getV1Document(sourceFile: string): Promise<V1Document> {
  const source = await readSourceFile(sourceFile);
  const body = extractTag(source, "body");
  const header = extractTag(body, "header");
  const footer = extractTag(body, "footer");
  return {
    html: rewriteMarkup(body, sourceFile),
    styles: await extractStyles(source, sourceFile),
    header: rewriteMarkup(header, sourceFile),
    footer: rewriteMarkup(footer, sourceFile),
  };
}

export function getReferenceRoot() {
  return referenceRoot;
}
