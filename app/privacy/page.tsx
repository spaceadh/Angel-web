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
            and advertising tools that use cookies load only after you choose to
            accept them.
          </p>
          <h2>What analytics we use</h2>
          <p>
            Ahrefs Web Analytics counts visits and shows which pages people
            read. It doesn&apos;t use cookies or identify you, so it runs for
            every visitor.
          </p>
          <p>
            Google Analytics also runs for every visitor, but without cookies
            until you accept analytics. Until then it only sends anonymous visit
            counts. If you accept, it can use cookies to tell repeat visits
            apart.
          </p>
          <p>
            Meta Pixel, the Meta Conversions API and Brevo&apos;s website
            tracker help us measure whether our advertising leads to a WhatsApp
            conversation. They load only after you accept, and stop if you
            change your choice to &quot;Only essential&quot;.
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
