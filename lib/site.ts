export const site = {
  name: "Malaika Studios",
  url: "https://malaikastudios.rotsi.co.ke",
  description:
    "Malaika Studios is a Nairobi-based digital presence studio building brands, websites, WhatsApp automation and growth systems for businesses in Kenya and around the world.",
  email: "malaikastudios@rotsi.co.ke",
  phone: "+254745474586",
  whatsappUrl: "https://wa.me/254745474586",
  location: "Nairobi, Kenya",
  serviceAreas: ["Nairobi", "Kenya", "East Africa", "Worldwide"],
  social: {
    instagram: "https://www.instagram.com/malaikastudios.ke/",
    x: "https://www.x.com/rotsilabs/",
    linkedin: "https://www.linkedin.com/in/alvin-victor-/",
  },
} as const;

/** Site-wide social card from app/opengraph-image.tsx, for pages that set their own openGraph. */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Malaika Studios — Digital presence studio in Nairobi",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
