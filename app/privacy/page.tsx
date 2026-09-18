import type { Metadata } from "next";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "How Malaika Studios handles website analytics and marketing consent.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <HomeNavigation />
      <main className="legalPage">
        <div>
          <p className="legalKicker">Malaika Studios</p>
          <h1>Privacy & cookie policy</h1>
          <p>
            We use essential technology to run this website. Optional analytics
            and advertising tools load only after you choose to accept them.
          </p>
          <h2>What optional analytics does</h2>
          <p>
            With consent, Google Analytics helps us understand aggregate site
            use. Meta Pixel and the Meta Conversions API help us measure whether
            Meta advertising leads to a WhatsApp conversation. We do not use
            these tools before consent.
          </p>
          <h2>Your choices</h2>
          <p>
            You can accept or refuse optional analytics from the cookie notice.
            To change an earlier choice, use the “Cookie settings” control in
            the footer. You can also contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Contact</h2>
          <p>
            For privacy questions, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
