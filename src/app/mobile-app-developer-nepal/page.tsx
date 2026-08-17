import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { subPageGraph } from "@/content/schema";

const TITLE = "Mobile App Developer in Nepal";
const DESC =
  "Binit Koirala is a Flutter developer in Nepal with apps on the Play Store passing 50,000+ downloads — payment gateways, push notifications, and offline-aware UX built for real networks.";

export const metadata: Metadata = {
  title: `${TITLE} — Binit Koirala | Flutter, Dart, Play Store`,
  description: DESC,
  alternates: { canonical: "/mobile-app-developer-nepal" },
  openGraph: { title: TITLE, description: DESC, url: "/mobile-app-developer-nepal" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            subPageGraph({ slug: "mobile-app-developer-nepal", name: TITLE, description: DESC })
          ),
        }}
      />
      <PageShell
        crumb={[{ label: "Home", href: "/" }, { label: "Mobile development" }]}
        title="Mobile app developer in Nepal"
        lede="Flutter apps taken all the way to the Play Store — past 50,000 downloads — with the payments, notifications and offline behaviour that production actually demands."
      >
        <div className="prose reveal">
          <h2>Shipped, not prototyped</h2>
          <p>
            I&apos;m <b>Binit Koirala</b>. I&apos;ve been building mobile apps with <b>Flutter</b> since
            well before it was the obvious choice in Nepal, and the apps I&apos;ve worked on have passed{" "}
            <b>50,000+ combined downloads</b> on the Google Play Store.
          </p>
          <p>
            The gap between a Flutter app that demos well and one that survives contact with real users
            is mostly everything that happens after the happy path. Payments that fail halfway.
            Notifications that arrive when the app is dead. A connection that drops mid-request on a
            mobile network. That&apos;s the actual work.
          </p>

          <h2>The parts that are genuinely hard</h2>
          <h3>Payments</h3>
          <p>
            Payment integration is where mobile apps quietly lose money and trust. A charge can succeed
            on the gateway and fail to register in your app; a user will background the app mid-flow and
            reopen it expecting the truth. Getting this right means treating the gateway as the source
            of truth, reconciling on the{" "}
            <a href="/django-developer-nepal">backend</a> rather than in the client, and making every
            payment operation safe to retry.
          </p>
          <h3>Push notifications</h3>
          <p>
            Notifications look trivial until you need them to be reliable. Delivery differs by platform,
            by OS version, and by whether the app is foregrounded, backgrounded or terminated — and
            aggressive battery optimisation on many Android devices will happily drop what you send.
            Building for that reality, instead of for the simulator, is the difference between a feature
            and a liability.
          </p>
          <h3>Networks that aren&apos;t the office WiFi</h3>
          <p>
            Apps used across Nepal run on connections that fluctuate constantly. That pushes you toward
            offline-aware state, optimistic updates that can be rolled back honestly, and retry
            behaviour that doesn&apos;t hammer a struggling connection. An app that degrades gracefully on
            a bad network feels dramatically better than one that&apos;s fast only when conditions are
            perfect.
          </p>
          <h3>Release engineering</h3>
          <p>
            Shipping is a skill of its own — signing, store listings, staged rollouts, and being able to
            push a fix quickly when something slips through. I set up release pipelines so that
            publishing is routine rather than a nervous afternoon.
          </p>

          <div className="callout">
            <p>
              Because I also build the <a href="/django-developer-nepal">Django backends</a> these apps
              talk to, I can fix a problem on whichever side it actually belongs to. A surprising number
              of &quot;mobile bugs&quot; are really API-shape problems, and vice versa.
            </p>
          </div>

          <h2>Where I&apos;ve done this</h2>
          <ul>
            <li>
              <b>Code Himalaya</b> — several years building and shipping Flutter apps to the Play Store,
              growing from developer to senior. Payment gateways, push notifications, production
              monitoring.
            </li>
            <li>
              <b>Sangatha</b> (formerly StretchYo) — led mobile development end to end for a US-based
              habit-building app: architecture, features and the release pipeline.{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.goit.goit&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live on the Play Store
              </a>
              .
            </li>
            <li>
              <b>Fasto</b> — co-founder. Quick commerce is a mobile-first product, and the ten-minute
              promise has to hold on the device as much as on the server.
            </li>
          </ul>

          <h2>Stack</h2>
          <ul>
            <li>
              <b>Core:</b> Flutter, Dart, state management, platform channels where needed
            </li>
            <li>
              <b>Services:</b> Firebase, push notifications, analytics, crash reporting
            </li>
            <li>
              <b>Integrations:</b> payment gateways, REST APIs, deep links
            </li>
            <li>
              <b>Delivery:</b> CI/CD for mobile, Play Store releases and staged rollouts
            </li>
          </ul>

          <div className="next-up">
            <span className="k">Related</span>
            <a href="/django-developer-nepal">
              Django &amp; backend <em>APIs, PostgreSQL, scale</em>
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
