/** The science layer: every concept in two depths.
 *  `simple` is a few sentences anyone can follow; `deep` is the science
 *  behind the demo, with references, honest about what is model-derived.
 *  Space and survey overrides retell the same physics in their setting. */

import type { ProfileKey } from "./profiles";

export type TopicKey =
  | "map"
  | "rejection"
  | "drift"
  | "selfcheck"
  | "attack_gain"
  | "attack_burst"
  | "contact"
  | "calibration"
  | "recursive"
  | "spoofing";

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
      "The rock under your feet is very slightly magnetic, and every region has its own pattern, like a fingerprint. That pattern has been mapped and barely changes over a lifetime. If you can read it in flight, you can tell where you are. The instrument is passive: it reads the Earth's own field and needs no satellite and no external signal.",
    deep:
      "Crustal magnetic anomalies are small variations, typically tens to hundreds of nanotesla, on top of the Earth's main field of 25,000 to 65,000 nanotesla: a signal of about a part per thousand on a large, slowly varying background. Anomaly maps (for example EMAG2 and national aeromagnetic surveys) stay valid for decades because the anomalies come from magnetised crustal rock. Navigation compares the anomaly profile measured along the track with the map, window by window. The hard part is not reading the map: it is removing the vehicle's own magnetic interference, which can be far larger than the anomaly.\n\nIn this demo the map is synthetic, with a realistic spectrum, over a strong and well-surveyed corridor. How useful a fix is depends on the map at least as much as on the sensor: the map, more than the sensor, sets the value. Model-derived.",
    refs: "EMAG2 (NOAA); Gnadt et al., arXiv:2007.12158 (MagNav).",
  },
  rejection: {
    short: "Rejection",
    title: "How the instrument rejects the vehicle's own field",
    simple:
      "Anything magnetic on the vehicle, its engines, wiring and steel, sits right next to the sensor and can be far louder than the Earth's signal. The usual answer is to model the vehicle during calibration flights and subtract that model afterwards. Our instrument is designed to measure the vehicle's field on board, not only to model it, and to separate it from the Earth's at the point of measurement.",
    deep:
      "A magnetic source close to the sensor and the Earth's field far below do not look the same to an instrument on the vehicle. The vehicle's sources move with it and dominate at short range; the Earth's field and its crustal anomalies change slowly along the track. The instrument is designed to use that physical difference to separate the two at the point of measurement, and to report what it removed, rather than fitting a compensation model during calibration flights and trusting it for the rest of the mission.\n\nThe same physics sets an honest limit: a source a few hundred metres away looks, to the instrument, much like the world around it. It is not rejected, which is what lets the mapped anomaly survive, and it cannot be ranged from a single position (see the detection science).\n\nWhy this matters: escaping the vehicle's own field has long been bought with distance and hardware. Survey aircraft carry their magnetometer in a tail stinger or on a cable below the airframe, and fly compensation manoeuvres before each campaign. Rejecting the platform's field on board opens installations where no boom fits. It is a measurement with source attribution, not a clean-up applied after the fact: what was removed is known, and named. Model-derived at this stage; the method is covered by patent applications filed in 2026.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  drift: {
    short: "Drift",
    title: "Why inertial navigation drifts, and what a fix buys",
    simple:
      "An inertial unit measures turn rates and accelerations, then adds up tiny errors many times per second. Those errors compound: the longer you fly without a fix, the faster the position error grows. Each accepted magnetic fix resets the solution, and the filter also learns the gyro and accelerometer drifts between fixes. That is the sawtooth on the blue curve: drift up, snap down. The debrief shows what each layer of the chain contributes.",
    deep:
      "The simulation carries an inertial error model with three terms: a gyro bias, which makes the heading error grow steadily and the cross-track error grow faster still; an accelerometer bias, which does the same to velocity and position; and an initial alignment error. The dashed grey curve is that open-loop reference, drawn with tactical-grade MEMS error levels that change from one world to the next.\n\nThe blue track runs closed-loop, the way the real chain is designed to run: every ACCEPTED fix recentres the dead-reckoning solution and shifts the filter's belief with it, and consecutive corrections feed two small observers, one estimating the residual heading-rate error from the cross-track component, the other the velocity error from the along-track component. Withheld fixes commit nothing: no recentring, no belief update, no observer update. During an attack the blue curve therefore climbs at inertial slope until the next accepted fix brings it back, which is the honest cost of withholding corrupted measurements. The debrief recomputes the same world at four levels (inertial alone, a magnetometer without on-board rejection, rejection with the self-check, the full chain), so each gain shown is a full simulation, not an extrapolation. Model-derived.",
    refs:
      "Titterton and Weston (2004), the reference textbook on inertial navigation; Spectral Flow patent applications filed 2026.",
  },
  selfcheck: {
    short: "Self-check",
    title: "How the instrument knows when to distrust itself",
    simple:
      "Every position fix comes with an error bound, calibrated in advance. The chain also watches its own raw signals: if they stop looking like anything seen during calibration, the bound widens and the fix is withheld. A measurement the instrument cannot vouch for never steers the vehicle.",
    deep:
      "The bound is a conformal interval calibrated in advance, scaled by a novelty measure built from shift-sensitive features of the raw signals. Two properties matter. First, the features are taken BEFORE the noise-cancellation stages (the high-frequency power of the raw signal, the size of the canceller's correction, and a hardware self-test): in our studies, features taken after cancellation are blind to these faults, and the bound's coverage silently collapses. Second, the scale only moves one way: an unusual regime can widen the bound, never tighten it.\n\nModel-derived: in this demo the bound holds its target coverage in nominal flight, and under the gain and noise attacks it stays honest by widening, at the cost of withholding some fixes.",
    refs:
      "Vovk et al., Algorithmic Learning in a Random World (conformal methods); Spectral Flow patent applications filed 2026.",
  },
  attack_gain: {
    short: "Gain fault",
    title: "Attack 1: the channel gain fault",
    simple:
      "One of the sensing channels quietly starts amplifying slightly too much. Nothing looks wrong on any screen, yet the measurement is now silently biased.",
    deep:
      "A channel sees a field of tens of thousands of nanotesla, so a gain error of a fraction of a percent already writes a false signal as large as the anomalies being navigated on. Downstream cancellation adapts and hides it, which is exactly why monitoring after the cleaning stage fails. The chain catches it with a hardware self-test that runs alongside the measurement. The cure is on board too: one turn of the aircraft re-identifies the channel gains with no ground equipment (see the calibration science).",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  attack_burst: {
    short: "Burst",
    title: "Attack 2: the interference burst",
    simple:
      "A strong magnetic disturbance lights up near the aircraft, think of a powerful electrical system switching on. The canceller absorbs most of it, so the cleaned signal still looks fine. The trap is to trust that cleaned signal: the chain instead watches the raw input, sees the storm, and widens its error bound before any damage is done.",
    deep:
      "The burst multiplies the slow interference amplitude several fold inside the event window. Because the canceller learns the spatial signature of platform sources, the residual after cleaning barely moves: the classic silent-miss condition. The features that do move are the high-frequency power of the raw signal, before the canceller, and the size of the canceller's correction. They feed the novelty scale, the bound widens, the affected fixes are withheld, and navigation coasts on inertial until the signals return to the calibrated domain.\n\nModel-derived: in this demo the fixes inside the event window are flagged. In nominal flight false flags are rare, and the asymmetry is deliberate: the self-check would rather withhold a good fix than trust a bad one.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  contact: {
    short: "Detection",
    title: "Turning rejected noise into a detection",
    simple:
      "What the chain removes is not thrown away, it is sorted. Sources fixed to the aircraft move with it; a large steel object below does not. And as the aircraft flies past, the object's magnetic field swells and fades in a telltale curve that shows where it is. Navigation and detection come from the same measurement.",
    deep:
      "A source hundreds of metres away cannot be ranged from a single position. What localises it is the platform's own passage, as in classical magnetic anomaly detection: the field swept along the track follows the dipole law, falling with the cube of distance, and a dipole that stays fixed in the navigation frame is fitted to that profile. Sources are classified by how they behave: platform sources stay fixed in the body frame, external sources in the navigation frame. In this demo a large steel object passing below the track is detected and localised while the platform's own field, far stronger at the sensor, is removed. To our knowledge, what is new is doing this at the same time as navigation, from one guarded estimator, with the detection report carrying the same calibrated confidence as the fixes.",
    refs:
      "Anderson functions (classical magnetic anomaly detection); Spectral Flow patent applications filed 2026.",
  },
  calibration: {
    short: "Calibration",
    title: "Self-calibration in one manoeuvre",
    simple:
      "Each sensing channel drifts, and normally you would need a perfect reference instrument to re-tune them. There is none on board. So the aircraft simply flies a turn: seen from the sensor, the Earth's field sweeps around, and that sweep is enough to solve for every channel's gain at once. The world itself is the reference.",
    deep:
      "Airborne vector calibration is sensitive to attitude error. The chain re-identifies the channel gains during one heading sweep, with no ground equipment. Model-derived.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  spoofing: {
    short: "Jamming",
    title: "Can the Earth's field be jammed?",
    simple:
      "A GPS jammer wins by shouting over a faint signal from space. The Earth's magnetic field is not faint, and a magnetic source fades very fast with distance, so disturbing it over a wide area takes enormous installations. A source placed nearby can still disturb a magnetometer locally. The instrument is designed to detect that and say so. Press the emitter button and watch: the disturbance turns into a contact report.",
    deep:
      "A dipole field falls with the cube of distance. Writing a false signal the size of a crustal anomaly at a kilometre's range takes a magnetic moment far beyond that of any ship; even at a few hundred metres it takes an industrial installation. Wide-area magnetic jamming is therefore very costly in energy, and denial stays local: a pocket around a fixed site, which an inertial unit with bounded drift crosses quickly. The emitter in this demo is deliberately large, and it still only disturbs the sensor near its closest approach.\n\nEvery emitter is also a source, and this chain is built to attribute sources. The map-subtracted residual along the estimated track carries the emitter's passage signature; a matched-profile fit detects it and localises it in range and along-track position. A single pass leaves the side ambiguous; a second pass resolves it. Subtler spoofing, recreating another place's anomaly pattern consistently along a moving vehicle's track, would need synchronised large installations, and the recursive filter's belief makes it harder still. Local denial remains possible; the self-check answers it with a widened bound, a short inertial coast and a contact report. Model-derived.",
    refs:
      "Spectral Flow patent applications filed 2026; Anderson functions (classical magnetic anomaly detection).",
  },
  recursive: {
    short: "Filter",
    title: "A filter that remembers, with learning kept on a leash",
    simple:
      "Instead of matching each minute of flight to the map from scratch, the chain carries a belief forward in time, like a detective updating suspicions instead of starting every morning from zero. One small learned number adjusts how boldly each new clue is trusted, and it is bounded so that learning cannot destabilise the filter.",
    deep:
      "A point-mass Bayes filter keeps a belief over a grid of position offsets: it spreads the belief by the dead-reckoning drift model, keeps a small escape mass, then applies a tempered likelihood update from the map-match residual surface. The temperature is set for each window by a small regression on features that do not use the truth, trained on calibration data so that the learned part can never sharpen the filter's belief beyond what calibration supports. Confining learning to one bounded number avoids the documented out-of-distribution divergence of fully learned filter gains. Model-derived: in this demo the learned temperature helps most when interference is high, and its bound keeps it from doing much harm when it is wrong.",
    refs:
      "Bergman 1999 (point-mass terrain navigation); KalmanNet literature (out-of-distribution divergence); Spectral Flow patent applications filed 2026.",
  },
};

