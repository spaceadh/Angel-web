import brandShowcase from "@/assets/brand-showcase.png";
import { HomeFooter } from "./home/home-footer";
import { HomeNavigation } from "./home/home-navigation";
import homeStyles from "./home/home-page.module.css";
import styles from "./contact-page.module.css";
import { FaWhatsapp } from "react-icons/fa6";

const whatsappUrl = "https://wa.me/254745474586";

export function ContactPageContent() {
  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main className={styles.main}>
        <section
          className={`${homeStyles.container} ${styles.grid}`}
          aria-labelledby="contact-title"
        >
          <div className={styles.copy}>
            <div className={styles.eyebrow}>Talk to Malaika</div>
            <h1 id="contact-title">LET&apos;S MAKE YOU LOOK GOOD.</h1>
            <p>
              Ready to build a digital presence that actually works? Start the
              conversation on WhatsApp or email Malaika Studios.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> &nbsp; Talk to Malaika →
              </a>
              <a
                className={styles.secondaryAction}
                href="mailto:malaikastudios.rotsi.co.ke"
              >
                Email Malaika →
              </a>
            </div>
          </div>
          <div className={styles.art} aria-hidden="true">
            <img src={brandShowcase.src} alt="" />
            <span>If you want it done properly, talk to Malaika.</span>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
