/**
 * Public preprints on Zenodo : single source of truth for the
 * publications list (/company#publications), llms.txt and JSON-LD.
 *
 * Every DOI below was re-verified against the Zenodo API on 2026-08-18
 * (open access, CC-BY 4.0). House rule: never add an entry whose DOI
 * has not been checked to resolve.
 *
 * Deliberately unlisted elsewhere and never counted: these deposits are
 * timestamped records of the method, not a publication record. They are
 * reachable from /company#publications and llms.txt, nowhere louder.
 * Adding or removing an entry changes nothing else on the site.
 */
export type Publication = {
  title: string;
  year: number;
  doi: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    title:
      "Spectral Noise Engineering: A Platform-Agnostic Co-Design Framework for Room-Temperature Quantum Coherence Extension",
    year: 2026,
    doi: "10.5281/zenodo.19360334",
  },
  {
    title:
      "NVSim v3.0: Multi-Defect Temperature-Dependent Decoherence Simulation Validated Across Four Color Center Platforms",
    year: 2026,
    doi: "10.5281/zenodo.19365360",
  },
  {
    title:
      "NVSim v3.0: A Calibrated Eight-Channel Model for NV-Center Coherence in Passivated Nanodiamonds and Falsifiable Design Rules for Biosensing",
    year: 2026,
    doi: "10.5281/zenodo.19365388",
  },
  {
    title:
      "Finite-Volume Suppression of Spectral Diffusion and Motional Narrowing of the P1 Bath Reconcile Nanodiamond and Bulk Diamond Decoherence",
    year: 2026,
    doi: "10.5281/zenodo.19359777",
  },
  {
    title:
      "Vibration Robustness of NV-Diamond Magnetometers: A Multi-Channel Decoherence Analysis for Mobile Quantum Navigation",
    year: 2026,
    doi: "10.5281/zenodo.19207451",
  },
  {
    title:
      "Room-Temperature Quantum Gate Fidelity Above the Surface Code Threshold: A Multi-Channel Decoherence Analysis for NV-Diamond Quantum Processors",
    year: 2026,
    doi: "10.5281/zenodo.19240094",
  },
];

export const doiUrl = (p: Publication) => `https://doi.org/${p.doi}`;
