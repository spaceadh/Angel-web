import type { Metadata } from "next";
import Link from "next/link";
import { ToolPage } from "@/components/tools/tool-page";
import { WhatsappCalculator } from "@/components/tools/whatsapp-calculator";
import styles from "@/components/tools/tools.module.css";
import { getUsdKesRate } from "@/lib/fx";
import {
  FREE_SERVICE_MESSAGES,
  WHATSAPP_CHECKED,
  WHATSAPP_RATES,
  WHATSAPP_SOURCE,
} from "@/lib/tools/whatsapp";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

// The shilling rate refreshes daily.
export const revalidate = 86400;

const slug = "whatsapp-business-api-cost-calculator";
const title = "WhatsApp Business API Cost Calculator for Kenya (KSh)";
const description =
  "Work out your monthly WhatsApp Business API bill in shillings: replies, order updates, promotions and codes, at Meta's current rates for Kenya.";

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

export default async function Page() {
  const fx = await getUsdKesRate();
  const ksh = (usd: number) => `KSh ${(usd * fx.rate).toFixed(2)}`;
  const marketing = ksh(WHATSAPP_RATES.marketing);
  const reply = ksh(WHATSAPP_RATES.service);

  const faqs = [
    {
      question: "How much does the WhatsApp Business API cost in Kenya?",
      answer: `Meta charges per message delivered. At its rates for Kenya, a promotional message costs USD ${WHATSAPP_RATES.marketing} (about ${marketing}), and an order update, verification code or reply to a customer costs USD ${WHATSAPP_RATES.service} (about ${reply}). The first ${FREE_SERVICE_MESSAGES.toLocaleString("en-US")} replies to customers each month are free.`,
    },
    {
      question: "Is the WhatsApp Business app free?",
      answer:
        "Yes. The free WhatsApp Business app on your phone has no per-message charges. The charges apply to the WhatsApp Business Platform (the API), which you need for automation, chatbots, several team members on one number or a connection to a CRM.",
    },
    {
      question: "Are replies to customers free?",
      answer: `Each business number gets ${FREE_SERVICE_MESSAGES.toLocaleString("en-US")} free replies a month, sent within 24 hours of the customer's last message. After that each reply is charged at the service rate. Since 1 October 2026, order updates sent during that window are also charged.`,
    },
    {
      question: "Why is my bill higher than this estimate?",
      answer:
        "Most businesses use the API through a provider (a WhatsApp inbox, chatbot or CRM tool), and many add a monthly subscription or a markup per message on top of Meta's rate. Meta's AI agent messages are also billed separately. Ask your provider for their own fees.",
    },
    {
      question: "How can I keep WhatsApp costs down?",
      answer:
        "Answer within the 24-hour window, send promotions only to customers who opted in, segment your list instead of broadcasting to everyone, and run Click-to-WhatsApp ads, because conversations they start can be free for up to 7 days.",
    },
  ];

  return (
    <ToolPage
      slug={slug}
      kicker="WhatsApp Business API cost calculator"
      heading="What WhatsApp will cost your business each month."
      lede="Enter roughly how many messages you send a month. See Meta's charge in shillings for each type of message, and where the money goes."
      faqs={faqs}
      sources={[WHATSAPP_SOURCE]}
      checked={WHATSAPP_CHECKED}
      cta={{
        title: "Automate WhatsApp without a surprise bill.",
        copy: "We set up WhatsApp replies, order updates and follow-ups linked to your website and customer list, and choose message types that keep costs low.",
        service: "/services/whatsapp-email-crm-automation",
        serviceLabel: "See WhatsApp automation",
      }}
      explainer={
        <>
          <h2>WhatsApp message rates for Kenya</h2>
          <p>
            Meta bills Kenya at its &ldquo;Rest of Africa&rdquo; rates. Prices
            are per message, in US dollars, shown here in shillings at{" "}
            {fx.rate.toFixed(2)} KSh per dollar.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Message type</th>
                  <th>USD</th>
                  <th>KSh (approx.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Marketing (promotions, broadcasts)</td>
                  <td>{WHATSAPP_RATES.marketing}</td>
                  <td>{marketing}</td>
                </tr>
                <tr>
                  <td>Utility (order and booking updates)</td>
                  <td>{WHATSAPP_RATES.utility}</td>
                  <td>{ksh(WHATSAPP_RATES.utility)}</td>
                </tr>
                <tr>
                  <td>Authentication (codes)</td>
                  <td>{WHATSAPP_RATES.authentication}</td>
                  <td>{ksh(WHATSAPP_RATES.authentication)}</td>
                </tr>
                <tr>
                  <td>
                    Service (replies; first{" "}
                    {FREE_SERVICE_MESSAGES.toLocaleString("en-US")} a month
                    free)
                  </td>
                  <td>{WHATSAPP_RATES.service}</td>
                  <td>{reply}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>App or API: which do you need?</h2>
          <ul>
            <li>
              <strong>WhatsApp Business app:</strong> free, on one phone, best
              when one or two people answer by hand.
            </li>
            <li>
              <strong>WhatsApp Business Platform (API):</strong> charged per
              message, needed for automatic replies, chatbots, a shared team
              inbox, order updates from your website and links to a CRM.
            </li>
          </ul>
          <p>
            Read more in our guide to{" "}
            <Link href="/blog/whatsapp-fees-cost-kenyan-businesses">
              what WhatsApp&apos;s new fees cost Kenyan businesses
            </Link>
            .
          </p>
        </>
      }
    >
      <WhatsappCalculator rate={fx.rate} rateDate={fx.date} />
    </ToolPage>
  );
}
