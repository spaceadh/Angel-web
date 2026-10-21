import { BLOG_SERIES, getSeries } from "@/lib/blog-series";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Malaika Studios blog series";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(BLOG_SERIES).map((series) => ({ series }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const series = getSeries((await params).series);
  return renderOgImage({
    eyebrow: series
      ? `${series.name} · ${series.cadence}`
      : "Malaika Studios Blog",
    title: series?.tagline ?? "Malaika Studios Blog",
    footer: "malaikastudios.rotsi.co.ke/blog",
    accent: series?.key === "global-brief" ? "#7aa2ff" : series?.accent,
  });
}
