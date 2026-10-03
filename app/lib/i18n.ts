/**
 * The two languages of the site. English is the source; a French page lives
 * at /fr + the same path and is translated from the English one (see
 * scripts/fr-sync.mjs, which lists the French pages left behind).
 */

export type Lang = "en" | "fr";

/** English paths that have a French page. News articles all do. */
export const FR_PATHS = [
  "/",
  "/applications",
  "/applications/navigation",
  "/technology",
  "/company",
  "/events",
  "/news",
  "/contact",
  "/legal",
  "/privacy",
];

export function langOf(pathname: string): Lang {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

function hasFrench(enPath: string): boolean {
  return FR_PATHS.includes(enPath) || enPath.startsWith("/news/");
}

/** The French address of an English link when the page exists in French; the link unchanged otherwise. */
export function frHref(href: string): string {
  if (!href.startsWith("/")) return href;
  const [path, hash] = href.split("#");
  if (!hasFrench(path)) return href;
  return (path === "/" ? "/fr" : `/fr${path}`) + (hash ? `#${hash}` : "");
}

/** The same page in the other language; that language's home page when there is none. */
export function counterpart(pathname: string): string {
  if (langOf(pathname) === "fr") {
    if (pathname === "/fr") return "/";
    const en = pathname.slice(3);
    return hasFrench(en) ? en : "/";
  }
  return hasFrench(pathname) ? frHref(pathname) : "/fr";
}

/** hreflang alternates for the metadata of a page that exists in both languages. */
export function languages(enPath: string): { en: string; fr: string } {
  return { en: enPath, fr: frHref(enPath) };
}
