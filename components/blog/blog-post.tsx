import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { TrackedWhatsappLink } from "@/components/analytics/tracked-links";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, type Post, type PostMeta } from "@/lib/blog";
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
                articleSection: post.category,
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
              <span>{post.category}</span>
            </nav>
            <h1>{post.title}</h1>
            <p className={styles.lede}>{post.description}</p>
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
          <article
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
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
                      <span className={styles.category}>{item.category}</span>
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
