import Link from "next/link";
import Image from "next/image";
import JsonLd from "./components/JsonLd";
import MotionController from "./MotionController";
import { organizationJsonLd, websiteJsonLd } from "./seoConfig";
import SiteFooter from "./SiteFooter";

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <span aria-hidden="true" className="arrow">
    {diagonal ? "↗" : "→"}
  </span>
);

const projects = [
  {
    number: "01",
    title: "Somafix Kenya",
    category: "Website / Product clarity",
    image: "/work/somafix-landing.png",
    alt: "Somafix Kenya website homepage",
    className: "project project--wide",
    caption: "A technical product business made clearer, more credible, and ready to be found.",
    href: "/projects/somafix-kenya",
  },
  {
    number: "02",
    title: "Bewama",
    category: "Commerce / Product design",
    image: "/work/bewama-landing.png",
    alt: "Bewama B2B ecommerce homepage",
    className: "project project--tall",
    caption: "A clearer way to source construction materials across Kenya.",
    href: "/projects/bewama",
  },
  {
    number: "03",
    title: "Kumbusha",
    category: "Product / Culture workflows",
    image: "/work/projects/kumbusha/landing-page.png",
    alt: "Kumbusha employee milestone product",
    className: "project project--standard",
    caption: "Turning thoughtful employee moments into a workflow managers can act on.",
    href: "/projects/kumbusha",
  },
];

