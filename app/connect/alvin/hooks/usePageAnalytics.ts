"use client";

import { useEffect, useRef } from "react";

// Generates a UUID v4 (crypto.randomUUID with fallback)
function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const HEARTBEAT_INTERVAL_MS = 10000; // ping every 10 seconds
const ENDPOINT = "/api/system/heartbeat";

export function usePageAnalytics(pagePath: string = "/connect/alvin") {
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sentVisitRef = useRef(false);

  // Helper: seconds elapsed since page load
  const getElapsed = () => Math.round((Date.now() - startTimeRef.current) / 1000);

  // Helper: send a beacon (fire-and-forget, survives page close)
  const sendBeacon = (type: "ping" | "exit") => {
    if (!sessionIdRef.current) return;
    const payload = JSON.stringify({
      sessionId: sessionIdRef.current,
      type,
      durationSeconds: getElapsed(),
      pagePath,
    });
    // Use sendBeacon for exit so it survives tab close
    if (type === "exit" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } else {
      // Regular fetch for pings
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {}); // silently ignore
    }
  };

  useEffect(() => {
    // Guard: only run once in client
    if (sentVisitRef.current) return;
    sentVisitRef.current = true;

    sessionIdRef.current = generateSessionId();
    startTimeRef.current = Date.now();

    // 1. Register the initial visit
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        type: "visit",
        pagePath,
      }),
    }).catch(() => {});

    // 2. Start heartbeat pings
    intervalRef.current = setInterval(() => {
      sendBeacon("ping");
    }, HEARTBEAT_INTERVAL_MS);

    // 3. Exit tracking: tab close / navigation away
    const handleExit = () => {
      sendBeacon("exit");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendBeacon("exit");
      }
    };

    window.addEventListener("beforeunload", handleExit);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Cleanup on React unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("beforeunload", handleExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sendBeacon("exit");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
