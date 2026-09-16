"use client";

import { useEffect } from "react";

export function MobileMenuController() {
  useEffect(() => {
    const button = document.getElementById("menuBtn");
    const menu = document.getElementById("mobileMenu");
    if (
      !(button instanceof HTMLButtonElement) ||
      !(menu instanceof HTMLElement)
    )
      return;

    const closeMenu = () => {
      menu.dataset.open = "false";
      menu.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
    };
    const toggleMenu = () => {
      if (menu.dataset.open === "true") {
        closeMenu();
        return;
      }
      menu.dataset.open = "true";
      menu.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close menu");
    };

    button.addEventListener("click", toggleMenu);
    const links = [...menu.querySelectorAll("a")];
    links.forEach((link) => link.addEventListener("click", closeMenu));
    return () => {
      button.removeEventListener("click", toggleMenu);
      links.forEach((link) => link.removeEventListener("click", closeMenu));
    };
  }, []);

  return null;
}
