export const meta = {
  slug: "flutter-bad-networks-nepal",
  title: "Flutter on a bad connection: building apps that survive real mobile networks",
  description:
    "Requests that die mid-flight, optimistic updates that need honest rollback, and retries that don't hammer a weak connection — Flutter for real Nepali networks.",
  date: "2026-08-17",
  readingTime: "6 min read",
};

export default function Body() {
  return (
    <>
      <p>
        Most Flutter apps are written on office fibre and tested on an emulator that has never
        dropped a packet. Then they ship to a phone on a bus between Kathmandu and Dharan, with two
        bars of 4G that quietly becomes 3G in a tunnel. Almost every bug report that starts with
        &quot;it just spins forever&quot; comes from that gap, and as a Flutter developer in Nepal
        it&apos;s the gap you spend most of your debugging life in.
      </p>
      <p>
        The useful thing is that bad networks fail in a small number of recognisable ways. Once you
        can name them, most of the fixes are unremarkable.
      </p>

      <h2>The hard case isn&apos;t offline — it&apos;s &quot;sort of connected&quot;</h2>
      <p>
        Fully offline is easy. There&apos;s no socket, the error arrives immediately, and you show a
        message. What actually breaks apps is a connection that exists, accepts your request, and
        then delivers nothing: a TCP handshake that completes and a response that never arrives, or
        arrives one byte at a time.
      </p>
      <p>
        This is why connectivity checks mislead people. <code>connectivity_plus</code> reports the{" "}
        <b>interface type</b> — WiFi, mobile, none — and its own documentation is blunt that this
        doesn&apos;t guarantee internet access, and that you shouldn&apos;t use it to decide whether
        a request will work. A captive portal at a café reports WiFi. A tower you&apos;re handing
        off from reports mobile.
      </p>
      <p>
        Use connectivity events as a <em>hint</em> — good for &quot;the network just came back, retry
        now&quot; or for a banner — and never as a precondition. If you want an actual reachability
        signal you need something that performs a real request, like{" "}
        <code>internet_connection_checker_plus</code>. But the request you were going to make is
        itself the best reachability test you have.
      </p>

      <h2>Set your timeouts, because nobody set them for you</h2>
      <p>
        The default timeout in Dart is worse than most people assume.{" "}
        <code>HttpClient.connectionTimeout</code> is <code>null</code> by default, which means the OS
        default applies — far longer than any human will sit and watch a spinner. If you never set a
        timeout, you didn&apos;t pick a fast failure; you picked whatever Android felt like.
      </p>
      <p>
        With <code>dio</code> you get three knobs, and the third one is routinely misread:
      </p>
      <ul>
        <li>
          <b>
            <code>connectTimeout</code>
          </b>{" "}
          — establishing the connection. Should be short. A connection that hasn&apos;t opened in a
          few seconds on a mobile network usually isn&apos;t going to.
        </li>
        <li>
          <b>
            <code>sendTimeout</code>
          </b>{" "}
          — uploading the request body. Matters for image uploads, barely for a JSON POST.
        </li>
        <li>
          <b>
            <code>receiveTimeout</code>
          </b>{" "}
          — <em>not</em> a total budget for the response. It applies to the wait before the first
          bytes and then between data events. A response trickling in slowly enough to keep resetting
          that clock can hang around much longer than the number you wrote.
        </li>
      </ul>
      <p>
        If you need a hard ceiling on the whole operation, add one explicitly. But be aware that
        wrapping a call in <code>Future.timeout</code> only gives <em>you</em> a{" "}
        <code>TimeoutException</code> — the work underneath carries on, and the server may still
        process the request. To actually abandon it, cancel it: Dio&apos;s <code>CancelToken</code>{" "}
        terminates the requests bound to it, and <code>CancelToken.isCancel(e)</code> lets you tell a
        cancellation apart from a real failure so you don&apos;t show an error for a screen the user
        already left.
      </p>

      <div className="callout">
        <p>
          A timeout is a product decision disguised as a config value. &quot;How long is this user
          willing to wait before we tell them the truth?&quot; is not a question the networking
          library can answer for you.
        </p>
      </div>

      <h2>Optimistic updates need an honest rollback</h2>
      <p>
        Optimistic UI is the right call on a slow network — waiting for a round trip before showing a
        tap makes the app feel broken. The mistake is modelling it as two states, local and synced,
        when there are three: what the user intended, what&apos;s in flight, and what the server has
        confirmed.
      </p>
      <p>
        When the write fails, roll back <b>visibly</b>. A silent revert is the worst outcome
        available: the user saw the item added, looked away, and now it&apos;s gone with no
        explanation, so they either do it twice or stop trusting the app. Undo the state, say what
        happened, and offer the retry as a deliberate action.
      </p>
      <p>
        Then there&apos;s the genuinely ambiguous case, and it&apos;s the common one on a flaky link:
        the request timed out, so you don&apos;t know whether it succeeded. You cannot resolve that
        on the client. What you can do is make repeating it harmless — send a client-generated
        idempotency key with every mutation so the{" "}
        <a href="/django-developer-nepal">backend</a> can recognise a duplicate and return the
        original result instead of creating a second order. Do that and an ambiguous failure becomes
        a retry instead of an incident.
      </p>

      <h2>Retries that don&apos;t make things worse</h2>
      <p>
        The instinct on a failed request is to try again immediately. On a congested or weak
        connection that&apos;s actively harmful — you&apos;re adding load to the thing that&apos;s
        already struggling, and if every client in a region does it after an outage you&apos;ve built
        a small self-inflicted DDoS.
      </p>
      <p>
        The rules are boring and they work. Back off exponentially. Add jitter, so clients
        don&apos;t resynchronise into waves. Respect <code>Retry-After</code> when the server sends
        it — a 429 is an instruction, not an error to route around. Cap total attempts, and once
        you&apos;ve hit the cap, stop and tell the user rather than looping forever behind a spinner.
      </p>
      <p>
        And know what your retry library is actually doing. <code>RetryClient</code> in{" "}
        <code>package:http/retry.dart</code> defaults to three retries and keeps a copy of the
        request data so it can resend — which is worth knowing before you stream a large upload
        through it. <code>dio_smart_retry</code> defaults to three retries at 1, 3 and 5 seconds and
        retries a fixed list of statuses including 408, 429, 500, 502, 503 and 504.
      </p>
      <p>
        Both are reasonable. Neither knows whether <em>your</em> POST is safe to repeat — they retry
        on status and error type, not on whether the operation has side effects. A blanket retry
        interceptor over an endpoint that charges a card is a bug you&apos;ve installed on purpose.
        Decide idempotency per endpoint, not per client.
      </p>
      <p>
        One more distinction worth drawing: a retry the user is waiting on and a retry they
        aren&apos;t are different problems. The first belongs in your HTTP layer with a tight cap.
        The second — an upload that should land eventually — belongs in a persisted queue handed to
        the OS. Android&apos;s WorkManager will re-run a failed job on a backoff policy for you; on
        iOS, BGTaskScheduler runs when it chooses and you schedule the next attempt yourself. Don&apos;t
        assume the Flutter wrapper hides that asymmetry.
      </p>

      <h2>Offline-first is usually overkill. Offline-aware isn&apos;t.</h2>
      <p>
        &quot;Offline-first&quot; gets used as a synonym for &quot;handles bad networks&quot;, but
        it&apos;s a much bigger commitment: a local database as the source of truth, a sync engine, a
        conflict-resolution policy, and schema migrations on thousands of devices you can&apos;t
        inspect. That&apos;s a subsystem with its own bug class, and it earns its keep only when the
        app&apos;s core loop is genuinely local.
      </p>
      <p>
        For a lot of products it isn&apos;t. Quick commerce is the clearest example — at{" "}
        <a href="https://fasto.com.np" target="_blank" rel="noopener noreferrer">
          Fasto
        </a>{" "}
        the promise is delivery in ten minutes, and stock levels and order status are only meaningful
        as live server state. There is no useful offline version of &quot;is this in stock right
        now&quot;. Building a sync engine there would add complexity to reach an answer you
        can&apos;t honestly give.
      </p>
      <p>Offline-aware is the cheaper ninety percent:</p>
      <ul>
        <li>
          <b>Cache last-known-good reads</b> and render them with their age visible. Stale data
          labelled stale is useful. Stale data pretending to be fresh is a lie.
        </li>
        <li>
          <b>Queue only the writes that matter</b> — the handful where losing the user&apos;s input
          would be unacceptable. Persist those; let the rest fail loudly and be retried by hand.
        </li>
        <li>
          <b>Never lose typed input.</b> Draft state survives a process death; a network error
          shouldn&apos;t empty a form.
        </li>
        <li>
          <b>Make degraded mode a real state</b> in your state management, not a boolean checked in
          three widgets.
        </li>
      </ul>
      <p>
        When you do need real persistence, SQL-backed options like <code>sqflite</code> and{" "}
        <code>drift</code> are the conservative choice. Check the maintenance health of whatever
        store you pick before you commit to it — for something holding user data across app
        upgrades, an active maintainer matters more than benchmarks.
      </p>

      <h2>Test the failures, not just the happy path</h2>
      <p>
        None of this holds up unless you provoke it. Throttle the connection and keep it throttled
        while you use the app. Turn on airplane mode <em>mid-request</em>, not before it. Kill the
        process while a write is in flight and check what the user sees on relaunch. Point the app at
        an endpoint that accepts the connection and never responds — that one finds missing timeouts
        faster than anything else.
      </p>
      <p>
        Do that on a mid-range Android device rather than a flagship or a simulator, because that
        device mix is the one most apps in Nepal actually run on. The apps I&apos;ve shipped that
        held up were not the ones with the cleverest architecture; they were the ones where the bad
        paths had been walked deliberately before a user found them.
      </p>
      <p>
        More on how I approach this in{" "}
        <a href="/mobile-app-developer-nepal">Flutter and mobile development</a>, on the{" "}
        <a href="/django-developer-nepal">API side</a> that has to make these retries safe, and in{" "}
        <a href="/blog/why-django-gets-slow">why Django apps get slow as they grow</a> — because a
        slow endpoint and a bad network produce the same spinner.
      </p>
    </>
  );
}
