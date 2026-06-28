# Binit Koirala — Personal Site

Personal / portfolio site for **Binit Koirala** — co-founder and backend, mobile &amp; DevOps engineer.
An SEO-focused "who I am" site, not a hire-me page.

**Live:** [binitkoirala.com.np](https://binitkoirala.com.np) (deployed on Vercel, auto-deploys from `master`).

Built with **Next.js (App Router) + TypeScript**, with the design ported 1:1 from an approved
single-file prototype. No CSS framework — styles live in one global stylesheet driven by CSS
variables, so the look is easy to reason about and tweak.

---

## Quick start

> Requires **Node.js 18.18+** (Node 20 recommended — see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (next/core-web-vitals)
```

---

## Project structure

```
binit-portfolio/
├── CLAUDE.md                  # context + conventions for Claude Code
├── README.md
├── next.config.mjs
├── tsconfig.json              # path alias: @/* -> ./src/*
├── public/
│   └── images/                # binit.jpg (hero headshot)
├── docs/
│   ├── ARCHITECTURE.md        # how the app is wired (server vs client)
│   ├── CONTENT-GUIDE.md       # how to edit every piece of text
│   └── DEPLOYMENT.md          # deploy to Vercel + custom domain
└── src/
    ├── app/
    │   ├── layout.tsx         # fonts, SEO metadata, JSON-LD, viewport
    │   ├── page.tsx           # composes the sections
    │   ├── globals.css        # design tokens + all component styles
    │   ├── icon.svg           # favicon (gradient BK monogram)
    │   ├── opengraph-image.tsx# OG/social card, generated in code
    │   ├── twitter-image.tsx  # re-exports the OG card
    │   ├── manifest.ts        # /manifest.webmanifest (PWA)
    │   ├── sitemap.ts         # /sitemap.xml
    │   └── robots.ts          # /robots.txt
    ├── components/            # one component per section (+ client helpers)
    └── content/
        └── site.ts            # ← single source of truth for all content
```

---

## Editing content

**Almost everything you'll want to change is in [`src/content/site.ts`](src/content/site.ts)** —
name, SEO text, hero copy, companies, work, experience, stack, contact, socials, and the
terminal lines. Components just render that data. See [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

The three About paragraphs contain inline `<b>` emphasis, so they live directly in
`src/components/About.tsx`.

---

## Launch checklist — done

The site is live; all initial launch items are complete:

- [x] Hero headshot at `public/images/binit.jpg` (4:5 crop, optimized)
- [x] OG/Twitter share card — generated in code (`src/app/opengraph-image.tsx`), no static asset
- [x] **GitHub URL** + real **work links** (Fasto, Sangatha Play Store) in `site.ts`
- [x] **Fasto** one-liner written
- [x] Favicon (`src/app/icon.svg`) + web manifest + `theme-color`
- [x] Custom domain `binitkoirala.com.np` (apex canonical) on Vercel with SSL
- [x] Google Search Console verified (`GOOGLE_SITE_VERIFICATION` env var → meta tag)

---

## Design notes

- **Aesthetic:** dark "control-plane" look — near-black backdrop, drifting violet/cyan/pink
  aurora, fine grid, film-grain overlay, one violet→cyan gradient accent.
- **Type:** Syne (display), Inter (body), JetBrains Mono (data/terminal) via `next/font`.
- **Signature elements:** the animated **deploy-log terminal** (About) and the **companies
  marquee**.
- **Motion** respects `prefers-reduced-motion` (aurora, marquee, typing, and reveals all stop).
- **Colors** are CSS variables at the top of `globals.css` — change `--v1` / `--v2` / `--v3`
  and the gradients to re-theme the whole site.

---

## SEO

- Per-page metadata + canonical via the Next.js Metadata API (`layout.tsx`).
- Open Graph + `summary_large_image` Twitter cards, generated in code (`opengraph-image.tsx`).
- `Person` JSON-LD structured data.
- `sitemap.xml` and `robots.txt` generated from `site.url`.
- Favicon (`icon.svg`), web manifest, and `theme-color` (dark) for mobile/PWA.
- Google Search Console verification via the `GOOGLE_SITE_VERIFICATION` env var (emits the
  meta tag only when set — configured in Vercel, not committed).

The canonical/OG origin comes from `site.url` in `src/content/site.ts` — keep it set to the
**production** domain.

---

## Deploy

Recommended: **Vercel** (zero-config for Next.js). See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
