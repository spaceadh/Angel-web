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
  const title = caseStudy.seoTitle
    ? `${caseStudy.title}: ${caseStudy.seoTitle}`
    : `${caseStudy.title} Case Study`;
  return {
    title,
    description: caseStudy.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: caseStudy.description,
      url,
      type: "article",
      images: [
        {
          url: caseStudy.heroMedia.src,
          width: caseStudy.heroMedia.width,
          height: caseStudy.heroMedia.height,
          alt: caseStudy.heroMedia.alt,
        },
      ],
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
          "@graph": [
            {
              "@type": "CreativeWork",
              "@id": `${url}#work`,
              name: `${caseStudy.title} case study`,
              headline: caseStudy.seoTitle
                ? `${caseStudy.title}: ${caseStudy.seoTitle}`
                : caseStudy.title,
              description: caseStudy.description,
              url,
              image: absoluteUrl(
                caseStudy.heroMedia.poster ?? caseStudy.heroMedia.src,
              ),
              creator: { "@id": `${site.url}/#organization` },
              publisher: { "@id": `${site.url}/#organization` },
              about: {
                "@type": "Organization",
                name: caseStudy.title,
              },
              keywords: caseStudy.hero.tags.split(" / ").join(", "),
              inLanguage: "en-KE",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { name: "Home", item: site.url },
                { name: "Our work", item: absoluteUrl("/our-work") },
                { name: caseStudy.title, item: url },
              ].map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                ...crumb,
              })),
            },
          ],
        }}
      />
      <CaseStudyContent caseStudy={caseStudy} />
    </>
  );
}
