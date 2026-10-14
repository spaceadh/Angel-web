import type { Metadata } from "next";
import "./globals.css";
import { ConsentAndAnalytics } from "@/components/analytics/consent-and-analytics";
import { AnalyticsPageViews } from "@/components/analytics/page-views";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, site } from "@/lib/site";
import { Bricolage_Grotesque, Caveat, DM_Sans } from "next/font/google";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--nf-display",
  display: "swap",
});
const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--nf-body",
  display: "swap",
});
const scriptFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--nf-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Malaika Studios | Digital Presence Studio in Nairobi",
    template: "%s | Malaika Studios",
  },
  description: site.description,
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
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malaika Studios | Digital Presence Studio in Nairobi",
    description: site.description,
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
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}
    >
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
                telephone: site.phone,
                logo: absoluteUrl("/icon-512.png"),
                image: absoluteUrl("/opengraph-image"),
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Nairobi",
                  addressCountry: "KE",
                },
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
