import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { posts, getPost, formatDate } from "@/content/posts";
import { postGraph } from "@/content/schema";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Next 15: route params are async.
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Binit Koirala`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { Body } = post;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postGraph(post)) }}
      />
      <PageShell
        crumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        title={post.title}
      >
        <p className="lede" style={{ fontFamily: "var(--fm)", fontSize: 13, marginTop: 18 }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
        </p>
        <div className="prose reveal">
          <Body />
          <div className="next-up">
            <span className="k">Read next</span>
            <a href="/blog">
              All posts <em>index</em>
            </a>
            <a href="/#about">
              About Binit Koirala <em>who I am</em>
            </a>
            <a href="/#contact">
              Get in touch <em>email, LinkedIn</em>
            </a>
          </div>
        </div>
      </PageShell>
    </>
  );
}
