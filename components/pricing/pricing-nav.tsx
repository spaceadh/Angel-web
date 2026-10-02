"use client";

import { useEffect, useState } from "react";
import styles from "./pricing.module.css";
import type { OfferingMeta } from "@/lib/pricing";

interface PricingNavProps {
  offerings: readonly OfferingMeta[];
}

export function PricingNav({ offerings }: PricingNavProps) {
  const [active, setActive] = useState<string>(offerings[0].key);

  useEffect(() => {
    const sections = offerings
      .map(({ key }) => document.getElementById(`section-${key}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          const id = intersecting[0].target.id.replace("section-", "");
          setActive(id);
        }
      },
      {
        threshold: 0,
        rootMargin: "-61px 0px -55% 0px",
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [offerings]);

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    key: string
  ) {
    e.preventDefault();
    const el = document.getElementById(`section-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(key);
    }
  }

  return (
    <nav className={styles.serviceNav} aria-label="Service pricing sections">
      <div className={styles.serviceNavInner}>
        {offerings.map(({ key, label, accentColor }) => (
          <a
            key={key}
            href={`#section-${key}`}
            onClick={(e) => handleClick(e, key)}
            className={`${styles.serviceNavItem} ${active === key ? styles.navActive : ""}`}
            style={
              {
                "--nav-accent": accentColor,
              } as React.CSSProperties
            }
            aria-current={active === key ? "true" : undefined}
          >
            <span className={styles.navDot} aria-hidden="true" />
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
