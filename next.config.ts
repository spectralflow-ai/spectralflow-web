import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts, app/(en) and app/fr, so that each language is served
    // with its own <html lang>: an address that matches no page is then served
    // app/global-not-found.tsx (no layout sits above both languages).
    globalNotFound: true,
  },
  // A renamed article keeps its old address.
  async redirects() {
    return [
      {
        source: "/news/seventeen-patent-applications",
        destination: "/news/eighteen-patent-applications",
        permanent: true,
      },
      {
        source: "/fr/news/seventeen-patent-applications",
        destination: "/fr/news/eighteen-patent-applications",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
