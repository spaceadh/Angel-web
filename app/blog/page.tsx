import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { getAllPosts } from "@/lib/blog";

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
