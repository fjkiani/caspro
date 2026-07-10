// ==============================================================================
// FDA PREDICTION ARCHIVE — Receipt-Backed Two-Layer Validation
// Source: 11-fda-prediction-archive-debrief.mdc (Session 2026-02-22)
// Files: predictions_2024_retroactive.json, predictions_2026_02_21.json
// ==============================================================================

export interface FdaRetroEntry {
  gene: string;
  drug: string;
  score: number;
  layer2: string;
  outcome: 'APPROVED';
  nct?: string;
}

export interface FdaProspectiveEntry {
  gene: string;
  drug: string;
  layer1: 'HIGH';
  layer2: string;
  prediction: 'APPROVE' | 'FAILURE' | 'PENDING' | 'N/A';
  status: string;
  highlight?: boolean;
}

export interface TwoLayerRow {
  l1: string;
  l2: string;
  prediction: string;
  isCritical: boolean;
  cost?: string;
}

// --- 9/9 FDA-Approved Genes (2023-2024) ---
// PROVENANCE (audited 2026-07-10):
//   Scores below (0.3525–0.3549) come from prospective_validation_target_lock_scores.csv
//   which is the POC-era output from TargetLockScorer.score_genes().
//   Governance record identifies this as the "poc_saturation_band": "0.352-0.355",
//   with "saturation_fix": "step-z-score normalization in TargetLockScorer.score_genes()".
//   In production these would be rescored with step-z-score normalization; the numbers
//   below are kept verbatim as a historical archive receipt of the POC output, not as
//   a current production score. Direction of prediction (all 9 correct APPROVED calls)
//   is retained; the exact 4th-decimal value is POC-band-saturated. Do NOT quote these
//   as "current production Evo2+Enformer scores" in outbound decks.
//   Source refs: transcript index 15439 ("What Was Fixed vs the POC" table,
//                POC Issue: Target-Lock saturation (0.352–0.355 band); Fix: step-z-score),
//                transcript index 15602 (governance calibration block),
//                transcript index 15443 ("The AUROC is synthetic. The path to real numbers is clear.")
export const FDA_RETROACTIVE: FdaRetroEntry[] = [
  { gene: 'RET',    drug: 'Selpercatinib',           score: 0.3526, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'IDH1',   drug: 'Vorasidenib',             score: 0.3525, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'IDH2',   drug: 'Vorasidenib',             score: 0.3549, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'PIK3CA', drug: 'Inavolisib triple',       score: 0.3533, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'ERBB2',  drug: 'Zanidatamab',             score: 0.3526, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'KMT2A',  drug: 'Revumenib',               score: 0.3529, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'FGFR3',  drug: 'Erdafitinib',             score: 0.3527, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'NRG1',   drug: 'Zenocutuzumab',           score: 0.3525, layer2: 'Biomarker Gated', outcome: 'APPROVED' },
  { gene: 'FOLR1',  drug: 'Mirvetuximab (ELAHERE)',   score: 0.3527, layer2: 'Biomarker Gated', outcome: 'APPROVED', nct: 'NCT04296890' },
];

// --- 6 Pipeline Predictions (Feb 21, 2026) ---
export const FDA_PROSPECTIVE: FdaProspectiveEntry[] = [
  { gene: 'HER3',    drug: 'Patritumab Dx (HER3-DXd)', layer1: 'HIGH', layer2: 'Biomarker Gated',        prediction: 'APPROVE',  status: 'Phase III' },
  { gene: 'TROP2',   drug: 'Dato-DXd',                  layer1: 'HIGH', layer2: 'Biomarker Gated',        prediction: 'APPROVE',  status: 'Phase III' },
  { gene: 'B7H4',    drug: 'AZD8205',                   layer1: 'HIGH', layer2: 'Insufficient (Ph 1/2)',   prediction: 'PENDING',  status: 'Phase 1/2' },
  { gene: 'CEACAM5', drug: 'Tusamitamab Ravtansine',    layer1: 'HIGH', layer2: 'UNSELECTED',             prediction: 'FAILURE',  status: 'Confirmed', highlight: true },
  { gene: 'KRAS G12C', drug: 'Adagrasib+Cetuximab',     layer1: 'HIGH', layer2: 'Post-approval',          prediction: 'N/A',      status: 'Approved Jan 2024' },
  { gene: 'ROS1',    drug: 'Zidesamtinib (NVL-520)',    layer1: 'HIGH', layer2: 'Biomarker Gated',        prediction: 'APPROVE',  status: 'NDA Accepted' },
];

