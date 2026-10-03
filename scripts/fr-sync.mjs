// French pages kept in step with their English source.
//
// Every translated file starts with
//   // fr-source: <path of the English file> sha256:<first 16 hex of its hash>
// This script recomputes the hash of each source and lists the French files
// whose source has changed since they were translated, and the files with no
// recorded hash. Exit code 1 when something is behind (use --warn to only report).
//
//   node scripts/fr-sync.mjs          list, exit 1 if anything is behind
//   node scripts/fr-sync.mjs --warn   list, always exit 0

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const dirs = [join(root, "app", "fr"), join(root, "app", "lib", "fr")];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|mjs)$/.test(name)) out.push(p);
  }
  return out;
}

// Line endings are normalised, so the hash is the same on Windows and Linux checkouts.
const CRLF = String.fromCharCode(13, 10);
const LF = String.fromCharCode(10);
const hash = (p) =>
  createHash("sha256").update(readFileSync(p, "utf8").replaceAll(CRLF, LF)).digest("hex").slice(0, 16);
const behind = [];
const unhashed = [];
let fresh = 0;

for (const file of dirs.flatMap((d) => walk(d))) {
  const head = readFileSync(file, "utf8").split("\n", 4).join("\n");
  const m = head.match(/\/\/ fr-source: (\S+)(?: sha256:([0-9a-f]{16}))?/);
  const rel = relative(root, file).replaceAll("\\", "/");
  if (!m) continue; // a French-only file (layout, summary page)
  const src = join(root, m[1]);
  if (!existsSync(src)) {
    behind.push(`${rel}  (source missing: ${m[1]})`);
  } else if (!m[2]) {
    unhashed.push(`${rel}  (no hash recorded for ${m[1]})`);
  } else if (hash(src) !== m[2]) {
    behind.push(`${rel}  <- ${m[1]} has changed`);
  } else {
    fresh += 1;
  }
}

console.log(`French files in step with their source: ${fresh}`);
for (const line of behind) console.log(`  behind   ${line}`);
for (const line of unhashed) console.log(`  unhashed ${line}`);
if ((behind.length || unhashed.length) && !process.argv.includes("--warn")) process.exit(1);
