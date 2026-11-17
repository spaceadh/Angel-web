import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

// Re-render every 15 minutes so newly scheduled guides show on the homepage.
export const revalidate = 900;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
