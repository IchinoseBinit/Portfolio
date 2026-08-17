import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/blog`,
      lastModified: posts[0] ? new Date(`${posts[0].date}T00:00:00Z`) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...site.topics.map((t) => ({
      url: `${site.url}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(`${p.updated ?? p.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
