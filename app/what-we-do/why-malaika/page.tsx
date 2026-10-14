import type { Metadata } from "next";
import { WhyMalaikaPage as WhyMalaikaContent } from "@/components/why-malaika/why-malaika-page";

export const metadata: Metadata = {
  title: "Why Malaika Studios",
  description:
    "Why businesses in Nairobi and beyond choose Malaika Studios: one team connecting brand, website, WhatsApp automation and growth into a single, measurable digital presence.",
  alternates: { canonical: "/what-we-do/why-malaika" },
};

export default function WhyMalaikaPage() {
  return <WhyMalaikaContent />;
}
