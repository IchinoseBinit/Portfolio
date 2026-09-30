# Content roadmap

A prioritised backlog for the blog. The `blog-writer` agent pulls from here: it takes the
highest-priority topic not already in `src/content/posts/`, writes it, and reports back.

## Why a backlog instead of more landing pages

Google ranks **pages**, so broader query coverage needs more pages. But near-duplicate pages
targeting keyword variants ("Python developer Nepal", "API developer Nepal", …) are
**doorway pages** under Google's spam policies and carry manual-action risk.

Three topic pages is the ceiling for that format. Everything else goes here, where each post
covers genuinely different ground and coverage compounds safely.

## Rules

- One post at a time. Posts register in `src/content/posts/index.ts`; two agents editing it
  concurrently will clobber each other.
- Every topic must be something Binit can speak to from real experience. If it needs a fact
  outside the verified list in `.claude/agents/blog-writer.md`, ask him first.
- Cadence beats volume. Two solid posts a month outranks ten thin ones.

---

## Priority 1 — core stack, highest intent

| Topic | Target query | Angle |
| --- | --- | --- |
| REST API design for mobile clients | rest api development nepal | Chatty endpoints, pagination, versioning — written from having consumed his own APIs |
| Docker for small teams without a platform engineer | docker nepal, devops nepal | What's worth containerising and what isn't at small scale |
| Background jobs and queues in Django | django celery nepal, python backend | When work leaves the request cycle, retries, idempotency |

## Priority 2 — judgement and architecture

| Topic | Target query | Angle |
| --- | --- | --- |
| Monolith vs services for a team of five | system design nepal, software architecture | Honest case for staying monolithic longer than fashionable |
| Choosing a stack for a Nepali startup | software development nepal, tech stack | Hiring pool, hosting realities, cost — not benchmarks |
| What a CI pipeline should actually check | ci cd nepal | Tests, migrations, build reproducibility |
| Reading a production incident | monitoring, sre nepal | Working backwards from a symptom to a cause |

## Priority 3 — mobile and platform

| Topic | Target query | Angle |
| --- | --- | --- |
| Flutter state management, chosen not defaulted | flutter developer nepal | Tradeoffs rather than a tutorial |
| Firebase: where it helps and where it traps you | firebase nepal | Lock-in and cost at scale |

## Priority 4 — sector and career

| Topic | Target query | Angle |
| --- | --- | --- |
| Engineering for 10-minute delivery | quick commerce engineering | Fasto's constraint as a design forcing function |
| Supervising final-year CS projects | computing student nepal, iic | What he sees students get wrong — draws on the IIC role |
| Working remotely with a US team from Nepal | remote developer nepal | Timezone, handoff, written communication |

---

## Done

- `why-django-gets-slow` — N+1, indexes, sync work, caching
- `flutter-bad-networks-nepal` — timeouts, optimistic updates, retries, offline-aware
- `shipping-a-mobile-app-in-nepal` — post-launch reality: store review, staged rollouts,
  payment reconciliation, push delivery, device fragmentation
- `postgres-schema-design-django` — DB-level constraints vs Django validation, types that are
  costly to change (bigint PKs, numeric money, timestamptz, enums), paisa/rupee units and the
  UTC+5:45 day boundary, composite/partial indexes, lock-safe migrations
