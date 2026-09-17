import { beadsWorldAfrica } from "./beads-world-africa";
import { digitallySly } from "./digitally-sly";
import { neighborhoodCocktails } from "./neighborhood-cocktails";
import { polarBison } from "./polar-bison";

export type {
  CaseStudy,
  CaseStudyCard,
  CaseStudyImage,
  WorkArtwork,
} from "./types";

export const caseStudies = [
  neighborhoodCocktails,
  beadsWorldAfrica,
  digitallySly,
  polarBison,
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
