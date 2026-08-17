export const meta = {
  slug: "why-django-gets-slow",
  title: "Why your Django app gets slow as it grows (and it's usually not Django)",
  description:
    "The four problems behind most Django performance complaints — N+1 queries, missing indexes, synchronous work that should be queued, and uncached hot reads — and how to find them before users do.",
  date: "2026-08-17",
  readingTime: "7 min read",
};

export default function Body() {
  return (
    <>
      <p>
        Every few months someone tells me Django doesn&apos;t scale. Almost every time, the actual
        problem turns out to be one of four things — and none of them are the framework&apos;s fault.
        Here they are in the order I check them.
      </p>

      <h2>1. N+1 queries</h2>
      <p>
        This is the single most common cause of a Django endpoint that was fine last quarter and is slow
        now. You loop over a queryset and touch a related object inside the loop, and the ORM
        obligingly issues one extra query per row. Twenty rows in development feels instant. Two
        thousand rows in production does not.
      </p>
      <p>
        The fix is <code>select_related</code> for forward single-valued relationships (it does a SQL
        join) and <code>prefetch_related</code> for reverse or many-to-many ones (it does a second query
        and stitches the results in Python). The important habit isn&apos;t memorising which to use —
        it&apos;s noticing when a template or serializer reaches across a relationship at all.
      </p>
      <p>
        The reason this bug is so persistent is that it&apos;s invisible in code review. Nothing about
        the line looks expensive. You have to be looking at query counts, not at the code.
      </p>

      <h2>2. Missing indexes</h2>
      <p>
        A query that filters or orders on an unindexed column forces PostgreSQL to scan the whole table.
        Like the N+1 problem, this scales with your data, so it stays hidden until the table is big
        enough to hurt — which is precisely when you least want to be diagnosing it.
      </p>
      <p>
        Run <code>EXPLAIN ANALYZE</code> on your slowest queries and look for sequential scans on large
        tables. Add indexes for the columns you actually filter, order and join on. Be deliberate rather
        than exhaustive: every index makes writes slower and takes space, so indexing everything is its
        own problem.
      </p>

      <h2>3. Synchronous work that should be on a queue</h2>
      <p>
        Sending an email, calling a payment gateway, generating a PDF, syncing to a third-party service
        — if any of that happens inside the request/response cycle, your user is waiting on it. Worse,
        your response time is now hostage to somebody else&apos;s API being up.
      </p>
      <p>
        Move it to a background worker. The request returns as soon as the work is <em>accepted</em>,
        not once it&apos;s finished. This tends to be the single biggest perceived-latency win available,
        because you&apos;re not optimising the work — you&apos;re removing it from the path the user is
        blocked on.
      </p>
      <p>
        It also forces a healthier design: jobs have to become retryable and idempotent, which is
        exactly what you want for anything touching money or external systems.
      </p>

      <h2>4. Hot reads with no caching</h2>
      <p>
        Some queries run on nearly every request — a catalogue, a config lookup, a permissions check.
        They may each be individually fast and still dominate your database load simply by volume.
      </p>
      <p>
        Cache them, but decide your invalidation story first. A cache without a clear answer to
        &quot;what makes this stale, and what clears it?&quot; trades a performance bug for a
        correctness bug, and correctness bugs are much harder to notice. If you can&apos;t explain when
        an entry gets cleared, you&apos;re not ready to add the cache yet.
      </p>

      <h2>Measure before you change anything</h2>
      <p>
        The mistake I see most often isn&apos;t picking the wrong fix — it&apos;s guessing which of these
        four is the problem. Optimising the wrong layer is worse than doing nothing, because you spend
        the effort and conclude the framework is at fault.
      </p>
      <p>Before touching code:</p>
      <ul>
        <li>Count the queries a slow endpoint issues. A surprising number is the tell for problem #1.</li>
        <li>
          <code>EXPLAIN ANALYZE</code> the slowest ones. Sequential scans on big tables point at #2.
        </li>
        <li>Ask what the request is <em>waiting</em> on. External calls point at #3.</li>
        <li>Look at query volume, not just query duration. High-frequency cheap reads point at #4.</li>
      </ul>

      <h2>Why this matters more with a time promise</h2>
      <p>
        At <a href="https://fasto.com.np" target="_blank" rel="noopener noreferrer">Fasto</a> we promise
        delivery in ten minutes, which removes most of the slack you&apos;d normally have. When the
        product itself is measured in minutes, backend latency stops being an engineering metric and
        becomes a customer-facing one.
      </p>
      <p>
        That constraint is clarifying. It makes it obvious that reliability and performance work
        isn&apos;t polish you get to after features — it <em>is</em> the feature.
      </p>
      <p>
        More on how I approach this in <a href="/django-developer-nepal">Django development</a> and on
        the <a href="/devops-engineer-nepal">infrastructure side</a>.
      </p>
    </>
  );
}
