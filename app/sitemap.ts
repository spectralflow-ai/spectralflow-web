import type { MetadataRoute } from "next";

const BASE = "https://spectralflow.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/technology", "/applications", "/company", "/news", "/contact", "/legal", "/privacy"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