/** Space-profile retellings: same physics, planetary setting. */
export const SPACE_OVERRIDES: Partial<
  Record<TopicKey, Partial<ScienceTopic>>
> = {
  rejection: {
    title: "Rejecting the spacecraft's own field",
    simple:
      "Spacecraft magnetometry has carried the same burden for sixty years: a long boom to escape the vehicle's own magnetic noise. Our instrument is designed to separate the spacecraft's field from the planet's on board, at the point of measurement, so the boom stops being the only answer.",
    deep:
      "Near and far sources do not look the same to an instrument on the spacecraft: the vehicle's own sources ride with it and dominate at short range, while the planetary field comes from far away and changes slowly along the path. The instrument is designed to separate the two at the point of measurement and to report what it removed.\n\nWhy this matters in orbit: geomagnetic satellites still carry their magnetometers on booms several metres long, and even compact cubesat designs keep a deployable mast. Software-only cleaning of boomless magnetometers exists. Here the separation happens at the point of measurement, with source attribution and a calibrated confidence, at room temperature, from a crystal, with no consumables. Model-derived at this stage; the method is covered by patent applications filed in 2026.",
    refs:
      "Spectral Flow patent applications filed 2026; ESA geomagnetic satellite missions (boom-mounted magnetometers); NanoMagSat mission design.",
  },
  map: {
    title: "The fossil magnetic field of Mars",
    simple:
      "Mars lost its global magnetic field billions of years ago, but the crust remembers: whole regions stayed magnetised, like a tape recording of the dead dynamo. That pattern is mapped, it does not change, and there is no GPS around Mars. Read the pattern in flight, and you know where you are.",
    deep:
      "Mars Global Surveyor discovered intense crustal magnetisation, strongest in the southern highlands, with fields of hundreds of nanotesla at low orbital altitude, far stronger than terrestrial crustal anomalies seen from the same height. MAVEN and InSight refined the picture down to surface level. Navigation compares the anomaly profile measured along the track with such a map. The scales in this demo come from our airborne simulation and are representative, not calibrated to Mars.\n\nThe estimation problem is the same as on Earth, with one aggravating factor: no ground truth, no GNSS cross-check, up to twenty light-minutes of radio delay. An instrument that states its own confidence is not a luxury there, it is the mission.",
    refs:
      "Acuña et al. 1999 (MGS); Langlais et al. 2019 (crustal field model); Mittelholz et al. 2020.",
  },
  contact: {
    short: "Survey",
    title: "Turning rejected noise into science return",
    simple:
      "What the chain removes is sorted, not thrown away. Sources fixed to the scout move with it; a magnetised structure buried in the crust does not. As the scout flies past, the structure's field swells and fades in a telltale curve that shows where it lies. Every navigation pass is also a survey pass.",
    deep:
      "A source hundreds of metres away cannot be ranged from a single position. What localises it is the scout's own passage: the field swept along the track follows the dipole law, falling with the cube of distance, and a dipole fixed to the ground is fitted to that profile. Sources are classified by how they behave: vehicle sources ride the body frame, crustal sources stay fixed in the world. In this demo a buried magnetised body (an intrusion, or a structure at lava-tube scale) passing near the track is localised while the scout's own field, far stronger at the sensor, is removed. To our knowledge, what is new is doing this at the same time as navigation, from one guarded estimator; on Mars it means the navigation instrument doubles as a magnetic survey instrument at no extra mass.",
    refs:
      "Anderson functions (classical passage profile); Spectral Flow patent applications filed 2026.",
  },
  attack_gain: {
    short: "Radiation",
    title: "Event 1: the radiation hit",
    simple:
      "A cosmic ray strikes the electronics and one of the channels quietly starts amplifying slightly too much. Nothing looks wrong on any screen, yet the measurement is now silently biased. In deep space nobody can retune your instrument for you.",
    deep:
      "Single-event effects and total-dose drift are the usual degradation modes of sensing electronics beyond the magnetosphere. A small gain error on one channel distorts every reading it takes, while downstream cancellation adapts and hides it. The chain catches it with a hardware self-test that runs alongside the measurement. The cure is on board too: one turn of the scout re-identifies the channel gains with no reference instrument.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  attack_burst: {
    short: "Storm",
    title: "Event 2: the solar storm",
    simple:
      "The Sun erupts and the local field gets noisy for a couple of minutes. The canceller absorbs most of it, so the cleaned signal still looks fine. The trap is to trust that cleaned signal: the chain watches the raw input, sees the storm, and widens its error bound before any damage is done.",
    deep:
      "Space-weather disturbances multiply the slow interference amplitude inside the event window. Because the canceller learns spatial signatures, the residual after cleaning barely moves: the classic silent-miss condition. The features that do move are the high-frequency power of the raw signal and the size of the canceller's correction. They feed the novelty scale, which can only widen the bound; affected fixes are withheld, and navigation coasts on inertial until the signals return to the calibrated domain. With a radio delay of up to twenty light-minutes, this decision cannot wait for a human: the instrument must distrust itself, alone, in real time.\n\nModel-derived: in this demo the fixes inside the event window are flagged. In nominal flight false flags are rare, and the asymmetry is deliberate: the self-check would rather withhold a good fix than trust a bad one.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  spoofing: {
    short: "Survey",
    title: "An uncharted body becomes a catalogue entry",
    simple:
      "On Mars nobody jams you, but the crust hides structures no orbiter has resolved. When the scout sweeps past a strongly magnetised body, its signature swells out of the fossil field with a telltale shape, and the same estimator that guards navigation catalogues it: position, range, significance. The unexpected is not a threat to this instrument; it is science return.",
    deep:
      "A buried magnetised body behaves like a dipole: its field falls with the cube of distance, and its passage signature along the flight line has a width set by the closest-approach distance. The map-subtracted residual along the estimated track isolates that signature from the charted fossil field; a matched-profile fit detects it and localises it in range and along-track position. The side stays ambiguous on a single pass and is resolved by a follow-up line.\n\nThe deeper point is architectural: a chain built to attribute every source it removes turns anomalies into catalogue entries instead of navigation errors. Navigation quality holds through the encounter because the fix bounds widen honestly where the residual is disturbed, and the detection comes with the same calibrated confidence as the fixes. On Mars, at the scale of an intrusion or a lava tube, the navigation instrument doubles as a magnetic survey instrument at no extra mass. Model-derived.",
    refs:
      "Spectral Flow patent applications filed 2026; Langlais et al. 2019 (Mars crustal field).",
  },
  selfcheck: {
    title: "Self-trust, up to twenty light-minutes from help",
    simple:
      "Every position fix comes with an error bound calibrated in advance, and the chain watches its own raw signals: if they stop looking like anything seen during calibration, the bound widens and the fix is withheld. On Mars there is no operator in the loop; an instrument that cannot doubt itself is a mission risk.",
    deep:
      "The bound is a conformal interval calibrated in advance, scaled by a novelty measure built from shift-sensitive features of the raw signals, taken BEFORE the noise-cancellation stages (the high-frequency power of the raw signal, the size of the canceller's correction, a hardware self-test). In our studies, features taken after cancellation are blind to these events, and the bound's coverage silently collapses. The scale only moves one way, so an unusual regime can only widen the bound. Model-derived: in this demo the bound holds its target coverage in nominal flight, and under both event types it stays honest by widening.",
    refs: "Vovk et al. (conformal methods); Spectral Flow patent applications filed 2026.",
  },
};

