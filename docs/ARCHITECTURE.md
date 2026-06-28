# Architecture

A single-route Next.js App Router site. One page, composed of section components, with a thin
layer of client-side interactivity.

## Rendering

- The page is statically rendered. All section components are **server components** that read
  from `src/content/site.ts` at build time.
- A few **client components** (`"use client"`) handle browser-only behavior. They are small and
  isolated so the rest of the tree stays server-rendered.

```
RootLayout (layout.tsx)
│  • next/font (Syne, Inter, JetBrains Mono) -> CSS variables on <html>
│  • Metadata API (title, description, canonical, OG, Twitter)
│  • Person JSON-LD injected in <body>
│
└─ Home (page.tsx)
   ├─ <Nav/>            (client)  scroll state + mobile menu
   ├─ <main>
   │   ├─ <Hero/>                 ├─ <Aurora/>    (client) mouse parallax
   │   │                          └─ <Portrait/> (client) onError -> "BK" fallback
   │   ├─ <Marquee/>              companies (CSS-only loop)
   │   ├─ <About/>     ──────────  ├─ <Terminal/> (client) typing deploy log
   │   │                          └─ quick facts
   │   ├─ <Expertise/>
   │   ├─ <Work/>
   │   ├─ <Experience/>
   │   ├─ <Stack/>
   │   └─ <Contact/>
   ├─ <Footer/>
   └─ <Reveals/>        (client)  IntersectionObserver -> adds .in to every .reveal
```

## Data flow

`src/content/site.ts` exports a single typed `site` object. Every component imports it and
renders. There is no fetching, no state management, no CMS. To change content you edit that one
file (see `docs/CONTENT-GUIDE.md`).

## Styling

- One global stylesheet: `src/app/globals.css`.
- Design tokens are CSS custom properties in `:root` (colors, gradients, fonts, spacing).
- Component styles are plain classes (`.hero`, `.work`, `.term`, …). No CSS framework.
- Fonts are loaded with `next/font/google` and exposed as `--font-display/-body/-mono`, which the
  stylesheet maps onto `--fd/--fb/--fm`.

## Motion

- CSS animations: aurora drift, marquee scroll, terminal cursor blink, hover transitions.
- JS-driven: terminal typing (`Terminal`), scroll reveals (`Reveals`), aurora parallax (`Aurora`).
- All of the above are disabled/short-circuited under `prefers-reduced-motion: reduce`.

## SEO surface

- `app/layout.tsx` — metadata + JSON-LD.
- `app/sitemap.ts` — `/sitemap.xml`.
- `app/robots.ts` — `/robots.txt`.
- Origin for canonical/OG/sitemap is `site.url`; keep it pointed at production.
