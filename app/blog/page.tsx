import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { getAllPosts } from "@/lib/blog";

// Re-check every 15 minutes so scheduled posts appear at their publish time.
export const revalidate = 900;

export const metadata: Metadata = {
  title: "Blog — Websites, Branding & Digital Growth in Kenya",
  description:
    "Practical guides from Malaika Studios on website costs, branding, SEO, WhatsApp automation and digital marketing for businesses in Nairobi and across Kenya.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function Page() {
  return <BlogIndex posts={getAllPosts()} />;
}
