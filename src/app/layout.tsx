import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    url: "/",
    images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
};

// Person schema for rich results — keep job title generic (no "CTO" per request).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "Backend & DevOps Engineer, Co-founder",
  worksFor: { "@type": "Organization", name: "Fasto" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Itahari International College" },
  address: { "@type": "PostalAddress", addressLocality: "Dharan / Kathmandu", addressCountry: "Nepal" },
  knowsAbout: ["Django", "Python", "DevOps", "CI/CD", "Scalable systems", "System design", "Flutter", "Dart", "Mobile app development"],
  sameAs: [site.socials.linkedin, site.socials.instagram].filter((u) => u && u !== "#"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
