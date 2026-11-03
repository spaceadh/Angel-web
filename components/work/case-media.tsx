"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudyMedia } from "@/content/case-studies";

/**
 * Screenshots render as images. Clips play silently on loop only while on
 * screen, and never autoplay for people who prefer reduced motion.
 */
export function CaseMedia({
  media,
  className,
  priority = false,
}: {
  media: CaseStudyMedia;
  className?: string;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isVideo = media.src.endsWith(".mp4");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(reduce.matches);
    if (reduce.matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!isVideo) {
    return (
      <img
        className={className}
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      src={media.src}
      poster={media.poster}
      width={media.width}
      height={media.height}
      aria-label={media.alt}
      muted
      loop
      playsInline
      preload="none"
      controls={reducedMotion}
    />
  );
}
