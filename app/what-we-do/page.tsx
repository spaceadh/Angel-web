import type { Metadata } from "next";
import { WhatWeDoPage as WhatWeDoContent } from "@/components/what-we-do/what-we-do-page";

export const metadata: Metadata = {
  title: "What We Do",
  description: "The Malaika system for a clear, connected digital presence.",
};

export default function WhatWeDoPage() {
  return <WhatWeDoContent />;
}
