import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, type Post, type PostMeta } from "@/lib/blog";
import { getSeries } from "@/lib/blog-series";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./blog.module.css";

export function BlogPost({
  post,
  related,
}: {
  post: Post;
  related: PostMeta[];
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const series = getSeries(post.series);
  const crumbHref = series ? `/blog/series/${series.key}` : "/blog";
  const crumbName = series?.name ?? post.category;
  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${url}#article`,
                headline: post.title,
                description: post.description,
                url,
                mainEntityOfPage: url,
                image: `${url}/opengraph-image`,
                datePublished: post.date,
                dateModified: post.updated ?? post.date,
                articleSection: series?.name ?? post.category,
                isPartOf: series
                  ? {
                      "@type": "CreativeWorkSeries",
                      name: series.name,
                      url: absoluteUrl(`/blog/series/${series.key}`),
                    }
                  : undefined,
                citation: post.sources.map((source) => ({
                  "@type": "CreativeWork",
                  name: source.title,
                  url: source.url,
                  publisher: {
                    "@type": "Organization",
                    name: source.publisher,
                  },
                  datePublished: source.date,
                })),
                keywords: post.tags.join(", "),
                author: {
                  "@type": "Organization",
                  name: post.author,
                  url: site.url,
                },
                publisher: { "@id": `${site.url}/#organization` },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: site.url,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: absoluteUrl("/blog"),
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: crumbName,
                    item: absoluteUrl(crumbHref),
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: post.title,
                    item: url,
                  },
                ],
              },
            ],
          }}
        />
        <header className={styles.postHero}>
          <div className={styles.container}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> /{" "}
              <Link href={crumbHref}>{crumbName}</Link>
            </nav>
            {series && (
              <p
                className={styles.seriesBadge}
                style={{ "--series": series.accent } as React.CSSProperties}
              >
                {series.name} <span>· {series.cadence}</span>
              </p>
            )}
            <div className={post.keyStat ? styles.postHeroGrid : undefined}>
              <div>
                <h1>{post.title}</h1>
                <p className={styles.lede}>{post.description}</p>
              </div>
              {post.keyStat && (
                <p className={styles.keyStat}>
                  <strong>{post.keyStat.value}</strong>
                  <span>{post.keyStat.label}</span>
                </p>
              )}
            </div>
            <p className={styles.meta}>
              <span>By {post.author}</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              {post.updated && (
                <span>
                  Updated{" "}
                  <time dateTime={post.updated}>
                    {formatPostDate(post.updated)}
                  </time>
                </span>
              )}
              <span>{post.readingMinutes} min read</span>
              {post.factChecked && (
                <span>
                  ✓ Fact-checked{" "}
                  <time dateTime={post.factChecked}>
                    {formatPostDate(post.factChecked)}
                  </time>
                </span>
              )}
            </p>
          </div>
        </header>

        <div className={`${styles.container} ${styles.postLayout}`}>
          {post.headings.length > 2 && (
            <aside className={styles.toc} aria-label="On this page">
              <p>On this page</p>
              <ol>
                {post.headings
                  .filter((heading) => heading.depth === 2)
                  .map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        dangerouslySetInnerHTML={{ __html: heading.text }}
                      />
                    </li>
                  ))}
              </ol>
            </aside>
          )}
          <article className={styles.articleColumn}>
            <div
              className={styles.prose}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {post.sources.length > 0 && (
              <section className={styles.sources} aria-labelledby="sources">
                <h2 id="sources">Sources</h2>
                <ol>
                  {post.sources.map((source) => (
                    <li key={source.url}>
                      <span className={styles.sourcePublisher}>
                        {source.publisher}
                      </span>{" "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                      {source.date && (
                        <>
                          {" "}
                          <time dateTime={source.date}>
                            ({formatPostDate(source.date)})
                          </time>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
                <p className={styles.sourcesNote}>
                  Figures are taken from the sources above. Analysis and
                  recommendations are Malaika Studios&apos; own. Spotted an
                  error?{" "}
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent(`Correction: ${post.title}`)}`}
                  >
                    Tell us
                  </a>
                  .
                </p>
              </section>
            )}
          </article>
        </div>

        <section className={styles.postCta}>
          <div className={styles.container}>
            <p className={styles.kicker}>Ready when you are</p>
            <h2>Want a clear price for your own project?</h2>
            <p className={styles.lede}>
              Answer a few questions and get three tailored options with real
              Kenyan shilling prices — in about two minutes.
            </p>
            <div className={styles.ctaRow}>
              <Link
                href={`/match?source=blog_${post.slug}`}
                className={styles.cta}
              >
                Get an instant estimate →
              </Link>
              <TrackedWhatsappLink
                href={site.whatsappUrl}
                placement={`blog_${post.slug}`}
                className={styles.ctaSecondary}
              >
                <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
              </TrackedWhatsappLink>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className={`${styles.container} ${styles.related}`}>
            <h2>Keep reading</h2>
            <ul className={styles.grid}>
              {related.map((item) => (
                <li key={item.slug}>
                  <article className={styles.card}>
                    <p className={styles.meta}>
                      <span className={styles.category}>
                        {getSeries(item.series)?.name ?? item.category}
                      </span>
                      <span>{item.readingMinutes} min read</span>
                    </p>
                    <h3>
                      <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className={styles.excerpt}>{item.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <HomeFooter />
    </div>
  );
}
