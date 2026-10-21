import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { getPostsBySeries } from "@/lib/blog";
import { BLOG_SERIES, getSeries } from "@/lib/blog-series";

type PageProps = { params: Promise<{ series: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(BLOG_SERIES).map((series) => ({ series }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const series = getSeries((await params).series);
  if (!series) return {};
  return {
    title: `${series.name} — ${series.cadence}`,
    description: series.tagline,
    alternates: {
      canonical: `/blog/series/${series.key}`,
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const series = getSeries((await params).series);
  if (!series) notFound();
  return <BlogIndex posts={getPostsBySeries(series.key)} series={series} />;
}
