import Link from "next/link";
import brandShowcase from "@/assets/why-malaika-image.png";
import heroVisual from "@/assets/hero-visual.png";
import workBeads from "@/assets/beads-world/beads-world-africa-logo.png";
import workDigitally from "@/assets/digitally-sly/digitaly-sly-logo.png";
import workNeighborhood from "@/assets/neighbourhood-cocktails/neighbourhood-cocktails-logo.png";
import workPolar from "@/assets/polarbison/LogoIconwithtagline-Orange-Black.png";
import { HomeFooter } from "./home-footer";
import { HomeNavigation } from "./home-navigation";
import styles from "./home-page.module.css";
import { FaWhatsapp, FaLongArrowAltRight } from "react-icons/fa";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import { FaArrowRight } from "react-icons/fa6";

const whatsappUrl = "https://wa.me/254745474586";

const systemSteps = [
  {
    icon: "✦",
    color: "yellow",
    title: "01 — Get noticed",
    detail: "Brand · Social · Strategy",
    aside: "Make them stop.",
  },
  {
    icon: "▣",
    color: "blue",
    title: "02 — Look good",
    detail: "Website · Content · Design",
    aside: "Give them something worth remembering.",
  },
  {
    icon: "◉",
    color: "coral",
    title: "03 — Make it easy",
    detail: "WhatsApp · Email · CRM",
    aside: "Remove the friction.",
  },
  {
    icon: "⚙",
    color: "green",
    title: "04 — Make it work",
    detail: "Automation · Integrations · Systems",
    aside: "Less manual work. More momentum.",
  },
  {
    icon: "↗",
    color: "blue",
    title: "05 — Grow",
    detail: "Analytics · Campaigns · Strategy",
    aside: "Turn attention into opportunity.",
  },
] as const;

const work = [
  {
    image: workNeighborhood,
    alt: "Neighbourhood Cocktails brand work",
    title: (
      <>
        Neighborhood
        <br />
        Cocktails
      </>
    ),
    services: "Website / Branding / Digital Presence",
    href: "/our-work/work/neighborhood-cocktails",
    label: "View Neighborhood Cocktails case study",
  },
  {
    image: workBeads,
    alt: "Beads World Africa digital work",
    title: (
      <>
        Beads World
        <br />
        Africa
      </>
    ),
    services: "E-commerce / Email / WhatsApp",
    href: "/our-work/work/beads-world-africa",
    label: "View Beads World Africa case study",
  },
  {
    image: workDigitally,
    alt: "Digitally Sly work",
    title: (
      <>
        Digitally
        <br />
        Sly
      </>
    ),
    services: "Website / Branding / Strategy",
    href: "/our-work/work/digitally-sly",
    label: "View Digitally Sly case study",
  },
  {
    image: workPolar,
    alt: "Polar Bison brand work",
    title: <>Polar Bison</>,
    services: "Website / Strategy / Growth",
    href: "/our-work/work/polar-bison",
    label: "View Polar Bison case study",
  },
] as const;

