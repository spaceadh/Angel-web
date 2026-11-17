"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MatchLink } from "@/components/analytics/tracked-links";
import { trackWhatsappLead } from "@/components/analytics/consent-and-analytics";
import { PACKAGES, formatUsd } from "@/lib/pricing";
import { site } from "@/lib/site";
import { useToolTracking } from "./use-tool-tracking";
import styles from "./tools.module.css";

const LADDER = PACKAGES.website;
/** Index into the website ladder: Launch, Business, Growth, Commerce, Bespoke. */
const [LAUNCH, BUSINESS, GROWTH, COMMERCE, BESPOKE] = [0, 1, 2, 3, 4];

const PAGES = [
  {
    id: "4",
    label: "Up to 4 pages",
    note: "Home, about, services, contact",
    level: LAUNCH,
  },
  {
    id: "7",
    label: "5 to 7 pages",
    note: "A page per service or product line",
    level: BUSINESS,
  },
  {
    id: "12",
    label: "8 to 12 pages",
    note: "Several services, team, FAQ",
    level: GROWTH,
  },
  {
    id: "more",
    label: "More than 12",
    note: "Large or multi-section site",
    level: BESPOKE,
  },
] as const;

const FEATURES = [
  { id: "whatsapp", label: "WhatsApp button or enquiry form", level: LAUNCH },
  {
    id: "google",
    label: "Show on Google Maps and Search Console",
    level: BUSINESS,
  },
  {
    id: "alerts",
    label: "Enquiries sent to WhatsApp and email",
    level: BUSINESS,
  },
  { id: "edit", label: "Edit pages or post a blog yourself", level: GROWTH },
  { id: "booking", label: "Bookings or a step-by-step enquiry", level: GROWTH },
  { id: "crm", label: "Leads saved to a CRM or sheet", level: GROWTH },
  { id: "shop", label: "Sell products online", level: COMMERCE },
  {
    id: "custom",
    label: "Custom feature (quiz, builder, portal)",
    level: BESPOKE,
  },
] as const;

const PRODUCTS = [
  { id: "50", label: "Up to 50 products", level: COMMERCE },
  { id: "more", label: "More than 50", level: BESPOKE },
] as const;

const EXTRAS = [
  {
    id: "seo",
    label: "Local SEO and Google Business Profile",
    pkg: PACKAGES.seo[0],
  },
  { id: "email", label: "Email marketing set up", pkg: PACKAGES.email[0] },
] as const;

function kesFromUsd(usd: number, rate: number) {
  return `KSh ${(Math.round((usd * rate) / 100) * 100).toLocaleString("en-US")}`;
}

