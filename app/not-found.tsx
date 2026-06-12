import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 min-h-[70vh] flex flex-col items-center justify-center text-center py-24">
        <p className="eyebrow mb-4">Signal lost</p>
        <h1 className="display text-6xl md:text-8xl font-semibold tracking-tight mb-5">
          404<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="text-lg leading-relaxed max-w-md mb-9" style={{ color: "var(--text-secondary)" }}>
          This page is off the map — like GPS in contested airspace. Let&rsquo;s get you back on a
          known heading.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5">
          <Link href="/" className="btn-primary">
            Back to home <span>→</span>
          </Link>
          <Link href="/technology" className="btn-ghost">
            Explore the technology
          </Link>
        </div>
      </div>
    </main>
  );
}
