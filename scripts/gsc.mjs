#!/usr/bin/env node
/**
 * Google Search Console helper for binitkoirala.com.np.
 *
 *   npm run gsc -- sites              properties this service account can see (sanity check)
 *   npm run gsc -- submit             submit /sitemap.xml
 *   npm run gsc -- sitemaps           sitemap status: submitted vs indexed, errors, warnings
 *   npm run gsc -- perf [days]        top queries and pages (default: last 28 days)
 *   npm run gsc -- inspect [url...]   index status per URL (default: every URL in the sitemap)
 *
 * Auth is a service-account JSON key, read from GSC_KEY_FILE or
 * ~/.config/gsc/service-account.json. It lives OUTSIDE the repo on purpose so it can't be
 * committed. The service account's email must be added as a user on the Search Console
 * property. See docs/SEARCH-CONSOLE.md.
 *
 * Note: "Request Indexing" is not available through Google's public API — that button is
 * UI-only. `inspect` reports status; requesting a recrawl still happens in the browser.
 */
import { searchconsole, auth as gauth } from "@googleapis/searchconsole";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const SITE = process.env.GSC_SITE ?? "https://binitkoirala.com.np/";
const SITEMAP = `${SITE.replace(/\/$/, "")}/sitemap.xml`;
const KEY = process.env.GSC_KEY_FILE ?? path.join(os.homedir(), ".config/gsc/service-account.json");

if (!existsSync(KEY)) {
  console.error(`No service-account key at ${KEY}\nSet GSC_KEY_FILE or see docs/SEARCH-CONSOLE.md.`);
  process.exit(1);
}

const sc = searchconsole({
  version: "v1",
  auth: new gauth.GoogleAuth({
    keyFile: KEY,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  }),
});

const iso = (d) => d.toISOString().slice(0, 10);
const pad = (s, n) => String(s).padEnd(n).slice(0, n);

async function sitemapUrls() {
  const xml = await (await fetch(SITEMAP)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const commands = {
  async sites() {
    const { data } = await sc.sites.list();
    for (const s of data.siteEntry ?? []) console.log(`${pad(s.permissionLevel, 22)} ${s.siteUrl}`);
    if (!data.siteEntry?.length) console.log("(none — add the service account as a user in Search Console)");
  },

  async submit() {
    await sc.sitemaps.submit({ siteUrl: SITE, feedpath: SITEMAP });
    console.log(`submitted ${SITEMAP}`);
  },

  async sitemaps() {
    const { data } = await sc.sitemaps.list({ siteUrl: SITE });
    for (const s of data.sitemap ?? []) {
      console.log(s.path);
      console.log(`  last submitted  ${s.lastSubmitted ?? "-"}`);
      console.log(`  last downloaded ${s.lastDownloaded ?? "-"}`);
      console.log(`  pending         ${s.isPending}`);
      console.log(`  errors/warnings ${s.errors ?? 0} / ${s.warnings ?? 0}`);
      for (const c of s.contents ?? []) console.log(`  ${c.type}: submitted ${c.submitted}, indexed ${c.indexed ?? "n/a"}`);
    }
    if (!data.sitemap?.length) console.log("(no sitemaps submitted yet — run: npm run gsc -- submit)");
  },

  async perf(days = "28") {
    // Search Console data lags ~2-3 days; end the window before the gap.
    const end = new Date(Date.now() - 3 * 864e5);
    const start = new Date(end.getTime() - Number(days) * 864e5);
    const window = `${iso(start)} → ${iso(end)}`;

    for (const dim of ["query", "page"]) {
      const { data } = await sc.searchanalytics.query({
        siteUrl: SITE,
        requestBody: { startDate: iso(start), endDate: iso(end), dimensions: [dim], rowLimit: 25 },
      });
      console.log(`\nTop ${dim === "query" ? "queries" : "pages"} (${window})`);
      console.log(`${pad(dim, 58)} ${pad("clicks", 7)} ${pad("impr", 7)} ${pad("ctr", 7)} pos`);
      for (const r of data.rows ?? []) {
        console.log(
          `${pad(r.keys[0].replace(SITE.replace(/\/$/, ""), "") || "/", 58)} ` +
            `${pad(r.clicks, 7)} ${pad(r.impressions, 7)} ${pad((r.ctr * 100).toFixed(1) + "%", 7)} ${r.position.toFixed(1)}`
        );
      }
      if (!data.rows?.length) console.log("(no data yet for this window)");
    }
  },

  async inspect(...urls) {
    const targets = urls.length ? urls : await sitemapUrls();
    for (const url of targets) {
      const { data } = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: url, siteUrl: SITE },
      });
      const r = data.inspectionResult?.indexStatusResult ?? {};
      console.log(`\n${url}`);
      console.log(`  verdict    ${r.verdict ?? "-"}`);
      console.log(`  coverage   ${r.coverageState ?? "-"}`);
      console.log(`  last crawl ${r.lastCrawlTime ?? "never"}`);
      if (r.googleCanonical && r.googleCanonical !== url) console.log(`  ⚠ google canonical ${r.googleCanonical}`);
    }
  },
};

const [cmd = "sites", ...args] = process.argv.slice(2);
if (!commands[cmd]) {
  console.error(`unknown command "${cmd}". Try: ${Object.keys(commands).join(", ")}`);
  process.exit(1);
}
try {
  await commands[cmd](...args);
} catch (e) {
  const msg = e?.response?.data?.error?.message ?? e.message;
  console.error(`\n${cmd} failed: ${msg}`);
  if (/permission|forbidden|not.*owner|403/i.test(msg))
    console.error("→ The service account isn't a user on this property yet. See docs/SEARCH-CONSOLE.md step 4.");
  process.exit(1);
}
