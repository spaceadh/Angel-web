import type { Metadata } from "next";
import { WhatWeDoPage as WhatWeDoContent } from "@/components/what-we-do/what-we-do-page";

export const metadata: Metadata = {
  title: "Digital Presence Services in Nairobi",
  description:
    "Malaika Studios connects branding, websites, WhatsApp, email, automation and growth strategy for businesses in Nairobi and globally.",
  alternates: { canonical: "/what-we-do" },
};

export default function WhatWeDoPage() {
  return <WhatWeDoContent />;
}
