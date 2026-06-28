import { site } from "@/content/site";
import Terminal from "./Terminal";

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid reveal">
          <div>
            <div className="section-head">
              <span className="eyebrow">About</span>
              <h2>From the database to the deploy — I work across the whole stack.</h2>
            </div>
            <p>
              I&apos;m <b>Binit Koirala</b> — a software engineer and co-founder in Nepal who works end to
              end, from <b>Django backends and DevOps pipelines</b> to the mobile apps people actually open.
            </p>
            <p>
              At <b>Fasto</b>, the company I co-founded, I own the backend and infrastructure: Django services,
              CI/CD, and deployment built to stay fast and reliable as things grow. Before that I spent years at{" "}
              <b>Code Himalaya</b> moving from Flutter developer to senior, and led mobile at <b>StretchYo</b>, a
              US habit-building app.
            </p>
            <p>
              Along the way I&apos;ve shipped apps to the Play Store with <b>50,000+ downloads</b>, wired up
              payments and push notifications, and learned to care about the unglamorous things — uptime, clean
              architecture, and software that scales without drama.
            </p>
          </div>
          <div className="about-right">
            <Terminal />
            <div className="about-aside">
              {site.facts.map((f) => (
                <div key={f.k}>
                  <b>{f.k}</b>
                  <span>{f.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
