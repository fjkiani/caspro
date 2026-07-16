import type { ArtifactEntry, MoaGlyphRow, PublishedReadout, TrialCaseFile, TrialVerdict, VectorAxes } from '../types';

/**
 * Vague-safe canon (rebuilt 2026-07-07).
 *
 * Rules:
 *   - VectorAxes fields are kept as SENTINEL ZEROS to preserve the type
 *     contract for downstream visual components; no biology is encoded here.
 *     Radar / MoA components should read from the vague-safe narrative fields
 *     instead of these values.
 *   - Numeric fit / delta fields are set to -1 (gated sentinel).
 *     TrialLedgerReceiptPage renders these as "— (gated under canon review)".
 *   - Narrative text comes from external_safe program findings.
 */


const RESPONDER_VECTOR: VectorAxes = { ddr: 0, mapk: 0, pi3k: 0, io: 0, vegf: 0, her2: 0, efflux: 0, rss: 0 };
const NON_RESPONDER_VECTOR: VectorAxes = { ddr: 0, mapk: 0, pi3k: 0, io: 0, vegf: 0, her2: 0, efflux: 0, rss: 0 };
const TRIAL_VECTOR: VectorAxes = { ddr: 0, mapk: 0, pi3k: 0, io: 0, vegf: 0, her2: 0, efflux: 0, rss: 0 };

const ARTIFACTS: ArtifactEntry[] = [
  {
    doc: "Published Trial Outcome",
    path: "NCT03579316 \u00b7 Clin Cancer Res 2021",
    type: "md",
    status: "VERIFIED",
    summary: "PTEN-intact ORR 23% (PFS HR 0.55) vs PTEN-loss ORR 0% (PFS HR 1.82).",
  },
  {
    doc: "PTEN-Loss Exclusion Note",
    path: "Class-level transfer lesson",
    type: "mdc",
    status: "VERIFIED",
    summary: "Standard NGS or IHC-based deletion call is sufficient. No bespoke assay required.",
  },
];

