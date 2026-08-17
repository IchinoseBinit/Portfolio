import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { subPageGraph } from "@/content/schema";

const TITLE = "DevOps Engineer in Nepal";
const DESC =
  "Binit Koirala builds and runs the infrastructure behind Fasto — CI/CD pipelines, Docker, deploys that are routine, and monitoring that catches failures before users report them.";

export const metadata: Metadata = {
  title: `${TITLE} — Binit Koirala | CI/CD, Docker, Cloud Infrastructure`,
  description: DESC,
  alternates: { canonical: "/devops-engineer-nepal" },
  openGraph: { title: TITLE, description: DESC, url: "/devops-engineer-nepal" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            subPageGraph({ slug: "devops-engineer-nepal", name: TITLE, description: DESC })
          ),
        }}
      />
      <PageShell
        crumb={[{ label: "Home", href: "/" }, { label: "DevOps & infrastructure" }]}
        title="DevOps engineer in Nepal"
        lede="Pipelines, deploys and monitoring built so that shipping is boring — and so failures surface before anyone has to tell you about them."
      >
        <div className="prose reveal">
          <h2>Why I own this rather than delegate it</h2>
          <p>
            I&apos;m <b>Binit Koirala</b>, co-founder at <b>Fasto</b>, where I&apos;m responsible for the
            backend and the infrastructure it runs on. I didn&apos;t arrive at DevOps because I found
            pipelines exciting. I arrived because writing{" "}
            <a href="/django-developer-nepal">good backend code</a> is pointless if you can&apos;t deploy
            it confidently or tell what it&apos;s doing in production.
          </p>
          <p>
            In a small team there is nobody to hand this to, and that turns out to be a feature. When the
            person who wrote the service also owns its deploy and its alerts, the feedback loop is
            immediate — you feel every bad decision you made about observability.
          </p>

          <h2>What good looks like to me</h2>
          <h3>Deploys should be unremarkable</h3>
          <p>
            If shipping requires a specific person, a checklist held in someone&apos;s head, or a quiet
            hour when traffic is low, the process is the risk. I automate deploys so they&apos;re routine
            and repeatable — which is also what makes a fast rollback possible when something does go
            wrong.
          </p>
          <h3>Failures should announce themselves</h3>
          <p>
            The goal is never zero incidents; it&apos;s hearing about them from your monitoring rather
            than from a customer. That means alerting on symptoms users actually feel — latency, error
            rates, failed jobs, queue depth — instead of a wall of metrics nobody reads.
          </p>
          <h3>Alerts have to stay trustworthy</h3>
          <p>
            An alert that fires constantly gets ignored, and once the team learns to ignore it you&apos;ve
            lost the real one too. Keeping alerts few, meaningful and actionable matters more than
            covering every conceivable metric.
          </p>
          <h3>Environments should match</h3>
          <p>
            &quot;Works on my machine&quot; is a configuration problem. Containerising services with{" "}
            <code>Docker</code> removes a whole category of failure where staging and production quietly
            disagree — including for{" "}
            <a href="/mobile-app-developer-nepal">mobile release pipelines</a>, where a build that
            can&apos;t be reproduced is a genuine problem.
          </p>

          <div className="callout">
            <p>
              For a product promising ten-minute delivery, infrastructure isn&apos;t a background concern.
              Every minute of downtime is an order that can&apos;t be fulfilled, so reliability is a
              product feature rather than an engineering nicety.
            </p>
          </div>

          <h2>Stack</h2>
          <ul>
            <li>
              <b>Pipelines:</b> CI/CD, automated tests on the path to production, staged deploys
            </li>
            <li>
              <b>Runtime:</b> <code>Docker</code>, Linux server administration, process management
            </li>
            <li>
              <b>Data:</b> PostgreSQL operations, migrations that run predictably, backups you have
              actually restored
            </li>
            <li>
              <b>Observability:</b> logging, metrics, uptime monitoring and alerting
            </li>
          </ul>

          <h2>A note on backups</h2>
          <p>
            The most common infrastructure mistake I see in small teams is a backup that has never been
            restored. An untested backup is a hope, not a plan — and you find out which one you had at
            the worst possible moment. Verifying restores is cheap insurance that almost nobody does
            until after their first bad day.
          </p>

          <div className="next-up">
            <span className="k">Related</span>
            <a href="/django-developer-nepal">
              Django &amp; backend <em>APIs, PostgreSQL, scale</em>
            </a>
            <a href="/mobile-app-developer-nepal">
              Mobile app development <em>Flutter, payments, push</em>
            </a>
            <a href="/#experience">
              Experience <em>timeline</em>
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