export function WebsiteCalculator({ rate }: { rate: number }) {
  const [pages, setPages] = useState<string>("4");
  const [features, setFeatures] = useState<string[]>(["whatsapp"]);
  const [products, setProducts] = useState<string>("50");
  const [extras, setExtras] = useState<string[]>([]);
  const track = useToolTracking("website_cost");

  const hasShop = features.includes("shop");
  const reasons: { level: number; why: string }[] = [
    {
      level: PAGES.find((p) => p.id === pages)!.level,
      why: PAGES.find((p) => p.id === pages)!.label.toLowerCase(),
    },
    ...FEATURES.filter((f) => features.includes(f.id)).map((f) => ({
      level: f.level,
      why: f.label.toLowerCase(),
    })),
    ...(hasShop
      ? [
          {
            level: PRODUCTS.find((p) => p.id === products)!.level,
            why: PRODUCTS.find((p) => p.id === products)!.label.toLowerCase(),
          },
        ]
      : []),
  ];
  const level = Math.max(...reasons.map((r) => r.level));
  const pkg = LADDER[level];
  const driver = reasons.find((r) => r.level === level)?.why;
  const chosenExtras = EXTRAS.filter((e) => extras.includes(e.id));
  const totalUsd = pkg.usd + chosenExtras.reduce((s, e) => s + e.pkg.usd, 0);
  const anyFrom = pkg.from;

  const message = [
    `Hi Malaika, I used the website cost calculator.`,
    `It suggested the ${pkg.name} package (${formatUsd(pkg.usd, pkg.from)}).`,
    `What I need: ${reasons.map((r) => r.why).join(", ")}.`,
    chosenExtras.length
      ? `Also interested in: ${chosenExtras.map((e) => e.label.toLowerCase()).join(", ")}.`
      : "",
  ]
    .filter(Boolean)
    .join(" ");
  const whatsappHref = `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <fieldset className={styles.fieldset}>
          <legend>How big is the site?</legend>
          <div className={styles.options}>
            {PAGES.map((option) => (
              <label className={styles.option} key={option.id}>
                <input
                  type="radio"
                  name="pages"
                  checked={pages === option.id}
                  onChange={() => {
                    track();
                    setPages(option.id);
                  }}
                />
                <span>
                  {option.label}
                  <small>{option.note}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>What should it do?</legend>
          <div className={styles.options}>
            {FEATURES.map((option) => (
              <label className={styles.option} key={option.id}>
                <input
                  type="checkbox"
                  checked={features.includes(option.id)}
                  onChange={() => {
                    track();
                    setFeatures(toggle(features, option.id));
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {hasShop && (
          <fieldset className={styles.fieldset}>
            <legend>How many products?</legend>
            <div className={styles.options}>
              {PRODUCTS.map((option) => (
                <label className={styles.option} key={option.id}>
                  <input
                    type="radio"
                    name="products"
                    checked={products === option.id}
                    onChange={() => {
                      track();
                      setProducts(option.id);
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset className={styles.fieldset}>
          <legend>Anything else?</legend>
          <div className={styles.options}>
            {EXTRAS.map((option) => (
              <label className={styles.option} key={option.id}>
                <input
                  type="checkbox"
                  checked={extras.includes(option.id)}
                  onChange={() => {
                    track();
                    setExtras(toggle(extras, option.id));
                  }}
                />
                <span>
                  {option.label}
                  <small>+ {formatUsd(option.pkg.usd)}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={styles.results} aria-live="polite">
        <div className={styles.headline}>
          <p>Your website: the {pkg.name} package</p>
          <strong>
            {anyFrom ? "From " : ""}
            {kesFromUsd(totalUsd, rate)}
          </strong>
          <p>
            <em>{formatUsd(totalUsd, anyFrom)}</em>
            {pkg.days
              ? `, website delivered in ${pkg.days} working days.`
              : ", deadline agreed in writing."}
          </p>
        </div>

        {hasShop && features.includes("booking") && (
          <p className={styles.note}>
            A shop with bookings as well is usually quoted separately. Send us
            your list and we&apos;ll confirm the price in writing.
          </p>
        )}

        {driver && level > LAUNCH && (
          <p className={styles.hint}>
            You need at least {pkg.name} because of: {driver}.
          </p>
        )}

        <p className={styles.groupTitle}>What&apos;s included</p>
        <ul className={styles.included}>
          {pkg.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {chosenExtras.map((extra) => (
            <li key={extra.id}>
              {extra.pkg.name} ({formatUsd(extra.pkg.usd)}):{" "}
              {extra.pkg.items.slice(0, 2).join(", ").toLowerCase()}
            </li>
          ))}
        </ul>

        <p className={styles.hint}>
          Fixed price and deadline. Domain, hosting, paid tools and photography
          aren&apos;t included. Shillings at {rate.toFixed(2)} per US dollar
          today.
        </p>

        <div className={styles.resultActions}>
          <a
            className={styles.ctaPrimary}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => void trackWhatsappLead("tool_website_cost")}
          >
            <FaWhatsapp /> Send this to us on WhatsApp
          </a>
          <MatchLink
            placement="tool_website_cost"
            className={styles.ctaSecondary}
          >
            Get a detailed estimate
          </MatchLink>
        </div>
      </div>
    </div>
  );
}
