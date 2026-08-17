import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { subPageGraph } from "@/content/schema";

const TITLE = "Django Developer in Nepal";
const DESC =
  "Binit Koirala is a Django developer in Nepal building production backends — REST APIs, PostgreSQL data models, and the caching and queue work that keeps Fasto's 10-minute quick commerce reliable under load.";

export const metadata: Metadata = {
  title: `${TITLE} — Binit Koirala | Django, Python, PostgreSQL`,
  description: DESC,
  alternates: { canonical: "/django-developer-nepal" },
  openGraph: { title: TITLE, description: DESC, url: "/django-developer-nepal" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            subPageGraph({ slug: "django-developer-nepal", name: TITLE, description: DESC })
          ),
        }}
      />
      <PageShell
        crumb={[{ label: "Home", href: "/" }, { label: "Django development" }]}
        title="Django developer in Nepal"
        lede="I build Django backends that are meant to stay up — clean data models, well-shaped APIs, and the unglamorous reliability work that decides whether a product survives its own growth."
      >
        <div className="prose reveal">
          <h2>What I actually do with Django</h2>
          <p>
            I&apos;m <b>Binit Koirala</b>, a co-founder and backend engineer based in Nepal. Most of my
            Django work now goes into <b>Fasto</b>, the quick-commerce company I co-founded, where I own
            the backend and the infrastructure it runs on.
          </p>
          <p>
            Django gets picked for a lot of projects in Nepal because it ships fast. That&apos;s true, but
            it&apos;s also how teams end up with a backend that works beautifully at 200 orders a day and
            falls over at 2,000. The interesting part of the job isn&apos;t getting the first version out
            — it&apos;s making the second and third versions possible without a rewrite.
          </p>

          <h2>Ten-minute delivery is a backend problem</h2>
          <p>
            Fasto promises delivery in ten minutes. That constraint pushes almost every hard decision
            down into the backend, because a promise measured in minutes leaves no room for a slow query
            or an ambiguous order state.
          </p>
          <p>The parts of the domain that actually demand care:</p>
          <ul>
            <li>
              <b>Inventory that reflects reality.</b> Stock has to be accurate per location, not
              globally. Overselling something you can&apos;t deliver in ten minutes isn&apos;t a rounding
              error, it&apos;s a broken promise.
            </li>
            <li>
              <b>Order state that can&apos;t drift.</b> An order moves through placement, picking,
              dispatch and delivery. Modelling that as an explicit state machine rather than a pile of
              boolean flags is the difference between a debuggable system and a guessing game.
            </li>
            <li>
              <b>Work that shouldn&apos;t block a response.</b> Notifications, receipts and downstream
              syncs belong on a queue. The user is waiting on the order, not on your integrations.
            </li>
            <li>
              <b>Reads that stay cheap.</b> Catalogue and availability get hit constantly. Caching those
              paths deliberately — with a real invalidation story — keeps the database free for the
              writes that matter.
            </li>
          </ul>

          <h2>How I approach a Django codebase</h2>
          <h3>The data model is the architecture</h3>
          <p>
            Almost every backend problem I&apos;ve had to untangle traced back to a data model that
            encoded an assumption which stopped being true. I spend disproportionate time there
            first — getting the relationships, constraints and indexes right — because that&apos;s the
            layer that&apos;s expensive to change later. Application code is cheap to refactor;
            production data is not.
          </p>
          <h3>APIs shaped for the client that consumes them</h3>
          <p>
            I also write the mobile apps, which changes how I design endpoints. When you&apos;ve had to
            consume your own chatty API over an unreliable connection, you stop shipping endpoints that
            need four round-trips to render one screen. That feedback loop is genuinely the most useful
            thing about working across{" "}
            <a href="/mobile-app-developer-nepal">backend and mobile</a> at the same time.
          </p>
          <h3>Boring, observable deploys</h3>
          <p>
            A backend is only as good as your ability to ship and watch it. Migrations that run
            predictably, deploys that are routine rather than an event, and monitoring that surfaces a
            problem before a customer reports it — that&apos;s the{" "}
            <a href="/devops-engineer-nepal">DevOps side</a> of the same job, and I don&apos;t treat it as
            somebody else&apos;s.
          </p>

          <div className="callout">
            <p>
              The pattern I keep coming back to: most scaling problems in Nepali startups aren&apos;t
              exotic. They&apos;re an unindexed query, a synchronous call that should have been queued, or
              a data model that made an assumption it shouldn&apos;t have. Fixing those is unglamorous and
              enormously effective.
            </p>
          </div>

          <h2>Stack</h2>
          <ul>
            <li>
              <b>Core:</b> Django, Python, Django REST Framework, PostgreSQL
            </li>
            <li>
              <b>Around it:</b> caching, background queues, <code>Docker</code>, Linux
            </li>
            <li>
              <b>Delivery:</b> CI/CD pipelines, staged deploys, monitoring and alerting
            </li>
            <li>
              <b>Practice:</b> system design, capacity planning, code review, mentoring
            </li>
          </ul>

          <h2>Background</h2>
          <p>
            Before Fasto I spent several years at <b>Code Himalaya</b>, moving from developer to senior,
            and led mobile engineering for <b>Sangatha</b> (formerly StretchYo), a US-based
            habit-building app. I also supervise final-year computing projects at{" "}
            <b>Itahari International College</b>, which keeps me honest about explaining architectural
            decisions in plain terms rather than jargon.
          </p>

          <div className="next-up">
            <span className="k">Related</span>
            <a href="/mobile-app-developer-nepal">
              Mobile app development <em>Flutter, payments, push</em>
            </a>
            <a href="/devops-engineer-nepal">
              DevOps &amp; infrastructure <em>CI/CD, Docker, monitoring</em>
            </a>
            <a href="/#work">
              Selected work <em>Fasto, Code Himalaya, Sangatha</em>
            </a>
            <a href="/#contact">
              Get in touch <em>email, LinkedIn</em>
            </a>
          </div>
        </div>
      </PageShell>
    </>
  );
}
