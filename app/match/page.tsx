import { Metadata } from "next";
import { MalaikaMatchFlow } from "@/components/match/malaika-match-flow";

export const metadata: Metadata = {
  title: "Instant Project Estimate — Website & Marketing Costs in Kenya",
  description:
    "Answer a few quick questions and get an instant scope and price estimate for your website, branding, SEO or marketing project in Kenya — with three tailored options.",
  alternates: { canonical: "/match" },
};

export default function MatchPage() {
  return <MalaikaMatchFlow />;
}
