import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/r/" },
    sitemap: "https://spectralflow.ai/sitemap.xml",
    host: "https://spectralflow.ai",
  };
}
