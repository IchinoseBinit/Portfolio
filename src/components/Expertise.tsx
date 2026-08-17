import { site } from "@/content/site";

export default function Expertise() {
  return (
    <section id="expertise">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">What I do</span>
          <h2>Built for scale — from the schema to the cluster.</h2>
        </div>
        <div className="cards">
          {site.expertise.map((c) => {
            // Three of the four cards have a dedicated topic page.
            const href = "href" in c ? c.href : undefined;
            const inner = (
              <>
                <div className="ix">{c.n}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                {href ? <span className="more">Read more →</span> : null}
              </>
            );
            return href ? (
              <a className="card reveal" href={href} key={c.n}>
                {inner}
              </a>
            ) : (
              <div className="card reveal" key={c.n}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
