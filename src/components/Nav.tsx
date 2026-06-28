"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#top">
        binit<i>.</i>koirala
      </a>
      <nav className={`links${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {site.nav.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact">
          Get in touch
        </a>
      </nav>
      <button
        className="menu-btn"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "close" : "menu"}
      </button>
    </header>
  );
}
