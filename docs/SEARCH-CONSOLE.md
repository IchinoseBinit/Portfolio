# Search Console access

`scripts/gsc.mjs` talks to Google Search Console through its API using a **service account**
— a robot identity with access to this one property and nothing else in your Google account.
No password is shared, and access can be revoked from Search Console at any time.

## One-time setup (~10 minutes)

1. **Create a Google Cloud project.** <https://console.cloud.google.com/projectcreate> — any
   name, e.g. `binitkoirala-seo`. No billing needed.

2. **Enable the API.** In that project: *APIs & Services → Library* → search
   **Google Search Console API** → *Enable*.

3. **Create the service account and its key.**
   *IAM & Admin → Service Accounts → Create service account* → name it `gsc` → skip the
   optional role and user steps → *Done*. Open it → *Keys → Add key → Create new key → JSON*.
   A `.json` file downloads.

4. **Move the key out of Downloads** (outside the repo, readable only by you):

   ```bash
   mkdir -p ~/.config/gsc && mv ~/Downloads/<the-file>.json ~/.config/gsc/service-account.json && chmod 600 ~/.config/gsc/service-account.json
   ```

   Never paste this file's contents anywhere, including chat. The repo `.gitignore` also blocks
   it as a backstop.

5. **Grant it access in Search Console.** Copy the service account's email (it ends in
   `.iam.gserviceaccount.com` — shown on the service account page and inside the JSON as
   `client_email`). Then Search Console → property **binitkoirala.com.np** →
   *Settings → Users and permissions → Add user* → paste the email → permission **Full**.
   (*Restricted* is read-only and can't submit sitemaps.)

6. **Check it:** `npm run gsc -- sites` should list the property.

## Commands

| Command | What it does |
| --- | --- |
| `npm run gsc -- sites` | Properties the service account can see |
| `npm run gsc -- submit` | Submit `/sitemap.xml` |
| `npm run gsc -- sitemaps` | Sitemap status: submitted vs indexed, errors, warnings |
| `npm run gsc -- perf [days]` | Top queries and pages, clicks/impressions/CTR/position |
| `npm run gsc -- inspect [url…]` | Index status for each URL (defaults to the whole sitemap) |

The property is a **Domain** property (`sc-domain:binitkoirala.com.np`), which the script uses by
default. Override with `GSC_SITE` if that ever changes.

## What the API can't do

**Request Indexing has no public API.** Google's Indexing API only officially supports job
postings and livestream pages. `inspect` tells you which URLs aren't indexed; requesting the
recrawl is still a click in the Search Console UI (*URL Inspection → Request Indexing*).

## Revoking access

Search Console → *Settings → Users and permissions* → remove the service account. Deleting the
key in Google Cloud also kills it immediately.
