/** The science layer: every concept in two depths.
 *  `simple` is three sentences anyone can follow; `deep` is the actual
 *  science with the governing relation and references, honest about what
 *  is model-derived. Space-profile overrides retell the same physics in
 *  the planetary setting. Mirrored from the Python demo. */

export type TopicKey =
  | "map"
  | "tensor"
  | "drift"
  | "selfcheck"
  | "attack_gain"
  | "attack_burst"
  | "contact"
  | "calibration"
  | "recursive"
  | "fleet";

export interface ScienceTopic {
  short: string;
  title: string;
  simple: string;
  deep: string; // paragraphs separated by \n\n
  refs: string;
}

export const TOPICS: Record<TopicKey, ScienceTopic> = {
  map: {
    short: "Map",
    title: "The Earth's magnetic fingerprint",
    simple:
      "The rock under your feet is very slightly magnetic, and every region has its own pattern, like a fingerprint. That pattern was mapped decades ago and barely changes over a lifetime. If you can read it while flying, you know where you are, without emitting anything and without any satellite.",
    deep:
      "Crustal magnetic anomalies are 10 to 1000 nT variations superimposed on the Earth's core field of 25,000 to 65,000 nT: a part-per-thousand signal on a huge, slowly varying background. Anomaly maps (e.g. EMAG2, national aeromagnetic surveys) are stable on decadal timescales because they come from remanent and induced magnetisation of crustal rock. Navigation matches a measured along-track anomaly profile against the map (TERCOM-style correlation over ~60 s windows here). The hard part is not reading the map, it is removing the vehicle's own magnetic interference, which can be orders of magnitude larger than the anomaly.\n\nKey numbers in this demo: map roughness 300 nT rms with a 400 m correlation length (a high-resolution surveyed corridor), 60 s correlation windows sliding every 30 s at 50 m/s, search grid ±800 m. Model-derived on a synthetic map with realistic spectrum.",
    refs: "EMAG2 (NOAA); Gnadt et al., arXiv:2007.12158 (MagNav).",
  },
  tensor: {
    short: "Tensor",
    title: "Why four diamond chips defeat the vehicle's own noise",
    simple:
      "Anything magnetic on the vehicle sits close to the sensor, and close sources have a signature: their field changes steeply from one point to the next. The Earth's field does not, over centimetres. Four tiny sensors measure that steepness and split the world from the vehicle, by physics, not by guesswork.",
    deep:
      "A localised source at range r produces a dipole field, a homogeneous function of degree −3. Euler's identity then gives G·r = −3·B_dip: the field gradient G of a near source is large and structured, while the Earth's field is quasi-uniform (G ≈ 0) across a 3 cm baseline. Four vector chips give 12 measurements for 8 unknowns (uniform field, 3; symmetric trace-free gradient, 5), an over-determined linear system constrained by Maxwell (div B = 0). The platform source collapses into the gradient by construction.\n\nThe same geometry sets an honest limit: a source 100 m away produces a picotesla-class gradient across 3 cm, far below the sensor noise, so distant sources are NOT rejected (good: the mapped anomaly survives) and cannot be ranged instantaneously (see the detection science).\n\nWhere the premium sensor pays, beyond this corridor: the debrief's waterfall shows the array system, not the raw sensitivity, because this demo flies a favourable low-altitude map with 300 nT anomalies. The diamond's sensitivity and DC stability buy the operating ENVELOPE: navigation at altitude and over weak-anomaly regions where the signal shrinks towards the noise floor, detection of faint external sources (the contact scene is sensitivity-bound), a drift-free absolute vector reference where classical fluxgates wander by nanoteslas with temperature, and twelve metrology-grade channels without which the integrity residual ‖P⊥X‖ would drown in sensor drift and false-alarm.",
    refs:
      "Patent GB2615137.3 (structural rejection); Dunlop & Eastwood 2008 (curlometer minimum four points).",
  },
  drift: {
    short: "Drift",
    title: "Why inertial navigation drifts, and what a fix buys",
    simple:
      "An inertial unit measures turn rates and accelerations, then adds tiny errors thousands of times per second. Those errors compound: the longer you fly blind, the faster the position error grows. Each accepted magnetic fix resets the solution, and the filter even learns the gyro and accelerometer drifts between fixes. That is the sawtooth on the blue curve: drift up, snap down. The debrief decomposes exactly how much each layer buys.",
    deep:
      "The twin carries a full horizontal-channel IMU error model: gyro bias drift β (heading error grows linearly, cross-track error quadratically), accelerometer bias a (velocity error grows linearly, position error quadratically) and an initial alignment velocity error v₀: e(t) ≈ V·(δθ₀·t + ½·β·t²) + v₀·t + ½·a·t². The red curve is that open-loop reference (each world draws β of 0.004-0.007 deg/s and a of 0.3-0.6 mg, tactical-MEMS grade), ending kilometres off after a ten-minute leg.\n\nThe blue track runs closed-loop, the way the real chain runs: every ACCEPTED fix recentres the dead-reckoning solution and shifts the filter's belief with it, and consecutive corrections feed two small observers, the cross-track component estimating the residual heading-rate error and the along-track component estimating the velocity error. Withheld fixes commit nothing: no recentring, no belief update, no observer update. During an attack the blue curve therefore climbs at inertial slope until the first accepted fix snaps it back, the honest cost of refusing corrupted measurements. The debrief's waterfall recomputes the same world at four levels (IMU alone, raw magnetometer, separated chain, full product) so every claimed gain is a full simulation, not an extrapolation. Model-derived.",
    refs:
      "Titterton & Weston, Strapdown Inertial Navigation Technology; patent pending GB2615376.7 (guarded recentring).",
  },
  selfcheck: {
    short: "Self-check",
    title: "How the instrument knows when to distrust itself",
    simple:
      "Every position fix ships with an error budget that was calibrated in advance, like a thermometer with a certificate. And the chain watches its own raw signals: if they stop looking like anything seen during calibration, the budget inflates and the fix is refused. A wrong measurement never steers the aircraft.",
    deep:
      "The bound is a normalised split-conformal interval: U = μ + q·s, where μ is a regression on per-window features, q the calibration quantile, and s = 1 + γ·Σ relu(z) a novelty scale built from one-sided exceedances of shift-sensitive features. Two properties matter. First, the features are taken BEFORE the noise-cancellation stages (raw high-frequency power, canceller correction magnitude, and the projection residual ‖P⊥X‖ of the array model): our studies show post-cancellation features are blind to faults, coverage silently collapses from 90% to about 40%. Second, s is monotone by construction, so an unusual regime can only widen the bound, never tighten it.\n\nModel-derived performance: coverage at the 90% target in-domain, restored to 100% under gain-type and noise-type shifts with the bound widening 7 to 8 times, zero false alarms in-domain.",
    refs:
      "Vovk et al., Algorithmic Learning in a Random World (conformal prediction); patent pending GB2615376.7.",
  },
  attack_gain: {
    short: "Gain fault",
    title: "Attack 1: the channel gain fault",
    simple:
      "One of the twelve sensing channels quietly starts amplifying 2% too much. Nothing looks wrong on any screen: the cleaned signal stays smooth. But the Earth's huge field now leaks through the mismatch and silently corrupts the measurement. This is the classic insidious failure of multi-sensor instruments.",
    deep:
      "A relative gain error ε on one channel injects ε × 47,000 nT of false signal, here hundreds of nT of phantom gradient, into the tensor solution: orders of magnitude above the anomaly being navigated on. Downstream cancellation adapts and hides it, which is exactly why post-cleaning monitoring fails. The chain catches it with the projection residual r(X) = ‖P⊥·X‖, where P⊥ = I − A·pinv(A): no physical field can produce energy in the orthogonal complement of the array model, so this residual is blind to the world and responds specifically to per-channel gain errors and hardware faults. It is the same quantity the self-calibration minimises, one signal serving calibration, integrity and fault detection.",
    refs: "Patent pending GB2615376.7 (projection-residual integrity).",
  },
  attack_burst: {
    short: "Burst",
    title: "Attack 2: the interference burst",
    simple:
      "A strong magnetic disturbance lights up near the aircraft, think of a powerful electrical system switching on. The canceller absorbs most of it, so the cleaned signal still looks fine. The trap is to trust that cleaned signal: the chain instead watches the raw input, sees the storm, and widens its error budget before any damage is done.",
    deep:
      "The burst multiplies the slow interference amplitude several fold inside the event window. Because the canceller learns the spatial signature of platform sources, the post-cleaning residual barely moves, the classic silent-miss condition. The shift-sensitive features that do move are the pre-canceller high-frequency power std(diff(s_raw)) and the canceller correction magnitude ‖s_clean − s_raw‖. These feed the novelty scale, the bound widens, the affected fixes are withheld, and navigation coasts on inertial until the signatures return to the calibrated domain.\n\nModel-derived: all in-window fixes flagged under this attack. In nominal flight false flags are rare, and the asymmetry is deliberate: the self-check would rather withhold a good fix than trust a bad one.",
    refs: "Patent pending GB2615376.7 (pre-cancellation features).",
  },
  contact: {
    short: "Detection",
    title: "Turning rejected noise into a detection",
    simple:
      "Everything the chain removes is not thrown away, it is sorted. Sources bolted to the aircraft move with it; a ship below does not. And as the aircraft flies past, the ship's magnetic field swells and fades in a telltale curve that reveals where it is. Navigation and detection from the same measurement.",
    deep:
      "Across a 3 cm array a source hundreds of metres away has no measurable gradient (picotesla-class), so it cannot be ranged from one position: physics forbids it. What localises it is the platform's own passage, the classical magnetic anomaly detection geometry: the swept field profile follows the 1/r³ dipole law along the track, and a nav-frame-static dipole is fitted to that profile (nine parameters against the per-epoch ambient vectors). Classification is by frame behaviour: platform sources are static in the body frame, external sources in the navigation frame. In this demo a vessel-class source (~10⁶ A·m²) passing at ~200 m is localised to a few tens of metres while the platform's own source, thousands of times stronger at the sensor, is removed. What is new is doing this concurrently with navigation, from one guarded estimator, with the detection report carrying the same calibrated confidence as the fixes.",
    refs:
      "Anderson functions (classical MAD); patent pending GB2615376.7 (concurrent nav + detection).",
  },
  calibration: {
    short: "Calibration",
    title: "Self-calibration with no reference at all",
    simple:
      "Each sensing channel drifts, and normally you would need a perfect reference instrument to re-tune them. There is none on board. So the aircraft simply turns in a circle: seen from the sensor, the Earth's field sweeps around, and that sweep is enough to solve for every channel's gain at once. The world itself is the reference.",
    deep:
      "Airborne vector calibration is reported in the literature to be first-order sensitive to attitude error, requiring an INS reference (the 'attitude bottleneck', Hager et al. 2026). The chain removes it by joint estimation: one heading sweep gives snapshots in which the ambient field (constant in the navigation frame), the 11 relative gains, and a platform dipole (body-fixed, per-snapshot moments) are all identifiable together, no external attitude truth used. Observability is monitored by the projection residual ‖P⊥X‖. Model-derived effect: initial gain errors up to 3×10⁻² are corrected to a floor below 10⁻³, relaxing the hardware tolerance by roughly three orders of magnitude and moving it into software.",
    refs:
      "Hager, Bryne, Jukić, arXiv:2605.04951 (the bottleneck); patent pending GB2615376.7 (the removal).",
  },
  fleet: {
    short: "Fleet",
    title: "The network as a sensor: who else saw it?",
    simple:
      "One aircraft alone cannot always tell a sick instrument from an angry environment: both just look wrong. A wingman settles it. A real disturbance in the world is seen by both aircraft at the same time; a hardware fault lives on one aircraft only. In this demo, watch the mission log after your attacks: the fleet names what happened.",
    deep:
      "Each station runs the full single-platform attribution chain, then shares only its attributed events: sparse, timestamped detections of a few hundred bytes, not raw data. Coincidence between stations is the classifier: environment-scale disturbances (space weather, regional interference) raise the shift-sensitive novelty scale on every platform in the region, while a channel fault raises it on one platform only and is quarantined there. Richer deployments classify coincident transients by apparent propagation velocity across the network and weight each station's veto by its signal-to-noise ratio, with the false-alarm rate calibrated at FLEET level, the same conformal guarantee as the single-platform bound, extended to N nodes.\n\nBecause attribution happens at the edge and only events travel, the network runs on bytes per hour: any link qualifies (satellite short-burst, HF, acoustic), coincidence tolerates latency by design (event timestamps, not synchronised streams), and under total radio silence each platform falls back to its own calibrated self-check. Nothing breaks, it only degrades gracefully. In this demo the wingman flies the same region: your interference bursts are classified environmental by coincidence, your channel faults are isolated to your own aircraft.",
    refs:
      "Patent pending GB2615437.7 (distributed attribution); CTBTO IMS and lightning TDOA networks (precedents at planetary scale).",
  },
  recursive: {
    short: "Filter",
    title: "A filter that remembers, with learning kept on a leash",
    simple:
      "Instead of matching each minute of flight to the map from scratch, the chain carries a belief forward in time, like a detective updating suspicions instead of starting every morning from zero. One small learned number adjusts how boldly each new clue is trusted, and it is built so that learning can never crash the filter.",
    deep:
      "A point-mass Bayes filter maintains a belief over the position-offset grid: diffusion by the dead-reckoning drift model plus an escape mass, then a likelihood update exp(−ΔSSE/(2κ·SSE_min)) from the map-match residual surface. The temperature κ is predicted per window by a small regression on truth-free features. The training target matters: minimising fix error cannot work because the likelihood argmax is invariant to κ; the target is the temperature maximising posterior log-density at reference positions on calibration data. Confining learning to one bounded scalar avoids the documented out-of-distribution divergence of fully learned filter gains. Model-derived: median raw-fix error improved ~1.4× at high interference, never degraded more than 15%, calibrated coverage held.",
    refs:
      "Bergman 1999 (point-mass terrain navigation); KalmanNet literature (what NOT to do); patent pending GB2615376.7.",
  },
};

