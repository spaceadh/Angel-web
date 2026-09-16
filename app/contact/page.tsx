import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Malaika Studios on WhatsApp or email.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
