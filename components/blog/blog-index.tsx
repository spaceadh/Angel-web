import Link from "next/link";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeNavigation } from "@/components/home/home-navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, type PostMeta } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";
import styles from "./blog.module.css";

export function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [featured, ...rest] = posts;
  return (
    <div className={styles.page}>
      <HomeNavigation />
      <main>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog")}#blog`,
            name: `${site.name} Blog`,
            url: absoluteUrl("/blog"),
            publisher: { "@id": `${site.url}/#organization` },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.date,
            })),
          }}
        />
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.kicker}>Malaika Studios / Blog</p>
            <h1>Notes on building a business people can find.</h1>
            <p className={styles.lede}>
              Straight answers on websites, branding, SEO, WhatsApp automation
              and digital marketing for businesses in Nairobi and across Kenya.
            </p>
          </div>
        </section>

        <section className={`${styles.container} ${styles.listing}`}>
          {posts.length === 0 ? (
            <p className={styles.empty}>
              The first articles are on their way. In the meantime,{" "}
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
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}

function PostCard({ post, featured }: { post: PostMeta; featured?: boolean }) {
  return (
    <article className={featured ? styles.featured : styles.card}>
      <p className={styles.meta}>
        <span className={styles.category}>{post.category}</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span>{post.readingMinutes} min read</span>
      </p>
      <h2>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className={styles.excerpt}>{post.description}</p>
      <span className={styles.readMore} aria-hidden="true">
        Read article →
      </span>
    </article>
  );
}
