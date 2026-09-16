import type { Metadata } from "next";
import { V1ReferencePage } from "@/components/v1-reference-page";

export const metadata: Metadata = {
  title: "What We Do",
  description: "The Malaika system for a clear, connected digital presence.",
};

export default function WhatWeDoPage() {
  return <V1ReferencePage source="what-we-do/index.html" />;
}
