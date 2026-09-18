import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage as CaseStudyContent } from "@/components/work/case-study-page";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { absoluteUrl, site } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const caseStudy = getCaseStudy((await params).slug);
  if (!caseStudy) return {};
  const url = absoluteUrl(`/our-work/work/${caseStudy.slug}`);
  return {
    title: `${caseStudy.title} Case Study`,
    description: caseStudy.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${caseStudy.title} Case Study`,
      description: caseStudy.description,
      url,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const caseStudy = getCaseStudy((await params).slug);
  if (!caseStudy) notFound();
  const url = absoluteUrl(`/our-work/work/${caseStudy.slug}`);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            {
              "@type": "ListItem",
              position: 2,
              name: "Our work",
              item: absoluteUrl("/our-work"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: caseStudy.title,
              item: url,
            },
          ],
        }}
      />
      <CaseStudyContent caseStudy={caseStudy} />
    </>
  );
}
