import Link from "next/link";
import fullLogo from "@/assets/malaika-full-logo.svg";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import visual from "@/assets/what-we-do-visual.svg";
import styles from "./what-we-do-page.module.css";

const systemSteps = [
  [
    "GET NOTICED.",
    "Make people notice the business.",
    [
      "Brand positioning",
      "Digital positioning",
      "Social strategy",
      "Content direction",
    ],
  ],
  [
    "LOOK GOOD.",
    "Give them something worth remembering.",
    ["Websites", "Landing pages", "E-commerce", "UX / UI · Digital design"],
  ],
  [
    "MAKE IT EASY.",
    "Remove friction between interest and action.",
    [
      "WhatsApp integration",
      "WhatsApp automation",
      "Email campaigns",
      "CRM · Lead capture",
    ],
  ],
  [
    "MAKE IT WORK.",
    "Less manual work. More momentum.",
    ["Automations", "Integrations", "Business systems", "CRM workflows"],
  ],
  [
    "GROW.",
    "Turn attention into opportunity.",
    ["Analytics", "Campaigns", "Conversion improvement", "Growth strategy"],
  ],
] as const;

const capabilities = [
  [
    "✦",
    "GET NOTICED",
    "Shape how the business enters people’s minds.",
    [
      "Brand positioning",
      "Digital positioning",
      "Social strategy",
      "Content direction",
    ],
  ],
  [
    "▣",
    "LOOK GOOD",
    "Make the digital experience feel considered.",
    ["Websites", "Landing pages", "E-commerce", "UX / UI"],
  ],
  [
    "◉",
    "MAKE IT EASY",
    "Give customers a clear next step.",
    ["WhatsApp", "Email campaigns", "CRM", "Lead capture"],
  ],
  [
    "⚙",
    "MAKE IT WORK",
    "Connect the work behind the scenes.",
    ["Automation", "Integrations", "Business systems", "Data connections"],
  ],
  [
    "↗",
    "GROW",
    "Keep improving what happens after launch.",
    ["Analytics", "Campaigns", "Conversion", "Growth strategy"],
  ],
] as const;

const audiences = [
  ["Growing businesses", "Ready for a stronger digital foundation."],
  ["Established businesses", "Outgrown the old website or digital setup."],
  ["New launches", "Need the whole presence to arrive together."],
  [
    "Disconnected channels",
    "Website, WhatsApp, email and social feel like different companies.",
  ],
] as const;

const navItems = [
  ["/what-we-do", "What We Do"],
  ["/what-we-do/why-malaika", "Why Malaika"],
  ["/our-work", "Our Work"],
  ["/#process", "Process"],
  ["/contact", "Contact"],
] as const;

export function WhatWeDoPage() {
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
              <Link
                className={href === "/what-we-do" ? styles.active : undefined}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <a className={styles.navCta} href="https://wa.me/254712345678">
            ◉ &nbsp; Talk to Malaika
          </a>
        </div>
      </header>
      <main>
        <section className={`${styles.container} ${styles.hero}`}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>What we do</div>
              <h1 className={styles.display}>
                WE BUILD THE PRESENCE BEHIND THE BUSINESS.
              </h1>
              <p className={styles.heroCopy}>
                Your customers don&apos;t experience your website, WhatsApp,
                email and social media separately. They experience your
                business. We make those pieces work together.
              </p>
              <div className={styles.heroNote}>
                One business.
                <br />
                One presence.
              </div>
            </div>
            <div className={styles.visual}>
              <div className={`${styles.blob} ${styles.yellow}`} />
              <div className={`${styles.blob} ${styles.blue}`} />
              <div className={`${styles.blob} ${styles.coral}`} />
              <div className={`${styles.blob} ${styles.green}`} />
              <img
                className={styles.photo}
                src={visual.src}
                alt="Malaika digital presence illustration"
              />
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.dark}`}>
          <div className={styles.container}>
            <div className={styles.systemIntro}>
              <div>
                <div className={styles.eyebrow}>The Malaika System</div>
                <h2 className={styles.display}>
                  FIVE PARTS.
                  <br />
                  ONE PRESENCE.
                </h2>
              </div>
              <p>
                We don&apos;t start with disconnected services. We look at how
                people discover, understand, trust, contact and buy from your
                business — then build the digital pieces around that journey.
              </p>
            </div>
            <div className={styles.timeline}>
              {systemSteps.map(([title, copy, details], index) => (
                <article className={styles.step} key={title}>
                  <div className={styles.stepCopy}>
                    <div className={styles.eyebrow}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <div className={styles.stepCenter}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.details}>
                    {details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.systemIntro}>
            <div>
              <div className={styles.eyebrow}>Our capabilities</div>
              <h2 className={styles.display}>
                EVERYTHING YOU NEED FOR A STRONG DIGITAL PRESENCE.
              </h2>
            </div>
            <p>
              Five key areas. One integrated approach. The exact mix changes
              with the business — the principle doesn&apos;t.
            </p>
          </div>
          <div className={styles.capGrid}>
            {capabilities.map(([icon, title, copy, items]) => (
              <article className={styles.cap} key={title}>
                <div className={styles.capIcon}>{icon}</div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className={styles.connect}>
            <div className={styles.eyebrow}>How it all connects</div>
            <h2 className={styles.display}>
              NONE OF THESE THINGS SHOULD FEEL LIKE SEPARATE PROJECTS.
            </h2>
            <div className={styles.flow}>
              <div className={styles.node}>
                <i>▣</i>Website
              </div>
              <span>→</span>
              <div className={styles.node}>
                <i>◉</i>WhatsApp
              </div>
              <span>→</span>
              <div className={styles.node}>
                <i>✉</i>Email
              </div>
              <span>→</span>
              <div className={styles.node}>
                <i>⚙</i>Automation
              </div>
              <span>→</span>
              <div className={styles.node}>
                <i>◎</i>Customer
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.audience}>
            <div>
              <div className={styles.eyebrow}>Built for</div>
              <h2 className={styles.display}>
                BUSINESSES READY TO SHOW UP PROPERLY.
              </h2>
              <p>
                Growing businesses, established businesses with an outdated
                presence, new launches, and businesses whose digital channels
                don&apos;t work together.
              </p>
            </div>
            <div className={styles.audienceList}>
              {audiences.map(([title, copy]) => (
                <div className={styles.audienceItem} key={title}>
                  <b>{title}</b>
                  {copy}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.final}>
          <div className={`${styles.container} ${styles.finalGrid}`}>
            <div className={styles.finalCopy}>
              <div className={styles.eyebrow}>
                Your business already does good work.
              </div>
              <h2 className={styles.display}>LET&apos;S MAKE IT LOOK GOOD.</h2>
              <p>Ready to build a digital presence that actually works?</p>
              <a className={styles.finalCta} href="https://wa.me/254712345678">
                ◉ &nbsp; Talk to Malaika →
              </a>
            </div>
            <div className={styles.finalArt}>
              <img src={visual.src} alt="" />
            </div>
          </div>
        </section>
      </main>
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
    </div>
  );
}
