import type { MetadataRoute } from "next";
import { VERTICAL_SLUGS } from "./lib/verticals";

// Canonical host = www (the host the site actually serves on; the apex redirects to it).
const BASE = "https://www.spectralflow.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "/technology", "/applications", "/tools", "/company", "/news", "/contact", "/legal", "/privacy"];
  const verticals = VERTICAL_SLUGS.map((slug) => `/applications/${slug}`);

  const entry = (path: string): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/applications/") ? 0.8 : 0.7,
  });

  return [...core, ...verticals].map(entry);
}
