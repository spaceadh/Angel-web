UI UPDATES/UPGRADES.

Format:
issue/task - status.

## Version 2 — 2026-06-18

1. Preserve the original `MalaikaWebsite` implementation in its existing folder - Done.
2. Add quiet animated signals to the hero grid - Done.
3. Rotate selected project screenshots while the hero is idle - Done.
4. Pause screenshot rotation when scrolling begins - Done.
5. Preserve the existing scroll-driven image-right / copy-left hero swipe - Done.
6. Use darker terracotta for large CTAs and brighter terracotta for small signals - Done.
7. Add a persistent `Light / After dark` theme control - Done.
8. Replace the literal website screenshot in “Why presence matters” with architectural wayfinding imagery - Done.
9. Add responsive placement for project captions so they do not collide with the Presence block - Done.
10. Verify desktop and mobile layouts, theme switching, screenshot rotation, scroll pause, and preserved swipe behavior - Done.

## Easy-first order

1. Use a white background instead of soft ivory - Done.
2. Center the nav items and make the nav section rounded - Done.
3. Remove or use the empty top-left space in major section headers - Done.
4. Strengthen the "Scroll to explore" cue so it has more teeth - Done.
5. Add hover treatment to the "What should your online presence fix first?" choices that matches the clicked/active state - Done.
6. Remove broad Rotsi mentions, leaving only "Malaika Studios by Rotsi" identity usage - Done.
7. Rework the Malaika Method copy with AIDA logic - Done.
8. Rework Selected Work copy with AIDA logic - Done.
9. Structure Selected Work as animated/staged cards that reveal as the user scrolls - Done.
10. Animate the desktop mouse pointer subtly - Done.
11. Rework the hero section - Done.

## Hero Section

1. Make the "A client magnet studio" text readable - Done.
2. Redo the hero visual with one image instead of unclear stacked images - Done.
3. Fix the large white space below/inside the hero transition shown in `issue-image1.png` - Done.
4. Desktop scroll behavior: image moves right, Malaika text moves left, and the client-magnet text fills the transition space - Done.
5. Mobile scroll behavior: client-magnet text appears in the transition space while the rest stays readable - Done.

## Section Header Space

1. Use the empty top-left area in the "Why presence matters" section shown in `issue-image2.png` - Done.
2. Apply the same treatment to "Client magnet studio" - Done.
3. Apply the same treatment to "Selected work" - Done.

## Verification

1. `pnpm lint` - Done.
2. `pnpm build` - Done.
3. `pnpm typecheck` - Done.
4. Browser visual QA for hero transition and mobile scroll state - Done.
