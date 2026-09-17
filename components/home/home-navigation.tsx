"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/malaika-full-logo.svg";
import styles from "./home-page.module.css";
import { FaWhatsapp } from "react-icons/fa6";

const navigation = [
  { href: "/#home", label: "Home" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/our-work", label: "Our Work" },
  { href: "/what-we-do/why-malaika", label: "Why Malaika" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const whatsappLink = "https://wa.me/254745474586";

export function HomeNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => {
    if (href === "/#home" || href === "/") {
      return pathname === "/";
    }
    if (href === "/what-we-do") {
      return pathname === "/what-we-do";
    }
    if (href === "/what-we-do/why-malaika") {
      return pathname === "/what-we-do/why-malaika";
    }
    if (href === "/our-work") {
      return pathname === "/our-work" || pathname?.startsWith("/our-work/");
    }
    if (href === "/contact") {
      return pathname === "/contact";
    }
    return false;
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.nav}`}>
        <Link
          className={styles.brand}
          href="/#home"
          aria-label="Malaika Studios home"
        >
          <img
            className={styles.brandLogo}
            src={logo.src}
            alt="Malaika Studios"
            width="515"
            height="170"
          />
        </Link>
        <nav className={styles.navLinks} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.active : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className={styles.navCta}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> &nbsp; Talk to Malaika
        </a>
        <button
          className={styles.menuButton}
          type="button"
          aria-controls="homeMobileMenu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          ☰
        </button>
      </div>
      <nav
        className={styles.mobileMenu}
        id="homeMobileMenu"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        data-open={isOpen}
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className={isActive(item.href) ? styles.active : undefined}
          >
            {item.label}
          </Link>
        ))}
        <a
          className={styles.navCta}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          <FaWhatsapp /> &nbsp; Talk to Malaika
        </a>
      </nav>
    </header>
  );
}
