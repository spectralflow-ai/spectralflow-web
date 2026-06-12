import { Strip } from "./kit";

/**
 * "In good company" — official logos only, monochrome ink, small and
 * spaced. NVIDIA: 1-colour black for-screen badge (sits directly on
 * porcelain, no white panel), wording "Member of NVIDIA Inception"
 * only. Other entities appear as text until their status is public
 * and consent is given.
 */
export default function PartnerStrip() {
  return (
    <Strip>
      <p className="eyebrow mb-7 text-center">In good company</p>
      <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nvidia-inception-1c-blk.svg"
          alt="Member of NVIDIA Inception"
          className="h-12 w-auto opacity-80"
        />
        <p className="text-sm max-w-xs text-center sm:text-left" style={{ color: "var(--muted)" }}>
          Working with leading European research institutions across the diamond, photonics and
          navigation value chains.
        </p>
      </div>
    </Strip>
  );
}
