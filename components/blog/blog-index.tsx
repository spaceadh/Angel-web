import Link from "next/link";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, type PostMeta } from "@/lib/blog";
import { BLOG_SERIES, getSeries, type BlogSeries } from "@/lib/blog-series";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./blog.module.css";

export function BlogIndex({
  posts,
  series,
}: {
  posts: PostMeta[];
  /** When set, renders the landing page for one series. */
  series?: BlogSeries;
}) {
  const [featured, ...rest] = posts;
  const pageUrl = absoluteUrl(series ? `/blog/series/${series.key}` : "/blog");

  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              series
                ? {
                    "@type": "CreativeWorkSeries",
                    "@id": `${pageUrl}#series`,
                    name: series.name,
                    description: series.tagline,
                    url: pageUrl,
                    publisher: { "@id": `${site.url}/#organization` },
                    hasPart: posts.map((post) => ({
                      "@type": "BlogPosting",
                      headline: post.title,
                      url: absoluteUrl(`/blog/${post.slug}`),
                      datePublished: post.date,
                    })),
                  }
                : {
                    "@type": "Blog",
                    "@id": `${pageUrl}#blog`,
                    name: `${site.name} Blog`,
                    url: pageUrl,
                    publisher: { "@id": `${site.url}/#organization` },
                    blogPost: posts.map((post) => ({
                      "@type": "BlogPosting",
                      headline: post.title,
                      url: absoluteUrl(`/blog/${post.slug}`),
                      datePublished: post.date,
                    })),
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
                  ...(series
                    ? [
                        {
                          "@type": "ListItem",
                          position: 3,
                          name: series.name,
                          item: pageUrl,
                        },
                      ]
                    : []),
                ],
              },
            ],
          }}
        />
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.kicker}>
              {series ? (
                <>
                  <Link href="/blog">Blog</Link> / {series.cadence}
                </>
              ) : (
                "Malaika Studios / Blog"
              )}
            </p>
            <h1>
              {series
                ? series.name
                : "Notes on building a business people can find."}
            </h1>
            <p className={styles.lede}>
              {series
                ? series.tagline
                : "Researched, data-led stories on Kenya's digital economy every Monday, a global brief every Friday, and straight answers on websites, SEO and growth."}
            </p>
            <nav className={styles.seriesNav} aria-label="Blog series">
              <Link href="/blog" aria-current={series ? undefined : "page"}>
                All posts
              </Link>
              {Object.values(BLOG_SERIES).map((item) => (
                <Link
                  key={item.key}
                  href={`/blog/series/${item.key}`}
                  aria-current={series?.key === item.key ? "page" : undefined}
                  style={{ "--series": item.accent } as React.CSSProperties}
                >
                  {item.name}
                  <span>{item.cadence.replace("Every ", "")}</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className={`${styles.container} ${styles.listing}`}>
          {posts.length === 0 ? (
            <p className={styles.empty}>
              The first {series ? `${series.name} issue is` : "articles are"} on
              the way. In the meantime,{" "}
              <Link href="/match?source=blog_empty">
                get an instant estimate for your project →
              </Link>
            </p>
          ) : (
            <>
              <PostCard post={featured} featured />
              {rest.length > 0 && (
                <ul className={styles.grid}>
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          <p className={styles.rssNote}>
            Follow along via <a href="/blog/rss.xml">RSS</a>.
          </p>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}

function PostCard({ post, featured }: { post: PostMeta; featured?: boolean }) {
  const series = getSeries(post.series);
  return (
    <article
      className={featured ? styles.featured : styles.card}
      style={
        series
          ? ({ "--series": series.accent } as React.CSSProperties)
          : undefined
      }
    >
      <p className={styles.meta}>
        <span className={styles.category}>{series?.name ?? post.category}</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span>{post.readingMinutes} min read</span>
      </p>
      <div
        className={post.keyStat && featured ? styles.featuredBody : undefined}
      >
        <div>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className={styles.excerpt}>{post.description}</p>
        </div>
        {post.keyStat && (
          <p className={styles.cardStat}>
            <strong>{post.keyStat.value}</strong>
            <span>{post.keyStat.label}</span>
          </p>
        )}
      </div>
      <span className={styles.readMore} aria-hidden="true">
        Read article →
      </span>
    </article>
  );
}
