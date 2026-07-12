import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/JsonLd";
import MotionController from "../../MotionController";
import { absoluteUrl, breadcrumbJsonLd, siteUrl } from "../../seoConfig";
import SiteFooter from "../../SiteFooter";
import { getProject, projects } from "../projectData";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.kind} | Malaika Studios`,
    description: project.intro,
    alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) },
    openGraph: {
      title: `${project.name} — ${project.kind} | Malaika Studios`,
      description: project.intro,
      url: absoluteUrl(`/projects/${project.slug}`),
      images: project.image.startsWith("http") ? [project.image] : [absoluteUrl(project.image)],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="case-page" style={{ "--case-accent": project.palette } as React.CSSProperties}>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Work", path: "/#work" },
        { name: project.name, path: `/projects/${project.slug}` },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${siteUrl}/projects/${project.slug}#work`,
        name: project.name,
        description: project.intro,
        creator: { "@id": `${siteUrl}/#organization` },
        about: project.sector,
        url: absoluteUrl(`/projects/${project.slug}`),
        image: project.image.startsWith("http") ? project.image : absoluteUrl(project.image),
      }} />
      <MotionController />
      <header className="case-nav">
        <Link className="case-brand" href="/">
          <Image src="/brand/malaika-wing-mark.svg" alt="" width={42} height={42} />
          <span>Malaika Studios<small>by Rotsi</small></span>
        </Link>
        <Link href="/#work">All work</Link>
        <a className="case-nav-cta" href="mailto:business@rotsi.co.ke">Start a project ↗</a>
      </header>

      <section className="case-hero">
        <div className="case-hero-meta reveal">
          <span>{String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <span>{project.kind}</span>
          <span>{project.sector}</span>
        </div>
        <h1 className={`case-title ${project.name.length > 12 ? "case-title--long" : ""}`}>{project.name}</h1>
        <div className="case-intro reveal reveal--3">
          <p>{project.headline}</p>
          <span>{project.intro}</span>
        </div>
        {project.note && <p className="case-disclosure">{project.note}</p>}
      </section>

      <figure className="case-stage" data-scroll-reveal>
        <div className="case-stage-toolbar"><i /><i /><i /><span>{project.slug}.malaikastudios.co.ke</span></div>
        <Image
          src={project.image}
          alt={`${project.name} project presentation`}
          width={1800}
          height={1125}
          sizes="100vw"
          unoptimized={project.image.startsWith("http")}
        />
      </figure>

      <section className="case-problem section" data-scroll-reveal>
        <p className="eyebrow">The opportunity</p>
        <h2>{project.challenge}</h2>
      </section>

      <section className="case-system" data-scroll-reveal>
        <div className="case-system-intro">
          <p className="eyebrow eyebrow--light">What we shaped</p>
          <h2>Not decoration.<br /><em>A customer journey.</em></h2>
        </div>
        <ol>
          {project.approach.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
        </ol>
      </section>

      {project.secondary && (
        <figure className="case-detail" data-scroll-reveal>
          <Image
            src={project.secondary}
            alt={`A closer view of the ${project.name} experience`}
            width={1600}
            height={1000}
            sizes="100vw"
          />
        </figure>
      )}

      <section className="case-outcomes section" data-scroll-reveal>
        <div><p className="eyebrow">What the work proves</p><h2>Design earns its place when it makes the business easier to choose.</h2></div>
        <ul>{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="case-identity" data-scroll-reveal>
        {project.logo ? <Image src={project.logo} alt={`${project.name} logo`} width={540} height={160} /> : <span>{project.name}</span>}
        <p>Identity in context</p>
      </section>

      <section className="case-finish">
        <p>Have a good business that deserves a stronger presence?</p>
        <a href="mailto:business@rotsi.co.ke">Let&apos;s make it<br /><em>impossible to overlook.</em> ↗</a>
        {project.liveUrl && <a className="case-live" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project ↗</a>}
      </section>

      <Link className="case-next" href={`/projects/${next.slug}`}><span>Next project</span><strong>{next.name}</strong><i>→</i></Link>
      <SiteFooter />
    </main>
  );
}
