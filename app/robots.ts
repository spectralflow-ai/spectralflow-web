import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/facts";

// Pages under /r/ are tailored, unlisted pages: kept out of crawlers and the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/r/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
