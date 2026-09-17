import Link from "next/link";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import styles from "./home-page.module.css";

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerStatement}>
          Let&apos;s make your business <em>look good.</em>
        </p>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <img
              className={styles.brandIcon}
              src={logoIcon.src}
              alt=""
              width="160"
              height="170"
            />
            <span className={styles.wordmark} aria-hidden="true">
              MALAIKA<small>STUDIOS</small>
            </span>
          </div>
          <div className={styles.footerTag}>I make you look good.</div>
          <div className={styles.footerContact}>
            malaikastudios.rotsi.co.ke
            <br />
            Nairobi / Remote / Global
          </div>
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
        <div className={styles.footerBottom}>
          <span>© 2026 Malaika Studios. All rights reserved.</span>
          <span>Made with the Spark ✦</span>
        </div>
      </div>
    </footer>
  );
}
