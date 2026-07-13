/**
 * AK L1 tumor-board bundle — verbatim substrate from
 * https://github.com/fjkiani/crispro/blob/main/Tumor-Board/TUMOR_BOARD_PACKET__BUNDLE_ONLY.md
 * and the credential-free audit walkthrough (evidence chain SHA d33f6403).
 *
 * Every field carries its canonical JSON path so the UI can display provenance.
 * AK is the demo patient the audit repo already uses; this module labels every
 * surface accordingly so it is never confused with a real clinical case.
 *
 * DO NOT modify values here without a matching audit-repo change. This is the
 * frontend mirror of the backend bundle, not a re-derivation.
 */
export const AK_BUNDLE_META = {
  patientId: 'AK',
  contractVersion: 'v2.0',
  generatedAt: '2026-02-12T16:51:53.836997',
  requestedLevels: ['L1'] as const,
  endpoint: 'POST /api/ayesha/therapy-fit/bundle?level=l1&include_synthetic_lethality=true',
  demoDisclaimer:
    'Demo patient AK · L1 bundle · 2026-02-12 · v2.0. Illustrative substrate for tumor-board rehearsal; not a real clinical case.',
} as const;

export type Mutation = {
  gene: string;
  hgvs: string;
  chrom: string | null;
  pos: number | null;
  ref: string | null;
  alt: string | null;
  consequence: string;
  assembly: string | null;
  scoredByEvo2: boolean;
  normalizationNote?: string;
  path: string;
};

export const AK_MUTATIONS: Mutation[] = [
  {
    gene: 'MBD4',
    hgvs: 'MBD4:c.1293delA',
    chrom: '3',
    pos: 129433949,
    ref: 'AT',
    alt: 'A',
    consequence: 'frameshift_variant',
    assembly: 'GRCh38',
    scoredByEvo2: true,
    normalizationNote: 'left_pad_deletion — original AT→A normalized for indel VCF form',
    path: 'levels.L1.inputs_used.mutations[0]',
  },
  {
    gene: 'PDGFRA',
    hgvs: 'PDGFRA:c.2263T>C',
    chrom: '4',
    pos: 54280422,
    ref: 'T',
    alt: 'C',
    consequence: 'missense_variant',
    assembly: 'GRCh38',
    scoredByEvo2: true,
    path: 'levels.L1.inputs_used.mutations[1]',
  },
  {
    gene: 'TP53',
    hgvs: 'TP53 R175H',
    chrom: '17',
    pos: 7577120,
    ref: 'G',
    alt: 'A',
    consequence: 'missense_variant (R175H)',
    assembly: 'GRCh38',
    scoredByEvo2: true,
    path: 'levels.L1.inputs_used.mutations[2]',
  },
];

export const AK_TUMOR_CONTEXT = {
  msiStatus: 'MSS',
  pdL1Status: 'POSITIVE',
  pdL1Cps: 10,
  erStatus: 'WEAKLY_POSITIVE',
  erPercent: 50,
  completenessScore: 0.55,
  path: 'levels.L1.inputs_used.tumor_context',
} as const;

export const AK_COMPLETENESS = {
  completenessScore: 0.55,
  confidenceCap: 0.6,
  missing: ['HRD score', 'TMB score', 'RNA expression data', 'CA-125 lab values'] as const,
  path: 'levels.L1.completeness',
} as const;

export type BrokenPathway = {
  pathwayId: string;
  status: 'non_functional' | 'compromised' | 'functional';
  genesAffected: string[];
  disruptionScore: number;
  path: string;
};

export const AK_BROKEN_PATHWAYS: BrokenPathway[] = [
  {
    pathwayId: 'BER',
    status: 'non_functional',
    genesAffected: ['MBD4'],
    disruptionScore: 0.654,
    path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="BER"]',
  },
  {
    pathwayId: 'CHECKPOINT',
    status: 'compromised',
    genesAffected: ['TP53'],
    disruptionScore: 0.55,
    path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="CHECKPOINT"]',
  },
  {
    pathwayId: 'UNKNOWN',
    status: 'functional',
    genesAffected: ['PDGFRA'],
    disruptionScore: 0.35,
    path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="UNKNOWN"]',
  },
];

export type EssentialPathway = {
  pathwayId: string;
  disruptionScore: number;
  description: string;
  path: string;
};

