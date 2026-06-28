"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";

export default function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = bodyRef.current;
    if (!host) return;
    const lines = site.terminal.lines;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    host.innerHTML = "";

    if (reduce) {
      host.innerHTML = lines.map((l) => `<div class="tline show">${l}</div>`).join("");
      return;
    }

    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const add = () => {
      if (n >= lines.length) {
        const c = document.createElement("span");
        c.className = "tcursor";
        host.lastChild?.appendChild(c);
        return;
      }
      const d = document.createElement("div");
      d.className = "tline";
      d.innerHTML = lines[n];
      host.appendChild(d);
      requestAnimationFrame(() => d.classList.add("show"));
      n++;
      timer = setTimeout(add, n === 1 ? 500 : 520);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            add();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(host);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="term" aria-hidden="true">
      <div className="term-bar">
        <i className="tdot r" />
        <i className="tdot y" />
        <i className="tdot g" />
        <span>{site.terminal.title}</span>
      </div>
      <div className="term-body" ref={bodyRef} />
    </div>
  );
}
