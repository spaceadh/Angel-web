import type { Metadata } from "next";
import { MpesaCalculator } from "@/components/tools/mpesa-calculator";
import { ToolPage } from "@/components/tools/tool-page";
import styles from "@/components/tools/tools.module.css";
import { MPESA_CHECKED, MPESA_SOURCE } from "@/lib/tools/mpesa";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

const slug = "mpesa-charges-calculator";
const title = "M-Pesa Charges Calculator 2026: Till, Pochi & Send Money";
const description =
  "Type an amount and see the M-Pesa charge on a Buy Goods Till, Pochi la Biashara, send money and withdrawal, and what your business keeps. Safaricom's current tariffs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(`/tools/${slug}`) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(`/tools/${slug}`),
    type: "website",
    images: [defaultOgImage],
  },
};

const faqs = [
  {
    question: "How much does Safaricom charge a business on a Till?",
    answer:
      "Payments of KSh 500 or less into a Lipa na M-Pesa Buy Goods Till are free for the business. From KSh 501 to KSh 36,363 the business pays 0.55% of the payment, and above KSh 36,363 the charge is a flat KSh 200. The customer pays nothing, except at authorised fuel stations where the customer pays.",
  },
  {
    question: "Is a Till cheaper than Pochi la Biashara?",
    answer:
      "It depends on who you want to pay the fee. On a Till the business pays 0.55% of payments above KSh 500. On Pochi la Biashara the customer pays the charge and the business receives the full amount. For a KSh 2,500 sale, the Till costs the business KSh 13.75, while the customer would pay KSh 33 to send it to a Pochi.",
  },
  {
    question: "Should customers pay my business on my personal M-Pesa number?",
    answer:
      "It works, but the customer pays the send-money charge (KSh 33 on KSh 2,500, for example), and business and personal money end up in one account. A Till or Pochi la Biashara keeps sales separate, gives you statements for KRA and looks more professional.",
  },
  {
    question: "What does it cost to move money out of a Till?",
    answer:
      "A Business Till paying a mobile number costs between KSh 4 and KSh 54 depending on the amount, and paying a Paybill costs between KSh 3 and KSh 54. Payments of KSh 100 or less are free.",
  },
  {
    question: "What about Paybill charges?",
    answer:
      "Paybill charges depend on the tariff your Paybill is on (for example Business Bouquet or Customer Bouquet), and on whether the business or the customer pays. Your Paybill agreement with Safaricom shows which applies. This calculator covers Till, Pochi la Biashara and personal transfers.",
  },
  {
    question: "Can my website take M-Pesa payments?",
    answer:
      "Yes. A website can show your Till or Paybill with clear steps, or connect to Safaricom's M-Pesa API so the payment prompt appears on the customer's phone and the order is marked paid automatically.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug={slug}
      kicker="M-Pesa charges calculator"
      heading="What every M-Pesa sale really costs you."
      lede="Type one payment amount. See what Safaricom charges on a Till, a Pochi la Biashara or your personal line, what you keep, and what moving the money on costs."
      faqs={faqs}
      sources={[MPESA_SOURCE]}
      checked={MPESA_CHECKED}
      cta={{
        title: "Take M-Pesa on your website.",
        copy: "We build shops and booking sites where customers pay by M-Pesa and the order is recorded, confirmed and sent to your team automatically.",
        service: "/services/ecommerce-website-kenya",
        serviceLabel: "See e-commerce websites",
      }}
      explainer={
        <>
          <h2>How M-Pesa charges work for a business</h2>
          <p>
            Who pays the fee depends on how the customer pays you. On a{" "}
            <strong>Lipa na M-Pesa Buy Goods Till</strong>, the business pays
            and the customer pays nothing. On <strong>Pochi la Biashara</strong>{" "}
            and on a personal number, the customer pays the charge and you
            receive the full amount.
          </p>

          <h2>Buy Goods Till charges for the merchant</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Payment (KSh)</th>
                  <th>Customer pays</th>
                  <th>Business pays</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 – 500</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>501 – 36,363</td>
                  <td>0</td>
                  <td>0.55%</td>
                </tr>
                <tr>
                  <td>Above 36,363</td>
                  <td>0</td>
                  <td>KSh 200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            At authorised fuel stations the customer pays the charge instead.
          </p>

          <h2>Which one should your business use?</h2>
          <ul>
            <li>
              <strong>Most sales under KSh 500:</strong> a Till costs you
              nothing and costs the customer nothing.
            </li>
            <li>
              <strong>You want the customer to carry the fee:</strong> Pochi la
              Biashara works from your own line. Safaricom lists its current
              Pochi rates as an offer from 1 August 2026, so check them again
              before you rely on them.
            </li>
            <li>
              <strong>You sell online:</strong> a Till or Paybill connected to
              your website lets customers pay without typing your number, and
              each payment is matched to its order.
            </li>
          </ul>
        </>
      }
    >
      <MpesaCalculator />
    </ToolPage>
  );
}