export const AK_ESSENTIAL_PATHWAYS: EssentialPathway[] = [
  {
    pathwayId: 'ATR',
    disruptionScore: 0.15,
    description: 'DepMap lineage grounding for BER-loss context (+0.15 confidence boost). ATR essentiality rises when unrepaired BER substrate stalls replication forks.',
    path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="ATR"]',
  },
  {
    pathwayId: 'WEE1',
    disruptionScore: 0.15,
    description: 'DepMap lineage grounding for CHECKPOINT-compromised context (+0.15 confidence boost). WEE1 loss removes remaining G2/M brake when p53 is absent.',
    path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="WEE1"]',
  },
  {
    pathwayId: 'HR',
    disruptionScore: 0.0,
    description: 'Homologous recombination not scored as essential in this bundle (0.0 disruption dependency signal).',
    path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="HR"]',
  },
  {
    pathwayId: 'PARP',
    disruptionScore: 0.0,
    description: 'PARP not scored as essential in this bundle (0.0). Falsification arm rules out PARP-trapping mechanism (see PARP1 in MBD4-LOF, p=0.605).',
    path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="PARP"]',
  },
];

export type RecommendedDrug = {
  drugName: string;
  targetPathway: string;
  confidence: number;
  falsified: boolean;
  falsifiedReason?: string;
  path: string;
};

export const AK_RECOMMENDED_DRUGS: RecommendedDrug[] = [
  {
    drugName: 'Ceralasertib',
    targetPathway: 'ATR',
    confidence: 0.85,
    falsified: false,
    path: 'levels.L1.synthetic_lethality.recommended_drugs[0]',
  },
  {
    drugName: 'Adavosertib',
    targetPathway: 'WEE1',
    confidence: 0.85,
    falsified: false,
    path: 'levels.L1.synthetic_lethality.recommended_drugs[1]',
  },
  {
    drugName: 'Olaparib',
    targetPathway: 'PARP',
    confidence: 0.7,
    falsified: true,
    falsifiedReason:
      'Post-PR#11 demotion: PARP1 expression in MBD4-LOF p=0.605 (n=19 vs 1498) — mechanism ruled out. Positive control ρ=-0.42 p=1.4e-21 confirms pan-cancer PARP1↔PARPi correlation that MBD4-LOF lines do not share.',
    path: 'levels.L1.synthetic_lethality.recommended_drugs[2]',
  },
  {
    drugName: 'Niraparib',
    targetPathway: 'PARP',
    confidence: 0.7,
    falsified: true,
    falsifiedReason:
      'Post-PR#11 demotion: PARP1 expression in MBD4-LOF p=0.605 (n=19 vs 1498) — mechanism ruled out. Positive control ρ=-0.42 p=1.4e-21 confirms pan-cancer PARP1↔PARPi correlation that MBD4-LOF lines do not share.',
    path: 'levels.L1.synthetic_lethality.recommended_drugs[3]',
  },
  {
    drugName: 'Rucaparib',
    targetPathway: 'PARP',
    confidence: 0.7,
    falsified: true,
    falsifiedReason:
      'Post-PR#11 demotion: PARP1 expression in MBD4-LOF p=0.605 (n=19 vs 1498) — mechanism ruled out. Positive control ρ=-0.42 p=1.4e-21 confirms pan-cancer PARP1↔PARPi correlation that MBD4-LOF lines do not share.',
    path: 'levels.L1.synthetic_lethality.recommended_drugs[4]',
  },
];

export const AK_SUGGESTED_THERAPY = {
  value: 'Ceralasertib',
  path: 'levels.L1.synthetic_lethality.suggested_therapy',
} as const;

/**
 * 6-axis SL evidence matrix. Prod tier is what AK's frontend renders today.
 * Sim tier is what PR#11 would ship. The atr_wee1 divergence is intentional.
 */
export type SLAxisRow = {
  axis: string;
  prodTier: string;
  simTier: string;
  manuscriptClaimType?: string;
  divergenceIntended: boolean;
  divergenceExplanation?: string;
};

export const AK_SL_MATRIX: SLAxisRow[] = [
  {
    axis: 'cytidine_analogs',
    prodTier: 'Validated SL therapeutic lever',
    simTier: 'Validated SL therapeutic lever',
    divergenceIntended: false,
  },
  {
    axis: 'atr_wee1',
    prodTier: 'Mechanistic candidate only',
    simTier: 'Strong candidate dependency axis',
    manuscriptClaimType: 'primary_new_candidate_axis',
    divergenceIntended: true,
    divergenceExplanation:
      'PR#11 adds manuscript_claim_type enum; fusion rule upgrades atr_wee1 from fallback branch to strong-evidence branch (n=14 LOF, ceralasertib LN_IC50 p=0.021 d=-0.50, stratified TP53-mut p=0.003 d=-0.74).',
  },
  {
    axis: 'parp_inhibitors',
    prodTier: 'Mechanistic candidate only',
    simTier: 'Mechanistic candidate only',
    manuscriptClaimType: 'falsified_mechanism',
    divergenceIntended: false,
    divergenceExplanation:
      'Same tier prod & sim, but PR#11 flags this row falsified_mechanism so the bridge demotes it from recommended_drugs (see PARP falsification arc).',
  },
  {
    axis: 'immunotherapy',
    prodTier: 'Mechanistic candidate only',
    simTier: 'Mechanistic candidate only',
    divergenceIntended: false,
  },
  {
    axis: 'pkmyt1',
    prodTier: 'Not supported / negative',
    simTier: 'Not supported / negative',
    divergenceIntended: false,
  },
  {
    axis: 'wrn',
    prodTier: 'Not supported / negative',
    simTier: 'Not supported / negative',
    divergenceIntended: false,
  },
];

