import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "../components/JsonLd";
import SiteFooter from "../SiteFooter";
import { absoluteUrl, breadcrumbJsonLd, routeMeta } from "../seoConfig";
import { projects } from "./projectData";

export const metadata: Metadata = {
  title: routeMeta.projects.title,
  description: routeMeta.projects.description,
  alternates: { canonical: absoluteUrl(routeMeta.projects.path) },
  openGraph: {
    title: routeMeta.projects.title,
    description: routeMeta.projects.description,
    url: absoluteUrl(routeMeta.projects.path),
  },
};

// const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
//   <span aria-hidden="true" className="arrow">
//     {diagonal ? "↗" : "→"}
//   </span>
// );

export default function ProjectsPage() {
  return (
    <main className="seo-page malaika-dots">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/projects" }])} />
      <header className="seo-nav">
        <Link className="seo-brand" href="/">Malaika Studios<small>by Rotsi</small></Link>
        <nav aria-label="Projects navigation">
          <Link href="/projects">Work</Link>
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/insights">Insights</Link>
          <a href="/contact">Start a project ↗</a>
        </nav>
      </header>

      <section className="seo-hero seo-hero--split seo-hero--compact">
        <p className="malaika-label">
            <span className="malaika-signature" style={{ width: '24px', height: '2px' }}>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
              <span className="malaika-signature-color"></span>
            </span>
            SELECTED WORK
          </p>
        <div>
          <h1>A few things we&apos;ve brought to life.</h1>
          <p>
            Explore our selected work across website design, client magnet systems, and digital presence audits. We help businesses look as good as they actually are.
          </p>
        </div>
      </section>

      <section className="work section" style={{ paddingTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px", padding: "0 3.25vw 60px" }}>
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              className="malaika-card"
              key={project.slug}
              style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "24px", textDecoration: "none", color: "inherit" }}
            >
              <figure style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", borderRadius: "6px", margin: 0 }}>
                <Image 
                  src={project.image} 
                  alt={project.name} 
                  fill 
                  style={{ objectFit: "cover", transition: "transform 0.3s ease" }} 
                  sizes="(max-width: 760px) 100vw, 33vw" 
                />
              </figure>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>{project.sector}</span>
                  <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 600, fontFamily: "var(--sans)", letterSpacing: "-0.03em" }}>{project.name}</h3>
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                  {project.headline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <SiteFooter />
    </main>
  );
}
