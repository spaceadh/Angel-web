import type { Metadata } from "next";
import "./globals.css";
import { absoluteUrl, routeMeta, siteName, siteUrl } from "./seoConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: routeMeta.home.title,
    template: "%s | Malaika Studios",
  },
  description: routeMeta.home.description,
  alternates: {
    canonical: absoluteUrl(routeMeta.home.path),
  },
  openGraph: {
    title: routeMeta.home.title,
    description: "Clearer websites, digital presence, and inquiry paths for growing Kenyan and African businesses.",
    url: absoluteUrl(routeMeta.home.path),
    siteName,
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Malaika Studios by Rotsi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: routeMeta.home.title,
    description: "Clearer websites, digital presence, and inquiry paths for growing Kenyan and African businesses.",
    images: [absoluteUrl("/twitter-image")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
