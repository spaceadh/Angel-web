import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { getSeries } from "@/lib/blog-series";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Malaika Studios blog post";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) return renderOgImage({ title: "Malaika Studios Blog" });
  const series = getSeries(post.series);
  return renderOgImage({
    eyebrow: series
      ? `${series.name} · ${formatPostDate(post.date)}`
      : `Malaika Studios Blog · ${post.category}`,
    title: post.title,
    stat: post.keyStat,
    accent: series?.accent === "#2563ff" ? "#7aa2ff" : series?.accent,
    footer: "malaikastudios.rotsi.co.ke/blog",
  });
}
