import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { posts, formatDate } from "@/content/posts";
import { site } from "@/content/site";
import { SITE_ID, PERSON_ID } from "@/content/schema";

const TITLE = "Blog";
const DESC =
  "Notes on Django backends, Flutter apps and running infrastructure in production — written by Binit Koirala, engineer and co-founder in Nepal.";

export const metadata: Metadata = {
  title: `${TITLE} — Binit Koirala | Django, Flutter, DevOps notes`,
  description: DESC,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESC, url: "/blog" },
};

const blogGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${site.url}/blog/#blog`,
      url: `${site.url}/blog`,
      name: `${site.name} — Blog`,
      description: DESC,
      isPartOf: { "@id": SITE_ID },
      author: { "@id": PERSON_ID },
      inLanguage: "en",
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${site.url}/blog/${p.slug}`,
        datePublished: p.date,
        author: { "@id": PERSON_ID },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogGraph) }}
      />
      <PageShell
        crumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Writing"
        lede="Notes on the things I actually run into — Django backends under load, Flutter in production, and keeping infrastructure boring."
      >
        {posts.length === 0 ? (
          <p className="empty">No posts yet.</p>
        ) : (
          <div className="posts reveal">
            {posts.map((p) => (
              <a className="post-card" href={`/blog/${p.slug}`} key={p.slug}>
                <span className="meta">
                  {formatDate(p.date)} · {p.readingTime}
                </span>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
              </a>
            ))}
          </div>
        )}
      </PageShell>
    </>
  );
}
