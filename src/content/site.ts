/**
 * SITE CONTENT
 * ------------
 * Single source of truth for everything that appears on the page.
 * Edit text here instead of digging through components.
 * See docs/CONTENT-GUIDE.md for a field-by-field walkthrough.
 */

export const site = {
  name: "Binit Koirala",
  url: "https://binitkoirala.com.np",

  // ---- SEO / social (used in src/app/layout.tsx) ----
  seo: {
    title:
      "Binit Koirala — Backend & DevOps Engineer | Django, Scalable Systems, Nepal",
    description:
      "Binit Koirala is a backend & DevOps engineer and co-founder in Nepal. He builds scalable Django backends and cloud infrastructure at Fasto, and has shipped Flutter apps to the Play Store with 50,000+ downloads.",
    // TODO: add a real 1200x630 image at /public/og/home.png
    ogImage: "/og/home.png",
    keywords: [
      "Binit Koirala",
      "Backend developer Nepal",
      "DevOps engineer Nepal",
      "Django developer Nepal",
      "Flutter developer Nepal",
      "Scalable systems",
      "Software engineer Nepal",
    ],
  },

  // ---- hero ----
  hero: {
    eyebrow: "Backend · DevOps · Co-founder — Nepal",
    // headline is in components/Hero.tsx (it has styled markup)
    lead: "Engineer and co-founder shipping Django backends, cloud infrastructure, and Flutter apps — built to scale, from Kathmandu to production.",
    // TODO: replace with your real headshot at /public/images/binit.jpg
    portrait: "/images/binit.jpg",
    portraitAlt: "Binit Koirala — software engineer and co-founder",
  },

  // ---- animated terminal (components/Terminal.tsx) ----
  terminal: {
    title: "binit@fasto — production",
    lines: [
      '<span class="p">binit@fasto</span>:<span class="dim">~</span>$ deploy --prod',
      '<span class="ar">→</span> running migrations…',
      '<span class="ok">✓</span> 0 errors',
      '<span class="ar">→</span> building containers…',
      '<span class="ok">✓</span> image pushed',
      '<span class="ar">→</span> scaling service…',
      '<span class="ok">✓</span> healthy · <span class="dim">99.9% uptime</span>',
      '<span class="ok">✓</span> live at <span class="p">fasto.com.np</span>',
    ],
  },

  // ---- companies marquee ----
  companies: ["Fasto", "Code Himalaya", "StretchYo", "Itahari International College"],

  // ---- about quick facts (prose lives in components/About.tsx) ----
  facts: [
    { k: "focus", v: "Backend architecture & DevOps" },
    { k: "also", v: "Flutter / mobile engineering" },
    { k: "building", v: "Fasto — co-founder" },
    { k: "based", v: "Kathmandu / Dharan, NP" },
    { k: "education", v: "BHons Computing — IIC" },
  ],

  // ---- expertise cards ----
  expertise: [
    {
      n: "01",
      title: "Backend architecture",
      desc: "Django & Python services with clean data models and well-shaped APIs — the unglamorous reliability that keeps products up under load.",
    },
    {
      n: "02",
      title: "DevOps & infrastructure",
      desc: "CI/CD pipelines, deployment, and monitoring so releases ship fast and failures surface before users ever feel them.",
    },
    {
      n: "03",
      title: "Mobile engineering",
      desc: "Flutter apps taken to production and the Play Store — with payments, push notifications, and resilient, offline-aware UX.",
    },
    {
      n: "04",
      title: "System design & scale",
      desc: "Designing for growth from day one: caching, queues, and architecture that scales cleanly instead of falling over.",
    },
  ],

  // ---- selected work ----
  work: [
    {
      idx: "/01",
      name: "Fasto",
      role: "Co-founder · Backend & DevOps",
      // TODO: replace with the real Fasto product one-liner
      desc: "The startup I co-founded. I own the backend and infrastructure — Django services, deployment, and CI/CD architected to scale with the product.",
      tags: ["Django", "Python", "DevOps", "CI/CD", "System design"],
      href: "#contact",
    },
    {
      idx: "/02",
      name: "Code Himalaya",
      role: "Senior Flutter Developer",
      desc: "Built and shipped Flutter apps to the Play Store — 50,000+ downloads — with payment gateways, push notifications, and production monitoring. Grew from developer to senior here.",
      tags: ["Flutter", "Dart", "Firebase", "Payments", "50k+ downloads"],
      href: "#contact",
    },
    {
      idx: "/03",
      name: "StretchYo",
      role: "Lead Flutter Developer",
      desc: "A US-based habit-building app where I led mobile development end to end — architecture, features, and the release pipeline.",
      tags: ["Flutter", "Dart", "CI/CD", "Push"],
      href: "#contact",
    },
  ],

  // ---- experience timeline ----
  experience: [
    { years: "2024 — Now", role: "Co-founder", org: "Fasto · backend & infrastructure", loc: "Kathmandu, Nepal" },
    { years: "2024 — Now", role: "Final-Year Project Supervisor", org: "Itahari International College", loc: "Itahari, Nepal" },
    { years: "2023 — 2025", role: "Lead Flutter Developer", org: "StretchYo · habit-building app", loc: "California, US (remote)" },
    { years: "2021 — 2024", role: "Flutter Developer → Senior", org: "Code Himalaya", loc: "Lalitpur, Nepal" },
    { years: "2022 — 2024", role: "Academic Tutor — App Development", org: "Islington College · VS International College", loc: "Kathmandu, Nepal" },
  ],

  // ---- stack groups ----
  stack: [
    { group: "Backend", items: ["Django", "Python", "REST APIs", "PostgreSQL", "OOP"] },
    { group: "DevOps & Infra", items: ["CI/CD", "Docker", "Linux", "Deployment", "Monitoring"] },
    { group: "Mobile", items: ["Flutter", "Dart", "Firebase", "Push notifications", "Payment gateways"] },
    { group: "Practice", items: ["System design", "Scalability", "Project management"] },
  ],

  // ---- contact + socials ----
  contact: {
    email: "binitkoirala17@gmail.com",
    linkedin: "https://www.linkedin.com/in/ichinosebinit",
    linkedinLabel: "/in/ichinosebinit",
    phone: "+977 9804350997",
    phoneHref: "tel:+9779804350997",
    location: "Dharan / Kathmandu, Nepal",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/ichinosebinit",
    // TODO: add your GitHub URL
    github: "#",
    instagram: "https://www.instagram.com/ichinosebinit/",
    email: "mailto:binitkoirala17@gmail.com",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
  ],
} as const;

export type Site = typeof site;
