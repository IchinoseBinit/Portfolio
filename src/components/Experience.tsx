import { site } from "@/content/site";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Experience</span>
          <h2>Five years across startups, agencies, and the classroom.</h2>
        </div>
        <div className="timeline reveal">
          {site.experience.map((e, i) => (
            <div className="tl" key={i}>
              <div className="yr">{e.years}</div>
              <div>
                <h3>{e.role}</h3>
                <div className="org">{e.org}</div>
                <div className="loc">{e.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
