import MotionController from "./MotionController";

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <span aria-hidden="true" className="arrow">
    {diagonal ? "↗" : "→"}
  </span>
);

const projects = [
  {
    number: "01",
    title: "Kairi Tours",
    category: "Travel / Web experience",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=88",
    alt: "A wooden boat moving through emerald water between limestone cliffs",
    className: "project project--wide",
    caption: "Turning years of travel expertise into a destination worth exploring.",
  },
  {
    number: "02",
    title: "Bewama",
    category: "Commerce / Product design",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=88",
    alt: "Construction professionals working on a modern building site",
    className: "project project--tall",
    caption: "A clearer way to source construction materials across Kenya.",
  },
  {
    number: "03",
    title: "Roja Consultancy",
    category: "Insurance / Brand system",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88",
    alt: "A desk with a contract, pen, and calculator in soft daylight",
    className: "project project--standard",
    caption: "Making insurance feel simpler, warmer, and easier to trust.",
  },
];

export default function Home() {
  return (
    <main>
      <MotionController />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Malaika Studios home">
          <span className="brand-mark">M</span>
          <span className="brand-name">
            Malaika
            <br />
            Studios
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#services">What we do</a>
          <a href="#studio">Studio</a>
        </nav>

        <a className="header-cta" href="mailto:hello@malaikastudios.co.ke">
          Start a project <Arrow diagonal />
        </a>

        <details className="menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#work">Work</a>
            <a href="#services">What we do</a>
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
            We shape brands, websites, and digital experiences that help good
            businesses look clear, feel credible, and grow.
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
              href="#contact"
              key={project.title}
            >
              <figure className="project-image-wrap">
                <img src={project.image} alt={project.alt} className="project-image" />
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
      </section>

      <section className="statement" aria-label="Our point of view" data-scroll-reveal>
        <p className="eyebrow eyebrow--light">Our point of view</p>
        <p className="statement-copy">
          Your website should not just exist.
          <br />
          It should <em>move the business forward.</em>
        </p>
        <div className="statement-stamp" aria-hidden="true">
          <span>M</span>
          <small>Est. Nairobi</small>
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

      <footer>
        <a className="brand brand--footer" href="#top" aria-label="Back to top">
          <span className="brand-mark">M</span>
          <span className="brand-name">Malaika Studios</span>
        </a>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#studio">Studio</a>
        </div>
        <p>© 2026 Malaika Studios. Made in Nairobi.</p>
      </footer>
    </main>
  );
}