/**
 * 6 numeric anchors verified against tumor_board_evidence_chain.json (SHA d33f6403).
 * All match; the 3 earlier "false negatives" were rounding — script formats
 * Cohen's d to 2dp, canonical stores 4dp+.
 */
export type EvidenceAnchor = {
  claim: string;
  canonicalPath: string;
  canonicalValue: string;
  scriptValue?: string;
  match: 'exact' | 'rounded' | 'positive_control';
};

export const AK_EVIDENCE_ANCHORS: EvidenceAnchor[] = [
  {
    claim: 'Primary screen: ceralasertib LN_IC50, MBD4-LOF vs WT',
    canonicalPath: 'primary_endpoint.ln_ic50',
    canonicalValue: 'p=0.0214845, d=-0.5033, n_lof=14, n_wt=914',
    scriptValue: 'p=0.021, d=-0.50, n=14 vs 914',
    match: 'rounded',
  },
  {
    claim: 'TP53-mut stratification, LN_IC50',
    canonicalPath: 'stress_tests.2_tp53_stratification.result.ln_ic50',
    canonicalValue: 'p=0.003003, d=-0.7405',
    scriptValue: 'p=0.003, d=-0.74',
    match: 'rounded',
  },
  {
    claim: 'TP53-mut stratification, AUC',
    canonicalPath: 'stress_tests.2_tp53_stratification.result.auc',
    canonicalValue: 'p=0.0008734, d=-0.8888',
    scriptValue: 'p=0.000873, d=-0.89',
    match: 'rounded',
  },
  {
    claim: 'MSI-purge stress test, LN_IC50',
    canonicalPath: 'stress_tests.1_msi_purge',
    canonicalValue: 'p=0.015329, d=-0.6227',
    scriptValue: 'p=0.015, d=-0.62',
    match: 'rounded',
  },
  {
    claim: 'PARP1 expression in MBD4-LOF (rules out PARP-trapping)',
    canonicalPath: 'falsification_arm.parp1_expression_in_mbd4_lof',
    canonicalValue: 'p=0.6047879, n=19 vs 1498',
    scriptValue: 'p=0.605, n=19 vs 1498',
    match: 'exact',
  },
  {
    claim: 'Pan-cancer PARP1↔PARPi (positive control)',
    canonicalPath: 'falsification_arm.pan_cancer_parp1_parpi_correlation',
    canonicalValue: 'ρ=-0.4164, p=1.36e-21, n=481',
    scriptValue: 'ρ=-0.42, p=1.4e-21, n=481',
    match: 'positive_control',
  },
];

export type TestNeeded = {
  test: string;
  unlocks: string;
  why: string;
};

export const AK_TESTS_NEEDED: TestNeeded[] = [
  {
    test: 'HRD assay (Myriad myChoice CDx or equivalent)',
    unlocks: 'HR pathway score + orthogonal genome-instability readout',
    why: 'HR pathway currently null; MBD4-LOF context motivates orthogonal HR-status readout independent of the PARP1 falsification. PARPi eligibility remains ruled out on mechanism (p=0.605).',
  },
  {
    test: 'Comprehensive genomic profiling for TMB',
    unlocks: 'Immunotherapy tier + hypermutator clock estimate',
    why: 'PD-L1 CPS=10 without TMB is a partial IO story; MBD4-LOF predicts CpG→TpG driver mutagenesis.',
  },
  {
    test: 'RNA sequencing / transcriptome',
    unlocks: 'Expression association tier + IO checkpoint receptivity',
    why: 'Bundle currently has no expression data — 2 of 4 evidence modalities blocked at INSUFFICIENT.',
  },
  {
    test: 'Serum CA-125 baseline',
    unlocks: 'Longitudinal treatment-response tracking',
    why: 'Ovarian context; baseline needed before ceralasertib/adavosertib treatment start.',
  },
];

export const AK_SL_PROVENANCE = {
  agent: 'SyntheticLethalityAgent',
  version: '2.1',
  status: 'ok' as const,
  syntheticLethalityDetected: true,
  detectionMethod: 'rules_lof_hotspot',
  signalsUsed: ['truncation', 'frameshift', 'hotspot', 'pathway_mapper', 'SYNTHETIC_LETHALITY_MAP'] as const,
  trueScoringRequired: true,
  deltaRole: 'diagnostic_only_not_causal_for_sl_triggers',
  evo2CacheHits: 1, // TP53 memory cache hit
  hgvsResolutionNote: 'MBD4 indel required left_pad_deletion normalization before Evo2 scoring',
  path: 'levels.L1.synthetic_lethality.provenance',
} as const;

