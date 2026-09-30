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

import FlutterBadNetworksNepal, {
  meta as flutterBadNetworksNepal,
} from "./flutter-bad-networks-nepal";
import PostgresSchemaDesignDjango, {
  meta as postgresSchemaDesignDjango,
} from "./postgres-schema-design-django";
import ShippingMobileAppNepal, {
  meta as shippingMobileAppNepal,
} from "./shipping-a-mobile-app-in-nepal";
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

export const posts: Post[] = [
  { ...postgresSchemaDesignDjango, Body: PostgresSchemaDesignDjango },
  { ...shippingMobileAppNepal, Body: ShippingMobileAppNepal },
  { ...flutterBadNetworksNepal, Body: FlutterBadNetworksNepal },
  { ...whyDjangoGetsSlow, Body: WhyDjangoGetsSlow },
  // Newest first. Equal dates return 0 so the (stable) sort keeps registry order —
  // add new posts at the top of the array.
].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Long-form date for display, e.g. "17 August 2026". */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
