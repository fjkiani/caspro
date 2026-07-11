/**
 * BR01 · TNBC (BRCA1 germline)
 *
 * Hand-authored demo patient bundle for tumor-board rehearsal. Every drug and
 * anchor references a real trial or published finding cited below. Numbers are
 * either published pivotal-trial values or marked "not measured" in the
 * completeness field. NOT a real clinical case.
 */
import type { PatientBundle } from '../tumor-board/patient-bundle-types';


export const BR01: PatientBundle = {
  meta: {
    patientId: 'BR01',
    displayName: 'BR01 · TNBC (BRCA1 germline)',
    contractVersion: 'v2.0',
    generatedAt: '2026-07-10T00:00:00.000000',
    requestedLevels: ['L1'] as const,
    endpoint: 'POST /api/ayesha/therapy-fit/bundle?level=l1&include_synthetic_lethality=true',
    demoDisclaimer:
      'Demo patient BR01 · L1 bundle · 2026-07-10 · v2.0. Illustrative substrate for tumor-board rehearsal; not a real clinical case.',
  },
  tumorContext: {
    cancerType: 'breast_cancer',
    subtype: 'TNBC · BRCA1 germline · residual disease post-neoadjuvant',
    msiStatus: 'MSS',
    tmbStatus: 'MODERATE',
    pdL1Status: 'NEGATIVE',
    erStatus: 'NEGATIVE',
    prStatus: 'NEGATIVE',
    her2Status: 'NEGATIVE',
    brcaGermline: 'BRCA1_c.68_69delAG',
    priorLines: ['dose-dense AC-T neoadjuvant', 'residual invasive disease at surgery'],
    completenessScore: 0.72,
    path: 'levels.L1.inputs_used.tumor_context',
  },
  mutations: [
    {
      gene: 'BRCA1',
      hgvs: 'BRCA1:c.68_69delAG',
      chrom: '17',
      pos: 43124027,
      ref: 'CAG',
      alt: 'C',
      consequence: 'frameshift_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      normalizationNote: '185delAG founder mutation (Ashkenazi Jewish; legacy nomenclature)',
      path: 'levels.L1.inputs_used.mutations[0]',
    },
    {
      gene: 'TP53',
      hgvs: 'TP53:c.844C>T',
      chrom: '17',
      pos: 7674921,
      ref: 'C',
      alt: 'T',
      consequence: 'missense_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      path: 'levels.L1.inputs_used.mutations[1]',
    },
  ],
  completeness: {
    completenessScore: 0.72,
    confidenceCap: 0.85,
    missing: ['TILs %', 'PD-L1 SP142 IC score', 'Residual cancer burden (RCB) exact stratification'] as const,
    path: 'levels.L1.completeness',
  },
  brokenPathways: [
    {
      pathwayId: 'HR',
      status: 'non_functional',
      genesAffected: ['BRCA1'],
      disruptionScore: 0.92,
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
      disruptionScore: 0.88,
      description: 'Adjuvant PARPi indicated per OlympiA — 3-yr iDFS 85.9% vs 77.1% placebo in gBRCA HER2-negative high-risk breast.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="PARP"]',
    },
    {
      pathwayId: 'ATR',
      disruptionScore: 0.40,
      description: 'ATR secondary axis in BRCA1-null background; less mature clinical data in breast than in ovarian.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="ATR"]',
    },
    {
      pathwayId: 'HR',
      disruptionScore: 0.92,
      description: 'HR is essential and broken → PARP-trapping SL is genuine. Same mechanism as OV01, TNBC anatomic site.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="HR"]',
    },
  ],
  slMatrix: [
    { axis: 'parp_inhibitors', prodTier: 'Validated SL therapeutic lever', simTier: 'Validated SL therapeutic lever', divergenceIntended: false },
    { axis: 'atr_wee1', prodTier: 'Mechanistic candidate only', simTier: 'Mechanistic candidate only', divergenceIntended: false },
    { axis: 'cytidine_analogs', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'immunotherapy', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false, divergenceExplanation: 'PD-L1 negative on SP142 — atezolizumab combo not indicated for this substrate.' },
    { axis: 'pkmyt1', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'wrn', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
  ],
  recommendedDrugs: [
    { drugName: 'Olaparib', targetPathway: 'PARP', confidence: 0.92, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[0]' },
    { drugName: 'Talazoparib', targetPathway: 'PARP', confidence: 0.85, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[1]' },
    { drugName: 'Veliparib', targetPathway: 'PARP', confidence: 0.65, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[2]' },
    { drugName: 'Ceralasertib', targetPathway: 'ATR', confidence: 0.45, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[3]' },
  ],
  suggestedTherapy: {
    value: 'Olaparib adjuvant (OlympiA regimen)',
    path: 'levels.L1.synthetic_lethality.suggested_therapy',
  },
  evidenceAnchors: [
    {
      claim: 'OlympiA: adjuvant olaparib in gBRCA1/2 HER2-neg high-risk breast — 3-yr iDFS 85.9% (olaparib) vs 77.1% (placebo), HR 0.58',
      canonicalPath: 'trials.OlympiA',
      canonicalValue: 'NCT02032823; Tutt 2021 NEJM; DOI 10.1056/NEJMoa2105215',
      match: 'exact',
    },
    {
      claim: 'EMBRACA: talazoparib vs physician-choice in advanced gBRCA1/2 breast — PFS 8.6 vs 5.6 mo, HR 0.54',
      canonicalPath: 'trials.EMBRACA',
      canonicalValue: 'NCT01945775; Litton 2018 NEJM; DOI 10.1056/NEJMoa1802905',
      match: 'exact',
    },
    {
      claim: 'OlympiAD: olaparib vs standard chemo in advanced gBRCA1/2 HER2-neg breast — PFS 7.0 vs 4.2 mo, HR 0.58',
      canonicalPath: 'trials.OlympiAD',
      canonicalValue: 'NCT02000622; Robson 2017 NEJM; DOI 10.1056/NEJMoa1706450',
      match: 'exact',
    },
    {
      claim: 'Pan-cancer bench archetype BR_BRCA1_TNBC: recall@3 = 1.00 (from CrisPRO backend sweep, n=2 breast archetypes total)',
      canonicalPath: 'w4_pancancer_grid.runs[BR_BRCA1_TNBC]',
      canonicalValue: 'recall_at_3=1.00, source=/mnt/results/spe_audit/w4_pancancer_grid.json',
      match: 'exact',
    },
  ],
  testsNeeded: [
    { test: 'TILs quantification on residual disease', unlocks: 'IO combo eligibility (KEYNOTE-522 subgroup post-hoc)', why: 'TILs > 50% in TNBC RCB > 0 associates with pembro benefit; not currently in bundle.' },
    { test: 'PD-L1 SP142 immune-cell score', unlocks: 'Atezolizumab combo consideration', why: 'PD-L1 negative on SP142 excludes atezo — confirm with actual assay before ruling out.' },
    { test: 'BRCA1 loss-of-heterozygosity in tumor', unlocks: 'Confirm HR functional loss beyond germline', why: 'Germline BRCA1 monoallelic — tumor LOH confirms biallelic loss and validates HRD.' },
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
    description: 'HR pathway null (BRCA1) + G1/S checkpoint compromised (TP53) — canonical TNBC BRCAness double hit',
    path: 'levels.L1.synthetic_lethality.double_hit_description',
  },
  parpFalsification: null,
  discoveryOnly: false,
};
