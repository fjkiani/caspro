import type { ArtifactEntry, TrialCaseFile, VectorAxes } from '../types';

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
    path: "NCT03462342 \u00b7 JCO 2023",
    type: "md",
    status: "VERIFIED",
    summary: "PARPi-naive ORR 36% (PFS HR 0.42) vs post-PARPi ORR 4% (PFS HR 1.31).",
  },
  {
    doc: "PARPi-Naive Stratification Note",
    path: "Class-level transfer lesson",
    type: "mdc",
    status: "VERIFIED",
    summary: "Treatment-history stratification. No molecular assay required.",
  },
];

export const CAPRI: TrialCaseFile = {
  id: "capri",
  caseNumber: "04",
  trialId: "NCT03462342",
  sponsor: "AstraZeneca",
  phase: "Phase II",
  cancer: "Recurrent high-grade serous ovarian",
  drug: "Ceralasertib (ATRi) + Olaparib (PARPi)",
  comparator: "Various \u2014 subgroup analysis",
  enrolled: 0,
  primaryEndpoint: "ORR 36% PARPi-naive vs 4% post-PARPi",
  title: "CAPRI \u2014 PARPi-naive status is the ATRi + PARPi responder gate",
  drugLine: "ATRi + PARPi combination // AZ Phase II Ovarian",
  sources: [
    "Yap et al. JCO 2023 (NCT03462342)",
  ],
  rootCause: {
    summary: "The CAPRI trial demonstrated that prior PARP inhibitor exposure ablates response to ATRi + PARPi combinations. PARPi-naive patients had ORR 36% and PFS HR 0.42. Post-PARPi patients had ORR 4% and PFS HR 1.31. Prior PARPi exposure must be a stratification variable in any ATRi + PARPi combination program.",
    failureKeyword: "Prior PARPi exposure not stratified",
    statusQuo: "Prior PARPi exposure not stratified",
    statusQuoLabel: 'Status Quo',
    intercept: "PARPi-naive enrolment (mandatory stratification)",
    interceptLabel: 'Candidate framework',
  },
  responderLabel: "PARPi-naive (high-grade serous ovarian)",
  nonResponderLabel: "Post-PARPi progression (resistance mechanisms already selected)",
  responderVector: RESPONDER_VECTOR,
  nonResponderVector: NON_RESPONDER_VECTOR,
  trialVector: TRIAL_VECTOR,
  cosineResponder: -1,
  cosineITT: -1,
  deltaImpact: 'gated',
  vectorFlags: [],
  scores: [
    { label: 'Alignment score', value: 'gated', subtext: 'Under canon review', color: 'cyan' },
    { label: 'Published readout', value: "ORR 36% PARPi-naive ", subtext: 'Public source', color: 'rose' },
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
  gatesSummary: "Subgroup effect \u2014 response ablated by prior PARPi exposure",
  biologySummary: "PARP inhibitor exposure selects for resistance mechanisms (BRCA reversion, restored HR, etc.). ATR inhibition combined with PARPi is not sufficient to overcome those resistance mechanisms. The PARPi-naive population is where the ATRi + PARPi mechanism still works.",
  biologyCascade: [
    "PARP inhibitor exposure \u2192 selection pressure",
    "\u2192 Resistance mechanisms emerge (BRCA reversion, restored HR)",
    "\u2192 ATRi added on top: not enough leverage to overcome the resistance state",
    "\u2192 PARPi-naive tumors retain the HR-deficient phenotype the combination exploits",
    "\u2192 Result: 9-fold ORR advantage for PARPi-naive over post-PARPi",
  ],
  playbook: [
    { title: "Stratification variable", desc: "Prior PARPi exposure \u2014 mandatory stratification for ATRi + PARPi trials." },
    { title: "Line of therapy", desc: "PARPi-naive is the responder gate; post-PARPi is a distinct biology." },
    { title: "Companion diagnostic", desc: "Treatment history is sufficient \u2014 no molecular assay required." },
    { title: "Class-level transfer", desc: "Applies to every ATRi + PARPi combination in development." },
  ],
  artifacts: ARTIFACTS,
  commercial: {
    targetPopulation: "18,000+",
    populationUnit: "Ovarian US / Yr",
    annualSavings: "$120M+",
    savingsUnit: "PARPi-status stratification",
    closingStatement: "Treatment-history stratification is free. Applying it protects every ATRi + PARPi program.",
  },
  diagnosticLog: [
    { time: '', message: 'Diagnostic detail is gated pending canon reconciliation.', level: 'info' },
  ],
  oneLiner: "In CAPRI, PARPi-naive patients had ORR 36% versus 4% in post-PARPi patients. Prior PARPi exposure must be a stratification variable in every ATRi + PARPi combination program.",
  validationTier: "Retrospective decode of published biomarker",
  validationStrength: "Subgroup effect \u2014 class-level transfer lesson",
};