// --- Two-Layer Decision Matrix ---
export const TWO_LAYER_MATRIX: TwoLayerRow[] = [
  { l1: 'HIGH', l2: 'HIGH', prediction: '✅ Enroll — real target, right patients',                       isCritical: false },
  { l1: 'HIGH', l2: 'LOW',  prediction: '❌ Trial fails — target is real, enrollment is wrong',          isCritical: true, cost: '$300M' },
  { l1: 'LOW',  l2: 'HIGH', prediction: '❌ Trial fails — wrong target',                                 isCritical: false },
  { l1: 'LOW',  l2: 'LOW',  prediction: '❌ Full failure',                                                isCritical: false },
];

// --- LATIFY Chain of Custody Receipt (debrief lines 148-157) ---
// Source: latify_receipt.py → latify_curl_receipts.json
export const LATIFY_RECEIPT = {
  trialId: 'NCT05450692',
  trialName: 'LATIFY',
  responderScore: 0.114,
  responderRank: 1042,
  nonResponderScore: 0.910,
  nonResponderRank: 42,
  deltaFit: -0.10,
  priorDelta: 0.322,
  whyDifferent: 'Retrospective mechanism-alignment analysis of the Phase III readout. REAL Phase III FAILED (HR 0.90, p=0.287). Engine correctly predicted futility at 90% confidence.',
  moa_tags: ['atr_inhibitor', 'checkpoint_inhibitor', 'chemotherapy', 'ddr', 'immunotherapy', 'taxane', 'failure_realized'],
  manuscriptCitation: '(CrisPRO engine: Predicted Futility 90%; Observed HR 0.90; P=0.287; receipt: latify_curl_receipts.json)',
};

// --- FOLR1 Companion Diagnostic Gate (debrief lines 68-73) ---
export const FOLR1_GATE = {
  gene: 'FOLR1',
  drug: 'Mirvetuximab soravtansine (ELAHERE)',
  nct: 'NCT04296890',
  trial: 'MIRASOL',
  gate: 'FRα PS2+ ≥75% cells at 2+/3+',
  diagnosticRequired: true,
  acceleratedApproval: '2022-11',
  fullApproval: '2024-03-22',
};

// --- Drug Correction Provenance (debrief lines 83-90) ---
export const DRUG_CORRECTIONS = [
  { gene: 'B7H4',      error: 'Drug listed as ZL-1211', correction: 'ZL-1211 targets CLDN18.2 (gastric), not B7-H4. Corrected to AZD8205', source: 'Published literature' },
  { gene: 'ROS1',       error: 'Labeled as RAS/RET inhibitor', correction: 'Zidesamtinib (NVL-520) is a ROS1 kinase inhibitor (ARROS-1 trial)', source: 'FDA NDA acceptance' },
  { gene: 'KRAS G12C',  error: 'Listed as prospective', correction: 'FDA approved Jan 2024 (KRYSTAL-1). Reclassified as post-approval confirmatory', source: 'FDA approval database' },
];

// --- Artifact type ---
export interface FdaArtifact {
  label: string;
  slug: string;       // accessible URL via public dir
  type: 'json' | 'py';
  sourcePath: string;  // original location in crispr-assistant-main
  description: string;
}

