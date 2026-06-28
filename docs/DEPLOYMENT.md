# Deployment

## Recommended: Vercel

Vercel builds Next.js with zero config.

1. Push this repo to GitHub (see "Git" below).
2. Go to vercel.com → **New Project** → import the repo.
3. Framework preset auto-detects **Next.js**. Build command `next build`, output handled
   automatically. No env vars are required for this site.
4. Deploy. You'll get a `*.vercel.app` URL immediately.

### Custom domain (binitkoirala.com.np)

1. In the Vercel project → **Settings → Domains** → add `binitkoirala.com.np`
   (and `www.binitkoirala.com.np` if you want it).
2. Update DNS at your registrar to the records Vercel shows (usually an `A`/`ALIAS` for the apex
   and a `CNAME` for `www`).
3. Pick one canonical host (apex vs www) and let the other redirect — Vercel handles this.
4. Confirm `site.url` in `src/content/site.ts` matches the canonical host, so canonical/OG/sitemap
   point to the right place.

## Other hosts

Any platform that runs Node 18.18+ works:

```bash
npm install
npm run build
npm run start      # serves on PORT (default 3000)
```

For a fully static export you'd add `output: "export"` to `next.config.mjs`, but note that
disables server features; this site renders statically already, so standard Vercel hosting is the
simplest path.

## Post-deploy checklist

- [ ] `site.url` is the production origin (canonical/OG/sitemap depend on it).
- [ ] `public/og/home.png` exists and renders in a link-preview debugger.
- [ ] `public/images/binit.jpg` exists (or you're intentionally using the monogram).
- [ ] `/robots.txt` and `/sitemap.xml` resolve.
- [ ] Run Lighthouse once; check LCP (the hero portrait) and that reduced-motion behaves.
- [ ] Submit the domain + sitemap in Google Search Console.

## Git

```bash
git init
git add -A
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

(An initial commit is already included in this archive if you received it as a git repo.)
