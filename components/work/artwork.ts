import cocktails from "@/assets/neighbourhood-landing-page.png";
import beads from "@/assets/beads-world-africa-logo.png";
import digitallySly from "@/assets/work-digitally-sly.svg";
import polar from "@/assets/work-polar-showcase.svg";
import type { WorkArtwork } from "@/content/case-studies";

export const workArtwork: Record<WorkArtwork, typeof cocktails> = {
  cocktails,
  beads,
  "digitally-sly": digitallySly,
  polar,
};
