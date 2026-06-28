import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Binit Koirala",
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070710",
    theme_color: "#070710",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
