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
          {site.expertise.map((c) => (
            <div className="card reveal" key={c.n}>
              <div className="ix">{c.n}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
