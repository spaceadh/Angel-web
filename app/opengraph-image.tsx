import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Malaika Studios — Digital presence studio in Nairobi";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Brands, websites & growth systems for businesses in Kenya.",
  });
}
