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
    path: "NCT05450692 \u00b7 public readout",
    type: "md",
    status: "VERIFIED",
    summary: "OS HR=0.90 (p=0.287) \u2014 primary endpoint missed. 594 patients enrolled. STK11/KEAP1 status collected at screening but not used to gate enrollment.",
  },
  {
    doc: "Mechanism Alignment Receipt",
    path: "Under continued canon review",
    type: "json",
    status: "PENDING",
    summary: "Alignment magnitude gated pending canon reconciliation. External-safe framing limited to the mechanism candidate.",
  },
];

export const LATIFY: TrialCaseFile = {
  id: "latify",
  caseNumber: "01",
  trialId: "NCT05450692",
  sponsor: "AstraZeneca",
  phase: "Phase III",
  cancer: "IO-refractory NSCLC (2L+)",
  drug: "Ceralasertib (ATRi, AZD6738) + Durvalumab (PD-L1)",
  comparator: "Docetaxel",
  enrolled: 594,
  primaryEndpoint: "OS primary endpoint: FAILED (HR 0.90, p=0.287)",
  title: "Ceralasertib + Durvalumab \u2014 under continued analysis",
  drugLine: "Ceralasertib (ATRi) + Durvalumab (PD-L1) // AZ Phase III NSCLC failure",
  sources: [
    "PMID 40645185 (Cancer Cell 2025)",
    "PMCID PMC10957481 (Nat Med 2024, HUDSON)",
    "PMCID PMC10894296 (Nat Commun 2024)",
  ],
  rootCause: {
    summary: "Trial enrolled unselected 2L+ NSCLC. Post-hoc biology suggests the STK11/KEAP1 co-mutation subgroup is where ATRi + PD-L1 could produce benefit \u2014 but the quantitative alignment analysis for this trial is under continued canon review and is not published externally.",
    failureKeyword: "Unselected enrollment",
    statusQuo: "Unselected enrollment",
    statusQuoLabel: 'Status Quo',
    intercept: "STK11 / KEAP1 co-loss subgroup (candidate)",
    interceptLabel: 'Candidate framework',
  },
  responderLabel: "STK11-loss + KEAP1-loss + KRAS-mut (IO-cold, candidate)",
  nonResponderLabel: "STK11-intact + IO-warm + post-ICI",
  responderVector: RESPONDER_VECTOR,
  nonResponderVector: NON_RESPONDER_VECTOR,
  trialVector: TRIAL_VECTOR,
  cosineResponder: -1,
  cosineITT: -1,
  deltaImpact: 'gated',
  vectorFlags: [],
  scores: [
    { label: 'Alignment score', value: 'gated', subtext: 'Under canon review', color: 'cyan' },
    { label: 'Published readout', value: "OS primary endpoint:", subtext: 'Public source', color: 'rose' },
    { label: 'Framework tier', value: "Under continued canon re", subtext: '', color: 'cyan' },
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
  gatesSummary: "Gated \u2014 under continued analysis",
  biologySummary: "STK11/KEAP1 co-loss creates a profoundly immunosuppressive tumor. ATR inhibition may trigger cGAS-STING and flip the TME from cold to hot, enabling PD-L1 blockade. Whether this candidate mechanism is quantitatively sufficient to explain the LATIFY readout is under continued analysis.",
  biologyCascade: [
    "STK11-loss tumor",
    "\u2192 MDSC accumulation \u2192 cold/excluded TME \u2192 IO tends to fail",
    "\u2192 Ceralasertib blocks ATR \u2192 replication stress response uncontrolled",
    "\u2192 cGAS-STING pathway activated (cytosolic DNA from unrepaired DSBs)",
    "\u2192 IFN-I released \u2192 MDSC depleted in peripheral blood",
    "\u2192 TME may convert from cold to hot",
    "\u2192 PD-L1 blockade (durvalumab) then has T-cells to release",
    "\u2192 Candidate mechanism \u2014 awaiting canon-lock before external quantitative claims",
  ],
  playbook: [
    { title: "Candidate archetype", desc: "Mapped RESPONDER (STK11/KEAP1 co-loss) vs NON-RESPONDER (STK11-intact) archetypes from published biology." },
    { title: "Governance hold", desc: "Delta magnitude and vector fits are quarantined pending canon reconciliation." },
    { title: "Two-Layer framing", desc: "Consistent with the two-layer decode: target is real; enrolled population may not reflect the archetype that could respond." },
    { title: "External-safe posture", desc: "External communication limited to the mechanism candidate. Numeric receipts are held internal." },
  ],
  artifacts: ARTIFACTS,
  commercial: {
    targetPopulation: "45,000\u201370,000",
    populationUnit: "US / Yr (candidate subpopulation)",
    annualSavings: "$4\u20137B",
    savingsUnit: "Payer Value (candidate)",
    closingStatement: "Selecting the mechanistic responder subgroup could avoid the ITT failure \u2014 pending canon lock.",
  },
  diagnosticLog: [
    { time: '', message: 'Diagnostic detail is gated pending canon reconciliation.', level: 'info' },
  ],
  oneLiner: "Ceralasertib + durvalumab failed ITT in 2L+ NSCLC. The STK11/KEAP1 co-loss subgroup is a candidate mechanistic responder archetype. Quantitative alignment magnitude is under continued canon review; external claims are limited to the mechanism candidate.",
  validationTier: "Under continued canon review",
  validationStrength: "Mechanism candidate \u2014 quantitative alignment gated",
};
