export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* Top bar */}
      <div className="border-b px-8 py-4 flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
          SpectralFlow
        </span>
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
          spectralflow.ai
        </span>
      </div>

      {/* Hero */}
      <section className="flex flex-col justify-center px-8 md:px-24 pt-24 pb-16 max-w-5xl mx-auto w-full">

        <div className="mb-3">
          <span
            className="font-mono text-xs tracking-widest uppercase px-2 py-1 rounded"
            style={{ color: "var(--accent)", border: "1px solid var(--accent)", backgroundColor: "rgba(0, 229, 255, 0.1)", opacity: 0.9, textShadow: "0 0 10px rgba(0, 229, 255, 0.5)" }}
          >
            13 UK patents filed &middot; 326 claims
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight mt-6 mb-8"
          style={{ color: "var(--foreground)", textShadow: "0 0 30px rgba(255, 255, 255, 0.1)" }}
        >
          Quantum sensing,<br />out of the lab.
        </h1>

        <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-4" style={{ color: "var(--muted)" }}>
          SpectralFlow builds NV-diamond magnetometers that deliver extreme magnetic
          sensitivity at room temperature, in a miniature form factor.
        </p>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
          Our first mission: resilient navigation where GPS is jammed, denied, or gone.
          We use the Earth&rsquo;s own magnetic field as an ultra-high-definition compass &mdash;
          passive, un-jammable, undetectable. Where cold atoms and SQUIDs stay too bulky,
          too cold, or too costly, diamond runs warm, small, and field-ready.
        </p>
        <p className="font-mono text-xs tracking-widest uppercase mt-6" style={{ color: "var(--accent)", opacity: 0.7 }}>
          Room temperature &middot; Vibration-immune &middot; No RF emission &middot; Air &middot; Sea &middot; Space
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="https://studio.spectralflow.ai"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "#05050A", boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)" }}
          >
            Open SpectralFlow Studio
            <span>&rarr;</span>
          </a>
          <a
            href="mailto:alex@spectralflow.ai"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-opacity hover:opacity-80"
            style={{ border: "1px solid var(--border)", color: "var(--muted)", backdropFilter: "blur(12px)" }}
          >
            Contact
          </a>
        </div>
      </section>

      {/* One core, three theatres */}
      <section className="px-8 md:px-24 py-16 max-w-5xl mx-auto w-full">
        <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
          Navigation &mdash; our first vertical
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10" style={{ color: "var(--foreground)" }}>
          One core. Three theatres.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
              Air
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
              Matchbox-sized, a handful of watts. Rides on tactical UAVs and corrects
              inertial drift by matching the Earth&rsquo;s magnetic map &mdash; so the drone keeps
              its heading the moment GPS drops out.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
              Sea
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
              Fully passive &mdash; nothing to detect, nothing to jam. Underwater navigation
              and magnetic-anomaly detection for submarines and AUVs, where satellite
              signals never reach.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
              Space
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
              Diamond is intrinsically radiation-hard. Attitude and orbital navigation
              that keeps working where conventional magnetometers drift under cosmic
              radiation.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond navigation */}
      <section className="px-8 md:px-24 py-16 max-w-5xl mx-auto w-full border-t" style={{ borderColor: "var(--border)" }}>
        <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
          The platform goes further
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6" style={{ color: "var(--foreground)" }}>
          The same quantum core, beyond navigation.
        </h2>
        <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "var(--muted)" }}>
          A single sensing core &mdash; engineered diamond, integrated optics, adaptive firmware &mdash;
          reaches across a family of applications. Navigation ships first; the rest are
          patented and activate as the science and the markets mature.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
              Semiconductors
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
              Non-perturbative imaging of next-generation chips and quantum processors,
              at the nanoscale, without cryogenics.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
              Life sciences
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
              Chip-scale magnetic sensing for molecular analysis and biosensing &mdash;
              the path toward tomorrow&rsquo;s medicine.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>
              Industry
            </p>
            <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
              Portable non-destructive testing and precision field measurement,
              room-temperature and rugged by design.
            </p>
          </div>
        </div>
      </section>

      {/* The engine — simulator */}
      <section className="px-8 md:px-24 py-16 max-w-5xl mx-auto w-full border-t" style={{ borderColor: "var(--border)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>
              The engine behind the sensor
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6" style={{ color: "var(--foreground)" }}>
              SpectralFlow Studio
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              Our sensors are designed in software before they ever reach the cleanroom.
              SpectralFlow Studio is a first-principles physics engine that predicts
              coherence and magnetic sensitivity across 18 independent decoherence
              channels, from 4&thinsp;K to 600&thinsp;K.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
              It is the design layer that lets a lean team move at deep-tech speed &mdash;
              and it is available to explore today.
            </p>
            <a
              href="https://studio.spectralflow.ai"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Open SpectralFlow Studio <span>&rarr;</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[
              { value: "18",  label: "Decoherence channels" },
              { value: "100+", label: "Experimental anchors" },
              { value: "5",   label: "Application verticals" },
              { value: "13",  label: "UK patents filed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold" style={{ color: "var(--accent)" }}>{stat.value}</p>
                <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing line */}
      <section className="px-8 md:px-24 py-16 max-w-5xl mx-auto w-full border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xl md:text-2xl leading-relaxed max-w-3xl" style={{ color: "var(--foreground)" }}>
          European, sovereign deep tech. We design the sensor, the firmware, and the
          calibration &mdash; and we take quantum out of the lab.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="mailto:alex@spectralflow.ai"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "#05050A", boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)" }}
          >
            Get in touch
            <span>&rarr;</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-6" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
              SpectralFlow SAS &mdash; France
            </p>
            <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)" }}>
              {new Date().getFullYear()}
            </p>
          </div>
          <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            13 UK patents filed &middot; Quantum sensing for navigation, industry &amp; life sciences
          </p>
        </div>
      </footer>

    </main>
  );
}
