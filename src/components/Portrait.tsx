"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function Portrait({ className = "" }: { className?: string }) {
  const [error, setError] = useState(false);

  return (
    <div className={`portrait${error ? " noimg" : ""} ${className}`.trim()}>
      {/* Plain <img> (not next/image) so the onError monogram fallback is simple.
          Drop your headshot at /public/images/binit.jpg — see site.hero.portrait. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.hero.portrait}
        alt={site.hero.portraitAlt}
        width={900}
        height={1125}
        fetchPriority="high"
        decoding="async"
        onError={() => setError(true)}
      />
      <span className="mono-fallback">BK</span>
    </div>
  );
}
