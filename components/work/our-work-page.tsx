import Link from "next/link";
import fullLogo from "@/assets/malaika-full-logo.svg";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import { caseStudies } from "@/content/case-studies";
import { workArtwork } from "./artwork";
import styles from "./work.module.css";

const navItems = [
  ["/#home", "Home"],
  ["/what-we-do", "What We Do"],
  ["/our-work", "Our Work"],
  ["/what-we-do/why-malaika", "Why Malaika"],
  ["/#process", "Process"],
  ["/contact", "Contact"],
] as const;
import { FaWhatsapp } from "react-icons/fa";


const whatsappLink = "https://wa.me/254745474586";

export function OurWorkPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.nav}`}>
          <Link
            className={styles.brand}
            href="/#home"
            aria-label="Malaika Studios home"
          >
            <img
              className={styles.brandLogo}
              src={fullLogo.src}
              alt="Malaika Studios"
              width="515"
              height="170"
            />
          </Link>
          <nav className={styles.navLinks} aria-label="Primary navigation">
            {navItems.map(([href, label]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
          <a className={styles.navCta} href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> &nbsp; Talk to Malaika
          </a>
        </div>
      </header>
      <main>
        <section className={`${styles.container} ${styles.hero}`}>
          <div className={styles.eyebrow}>Selected work / digital presence</div>
          <h1 className={styles.display}>OUR WORK.</h1>
          <p className={styles.heroIntro}>
            Real brands. Real results. From websites to WhatsApp automations,
            email campaigns and full digital presence systems.
          </p>
          <span className={`${styles.script} ${styles.heroScript}`}>
            Different businesses.
            <br />
            Same goal —<br />
            <b>look good.</b>
          </span>
          <div className={`${styles.blob} ${styles.b1}`} />
          <div className={`${styles.blob} ${styles.b2}`} />
          <div className={`${styles.blob} ${styles.b3}`} />
        </section>
        <section
          className={`${styles.container} ${styles.section} ${styles.workSection}`}
        >
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Good-looking businesses</div>
              <h2 className={styles.display}>WE&apos;VE WORKED ON.</h2>
            </div>
            <p>
              Every project starts with the same question: how should this
              business show up when someone discovers it?
            </p>
          </div>
          <div className={styles.grid}>
            {caseStudies.map((study) => (
              <Link
                className={styles.card}
                href={`/our-work/work/${study.slug}`}
                key={study.slug}
              >
                <img
                  src={workArtwork[study.art].src}
                  alt={`${study.title} project`}
                />
                <div className={styles.cardMeta}>
                  <span className={styles.pill}>{study.pill}</span>
                  <h2>{study.title}</h2>
                  <p>{study.serviceLine}</p>
                </div>
                <span className={styles.arrow}>↗</span>
              </Link>
            ))}
          </div>
          <div className={styles.miniCta}>
            <div>
              <h3 className={styles.display}>Have a project in mind?</h3>
              <p>
                Let&apos;s build something together — and make sure your
                business shows up properly.
              </p>
            </div>
            <a className={styles.buttonDark} href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> &nbsp; Talk to Malaika →
            </a>
          </div>
        </section>
      </main>
      <Footer logoIcon={logoIcon} />
    </div>
  );
}

export function Footer({ logoIcon }: { logoIcon: typeof fullLogo }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <Link className={styles.footerBrand} href="/#home">
              <img
                className={styles.brandIcon}
                src={logoIcon.src}
                alt=""
                width="160"
                height="170"
              />
              <span className={styles.wordmark}>
                MALAIKA<small>STUDIOS</small>
              </span>
            </Link>
            <div className={styles.footerTag}>I make you look good.</div>
          </div>
          <div className={styles.footerLinks}>
            {[
              "Websites",
              "WhatsApp",
              "Email",
              "Social",
              "Automation",
              "Growth",
            ].map((item) => (
              <Link href="/what-we-do" key={item}>
                {item}
              </Link>
            ))}
          </div>
          <div className={styles.footerContact}>
            malaikastudios.rotsi.co.ke
            <br />
            Nairobi / Remote / Global
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Malaika Studios. All rights reserved.</span>
          <span>Instagram &nbsp; LinkedIn &nbsp; X &nbsp; YouTube</span>
        </div>
      </div>
    </footer>
  );
}
