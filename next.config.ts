import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts, app/(en) and app/fr, so that each language is served
    // with its own <html lang>: an address that matches no page is then served
    // app/global-not-found.tsx (no layout sits above both languages).
    globalNotFound: true,
  },
};

export default nextConfig;
