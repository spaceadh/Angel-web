import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/services/service-page";
import { getService, services } from "@/content/services";
import { absoluteUrl } from "@/lib/site";

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
  return {
    title: service.seoTitle,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      title: service.seoTitle,
      description: service.description,
      url,
      type: "website",
    },
  };
}
export default async function Page({ params }: PageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
