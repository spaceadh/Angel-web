import type { Metadata } from "next";
import { OurWorkPage as OurWorkContent } from "@/components/work/our-work-page";

export const metadata: Metadata = {
  title: "Digital Presence Case Studies",
  description:
    "See how Malaika Studios turns websites, branding, e-commerce and automation into clearer digital business systems.",
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  return <OurWorkContent />;
}
