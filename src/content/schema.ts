/**
 * STRUCTURED DATA (JSON-LD)
 * -------------------------
 * One linked @graph instead of a lone Person node. The @id cross-references are
 * what let Google resolve "Binit Koirala" as a single entity across the site,
 * the person, and Fasto — which is what a name search needs in order to show
 * this site (and eventually a Knowledge Panel) rather than random namesakes.
 *
 * Keep `sameAs` accurate and exhaustive: each verified profile is another
 * corroborating signal that these accounts are the same real person.
 */

import { site } from "./site";

const PERSON_ID = `${site.url}/#binit`;
const SITE_ID = `${site.url}/#website`;
const FASTO_ID = "https://fasto.com.np/#organization";

export const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Itahari",
          addressCountry: "NP",
        },
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
      sameAs: [
        site.socials.linkedin,
        site.socials.github,
        site.socials.instagram,
      ].filter((u: string) => u && u !== "#"),
    },
    {
      "@type": "Organization",
      "@id": FASTO_ID,
      name: "Fasto",
      url: "https://fasto.com.np",
      description:
        "Nepal's first quick-commerce platform, delivering anything in 10 minutes.",
      foundingDate: "2024",
      founder: { "@id": PERSON_ID },
      areaServed: { "@type": "Country", name: "Nepal" },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: site.url,
      name: `${site.name} — Backend, Mobile & DevOps Engineer`,
      description: site.seo.description,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
      about: { "@id": PERSON_ID },
    },
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
  ],
};
