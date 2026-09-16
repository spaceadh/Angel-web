import cocktails from "@/assets/work-cocktails.svg";
import beads from "@/assets/work-beads-showcase.svg";
import digitallySly from "@/assets/work-digitally-sly.svg";
import polar from "@/assets/work-polar-showcase.svg";
import type { WorkArtwork } from "@/content/case-studies";

export const workArtwork: Record<WorkArtwork, typeof cocktails> = {
  cocktails,
  beads,
  "digitally-sly": digitallySly,
  polar,
};
