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
    path: "NCT02595892 \u00b7 Nat Commun 2021",
    type: "md",
    status: "VERIFIED",
    summary: "PFS HR 0.34 RS-Low vs HR 1.11 RS-High \u2014 the two subpopulations were combined in the ITT design.",
  },
  {
    doc: "RS-Status Biomarker Note",
    path: "CCNE1 / RB1 / MYC exclusion set",
    type: "mdc",
    status: "VERIFIED",
    summary: "Standard NGS panel is sufficient to determine RS status. No RNA-seq required.",
  },
];

export const BERZOSERTIB: TrialCaseFile = {
  id: "berzosertib",
  caseNumber: "05",
  trialId: "NCT02595892",
  sponsor: "Merck KGaA / EMD Serono",
  phase: "Phase II",
  cancer: "Platinum-resistant ovarian carcinoma",
  drug: "Berzosertib (M6620, ATRi) + Gemcitabine",
  comparator: "Gemcitabine alone",
  enrolled: 0,
  primaryEndpoint: "PFS: HR 0.34 RS-Low vs HR 1.11 RS-High",
  title: "Berzosertib \u2014 RS-High is the missing responder gate",
  drugLine: "Berzosertib (ATRi) + Gemcitabine // Merck Phase II Ovarian",
  sources: [
    "PMID 34552099 \u2014 Konstantinopoulos et al., Nat Commun 2021",
    "Yap et al., Cancer Discov 2020 (NCT02595892)",
  ],
  rootCause: {
    summary: "The berzosertib trial identified two clinically distinct subpopulations. RS-Low patients derived meaningful benefit (ORR 40%). RS-High patients (CCNE1-amp, RB1-loss, MYC-amp) already carry saturated replication stress and did not benefit. The trial's ITT design masked both signals \u2014 the RS-Low benefit and the RS-High null.",
    failureKeyword: "ITT enrolment without replication-stress stratification",
    statusQuo: "ITT enrolment without replication-stress stratification",
    statusQuoLabel: 'Status Quo',
    intercept: "RS-Low pre-selection",
    interceptLabel: 'Candidate framework',
  },
  responderLabel: "RS-Low (no CCNE1/RB1/MYC alterations)",
  nonResponderLabel: "RS-High (CCNE1-amp, RB1-loss, MYC-amp)",
  responderVector: RESPONDER_VECTOR,
  nonResponderVector: NON_RESPONDER_VECTOR,
  trialVector: TRIAL_VECTOR,
  cosineResponder: -1,
  cosineITT: -1,
  deltaImpact: 'gated',
  vectorFlags: [],
  scores: [
    { label: 'Alignment score', value: 'gated', subtext: 'Under canon review', color: 'cyan' },
    { label: 'Published readout', value: "PFS: HR 0.34 RS-Low ", subtext: 'Public source', color: 'rose' },
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
  gatesSummary: "Publishable subgroup \u2014 ITT not powered for efficacy",
  biologySummary: "RS-Low tumors are not yet at the replication-stress lethality threshold. Gemcitabine stresses them, and ATRi tips them over. RS-High tumors are already maximally stressed \u2014 ATRi adds no additional lethality. This split is why any ATR inhibitor program in ovarian cancer must pre-specify RS-High enrolment criteria.",
  biologyCascade: [
    "Gemcitabine stalls replication forks \u2192 replication stress (RS)",
    "\u2192 ATR is the master RS sensor \u2014 stabilizes stalled forks",
    "\u2192 Berzosertib blocks ATR \u2192 stalled forks collapse catastrophically",
    "\u2192 RS-Low patient: not yet at lethality threshold \u2192 ATRi + gem tips them over \u2192 HR 0.34",
    "\u2192 RS-High patient (CCNE1-amp / RB1-loss / MYC-amp): already saturated RS",
    "\u2192 Gemcitabine alone is maximally stressing them",
    "\u2192 Adding ATRi provides no additional lethality \u2192 HR 1.11 (trend toward harm)",
    "\u2192 Any ATR program in ovarian cancer must pre-specify RS-Low enrolment",
  ],
  playbook: [
    { title: "Subgroup identification", desc: "RS-Low and RS-High are clinically distinct \u2014 the trial's ITT design combined them." },
    { title: "Biomarker specification", desc: "CCNE1 amplification, RB1 loss, MYC amplification and related lesions define the RS-High exclusion." },
    { title: "Transfer lesson", desc: "Any future ATR inhibitor program in ovarian cancer must pre-specify the RS status for enrolment." },
    { title: "Companion diagnostic", desc: "Standard NGS panels are sufficient \u2014 no RNA-seq required." },
  ],
  artifacts: ARTIFACTS,
  commercial: {
    targetPopulation: "22,000+",
    populationUnit: "Ovarian US / Yr",
    annualSavings: "$100M+",
    savingsUnit: "RS-based selection",
    closingStatement: "Standard NGS is sufficient to determine RS status. No RNA-seq required.",
  },
  diagnosticLog: [
    { time: '', message: 'Diagnostic detail is gated pending canon reconciliation.', level: 'info' },
  ],
  oneLiner: "Berzosertib + gemcitabine produced a striking RS-Low benefit (ORR 40%) masked by the trial's ITT design. RS-High status is the missing exclusion criterion for any ATR inhibitor program in ovarian cancer.",
  validationTier: "Retrospective decode of published biomarker",
  validationStrength: "Subgroup effect published \u2014 the transfer lesson for the class",
};