const process = [
  ["See it.", "We understand the business, audience and ambition."],
  ["Shape it.", "We define the brand, positioning and digital experience."],
  ["Build it.", "We create the website, automations, campaigns and systems."],
  ["Launch it.", "Everything goes live as one coherent presence."],
  ["Grow it.", "We keep improving what happens after the customer finds you."],
] as const;

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <HomeNavigation />
      <main id="home">
        <section className={`${styles.container} ${styles.hero}`}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Digital presence agency</div>
            <h1>
              <span className={styles.heroLine}>WE MAKE</span>
              <span className={styles.heroLine}>BUSINESSES</span>
              <span className={styles.heroLine}>
                LOOK <span className={styles.good}>GOOD.</span>
              </span>
            </h1>
            <p>
              Websites, WhatsApp, email, strategy and automation — built into a
              digital presence people trust.
            </p>
            <div className={styles.actions}>
              <Link className={styles.buttonDark} href="/what-we-do">
                See what we do <FaLongArrowAltRight />
              </Link>
              <TrackedWhatsappLink
                className={styles.buttonOutline}
                placement="home_hero"
              >
                <FaWhatsapp /> &nbsp; Talk to Malaika
              </TrackedWhatsappLink>
            </div>
            {/* <span className={`${styles.script} ${styles.heroScript}`}> */}
            {/* I make you */}
            {/* <br /> */}
            {/* look good. */}
            {/* </span> */}
          </div>
          <div className={styles.heroArt}>
            <img
              className={styles.heroPhoto}
              src={heroVisual.src}
              alt="Malaika Studios digital presence visual"
              width="736"
              height="914"
              fetchPriority="high"
            />
          </div>
          <div className={styles.scrollNote}>Scroll to explore ↓</div>
        </section>

        <section className={styles.system} id="system">
          <div className={`${styles.container} ${styles.systemGrid}`}>
            <div>
              <div className={styles.sectionLabel}>The Malaika system</div>
              <h2 className={styles.display}>
                YOUR CUSTOMER SEES ONE BUSINESS.
              </h2>
              <p className={styles.systemIntro}>
                So why should your digital presence feel like five different
                ones?
              </p>
              <span className={styles.note}>
                Your website isn&apos;t your digital presence.
                <br />
                It&apos;s one part of it.
              </span>
            </div>
            <div className={styles.journey}>
              <div className={styles.journeyLine} />
              {systemSteps.map((step) => (
                <article className={styles.step} key={step.title}>
                  <div className={`${styles.stepIcon} ${styles[step.color]}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                    <span className={styles.aside}>{step.aside}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.container}>
            <div className={styles.workHead}>
              <div>
                <h2 className={styles.display}>
                  GOOD-LOOKING BUSINESSES WE&apos;VE WORKED ON.
                </h2>
                <p className={styles.workCopy}>
                  Real brands. Real results. From websites to WhatsApp
                  automations, email campaigns and full digital presence
                  systems.
                </p>
              </div>
              <Link href="/our-work" className={styles.buttonOutline}>
                View all work →
              </Link>
            </div>
            <div className={styles.workGrid}>
              {work.map((item) => (
                <article className={styles.workCard} key={item.href}>
                  <img
                    src={item.image.src}
                    alt={item.alt}
                    loading="lazy"
                    width="620"
                    height="760"
                  />
                  <div className={styles.workCardMeta}>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.services}</span>
                    </div>
                    <Link
                      className={styles.workCardLink}
                      href={item.href}
                      aria-label={item.label}
                    >
                      ↗
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.why} id="why">
          <div className={`${styles.container} ${styles.whyGrid}`}>
            <div>
              <div className={styles.sectionLabel}>Why Malaika</div>
              <h2 className={styles.display}>
                WE CARE HOW YOUR BUSINESS SHOWS UP.
              </h2>
            </div>
            <div>
              <p>
                Your customers don&apos;t separate your website from your brand,
                your WhatsApp from your service, or your emails from your
                reputation. They experience one business.
              </p>
              <p>
                <strong>So we build one coherent presence.</strong>
              </p>
              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <span className={`${styles.miniSpark} ${styles.yellow}`} />
                  Stronger trust.
                </div>
                <div className={styles.benefit}>
                  <span className={`${styles.miniSpark} ${styles.blue}`} />
                  More engagement.
                </div>
                <div className={styles.benefit}>
                  <span className={`${styles.miniSpark} ${styles.coral}`} />
                  Higher conversions.
                </div>
                <div className={styles.benefit}>
                  <span className={`${styles.miniSpark} ${styles.green}`} />
                  Lasting growth.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.process} id="process">
          <div className={styles.container}>
            <div className={styles.sectionLabel}>Our process</div>
            <h2 className={styles.display}>SIMPLE. CLEAR. EFFECTIVE.</h2>
            <div className={styles.processGrid}>
              {process.map(([title, copy], index) => (
                <article className={styles.processItem} key={title}>
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} id="contact">
          <div className={`${styles.container} ${styles.ctaGrid}`}>
            <div>
              <div className={styles.sectionLabel}>Let&apos;s make you</div>
              <h2 className={styles.display}>LOOK GOOD.</h2>
              <p>Ready to build a digital presence that actually works?</p>
              <TrackedWhatsappLink
                className={styles.button}
                placement="home_final_cta"
              >
                Talk to Malaika <FaArrowRight />
              </TrackedWhatsappLink>
            </div>
            <div className={styles.ctaArt}>
              <img
                src={brandShowcase.src}
                alt="Malaika Studios workspace and brand showcase"
              />
              <span className={styles.script}>
                If you want it
                <br />
                done properly,
                <br />
                talk to Malaika.
              </span>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
