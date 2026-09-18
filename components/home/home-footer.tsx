"use client";

import Link from "next/link";
import logoIcon from "@/assets/malaika-logo-icon.svg";
import styles from "./home-page.module.css";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { site } from "@/lib/site";

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
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            Nairobi / Remote / Global
          </div>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/services/website-design-development">Websites</Link>
          <Link href="/services/brand-identity-digital-design">Branding</Link>
          <Link href="/services/whatsapp-email-crm-automation">Automation</Link>
          <Link href="/services/digital-growth-strategy-analytics">Growth</Link>
          <Link href="/privacy">Privacy</Link>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event("malaika:open-consent"))
            }
          >
            Cookie settings
          </button>
        </div>
        {/* Add social media links */}
        <div className={styles.footerSocial}>
          <a
            href="https://www.instagram.com/malaikastudios.ke/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.x.com/rotsilabs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/alvin-victor-/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Malaika Studios. All rights reserved.</span>
          <span>
            Digital Presence by{" "}
            <a
              href="https://malaikastudios.rotsi.co.ke"
              target="_blank"
              rel="noopener noreferrer"
            >
              Malaika Studios
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
