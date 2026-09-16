import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage as CaseStudyContent } from "@/components/work/case-study-page";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const caseStudy = getCaseStudy((await params).slug);
  if (!caseStudy) return {};
  return { title: caseStudy.title, description: caseStudy.description };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const caseStudy = getCaseStudy((await params).slug);
  if (!caseStudy) notFound();
  return <CaseStudyContent caseStudy={caseStudy} />;
}
