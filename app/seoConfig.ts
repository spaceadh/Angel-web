export const siteUrl = "https://malaikastudios.co.ke";

export const siteName = "Malaika Studios by Rotsi";

export const contactEmail = "business@rotsi.co.ke";

export const serviceArea = ["Nairobi", "Kenya", "East Africa"];

export const coreServices = [
  "Website design and redesign",
  "Digital presence audits",
  "Brand and content direction",
  "Client magnet systems",
  "Inquiry path and follow-up readiness",
];

export const routeMeta = {
  home: {
    title: "Malaika Studios by Rotsi | Website Design in Nairobi & Digital Presence",
    description:
      "Malaika Studios helps growing Kenyan and African businesses build clearer websites, stronger digital presence, and inquiry paths that attract, convert, and retain customers.",
    path: "/",
  },
  services: {
    title: "Website Design, Digital Presence Audits & Client Magnet Systems",
    description:
      "Explore Malaika Studios services for Kenyan businesses: website design, website redesign, digital presence audits, brand direction, inquiry journeys, and client magnet systems.",
    path: "/services",
  },
  pricing: {
    title: "Website Design Prices in Nairobi & Kenya",
    description:
      "Website design prices for Nairobi and Kenyan businesses: checks from KES 15,000, starter pages from KES 45,000, full websites from KES 120,000, and client magnet systems from KES 180,000.",
    path: "/pricing",
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: "Malaika Studios",
    url: siteUrl,
    email: contactEmail,
    areaServed: serviceArea,
    parentOrganization: {
      "@type": "Organization",
      name: "Rotsi",
    },
    slogan: "Creative digital presence for modern businesses",
    description:
      "Malaika Studios is a Nairobi-based client magnet studio helping serious businesses improve website design, digital presence, brand clarity, inquiry journeys, and follow-up-ready customer systems.",
    serviceType: coreServices,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