const conceptProjects = [
  { name: "Kairi Tours", label: "Travel website concept", href: "/projects/kairi-tours-concept" },
  { name: "Roja Consultancy", label: "Insurance brand concept", href: "/projects/roja-consultancy-concept" },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <MotionController />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Malaika Studios home">
          <span className="brand-mark">
            <Image src="/brand/malaika-wing-mark-reverse.svg" alt="" width={27} height={27} />
          </span>
          <span className="brand-name">
            Malaika
            <br />
            Studios
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <a href="#studio">Studio</a>
        </nav>

        <a className="header-cta" href="mailto:hello@malaikastudios.co.ke">
          Start a project <Arrow diagonal />
        </a>

        <details className="menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#work">Work</a>
            <Link href="/services">Services</Link>
            <Link href="/pricing">Pricing</Link>
            <a href="#studio">Studio</a>
            <a href="mailto:hello@malaikastudios.co.ke">Start a project ↗</a>
          </nav>
        </details>
      </header>

      <div className="hero-shell" data-hero-shell id="top">
      <section className="hero" data-hero>
        <div className="hero-kicker reveal">
          <span>Independent creative studio</span>
          <span>Nairobi, Kenya · EAT 03:00</span>
        </div>

        <div className="hero-title-wrap">
          <h1 className="hero-title">
            <span className="line hero-line-enter" data-hero-line="one">Made to be</span>
            <span className="line line--offset hero-line-enter hero-line-enter--2" data-hero-line="two">
              <em>noticed.</em>
              <span className="orange-dot" aria-hidden="true" />
            </span>
            <span className="line hero-line-enter hero-line-enter--3" data-hero-line="three">Built to be chosen.</span>
          </h1>
        </div>

        <div className="hero-bottom reveal reveal--3">
          <p>
            Website design, digital presence audits, and client magnet systems
            for growing Kenyan businesses that need to look clear, feel credible, and convert better.
          </p>
          <a className="circle-link" href="#work" aria-label="Explore selected work">
            <span>Explore work</span>
            <Arrow />
          </a>
        </div>
      </section>
      </div>

      <section className="work section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>A few things we&apos;ve brought to life.</h2>
          <span className="section-count">(03)</span>
        </div>

        <div className="project-grid" data-scroll-reveal>
          {projects.map((project, index) => (
            <a
              className={`${project.className} project--motion`}
              data-project-card
              data-project-index={index}
              href={project.href}
              key={project.title}
            >
              <figure className="project-image-wrap">
                <Image src={project.image} alt={project.alt} className="project-image" fill sizes="(max-width: 760px) 100vw, 68vw" />
                <span className="project-open">
                  View <Arrow diagonal />
                </span>
              </figure>
              <div className="project-meta">
                <div>
                  <span>{project.number}</span>
                  <h3>{project.title}</h3>
                </div>
                <p>{project.category}</p>
              </div>
              <p className="project-caption">{project.caption}</p>
            </a>
          ))}
        </div>

        <div className="concepts" data-scroll-reveal>
          <div className="concepts-copy">
            <p className="eyebrow">Studio concepts</p>
            <h3>Ideas we made before anyone asked.</h3>
            <p>Self-initiated redesign studies: honest concept work that shows how we think, without pretending it was commissioned.</p>
          </div>
          <div className="concepts-list">
            {conceptProjects.map((project, index) => (
              <a href={project.href} key={project.name}>
                <span>0{index + 1}</span><strong>{project.name}</strong><small>{project.label}</small><Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-proof" aria-label="Brands and products represented in our work" data-scroll-reveal>
        <p>Brands and products we have helped shape</p>
        <div className="brand-proof-track">
          {[false, true].map((duplicate) => (
            <div className="brand-proof-set" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              <Image src="/work/projects/somafix/logo.png" alt={duplicate ? "" : "Somafix"} width={185} height={60} />
              <Image src="/work/projects/bewama/logo.png" alt={duplicate ? "" : "Bewama"} width={185} height={60} />
              <Image src="/work/projects/kumbusha/logo.png" alt={duplicate ? "" : "Kumbusha"} width={185} height={60} />
              <Image src="/work/projects/tena/logo.png" alt={duplicate ? "" : "Tena CRM"} width={185} height={60} />
              <span>Rotsi</span>
              <span>IBIZA</span>
            </div>
          ))}
        </div>
      </section>

      <section className="acquisition" id="client-magnet" aria-label="The client magnet system" data-scroll-reveal>
        <div className="acquisition-lead">
          <p className="eyebrow eyebrow--light">Our point of view</p>
          <h2>A website should earn its place in your business.</h2>
          <p>It should make you visible, make the value clear, build trust before the first call, and turn attention into a real inquiry.</p>
        </div>
        <div className="magnet-path" aria-label="Attract, convert and retain customer journey">
          <article><span>01</span><strong>Attract</strong><p>Help the right people find you and recognise that you understand their problem.</p></article>
          <article><span>02</span><strong>Convert</strong><p>Give them the clarity, proof and next step they need to choose you.</p></article>
          <article><span>03</span><strong>Retain</strong><p>Connect inquiries to thoughtful follow-up so good opportunities do not disappear.</p></article>
        </div>
        <div className="acquisition-close">
          <p>That is what we mean by a</p>
          <strong>Client magnet.</strong>
          <a href="#contact">Build mine <Arrow diagonal /></a>
        </div>
      </section>

      <section className="services section" id="services" data-scroll-reveal>
        <div className="section-heading section-heading--services">
          <p className="eyebrow">What we do</p>
          <h2>One studio. Three ways to help your business move.</h2>
          <span className="section-count">(Services)</span>
        </div>

        <div className="service-list">
          <article className="service-row">
            <span className="service-number">01</span>
            <h3>Brand identity</h3>
            <p>
              Positioning, visual systems, art direction, and the practical
              pieces that make your brand feel like one clear idea.
            </p>
            <Arrow diagonal />
          </article>
          <article className="service-row">
            <span className="service-number">02</span>
            <h3>Web experiences</h3>
            <p>
              Fast, responsive websites that pair thoughtful design with clear
              journeys and a reason to take the next step.
            </p>
            <Arrow diagonal />
          </article>
          <article className="service-row">
            <span className="service-number">03</span>
            <h3>Digital growth</h3>
            <p>
              Content systems, campaigns, SEO, and automations that turn a good
              digital presence into repeatable momentum.
            </p>
            <Arrow diagonal />
          </article>
        </div>
      </section>

      <section className="method" id="studio" data-scroll-reveal>
        <div className="method-intro">
          <p className="eyebrow eyebrow--light">The Malaika method</p>
          <h2>Less noise. More pull.</h2>
          <p>
            We find the sharpest version of your story, give it a visual world,
            and build the system that carries it into the market.
          </p>
        </div>

        <ol className="method-steps">
          <li>
            <span>01</span>
            <h3>Attract</h3>
            <p>Earn attention with an unmistakable point of view.</p>
          </li>
          <li>
            <span>02</span>
            <h3>Convert</h3>
            <p>Make the value clear and the next step easy.</p>
          </li>
          <li>
            <span>03</span>
            <h3>Retain</h3>
            <p>Build useful systems that keep the relationship moving.</p>
          </li>
        </ol>
      </section>

      <section className="testimonial section" data-scroll-reveal>
        <p className="quote-mark">“</p>
        <blockquote>
          Good design gets attention. Clear thinking turns that attention into
          action.
        </blockquote>
        <p className="quote-source">The standard we bring to every project.</p>
      </section>

      <section className="contact" id="contact">
        <div className="contact-top">
          <p className="eyebrow">Have something in mind?</p>
          <p>Selected projects · Q3 2026</p>
        </div>
        <a className="contact-link" href="mailto:hello@malaikastudios.co.ke">
          <span>Let&apos;s make it</span>
          <span className="contact-link-bottom">
            unforgettable. <Arrow diagonal />
          </span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
