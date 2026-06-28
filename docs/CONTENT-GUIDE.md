# Content guide

Everything below is edited in **`src/content/site.ts`** unless noted. Save the file and the dev
server hot-reloads.

## Identity &amp; SEO

- `name`, `url` — your name and **production** URL. `url` drives canonical, OG, sitemap, robots.
- `seo.title`, `seo.description` — the browser tab title and search snippet. Keep the description
  ~150–160 characters, honest, keyword-relevant (no keyword stuffing).
- `seo.ogImage` — path to the share image (`/og/home.png`). Add the actual file under `public/og/`.
- `seo.keywords` — a short, honest list. Don't stuff.

## Hero

- `hero.eyebrow` — the small mono label above the headline.
- `hero.lead` — the paragraph under the headline.
- `hero.portrait` / `hero.portraitAlt` — headshot path + alt text. Put the image at
  `public/images/binit.jpg`. Missing image → "BK" monogram fallback.
- The **headline itself** ("Backends, infra, and apps that scale.") is in
  `src/components/Hero.tsx` because the last word is gradient-styled.

## Terminal (the animated deploy log)

- `terminal.title` — the title-bar text.
- `terminal.lines` — array of lines. Inline spans control color:
  - `<span class="p">…</span>` cyan (prompt / hostnames)
  - `<span class="ok">✓</span>` green (success)
  - `<span class="ar">→</span>` violet (in-progress)
  - `<span class="dim">…</span>` muted
  Keep it plausible and short; it types out on scroll.

## Companies marquee

- `companies` — array of names. They're duplicated automatically for a seamless loop.

## About

- Quick facts: `facts` (key/value rows in the right column).
- The three prose paragraphs are in `src/components/About.tsx` (they contain `<b>` emphasis).

## Expertise cards

- `expertise` — `{ n, title, desc }` per card. `n` is the little "01/02/03/04" marker.

## Selected work

- `work` — `{ idx, name, role, desc, tags, href }`.
  - `name` is the company/product, `role` is the pill.
  - `href` currently points to `#contact`; change to a real URL (Play Store, site) to make a card
    link out.
  - `tags` render as small mono chips.

## Experience timeline

- `experience` — `{ years, role, org, loc }`, newest first.

## Stack

- `stack` — groups of `{ group, items[] }` rendered as labelled chip rows.

## Contact &amp; socials

- `contact` — email, linkedin (+ label), phone (+ `phoneHref`), location.
- `socials` — links used in the footer. Set `socials.github` to your real GitHub
  (it also feeds the JSON-LD `sameAs`; `#` values are filtered out).

## Navigation

- `nav` — the header links `{ label, href }`. `href` is an in-page anchor (`#about`, etc.).
  Add an entry when you add a new section with a matching `id`.

## Re-theming colors

Not in `site.ts` — open `src/app/globals.css` and edit the `:root` variables
(`--v1`, `--v2`, `--v3`, `--grad`, `--grad-3`, `--bg`, `--text`, …). Everything references them.
