# CLAUDE.md

Context and conventions for working on this repo with Claude Code.

## What this is

The personal / portfolio site of **Binit Koirala** — a backend &amp; DevOps engineer and
co-founder. It is an SEO-focused informational site (not a hire-me page). Single page,
multiple sections, dark immersive aesthetic.

**Stack:** Next.js 14 (App Router) · TypeScript · plain CSS (no Tailwind) · `next/font`.

## Hard rules (please respect)

- **Do not** use the title "CTO" anywhere. Binit's role is framed as **co-founder, backend &amp;
  DevOps** at Fasto. (This is a deliberate choice.)
- Keep the site **content-driven**: text and data go in `src/content/site.ts`, not hard-coded
  in components, unless the copy needs inline markup (e.g. the About paragraphs).
- Preserve `prefers-reduced-motion` handling whenever you touch animation.
- Keep one `<h1>` on the page (it's in `Hero`). Section titles are `<h2>`.
- This is plain CSS by design. If you introduce Tailwind or CSS Modules, do it deliberately and
  update the docs — don't half-migrate.

## Where things live

| Want to change… | Edit |
| --- | --- |
| Any text, lists, links, terminal lines | `src/content/site.ts` |
| About paragraphs (have inline `<b>`) | `src/components/About.tsx` |
| Colors / fonts / spacing / all styles | `src/app/globals.css` (tokens at top) |
| SEO metadata, JSON-LD, fonts | `src/app/layout.tsx` |
| Page section order | `src/app/page.tsx` |
| Hero headline markup | `src/components/Hero.tsx` |

## Server vs client components

Most sections are **server components** (static markup mapping over `site.ts`).
Only these are client components (`"use client"`), because they use browser APIs:

- `Nav` — scroll state + mobile menu
- `Aurora` — mousemove parallax
- `Portrait` — `onError` monogram fallback
- `Terminal` — typing animation via IntersectionObserver
- `Reveals` — one observer that adds `.in` to every `.reveal` element

When adding a new animated/interactive piece, make a small client component rather than turning
a whole section client.

## Adding a new section (recipe)

1. Add its data to `src/content/site.ts`.
2. Create `src/components/MySection.tsx` (server component) that maps over that data and uses
   existing class names from `globals.css` (or add new ones near related styles).
3. Add `className="reveal"` to elements you want to animate in.
4. Import and place it in `src/app/page.tsx`.
5. If it needs an anchor link, add `{ label, href: "#id" }` to `site.nav`.

## Styling conventions

- Theme via CSS variables in `:root` (top of `globals.css`). Re-theme by editing
  `--v1/--v2/--v3` and the `--grad*` values.
- Class naming is plain/semantic (`.work`, `.card`, `.timeline`, `.term`). Watch for selector
  specificity when adding section padding/margins.

## Commands

```bash
npm run dev     # local dev
npm run build   # must pass before deploy
npm run lint
```

## Open TODOs

Search the repo for `TODO`. Currently: hero headshot, OG image, GitHub URL, Fasto one-liner,
real app links.
