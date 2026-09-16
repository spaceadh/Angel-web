import Link from "next/link";
import fullLogo from "@/assets/malaika-full-logo.svg";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import visual from "@/assets/what-we-do-visual.svg";
import styles from "@/components/what-we-do/what-we-do-page.module.css";

const navItems = [
  ["/what-we-do", "What We Do"],
  ["/what-we-do/why-malaika", "Why Malaika"],
  ["/our-work", "Our Work"],
  ["/#process", "Process"],
  ["/contact", "Contact"],
] as const;
const principles = [
  ["Clear", "People understand the business quickly."],
  ["Consistent", "The pieces feel like one brand."],
  ["Considered", "The details look intentional."],
  ["Credible", "The experience feels trustworthy."],
] as const;
const journey = ["DISCOVER", "UNDERSTAND", "TRUST", "CONTACT", "BUY", "RETURN"];

export function WhyMalaikaPage() {
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
                className={
                  href === "/what-we-do/why-malaika" ? styles.active : undefined
                }
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
              <div className={styles.eyebrow}>Why Malaika</div>
              <h1 className={styles.display}>WHY MALAIKA?</h1>
              <p className={styles.heroCopy}>
                <strong>
                  Because your digital presence is part of your business.
                </strong>
                <br />
                <br />
                Customers don&apos;t separate your website from your WhatsApp.
                They don&apos;t separate your emails from your brand. They
                don&apos;t separate your social presence from your reputation.{" "}
                <b>They see one business.</b>
              </p>
              <div className={styles.heroNote}>
                More than
                <br />
                just a website.
              </div>
            </div>
            <div className={styles.visual}>
              <div className={`${styles.blob} ${styles.yellow}`} />
              <div className={`${styles.blob} ${styles.blue}`} />
              <div className={`${styles.blob} ${styles.coral}`} />
              <img
                className={styles.photo}
                src={visual.src}
                alt="Malaika digital presence illustration"
              />
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.statement}>
            <div>
              <div className={styles.eyebrow}>The Malaika difference</div>
              <h2 className={styles.display}>
                WE DON&apos;T JUST BUILD WEBSITES.
              </h2>
            </div>
            <div>
              <p>
                A website can be beautiful and still leave your business looking
                disconnected. Malaika looks at the whole presence — how the
                pieces feel, how they work and what happens between discovery
                and action.
              </p>
              <div className={styles.pieces}>
                <span className={styles.piece}>Website</span>
                <span className={styles.plus}>+</span>
                <span className={styles.piece}>WhatsApp</span>
                <span className={styles.plus}>+</span>
                <span className={styles.piece}>Email</span>
                <span className={styles.plus}>+</span>
                <span className={styles.piece}>Social</span>
                <span className={styles.plus}>+</span>
                <span className={styles.piece}>Automation</span>
              </div>
              <div className={styles.coherent}>ONE COHERENT BUSINESS.</div>
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.editorial}>
            <div className={styles.editorialPhoto}>
              <img src={visual.src} alt="" />
              <span className={styles.scribble}>
                I make you
                <br />
                look good.
              </span>
            </div>
            <div className={styles.editorialCopy}>
              <div className={styles.eyebrow}>01 / We care how you show up</div>
              <h2 className={styles.display}>
                GOOD-LOOKING ISN&apos;T JUST ABOUT PRETTY.
              </h2>
              <p>
                People form opinions about businesses through how those
                businesses present themselves. We care about clarity,
                consistency, professionalism and attention to detail — because
                the digital experience is part of the reputation.
              </p>
              <div className={styles.principles}>
                {principles.map(([title, copy]) => (
                  <div className={styles.principle} key={title}>
                    <b>{title}</b>
                    <span>{copy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.section} ${styles.systemThinking}`}>
          <div className={styles.container}>
            <div className={styles.question}>
              <div>
                <div className={styles.eyebrow}>02 / We think in systems</div>
                <h2 className={styles.display}>
                  WE DON&apos;T ASK:
                  <br />
                  <em>“WHAT WEBSITE SHOULD WE BUILD?”</em>
                </h2>
              </div>
              <div>
                <div className={styles.eyebrow}>We ask:</div>
                <h2 className={styles.display}>
                  “WHAT SHOULD HAPPEN WHEN SOMEONE DISCOVERS THIS BUSINESS?”
                </h2>
                <p>
                  That changes the work. Instead of producing isolated
                  deliverables, we design the path around the customer.
                </p>
              </div>
            </div>
            <div className={styles.journey}>
              {journey.map((label, index) => (
                <div className={styles.journeyItem} key={label}>
                  <div className={styles.journeyDot}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.dual}>
            <div className={styles.panel}>
              <div className={styles.eyebrow}>03 / We connect the pieces</div>
              <h3>
                YOUR BUSINESS SHOULDN&apos;T FEEL LIKE FIVE DIFFERENT COMPANIES.
              </h3>
              <p>
                Website. Instagram. WhatsApp. Email. CRM. When each piece is
                built in isolation, the customer feels the seams. We bring them
                together into one presence.
              </p>
              <div className={styles.lists}>
                <List
                  title="Disconnected"
                  items={[
                    "Different messages",
                    "Different visual language",
                    "Manual handoffs",
                    "Broken journeys",
                  ]}
                />
                <List
                  title="Connected"
                  items={[
                    "One clear story",
                    "Consistent experience",
                    "Automated handoffs",
                    "Clear next steps",
                  ]}
                />
              </div>
            </div>
            <div className={`${styles.panel} ${styles.dark}`}>
              <div className={styles.eyebrow}>
                04 / Engineering × creative direction
              </div>
              <h3>WE CARE ABOUT HOW IT LOOKS AND HOW IT WORKS.</h3>
              <p>
                Creative thinking shapes the experience. Engineering thinking
                makes the experience dependable, connected and useful.
              </p>
              <div className={styles.lists}>
                <List
                  title="Creative"
                  items={[
                    "Positioning",
                    "Design",
                    "Brand experience",
                    "Content direction",
                  ]}
                />
                <List
                  title="Technical"
                  items={["Websites", "Integrations", "Automation", "Systems"]}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles.container} ${styles.section}`}>
          <div className={styles.standard}>
            <div>
              <div className={styles.eyebrow}>05 / The Malaika standard</div>
              <h2 className={styles.display}>
                SIMPLE.
                <br />
                CLEAR.
                <br />
                PROPERLY DONE.
              </h2>
            </div>
            <div className={styles.standardList}>
              <div>If it doesn&apos;t look right, we fix it.</div>
              <div>If it doesn&apos;t work, we fix it.</div>
              <div>If it doesn&apos;t connect, we connect it.</div>
              <div>If it can be better, we make it better.</div>
              <p className={styles.standardScript}>
                If you want it done properly, talk to Malaika.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.final}>
          <div className={`${styles.container} ${styles.finalGrid}`}>
            <div className={styles.finalCopy}>
              <div className={styles.eyebrow}>
                Your business deserves to show up properly.
              </div>
              <h2 className={styles.display}>LET&apos;S MAKE YOU LOOK GOOD.</h2>
              <p>
                Build one coherent digital presence around the business you
                already have.
              </p>
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
              hello@malaikastudios.com
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

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <b>{title}</b>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
