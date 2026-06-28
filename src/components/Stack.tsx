import { site } from "@/content/site";

export default function Stack() {
  return (
    <section id="stack" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Stack</span>
          <h2>Tools I reach for.</h2>
        </div>
        <div className="stack-grid reveal">
          {site.stack.map((g) => (
            <div className="stack-grp" key={g.group}>
              <h3>{g.group}</h3>
              <div className="chips">
                {g.items.map((it) => (
                  <span className="chip" key={it}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
