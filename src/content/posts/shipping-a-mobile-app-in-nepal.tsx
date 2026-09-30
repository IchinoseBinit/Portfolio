export const meta = {
  slug: "shipping-a-mobile-app-in-nepal",
  title: "Shipping a mobile app in Nepal: the part that starts after launch",
  description:
    "Store deadlines you don't control, releases you can't take back, payments that need server-side reconciliation, and notifications that get dropped. The real work.",
  date: "2026-10-01",
  readingTime: "7 min read",
};

export default function Body() {
  return (
    <>
      <p>
        When someone commissions an app, the mental model is usually construction: you agree a
        scope, it gets built, it&apos;s handed over, it&apos;s done. That model is wrong in a way
        that costs real money, and it&apos;s the single most common misunderstanding I run into as a{" "}
        <b>mobile app developer in Nepal</b>. Launch isn&apos;t the end of the build. It&apos;s the
        moment your app starts accruing obligations to two app stores, a fleet of devices you
        can&apos;t inspect, and a payment gateway that will eventually disagree with you about
        whether a customer paid.
      </p>

      <h2>You don&apos;t control your own release calendar</h2>
      <p>
        Google Play raises its target API level floor every year, and it applies to <b>updates</b>,
        not just new apps. As of <b>31 August 2026</b>, new apps and app updates for phones and
        tablets must target Android 16 (API level 36) or higher, and existing apps must target at
        least Android 15 (API level 35) to stay available to new users on newer devices. Play offered
        extensions to <b>1 November 2026</b>.
      </p>
      <p>
        Read that as a business fact rather than a technical one: an app with a hundred thousand
        installs cannot ship a one-line crash fix until its <code>targetSdk</code> is current. Each
        bump brings behaviour changes — background execution, permissions, storage, notification
        posting — that you test for rather than just recompile against. If nobody is budgeted to do
        that, your app has a quiet expiry date. Apps quietly stop reaching new users every year for
        exactly this reason, not because anything broke.
      </p>
      <p>
        A second calendar problem hits new apps. Personal Play developer accounts created after 13
        November 2023 can&apos;t publish to production until at least{" "}
        <b>12 testers stay opted in to a closed testing track for 14 consecutive days</b> —
        continuous means continuous, so if a tester drops out and rejoins, their clock restarts.
        That&apos;s weeks between &quot;the app works&quot; and &quot;the app is downloadable&quot;,
        and it belongs on the timeline before anyone promises a launch date.
      </p>

      <h2>A release is one-directional</h2>
      <p>
        Web deploys are reversible. Mobile releases aren&apos;t, and that changes how you ship.
        Staged rollouts are the main safety mechanism: you release to a percentage of users and raise
        it over time. If something is wrong, you <b>halt</b> the rollout, which stops additional
        users receiving that version. What it does not do is take the version back — Play&apos;s own
        documentation is explicit that users who already received it stay on it. Halting limits the
        blast radius. It does not undo the damage, and the only real fix is a higher version code
        shipped forward.
      </p>
      <p>
        Which is why the forced-update path has to exist <em>before</em> you need it. Play&apos;s
        in-app updates API carries an update priority from 0 to 5; at high priority you can present
        an immediate, blocking, full-screen update the user must accept. Two details decide whether
        that&apos;s available to you on a bad day:
      </p>
      <ul>
        <li>
          <b>Priority is set via the Google Play Developer API</b> — the{" "}
          <code>inAppUpdatePriority</code> field under <code>Edits.tracks.releases</code>. You
          cannot set it in the Play Console UI, which means it has to be part of your release
          automation, not a checkbox someone remembers.
        </li>
        <li>
          <b>It can only be set when you roll out the release, and cannot be changed afterwards.</b>{" "}
          You can&apos;t escalate yesterday&apos;s release to urgent. You get one chance, at publish
          time, to declare how badly users need this build.
        </li>
      </ul>
      <p>
        The client-side handling also has to already be in the version people are running. An app
        that never learned to check <code>updatePriority()</code> can&apos;t be told to force-update;
        you&apos;re reduced to hoping auto-updates reach people. That&apos;s the trap when you ship a
        breaking API change — your server moves on and the old clients don&apos;t know they should
        care. The honest answer is to not get there: version the API, keep the old contract alive
        while the install base drains, and treat a forced update as the emergency lever rather than
        the migration plan.
      </p>

      <div className="callout">
        <p>
          Every capability you might need in an incident has to be shipped before the incident. A
          forced-update path, a remote kill switch for a broken feature, a way to point the app at a
          different endpoint — none of those can be added to a build that&apos;s already on the
          phone.
        </p>
      </div>

      <h2>Payments: the client is a witness, not the record</h2>
      <p>
        Payment bugs generate the angriest messages, and almost all of them come from trusting the
        wrong thing. The user pays in eSewa or Khalti, gets redirected back, and the app marks the
        order paid based on that redirect. Then a redirect gets lost — connection drops, user kills
        the app, browser handoff fails — and you have money moved with no order, or an order with no
        money.
      </p>
      <p>
        The record of truth is the gateway, reached from your server. eSewa&apos;s ePay v2 documents a
        status-check endpoint taking <code>product_code</code>, <code>total_amount</code> and{" "}
        <code>transaction_uuid</code>, returning states you have to actually handle:{" "}
        <code>COMPLETE</code>, <code>PENDING</code>, <code>CANCELED</code>, <code>NOT_FOUND</code>,{" "}
        <code>FULL_REFUND</code>, <code>PARTIAL_REFUND</code>, and <code>AMBIGUOUS</code> for a
        transaction in a halt state. eSewa also tells you to verify the signature on the response
        body rather than taking the payload at face value. Khalti works the same shape — you hold a{" "}
        <code>pidx</code> and your backend calls the ePayment lookup endpoint to find out what really
        happened.
      </p>
      <p>
        So reconciliation belongs on the <a href="/django-developer-nepal">Django backend</a>: verify
        the signature, call the status API, confirm the amount matches what you charged, then
        transition the order. Treat a payment as a state machine with a pending state a background
        job resolves, because <code>PENDING</code> and <code>AMBIGUOUS</code> aren&apos;t errors —
        they&apos;re the gateway telling you to ask again later. And make the flow idempotent with
        your own transaction identifier, so tapping &quot;pay&quot; twice on a flaky connection
        can&apos;t produce two charges.
      </p>
      <p>
        None of that logic can live in the app. A client can be uninstalled mid-flow, and it has
        every incentive to be wrong.
      </p>

      <h2>Push notifications are best-effort, and the mid-range Android market makes that worse</h2>
      <p>
        FCM is not a delivery guarantee, and the documentation doesn&apos;t pretend otherwise.
        Messages have a time to live — up to 2,419,200 seconds, 28 days, and four weeks by default —
        and if the device never reconnects the message is discarded. Set a <code>collapse_key</code>{" "}
        and a newer message replaces the pending one entirely; you also only get four distinct
        collapse keys at a time. High priority buys a wake from Doze, but it&apos;s not a blank
        cheque: Firebase documents that if FCM detects a pattern of high-priority messages that
        don&apos;t produce a user-facing notification, your messages get{" "}
        <b>deprioritised to normal</b>, assessed over roughly seven days of behaviour.
      </p>
      <p>
        Then there&apos;s the layer that isn&apos;t in any Google document. Around three quarters of
        mobile traffic in Nepal is Android, skewed heavily toward mid-range devices from
        manufacturers who ship their own battery manager on top of AOSP. Xiaomi, Oppo, Vivo and
        Realme skins are meaningfully more aggressive than stock — per-app autostart permissions off
        by default, periodic sweeps that kill background processes, apps frozen after a day or two of
        not being opened. It&apos;s documented well enough that there&apos;s a whole project
        cataloguing it by vendor. You can&apos;t fix it from your code.
      </p>
      <p>
        What you can do is design so a dropped notification isn&apos;t data loss. Never make a push
        the only way a user learns something — if it matters, it has to be in the app state when they
        open it, fetched fresh. Use notifications to <em>prompt</em> a sync, not to carry the
        payload. For anything time-critical, like an order status, reconnect on foreground rather
        than trusting that a message arrived. And measure delivery instead of assuming it:
        &quot;we sent it&quot; and &quot;they saw it&quot; are different numbers.
      </p>

      <h2>Testing on a flagship tells you almost nothing</h2>
      <p>
        A developer on a recent flagship with good WiFi will not reproduce the bugs your users have.
        Different OS version, different vendor skin, a quarter of the RAM, a screen that makes your
        layout overflow, and a network that drops packets — I wrote about that last one in{" "}
        <a href="/blog/flutter-bad-networks-nepal">Flutter on a bad connection</a>. The interesting
        failures live on the devices that dominate the market here.
      </p>
      <p>
        This isn&apos;t only a quality argument — Google scores you on it. Android vitals sets
        bad-behaviour thresholds on core metrics: a <b>1.09%</b> user-perceived crash rate and a{" "}
        <b>0.47%</b> user-perceived ANR rate overall, plus an <b>8%</b> threshold on each for an
        individual phone model, assessed over 28 days. Exceed them and Play may reduce your
        app&apos;s visibility in search and browse, and may show a warning on your store listing. A
        crash confined to one popular mid-range handset is enough to trip the per-model threshold,
        and the per-model view is how you find it.
      </p>
      <p>
        So: crash reporting from day one, with builds symbolicated so the stack traces are readable.
        Watch vitals per device model, not only in aggregate. Triage on a real cheap phone.
      </p>

      <h2>What this means if you&apos;re hiring an app developer in Nepal</h2>
      <p>
        You&apos;re not buying a build. You&apos;re buying an ongoing relationship with two app
        stores, and it should be priced that way. A few questions separate people who&apos;ve
        maintained apps from people who&apos;ve only launched them:
      </p>
      <ul>
        <li>
          <b>Who bumps the target API level next year, and is it in scope?</b> If the answer is
          vague, you have an app with a shelf life.
        </li>
        <li>
          <b>How do we force an update if a release is broken?</b> The right answer mentions staged
          rollouts, that halting doesn&apos;t reverse anything, and a mechanism that&apos;s already
          in the shipped app.
        </li>
        <li>
          <b>Where does payment verification happen?</b> If any part of the answer is &quot;in the
          app&quot;, keep asking.
        </li>
        <li>
          <b>What devices was this tested on?</b> Model names, not &quot;Android and iOS&quot;.
        </li>
        <li>
          <b>Who watches the crash rate, and how?</b> If nobody does, the first report arrives as a
          one-star review.
        </li>
      </ul>
      <p>
        I&apos;ve worked on Flutter apps that have passed <b>50,000+ combined downloads</b> on the
        Play Store, and led mobile end to end at Sangatha — architecture, features and the release
        pipeline. The pipeline is the part people underestimate. Making a release boring is worth
        more than any single feature, because it&apos;s what lets you fix things quickly when a
        Tuesday goes wrong.
      </p>
      <p>
        More on how I approach{" "}
        <a href="/mobile-app-developer-nepal">Flutter and mobile development</a>, the{" "}
        <a href="/devops-engineer-nepal">CI/CD and monitoring</a> behind it, and{" "}
        <a href="/#work">where I&apos;ve done this</a>.
      </p>
    </>
  );
}
