"use client";

import { useState } from "react";
import {
  FREE_SERVICE_MESSAGES,
  WHATSAPP_RATES,
  whatsappCost,
  type WhatsappVolumes,
} from "@/lib/tools/whatsapp";
import { kes, useToolTracking } from "./use-tool-tracking";
import styles from "./tools.module.css";

const FIELDS: {
  key: keyof WhatsappVolumes;
  label: string;
  hint: string;
}[] = [
  {
    key: "service",
    label: "Replies to customers who message you",
    hint: `Answers within 24 hours of the customer's last message. The first ${FREE_SERVICE_MESSAGES.toLocaleString("en-US")} a month are free.`,
  },
  {
    key: "utility",
    label: "Order and booking updates",
    hint: "Templates such as order confirmed, out for delivery, appointment reminders.",
  },
  {
    key: "marketing",
    label: "Promotions and broadcasts",
    hint: "Offers, new stock, newsletters and win-back messages.",
  },
  {
    key: "authentication",
    label: "Login and verification codes",
    hint: "One-time passwords for accounts or payments.",
  },
];

const PRESETS: { label: string; volumes: WhatsappVolumes }[] = [
  {
    label: "Small shop",
    volumes: {
      service: 1_500,
      utility: 300,
      marketing: 500,
      authentication: 0,
    },
  },
  {
    label: "Busy restaurant",
    volumes: {
      service: 5_000,
      utility: 2_000,
      marketing: 2_000,
      authentication: 0,
    },
  },
  {
    label: "Online store",
    volumes: {
      service: 8_000,
      utility: 6_000,
      marketing: 10_000,
      authentication: 1_000,
    },
  },
];

const LABELS: Record<keyof WhatsappVolumes, string> = {
  service: "Customer replies",
  utility: "Order and booking updates",
  marketing: "Promotions",
  authentication: "Verification codes",
};

function parse(value: string) {
  const number = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(number) ? Math.min(number, 10_000_000) : 0;
}

const format = (value: number) => value.toLocaleString("en-US");

export function WhatsappCalculator({
  rate,
  rateDate,
}: {
  rate: number;
  rateDate: string;
}) {
  const [raw, setRaw] = useState<Record<keyof WhatsappVolumes, string>>({
    service: "1,500",
    utility: "300",
    marketing: "500",
    authentication: "0",
  });
  const track = useToolTracking("whatsapp_api_cost");

  const volumes: WhatsappVolumes = {
    service: parse(raw.service),
    utility: parse(raw.utility),
    marketing: parse(raw.marketing),
    authentication: parse(raw.authentication),
  };
  const { lines, usd } = whatsappCost(volumes);
  const totalKes = Math.round(usd * rate);
  const free = Math.min(volumes.service, FREE_SERVICE_MESSAGES);
  const biggest = [...lines].sort((a, b) => b.usd - a.usd)[0];

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <span className={styles.hint}>Start from an example</span>
          <div className={styles.quick}>
            {PRESETS.map((preset) => (
              <button
                type="button"
                key={preset.label}
                className={styles.chip}
                onClick={() => {
                  track();
                  setRaw({
                    service: format(preset.volumes.service),
                    utility: format(preset.volumes.utility),
                    marketing: format(preset.volumes.marketing),
                    authentication: format(preset.volumes.authentication),
                  });
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        {FIELDS.map((field) => (
          <div className={styles.field} key={field.key}>
            <label htmlFor={`wa-${field.key}`}>{field.label}</label>
            <input
              id={`wa-${field.key}`}
              className={styles.numberInput}
              inputMode="numeric"
              autoComplete="off"
              value={raw[field.key]}
              aria-describedby={`wa-${field.key}-hint`}
              onChange={(event) => {
                track();
                setRaw({ ...raw, [field.key]: event.target.value });
              }}
              onBlur={() =>
                setRaw({ ...raw, [field.key]: format(volumes[field.key]) })
              }
            />
            <p className={styles.hint} id={`wa-${field.key}-hint`}>
              {field.hint} Messages a month.
            </p>
          </div>
        ))}
      </div>

      <div className={styles.results} aria-live="polite">
        <div className={styles.headline}>
          <p>Your WhatsApp bill from Meta, a month</p>
          <strong>KSh {totalKes.toLocaleString("en-US")}</strong>
          <p>
            About <em>USD {usd.toFixed(2)}</em>
            {free > 0 && <>, after {format(free)} free replies</>}.
          </p>
        </div>

        <ul className={styles.rows}>
          {lines.map((line) => (
            <li key={line.key}>
              <span>{LABELS[line.key]}</span>
              <strong>{kes(Math.round(line.usd * rate))}</strong>
              <small>
                {line.key === "service" && line.messages > line.billable
                  ? `${format(line.messages)} messages, ${format(line.billable)} charged`
                  : `${format(line.messages)} messages`}{" "}
                × {kes(Math.round(WHATSAPP_RATES[line.key] * rate * 100) / 100)}{" "}
                each
              </small>
            </li>
          ))}
        </ul>

        {biggest && biggest.usd > 0 && biggest.key === "marketing" && (
          <p className={styles.note}>
            Promotions are most of this bill. Each one costs about 5½ times a
            reply, so send them to customers who opted in and segment the list
            rather than broadcasting to everyone.
          </p>
        )}
        <p className={styles.hint}>
          Meta&apos;s charges only, at {rate.toFixed(2)} KSh per US dollar (
          {rateDate}). Your WhatsApp provider may add its own fee. Chats started
          from a Click-to-WhatsApp ad can be free for up to 7 days, which this
          estimate doesn&apos;t subtract.
        </p>
      </div>
    </div>
  );
}
