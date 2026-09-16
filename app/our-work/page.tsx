import type { Metadata } from "next";
import { V1ReferencePage } from "@/components/v1-reference-page";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected Malaika Studios work and digital presence transformations.",
};

export default function OurWorkPage() {
  return <V1ReferencePage source="our-work/index.html" />;
}
