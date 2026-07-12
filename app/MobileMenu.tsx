"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const closeMenu = (menu: HTMLDetailsElement | null) => {
  if (menu) menu.open = false;
};

export default function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleOutsidePointer = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) {
        closeMenu(menu);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, []);

  const handleLinkClick = () => closeMenu(menuRef.current);

  return (
    <details className="menu" ref={menuRef}>
      <summary aria-label="Open navigation">Menu</summary>
      <nav aria-label="Mobile navigation">
        <a href="#work" onClick={handleLinkClick}>Work</a>
        <Link href="/services" onClick={handleLinkClick}>Services</Link>
        <Link href="/pricing" onClick={handleLinkClick}>Pricing</Link>
        <a href="#studio" onClick={handleLinkClick}>Studio</a>
        <a href="mailto:business@rotsi.co.ke" onClick={handleLinkClick}>Start a project ↗</a>
      </nav>
    </details>
  );
}
