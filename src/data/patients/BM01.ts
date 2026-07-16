/**
 * BM01 · HER2+ breast → brain-met
 *
 * Hand-authored demo patient bundle for tumor-board rehearsal. Every drug and
 * anchor references a real trial or published finding cited below. Numbers are
 * either published pivotal-trial values or marked "not measured" in the
 * completeness field. NOT a real clinical case.
 */
import type { PatientBundle } from '../tumor-board/patient-bundle-types';
import { BM01_EVO2_PANEL } from '../tumor-board/anchor/bm01_evo2';


export const BM01: PatientBundle = {
  meta: {
    patientId: 'BM01',
    displayName: 'BM01 · HER2+ breast → brain metastases',
    contractVersion: 'v2.0',
    generatedAt: '2026-07-10T00:00:00.000000',
    requestedLevels: ['L1'] as const,
    endpoint: 'POST /api/ayesha/therapy-fit/bundle?level=l1&include_synthetic_lethality=true',
    demoDisclaimer:
      'Demo patient BM01 · L1 bundle · 2026-07-10 · v2.0. Illustrative substrate for tumor-board rehearsal; not a real clinical case. Brain-metastasis cascade demo — reuses the 7-step BrM overlay that already ships in the repo.',
  },
  tumorContext: {
    cancerType: 'brain_metastasis',
    subtype: 'HER2+ breast → BrM (active CNS disease)',
    msiStatus: 'MSS',
    tmbStatus: 'LOW',
    pdL1Status: 'NEGATIVE',
    erStatus: 'POSITIVE',
    erPercent: 45,
    prStatus: 'POSITIVE',
    her2Status: 'POSITIVE',
    priorLines: ['docetaxel + trastuzumab + pertuzumab first-line', 'T-DM1 second-line', 'radiotherapy to BrM'],
    completenessScore: 0.68,
    path: 'levels.L1.inputs_used.tumor_context',
  },
  mutations: [
    {
      gene: 'ERBB2',
      hgvs: 'ERBB2:amp',
      chrom: '17',
      pos: 39700064,
      ref: null,
      alt: null,
      consequence: 'copy_number_amplification',
      assembly: 'GRCh38',
      scoredByEvo2: false,
      normalizationNote: 'HER2 IHC 3+ / ISH ratio ≥ 4.0 — reported as amp event, no single HGVS',
      path: 'levels.L1.inputs_used.mutations[0]',
    },
    {
      gene: 'PIK3CA',
      hgvs: 'PIK3CA:c.3140A>G',
      chrom: '3',
      pos: 179234297,
      ref: 'A',
      alt: 'G',
      consequence: 'missense_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      normalizationNote: 'H1047R hotspot',
      path: 'levels.L1.inputs_used.mutations[1]',
    },
    {
      gene: 'TP53',
      hgvs: 'TP53:c.524G>A',
      chrom: '17',
      pos: 7675088,
      ref: 'G',
      alt: 'A',
      consequence: 'missense_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      normalizationNote: 'R175H hotspot',
      path: 'levels.L1.inputs_used.mutations[2]',
    },
  ],
  completeness: {
    completenessScore: 0.68,
    confidenceCap: 0.75,
    missing: ['CNS lesion count + total volume', 'CSF ctDNA', 'CDK4/6 inhibitor prior exposure'] as const,
    path: 'levels.L1.completeness',
  },
  brokenPathways: [
    {
      pathwayId: 'ERBB2_HYPERACTIVE',
      status: 'non_functional',
      genesAffected: ['ERBB2'],
      disruptionScore: 0.95,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="ERBB2_HYPERACTIVE"]',
    },
    {
      pathwayId: 'PI3K',
      status: 'non_functional',
      genesAffected: ['PIK3CA'],
      disruptionScore: 0.75,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="PI3K"]',
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
      pathwayId: 'HER2_BBB_PENETRANT',
      disruptionScore: 0.85,
      description: 'HER2CLIMB established tucatinib + trastuzumab + capecitabine as CNS-penetrant regimen — 1-yr OS 76% vs 62% placebo in active BrM subset.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="HER2_BBB_PENETRANT"]',
    },
    {
      pathwayId: 'ADC_HER2',
      disruptionScore: 0.75,
      description: 'DESTINY-Breast03 T-DXd showed CNS activity even in ORR-refractory patients — second-line HER2 ADC.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="ADC_HER2"]',
    },
    {
      pathwayId: 'PI3K_MTOR',
      disruptionScore: 0.35,
      description: 'PIK3CA H1047R — potential secondary axis, but limited CNS penetrance of most PI3K inhibitors; alpelisib mostly extracranial.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="PI3K_MTOR"]',
    },
  ],
  slMatrix: [
    { axis: 'her2_targeting', prodTier: 'Validated SL therapeutic lever', simTier: 'Validated SL therapeutic lever', divergenceIntended: false, divergenceExplanation: 'HER2 amp + BrM: tucatinib/T-DXd combos both validated in CNS disease.' },
    { axis: 'her2_adc', prodTier: 'Validated SL therapeutic lever', simTier: 'Validated SL therapeutic lever', divergenceIntended: false, divergenceExplanation: 'DESTINY-Breast03: T-DXd active in BrM including refractory subset.' },
    { axis: 'pi3k_axis', prodTier: 'Mechanistic candidate only', simTier: 'Mechanistic candidate only', divergenceIntended: false, divergenceExplanation: 'PIK3CA H1047R on paper suggests alpelisib, but ER/HER2 co-hormonal context + limited CNS penetration limits this axis.' },
    { axis: 'parp_inhibitors', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'immunotherapy', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false, divergenceExplanation: 'HER2+ generally IO-cold; PD-L1 neg here confirms.' },
    { axis: 'atr_wee1', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
  ],
  recommendedDrugs: [
    { drugName: 'Tucatinib + Trastuzumab + Capecitabine', targetPathway: 'HER2_BBB', confidence: 0.90, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[0]' },
    { drugName: 'Trastuzumab deruxtecan (T-DXd)', targetPathway: 'HER2_ADC', confidence: 0.85, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[1]' },
    { drugName: 'Neratinib + Capecitabine', targetPathway: 'HER2_BBB', confidence: 0.65, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[2]' },
    { drugName: 'Alpelisib + Fulvestrant', targetPathway: 'PI3K', confidence: 0.35, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[3]' },
  ],
  suggestedTherapy: {
    value: 'Tucatinib + Trastuzumab + Capecitabine (HER2CLIMB regimen)',
    path: 'levels.L1.synthetic_lethality.suggested_therapy',
  },
  evidenceAnchors: [
    {
      claim: 'HER2CLIMB (Murthy 2020 NEJM): tucatinib + trastuzumab + capecitabine in HER2+ mBC with BrM — median PFS 7.6 vs 4.9 mo (BrM subset), OS HR 0.66',
      canonicalPath: 'trials.HER2CLIMB',
      canonicalValue: 'NCT02614794; Murthy 2020 NEJM DOI 10.1056/NEJMoa1914609; Lin 2020 JCO DOI 10.1200/JCO.20.00775 (BrM subset)',
      match: 'exact',
    },
    {
      claim: 'DESTINY-Breast03 (Cortés 2022 NEJM): T-DXd vs T-DM1 in HER2+ metastatic — PFS 25.1 vs 7.2 mo, HR 0.28 (all-comer); intracranial response 63.9% vs 32.9%',
      canonicalPath: 'trials.DESTINY-Breast03',
      canonicalValue: 'NCT03529110; Cortés 2022 NEJM DOI 10.1056/NEJMoa2115022',
      match: 'exact',
    },
    {
      claim: 'HER2CLIMB updated (Lin 2022 JAMA Oncol): 4-yr follow-up, intracranial ORR 47.3% (tucatinib) vs 20.0% (placebo)',
      canonicalPath: 'trials.HER2CLIMB_updated',
      canonicalValue: 'DOI 10.1001/jamaoncol.2022.5610',
      match: 'exact',
    },
    {
      claim: 'PAN-CANCER BENCH COVERAGE FOR BRAIN-MET: 0 archetypes benched in current sweep (BrM is a metastatic site pattern, not a primary tumor class in the v1 sweep). Recommendations above rest on pivotal trials; the CrisPRO backend has not been benchmarked for BrM subtype specifically.',
      canonicalPath: 'w4_pancancer_grid.tumor_coverage.brain_metastasis',
      canonicalValue: 'n_archetypes=0 in v1 sweep, source=/mnt/results/spe_audit/w4_pancancer_grid.json',
      match: 'exact',
    },
  ],
  testsNeeded: [
    { test: 'CNS lesion count + total volume (MRI-brain)', unlocks: 'Local therapy planning (SRS vs WBRT vs medical only)', why: 'Systemic HER2CLIMB regimen appropriate for active BrM; local vs systemic hierarchy depends on lesion count and size.' },
    { test: 'CSF ctDNA', unlocks: 'Leptomeningeal disease detection + molecular monitoring', why: 'CSF ctDNA emerging for leptomeningeal HER2+ — extends CNS staging beyond MRI.' },
    { test: 'CDK4/6 inhibitor prior exposure history', unlocks: 'Post-CDK4/6-progression axis exploration', why: 'ER+ HER2+ post-CDK4/6 progression has distinct SL profile — not currently in bundle.' },
  ],
  slProvenance: {
    agent: 'SyntheticLethalityAgent',
    version: '2.1',
    status: 'ok' as const,
    syntheticLethalityDetected: true,
    detectionMethod: 'rules_amp_bbb_pathway',
    signalsUsed: ['her2_amplification', 'brain_mets_flag', 'pathway_mapper'] as const,
    trueScoringRequired: true,
    deltaRole: 'diagnostic_only_not_causal_for_sl_triggers',
    evo2CacheHits: 2,
    path: 'levels.L1.synthetic_lethality.provenance',
  },
  doubleHit: {
    description: 'HER2 amp + PIK3CA hotspot + BBB-penetrant TKI axis. Not a classical SL double-hit — this is the "genotype-matched CNS-active regimen" pattern (HER2CLIMB substrate).',
    path: 'levels.L1.synthetic_lethality.double_hit_description',
  },
  parpFalsification: null,
  discoveryOnly: true,
  discoveryOnlyReason:
    'Brain-metastasis is not an independent tumor-type class in the v1 pan-cancer bench sweep — BrM cases live as annotations on their primary tumor (breast, lung, melanoma). Zero BrM-specific archetypes were tested. Recommendations rest on pivotal trials (HER2CLIMB, DESTINY-Breast03), not on the CrisPRO backend having demonstrated recall for the BrM-substrate specifically.',
  // Snapshot-only anchor evidence panel — sourced at build time from the
  // evo2-e2e repository pipeline_results + brm_clinical_variants + README.
  // See scripts/anchor_extract/w2_extract_brm_evo2.py.
  anchorPanels: {
    brm: BM01_EVO2_PANEL,
  },
};
