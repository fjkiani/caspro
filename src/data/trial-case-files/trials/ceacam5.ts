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
    doc: "Prospective Trial Decode",
    path: "NCT04154956 \u00b7 CARMEN-LC03 read-through",
    type: "md",
    status: "VERIFIED",
    summary: "Two-Layer decode: Layer 1 HIGH (target real), Layer 2 UNSELECTED (IHC \u226550% too permissive). Confirmed by ITT PFS HR=1.14 (n=389).",
  },
  {
    doc: "Two-Gate Framework Note",
    path: "Higher IHC threshold + IO permissiveness",
    type: "mdc",
    status: "VERIFIED",
    summary: "Candidate two-gate rescue framework for next-generation CEACAM5 programs. Details under program-level licensing.",
  },
  {
    doc: "Liver-Met Stratification",
    path: "CO.26 Pint=0.02 \u2014 liver metastasis interaction",
    type: "md",
    status: "VERIFIED",
    summary: "Source: PMC10698621 (Loree et al.). Liver-metastatic subset PFS HR=1.39 vs 0.54 without LM.",
  },
];

export const CEACAM5: TrialCaseFile = {
  id: "ceacam5",
  caseNumber: "02",
  trialId: "NCT04154956",
  sponsor: "Sanofi",
  phase: "Phase III (Terminated)",
  cancer: "NSCLC (CARMEN-LC03) / MSS mCRC expansion (by inference)",
  drug: "Tusamitamab Ravtansine (SAR408701)",
  comparator: "Docetaxel",
  enrolled: 389,
  primaryEndpoint: "FAILED \u2014 PFS HR=1.14 (95% CI 0.86\u20131.51; p=0.8204); discontinued Dec 21, 2023",
  title: "CEACAM5 \u2014 from Phase III failure to a two-gate patient selection framework",
  drugLine: "CEACAM5-DM4 ADC // Two-Gate Rescue Architecture",
  sources: [
    "IASLC 2024 WCLC (Besse et al.) \u2014 CARMEN-LC03 subgroup",
    "Gazzah et al. PMC12720031 (NCT02187848) \u2014 cCEA gate, NSCLC only",
    "Sanofi Press Release (Dec 21, 2023) \u2014 Phase III termination",
    "Loree et al. PMID 38727700 / PMC10698621 \u2014 CO.26 liver-met interaction (Pint=0.02)",
    "PROCEADE-CRC-01 (Nature Medicine 2025, PMC12720031)",
  ],
  rootCause: {
    summary: "CARMEN-LC03 (n=389) failed ITT (PFS HR=1.14). CEACAM5 IHC \u226550% is a marker of tumor identity, not drug sensitivity \u2014 the trial enrolled expressors who could not respond. Post-hoc, the \u226580% subgroup showed an exploratory OS HR=0.71 (CI unpublished). The two-gate rescue architecture (higher IHC threshold plus IO permissiveness) is the candidate framework for next-generation CEACAM5 programs.",
    failureKeyword: "IHC \u226550% \u2014 ITT PFS HR=1.14",
    statusQuo: "IHC \u226550% \u2014 ITT PFS HR=1.14",
    statusQuoLabel: 'Status Quo',
    intercept: "Two-Gate: IHC \u226580% + IO-permissive / non-liver-met (candidate)",
    interceptLabel: 'Candidate framework',
  },
  responderLabel: "CEACAM5-high + IO-permissive + non-liver-met",
  nonResponderLabel: "IHC 2+ unselected / IO-suppressed / liver-metastatic",
  responderVector: RESPONDER_VECTOR,
  nonResponderVector: NON_RESPONDER_VECTOR,
  trialVector: TRIAL_VECTOR,
  cosineResponder: -1,
  cosineITT: -1,
  deltaImpact: 'gated',
  vectorFlags: [],
  scores: [
    { label: 'Alignment score', value: 'gated', subtext: 'Under canon review', color: 'cyan' },
    { label: 'Published readout', value: "FAILED \u2014 PFS HR=1.14", subtext: 'Public source', color: 'rose' },
    { label: 'Framework tier', value: "Prospective decode (exte", subtext: '', color: 'cyan' },
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
  gatesSummary: "1/3 \u2014 ITT failed; \u226580% subgroup signal is post-hoc only",
  biologySummary: "CARMEN-LC03 enrolled 389 patients at IHC \u226550% without cCEA or liver-met stratification. ITT failed. cCEA \u2265100 \u00b5g/L ORR 41.7% vs 8.1% is from NSCLC Phase 1/2 (PMC12720031). CRC application is by inference. The two-gate rescue architecture targets franchise survival, not ITT replication.",
  biologyCascade: [
    "CARMEN-LC03 ITT: PFS HR=1.14 \u2014 trial terminated Dec 21 2023 (n=389)",
    "\u2192 50\u201379% expressors: PFS HR=1.38 \u2014 numerically harmful subpopulation",
    "\u2192 \u226580% expressors: OS HR=0.71 \u2014 post-hoc exploratory (WCLC 2024)",
    "\u2192 \u03c1=0.43 (NSCLC, n=92): IHC and cCEA measure different features",
    "\u2192 cCEA \u2265100 \u00b5g/L: ORR 41.7% vs 8.1% (NSCLC Phase 1/2 only)",
    "\u2192 Liver-met Pint=0.02 (CO.26): PFS HR=1.39 with LM vs 0.54 without",
    "\u2192 Two-gate rescue architecture targets franchise survival, not ITT replication",
  ],
  playbook: [
    { title: "Two-Layer decode", desc: "Layer 1: CEACAM5 is a real target. Layer 2: the enrolled \u226550% gate was too permissive." },
    { title: "\u03c1-correction (candidate)", desc: "cCEA \u2265100 \u00b5g/L is a candidate liquid biopsy proxy for IHC \u226580% \u2014 validated only in NSCLC." },
    { title: "Liver-split evidence", desc: "MSS mCRC IO benefit is stratified by liver-metastasis status (CO.26 Pint=0.02)." },
    { title: "Franchise asset survival", desc: "Rescue framework preserves franchise value across next-generation CEACAM5 programs." },
  ],
  artifacts: ARTIFACTS,
  commercial: {
    targetPopulation: "46,750",
    populationUnit: "MSS mCRC US / Yr",
    annualSavings: "$80M\u2013$280M",
    savingsUnit: "Franchise value protected",
    closingStatement: "Asset survival architecture for next-generation CEACAM5 programs. Fix the gate before class-wide failure.",
  },
  diagnosticLog: [
    { time: '', message: 'Diagnostic detail is gated pending canon reconciliation.', level: 'info' },
  ],
  oneLiner: "CEACAM5 is a real target. CARMEN-LC03 failed because IHC \u226550% enrolled patients who could not respond. The two-gate framework (higher IHC threshold + IO permissiveness) is the candidate rescue architecture for next-generation programs.",
  validationTier: "Prospective decode (external-safe)",
  validationStrength: "Two-Layer decode published for the CEACAM5 franchise",
};
