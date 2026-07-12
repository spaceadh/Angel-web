import type { MetadataRoute } from "next";
import { projects } from "./projects/projectData";
import { absoluteUrl } from "./seoConfig";
import { services } from "./services/serviceData";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/services", "/pricing"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  const projectRoutes = projects.map((project) => `/projects/${project.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/services") || path === "/pricing" ? 0.85 : 0.65,
  }));
}

