import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog/blog-post";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <BlogPost post={post} related={getRelatedPosts(post)} />;
}
