/**
 * STRUCTURED DATA (JSON-LD)
 * -------------------------
 * One linked graph instead of isolated nodes. The @id cross-references are what
 * let Google resolve "Binit Koirala" as a single entity across the site, the
 * person, and Fasto — which is what a name search depends on.
 *
 * Split by scope so each page only claims what is actually on it:
 *   siteGraph      → layout.tsx   (Person, Organization, WebSite — site-wide)
 *   homeGraph      → page.tsx     (ProfilePage + FAQPage)
 *   subPageGraph() → topic pages  (WebPage + breadcrumb)
 *   postGraph()    → blog posts   (BlogPosting)
 *
 * Keep `sameAs` accurate and exhaustive: each verified profile is another
 * corroborating signal that these accounts are the same real person.
 */

import { site } from "./site";

export const PERSON_ID = `${site.url}/#binit`;
export const SITE_ID = `${site.url}/#website`;
export const FASTO_ID = "https://fasto.com.np/#organization";

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  alternateName: "Binit",
  url: site.url,
  image: `${site.url}${site.hero.portrait}`,
  description:
    "Software engineer and co-founder based in Nepal, working across Django backends, cloud infrastructure and DevOps, and Flutter mobile apps.",
  jobTitle: "Co-founder, Backend & Mobile Engineer",
  email: `mailto:${site.contact.email}`,
  telephone: site.contact.phone,
  nationality: { "@type": "Country", name: "Nepal" },
  knowsLanguage: ["en", "ne"],
  worksFor: { "@id": FASTO_ID },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Itahari International College",
    address: { "@type": "PostalAddress", addressLocality: "Itahari", addressCountry: "NP" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressRegion: "Bagmati",
    addressCountry: "NP",
  },
  homeLocation: { "@type": "Place", name: "Kathmandu, Nepal" },
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Backend Engineer",
      occupationLocation: { "@type": "Country", name: "Nepal" },
      skills: "Django, Python, REST APIs, PostgreSQL, system design, scalability",
    },
    {
      "@type": "Occupation",
      name: "Mobile App Developer",
      occupationLocation: { "@type": "Country", name: "Nepal" },
      skills: "Flutter, Dart, Firebase, push notifications, payment gateways",
    },
    {
      "@type": "Occupation",
      name: "DevOps Engineer",
      occupationLocation: { "@type": "Country", name: "Nepal" },
      skills: "CI/CD, Docker, Linux, deployment, monitoring",
    },
  ],
  knowsAbout: [
    "Django",
    "Python",
    "Backend development",
    "REST API design",
    "PostgreSQL",
    "DevOps",
    "CI/CD",
    "Docker",
    "Cloud infrastructure",
    "System design",
    "Scalability",
    "Flutter",
    "Dart",
    "Mobile app development",
    "Firebase",
    "Software engineering in Nepal",
  ],
  sameAs: [site.socials.linkedin, site.socials.github, site.socials.instagram].filter(
    (u: string) => u && u !== "#"
  ),
};

const organization = {
  "@type": "Organization",
  "@id": FASTO_ID,
  name: "Fasto",
  url: "https://fasto.com.np",
  description: "Nepal's first quick-commerce platform, delivering anything in 10 minutes.",
  foundingDate: "2024",
  founder: { "@id": PERSON_ID },
  areaServed: { "@type": "Country", name: "Nepal" },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: `${site.name} — Backend, Mobile & DevOps Engineer`,
  description: site.seo.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
};

/** Site-wide entities — rendered once in layout.tsx. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [person, organization, website],
};

/** Home page only: it is the profile, and it carries the FAQ. */
export const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profilepage`,
      url: site.url,
      name: site.seo.title,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: site.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/** A topic page: WebPage about the person, plus a two-level breadcrumb. */
export function subPageGraph(opts: { slug: string; name: string; description: string }) {
  const url = `${site.url}/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: opts.name,
        description: opts.description,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: opts.name },
        ],
      },
    ],
  };
}

/** A blog post: BlogPosting authored by the person. */
export function postGraph(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
}) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}/#post`,
        url,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": SITE_ID },
        mainEntityOfPage: { "@id": `${url}/#post` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ],
  };
}
