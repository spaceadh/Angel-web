import type { Metadata } from "next";
import Link from "next/link";
import { ToolPage } from "@/components/tools/tool-page";
import { WhatsappLinkGenerator } from "@/components/tools/whatsapp-link-generator";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

const slug = "whatsapp-link-generator";
const title = "Free WhatsApp Link & QR Code Generator (wa.me) for Kenya";
const description =
  "Create a free WhatsApp click-to-chat link with a pre-typed message and a QR code for your Instagram bio, posters, menus and receipts. Works with Kenyan 07 and 01 numbers.";

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
    question: "How do I create a WhatsApp link for my business?",
    answer:
      "Type your WhatsApp number and, if you like, the first message customers should send. The tool builds a wa.me link such as https://wa.me/254712345678. Anyone who taps it opens a chat with you, without saving your number first.",
  },
  {
    question: "Does it work with the WhatsApp Business app?",
    answer:
      "Yes. The link works for any WhatsApp number, whether it's on WhatsApp, the free WhatsApp Business app or the WhatsApp Business Platform.",
  },
  {
    question: "How do I write my Kenyan number?",
    answer:
      "Type it the way you normally would, for example 0712 345 678 or 0110 123 456. The tool changes it to the international format WhatsApp needs (254712345678). For numbers outside Kenya, start with + and the country code.",
  },
  {
    question: "Where should I use the QR code?",
    answer:
      "Anywhere customers are standing in front of you: the shop counter, menus, receipts, delivery bags, posters, business cards and event banners. Scanning it with a phone camera opens the chat with your message ready to send.",
  },
  {
    question: "Does the link or QR code expire?",
    answer:
      "No. It keeps working as long as the number is on WhatsApp. If you change numbers, make a new one.",
  },
  {
    question: "Do you store my number?",
    answer:
      "No. The link and QR code are made in your browser and nothing you type is sent to us.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug={slug}
      kicker="WhatsApp link and QR code generator"
      heading="One tap from customer to chat."
      lede="Make a free WhatsApp link with a ready-typed message, and a QR code to print. Customers don't need to save your number first."
      faqs={faqs}
      sources={[
        {
          title: "How to use click to chat",
          publisher: "WhatsApp Help Center",
          url: "https://faq.whatsapp.com/5913398998672934",
        },
      ]}
      checked="2026-11-17"
      cta={{
        title: "Turn those chats into orders.",
        copy: "We build websites and WhatsApp flows where every enquiry is answered, logged and followed up, so the link leads to sales, not just messages.",
        service: "/services/whatsapp-email-crm-automation",
        serviceLabel: "See WhatsApp automation",
      }}
      explainer={
        <>
          <h2>Where to put your WhatsApp link</h2>
          <ul>
            <li>
              <strong>Instagram, TikTok and Facebook bio:</strong> people who
              find you on social media can message you in one tap.
            </li>
            <li>
              <strong>Google Business Profile:</strong> use it as the button
              link on your profile posts and offers, so people who find you on
              Maps can message you.
            </li>
            <li>
              <strong>Your website:</strong> on every product and service page,
              with a message that names the product, so you know what they want
              before you reply.
            </li>
            <li>
              <strong>Click-to-WhatsApp ads:</strong> chats that start from an
              ad can be free to reply to for up to 7 days.
            </li>
          </ul>

          <h2>Write a first message that saves you time</h2>
          <p>
            A good starting message tells you what the customer wants before you
            reply. For example, &ldquo;Hi, I&apos;d like to order the large cake
            for Saturday&rdquo; beats &ldquo;Hi&rdquo;. Make a different link
            for each product, poster or ad, and you&apos;ll know which one
            brought the chat.
          </p>
          <p>
            Running WhatsApp on the Business API? See what it costs with our{" "}
            <Link href="/tools/whatsapp-business-api-cost-calculator">
              WhatsApp cost calculator
            </Link>
            .
          </p>
        </>
      }
    >
      <WhatsappLinkGenerator />
    </ToolPage>
  );
}