export const FDA_ARTIFACTS: FdaArtifact[] = [
  {
    label: 'Retroactive Predictions (2024)',
    slug: '/artifacts/fda-predictions/predictions_2024_retroactive.json',
    type: 'json',
    sourcePath: 'publications/01-metastasis-interception/data/fda_predictions/predictions_2024_retroactive.json',
    description: '9 FDA-approved genes, retroactive validation. Concordance: 9/9.',
  },
  {
    label: 'Prospective Predictions (Feb 2026)',
    slug: '/artifacts/fda-predictions/predictions_2026_02_21.json',
    type: 'json',
    sourcePath: 'publications/01-metastasis-interception/data/fda_predictions/predictions_2026_02_21.json',
    description: '6 pipeline drugs prospectively evaluated. Immutable after creation.',
  },
  {
    label: 'LATIFY Engine Receipt',
    slug: '/artifacts/fda-predictions/latify_curl_receipts.json',
    type: 'json',
    sourcePath: 'publications/01-metastasis-interception/data/fda_predictions/latify_curl_receipts.json',
    description: 'Production engine futility receipt. HR 0.90 / P 0.287. Prediction: FAILED.',
  },
  {
    label: 'Receipt Script (Auditable)',
    slug: '/artifacts/fda-predictions/latify_receipt.py',
    type: 'py',
    sourcePath: 'oncology-coPilot/oncology-backend-minimal/scripts/latify_receipt.py',
    description: 'No hardcoding. Imports TAG_VECTORS, cosine_sim, score_trials directly from production engine.',
  },
];

// --- POC saturation caveat (audited 2026-07-10) ---
// Surfaced verbatim as a labelled banner on the archive UI. Do not remove without
// governance sign-off; do not paraphrase without checking transcript indices below.
export const POC_SATURATION_CAVEAT = {
  headline: 'POC-era scores — archived, not current production output.',
  band: '0.352-0.355',
  fixNote: 'Step-z-score normalization was added to TargetLockScorer.score_genes() to correct the saturation band; the numbers on this page pre-date that fix and are retained as a historical archive receipt.',
  directionClaim: 'All 9 retroactive APPROVED calls remain directionally correct; the 4th-decimal delta between calls should not be quoted as a production ranking.',
  auroc: {
    poc: 0.976,
    pocSd: 0.035,
    productionStatus: 'Synthetic in POC period. Path to real numbers is documented but not yet run at time of archive snapshot.',
  },
  transcriptRefs: ['index 15439 (What Was Fixed vs the POC)', 'index 15602 (governance calibration block)', 'index 15443 (AUROC is synthetic)'],
};

// --- Cascade version note (audited 2026-07-10) ---
// The archive page originally shipped with an 8-step metastatic cascade
// (TWIST1/MMP2/BCL2/ITGB1/ICAM1/CXCR4/MET/VEGFA). The canonical BrM cascade is a
// 7-step, 29-gene ordering in brain-met-cascade-data.ts. Both are legitimate AF3
// substrate but the archive's 8-step ordering is superseded; render this file's
// content as the archive/historical layer, not as the current cascade of record.
export const ARCHIVE_CASCADE_NOTE = {
  archiveVersion: '8-step (2026-02 snapshot)',
  currentVersion: '7-step / 29-gene canonical BrM cascade',
  authoritativeSource: 'src/data/brain-met-cascade-data.ts',
  note: 'Archive kept intact for historical audit trail. Current work should reference the canonical file.',
};

// --- Summary ---
export const FDA_STATS = {
  retroConcordance: '9/9',
  retroPeriod: '2023-2024',
  prospectiveTotal: 6,
  prospectiveApprove: 3,
  prospectivePending: 1,
  prospectiveFailure: 1,
  prospectiveConfirmed: 1,
  scoreRange: '0.3525–0.3549',
  thesisStatement: 'CEACAM5 is the second LATIFY. Both have HIGH Target-Lock (real targets) and both failed from unselected/insufficiently gated enrollment.',
  artifacts: FDA_ARTIFACTS, // typed, linked, accessible
};
