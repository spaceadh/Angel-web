import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ConsentAndAnalytics } from "@/components/analytics/consent-and-analytics";
import { AnalyticsPageViews } from "@/components/analytics/page-views";
import { JsonLd } from "@/components/seo/json-ld";
import { startingPrice } from "@/lib/pricing";
import { services } from "@/content/services";
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
    default: "Malaika Studios | Web Design & WhatsApp Automation, Nairobi",
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
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
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
                priceRange: `${startingPrice("website")}+`,
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
                slogan: site.slogan,
                knowsAbout: [
                  "Website design",
                  "E-commerce websites",
                  "M-Pesa payment integration",
                  "WhatsApp Business automation",
                  "Email marketing",
                  "CRM setup",
                  "Search engine optimisation",
                  "Local SEO",
                  "Brand identity and logo design",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  telephone: site.phone,
                  email: site.email,
                  url: site.whatsappUrl,
                  areaServed: ["KE", "Worldwide"],
                  availableLanguage: ["English"],
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Malaika Studios services",
                  itemListElement: services.map((service) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: service.title,
                      url: absoluteUrl(`/services/${service.slug}`),
                    },
                  })),
                },
                ...(site.googleBusinessUrl
                  ? { hasMap: site.googleBusinessUrl }
                  : {}),
                ...(site.openingHours.length
                  ? { openingHours: site.openingHours }
                  : {}),
                sameAs: [
                  ...Object.values(site.social),
                  ...(site.googleBusinessUrl ? [site.googleBusinessUrl] : []),
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                name: site.name,
                url: site.url,
                inLanguage: "en-KE",
                publisher: { "@id": `${site.url}/#organization` },
              },
            ],
          }}
        />
        {children}
        <AnalyticsPageViews />
        <ConsentAndAnalytics />
        {/* Ahrefs Web Analytics: cookieless visit counts, so it runs without
            the consent banner (see /privacy). */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ZBLtCTgikRvDJMo+0esICQ"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
