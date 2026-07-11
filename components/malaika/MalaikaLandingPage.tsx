"use client";

/* eslint-disable @next/next/no-img-element -- Local portfolio screenshots live in public/work for this standalone site. */

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MalaikaLandingPage.module.css";

const cx = (...names: Array<string | false | undefined>) =>
  names.filter(Boolean).join(" ");

const work = [
  {
    image: "/work/somafix-landing.png",
    label: "Somafix",
    title: "A clearer website for an education service.",
    copy: "The page helps parents, learners, and partners understand the offer faster and know what to do next.",
    proof: ["Education support", "Clearer parent journey", "Contact-first page flow"],
    tags: ["Attention", "Trust flow"],
  },
  {
    image: "/work/bewama-landing.png",
    label: "Bewama",
    title: "A product website built to support quote requests.",
    copy: "The experience makes products easier to browse, understand, compare, and turn into a business inquiry.",
    proof: ["Product catalogue", "Easier comparison", "Quote request path"],
    tags: ["Interest", "Inquiry flow"],
  },
  {
    image: "/work/bewama-quote.png",
    label: "Bewama quote flow",
    title: "A simpler path from product interest to conversation.",
    copy: "The quote flow gives interested buyers a clear next step instead of leaving them to figure it out alone.",
    proof: ["Buyer intent", "Guided form flow", "Sales conversation starter"],
    tags: ["Desire", "Conversion"],
  },
];

const heroProjects = [
  {
    image: "/work/somafix-landing.png",
    label: "Somafix",
    outcome: "Clearer service structure",
  },
  {
    image: "/work/bewama-landing.png",
    label: "Bewama",
    outcome: "Easier product discovery",
  },
  {
    image: "/work/neighbourhood-hero.png",
    label: "Neighbourhood Cocktails",
    outcome: "Stronger brand presence",
  },
  {
    image: "/work/rotsi-hero.png",
    label: "Rotsi",
    outcome: "A clearer systems story",
  },
];

const magnet = [
  ["01", "Attract", "Help the right customers find you and quickly understand what your business offers."],
  ["02", "Convert", "Turn website visits into inquiries, bookings, consultations, purchases, or store visits."],
  ["03", "Retain", "Support better follow-up so interested customers do not disappear after the first contact."],
];

const methods = [
  ["Observe", "We look at what customers see first, where they lose trust, and what is unclear."],
  ["Clarify", "We make the offer, services, proof, and page structure easier to understand."],
  ["Design", "We create a modern website experience that makes the business look credible and easy to choose."],
  ["Convert", "We make the next step clear, whether that is WhatsApp, a form, a booking, a call, or a consultation."],
];

const services = [
  ["Website design and revamps", "Modern websites that explain the business clearly and make it easier for customers to take action."],
  ["Digital presence audits", "A practical review of what is confusing, outdated, weak, or missing across your website and online presence."],
  ["Brand and content direction", "Clearer messaging, service structure, page sections, and content flow for the people you want to attract."],
  ["Landing pages and inquiry flows", "Focused pages and contact paths for campaigns, consultations, bookings, product interest, or quote requests."],
];

const auditOptions = [
  {
    id: "trust",
    label: "Trust",
    question: "Customers need to trust you faster.",
    result:
      "Start with a homepage refresh, stronger proof, clearer service explanation, and a visible contact path.",
  },
  {
    id: "inquiries",
    label: "Inquiries",
    question: "People visit, but they do not take action.",
    result:
      "Build a focused landing page with clearer offers, stronger calls to action, WhatsApp or form flow, and follow-up readiness.",
  },
  {
    id: "scattered",
    label: "Presence",
    question: "The business feels scattered across website and socials.",
    result:
      "Run a digital presence audit, align the message, and create a simple customer journey across the website and social channels.",
  },
];

