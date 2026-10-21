# Malaika Studios editorial standard

This is the brief for every recurring post, whether a person or an automated job writes it. A post is publishable only when it passes `pnpm blog:check` **and** scores at least 32/40 on the vetting rubric below.

## The two series

Both series stay on our beat: **the digital tools, platforms and channels behind our services** (websites, branding, email marketing, WhatsApp and CRM automation, SEO, analytics and social content), and what changes in them mean for businesses. Macro-economics (fuel, interest rates, trade) only appears where it directly changes how businesses market or sell online.

|                     | Kenya Lens                                                         | Global Brief                                                                                   |
| ------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Day                 | Monday, 06:00 EAT                                                  | Friday, 06:00 EAT                                                                              |
| `series:`           | `kenya-lens`                                                       | `global-brief`                                                                                 |
| Shape               | One Kenyan digital-economy story, explored in depth with data      | The week's top 4–6 platform and tool moves, plus quick notable mentions                        |
| Question it answers | "What is changing online in Kenya, and what should a business do?" | "What changed this week in the tools businesses use to sell online, and what should Kenya do?" |
| Length              | 900–1,800 words                                                    | 1,100–2,400 words                                                                              |
| Visuals             | At least 1 chart (ideally a trend over 6+ periods)                 | At least 1 chart plus 1 more chart or comparison table                                         |
| Sources             | At least 3, mostly primary                                         | At least 8, with the company's own announcement for every main story                           |
| Reader              | Kenyan business owner or marketing lead                            | Same                                                                                           |

### Kenya Lens structure

1. **Opening (2–3 sentences):** the finding, with its number, and why a business owner should care.
2. **Key chart** directly after the opening.
3. **What the data says** (`##`): the facts, definitions and limits. Say what the number measures and what it doesn't.
4. **Why it's happening** (`##`): causes stated by the source or by credible analysts, attributed.
5. **What it means for your business** (`##`): 3–5 concrete, practical actions. Label this as analysis.
6. **FAQ** (`###` questions): 2–3 questions people actually search for.
7. **Close:** one line linking to a relevant service, `/pricing` or `/match?source=blog_<slug>`.

Topic sources: CA quarterly statistics (devices, data, mobile money), CBK mobile payments, KNBS ICT data, Safaricom/Airtel results and product launches, M-Pesa/Daraja developer changes, Kenyan e-commerce and delivery platforms, Data Protection Commissioner rulings, KRA eTIMS and digital-tax changes, ICT Ministry and Konza policy, local tech funding and closures.

### Global Brief beats

Pick the week's most important stories from these beats. Aim for variety: no more than two main stories from one beat.

| Beat                     | Companies and topics to watch                                                                                       | Our service it connects to         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Email marketing          | Mailchimp, Klaviyo, HubSpot, Brevo, Kit, beehiiv, MailerLite; Gmail, Yahoo and Outlook sender rules; deliverability | Email marketing                    |
| Messaging and automation | WhatsApp Business app and API (pricing, AI agents), RCS, Zapier, Make, n8n, Zoho, Salesforce                        | WhatsApp, email and CRM automation |
| Websites and e-commerce  | Shopify, WordPress, Wix, Squarespace, Webflow, Framer, Vercel, Cloudflare, WooCommerce                              | Website design and development     |
| Search                   | Google Search updates and AI Mode, Search Console, Bing, ChatGPT search, Perplexity                                 | SEO                                |
| Social and ads           | Meta (Instagram, Facebook, Meta AI ads), TikTok, LinkedIn, YouTube, X                                               | Social content, growth             |
| AI tools                 | OpenAI, Google Gemini, Anthropic, Canva, Adobe, CapCut                                                              | All services                       |
| Analytics and privacy    | Google Analytics 4, consent rules, Kenya ODPC                                                                       | Growth and analytics               |
| Africa tech              | Platform moves into or out of Africa, payments (M-Pesa, Paystack, Flutterwave), big-tech programmes and closures    | Context for all                    |

### Global Brief structure

1. **Opening (2–3 sentences):** the theme that ties the week together, plus the key stat.
2. **The week at a glance:** one bullet per main story, with company name first.
3. **One `##` section per main story (4–6)**, each with:
   - **What changed:** the facts from the company's own announcement, with dates, prices, limits and availability.
   - **Status:** _launched_, _rolling out_, _beta_, _announced_ or _in effect from…_, plus whether it reaches Kenya.
   - **What it means for Kenyan businesses:** the practical effect on cost, workflow or reach, labelled as our view.
4. **Notable mentions** (`##`): 3–5 one-line items, each linked to its source.
5. **What to do this week** (`##`): 2–3 concrete actions drawn from the stories.
6. **Close:** one line, with a link to the relevant service or `/match?source=blog_<slug>`.

## Research rules

