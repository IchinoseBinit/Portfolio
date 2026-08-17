import Nav from "./Nav";
import Footer from "./Footer";
import Reveals from "./Reveals";

/**
 * Chrome for every non-home page: nav, breadcrumb, H1 + lede, then content.
 * Keeps topic pages and blog posts visually identical to the home page.
 */
export default function PageShell({
  crumb,
  title,
  lede,
  children,
}: {
  crumb: { label: string; href?: string }[];
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>
        <article className="page">
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              {crumb.map((c, i) => (
                <span key={c.label}>
                  {c.href ? <a href={c.href}>{c.label}</a> : c.label}
                  {i < crumb.length - 1 ? <span aria-hidden="true"> / </span> : null}
                </span>
              ))}
            </nav>
            <h1>{title}</h1>
            {lede ? <p className="lede">{lede}</p> : null}
            {children}
          </div>
        </article>
      </main>
      <Footer />
      <Reveals />
    </>
  );
}
