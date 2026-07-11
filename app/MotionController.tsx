"use client";

import { useEffect } from "react";

export default function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const heroShell = document.querySelector<HTMLElement>("[data-hero-shell]");
    const projectCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-project-card]"),
    );
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.setAttribute("data-visible", "true");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const render = () => {
      frame = 0;

      if (heroShell) {
        const rect = heroShell.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = clamp(-rect.top / travel);
        heroShell.style.setProperty("--hero-progress", progress.toFixed(4));
      }

      projectCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const viewportRange = window.innerHeight + rect.height;
        const progress = clamp((window.innerHeight - rect.top) / viewportRange);
        card.style.setProperty("--project-progress", progress.toFixed(4));
      });
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}