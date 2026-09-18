"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/malaika-full-logo.svg";
import styles from "./home-page.module.css";
import { FaWhatsapp } from "react-icons/fa6";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";

const navigation = [
  { href: "/#home", label: "Home" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/services/website-design-development", label: "Services" },
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
    if (href === "/services/website-design-development") {
      return pathname?.startsWith("/services/") ?? false;
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
        <TrackedWhatsappLink className={styles.navCta} placement="navigation">
          <FaWhatsapp /> &nbsp; Talk to Malaika
        </TrackedWhatsappLink>
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
        <TrackedWhatsappLink
          className={styles.navCta}
          placement="mobile_navigation"
          onClick={closeMenu}
        >
          <FaWhatsapp /> &nbsp; Talk to Malaika
        </TrackedWhatsappLink>
      </nav>
    </header>
  );
}
