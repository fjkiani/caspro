// ==============================================================================
// L2 MECHANISM ALIGNMENT — data for the /engine/mechanism-alignment/ surfaces
// (intro + scroll + tabs).
//
// Governance:
//   • PATH_A_FORMULA is the production ranker as of 2026-04-28
//     (signed by Fahad Kiani, PATH B prohibited in all outputs).
//   • DL-07 is enforced: no output can carry both 'DDR' and '0.983' together.
//     We describe DDR alignment qualitatively; the numeric figure stays
//     quarantined until reproduced end-to-end.
//   • Every divergence case is labelled ILLUSTRATIVE — the vector values are
//     for engine explanation only, not from a real patient cohort.
//   • The RSS axis is opt-in (PMID 34552099 replication-stress-score);
//     it is *not* part of the 7-D core pathway vector.
//
// Cross-refs:
//   • /audit/crispro-backend-v3/layer1_engines/mechanism_fit/mechanism_fit_ranker.py
//   • /audit/crispro-backend-v3/layer0_contracts/canonical_vectors.py
//   • /audit/crispro-backend-v3/layer2_gates/governance_gate.py
// ==============================================================================

// -----------------------------------------------------------------------------
// PATH A locked constants (mirror of layer0_contracts/canonical_vectors.py).
// If any of these change, this file must change too — never diverge silently.
// -----------------------------------------------------------------------------

export const PATH_A_FORMULA = 'fit = clip((p · t) / ‖t‖₂, 0, 1)';
export const PATH_A_FORMULA_VERSION = 'PATH_A_LOCKED_2026-04-28';
export const PATH_A_APPROVAL = 'Approved by Fahad Kiani 2026-04-28. PATH B prohibited.';
export const VECTOR_VERSION_7D = '7D.canonical';
export const VECTOR_VERSION_8D = '8D.v1';

export const PATHWAYS_7D = [
  { key: 'ddr',    label: 'DDR',     name: 'DNA damage response' },
  { key: 'mapk',   label: 'MAPK',    name: 'MAPK / RAS-RAF-MEK-ERK' },
  { key: 'pi3k',   label: 'PI3K',    name: 'PI3K / AKT / mTOR' },
  { key: 'vegf',   label: 'VEGF',    name: 'Angiogenesis (VEGF axis)' },
  { key: 'her2',   label: 'HER2',    name: 'HER2 / ERBB family' },
  { key: 'io',     label: 'IO',      name: 'Immuno-oncology / TME' },
  { key: 'efflux', label: 'Efflux',  name: 'Drug efflux / ABC transporters' },
] as const;

export const AXES_8D = [...PATHWAYS_7D, {
  key: 'rss',
  label: 'RSS',
  name: 'Replication-Stress Score (opt-in, PMID 34552099)',
}] as const;

// α · eligibility + β · mechanism_fit composite (composite gate).
export const MECHANISM_FIT_ALPHA = 0.7;
export const MECHANISM_FIT_BETA = 0.3;
export const MIN_ELIGIBILITY_THRESHOLD = 0.60;
export const MIN_MECHANISM_FIT_THRESHOLD = 0.30;
export const COMPOSITE_EXPRESSION = 'score = 0.7 · eligibility + 0.3 · mechanism_fit';

// -----------------------------------------------------------------------------
// Illustrative divergence cases — for engine explanation only, not real cohorts.
// Each case names one canonical pathway conflict + a short mechanism sentence.
// Numbers are chosen to demonstrate the fit-vs-gate math, not to represent an
// observed patient / drug outcome.
// -----------------------------------------------------------------------------

export interface DivergenceCase {
  id: string;
  slug: string;
  title: string;
  audience: string;               // one-line audience hook
  conflict: {
    pathway: keyof typeof PATHWAYS_7D[number] | string;
    label: string;                // e.g. "MAPK conflict"
    detail: string;               // one-sentence conflict summary
  };
  patientVector: Record<string, number>;      // p ∈ [0,1]^7 (or 8 with RSS)
  therapyVector: Record<string, number>;      // t ∈ [0,1]^7 (or 8 with RSS)
  narrative: string[];             // 2-3 paragraphs
  outcome: {
    fit: string;                   // qualitative — no cited numeric per DL-07 when DDR is involved
    eligibility: number;           // 0..1
    verdict: 'PASS' | 'FAIL';
    reason: string;
  };
  illustrativeNote: string;        // required labeling
}

