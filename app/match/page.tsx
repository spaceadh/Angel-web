import { Metadata } from "next";
import { MalaikaMatchFlow } from "@/components/match/malaika-match-flow";

export const metadata: Metadata = {
  title: "The Malaika Match — Malaika Studios",
  description:
    "Discover whether Malaika Studios is the right match for your digital project. Calculate your project fit score and receive three tailored build configurations."
};

export default function MatchPage() {
  return <MalaikaMatchFlow />;
}
