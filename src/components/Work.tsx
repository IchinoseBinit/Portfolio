import { site } from "@/content/site";

export default function Work() {
  return (
    <section id="work" className="section-alt">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Selected work</span>
          <h2>Where I build, and what I&apos;ve shipped.</h2>
          <p className="sub">
            A few of the companies and products I&apos;ve worked on across backend, infrastructure, and mobile.
          </p>
        </div>
        <div className="work-list">
          {site.work.map((w) => {
            const external = w.href.startsWith("http");
            return (
              <a
                className="work reveal"
                href={w.href}
                key={w.name}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <span className="idx">{w.idx}</span>
                <span>
                  <h3>
                    {w.name} <span className="role">{w.role}</span>
                  </h3>
                  <p>{w.desc}</p>
                  <span className="tags">
                    {w.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </span>
                <span className="go">{external ? "visit →" : "details →"}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
