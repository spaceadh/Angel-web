"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Project } from "../../projects/projectData";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiCalendar, FiMapPin, FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";

type FilterType = "all" | "commissioned" | "products" | "concepts";

const filterSummaries: Record<FilterType, string> = {
  all: "A complete look at the websites, tools, and design experiments we have brought to life.",
  commissioned: "Real client platforms built to solve real-world marketing, sales, and operational bottlenecks.",
  products: "Software products we designed, built, and operate ourselves to run business workflows.",
  concepts: "Redesign concepts we created to demonstrate how we would solve clarity and customer flow problems.",
};

interface ConnectPageContentProps {
  projects: Project[];
}

export default function ConnectPageContent({ projects }: ConnectPageContentProps) {
  // State for project filtering
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  // State for inline project details expansion
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  // State for intro video modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Filter projects based on kind
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "commissioned") return project.kind === "Commissioned work";
    if (activeFilter === "products") return project.kind === "Rotsi product";
    if (activeFilter === "concepts") return project.kind === "Studio concept";
    return true;
  });

  const toggleExpand = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  const beliefs = [
    {
      num: "01",
      title: "Conversion > Vanity",
      desc: "A gorgeous website is useless if visitors leave without taking action. We design clear, high-contrast pathways that lead directly to your calendar, phone, or WhatsApp."
    },
    {
      num: "02",
      title: "Build to Automate",
      desc: "Your website shouldn't create admin work. We connect forms and bookings directly to your tools so leads sync and notify you in real-time."
    },
    {
      num: "03",
      title: "Optimized for the Scan",
      desc: "80% of business card scans happen on a phone. We build mobile-first pages that load in milliseconds and read perfectly on small viewports."
    },
    {
      num: "04",
      title: "AI for Real Workflows",
      desc: "We don't use AI to write generic blog posts. We integrate it into search indexes, automatic follow-ups, and structured stock handling."
    },
    {
      num: "05",
      title: "Speed is a Feature",
      desc: "We ship high-conversion pages in weeks, not months. We focus on launching fast, testing with real users, and iterating based on real metrics."
    }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header section with brand mark */}
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>
            <Image src="/brand/malaika-wing-mark-reverse.svg" alt="Malaika Studios Wing" width={22} height={22} />
          </span>
          <span className={styles.brandName}>
            Malaika Studios
            <small>by Rotsi</small>
          </span>
        </Link>
      </header>

      {/* Hero section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Hi, I&apos;m <em>Alvin.</em>
        </h1>
        <p className={styles.heroSubtitle}>Founder, Malaika Studios</p>
        <p className={styles.heroBio}>
          I help growing businesses turn website visitors into real inquiries and automated workflows.
          At Malaika Studios, we focus on clear design and systems that save you time and convert attention.
        </p>

        <div className={styles.ctaContainer}>
          <a href="#connect" className={styles.primaryButton}>
            Book a Call
          </a>
          <a href="#portfolio" className={styles.secondaryButton}>
            View Portfolio
          </a>
        </div>
      </section>

      {/* Video introduction (Modal trigger) */}
      <section className={styles.videoSection}>
        <div className={styles.videoPlaceholder} onClick={() => setIsVideoOpen(true)}>
          <div className={styles.videoOverlay}>
            <div className={styles.playButton} aria-label="Play video">
              <svg width="16" height="20" viewBox="0 0 16 20">
                <path d="M0 0 L16 10 L0 20 Z" />
              </svg>
            </div>
            <h3 className={styles.videoTitle}>45-Second Introduction</h3>
            <p className={styles.videoSubtitle}>How we build for conversion & growth</p>
          </div>
        </div>

        {isVideoOpen && (
          <div className={styles.videoModal} onClick={() => setIsVideoOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setIsVideoOpen(false)} aria-label="Close video">
                ✕
              </button>
              <video
                src="/video/intro.mp4"
                poster="/work/somafix-landing.png"
                controls
                autoPlay
                className={styles.videoElement}
              />
            </div>
          </div>
        )}
      </section>

      {/* What we build */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Services</p>
          <h2 className={styles.sectionTitle}>What we build</h2>
        </div>
        <div className={styles.servicesList}>
          <div className={styles.serviceItem}>
            <h3 className={styles.serviceTitle}>Websites</h3>
            <p className={styles.serviceDesc}>
              Fast, responsive, conversion-focused websites that explain your offer clearly and guide visitors to take action.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h3 className={styles.serviceTitle}>Business Automation</h3>
            <p className={styles.serviceDesc}>
              Standardizing manual work and connecting customer tools to save your business hours every day.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h3 className={styles.serviceTitle}>AI Solutions</h3>
            <p className={styles.serviceDesc}>
              Integrating custom intelligence and automated features to speed up your internal workflows.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <h3 className={styles.serviceTitle}>SEO & Digital Growth</h3>
            <p className={styles.serviceDesc}>
              Structuring content and site code so your target customers find you on search engines without paid ads.
            </p>
          </div>
        </div>
      </section>

      {/* Projects section with custom interactive filtering and inline expanding */}
      <section className={styles.section} id="portfolio">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Portfolio</p>
          <h2 className={styles.sectionTitle}>Featured work</h2>
        </div>

        {/* Filter engine tabs */}
        <div className={styles.filterContainer}>
          <div className={styles.filterTabs}>
            {(["all", "commissioned", "products", "concepts"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                className={`${styles.filterTab} ${activeFilter === filter ? styles.filterTabActive : ""}`}
                onClick={() => {
                  setActiveFilter(filter);
                  setExpandedSlug(null); // Collapse any open project when switching tabs
                }}
              >
                {filter === "all" ? "All" : filter === "commissioned" ? "Client" : filter === "products" ? "Products" : "Concepts"}
              </button>
            ))}
          </div>
          <p className={styles.filterSummary}>{filterSummaries[activeFilter]}</p>
        </div>

        {/* Dynamic Project List */}
        <div className={styles.projectList}>
          {filteredProjects.map((project) => {
            const isExpanded = expandedSlug === project.slug;
            return (
              <div
                key={project.slug}
                className={`${styles.projectCard} ${isExpanded ? styles.projectCardExpanded : ""}`}
              >
                {/* Header info (Tap to expand/collapse) */}
                <div className={styles.projectHeaderInteractive} onClick={() => toggleExpand(project.slug)}>
                  <div className={styles.projectHeaderThumb}>
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={60}
                      height={45}
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                  <div className={styles.projectHeaderDetails}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <span className={styles.projectSector}>{project.sector.split(" · ")[0]}</span>
                  </div>
                  <div className={styles.expandIcon}>
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>

                {/* Inline Expansion Area */}
                {isExpanded && (
                  <div className={styles.projectExpandContent}>
                    <div className={styles.projectExpandImageWrap}>
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(max-width: 480px) 100vw, 480px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.projectExpandBody}>
                      <p className={styles.projectHeadline}>&ldquo;{project.headline}&rdquo;</p>
                      
                      <div className={styles.expandSection}>
                        <h4 className={styles.expandSectionTitle}>The Challenge</h4>
                        <p className={styles.expandSectionText}>{project.challenge}</p>
                      </div>

                      <div className={styles.expandSection}>
                        <h4 className={styles.expandSectionTitle}>Our Approach</h4>
                        <ul className={styles.expandList}>
                          {project.approach.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.expandSection}>
                        <h4 className={styles.expandSectionTitle}>Recorded Outcomes</h4>
                        <ul className={styles.expandList}>
                          {project.outcomes.map((item, idx) => (
                            <li key={idx} className={styles.outcomeHighlight}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Call to action links */}
                      <div className={styles.projectLinkContainer}>
                        <Link href={`/projects/${project.slug}`} className={styles.caseStudyLink}>
                          View Full Case Study
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.liveSiteLink}
                          >
                            Visit Website <FiExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Why businesses work with us (Redesigned Editorial Style) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Why Us</p>
          <h2 className={styles.sectionTitle}>Why work with us</h2>
        </div>
        <div className={styles.beliefsList}>
          {beliefs.map((belief) => (
            <div key={belief.num} className={styles.beliefCard}>
              <span className={styles.beliefNum}>{belief.num}</span>
              <div className={styles.beliefContent}>
                <h3 className={styles.beliefTitle}>{belief.title}</h3>
                <p className={styles.beliefDesc}>{belief.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Let's connect section */}
      <section className={styles.section} id="connect">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Next Step</p>
          <h2 className={styles.sectionTitle}>Let&apos;s connect</h2>
        </div>
        <div className={styles.connectGrid}>
          {/* Quick social connect row */}
          <div className={styles.socialRow}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/254722000000"
              target="_blank"
              rel="noreferrer"
              className={styles.connectButton}
            >
              <FaWhatsapp className={styles.connectIcon} />
              <span className={styles.connectLabel}>WhatsApp</span>
              <span className={styles.connectAction}>Chat</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/malaika.studios"
              target="_blank"
              rel="noreferrer"
              className={styles.connectButton}
            >
              <FaInstagram className={styles.connectIcon} />
              <span className={styles.connectLabel}>Instagram</span>
              <span className={styles.connectAction}>Follow</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/alvin-dots"
              target="_blank"
              rel="noreferrer"
              className={styles.connectButton}
            >
              <FaLinkedinIn className={styles.connectIcon} />
              <span className={styles.connectLabel}>LinkedIn</span>
              <span className={styles.connectAction}>Connect</span>
            </a>
          </div>

          {/* Book a Call */}
          <a
            href="https://calendly.com/malaikastudios"
            target="_blank"
            rel="noreferrer"
            className={`${styles.connectButton} ${styles.connectFullWidth}`}
          >
            <FiCalendar className={styles.connectIcon} />
            <span className={styles.connectLabel}>Book a Call</span>
            <span className={styles.connectAction}>Select date & time</span>
          </a>

          {/* Email */}
          <a
            href="mailto:business@rotsi.co.ke"
            className={`${styles.connectButton} ${styles.connectFullWidth}`}
          >
            <FiMail className={styles.connectIcon} />
            <span className={styles.connectLabel}>Email Us</span>
            <span className={styles.connectAction}>business@rotsi.co.ke</span>
          </a>
        </div>
      </section>

      {/* Redesigned Location & Footer - bypassing the global layout bug using div with contentinfo role */}
      <div className={styles.footerContainer} role="contentinfo">
        <div className={styles.locationCard}>
          <div className={styles.locationIcon}>
            <FiMapPin />
          </div>
          <div className={styles.locationDetails}>
            <span className={styles.locationTitle}>Malaika Studios</span>
            <p className={styles.locationAddress}>Afya Mansionettes, Kilimani, Nairobi</p>
            <a
              href="https://maps.google.com/?q=Afya+Mansionettes+Kilimani+Nairobi"
              target="_blank"
              rel="noreferrer"
              className={styles.directionsLink}
            >
              Get Directions ↗
            </a>
          </div>
        </div>
        <p className={styles.copyright}>
          © 2026 Malaika Studios. All rights reserved.
        </p>
      </div>
    </div>
  );
}
