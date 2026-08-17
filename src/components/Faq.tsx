import { site } from "@/content/site";

// Native <details> — no JS, keyboard-accessible and crawlable by default.
export default function Faq() {
  return (
    <section id="faq" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions people ask.</h2>
        </div>
        <div className="faq reveal">
          {site.faq.map((f) => (
            <details key={f.q}>
              <summary>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
