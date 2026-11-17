import type { Metadata } from "next";
import Link from "next/link";
import { ToolPage } from "@/components/tools/tool-page";
import { WebsiteCalculator } from "@/components/tools/website-calculator";
import styles from "@/components/tools/tools.module.css";
import { getUsdKesRate, formatKes } from "@/lib/fx";
import { PACKAGES, formatUsd } from "@/lib/pricing";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

export const revalidate = 86400;

const slug = "website-cost-calculator";
const title = "Website Cost Calculator Kenya: Price & Delivery Time";
const description =
  "How much does a website cost in Kenya? Pick your pages and features and see a fixed price in shillings and dollars, what's included and the delivery deadline.";

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

const today = new Date().toISOString().slice(0, 10);

export default async function Page() {
  const fx = await getUsdKesRate();
  const ladder = PACKAGES.website;
  const first = ladder[0];
  const shop = ladder[3];

  const faqs = [
    {
      question: "How much does a website cost in Kenya?",
      answer: `Our websites start at ${formatUsd(first.usd)} (about ${formatKes(first.usd, fx.rate)}) for up to four pages with a WhatsApp button, basic SEO and Google Analytics. Larger sites with bookings, a CRM or an online shop cost more. Every package has a fixed price and a delivery deadline.`,
    },
    {
      question: "How much does an online shop cost?",
      answer: `An online catalogue of up to 50 products, with orders sent to WhatsApp and an admin to edit products and prices, is ${formatUsd(shop.usd)} (about ${formatKes(shop.usd, fx.rate)}). Larger catalogues and custom checkouts are quoted in writing.`,
    },
    {
      question: "What isn't included in the price?",
      answer:
        "Domain and hosting fees, paid tools and subscriptions, ad spend and photography, unless the package lists them. Extra pages or features are quoted before we start them.",
    },
    {
      question: "How long does a website take?",
      answer:
        "Between 10 and 35 working days depending on the package. The clock starts when we have your content (logo, text, photos) and the first payment.",
    },
    {
      question: "Why are prices in US dollars?",
      answer:
        "So the price stays the same if the shilling moves. Clients in Kenya pay in shillings at the exchange rate on the invoice date.",
    },
  ];

  return (
    <ToolPage
      slug={slug}
      kicker="Website cost calculator, Kenya"
      heading="What your website will cost, before you ask."
      lede="Choose the size and what the site should do. You get our fixed price in shillings and dollars, exactly what's included and the delivery deadline."
      faqs={faqs}
      sources={[
        {
          title: "Malaika Studios pricing",
          publisher: "Malaika Studios",
          url: absoluteUrl("/pricing"),
        },
        {
          title: "USD to KES exchange rate (daily)",
          publisher: "open.er-api.com",
          url: "https://open.er-api.com/v6/latest/USD",
          updated: fx.date,
        },
      ]}
      checked={today}
      cta={{
        title: "Want it built, with a deadline?",
        copy: "Every Malaika website has a fixed scope, a fixed price and a delivery date in writing.",
        service: "/services/website-design-development",
        serviceLabel: "See website design",
      }}
      explainer={
        <>
          <h2>Website packages and prices</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Price</th>
                  <th>KSh today</th>
                  <th>Delivery</th>
                </tr>
              </thead>
              <tbody>
                {ladder.map((pkg) => (
                  <tr key={pkg.name}>
                    <td>
                      <strong>{pkg.name}</strong>
                      <br />
                      {pkg.items[0]}
                    </td>
                    <td>{formatUsd(pkg.usd, pkg.from)}</td>
                    <td>
                      {pkg.from ? "From " : ""}
                      {formatKes(pkg.usd, fx.rate)}
                    </td>
                    <td>
                      {pkg.days
                        ? `${pkg.days} working days`
                        : "Agreed in writing"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>What changes the price of a website</h2>
          <ul>
            <li>
              <strong>Number of pages.</strong> Each page needs writing, design
              and SEO.
            </li>
            <li>
              <strong>What the site does.</strong> Bookings, a CRM, an online
              shop or custom features take more building and testing than a
              contact button.
            </li>
            <li>
              <strong>Who edits it.</strong> If you want to update pages or post
              a blog yourself, the site needs an editor (CMS).
            </li>
            <li>
              <strong>Running costs.</strong> Domain (.co.ke or .com) and
              hosting are paid yearly, on top of the build.
            </li>
          </ul>
          <p>
            For the full picture, read{" "}
            <Link href="/blog/how-much-does-a-website-cost-in-kenya">
              how much a website costs in Kenya
            </Link>
            .
          </p>
        </>
      }
    >
      <WebsiteCalculator rate={fx.rate} />
    </ToolPage>
  );
}
