import { beadsWorldAfrica } from "./beads-world-africa";
import { digitallySly } from "./digitally-sly";
import { neighborhoodCocktails } from "./neighborhood-cocktails";

export type {
  CaseStudy,
  CaseStudyCard,
  CaseStudyImage,
  CaseStudyMedia,
  CaseStudyResult,
  WorkArtwork,
} from "./types";

export const caseStudies = [
  neighborhoodCocktails,
  beadsWorldAfrica,
  digitallySly,
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
