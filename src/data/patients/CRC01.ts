/**
 * CRC01 · Colon MSI-H (Lynch/MLH1)
 *
 * Hand-authored demo patient bundle for tumor-board rehearsal. Every drug and
 * anchor references a real trial or published finding cited below. Numbers are
 * either published pivotal-trial values or marked "not measured" in the
 * completeness field. NOT a real clinical case.
 */
import type { PatientBundle } from '../tumor-board/patient-bundle-types';


export const CRC01: PatientBundle = {
  meta: {
    patientId: 'CRC01',
    displayName: 'CRC01 · Colon MSI-H (Lynch syndrome, MLH1)',
    contractVersion: 'v2.0',
    generatedAt: '2026-07-10T00:00:00.000000',
    requestedLevels: ['L1'] as const,
    endpoint: 'POST /api/ayesha/therapy-fit/bundle?level=l1&include_synthetic_lethality=true',
    demoDisclaimer:
      'Demo patient CRC01 · L1 bundle · 2026-07-10 · v2.0. Illustrative substrate for tumor-board rehearsal; not a real clinical case. Zero archetypes benched for colon in the current CrisPRO sweep — recommendations here are hypothesis, not benchmark.',
  },
  tumorContext: {
    cancerType: 'colorectal_cancer',
    subtype: 'MSI-H · dMMR · Lynch (MLH1 germline)',
    msiStatus: 'MSI-HIGH',
    tmbStatus: 'HIGH',
    tmbMutMb: 42,
    pdL1Status: 'POSITIVE',
    pdL1Cps: 5,
    completenessScore: 0.65,
    path: 'levels.L1.inputs_used.tumor_context',
  },
  mutations: [
    {
      gene: 'MLH1',
      hgvs: 'MLH1:c.1852_1854delAAG',
      chrom: '3',
      pos: 37035048,
      ref: 'AAAG',
      alt: 'A',
      consequence: 'inframe_deletion',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      normalizationNote: 'Lynch-associated germline; K618 in-frame deletion abolishes MutLα binding',
      path: 'levels.L1.inputs_used.mutations[0]',
    },
    {
      gene: 'APC',
      hgvs: 'APC:c.4348C>T',
      chrom: '5',
      pos: 112840261,
      ref: 'C',
      alt: 'T',
      consequence: 'stop_gained',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      path: 'levels.L1.inputs_used.mutations[1]',
    },
    {
      gene: 'KRAS',
      hgvs: 'KRAS:c.35G>A',
      chrom: '12',
      pos: 25245350,
      ref: 'G',
      alt: 'A',
      consequence: 'missense_variant',
      assembly: 'GRCh38',
      scoredByEvo2: true,
      normalizationNote: 'G12D — RAS oncogenic driver, precludes anti-EGFR',
      path: 'levels.L1.inputs_used.mutations[2]',
    },
  ],
  completeness: {
    completenessScore: 0.65,
    confidenceCap: 0.65,
    missing: ['MMR IHC (MLH1/MSH2/MSH6/PMS2 protein loss confirmation)', 'BRAF V600E status', 'CD8 TIL density'] as const,
    path: 'levels.L1.completeness',
  },
  brokenPathways: [
    {
      pathwayId: 'MMR',
      status: 'non_functional',
      genesAffected: ['MLH1'],
      disruptionScore: 0.95,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="MMR"]',
    },
    {
      pathwayId: 'WNT',
      status: 'non_functional',
      genesAffected: ['APC'],
      disruptionScore: 0.85,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="WNT"]',
    },
    {
      pathwayId: 'RAS_MAPK',
      status: 'non_functional',
      genesAffected: ['KRAS'],
      disruptionScore: 0.80,
      path: 'levels.L1.synthetic_lethality.broken_pathways[?pathway_id=="RAS_MAPK"]',
    },
  ],
  essentialPathways: [
    {
      pathwayId: 'CHECKPOINT_IO',
      disruptionScore: 0.90,
      description: 'MSI-H/dMMR is the canonical IO-responsive substrate — high TMB + neoantigen burden. KEYNOTE-177 established first-line pembrolizumab.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="CHECKPOINT_IO"]',
    },
    {
      pathwayId: 'MMR',
      disruptionScore: 0.95,
      description: 'MMR essential AND broken → mutation accumulation drives neoantigens → PD-1 blockade axis lit.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="MMR"]',
    },
    {
      pathwayId: 'ATR',
      disruptionScore: 0.25,
      description: 'ATR speculative: replication stress in MSI-H context reported in preclinical; not yet clinically validated for CRC.',
      path: 'levels.L1.synthetic_lethality.essential_pathways[?pathway_id=="ATR"]',
    },
  ],
  slMatrix: [
    { axis: 'immunotherapy', prodTier: 'Validated SL therapeutic lever', simTier: 'Validated SL therapeutic lever', divergenceIntended: false, divergenceExplanation: 'MSI-H CRC + PD-1 blockade is the clearest IO-genotype match in solid tumors.' },
    { axis: 'parp_inhibitors', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', manuscriptClaimType: 'not_applicable_subtype', divergenceIntended: false, divergenceExplanation: 'PARPi requires HR deficiency; MSI-H CRC without BRCA-null is HR-intact — falsification is subtype-specific, not universal.' },
    { axis: 'atr_wee1', prodTier: 'Mechanistic candidate only', simTier: 'Mechanistic candidate only', divergenceIntended: false, divergenceExplanation: 'Preclinical only in CRC MSI-H — no clinical validation yet.' },
    { axis: 'cytidine_analogs', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'pkmyt1', prodTier: 'Not supported / negative', simTier: 'Not supported / negative', divergenceIntended: false },
    { axis: 'wrn', prodTier: 'Mechanistic candidate only', simTier: 'Mechanistic candidate only', divergenceIntended: false, divergenceExplanation: 'WRN is a validated MSI-H-selective dependency (Chan 2019, Behan 2019); no approved therapy yet.' },
  ],
  recommendedDrugs: [
    { drugName: 'Pembrolizumab', targetPathway: 'PD-1', confidence: 0.90, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[0]' },
    { drugName: 'Nivolumab', targetPathway: 'PD-1', confidence: 0.85, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[1]' },
    { drugName: 'Nivolumab + Ipilimumab', targetPathway: 'PD-1/CTLA-4', confidence: 0.80, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[2]' },
    { drugName: 'Dostarlimab', targetPathway: 'PD-1', confidence: 0.70, falsified: false, path: 'levels.L1.synthetic_lethality.recommended_drugs[3]' },
  ],
  suggestedTherapy: {
    value: 'Pembrolizumab first-line (KEYNOTE-177 regimen)',
    path: 'levels.L1.synthetic_lethality.suggested_therapy',
  },
  evidenceAnchors: [
    {
      claim: 'KEYNOTE-177: first-line pembrolizumab vs chemo in MSI-H/dMMR mCRC — PFS 16.5 vs 8.2 mo, HR 0.60',
      canonicalPath: 'trials.KEYNOTE-177',
      canonicalValue: 'NCT02563002; André 2020 NEJM (final DOI 10.1056/NEJMoa2017699), 5-yr update Ann Oncol 2024 DOI 10.1016/j.annonc.2024.11.012',
      match: 'exact',
    },
    {
      claim: 'CheckMate-142 nivo+ipi MSI-H mCRC — 24-mo PFS ~64%',
      canonicalPath: 'trials.CheckMate-142',
      canonicalValue: 'NCT02060188; Lenz 2022 JCO DOI 10.1200/JCO.21.02008',
      match: 'exact',
    },
    {
      claim: 'WRN synthetic lethality in MSI-H is preclinically validated (Chan/Roberts 2019 Nature; Behan 2019 Nature)',
      canonicalPath: 'preclinical.WRN_MSI_SL',
      canonicalValue: 'Chan 2019 DOI 10.1038/s41586-019-1103-9; Behan 2019 DOI 10.1038/s41586-019-1102-x — no approved WRN inhibitor yet',
      match: 'exact',
    },
    {
      claim: 'PAN-CANCER BENCH COVERAGE FOR COLON: 0 archetypes tested. Recommendations for this patient are hypothesis, NOT benchmark output.',
      canonicalPath: 'w4_pancancer_grid.tumor_coverage.colorectal_cancer',
      canonicalValue: 'n_archetypes=0, source=/mnt/results/spe_audit/w4_pancancer_grid.json',
      match: 'exact',
    },
  ],
  testsNeeded: [
    { test: 'MMR IHC panel (MLH1/MSH2/MSH6/PMS2)', unlocks: 'Protein-level confirmation of MLH1 loss + Lynch/somatic distinction', why: 'MSI PCR shows the phenotype; IHC confirms which MMR gene is silenced — needed for genetic counseling.' },
    { test: 'BRAF V600E status', unlocks: 'Lynch vs sporadic MSI-H differentiation + prognostic risk', why: 'BRAF V600E + MSI-H usually sporadic MLH1 hypermethylation; BRAF-wt + MSI-H raises Lynch prior.' },
    { test: 'CD8 TIL density', unlocks: 'IO response prior — Immunoscore', why: 'Immunoscore validated prognostic in CRC; adds resolution beyond MSI status.' },
  ],
  slProvenance: {
    agent: 'SyntheticLethalityAgent',
    version: '2.1',
    status: 'ok' as const,
    syntheticLethalityDetected: true,
    detectionMethod: 'rules_msi_high_immunotherapy',
    signalsUsed: ['msi_status', 'tmb_high', 'mmr_gene_lof', 'pathway_mapper'] as const,
    trueScoringRequired: true,
    deltaRole: 'diagnostic_only_not_causal_for_sl_triggers',
    evo2CacheHits: 1,
    path: 'levels.L1.synthetic_lethality.provenance',
  },
  doubleHit: {
    description: 'MMR loss (MLH1) → hypermutation phenotype → neoantigen-driven IO responsiveness. Not a classic SL double-hit — this is the "IO-primed genotype" pattern.',
    path: 'levels.L1.synthetic_lethality.double_hit_description',
  },
  parpFalsification: null,
  discoveryOnly: true,
  discoveryOnlyReason:
    'Zero colorectal archetypes tested in the current pan-cancer bench sweep (/mnt/results/spe_audit/w4_pancancer_grid.json). Recommendations above rest on published pivotal trials (KEYNOTE-177, CheckMate-142), not on the CrisPRO backend having demonstrated recall for this tumor type. The frontend must show this discovery-only banner on every tab.',
};