export const AK_DOUBLE_HIT = {
  description: 'Base Excision Repair pathway loss',
  path: 'levels.L1.synthetic_lethality.double_hit_description',
} as const;

/**
 * The user-visible bug PR#11 fixes. Prod ships the PARP combo as a
 * recommended_drug because bridge policy passes any matrix row with a
 * positive tier through — regardless of whether the manuscript already
 * falsified the mechanism. PR#11 adds manuscript_claim_type='falsified_mechanism'
 * so the bridge can demote the row.
 */
export const AK_PARP_FALSIFICATION = {
  prodShipsToday: {
    drugName: 'PARP Inhibitors (olaparib, niraparib, talazoparib, rucaparib)',
    matrixAxis: 'parp_inhibitors',
    tier: 'Mechanistic candidate only',
    bridgePolicy: 'eligible_matrix_positive_tier',
    behavior: 'Bridge passes this row through to recommended_drugs → PARP inhibitors surface as recommended for AK.',
  },
  manuscriptSays: {
    finding: 'PARP1 expression in MBD4-LOF cell lines',
    stat: 'p=0.6047879, n=19 vs 1498',
    conclusion: 'MBD4-LOF does not upregulate PARP1 — the mechanistic prerequisite for PARP-trapping is absent.',
    positiveControl: {
      finding: 'Pan-cancer PARP1↔PARPi correlation',
      stat: 'Spearman ρ=-0.4164, p=1.36e-21, n=481',
      point: 'The correlation exists at high N in the general pool; MBD4-LOF lines specifically do not share it.',
    },
  },
  pr11Fix: {
    field: 'manuscript_claim_type',
    value: 'falsified_mechanism',
    effect: 'All three PARPi rows (Olaparib, Niraparib, Rucaparib) ship with falsified:true + falsifiedReason so the tumor-board UI shows the mechanism-ruled-out audit trail rather than hiding the row.',
    rowKept: 'Row remains in evidence_matrix.rows for auditability; recommended_drugs entries stay visible but flagged.',
  },
} as const;

// ---------- AK01 assembled PatientBundle (used by generic patient loader) ----------

import type { PatientBundle } from './patient-bundle-types';

// Widen the AK_TUMOR_CONTEXT literal to the generic TumorContext by adding
// the cancerType field (implicit for AK — HGSOC MBD4-LOF hypermutator).
const AK01_TUMOR_CONTEXT = {
  cancerType: 'ovarian_cancer',
  subtype: 'HGSOC · MBD4-LOF hypermutator (demo)',
  msiStatus: AK_TUMOR_CONTEXT.msiStatus,
  pdL1Status: AK_TUMOR_CONTEXT.pdL1Status,
  pdL1Cps: AK_TUMOR_CONTEXT.pdL1Cps,
  erStatus: AK_TUMOR_CONTEXT.erStatus,
  erPercent: AK_TUMOR_CONTEXT.erPercent,
  completenessScore: AK_TUMOR_CONTEXT.completenessScore,
  path: AK_TUMOR_CONTEXT.path,
};

export const AK01: PatientBundle = {
  meta: {
    patientId: AK_BUNDLE_META.patientId,
    displayName: 'AK · Ovarian (MBD4-LOF)',
    contractVersion: AK_BUNDLE_META.contractVersion,
    generatedAt: AK_BUNDLE_META.generatedAt,
    requestedLevels: AK_BUNDLE_META.requestedLevels,
    endpoint: AK_BUNDLE_META.endpoint,
    demoDisclaimer: AK_BUNDLE_META.demoDisclaimer,
  },
  tumorContext: AK01_TUMOR_CONTEXT,
  mutations: AK_MUTATIONS,
  completeness: {
    completenessScore: AK_COMPLETENESS.completenessScore,
    confidenceCap: AK_COMPLETENESS.confidenceCap,
    missing: AK_COMPLETENESS.missing,
    path: AK_COMPLETENESS.path,
  },
  brokenPathways: AK_BROKEN_PATHWAYS,
  essentialPathways: AK_ESSENTIAL_PATHWAYS,
  slMatrix: AK_SL_MATRIX,
  recommendedDrugs: AK_RECOMMENDED_DRUGS,
  suggestedTherapy: AK_SUGGESTED_THERAPY,
  evidenceAnchors: AK_EVIDENCE_ANCHORS,
  testsNeeded: AK_TESTS_NEEDED,
  slProvenance: AK_SL_PROVENANCE,
  doubleHit: AK_DOUBLE_HIT,
  parpFalsification: AK_PARP_FALSIFICATION,
  discoveryOnly: false,
};