function ArrowLink({
  children,
  href = "#inquiry",
  dark = false,
}: {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
}) {
  return (
    <a className={cx(styles.arrowLink, dark && styles.arrowLinkDark)} href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function WingMark() {
  return (
    <svg className={styles.wingMark} viewBox="80 40 820 820" aria-hidden="true" focusable="false">
      <path className={styles.wingShape} d="M 122.68 68.3349 C 125.531 69.7839 128.595 74.1059 130.716 76.609 C 222.579 185.043 343.858 263.709 463.946 337.322 C 486.484 351.956 508.581 366.162 531.733 379.879 C 601.995 420.876 673.867 460.378 739.376 508.822 C 755.968 521.091 772.872 538.117 786.683 553.27 C 813.204 582.371 834.998 615.518 846.425 653.508 C 857.093 688.974 855.057 724.318 852.994 760.666 C 852.604 760.721 850.724 760.526 850.686 760.328 C 847.238 746.023 843.459 731.397 839.19 717.368 C 801.517 593.537 675.081 545.814 566.738 500.678 C 499.533 472.681 429.873 445.803 365.413 411.618 C 343.343 399.914 320.645 388.932 300.006 374.613 C 196.488 302.352 118.551 200.6 122.68 68.3349 z" />
      <path className={styles.wingShape} d="M 217.838 396.147 C 226.982 398.988 273.474 432.628 288.386 441.036 C 329.447 464.127 372.138 484.189 416.121 501.063 C 455.886 515.886 495.769 530.389 535.768 544.569 C 605.599 569.651 671.07 593.938 731.912 638.285 C 784.398 676.541 819.66 742.049 828.92 806.175 C 824.372 802.841 815.487 778.824 811.792 772.316 C 724.075 617.829 521.435 658.084 382.307 587.86 C 302.657 547.657 246.027 479.79 217.838 396.147 z" />
      <path className={styles.wingSignal} d="M 430.692 672.391 C 438.944 672.552 460.917 682.574 469.967 685.535 C 527.689 704.417 590.284 710.224 650.016 718.323 C 694.908 724.409 741.162 747.765 771.58 780.889 C 775.427 785.078 776.95 786.589 776.632 792.264 C 762.759 786.248 749.822 778.461 734.694 775.727 C 714.255 772.034 689.604 771.453 669.038 772.506 C 615.859 775.226 564.32 777.589 515.173 752.472 C 484.796 736.947 463.053 719.484 442.803 691.983 C 438.522 686.17 432.934 679.248 430.692 672.391 z" />
    </svg>
  );
}

function Brand() {
  return (
    <a className={styles.brand} href="#" aria-label="Malaika Studios home">
      <span className={styles.brandMark} aria-hidden="true">
        <WingMark />
      </span>
      <span>
        <strong>Malaika Studios</strong>
        <small>by Rotsi</small>
      </span>
    </a>
  );
}

export default function MalaikaLandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedAudit, setSelectedAudit] = useState(auditOptions[0].id);
  const [activeHeroProject, setActiveHeroProject] = useState(0);
  const activeAudit = useMemo(
    () => auditOptions.find((item) => item.id === selectedAudit) ?? auditOptions[0],
    [selectedAudit],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const rotation = window.setInterval(() => {
      const hero = rootRef.current?.querySelector<HTMLElement>("[data-hero]");
      if (!hero || window.scrollY > 24 || hero.getBoundingClientRect().top < -24) return;
      setActiveHeroProject((current) => (current + 1) % heroProjects.length);
    }, 4200);

    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.setAttribute("data-visible", "true");
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    revealItems.forEach((node) => observer.observe(node));

    let lastHandledHash = "";

    const revealHashTarget = () => {
      if (!window.location.hash) return;
      const target = root.querySelector<HTMLElement>(window.location.hash);
      if (!target) return;
      lastHandledHash = window.location.hash;
      target.setAttribute("data-visible", "true");
      target
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((node) => node.setAttribute("data-visible", "true"));
      const scrollToTarget = () => {
        const headerOffset = window.innerWidth <= 760 ? 76 : 92;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      };
      window.requestAnimationFrame(scrollToTarget);
      window.setTimeout(scrollToTarget, 80);
      window.setTimeout(scrollToTarget, 280);
    };

    const watchHash = () => {
      if (window.location.hash && window.location.hash !== lastHandledHash) revealHashTarget();
    };

    const parallaxItems = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const renderScrollMotion = () => {
      frame = 0;
      if (reducedMotion.matches) return;

      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const rate = Number(item.dataset.parallax ?? 0);
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * rate;
        const image = item.querySelector<HTMLElement>("[data-parallax-image]");
        if (image) image.style.transform = `translate3d(0, ${-6 + offset * 0.035}%, 0) scale(1.04)`;
        else item.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(renderScrollMotion);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    window.addEventListener("hashchange", revealHashTarget);
    reducedMotion.addEventListener("change", requestRender);
    const hashWatcher = window.setInterval(watchHash, 250);
    renderScrollMotion();
    revealHashTarget();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      window.removeEventListener("hashchange", revealHashTarget);
      reducedMotion.removeEventListener("change", requestRender);
      window.clearInterval(hashWatcher);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.page} ref={rootRef}>
      <header className={styles.siteHeader}>
        <Brand />
        <nav aria-label="Primary navigation">
          <a href="#method">Method</a>
          <a href="#work">Work</a>
          <a href="#audit">Audit</a>
          <a href="#inquiry">Start</a>
        </nav>
        <p className={styles.availability}>Creative digital presence for serious businesses</p>
        <a className={styles.headerCta} href="#inquiry">Build presence</a>
      </header>

      <main>
        <section className={styles.hero} data-hero>
          <div className={styles.heroStage} data-hero-stage>
            <div className={styles.gridSignals} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.presenceWrap} data-presence-wrap aria-hidden="true">
              <div className={styles.presenceSystem}>
                <div className={styles.browserPane}>
                  <div className={styles.browserViewport}>
                    {heroProjects.map((project, index) => (
                      <img
                        className={index === activeHeroProject ? styles.activeHeroImage : undefined}
                        key={project.label}
                        src={project.image}
                        alt=""
                      />
                    ))}
                  </div>
                  <p className={styles.projectLabel}>
                    <b>{heroProjects[activeHeroProject].label}</b>
                    <span>{heroProjects[activeHeroProject].outcome}</span>
                  </p>
                </div>
                <div className={styles.presenceCore}>
                  <b>Malaika</b>
                  <small>Attract · Convert · Retain</small>
                </div>
                <div className={styles.signalRail}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <div className={styles.heroCopy} data-hero-copy>
              <p className={styles.eyebrow}>Malaika Studios by Rotsi</p>
              <h1>Malaika Studios</h1>
              <p>We design websites and digital presence systems that make good businesses easier to trust, understand, and contact.</p>
              <div className={styles.heroActions}>
                <ArrowLink>Start a website conversation</ArrowLink>
                <a href="#work">See selected work</a>
              </div>
            </div>

            <p className={styles.heroIntro} data-hero-intro>
              <span>Client magnet studio</span>
              <b>Attract · Convert · Retain</b>
            </p>
            <span className={styles.heroDivider} aria-hidden="true" />
            <div className={styles.scrollCue} data-scroll-cue>
              <span>Scroll to explore</span>
              <b aria-hidden="true" />
              <i aria-hidden="true">Client magnet ↓</i>
            </div>
          </div>
        </section>

        <section className={cx(styles.presence, styles.sectionPad)}>
          <div className={cx(styles.sectionTitle, styles.reveal)} data-reveal>
            <div className={styles.sectionKicker}>
              <p className={styles.eyebrow}>Why presence matters</p>
              <span>Attention</span>
              <small>Your website is often the first proof that your business is serious.</small>
            </div>
            <h2>Before people call, book, buy, or visit, they look for reasons to trust you.</h2>
          </div>
          <div className={styles.presenceGrid}>
            <span className={styles.sectionDivider} aria-hidden="true" />
            <div className={cx(styles.proofFrame, styles.reveal)} data-reveal data-parallax="0.1">
              <img
                data-parallax-image
                src="/work/structure-corridor.jpg"
                alt="A structured colonnade leading clearly toward a bright archway"
              />
              <a
                className={styles.proofCredit}
                href="https://unsplash.com/photos/a-long-hallway-with-columns-and-a-clock-on-the-wall-kVIS422nKc4"
                rel="noreferrer"
                target="_blank"
              >
                Photo: Bernd Dittrich / Unsplash
              </a>
              <p>Clear structure makes a business easier to understand and easier to trust.</p>
            </div>
            <div className={cx(styles.presenceCopy, styles.reveal)} data-reveal>
              <p>
                Malaika Studios improves the parts of your business customers see first: your website, message, service pages, proof, customer journey, and contact flow.
              </p>
              <p>
                The goal is simple: help people quickly understand what you do, why they should trust you, and how to reach you.
              </p>
            </div>
          </div>
        </section>

        <section className={cx(styles.magnet, styles.sectionPad)}>
          <div className={cx(styles.sectionTitle, styles.reveal)} data-reveal>
            <div className={styles.sectionKicker}>
              <p className={styles.eyebrow}>Client magnet studio</p>
              <span>Interest</span>
              <small>A clear website should move people from interest to contact.</small>
            </div>
            <h2>Your online presence should help customers move through three steps.</h2>
          </div>
          <div className={styles.magnetGrid}>
            {magnet.map(([number, title, copy]) => (
              <article className={cx(styles.magnetItem, styles.reveal)} data-reveal key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={cx(styles.services, styles.sectionPad)}>
          <div className={cx(styles.sectionTitle, styles.reveal)} data-reveal>
            <div className={styles.sectionKicker}>
              <p className={styles.eyebrow}>What we do</p>
              <span>Clarity</span>
              <small>Clear services help customers understand exactly how we can help.</small>
            </div>
            <h2>Websites, audits, content structure, and inquiry paths for businesses ready to look sharper online.</h2>
          </div>
          <div className={styles.serviceGrid}>
            {services.map(([title, copy]) => (
              <article className={cx(styles.serviceItem, styles.reveal)} data-reveal key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="method" className={cx(styles.method, styles.sectionPad)}>
          <div className={cx(styles.methodCopy, styles.reveal)} data-reveal>
            <p className={cx(styles.eyebrow, styles.light)}>The Malaika Method</p>
            <h2>First they notice you. Then they understand you. Then they act.</h2>
            <p>
              The Malaika Method turns a scattered online presence into a clearer customer journey: get attention, build interest, create trust, and make the next step easy.
            </p>
            <ArrowLink dark>Plan my client magnet</ArrowLink>
          </div>
          <div className={styles.methodList}>
            {methods.map(([title, copy], index) => (
              <article className={cx(styles.methodStep, styles.reveal)} data-reveal key={title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className={cx(styles.work, styles.sectionPad)}>
          <div className={cx(styles.sectionTitle, styles.reveal)} data-reveal>
            <div className={styles.sectionKicker}>
              <p className={styles.eyebrow}>Selected work</p>
              <span>Desire</span>
              <small>Proof should show how the website helps customers move.</small>
            </div>
            <h2>Selected work showing clearer websites, stronger journeys, and better inquiry paths.</h2>
          </div>
          <div className={styles.workGrid}>
            {work.map((item, index) => (
              <article className={cx(styles.workItem, styles.reveal)} data-reveal key={item.label} style={{ "--card-index": index } as React.CSSProperties}>
                <div className={styles.workImage}>
                  <img src={item.image} alt={`${item.label} website screenshot`} />
                  <span className={styles.workHover} aria-hidden="true">
                    View project
                  </span>
                </div>
                <div className={styles.workMeta}>
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <ul className={styles.workFacts} aria-label={`${item.label} project details`}>
                    {item.proof.map((fact) => <li key={fact}>{fact}</li>)}
                  </ul>
                  <div>
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="audit" className={cx(styles.audit, styles.sectionPad)}>
          <div className={cx(styles.auditIntro, styles.reveal)} data-reveal>
            <p className={styles.eyebrow}>Quick diagnosis</p>
            <h2>What should your online presence fix first?</h2>
          </div>
          <div className={cx(styles.auditPanel, styles.reveal)} data-reveal>
            <div className={styles.auditChoices} role="tablist" aria-label="Presence diagnosis options">
              {auditOptions.map((option) => (
                <button
                  aria-selected={selectedAudit === option.id}
                  className={selectedAudit === option.id ? styles.activeAudit : undefined}
                  key={option.id}
                  onClick={() => setSelectedAudit(option.id)}
                  role="tab"
                  type="button"
                >
                  <span>{option.label}</span>
                  <small>{option.question}</small>
                </button>
              ))}
            </div>
            <div className={styles.auditResult} role="tabpanel">
              <p>{activeAudit.result}</p>
              <ArrowLink>Talk through this</ArrowLink>
            </div>
          </div>
        </section>

        <section id="inquiry" className={styles.inquiry}>
          <div className={cx(styles.inquiryInner, styles.reveal)} data-reveal>
            <p className={styles.eyebrow}>Next step</p>
            <h2>Bring the real quality of your business online.</h2>
            <p>
              Start with a website conversation, a digital presence audit, or a Client Magnet System for your business.
            </p>
            <div className={styles.inquiryActions}>
              <a href="#audit">Start with a quick diagnosis</a>
              <a href="#work">Review selected work</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Brand />
        <p>Malaika Studios by Rotsi. Creative digital presence for modern businesses.</p>
      </footer>
    </div>
  );
}
