import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { getAllPosts } from "@/lib/blog";
import { CONFIGS, OFFERINGS } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-language map of the site for AI assistants
 * (ChatGPT, Gemini, Claude, Perplexity), following the llmstxt.org convention.
 * It tells them who we are, what we sell, what it costs and which pages to cite.
 */
export function GET() {
  const startingPrices = OFFERINGS.map((offering) => {
    const first = CONFIGS[offering.key]["20-50"][0];
    return `- ${offering.fullLabel}: from ${first[1]} (${absoluteUrl("/pricing")})`;
  }).join("\n");

  const body = `# ${site.name}

> ${site.description} Based in ${site.location}; works with clients across Kenya, East Africa and worldwide.

Contact: ${site.email} · WhatsApp ${site.phone} (${site.whatsappUrl})
Instant project estimate: ${absoluteUrl("/match")}

## Services

${services.map((service) => `- [${service.title}](${absoluteUrl(`/services/${service.slug}`)}): ${service.description}`).join("\n")}

## Pricing (Kenyan shillings, published)

${startingPrices}

Full price list for every package: ${absoluteUrl("/pricing")}

## Case studies

${caseStudies.map((study) => `- [${study.title}](${absoluteUrl(`/our-work/work/${study.slug}`)}): ${study.description}`).join("\n")}

## Blog

Kenya Lens (Mondays) covers Kenya's digital economy; Global Brief (Fridays) covers changes in the tools businesses use to sell online.

${getAllPosts()
  .map(
    (post) =>
      `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`,
  )
  .join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