1. **Primary first.** Prefer the original publisher (CBK, CA, KNBS, IMF, a company's own announcement) over coverage of it. Use reputable outlets (Reuters, AP, FT, Bloomberg, BBC, Business Daily, The EastAfrican, Nation) for context and confirmation.
2. **Every number has a source** listed in `sources:` and linked where it's used. No estimating, interpolating or rounding beyond what the source shows, except where stated ("about 52 million").
3. **Check revisions.** Statistical agencies revise. Use the latest published figure and say if it changed.
4. **Separate fact from analysis.** Use "CA reports…" for facts and "Our view:" or "This could…" for analysis. Don't predict with false certainty.
5. **Define the measure.** For example, device connections are not people, and subscriptions are not users.
6. **Date everything.** "As at June 2026" beats "currently".
7. **Quotes** stay under 15 words and are attributed. Paraphrase otherwise.
8. **No fabrication.** No invented case studies, client results, quotes or URLs. If you can't verify something, leave it out.
9. **Set `factChecked`** to the date you last verified every figure.

## Writing rules

- Plain, confident English. Short sentences (aim for under 25 words, never over 35).
- Lead with the point. One idea per paragraph.
- Avoid generic phrasing (the checker flags common offenders such as "delve", "game-changer" and "in today's fast-paced…").
- Hedge once, where it matters. A careful caveat is good, but repeated disclaimers make a post hard to read.
- Kenyan context by default: KSh (write `KSh 1,250`), Kenyan place names, local examples.
- Every post must answer "so what?" for a business reader.

## Charts

Write charts as data in a fenced `chart` block. They render as on-brand, responsive charts with an accessible data table, so no image editing is needed.

````markdown
```chart
{
  "type": "column",
  "title": "Kenya's connected smartphones keep climbing",
  "subtitle": "Smartphones connected to mobile networks, millions, quarter ending",
  "source": "Communications Authority of Kenya, quarterly sector statistics",
  "note": "Device connections, not unique users.",
  "format": { "suffix": "m", "decimals": 1 },
  "data": [
    { "label": "Jun 2025", "value": 43.8 },
    { "label": "Jun 2026", "value": 52.3, "highlight": true }
  ]
}
```
````

| Type     | Use for                                      | Data shape                                                                   |
| -------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| `column` | Up to ~12 periods, e.g. quarters             | `data: [{ label, value, display?, highlight? }]`                             |
| `bar`    | Comparing categories, e.g. export markets    | same as `column`                                                             |
| `line`   | Longer or multiple time series, e.g. KES/USD | `labels: [...]`, `series: [{ name, values: [...] }]`, optional `yMin`/`yMax` |

Rules:

- Bars and columns always start at zero. Lines may start above zero, but say so in `note` if it exaggerates movement.
- The title states the takeaway ("…keep climbing"), not just the topic ("Smartphones").
- `source` is required and names the publisher and dataset.
- Use `highlight: true` for the bar the text discusses.
- Values must match the sources exactly (after any stated rounding).

## SEO and link previews

- **Title:** 60 characters or fewer, main search phrase first, no clickbait. Each title must be unique.
- **Description:** 120–160 characters, containing the key fact. This is the preview text on Google, WhatsApp and LinkedIn.
- **`keyStat`:** a short number (`52.3m`, `+19.5%`, `KSh 186`) plus a 4–8 word label. It appears as the big number on the link preview card and at the top of the post.
- **Slug:** lowercase, hyphenated, 3–7 words, with no dates (posts can be updated later).
- **Headings:** `##` sections contain the phrases people search for.
- **Internal links:** at least 2, e.g. a service page, `/pricing`, `/match?source=blog_<slug>`, or a related post.
- **Tags:** 2–4 real search phrases (e.g. "mobile money Kenya", not "tech").
- The site generates the share image, Open Graph and X tags, BlogPosting and breadcrumb structured data, citations from `sources:`, the sitemap entry and the RSS feed automatically.

## Vetting rubric (score each 1–5; publish at 32+/40, and nothing below 3)

| #   | Criterion           | 5 looks like                                                                             |
| --- | ------------------- | ---------------------------------------------------------------------------------------- |
| 1   | **Accuracy**        | Every figure checked against its source. No errors found on spot-check.                  |
| 2   | **Sourcing**        | Mostly primary sources, all dated and linked, revisions noted.                           |
| 3   | **Relevance**       | Clearly matters to Kenyan businesses this week.                                          |
| 4   | **Insight**         | Says something the reader couldn't get from a headline: a trend, a cause, a consequence. |
| 5   | **Usefulness**      | Concrete actions a business can take.                                                    |
| 6   | **Visuals**         | Charts that make the point at a glance, honest axes, sourced.                            |
| 7   | **Readability**     | Clear, direct, scannable on a phone. Free of filler and hedging.                         |
| 8   | **SEO and sharing** | Strong title and description, key stat, internal links, preview card looks good.         |

Accuracy, sourcing and fact-versus-analysis separation are **non-negotiable**: a single factual error found in review sends the post back, whatever its score.

## Workflow

1. Draft with `draft: true` and the correct series date.
2. Run `pnpm blog:check <slug>` and fix every ✗.
3. Preview with `pnpm dev` → `/blog/<slug>`, and check the share card at `/blog/<slug>/opengraph-image`.
4. Editor scores the post against the rubric and spot-checks 3 figures against sources.
5. Set `draft: false`, merge and deploy, then run `pnpm indexnow:submit`.
