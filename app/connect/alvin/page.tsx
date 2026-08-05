import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import JsonLd from "../../components/JsonLd";
import IntroVideo from "./IntroVideo";
import { absoluteUrl, breadcrumbJsonLd, routeMeta } from "../../seoConfig";
import { projects } from "../../projects/projectData";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiCalendar, FiMapPin } from "react-icons/fi";

export const metadata: Metadata = {
  title: routeMeta.connectAlvin.title,
  description: routeMeta.connectAlvin.description,
  alternates: { canonical: absoluteUrl(routeMeta.connectAlvin.path) },
  openGraph: {
    title: routeMeta.connectAlvin.title,
    description: routeMeta.connectAlvin.description,
    url: absoluteUrl(routeMeta.connectAlvin.path),
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Connect with Alvin | Malaika Studios",
      },
    ],
  },
};

const selectedSlugs = ["somafix-kenya", "bewama", "kumbusha"];

export default function AlvinConnectPage() {
  // Retrieve the selected featured projects in the specified order
  const featuredProjects = selectedSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is typeof projects[number] => p !== undefined);

  // Setup local schema markup for SEO
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/connect/alvin#profile"),
    "mainEntity": {
      "@type": "Person",
      "name": "Alvin",
      "jobTitle": "Founder",
      "worksFor": {
        "@type": "ProfessionalService",
        "name": "Malaika Studios",
        "url": absoluteUrl("/")
      },
      "description": "Founder of Malaika Studios, building high-conversion websites and digital growth solutions for growing Kenyan businesses."
    }
  };

  return (
    <main className={styles.pageContainer}>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Connect with Alvin", path: "/connect/alvin" },
      ])} />
      <JsonLd data={profileJsonLd} />

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

      {/* Introduction Video */}
      <IntroVideo />

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

      {/* Featured work (Simple and understandable layout) */}
      <section className={styles.section} id="portfolio">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Portfolio</p>
          <h2 className={styles.sectionTitle}>Featured work</h2>
        </div>
        <div className={styles.projectList}>
          {featuredProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectCard}>
              <div className={styles.projectImageWrap}>
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 480px) 100vw, 480px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.projectMeta}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <span className={styles.projectSector}>{project.sector.split(" · ")[0]}</span>
                </div>
                <p className={styles.projectOutcome}>{project.headline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why businesses work with us */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Why Us</p>
          <h2 className={styles.sectionTitle}>Why work with us</h2>
        </div>
        <div className={styles.whyList}>
          <div className={styles.whyItem}>
            <span className={styles.whyIcon}>✓</span>
            <div className={styles.whyTextWrap}>
              <span className={styles.whyItemTitle}>Modern design</span>
            </div>
          </div>
          <div className={styles.whyItem}>
            <span className={styles.whyIcon}>✓</span>
            <div className={styles.whyTextWrap}>
              <span className={styles.whyItemTitle}>Automation-first</span>
            </div>
          </div>
          <div className={styles.whyItem}>
            <span className={styles.whyIcon}>✓</span>
            <div className={styles.whyTextWrap}>
              <span className={styles.whyItemTitle}>Mobile-first</span>
            </div>
          </div>
          <div className={styles.whyItem}>
            <span className={styles.whyIcon}>✓</span>
            <div className={styles.whyTextWrap}>
              <span className={styles.whyItemTitle}>AI-enabled</span>
            </div>
          </div>
          <div className={styles.whyItem}>
            <span className={styles.whyIcon}>✓</span>
            <div className={styles.whyTextWrap}>
              <span className={styles.whyItemTitle}>Fast delivery</span>
            </div>
          </div>
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
              href="https://wa.me/254745474586"
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
              href="https://instagram.com/malaikastudios.ke"
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
              href="https://linkedin.com/in/alvin-victor-"
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

      {/* Redesigned Location & Footer info */}
      <footer className={styles.footer}>
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
      </footer>
    </main>
  );
}
