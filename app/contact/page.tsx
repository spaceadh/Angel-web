import type { Metadata } from "next";
import { ContactReplica } from "@/components/contact-replica";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Malaika Studios on WhatsApp or email.",
};

export default function ContactPage() {
  return <ContactReplica />;
}
