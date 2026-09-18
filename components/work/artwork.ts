import cocktails from "@/assets/neighbourhood-cocktails/neighbourhood-landing-page.png";
import beads from "@/assets/beads-world/beads-world-africa-logo.png";
import digitallySly from "@/assets/digitally-sly/digitaly-sly-logo.png";
import polar from "@/assets/polarbison/StackedLogowithtagline-Orange-Black.png";
import type { WorkArtwork } from "@/content/case-studies";

export const workArtwork: Record<WorkArtwork, typeof cocktails> = {
  cocktails,
  beads,
  "digitally-sly": digitallySly,
  polar,
};
