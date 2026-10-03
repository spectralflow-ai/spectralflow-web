import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/facts";
import { POSTS } from "./lib/news";
import { FR_PATHS, frHref } from "./lib/i18n";

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
  { path: "/fr/en-bref", priority: 0.5, changeFrequency: "monthly" },
  { path: "/instrument", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/legal", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Pages carry the build date; each article carries its own publication date.
  const built = new Date();

  // A page that exists in both languages is listed twice, each entry naming
  // the other (hreflang), so that search engines pair them.
  const pair = (enPath: string) => {
    const en = `${BASE}${enPath}`;
    const fr = `${BASE}${frHref(enPath || "/")}`;
    return { languages: { en, fr, "x-default": en } };
  };
  const bilingual = (enPath: string) => FR_PATHS.includes(enPath || "/") || enPath.startsWith("/news/");

  const pages: Entry[] = ROUTES.flatMap((r) => {
    const base: Entry = {
      url: `${BASE}${r.path}`,
      lastModified: built,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    };
    if (!bilingual(r.path)) return [base];
    const alternates = pair(r.path);
    return [
      { ...base, alternates },
      { ...base, url: `${BASE}${frHref(r.path || "/")}`, priority: r.priority * 0.9, alternates },
    ];
  });

  const articles: Entry[] = POSTS.flatMap((p) => {
    const base: Entry = {
      url: `${BASE}/news/${p.slug}`,
      lastModified: new Date(`${p.updated ?? p.date}T12:00:00Z`),
      changeFrequency: "yearly",
      priority: 0.5,
    };
    const alternates = pair(`/news/${p.slug}`);
    return [
      { ...base, alternates },
      { ...base, url: `${BASE}/fr/news/${p.slug}`, priority: 0.45, alternates },
    ];
  });

  return [...pages, ...articles];
}
