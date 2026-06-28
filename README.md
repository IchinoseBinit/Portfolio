# Binit Koirala — Personal Site

Personal / portfolio site for **Binit Koirala** — backend &amp; DevOps engineer and co-founder.
An SEO-focused "who I am" site, not a hire-me page.

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
│   ├── images/                # add binit.jpg here (hero headshot)
│   └── og/                    # add home.png here (1200x630 share image)
├── docs/
│   ├── ARCHITECTURE.md        # how the app is wired (server vs client)
│   ├── CONTENT-GUIDE.md       # how to edit every piece of text
│   └── DEPLOYMENT.md          # deploy to Vercel + custom domain
└── src/
    ├── app/
    │   ├── layout.tsx         # fonts, SEO metadata, JSON-LD
    │   ├── page.tsx           # composes the sections
    │   ├── globals.css        # design tokens + all component styles
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

## Before you launch — TODO

These are also marked with `TODO` comments in the code:

- [ ] Add your headshot at `public/images/binit.jpg` (hero portrait; 4:5 crop)
- [ ] Add a `1200x630` share image at `public/og/home.png`
- [ ] Set your **GitHub URL** in `src/content/site.ts` → `socials.github`
- [ ] Replace the **Fasto** one-liner in `site.ts` → `work[0].desc`
- [ ] Add real **Play Store / app links** for the work items if you want them clickable
- [ ] (Optional) add a favicon in `src/app/` (`icon.png` / `favicon.ico`)

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
- Open Graph + `summary_large_image` Twitter cards.
- `Person` JSON-LD structured data.
- `sitemap.xml` and `robots.txt` generated from `site.url`.

The canonical/OG origin comes from `site.url` in `src/content/site.ts` — keep it set to the
**production** domain.

---

## Deploy

Recommended: **Vercel** (zero-config for Next.js). See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).
