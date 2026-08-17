/**
 * BLOG POST REGISTRY
 * ------------------
 * To add a post:
 *   1. Create src/content/posts/<slug>.tsx exporting `meta` and a default component.
 *   2. Import it here and add it to `posts`.
 * Everything else (routing, sitemap, JSON-LD, the index page) picks it up automatically.
 *
 * `date` is ISO (YYYY-MM-DD). Posts are sorted newest-first.
 */

import WhyDjangoGetsSlow, { meta as whyDjangoGetsSlow } from "./why-django-gets-slow";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  readingTime: string;
};

export type Post = PostMeta & { Body: () => React.JSX.Element };

export const posts: Post[] = [{ ...whyDjangoGetsSlow, Body: WhyDjangoGetsSlow }].sort(
  (a, b) => (a.date < b.date ? 1 : -1)
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Long-form date for display, e.g. "17 August 2026". */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
