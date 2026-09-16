import type { Metadata } from "next";
import { WhyMalaikaPage as WhyMalaikaContent } from "@/components/why-malaika/why-malaika-page";

export const metadata: Metadata = {
  title: "Why Malaika",
  description:
    "Why Malaika Studios builds a coherent digital business presence.",
};

export default function WhyMalaikaPage() {
  return <WhyMalaikaContent />;
}
