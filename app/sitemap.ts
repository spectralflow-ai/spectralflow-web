import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/facts";
import { POSTS } from "./lib/news";

// Canonical host = www (the host the site serves on; the apex redirects to it).
const BASE = SITE_URL;

type Entry = MetadataRoute.Sitemap[number];

const ROUTES: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/applications/navigation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/applications", priority: 0.8, changeFrequency: "monthly" },
  { path: "/applications/life-sciences", priority: 0.6, changeFrequency: "monthly" },
  { path: "/applications/semiconductors", priority: 0.6, changeFrequency: "monthly" },
  { path: "/applications/quantum-computing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/technology", priority: 0.8, changeFrequency: "monthly" },
  { path: "/company", priority: 0.8, changeFrequency: "monthly" },
  { path: "/news", priority: 0.7, changeFrequency: "weekly" },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/press", priority: 0.6, changeFrequency: "monthly" },
  { path: "/glossary", priority: 0.6, changeFrequency: "monthly" },
  { path: "/fr", priority: 0.5, changeFrequency: "monthly" },
  { path: "/instrument", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages carry the build date; each article carries its own publication date.
  const built = new Date();

  const pages: Entry[] = ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: built,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const articles: Entry[] = POSTS.map((p) => ({
    url: `${BASE}/news/${p.slug}`,
    lastModified: new Date(`${p.updated ?? p.date}T12:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...articles];
}
