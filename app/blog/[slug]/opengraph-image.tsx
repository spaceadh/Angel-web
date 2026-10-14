import { getAllPosts, getPost } from "@/lib/blog";
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
  return renderOgImage({
    eyebrow: `Malaika Studios Blog · ${post?.category ?? "Insights"}`,
    title: post?.title ?? "Malaika Studios Blog",
  });
}
