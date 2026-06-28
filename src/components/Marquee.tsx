import { site } from "@/content/site";

export default function Marquee() {
  // duplicate the list so the CSS marquee loops seamlessly (translateX -50%)
  const items = [...site.companies, ...site.companies];

  return (
    <div className="marq-sec">
      <div className="marq-label">Building &amp; shipping at</div>
      <div className="marquee">
        <div className="track">
          {items.map((name, i) => (
            <span className="co" key={`${name}-${i}`} aria-hidden={i >= site.companies.length}>
              <span className="star">✦</span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
