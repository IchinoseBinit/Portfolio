import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Branded social-share card, generated in code (no static asset needed).
export const runtime = "edge";
export const alt = `${site.name} — Backend & DevOps Engineer, Co-founder`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#070710",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(124,92,255,.45), transparent 45%), radial-gradient(circle at 85% 30%, rgba(34,211,238,.4), transparent 45%), radial-gradient(circle at 60% 95%, rgba(255,92,157,.35), transparent 50%)",
          color: "#ECEDF6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#22D3EE",
            fontWeight: 600,
          }}
        >
          Backend · DevOps · Co-founder — Nepal
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: "-0.03em" }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#9296B0", maxWidth: 900, lineHeight: 1.35 }}>
            Scalable Django backends, cloud infrastructure & Flutter apps — built to scale, from Kathmandu to production.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#5E627C",
          }}
        >
          <div style={{ display: "flex" }}>binitkoirala.com.np</div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 800,
              background: "linear-gradient(100deg,#9A7CFF,#22D3EE)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            BK
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
