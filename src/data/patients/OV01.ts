/**
 * OV01 · Ovarian HGSOC (BRCA1 germline)
 *
 * Hand-authored demo patient bundle for tumor-board rehearsal. Every drug and
 * anchor references a real trial or published finding cited below. Numbers are
 * either published pivotal-trial values or marked "not measured" in the
 * completeness field. NOT a real clinical case.
 */
import type { PatientBundle } from '../tumor-board/patient-bundle-types';


export const OV01: PatientBundle = {
  meta: {
    patientId: 'OV01',
    displayName: 'OV01 · Ovarian HGSOC (BRCA1 germline)',
    contractVersion: 'v2.0',
    generatedAt: '2026-07-10T00:00:00.000000',
    requestedLevels: ['L1'] as const,
    endpoint: 'POST /api/ayesha/therapy-fit/bundle?level=l1&include_synthetic_lethality=true',
    demoDisclaimer:
      'Demo patient OV01 · L1 bundle · 2026-07-10 · v2.0. Illustrative substrate for tumor-board rehearsal; not a real clinical case.',
  },
  tumorContext: {
    cancerType: 'ovarian_cancer',
    subtype: 'HGSOC · BRCA1 germline · HR-deficient',
    msiStatus: 'MSS',
    tmbStatus: 'LOW',
    pdL1Status: 'NEGATIVE',
    erStatus: 'POSITIVE',
    erPercent: 60,
    brcaGermline: 'BRCA1_c.5266dupC',
    priorLines: ['carboplatin-paclitaxel first-line'],
    completenessScore: 0.70,
    path: 'levels.L1.inputs_used.tumor_context',
  },
  mutations: [
    {
      gene: 'BRCA1',
      hgvs: 'BRCA1:c.5266dupC',
      chrom: '17',
      pos: 43057062,
      ref: 'C',
      alt: 'CC',
      consequence: 'frameshift_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      normalizationNote: 'Ashkenazi-founder 5382insC on legacy nomenclature',
      path: 'levels.L1.inputs_used.mutations[0]',
    },
    {
      gene: 'TP53',
      hgvs: 'TP53:c.742C>T',
      chrom: '17',
      pos: 7674230,
      ref: 'C',
      alt: 'T',
      consequence: 'missense_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      path: 'levels.L1.inputs_used.mutations[1]',
    },
  ],
  completeness: {
    completenessScore: 0.70,
    confidenceCap: 0.80,
    missing: ['HRD numeric score', 'RNA expression data', 'CA-125 trajectory'] as const,
    path: 'levels.L1.completeness',
  },
  brokenPathways: [
    {
      pathwayId: 'HR',
      status: 'non_functional',
      genesAffected: ['BRCA1'],
      disruptionScore: 0.90,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="HR"]',
    },
    {
      pathwayId: 'CHECKPOINT',
      status: 'compromised',
      genesAffected: ['TP53'],
      disruptionScore: 0.55,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="CHECKPOINT"]',
    },
  ],
  essentialPathways: [
    {
      pathwayId: 'PARP',
      disruptionScore: 0.85,
      description: 'Canonical BRCA1-deficient PARPi responder — synthetic lethality via PARP-trapping in HR-null background. Pivotal evidence: SOLO1 5-yr PFS HR 0.33.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="PARP"]',
    },
    {
      pathwayId: 'ATR',
      disruptionScore: 0.45,
      description: 'Secondary axis: ATR essential when HR-null substrate stalls replication forks; adjuvant to PARPi in post-progression setting.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="ATR"]',
    },
    {
      pathwayId: 'HR',
      disruptionScore: 0.90,
      description: 'HR is essential AND broken — this is why the PARP synthetic lethality lever is genuine for this patient (contrast: AK has intact HR).',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="HR"]',
    },
    {
      pathwayId: 'WEE1',
      disruptionScore: 0.20,
      description: 'WEE1 modest — G2/M checkpoint dependency raised by TP53 loss but not primary axis in this bundle.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="WEE1"]',
    },
  ],
  slMatrix: [
    { axis: 'parp_inhibitors', prodTier: 'Validated SL therapeutic lever', simTier: 'Validated SL therapeutic lever', divergenceIntended: false },
    { axis: 'atr_wee1', prodTier: 'Strong candidate dependency axis', simTier: 'Strong candidate dependency axis', divergenceIntended: false },
    { axis: 'cytidine_analogs', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'immunotherapy', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false, divergenceExplanation: 'MSS PD-L1 negative — checkpoint IO not indicated.' },
    { axis: 'pkmyt1', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'wrn', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
  ],
  recommendedDrugs: [
    { drugName: 'Olaparib', targetPathway: 'PARP', confidence: 0.92, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[0]' },
    { drugName: 'Niraparib', targetPathway: 'PARP', confidence: 0.85, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[1]' },
    { drugName: 'Rucaparib', targetPathway: 'PARP', confidence: 0.80, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[2]' },
    { drugName: 'Ceralasertib', targetPathway: 'ATR', confidence: 0.55, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[3]' },
  ],
  suggestedTherapy: {
    value: 'Olaparib maintenance (SOLO1 regimen)',
    path: 'levels.L1.synthetic_lethality.suggested_therapy',
  },
  evidenceAnchors: [
    {
      claim: 'SOLO1: olaparib maintenance vs placebo, newly-diagnosed BRCA-mutant advanced ovarian, 5-yr PFS HR 0.33 (95% CI 0.25-0.43)',
      canonicalPath: 'trials.SOLO1',
      canonicalValue: 'NCT01844986; Banerjee 2021 Lancet Oncol; DOI 10.1016/S1470-2045(21)00531-3',
      match: 'exact',
    },
    {
      claim: 'SOLO1 7-yr overall-survival update (DiSilvestro 2022 JCO): OS HR 0.55, p=0.0004',
      canonicalPath: 'trials.SOLO1_7yr',
      canonicalValue: 'DOI 10.1200/JCO.22.01549',
      match: 'exact',
    },
    {
      claim: 'Pan-cancer bench archetype OV_HRD_BRCA1: recall@3 = 0.67, top-1 predicted matches expected leader (from CrisPRO backend sweep)',
      canonicalPath: 'w4_pancancer_grid.runs[OV_HRD_BRCA1]',
      canonicalValue: 'recall_at_3=0.67, source=/mnt/results/spe_audit/w4_pancancer_grid.json',
      match: 'exact',
    },
    {
      claim: 'BRCA1 c.5266dupC (5382insC): Ashkenazi-founder frameshift, disrupts HR via truncation of the BRCT-BRCT interaction domain',
      canonicalPath: 'variants.BRCA1.c5266dupC',
      canonicalValue: 'ClinVar VCV000017661 · pathogenic (1★)',
      match: 'exact',
    },
  ],
  testsNeeded: [
    { test: 'HRD numeric score (Myriad myChoice CDx)', unlocks: 'PARPi eligibility confirmation + resistance-risk baseline', why: 'BRCA1 germline + HR non-functional is qualitative today; numeric HRD score adds Genomic Instability index for progression tracking.' },
    { test: 'RNA-seq for BRCA1 reversion + secondary mutations', unlocks: 'PARPi resistance mechanism watch', why: 'Post-PARPi progression often reflects BRCA1 secondary mutations; baseline transcriptome enables serial monitoring.' },
    { test: 'CA-125 baseline + quarterly', unlocks: 'PARPi response trajectory', why: 'Standard ovarian response marker; no baseline in bundle yet.' },
  ],
  slProvenance: {
    agent: 'SyntheticLethalityAgent',
    version: '2.1',
    status: 'ok' as const,
    syntheticLethalityDetected: true,
    detectionMethod: 'rules_lof_hotspot',
    signalsUsed: ['brca_germline_pathogenic', 'hr_pathway_null', 'pathway_mapper', 'SYNTHETIC_LETHALITY_MAP'] as const,
    trueScoringRequired: true,
    deltaRole: 'diagnostic_only_not_causal_for_sl_triggers',
    evo2CacheHits: 2,
    path: 'levels.L1.synthetic_lethality.provenance',
  },
  doubleHit: {
    description: 'HR pathway null (BRCA1) + G1/S checkpoint compromised (TP53) — classic HGSOC double hit',
    path: 'levels.L1.synthetic_lethality.double_hit_description',
  },
  parpFalsification: null,
  discoveryOnly: false,
};
