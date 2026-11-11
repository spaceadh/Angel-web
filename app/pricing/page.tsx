import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/pricing-page";
import { absoluteUrl, defaultOgImage, site } from "@/lib/site";

const url = absoluteUrl("/pricing");

// Refresh the shilling amounts once a day.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pricing — Website Design, SEO & Digital Marketing in Kenya",
  description:
    "Fixed-price packages for website design, email marketing, SEO, digital growth and social content, from Nairobi, Kenya. From USD 250, each with a delivery deadline. Get an instant estimate.",
  alternates: { canonical: url },
  keywords: [
    "website design price Kenya",
    "web design cost Nairobi",
    "digital marketing pricing Kenya",
    "SEO pricing Nairobi",
    "email marketing cost Kenya",
    "social media management pricing Kenya",
    "digital agency pricing Kenya",
  ],
  openGraph: {
    title: "Transparent Pricing — Malaika Studios",
    description:
      "Every package, price and delivery deadline for website design, SEO, email, growth and social. From USD 250.",
    url,
    siteName: site.name,
    type: "website",
    images: [defaultOgImage],
  },
};

export default function Page() {
  return <PricingPage />;
}
