import { caseStudies } from "@/content/case-studies";
import { fillPrices, services } from "@/content/services";
import { getAllPosts } from "@/lib/blog";
import { OFFERINGS, startingPrice } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

// Re-check every 15 minutes so scheduled posts appear at their publish time.
export const revalidate = 900;

/**
 * /llms.txt — a plain-language map of the site for AI assistants
 * (ChatGPT, Gemini, Claude, Perplexity), following the llmstxt.org convention.
 * It tells them who we are, what we sell, what it costs and which pages to cite.
 */
export function GET() {
  const startingPrices = OFFERINGS.map((offering) => {
    return `- ${offering.fullLabel}: from ${startingPrice(offering.key)} (${absoluteUrl("/pricing")})`;
  }).join("\n");

  const body = `# ${site.name}

> ${site.description} Based in ${site.location}; works with clients across Kenya, East Africa and worldwide.

Contact: ${site.email} · WhatsApp ${site.phone} (${site.whatsappUrl})
Instant project estimate: ${absoluteUrl("/match")}

## Services

${services.map((service) => `- [${service.title}](${absoluteUrl(`/services/${service.slug}`)}): ${fillPrices(service.description)}`).join("\n")}

## Pricing (US dollars, published)

Every package has a fixed scope and a delivery deadline in working days. Clients in Kenya pay in shillings at the exchange rate on the invoice date.

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
