import { site } from "@/content/site";

export default function Footer() {
  const s = site.socials;
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <span className="c">© 2026 {site.name} — built in Nepal.</span>
          <div className="social">
            <a href={s.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a href={s.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={s.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
            <a href={s.email}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