/** Survey-profile retellings: same physics, exploration-survey setting. */
export const GEO_OVERRIDES: Partial<
  Record<TopicKey, Partial<ScienceTopic>>
> = {
  map: {
    title: "Aeromagnetics: the map that built an industry",
    simple:
      "Rocks are very slightly magnetic, and the pattern they write in the field above them is a picture of the geology below: intrusions, faults, ore systems. Airborne magnetic surveying has been a workhorse of mineral exploration since the 1940s; many discoveries under cover began as a wiggle on a flight line. Reading that pattern well, in the right place, is the whole game.",
    deep:
      "An aeromagnetic survey flies parallel lines at fixed spacing and altitude, with orthogonal tie-lines to control level errors and a ground base station to correct the daily variation. The product is a grid of the crustal anomaly field: tens to hundreds of nanotesla of geology on a background of 25,000 to 65,000 nanotesla. Beyond the sensor itself, two error sources dominate survey quality: position error, because a mislocated reading smears or displaces the anomaly it carries, and platform interference, because the aircraft's own field can exceed the geological signal many times over. In this demo the same chain that cleans the data also navigates on it, comparing the anomaly profile along the line with the map, so the position is cross-checked by the geology itself, with or without GNSS.\n\nThe map here is synthetic, with a realistic spectrum. Model-derived.",
    refs: "EMAG2 (NOAA); national aeromagnetic survey programmes; Gnadt et al., arXiv:2007.12158.",
  },
  rejection: {
    title: "Surveying the ground, not the aircraft",
    simple:
      "The aircraft's own field has always been the enemy of airborne magnetics. The classic escape is distance, a stinger or a sensor on a cable, plus compensation flights before each campaign. Our instrument is designed to reject the aircraft's field on board, at the point of measurement, and to keep a record of what it removed.",
    deep:
      "Near and far sources do not look the same to an instrument on the aircraft: the airframe's sources ride with it and dominate at short range, while the geology lies far below and changes slowly along the line. The instrument is designed to separate the two at the point of measurement, in place of a compensation model fitted once and trusted for the rest of the flight.\n\nWhat this offers a survey operation: fewer constraints on where the sensor sits, and a different kind of quality control. What was removed is not silently subtracted; it is attributed to a source and archived alongside the data, so a survey block carries its own cleaning record into processing and audit. Model-derived at this stage; the method is covered by patent applications filed in 2026.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  attack_burst: {
    short: "Storm",
    title: "Attack 2: the geomagnetic storm",
    simple:
      "When the Sun disturbs the Earth's field, survey data goes bad in a way that is hard to see in the moment. The industry's answer is to stand down when the base station goes out of tolerance, and refly the lines. Here the chain watches its own raw signals, sees the storm arrive, and marks exactly which readings it can no longer vouch for.",
    deep:
      "A geomagnetic storm multiplies the ambient disturbance inside the event window. Because the canceller learns the spatial signature of platform sources, the residual after cleaning barely moves: the classic silent-miss condition, and the reason storm contamination has usually been caught after the fact, at the base station or in levelling. The features that do move are the high-frequency power of the raw signal and the size of the canceller's correction. They feed the novelty scale, which can only widen the bound, and the affected readings are withheld with a named cause rather than silently degraded. The survey keeps flying: what survives the storm keeps its bound, what does not is an honest gap to refly, not a corruption discovered weeks later in processing.\n\nModel-derived: in this demo the readings inside the event window are flagged. In nominal flight false flags are rare, and the asymmetry is deliberate: the chain would rather withhold a good reading than vouch for a bad one.",
    refs: "Spectral Flow patent applications filed 2026.",
  },
  contact: {
    short: "Anomaly",
    title: "The anomaly as the product",
    simple:
      "What the chain removes is sorted, not thrown away. Sources fixed to the aircraft move with it; a magnetised body in the ground does not. As the aircraft flies past, the body's field swells and fades in a telltale curve that shows where it lies and how significant it is. The survey does not just record field values; it catalogues anomalies in passing.",
    deep:
      "A source hundreds of metres away cannot be ranged from a single position. What localises it is the aircraft's own passage: the field swept along the line follows the dipole law, falling with the cube of distance, and a dipole fixed to the ground is fitted to that profile. Sources are classified by how they behave: platform sources ride the body frame, geological sources stay fixed in the world. In this demo a compact magnetised body passing near the line is localised, with a significance score and a range estimate, while the aircraft's own field, far stronger at the sensor, is removed. The report says compact magnetised body, flagged for follow-up: no claim about composition or grade, that is what ground truthing is for. To our knowledge, what is new is doing this at the same time as navigation, from one guarded estimator: every survey line is also a screening pass.",
    refs:
      "Anderson functions (classical passage profile); Spectral Flow patent applications filed 2026.",
  },
  spoofing: {
    short: "Uncharted",
    title: "An uncharted body becomes a catalogue entry",
    simple:
      "In exploration nobody jams you, but the ground hides bodies no chart records. When the aircraft sweeps past a strongly magnetised body, its signature swells out of the regional field with a telltale shape, and the same estimator that guards the position catalogues it: location, range, significance. An uncharted body is not an error source for this instrument; it is the deliverable.",
    deep:
      "A compact magnetised body behaves like a dipole: its field falls with the cube of distance, and its passage signature along the flight line has a width set by the closest-approach distance. The map-subtracted residual along the estimated track isolates that signature from the regional field; a matched-profile fit detects it and localises it in range and along-track position. The side ambiguity of a single pass is resolved by the adjacent line or a tie-line, which the survey pattern provides for free.\n\nThe architectural point: a chain built to attribute every source it removes turns surprises into catalogue entries instead of position errors. Navigation quality holds through the encounter because the fix bounds widen honestly where the residual is disturbed, and the detection comes with the same calibrated confidence as the position fixes. The entry reads compact magnetised body, with significance and range; whether it is ore, a pipeline or a wreck is what follow-up is for. Model-derived.",
    refs:
      "Spectral Flow patent applications filed 2026; Anderson functions (classical passage profile).",
  },
};

export function getTopic(key: TopicKey, profile: ProfileKey): ScienceTopic {
  const base = TOPICS[key];
  const ov =
    profile === "space"
      ? SPACE_OVERRIDES[key]
      : profile === "geo"
        ? GEO_OVERRIDES[key]
        : undefined;
  return { ...base, ...ov };
}