/** Space-profile retellings: same physics, planetary setting. */
export const SPACE_OVERRIDES: Partial<
  Record<TopicKey, Partial<ScienceTopic>>
> = {
  map: {
    title: "The fossil magnetic field of Mars",
    simple:
      "Mars lost its global magnetic field four billion years ago, but the crust remembers: whole regions stayed magnetised, like a tape recording of the dead dynamo. That pattern is mapped, it does not change, and there is no GPS around Mars. Read the pattern in flight, and you know where you are.",
    deep:
      "Mars Global Surveyor discovered intense crustal magnetisation, strongest in the southern highlands, with fields reaching hundreds of nT at low altitude, an order of magnitude stronger than terrestrial crustal anomalies at comparable heights. MAVEN and InSight refined the picture down to surface level. Navigation matches the along-track anomaly profile against such a map (60 s correlation windows here). The scales in this demo inherit our airborne twin and are representative rather than Mars-calibrated; a planetary-parameterised twin is on the roadmap.\n\nThe estimation problem is identical to the terrestrial case, with one aggravating factor that favours this architecture: no ground truth, no GNSS cross-check, twenty light-minutes of radio delay. The instrument's self-diagnosed confidence is not a luxury there, it is the mission.",
    refs:
      "Acuña et al. 1999 (MGS); Langlais et al. 2019 (crustal field model); Mittelholz et al. 2020.",
  },
  contact: {
    short: "Survey",
    title: "Turning rejected noise into science return",
    simple:
      "Everything the chain removes is sorted, not thrown away. Sources bolted to the scout move with it; a magnetised structure buried in the crust does not. As the scout flies past, the structure's field swells and fades in a telltale curve that reveals where it lies. Every navigation pass is also a survey pass.",
    deep:
      "Across a 3 cm array a source hundreds of metres away has no measurable gradient, so it cannot be ranged from one position. What localises it is the scout's own passage: the swept field profile follows the 1/r³ dipole law along the track, and a ground-frame-static dipole is fitted to that profile. Classification is by frame behaviour: vehicle sources ride the body frame, crustal sources stay fixed in the world. In this demo a magnetised body of about 10⁶ A·m² (an intrusion or lava-tube-scale structure) passing at about 200 m is localised to a few tens of metres while the scout's own source, thousands of times stronger at the sensor, is removed. Doing this concurrently with navigation, from one guarded estimator, is what is new, and on Mars it means the navigation instrument doubles as a magnetometry survey instrument at zero extra mass.",
    refs:
      "Anderson functions (classical passage geometry); patent pending GB2615376.7.",
  },
  attack_gain: {
    short: "Radiation",
    title: "Event 1: the radiation hit",
    simple:
      "A cosmic ray strikes the electronics and one of the twelve channels quietly starts amplifying 2% too much. Nothing looks wrong on any screen. But the planet's field now leaks through the mismatch and silently corrupts the measurement. In deep space nobody can retune your instrument for you.",
    deep:
      "Single-event effects and total-dose drift are the canonical degradation modes of sensing electronics beyond the magnetosphere. A relative gain error ε on one channel injects ε times the ambient field as false signal into the tensor solution, orders of magnitude above the anomaly being navigated on, while downstream cancellation adapts and hides it. The chain catches it with the projection residual r(X) = ‖P⊥·X‖: no physical field can produce energy in the orthogonal complement of the array model, so this residual responds specifically to channel faults. The same quantity drives the self-calibration, so the cure is on board too: one turn of the scout re-identifies all gains with no reference instrument.",
    refs: "Patent pending GB2615376.7 (projection-residual integrity).",
  },
  attack_burst: {
    short: "Storm",
    title: "Event 2: the solar storm",
    simple:
      "The Sun erupts and the local field gets noisy for a couple of minutes. The canceller absorbs most of it, so the cleaned signal still looks fine. The trap is to trust that cleaned signal: the chain watches the raw input, sees the storm, and widens its error budget before any damage is done.",
    deep:
      "Space-weather disturbances multiply the slow interference amplitude inside the event window. Because the canceller learns spatial signatures, the post-cleaning residual barely moves: the classic silent-miss condition. The shift-sensitive features that do move are the pre-canceller high-frequency power and the canceller correction magnitude. They feed the monotone novelty scale, the bound widens, affected fixes are withheld, and navigation coasts on inertial until the signatures return to the calibrated domain. With a twenty light-minute radio delay, this decision cannot wait for a human: the instrument must distrust itself, alone, in real time.\n\nModel-derived: all in-window fixes flagged under this event. In nominal flight false flags are rare, and the asymmetry is deliberate: the self-check would rather withhold a good fix than trust a bad one.",
    refs: "Patent pending GB2615376.7 (pre-cancellation features).",
  },
  fleet: {
    title: "The swarm as a sensor: who else saw it?",
    simple:
      "One scout alone cannot always tell a sick instrument from an angry Sun: both just look wrong. A sister scout settles it. Space weather washes over the whole swarm at once; a radiation-damaged channel lives on one scout only. In this demo, watch the mission log after your events: the swarm names what happened.",
    deep:
      "Each scout runs the full single-platform attribution chain, then shares only its attributed events: sparse, timestamped detections of a few hundred bytes, relayed opportunistically through the orbiter. Coincidence across the swarm is the classifier: a solar storm raises the shift-sensitive novelty scale on every scout in the region, while a radiation-induced channel fault raises it on one scout only and is quarantined there. The false-alarm rate is calibrated at swarm level, the same conformal guarantee as each scout's own bound, extended to N nodes.\n\nThis architecture is built for exactly the constraints of planetary exploration: attribution happens at the edge, only events travel (bytes per hour over any link), coincidence tolerates hours of relay latency by design because it works on event timestamps rather than synchronised streams, and a scout out of contact falls back to its own calibrated self-check. With help twenty light-minutes away, a swarm that can collectively tell instrument from environment multiplies what every scout's data is worth.",
    refs:
      "Patent pending GB2615437.7 (distributed attribution); CTBTO IMS and lightning TDOA networks (precedents at planetary scale).",
  },
  selfcheck: {
    title: "Self-trust, twenty light-minutes from help",
    simple:
      "Every position fix ships with an error budget calibrated in advance, and the chain watches its own raw signals: if they stop looking like anything seen during calibration, the budget inflates and the fix is refused. On Mars there is no operator in the loop; an instrument that cannot doubt itself is a mission risk.",
    deep:
      "The bound is a normalised split-conformal interval U = μ + q·s with a novelty scale s = 1 + γ·Σ relu(z) built from one-sided exceedances of shift-sensitive features taken BEFORE the noise-cancellation stages (raw high-frequency power, canceller correction magnitude, projection residual ‖P⊥X‖). Post-cancellation features are provably blind: in our studies coverage silently collapses from 90% to about 40% with them. The scale is monotone by construction, so an unusual regime can only widen the bound. Model-derived: coverage at the 90% target in-domain, restored to 100% under both event types with the bound widening 7 to 8 times, zero false alarms in-domain.",
    refs: "Vovk et al. (conformal prediction); patent pending GB2615376.7.",
  },
};

export function getTopic(
  key: TopicKey,
  profile: "defence" | "space"
): ScienceTopic {
  const base = TOPICS[key];
  const ov = profile === "space" ? SPACE_OVERRIDES[key] : undefined;
  return { ...base, ...ov };
}
