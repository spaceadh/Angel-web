import type { Metadata } from "next";
import { V1ReferencePage } from "@/components/v1-reference-page";

export const metadata: Metadata = {
  title: "Why Malaika",
  description:
    "Why Malaika Studios builds a coherent digital business presence.",
};

export default function WhyMalaikaPage() {
  return <V1ReferencePage source="what-we-do/why-malaika.html" />;
}
