import { site } from "@/content/site";
import Aurora from "./Aurora";
import Portrait from "./Portrait";

export default function Hero() {
  return (
    <section className="hero">
      <span id="top" />
      <Aurora />
      <div className="wrap">
        <div>
          <span className="eyebrow">{site.hero.eyebrow}</span>
          <h1>
            Backends, infra,
            <br />
            and apps that <span className="grad-text">scale.</span>
          </h1>
          <p className="lead">
            Engineer and co-founder shipping <b>Django backends</b>, <b>cloud infrastructure</b>, and{" "}
            <b>Flutter apps</b> — built to scale, from Kathmandu to production.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#work">
              See the work →
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        <Portrait className="portrait--hero" />
      </div>
    </section>
  );
}
