import type { Metadata } from "next";
import ConnectPageContent from "./ConnectPageContent";
import JsonLd from "../../components/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, routeMeta } from "../../seoConfig";
import { connectProjects } from "../../projects/connectProjectData";

export const metadata: Metadata = {
  title: routeMeta.connectAlvin.title,
  description: routeMeta.connectAlvin.description,
  alternates: { canonical: absoluteUrl(routeMeta.connectAlvin.path) },
  openGraph: {
    title: routeMeta.connectAlvin.title,
    description: routeMeta.connectAlvin.description,
    url: absoluteUrl(routeMeta.connectAlvin.path),
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Connect with Alvin | Malaika Studios",
      },
    ],
  },
};

export default function AlvinConnectPage() {
  // Setup local schema markup for SEO
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/connect/alvin#profile"),
    "mainEntity": {
      "@type": "Person",
      "name": "Alvin",
      "jobTitle": "Founder",
      "worksFor": {
        "@type": "ProfessionalService",
        "name": "Malaika Studios",
        "url": absoluteUrl("/")
      },
      "description": "Founder of Malaika Studios, building high-conversion websites and digital growth solutions for growing Kenyan businesses."
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Connect with Alvin", path: "/connect/alvin" },
      ])} />
      <JsonLd data={profileJsonLd} />
      <ConnectPageContent projects={connectProjects} />
    </>
  );
}
