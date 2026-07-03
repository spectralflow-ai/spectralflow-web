/** Mission narrative packs for the instrument, mirrored from the Python
 *  demo. One physics core, audience-specific stories. */

export type ProfileKey = "defence" | "space";

export interface Profile {
  chooserKicker: string;
  chooserTitle: string;
  chooserBody: string;
  mapTitle: string;
  phases: [number, string][];
  evTakeoff: string;
  evInterf: string;
  evContactHint: string;
  evContact: string;
  atk1: string;
  atk2: string;
  atk3: string;
  atkNames: { gain: string; burst: string; spoof: string };
  fleetCoincident: string;
  fleetLocal: string;
  /** placeholders {det} and {range} are filled at render time */
  spoofDetected: string;
  spoofSearching: string;
  coldTitle: string;
  coldSub: string;
  coldCta: string;
  /** placeholder {pct} filled with drift_removed_pct */
  headline: string;
  consoleIdle: string;
  impactKicker: string;
  impact: {
    gain: { title: string; body: string };
    burst: { title: string; body: string };
    spoof: { title: string; body: string };
  };
}

export const PROFILES: Record<ProfileKey, Profile> = {
  defence: {
    chooserKicker: "Terrestrial navigation",
    chooserTitle: "Contested airspace",
    chooserBody:
      "GPS is jammed. Fly a 30 km leg on the Earth's magnetic fingerprint, play the adversary against your own instrument, and turn every rejected noise source into situational awareness.",
    mapTitle: "Crustal anomaly map · the Earth's magnetic fingerprint",
    phases: [
      [0, "cruise"],
      [150, "interference rising"],
      [430, "contact window"],
      [520, "cruise"],
      [580, "approach"],
    ],
    evTakeoff: "TAKEOFF · inertial reference aligned, magnetic chain armed",
    evInterf: "On-board interference rising · tensor rejection active",
    evContactHint: "MAD · faint external signature building on the swept profile",
    evContact: "CONTACT HELD · vessel class · navigation unaffected",
    atk1: "⚡ Inject gain fault",
    atk2: "⚡ Inject noise burst",
    atk3: "📡 Ground emitter",
    atkNames: {
      gain: "channel gain fault",
      burst: "interference burst",
      spoof: "adversary emitter · spoof attempt",
    },
    fleetCoincident:
      "FLEET · wingman reports the same signature · classified environmental",
    fleetLocal:
      "FLEET · wingman clean · fault isolated to this aircraft, quarantined",
    spoofDetected:
      "SOURCE DETECTED · artificial emitter · significance ×{det} · range ~{range} m · navigation continues",
    spoofSearching:
      "MAD · unexpected signature building on the swept profile · resolving",
    coldTitle: "GPS is jammed.",
    coldSub:
      "You still get home. Fly a 30 km leg on the Earth's magnetic fingerprint, attack your own instrument three different ways, and watch it refuse to be fooled. Computed live on our digital twin; every figure model-derived.",
    coldCta: "Fly the mission",
    headline:
      "{pct}% of inertial drift removed. No GPS, no emissions, every attack named and survived.",
    consoleIdle:
      "you are the adversary: attack the instrument whenever you like",
    impactKicker: "What your attack does",
    impact: {
      gain: {
        title: "A channel starts lying by 2%",
        body: "One of the twelve sensing channels quietly amplifies too much. Nothing looks wrong on any screen, yet the Earth's huge field now leaks through the mismatch and corrupts the measurement. The classic insidious failure of multi-sensor instruments.",
      },
      burst: {
        title: "A magnetic storm nearby",
        body: "A strong disturbance lights up near the aircraft. The canceller absorbs most of it, so the cleaned signal still looks fine. The trap is to trust it; the chain watches the raw input instead and widens its budget before any damage is done.",
      },
      spoof: {
        title: "An industrial jammer switches on ahead",
        body: "A ground installation with fifty times the magnetic signature of a warship starts emitting near your route. The inverse-cube law is your armour: at a 200 m pass it writes barely 200 nT on the sensor, and its own passage signature gives it away. Watch the log: the attack becomes a target.",
      },
    },
  },
  space: {
    chooserKicker: "Planetary exploration",
    chooserTitle: "Mars scout",
    chooserBody:
      "No GNSS has ever orbited Mars. Fly an aerial scout on the planet's fossil magnetic field, weather a solar storm, and catalogue a buried magnetic structure while you navigate.",
    mapTitle: "Crustal anomaly map · the fossil field of a dead dynamo",
    phases: [
      [0, "traverse"],
      [150, "local field activity rising"],
      [430, "survey window"],
      [520, "traverse"],
      [580, "descent"],
    ],
    evTakeoff: "DEPARTURE · inertial reference aligned, magnetic chain armed",
    evInterf: "Vehicle field activity rising · tensor rejection active",
    evContactHint: "SURVEY · faint crustal signature building on the swept profile",
    evContact: "SCIENCE TARGET CATALOGUED · buried magnetised body · navigation unaffected",
    atk1: "☢ Radiation hit",
    atk2: "☀ Solar storm",
    atk3: "⛰ Uncharted anomaly",
    atkNames: {
      gain: "radiation-induced channel fault",
      burst: "solar-storm disturbance",
      spoof: "uncharted magnetised body",
    },
    fleetCoincident:
      "SWARM · sister scout reports the same signature · classified space weather",
    fleetLocal:
      "SWARM · sister scout clean · fault isolated to this scout, quarantined",
    spoofDetected:
      "SCIENCE TARGET · uncharted magnetised body · significance ×{det} · range ~{range} m · catalogued",
    spoofSearching:
      "SURVEY · unexpected signature building on the swept profile · resolving",
    coldTitle: "Mars has no GPS.",
    coldSub:
      "Help is twenty light-minutes away. Fly a scout on the fossil field of a dead dynamo, weather the Sun, and watch an instrument that doubts itself so the mission never has to. Computed live on our digital twin; every figure model-derived.",
    coldCta: "Fly the sortie",
    headline:
      "{pct}% of inertial drift removed. No GNSS, no ground contact, every event named and survived.",
    consoleIdle:
      "you are the environment: unleash radiation and space weather whenever you like",
    impactKicker: "What just hit the scout",
    impact: {
      gain: {
        title: "A cosmic ray degrades a channel",
        body: "A single-event strike makes one of the twelve channels amplify 2% too much. Nothing looks wrong, yet the planet's field now leaks through the mismatch. In deep space nobody can retune your instrument for you.",
      },
      burst: {
        title: "The Sun erupts",
        body: "Space weather drives strong field disturbances for a couple of minutes. The canceller hides most of it, so the cleaned signal still looks fine. With help twenty light-minutes away, the instrument must distrust itself, alone, in real time.",
      },
      spoof: {
        title: "The crust hides a surprise",
        body: "A strongly magnetised buried structure lies just off the track. As the scout sweeps past, its inverse-cube signature swells out of the fossil field, and the same guarded estimator that protects navigation catalogues it: position, range, significance. Every navigation pass is a survey pass.",
      },
    },
  },
};
