import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Malaika Studios by Rotsi | Website Design & Digital Presence",
  description:
    "Malaika Studios helps growing Kenyan and African businesses build clearer websites, stronger digital presence, and inquiry paths that attract, convert, and retain customers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Malaika Studios by Rotsi | Website Design & Digital Presence",
    description:
      "Clearer websites, digital presence, and inquiry paths for growing Kenyan and African businesses.",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malaika Studios by Rotsi | Website Design & Digital Presence",
    description:
      "Clearer websites, digital presence, and inquiry paths for growing Kenyan and African businesses.",
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
