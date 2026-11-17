"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { FaCopy, FaDownload, FaWhatsapp } from "react-icons/fa6";
import { toWhatsappNumber, whatsappLink } from "@/lib/tools/whatsapp-link";
import {
  trackEvent,
  getPageContext,
} from "@/components/analytics/consent-and-analytics";
import { useToolTracking } from "./use-tool-tracking";
import styles from "./tools.module.css";

const TEMPLATES = [
  { label: "Order", text: "Hi! I saw your post and I'd like to order." },
  { label: "Booking", text: "Hello, I'd like to book an appointment." },
  {
    label: "Price check",
    text: "Hi, is this still available? What's the price?",
  },
  { label: "Quote", text: "Hello, I'd like a quote, please." },
];

const QR_OPTIONS = {
  errorCorrectionLevel: "M" as const,
  margin: 2,
  color: { dark: "#101b1b", light: "#ffffff" },
};

export function WhatsappLinkGenerator() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(TEMPLATES[0].text);
  const [svg, setSvg] = useState("");
  const [copied, setCopied] = useState(false);
  const track = useToolTracking("whatsapp_link_generator");

  const number = toWhatsappNumber(phone);
  const link = number ? whatsappLink(number, message) : "";
  const showError = phone.replace(/\D/g, "").length >= 9 && !number;

  useEffect(() => {
    let cancelled = false;
    if (!link) return;
    QRCode.toString(link, { ...QR_OPTIONS, type: "svg" }).then((markup) => {
      if (!cancelled) setSvg(markup);
    });
    return () => {
      cancelled = true;
    };
  }, [link]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      trackEvent("tool_output", {
        ...getPageContext(),
        tool_name: "whatsapp_link_generator",
        output: "copy",
      });
    } catch {
      // Clipboard blocked: the link is still selectable in the field.
    }
  };

  const downloadPng = async () => {
    const url = await QRCode.toDataURL(link, { ...QR_OPTIONS, width: 1024 });
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-qr-${number}.png`;
    a.click();
    trackEvent("tool_output", {
      ...getPageContext(),
      tool_name: "whatsapp_link_generator",
      output: "qr_png",
    });
  };

  const downloadSvg = () => {
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-qr-${number}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("tool_output", {
      ...getPageContext(),
      tool_name: "whatsapp_link_generator",
      output: "qr_svg",
    });
  };

  return (
    <div className={styles.calc}>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label htmlFor="wa-phone">Your WhatsApp number</label>
          <input
            id="wa-phone"
            className={styles.numberInput}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0712 345 678"
            value={phone}
            aria-describedby="wa-phone-hint"
            aria-invalid={showError}
            onChange={(event) => {
              track();
              setPhone(event.target.value);
            }}
          />
          <p className={styles.hint} id="wa-phone-hint">
            Kenyan numbers work as 07…, 01… or +254…. Outside Kenya, start with
            + and the country code.
          </p>
          {showError && (
            <p className={styles.error} role="alert">
              That doesn&apos;t look like a full phone number yet.
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="wa-message">Message the customer starts with</label>
          <textarea
            id="wa-message"
            className={`${styles.numberInput} ${styles.textarea}`}
            rows={4}
            maxLength={500}
            value={message}
            onChange={(event) => {
              track();
              setMessage(event.target.value);
            }}
          />
          <p className={styles.hint}>
            Optional. It appears in their chat box, ready to send, and they can
            edit it.
          </p>
          <div className={styles.quick}>
            {TEMPLATES.map((template) => (
              <button
                type="button"
                key={template.label}
                className={styles.chip}
                aria-pressed={message === template.text}
                onClick={() => {
                  track();
                  setMessage(template.text);
                }}
              >
                {template.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.results} aria-live="polite">
        {link ? (
          <>
            <div className={styles.field}>
              <label htmlFor="wa-link">Your WhatsApp link</label>
              <input
                id="wa-link"
                className={styles.numberInput}
                readOnly
                value={link}
                onFocus={(event) => event.currentTarget.select()}
              />
            </div>
            <div className={styles.resultActions}>
              <button
                type="button"
                className={styles.ctaPrimary}
                onClick={copy}
              >
                <FaCopy /> {copied ? "Copied" : "Copy link"}
              </button>
              <a
                className={styles.ctaSecondary}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Test it
              </a>
            </div>

            <p className={styles.groupTitle}>QR code</p>
            {svg && (
              <div
                className={styles.qr}
                role="img"
                aria-label={`QR code that opens a WhatsApp chat with +${number}`}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            )}
            <div className={styles.resultActions}>
              <button
                type="button"
                className={styles.ctaSecondary}
                onClick={downloadPng}
              >
                <FaDownload /> PNG for print
              </button>
              <button
                type="button"
                className={styles.ctaSecondary}
                onClick={downloadSvg}
              >
                <FaDownload /> SVG for designers
              </button>
            </div>
            <p className={styles.hint}>
              Everything is made in your browser. We don&apos;t see or store
              your number.
            </p>
          </>
        ) : (
          <div className={styles.headline}>
            <p>Type your number to get</p>
            <strong>A link and a QR code</strong>
            <p>
              Put it in your Instagram bio, on receipts, menus, posters and your
              shop counter. <em>Free, no sign-up.</em>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