export const ADAVOSERTIB: TrialCaseFile = {
  id: "adavosertib",
  caseNumber: "03",
  trialId: "NCT03579316",
  sponsor: "AstraZeneca",
  phase: "Phase II",
  cancer: "Recurrent ovarian carcinoma",
  drug: "Adavosertib (AZD1775, WEE1i) + Olaparib",
  comparator: "Various \u2014 subgroup analysis",
  enrolled: 0,
  primaryEndpoint: "ORR: 23% PTEN-intact vs 0% PTEN-loss",
  title: "Adavosertib \u2014 PTEN-loss is the WEE1 inhibitor resistance marker",
  drugLine: "WEE1i + PARPi // AZ Phase II Ovarian",
  sources: [
    "Lheureux et al. Clin Cancer Res 2021 (NCT03579316)",
  ],
  rootCause: {
    summary: "Adavosertib + olaparib produced a bimodal response by PTEN status. PTEN-intact patients had ORR 23% and PFS HR 0.55. PTEN-loss patients had ORR 0% and PFS HR 1.82. PTEN is not a stratification variable in most WEE1i trial designs \u2014 it is the missing exclusion criterion for the class.",
    failureKeyword: "PTEN status not used to exclude patients",
    statusQuo: "PTEN status not used to exclude patients",
    statusQuoLabel: 'Status Quo',
    intercept: "PTEN-loss exclusion (mandatory for WEE1i)",
    interceptLabel: 'Candidate framework',
  },
  responderLabel: "PTEN-intact",
  nonResponderLabel: "PTEN-loss (mandatory exclusion for WEE1i programs)",
  responderVector: RESPONDER_VECTOR,
  nonResponderVector: NON_RESPONDER_VECTOR,
  trialVector: TRIAL_VECTOR,
  cosineResponder: -1,
  cosineITT: -1,
  deltaImpact: 'gated',
  vectorFlags: [],
  scores: [
    { label: 'Alignment score', value: 'gated', subtext: 'Under canon review', color: 'cyan' },
    { label: 'Published readout', value: "ORR: 23% PTEN-intact", subtext: 'Public source', color: 'rose' },
    { label: 'Framework tier', value: "Retrospective decode of ", subtext: '', color: 'cyan' },
    { label: 'Responder archetype', value: 'defined', subtext: 'See narrative', color: 'cyan' },
  ],
  engineRun: {
    trialsScored: 0,
    responderScore: -1,
    responderRank: 0,
    nonResponderScore: -1,
    nonResponderRank: 0,
    delta: -1,
    receiptFile: 'Under continued canon review',
    receiptDate: 'gated',
  },
  gates: [
    { id: 1, label: 'Gate 1', condition: 'Under continued canon review', result: 'gated', pass: false },
    { id: 2, label: 'Gate 2', condition: 'Under continued canon review', result: 'gated', pass: false },
    { id: 3, label: 'Gate 3', condition: 'Under continued canon review', result: 'gated', pass: false },
  ],
  gatesSummary: "Subgroup effect \u2014 bimodal response by PTEN status",
  biologySummary: "PTEN loss confers resistance to WEE1 inhibition. The published biomarker analysis is clear: PTEN-intact ORR 23% versus PTEN-loss ORR 0%. Any WEE1 inhibitor program should treat PTEN-loss as a mandatory exclusion criterion.",
  biologyCascade: [
    "WEE1 gates the G2/M checkpoint",
    "\u2192 Adavosertib forces cells through G2/M with unresolved DNA damage",
    "\u2192 PTEN-intact patients: catastrophic mitosis \u2192 ORR 23%",
    "\u2192 PTEN-loss patients: alternative survival pathways engaged \u2192 ORR 0%",
    "\u2192 Every WEE1 inhibitor program should treat PTEN-loss as an exclusion criterion",
  ],
  playbook: [
    { title: "Biomarker specification", desc: "PTEN loss (IHC or NGS-based deletion call) as an exclusion criterion." },
    { title: "Class-level transfer", desc: "Any WEE1i program should replicate this exclusion." },
    { title: "Companion diagnostic", desc: "Standard NGS or IHC \u2014 no bespoke assay required." },
    { title: "Trial design", desc: "PTEN status must be a stratification variable and an eligibility gate." },
  ],
  artifacts: ARTIFACTS,
  commercial: {
    targetPopulation: "35,000+",
    populationUnit: "Ovarian US / Yr",
    annualSavings: "$150M+",
    savingsUnit: "PTEN-based selection",
    closingStatement: "PTEN loss is the missing exclusion criterion for the WEE1 inhibitor class.",
  },
  diagnosticLog: [
    { time: '', message: 'Diagnostic detail is gated pending canon reconciliation.', level: 'info' },
  ],
  oneLiner: "Adavosertib + olaparib produced ORR 23% in PTEN-intact patients and ORR 0% in PTEN-loss patients. PTEN loss is the missing exclusion criterion for the WEE1 inhibitor class.",
  validationTier: "Retrospective decode of published biomarker",
  validationStrength: "Bimodal subgroup effect \u2014 class-level transfer lesson",
  publishedReadout: {
    headlineLabel: "The Bimodal Split:",
    headlineValue: "ORR 23% intact / 0% PTEN-loss",
    tone: 'mixed',
    endpointLabel: "PFS HR (intact vs loss)",
    endpointValue: "0.55 / 1.82",
  },
  verdict: {
    label: "EXCLUSION_MISSING",
    tone: 'mixed',
    caption: "PTEN loss is a mandatory exclusion for the WEE1 inhibitor class.",
  },
  moaGlyphs: [
    { axis: 'ddr', direction: 'responder', magnitude: 'strongest', note: 'WEE1 inhibition drives mitotic-catastrophe on top of PARP-blocked SSB repair.' },
    { axis: 'rss', direction: 'responder', magnitude: 'strong', note: 'PTEN-intact tumors retain a functional S-phase checkpoint that WEE1i can abrogate.' },
    { axis: 'pi3k', direction: 'non-responder', magnitude: 'strong', note: 'PTEN loss = constitutive PI3K/AKT \u2014 the trial-failing resistance state.' },
    { axis: 'io', direction: 'non-responder', magnitude: 'minimal' },
    { axis: 'her2', direction: 'non-responder', magnitude: 'trace' },
  ],
};
