/** Mission narrative packs for the instrument. One physics core,
 *  audience-specific stories. The keys stay stable: they are used in
 *  shared links (?profile=geo|defence|space). */

export type ProfileKey = "defence" | "space" | "geo";

/** Order shown in the mission chooser: survey, then air, then space. */
export const PROFILE_ORDER: ProfileKey[] = ["geo", "defence", "space"];

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
  spoofDetected: string;
  spoofSearching: string;
  coldTitle: string;
  coldSub: string;
  coldCta: string;
  headline: string;
  /** attacked-mission variant: {k} = events injected, {n} = fixes withheld */
  headlineAttacked: string;
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
    chooserKicker: "Navigation in the air",
    chooserTitle: "Contested airspace",
    chooserBody:
      "GPS is jammed. Fly a leg on the Earth's magnetic fingerprint, play the adversary against your own instrument, and watch every rejected source get sorted and named.",
    mapTitle: "Crustal anomaly map · the Earth's magnetic fingerprint",
    phases: [
      [0, "cruise"],
      [150, "interference rising"],
      [430, "contact window"],
      [520, "cruise"],
      [580, "approach"],
    ],
    evTakeoff: "TAKEOFF · inertial reference aligned, magnetic chain armed",
    evInterf: "On-board interference rising · platform rejection active",
    evContactHint: "DETECTION · faint external signature building on the swept profile",
    evContact: "SOURCE HELD · magnetised object below the track · navigation unaffected",
    atk1: "Inject gain fault",
    atk2: "Inject noise burst",
    atk3: "Ground emitter",
    atkNames: {
      gain: "channel gain fault",
      burst: "interference burst",
      spoof: "artificial emitter · spoof attempt",
    },
    spoofDetected:
      "SOURCE DETECTED · artificial emitter · localised · navigation continues",
    spoofSearching:
      "DETECTION · unexpected signature building on the swept profile · resolving",
    coldTitle: "GPS is jammed.",
    coldSub:
      "Fly a ten-minute leg on the Earth's magnetic fingerprint, attack your own instrument three different ways, and watch it withhold what it cannot vouch for. Computed live in simulation; every figure model-derived.",
    coldCta: "Fly the mission",
    headline:
      "Inertial drift held in check, without GPS. Every attack named and survived.",
    headlineAttacked:
      "You attacked {k} times. It withheld {n} fixes rather than be fooled, kept the error bounded, and said when not to trust it.",
    consoleIdle:
      "you are the adversary: attack the instrument whenever you like",
    impactKicker: "What your attack does",
    impact: {
      gain: {
        title: "A channel starts to lie",
        body: "One of the sensing channels quietly amplifies too much. Nothing looks wrong on any screen, yet the measurement is now silently biased. Watch the self-check.",
      },
      burst: {
        title: "A magnetic storm nearby",
        body: "A strong disturbance lights up near the aircraft. The canceller absorbs most of it, so the cleaned signal still looks fine. The trap is to trust it; the chain watches the raw input instead and widens its bound before any damage is done.",
      },
      spoof: {
        title: "An industrial emitter switches on ahead",
        body: "A large magnetic installation on the ground starts emitting near your route. A magnetic field fades with the cube of distance, so even a very large source only disturbs the sensor near its closest approach, and its own passage signature gives it away. Watch the log: the attack becomes a contact report.",
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
    evInterf: "Vehicle field activity rising · platform rejection active",
    evContactHint: "SURVEY · faint crustal signature building on the swept profile",
    evContact: "BODY CATALOGUED · buried magnetised body · navigation unaffected",
    atk1: "Radiation hit",
    atk2: "Solar storm",
    atk3: "Uncharted anomaly",
    atkNames: {
      gain: "radiation-induced channel fault",
      burst: "solar-storm disturbance",
      spoof: "uncharted magnetised body",
    },
    spoofDetected:
      "CATALOGUED · uncharted magnetised body · localised · science return",
    spoofSearching:
      "SURVEY · unexpected signature building on the swept profile · resolving",
    coldTitle: "Mars has no GPS.",
    coldSub:
      "Help is up to twenty light-minutes away. Fly a scout on the fossil field of a dead dynamo, weather the Sun, and watch an instrument that doubts itself so the mission never has to. Computed live in simulation; every figure model-derived.",
    coldCta: "Fly the sortie",
    headline:
      "Inertial drift held in check. No GNSS, no ground contact, every event named and survived.",
    headlineAttacked:
      "The environment struck {k} times. It withheld {n} fixes rather than guess, kept the error bounded, and never lied to the mission.",
    consoleIdle:
      "you are the environment: unleash radiation and space weather whenever you like",
    impactKicker: "What just hit the scout",
    impact: {
      gain: {
        title: "A cosmic ray degrades a channel",
        body: "A single-event strike makes one of the channels amplify slightly too much. Nothing looks wrong, yet the measurement is now silently biased. In deep space nobody can retune your instrument for you.",
      },
      burst: {
        title: "The Sun erupts",
        body: "Space weather drives strong field disturbances for a couple of minutes. The canceller hides most of it, so the cleaned signal still looks fine. With help up to twenty light-minutes away, the instrument must distrust itself, alone, in real time.",
      },
      spoof: {
        title: "The crust hides a surprise",
        body: "A strongly magnetised buried structure lies just off the track. As the scout sweeps past, its signature swells out of the fossil field, and the same guarded estimator that protects navigation catalogues it: position, range, significance. Every navigation pass is a survey pass.",
      },
    },
  },
  geo: {
    chooserKicker: "Airborne survey",
    chooserTitle: "Exploration survey",
    chooserBody:
      "Fly an airborne magnetic survey where the position is checked against the geology, the aircraft's own field is rejected on board, and the anomaly you find is the product. Every removed signal is attributed.",
    mapTitle: "Crustal anomaly map · the geology under the flight lines",
    phases: [
      [0, "line 1"],
      [150, "storm watch"],
      [430, "anomaly window"],
      [520, "line 2"],
      [580, "tie-line"],
    ],
    evTakeoff: "LINE START · inertial reference aligned, magnetic chain armed",
    evInterf: "Platform interference rising · platform rejection active",
    evContactHint: "SURVEY · faint signature building on the swept profile",
    evContact:
      "ANOMALY HELD · compact magnetised body · flagged for ground follow-up · navigation unaffected",
    atk1: "Channel drift",
    atk2: "Geomagnetic storm",
    atk3: "Uncharted body",
    atkNames: {
      gain: "sensor channel drift",
      burst: "geomagnetic storm",
      spoof: "uncharted magnetised body",
    },
    spoofDetected:
      "ANOMALY CATALOGUED · compact magnetised body · localised · flagged for follow-up",
    spoofSearching:
      "SURVEY · unexpected signature building on the swept profile · resolving",
    coldTitle: "Survey the ground, not the aircraft.",
    coldSub:
      "Airborne magnetic surveys have long escaped the aircraft's own field with distance and compensation flights. Fly a survey where that field is rejected on board, the position is checked against the geology itself, and every removed signal is attributed. Computed live in simulation; every figure model-derived.",
    coldCta: "Fly the survey",
    headline:
      "Inertial drift held in check. Every reading tied to a checked position, every anomaly attributed.",
    headlineAttacked:
      "The survey took {k} hits. It withheld {n} readings rather than vouch for them, kept the line bounded, and every gap is honest and can be reflown.",
    consoleIdle:
      "you are the field campaign: throw drift, storms and geology at the survey whenever you like",
    impactKicker: "What just hit the survey",
    impact: {
      gain: {
        title: "A channel starts to drift",
        body: "One of the sensing channels quietly amplifies too much. Nothing looks wrong on any screen, yet the data is now silently biased. Levelling would smear the error across the whole grid; here the chain catches it at the source and names it.",
      },
      burst: {
        title: "A geomagnetic storm rolls in",
        body: "Surveys traditionally stand down when the base station goes out of tolerance, then refly the lines. Here the chain sees the storm on the raw signals, withholds what it cannot vouch for, and the survey continues with honest gaps instead of silent corruption discovered weeks later in processing.",
      },
      spoof: {
        title: "The ground hides a surprise",
        body: "A compact magnetised body lies just off the flight line, absent from every chart. As the aircraft sweeps past, its signature swells out of the regional field, and the same guarded estimator that protects the position catalogues it: location, range, significance. The anomaly is not an error source; it is the deliverable.",
      },
    },
  },
};
