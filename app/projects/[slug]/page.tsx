import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionController from "../../MotionController";
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
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="case-page" style={{ "--case-accent": project.palette } as React.CSSProperties}>
      <MotionController />
      <header className="case-nav">
        <Link className="case-brand" href="/">
          <img src="/brand/malaika-wing-mark.svg" alt="" />
          <span>Malaika Studios<small>by Rotsi</small></span>
        </Link>
        <Link href="/#work">All work</Link>
        <a className="case-nav-cta" href="mailto:hello@malaikastudios.co.ke">Start a project ↗</a>
      </header>

      <section className="case-hero">
        <div className="case-hero-meta reveal">
          <span>{String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <span>{project.kind}</span>
          <span>{project.sector}</span>
        </div>
        <h1 className="case-title">{project.name}</h1>
        <div className="case-intro reveal reveal--3">
          <p>{project.headline}</p>
          <span>{project.intro}</span>
        </div>
        {project.note && <p className="case-disclosure">{project.note}</p>}
      </section>

      <figure className="case-stage" data-scroll-reveal>
        <div className="case-stage-toolbar"><i /><i /><i /><span>{project.slug}.malaikastudios.co.ke</span></div>
        <img src={project.image} alt={`${project.name} project presentation`} />
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
          <img src={project.secondary} alt={`A closer view of the ${project.name} experience`} />
        </figure>
      )}

      <section className="case-outcomes section" data-scroll-reveal>
        <div><p className="eyebrow">What the work proves</p><h2>Design earns its place when it makes the business easier to choose.</h2></div>
        <ul>{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="case-identity" data-scroll-reveal>
        {project.logo ? <img src={project.logo} alt={`${project.name} logo`} /> : <span>{project.name}</span>}
        <p>Identity in context</p>
      </section>

      <section className="case-finish">
        <p>Have a good business that deserves a stronger presence?</p>
        <a href="mailto:hello@malaikastudios.co.ke">Let&apos;s make it<br /><em>impossible to overlook.</em> ↗</a>
        {project.liveUrl && <a className="case-live" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project ↗</a>}
      </section>

      <Link className="case-next" href={`/projects/${next.slug}`}><span>Next project</span><strong>{next.name}</strong><i>→</i></Link>
      <SiteFooter />
    </main>
  );
}
