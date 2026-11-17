import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: false,
  },
  // URLs from the previous site that Google still has indexed.
  async redirects() {
    return [
      {
        source: "/services/digital-presence-audit",
        destination: "/services/digital-growth-strategy-analytics",
        permanent: true,
      },
      { source: "/projects", destination: "/our-work", permanent: true },
      // Case study removed on 2026-11-02.
      {
        source: "/our-work/work/polar-bison",
        destination: "/our-work",
        permanent: true,
      },
      { source: "/projects/:slug*", destination: "/our-work", permanent: true },
      // Website cost calculator hidden on 2026-11-17 until it is corrected.
      {
        source: "/tools/website-cost-calculator",
        destination: "/pricing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
