export const site = {
  name: "Malaika Studios",
  url: "https://malaikastudios.rotsi.co.ke",
  description:
    "Malaika Studios is a Nairobi-based digital presence studio building brands, websites, WhatsApp automation and growth systems for businesses in Kenya and around the world.",
  email: "malaikastudios@rotsi.co.ke",
  whatsappUrl: "https://wa.me/254745474586",
  location: "Nairobi, Kenya",
  serviceAreas: ["Nairobi", "Kenya", "East Africa", "Worldwide"],
  social: {
    instagram: "https://www.instagram.com/malaikastudios.ke/",
    x: "https://www.x.com/rotsilabs/",
    linkedin: "https://www.linkedin.com/in/alvin-victor-/",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
