export const meta = {
  slug: "postgres-schema-design-django",
  title: "Designing a Postgres schema you won't regret",
  description:
    "Constraints the database enforces, types that are cheap now and expensive later, indexes for real queries, and the Django migrations that lock a live table.",
  date: "2026-10-01",
  readingTime: "6 min read",
};

export default function Body() {
  return (
    <>
      <p>
        Application code is cheap to change. You fix it, deploy it, and the old version is gone in
        minutes. A schema isn&apos;t like that: every decision in it is baked into rows that already
        exist, and every correction has to run against a table that&apos;s serving traffic. Most of
        what I think about as a <b>Django developer in Nepal</b> working on PostgreSQL comes down to
        one question — which of these choices will be expensive to undo once the table is big?
      </p>

      <h2>Put the rules where every write passes through</h2>
      <p>
        Django gives you a comfortable illusion that your models validate themselves. They
        don&apos;t. <code>Model.save()</code> does not call <code>full_clean()</code> — the docs say
        so plainly — and Django REST framework&apos;s <code>ModelSerializer</code> stopped calling it
        in 3.0. <code>QuerySet.update()</code> and <code>bulk_create()</code> skip <code>save()</code>{" "}
        entirely. Then there&apos;s the management command, the data-fix script, and whoever opens{" "}
        <code>psql</code> during an incident.
      </p>
      <p>
        The database is the only component that sees every one of those writes, so it&apos;s the
        only place a rule is actually guaranteed. A few that belong there:
      </p>
      <ul>
        <li>
          <b>Choices are not constraints.</b> A <code>CharField</code> with <code>choices</code> is
          enforced by model validation, which as above often doesn&apos;t run. Back it with a{" "}
          <code>CheckConstraint(condition=Q(status__in=[...]))</code>. (The argument was called{" "}
          <code>check</code> before Django 5.1 deprecated it in favour of <code>condition</code>.)
        </li>
        <li>
          <b>Conditional uniqueness.</b> &quot;One open cart per user&quot; is a{" "}
          <code>UniqueConstraint</code> with a <code>condition</code>, which Postgres implements as a
          partial unique index. Checking it in Python first is a race you will eventually lose.
        </li>
        <li>
          <b>Invariants on numbers.</b> Stock can&apos;t go below zero. With{" "}
          <code>CheckConstraint(condition=Q(quantity__gte=0))</code> and a decrement written as{" "}
          <code>update(quantity=F(&quot;quantity&quot;) - 1)</code>, two customers racing for the
          last item get one success and one <code>IntegrityError</code> — not an oversold order you
          discover when the rider is already on the way.
        </li>
      </ul>

      <div className="callout">
        <p>
          A rule enforced only in Python is a rule enforced on the code paths you remembered. The
          constraint is for the ones you didn&apos;t.
        </p>
      </div>

      <h2>Types that are cheap now and expensive later</h2>
      <p>
        Choosing a column type takes a second. Changing it on a large table usually means a full
        rewrite of the table and its indexes under an exclusive lock. So these are worth getting right
        on day one:
      </p>
      <ul>
        <li>
          <b>Primary keys are <code>bigint</code>.</b> A plain <code>integer</code> tops out at
          2,147,483,647. Django 6.0 finally made <code>BigAutoField</code> the default for{" "}
          <code>DEFAULT_AUTO_FIELD</code>, but older projects that pinned <code>AutoField</code> are
          still on 32-bit keys — and widening one later rewrites the table <em>and</em> every foreign
          key column pointing at it.
        </li>
        <li>
          <b>Money is <code>numeric</code>, never float.</b> Use <code>DecimalField</code>, or store
          integer minor units if you prefer. Not Postgres&apos;s own <code>money</code> type either;
          the community &quot;Don&apos;t Do This&quot; page recommends <code>numeric</code> over it.
        </li>
        <li>
          <b>Timestamps carry a time zone.</b> Django&apos;s <code>DateTimeField</code> already maps
          to <code>timestamp with time zone</code> on Postgres, which is right. The trap is older
          projects running with <code>USE_TZ = False</code> — the default only became{" "}
          <code>True</code> in Django 5.0 — writing naive local times into it.
        </li>
        <li>
          <b>Status fields are text plus a check, not a native enum.</b> Postgres lets you add enum
          values, but it can&apos;t remove one without dropping and recreating the type. Statuses
          get retired more often than people expect.
        </li>
      </ul>

      <h2>PostgreSQL in Nepal: paisa, rupees and a 5:45 offset</h2>
      <p>
        Two local details deserve a place in the schema discussion because they cause quiet,
        expensive bugs.
      </p>
      <p>
        The first is currency units. Khalti&apos;s ePayment API takes <code>amount</code> in{" "}
        <b>paisa</b>. eSewa&apos;s ePay v2 takes <code>total_amount</code> in <b>rupees</b>. If your
        schema doesn&apos;t make its own unit unambiguous — a column name like{" "}
        <code>amount_paisa</code> helps, or a <code>numeric(12, 2)</code> in rupees and a single
        conversion function per gateway — sooner or later someone passes Rs 100 where the API expected
        paisa, and the reconciliation job flags a payment that&apos;s off by a factor of a hundred.
      </p>
      <p>
        The second is Nepal&apos;s UTC+5:45 offset. <code>timestamptz</code> stores an absolute
        instant, which is what you want, but the moment you group by day you have to say{" "}
        <em>whose</em> day. A raw SQL report running <code>date_trunc(&apos;day&apos;, created_at)</code>{" "}
        in a UTC session puts the day boundary at 5:45 in the morning Kathmandu time, so late-night
        orders get counted against the wrong date. Django&apos;s <code>Trunc</code> functions use the
        current time zone when <code>USE_TZ</code> is on; raw SQL and BI tools don&apos;t. Be explicit:{" "}
        <code>date_trunc(&apos;day&apos;, created_at AT TIME ZONE &apos;Asia/Kathmandu&apos;)</code>.
      </p>

      <h2>Index the queries you actually run</h2>
      <p>
        Postgres doesn&apos;t index foreign key columns automatically, but Django does — every{" "}
        <code>ForeignKey</code> gets one unless you set <code>db_index=False</code>. So the indexes
        worth thinking about are the ones that match your real access patterns:
      </p>
      <ul>
        <li>
          <b>Composite indexes, in the right order.</b> A B-tree on{" "}
          <code>(store_id, status, created_at)</code> serves &quot;pending orders for this store,
          newest first&quot;. Equality columns go first, the range or sort column last. The same
          three columns in a different order is a different, often useless, index.
        </li>
        <li>
          <b>Partial indexes for hot subsets.</b> If most queries only care about the small fraction
          of rows that are still active, <code>Index(fields=[...], condition=Q(status=&quot;pending&quot;))</code>{" "}
          stays small and cheap to maintain while the table grows underneath it.
        </li>
      </ul>
      <p>
        Every index slows every write to that table, so add them for a query plan you&apos;ve looked
        at, not for a column that feels important. How to find the missing ones is covered in{" "}
        <a href="/blog/why-django-gets-slow">why your Django app gets slow as it grows</a>.
      </p>

      <h2>The migrations that get expensive</h2>
      <p>
        Most <code>ALTER TABLE</code> forms take an <code>ACCESS EXCLUSIVE</code> lock. Holding it
        briefly is fine. The problem is <em>waiting</em> for it: if a long-running query holds the
        table, your migration queues behind it, and every ordinary <code>SELECT</code> that arrives
        afterwards queues behind your migration. A change that should take milliseconds takes the
        table offline for as long as that one slow query runs. Set <code>lock_timeout</code> on the
        migration session so it fails fast and can be retried, rather than freezing traffic.
      </p>
      <p>
        Run <code>python manage.py sqlmigrate</code> before anything touches production, and read the
        SQL. Then watch for these:
      </p>
      <ul>
        <li>
          <b>Adding a column with a default</b> is fast since PostgreSQL 11, as long as the default
          isn&apos;t volatile — the value is stored in the catalog, not written into every row. A
          volatile default like <code>clock_timestamp()</code> still rewrites the table.
        </li>
        <li>
          <b>Making an existing column <code>NOT NULL</code></b> scans the whole table under that
          exclusive lock. The safer route: add a <code>CHECK (col IS NOT NULL)</code> with{" "}
          <code>AddConstraintNotValid</code>, validate it in a <em>separate</em> migration with{" "}
          <code>ValidateConstraint</code> (which only takes a <code>SHARE UPDATE EXCLUSIVE</code>{" "}
          lock), then set <code>NOT NULL</code> — Postgres skips the scan when a valid check
          constraint already proves there are no nulls.
        </li>
        <li>
          <b>Creating an index</b> blocks inserts, updates and deletes for the whole build. Use{" "}
          <code>AddIndexConcurrently</code> from <code>django.contrib.postgres.operations</code> in a
          migration with <code>atomic = False</code>. If it fails, it leaves an invalid index behind
          that still costs write overhead; drop it and try again.
        </li>
        <li>
          <b>Changing a column&apos;s type</b> normally rewrites the table and its indexes. Some
          changes are exempt — widening a <code>varchar</code> limit, for instance — but{" "}
          <code>integer</code> to <code>bigint</code> isn&apos;t one of them.
        </li>
        <li>
          <b>Renaming or dropping a column</b> is cheap for Postgres and dangerous for you, because
          during a rolling deploy the old code is still running and still selecting the old name.
          Expand, then contract: add the new column, write to both, backfill, move reads over, and
          drop the old one in a later release.
        </li>
      </ul>

      <h2>What this buys you</h2>
      <p>
        None of this is exotic. It&apos;s a handful of decisions made when a table is empty and a
        handful of habits for when it isn&apos;t. What it buys is a database that refuses bad data
        on its own, and migrations you can run in the middle of the day without anyone noticing.
      </p>
      <p>
        That matters more when the product runs on a clock. At{" "}
        <a href="https://fasto.com.np" target="_blank" rel="noopener noreferrer">Fasto</a> the promise
        is delivery in ten minutes, and a locked orders table isn&apos;t a maintenance inconvenience —
        it&apos;s a missed promise. More on how I approach the <a href="/django-developer-nepal">Django and
        PostgreSQL backend</a> and the <a href="/devops-engineer-nepal">deployment pipeline that
        runs these migrations</a>.
      </p>
    </>
  );
}
