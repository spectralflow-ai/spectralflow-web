// Tells the GNSS map component whether gpsjam.org can be shown in a frame
// right now: the site answers with a success status and does not forbid
// framing. Asked by the page, answered from the server, so the visitor's
// browser makes no extra request to the third-party site. Cached for a few
// minutes so that gpsjam.org sees at most a handful of checks.

const LIVE_URL = "https://gpsjam.org/";
const TIMEOUT_MS = 6000;
const TTL_MS = 5 * 60 * 1000;

export const dynamic = "force-dynamic";

let memo: { ok: boolean; at: number } | null = null;

async function check(): Promise<boolean> {
  try {
    const res = await fetch(LIVE_URL, {
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const csp = res.headers.get("content-security-policy") ?? "";
    const ok = res.ok && !res.headers.has("x-frame-options") && !/frame-ancestors/i.test(csp);
    await res.body?.cancel().catch(() => {});
    return ok;
  } catch {
    return false;
  }
}

export async function GET() {
  const now = Date.now();
  if (!memo || now - memo.at > TTL_MS) {
    memo = { ok: await check(), at: now };
  }
  return Response.json(
    { ok: memo.ok },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
