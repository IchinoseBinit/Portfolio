/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Permanent redirects for URLs from the pre-2026 static site. Google still crawls these
  // (Search Console lists them as 404s), and old inbound links may point at them.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/Contact.html", destination: "/#contact", permanent: true },
      { source: "/Blogs.html", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
