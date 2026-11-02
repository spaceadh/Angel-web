import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/service-page";
import { fillPrices, getService, services } from "@/content/services";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const url = absoluteUrl(`/services/${service.slug}`);
  const description = fillPrices(service.description);
  return {
    title: service.seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: service.seoTitle,
      description,
      url,
      type: "website",
      images: [defaultOgImage],
    },
  };
}
export default async function Page({ params }: PageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