export const DIVERGENCE_CASES: DivergenceCase[] = [
  {
    id: 'DIV-01',
    slug: 'mek-escape-nras-q61k',
    title: 'MEK escape via NRAS Q61K amplification',
    audience: 'For BD teams evaluating MEK-inhibitor bets after unstratified failure.',
    conflict: {
      pathway: 'mapk',
      label: 'MAPK conflict',
      detail: 'Patient carries an activating RAS-family amplification that reroutes signaling around the MEK block.',
    },
    patientVector: {
      ddr: 0.10, mapk: 0.85, pi3k: 0.20, vegf: 0.15, her2: 0.05, io: 0.10, efflux: 0.20,
    },
    therapyVector: {
      ddr: 0.00, mapk: 0.90, pi3k: 0.00, vegf: 0.00, her2: 0.00, io: 0.00, efflux: 0.00,
    },
    narrative: [
      'The therapy vector is nearly single-axis MAPK — appropriate for a MEK inhibitor. The patient vector is also MAPK-dominant, so a naive cosine treats this as a clean alignment.',
      'PATH A projects the patient onto the therapy axis first (p·t / ‖t‖₂). That projection captures the strong MAPK signal, but the composite gate cross-checks eligibility, which encodes the NRAS Q61K amplification as an escape mechanism.',
      'The composite α·eligibility + β·mechanism_fit drops below threshold. The engine returns FAIL with a named reason ("MAPK bypass via NRAS Q61K amplification") — not a black-box score.',
    ],
    outcome: {
      fit: 'strong',                          // qualitative
      eligibility: 0.42,
      verdict: 'FAIL',
      reason: 'MAPK bypass via NRAS Q61K amplification (illustrative — mechanism gate lower than eligibility threshold 0.60).',
    },
    illustrativeNote: 'Illustrative — vector values shown are for engine explanation, not from a real patient cohort.',
  },
  {
    id: 'DIV-02',
    slug: 'atri-cold-tme',
    title: 'ATRi against cold TME missing DDR gate',
    audience: 'For clinical scientists asking why an unstratified ATRi hits its endpoint on a subgroup only.',
    conflict: {
      pathway: 'ddr',
      label: 'DDR + IO conflict',
      detail: 'DDR-inhibitor therapy plausibly matches on the DNA damage axis but the patient has a cold TME with no IO priming, so the surrounding biology cannot convert the DDR hit into response.',
    },
    patientVector: {
      ddr: 0.75, mapk: 0.20, pi3k: 0.30, vegf: 0.10, her2: 0.05, io: 0.10, efflux: 0.15,
    },
    therapyVector: {
      ddr: 0.90, mapk: 0.00, pi3k: 0.10, vegf: 0.00, her2: 0.00, io: 0.40, efflux: 0.00,
    },
    narrative: [
      'ATR inhibitors are a DDR bet. The patient vector loads on DDR too, so the projection (p·t / ‖t‖₂) reports strong mechanism alignment on the DDR axis.',
      'PATH A does not stop there — the composite composite reads across axes. The therapy expects an IO-permissive environment (t.io = 0.40); the patient TME is cold (p.io = 0.10). That IO deficit is what turns an on-mechanism drug into an off-target trial.',
      'Result: the composite gate flags the divergence and returns a FAIL with the surface reason "DDR aligned but IO-permissive gate not met." No numeric DDR score is emitted here — DL-07 keeps the specific figure quarantined until we can reproduce it end-to-end.',
    ],
    outcome: {
      fit: 'strong on DDR axis',              // qualitative
      eligibility: 0.55,
      verdict: 'FAIL',
      reason: 'DDR aligned but IO-permissive gate not met (illustrative — composite below 0.60 threshold).',
    },
    illustrativeNote: 'Illustrative — vector values shown are for engine explanation, not from a real patient cohort. Numeric DDR figure quarantined per DL-07.',
  },
  {
    id: 'DIV-03',
    slug: 'cetuximab-ras-mutant',
    title: 'Cetuximab in RAS-mutant CRC',
    audience: 'For history-aware BD teams — the archetype of a MAPK conflict already litigated in the clinic.',
    conflict: {
      pathway: 'mapk',
      label: 'MAPK conflict',
      detail: 'EGFR antibody therapy relies on downstream MAPK responsiveness; RAS-mutant tumors bypass the receptor block.',
    },
    patientVector: {
      ddr: 0.10, mapk: 0.80, pi3k: 0.30, vegf: 0.10, her2: 0.15, io: 0.05, efflux: 0.10,
    },
    therapyVector: {
      ddr: 0.00, mapk: 0.35, pi3k: 0.00, vegf: 0.00, her2: 0.55, io: 0.00, efflux: 0.00,
    },
    narrative: [
      'This is the historical archetype every BD desk already knows. Cetuximab targets EGFR (HER-family axis); the effect chain requires downstream MAPK responsiveness. In RAS-mutant CRC that chain is broken upstream.',
      'PATH A projects the patient vector onto the therapy vector. Because the therapy axis mixes HER2 and MAPK, the projection reports modest mechanism alignment. On its own that could pass a naive gate.',
      'The composite α·eligibility + β·mechanism_fit correctly returns FAIL — eligibility encodes the RAS-mutant status as a hard bypass. The engine reproduces the field decision that cetuximab does not belong in RAS-mutant CRC without an upstream fix.',
    ],
    outcome: {
      fit: 'modest',
      eligibility: 0.28,
      verdict: 'FAIL',
      reason: 'MAPK bypass — RAS-mutant status blocks EGFR-antibody mechanism (illustrative — reproduces historical clinical decision).',
    },
    illustrativeNote: 'Illustrative — vector values shown are for engine explanation, not from a real patient cohort. Reproduces the well-documented cetuximab-in-RAS-mutant-CRC historical failure archetype.',
  },
];

// -----------------------------------------------------------------------------
// Intro-page explainer bullets (mirrors the shape of TARGET_LOCK_EXPLAINER).
// -----------------------------------------------------------------------------
export const MECHANISM_ALIGNMENT_EXPLAINER = [
  {
    label: 'Vector',
    text: 'Every drug and every patient is projected into the same canonical 7-axis mechanism space (DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux). RSS is an optional 8th axis.',
  },
  {
    label: 'Formula',
    text: 'PATH A ranker: fit = clip((p·t) / ‖t‖₂, 0, 1). Projection onto the therapy vector, clipped to [0,1]. No PATH B fallback.',
  },
  {
    label: 'Gate',
    text: 'Composite score = 0.7 · eligibility + 0.3 · mechanism_fit. Both must clear thresholds (0.60, 0.30). Neither can pass alone.',
  },
  {
    label: 'Governance',
    text: 'PATH A signed 2026-04-28 · PATH B prohibited · DDR numeric figures quarantined per DL-07 until reproduced.',
  },
] as const;
