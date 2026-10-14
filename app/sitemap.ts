import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const routes = [
    "/",
    "/what-we-do",
    "/what-we-do/why-malaika",
    "/match",
    "/pricing",
    "/our-work",
    "/contact",
    "/blog",
    ...services.map(({ slug }) => `/services/${slug}`),
    ...caseStudies.map(({ slug }) => `/our-work/work/${slug}`),
  ];

  // Static pages omit lastmod: a date that changes on every deploy teaches
  // search engines to ignore it. Blog posts carry their real publish/update date.
  return [
    ...routes.map((path) => ({
      url: absoluteUrl(path),
      priority: path === "/" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated ?? post.date,
      priority: 0.6,
    })),
  ];
}
