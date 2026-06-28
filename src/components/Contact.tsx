import { site } from "@/content/site";

export default function Contact() {
  const c = site.contact;
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact">
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h2 style={{ marginTop: 18 }}>
              Building something that needs to <span className="grad-text">scale?</span>
            </h2>
            <p className="sub">
              Backend, infrastructure, mobile — or just a conversation about systems. Reach out.
            </p>
          </div>
          <div className="lines reveal">
            <a href={`mailto:${c.email}`}>
              <span className="k">email</span>
              <span className="vv">{c.email}</span>
            </a>
            <a href={c.linkedin} target="_blank" rel="noopener">
              <span className="k">linkedin</span>
              <span className="vv">{c.linkedinLabel}</span>
            </a>
            <a href={c.phoneHref}>
              <span className="k">phone</span>
              <span className="vv">{c.phone}</span>
            </a>
            <div>
              <span className="k">location</span>
              <span className="vv">{c.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
