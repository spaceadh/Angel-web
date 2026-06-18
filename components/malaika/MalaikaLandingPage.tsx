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

function Brand() {
  return (
    <a className={styles.brand} href="#" aria-label="Malaika Studios home">
      <span className={styles.brandMark} aria-hidden="true">M</span>
      <span>
        <strong>Malaika Studios</strong>
        <small>by Rotsi</small>
      </span>
    </a>
  );
}

export default function MalaikaLandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [selectedAudit, setSelectedAudit] = useState(auditOptions[0].id);
  const [activeHeroProject, setActiveHeroProject] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const activeAudit = useMemo(
    () => auditOptions.find((item) => item.id === selectedAudit) ?? auditOptions[0],
    [selectedAudit],
  );

  useEffect(() => {
    setDarkMode(window.localStorage.getItem("malaika-theme") === "dark");
  }, []);

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

  const toggleTheme = () => {
    setDarkMode((current) => {
      const next = !current;
      window.localStorage.setItem("malaika-theme", next ? "dark" : "light");
      return next;
    });
  };

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

    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const presenceWrap = root.querySelector<HTMLElement>("[data-presence-wrap]");
    const heroCopy = root.querySelector<HTMLElement>("[data-hero-copy]");
    const heroIntro = root.querySelector<HTMLElement>("[data-hero-intro]");
    const heroStage = root.querySelector<HTMLElement>("[data-hero-stage]");
    const scrollCue = root.querySelector<HTMLElement>("[data-scroll-cue]");
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const parallaxItems = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let cursorFrame = 0;

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

    const renderScrollMotion = () => {
      frame = 0;
      if (!hero || !heroStage || !presenceWrap || !heroCopy || !heroIntro || !scrollCue || reducedMotion.matches) return;

      const mobile = window.innerWidth <= 760;
      const heroRect = hero.getBoundingClientRect();
      const heroTravel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-heroRect.top / heroTravel);
      const introProgress = clamp((progress - 0.12) / 0.26);

      if (mobile) {
        presenceWrap.style.transform = `translate3d(${lerp(0, window.innerWidth * 0.38, progress)}px, ${lerp(0, -74, progress)}px, 0) scale(${lerp(1, 0.78, progress)})`;
        heroCopy.style.transform = `translate3d(${lerp(0, -window.innerWidth * 0.72, progress)}px, ${lerp(0, 42, progress)}px, 0)`;
      } else {
        presenceWrap.style.transform = `translate3d(${lerp(0, window.innerWidth * 0.38, progress)}px, ${lerp(0, 24, progress)}px, 0) scale(${lerp(1, 0.72, progress)})`;
        heroCopy.style.transform = `translate3d(${lerp(0, -window.innerWidth * 0.43, progress)}px, ${lerp(0, 26, progress)}px, 0)`;
      }

      heroCopy.style.opacity = String(lerp(1, mobile ? 0.1 : 0.18, clamp(progress / 0.52)));
      heroIntro.style.opacity = String(introProgress);
      heroIntro.style.transform = `translate3d(${lerp(mobile ? 0 : -58, 0, introProgress)}px, ${lerp(mobile ? 35 : 0, 0, introProgress)}px, 0)`;
      heroStage.style.opacity = String(lerp(1, 0.16, clamp((progress - 0.92) / 0.08)));
      scrollCue.style.opacity = String(1 - clamp(progress * 4));

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

    const renderCursor = (event: MouseEvent) => {
      if (!cursor || !cursorDot || reducedMotion.matches || window.matchMedia("(pointer: coarse)").matches) return;
      if (!cursorFrame) {
        cursorFrame = window.requestAnimationFrame(() => {
          cursorFrame = 0;
          cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
          cursorDot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        });
      }
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    window.addEventListener("mousemove", renderCursor, { passive: true });
    window.addEventListener("hashchange", revealHashTarget);
    reducedMotion.addEventListener("change", requestRender);
    const hashWatcher = window.setInterval(watchHash, 250);
    renderScrollMotion();
    revealHashTarget();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      window.removeEventListener("mousemove", renderCursor);
      window.removeEventListener("hashchange", revealHashTarget);
      reducedMotion.removeEventListener("change", requestRender);
      window.clearInterval(hashWatcher);
      if (frame) window.cancelAnimationFrame(frame);
      if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
    };
  }, []);

  return (
    <div className={styles.page} data-theme={darkMode ? "dark" : "light"} ref={rootRef}>
      <div className={styles.cursor} ref={cursorRef} aria-hidden="true" />
      <div className={styles.cursorDot} ref={cursorDotRef} aria-hidden="true" />
      <header className={styles.siteHeader}>
        <Brand />
        <nav aria-label="Primary navigation">
          <a href="#method">Method</a>
          <a href="#work">Work</a>
          <a href="#audit">Audit</a>
          <a href="#inquiry">Start</a>
        </nav>
        <button
          aria-label={`Switch to ${darkMode ? "light" : "After dark"} mode`}
          aria-pressed={darkMode}
          className={styles.themeToggle}
          onClick={toggleTheme}
          type="button"
        >
          <span>{darkMode ? "After dark" : "Light"}</span>
          <i aria-hidden="true" />
        </button>
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
                  <span className={styles.browserBar} />
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
                  <b>Presence</b>
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
              <p className={styles.eyebrow}>Websites and digital presence for growing businesses</p>
              <h1>Malaika Studios</h1>
              <p>We design websites and digital presence systems that make good businesses easier to trust, understand, and contact.</p>
              <div className={styles.heroActions}>
                <ArrowLink>Start a website conversation</ArrowLink>
                <a href="#work">See selected work</a>
              </div>
            </div>

            <p className={styles.heroIntro} data-hero-intro>
              A client magnet studio for founders whose business is already good, but whose website does not yet show it clearly.
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
                alt="A terracotta colonnade leading clearly toward a bright archway"
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
