import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/pricing-page";
import { absoluteUrl, site } from "@/lib/site";

const url = absoluteUrl("/pricing");

export const metadata: Metadata = {
  title:
    "Pricing — Website Design, SEO & Digital Marketing in Kenya | Malaika Studios",
  description:
    "Transparent pricing for website design, email marketing, SEO, digital growth and social content in Nairobi, Kenya. Configurations from KSh 25,000. Get an instant estimate.",
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
      "Browse all service configurations and prices for website design, SEO, email, growth and social in Kenya. From KSh 25,000.",
    url,
    siteName: site.name,
    type: "website",
  },
};

export default function Page() {
  return <PricingPage />;
}
