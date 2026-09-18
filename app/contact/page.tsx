import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Malaika Studios",
  description:
    "Talk to Malaika Studios about a website, brand, automation or growth project in Nairobi or remotely.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
