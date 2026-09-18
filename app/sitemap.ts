import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/what-we-do",
    "/what-we-do/why-malaika",
    "/our-work",
    "/contact",
    ...services.map(({ slug }) => `/services/${slug}`),
    ...caseStudies.map(({ slug }) => `/our-work/work/${slug}`),
  ];
  return routes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
