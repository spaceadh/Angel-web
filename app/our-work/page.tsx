import type { Metadata } from "next";
import { OurWorkPage as OurWorkContent } from "@/components/work/our-work-page";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected Malaika Studios work and digital presence transformations.",
};

export default function OurWorkPage() {
  return <OurWorkContent />;
}
