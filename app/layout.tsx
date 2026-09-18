import type { Metadata } from "next";
import "./globals.css";
import { ConsentAndAnalytics } from "@/components/analytics/consent-and-analytics";
import { AnalyticsPageViews } from "@/components/analytics/page-views";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Malaika Studios | Digital Presence Studio in Nairobi",
    template: "%s | Malaika Studios",
  },
  description: site.description,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Malaika Studios | Digital Presence Studio in Nairobi",
    description: site.description,
    url: site.url,
    images: [
      { url: "/icon-512.png", width: 512, height: 512, alt: "Malaika Studios" },
    ],
  },
  twitter: {
    card: "summary",
    title: "Malaika Studios | Digital Presence Studio in Nairobi",
    description: site.description,
    images: ["/icon-512.png"],
  },
  verification: {
    other: {
      "msvalidate.01": "40105CFF824F8EF09A6FDA43C198BD6B",
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@10..48,75..100,200..800&family=Caveat:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfessionalService",
                "@id": `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                description: site.description,
                email: site.email,
                areaServed: site.serviceAreas.map((name) => ({
                  "@type": "Place",
                  name,
                })),
                sameAs: Object.values(site.social),
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                name: site.name,
                url: site.url,
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
        {children}
        <AnalyticsPageViews />
        <ConsentAndAnalytics />
      </body>
    </html>
  );
}
