// ============================================================================
// ch03-seven-modalities.ts — Chapter 3: The 7 evidence modalities
//
// Public-safe rewrite of PhD KB Ch.1.3 (7 Evidence Modalities).
// Modality weights are internal; positive-thresholds and public data sources
// are surfaced.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_03_SEVEN_MODALITIES: ResearchChapter = {
  slug: 'seven-evidence-modalities',
  order: 3,
  title: 'The seven evidence modalities',
  subtitle: 'The complementary evidence types every dependency claim is scored on',
  readMinutes: 8,
  publicAnchors: [
    'DepMap (Broad Institute)',
    'PRISM Repurposing Hub',
    'GDSC (Sanger)',
    'CIViC',
    'ClinicalTrials.gov',
    'TCGA',
  ],
  sections: [
    {
      heading: 'Why seven',
      body: [
        'The evidence matrix evaluates each gene–target claim across seven distinct modalities. The modalities are complementary — no single one is sufficient for a high-confidence tier, and convergence across modalities dramatically increases confidence.',
        'The modality set is intentionally biased toward the modalities that most reliably predict clinical benefit: CRISPR dependency, isogenic in-vitro pharmacology, and in-vivo efficacy carry the most weight; expression association carries the least and is used to build mechanistic plausibility, not to close a claim on its own.',
      ],
    },
    {
      heading: 'Modality 1 — CRISPR dependency (genetic KO)',
      body: [
        '**What it measures:** whether knocking out gene X selectively kills tumour cells that carry biomarker Y, tested at genome scale across hundreds of cancer cell lines.',
        '**Data source:** DepMap Portal (Broad Institute), Sanger Cancer Dependency Map, Achilles project.',
        '**Positive threshold:** Wilcoxon FDR < 0.05 AND Cohen’s d ≥ 0.5 across biomarker-positive vs biomarker-negative lines.',
        '**Public example:** CDK2 dependency selectively enriched in CCNE1-amplified cell lines in DepMap.',
      ],
    },
    {
      heading: 'Modality 2 — In vitro functional (pharmacology + isogenic KO)',
      body: [
        '**What it measures:** whether the drug/target combination produces a real killing effect in a cell-line model, with a matched isogenic knockout or rescue.',
        '**Data source:** PubMed-indexed primary in-vitro pharmacology and isogenic KO/knock-in studies.',
        '**Positive threshold:** IC50 ratio ≥ 3.0 between biomarker-positive and biomarker-negative isogenic pairs, with rescue on re-expression of the wild-type gene.',
        '**Public example:** PARP inhibitor sensitivity in BRCA1-null vs BRCA1-restored isogenic pairs.',
      ],
    },
    {
      heading: 'Modality 3 — In vivo efficacy (xenograft / PDX)',
      body: [
        '**What it measures:** whether the drug/target combination produces durable tumour regression in a mouse model that carries the relevant biomarker.',
        '**Data source:** PubMed-indexed xenograft and patient-derived-xenograft (PDX) studies.',
        '**Positive threshold:** statistically significant tumour regression (p < 0.05) in biomarker-positive PDX/xenograft vs vehicle control.',
        '**Public example:** PARP-inhibitor tumour regression in BRCA-mutant ovarian and pancreatic PDX models.',
      ],
    },
    {
      heading: 'Modality 4 — Clinical (human evidence)',
      body: [
        '**What it measures:** whether real patients with this biomarker have responded to this therapy in a clinical trial or registry.',
        '**Data source:** CIViC, Cancer Genome Interpreter (CGI), ClinicalTrials.gov, published Phase II/III trial reports.',
        '**Positive threshold:** at least one confirmed clinical response OR Phase II+ trial with pre-specified biomarker subgroup meeting its primary endpoint.',
        '**Public example:** olaparib in BRCA-mutant ovarian cancer (SOLO-1 first-line maintenance, SOLO-2 platinum-sensitive relapsed) — the canonical DDR-clinical anchor.',
      ],
    },
    {
      heading: 'Modality 5 — Pharmacologic (PRISM)',
      body: [
        '**What it measures:** whether the compound shows biomarker-stratified activity in the PRISM barcoded multiplexed cell-line screen.',
        '**Data source:** Broad PRISM Repurposing Hub.',
        '**Positive threshold:** delta AUC ≥ 2.0 between biomarker groups at FDR < 0.10.',
        '**Public example:** PRISM-scored differential activity of ATR inhibitors across CCNE1-amp vs non-amp lines.',
      ],
    },
    {
      heading: 'Modality 6 — Pharmacologic (GDSC)',
      body: [
        '**What it measures:** whether the compound shows biomarker-stratified IC50 in the Sanger GDSC panel.',
        '**Data source:** Genomics of Drug Sensitivity in Cancer (GDSC1 + GDSC2), Sanger Institute.',
        '**Positive threshold:** IC50 fold-change ≥ 2.0 between biomarker groups.',
        '**Public example:** GDSC-scored MEK-inhibitor differential IC50 across KRAS-mutant vs wild-type lines.',
      ],
    },
    {
      heading: 'Modality 7 — Expression association',
      body: [
        '**What it measures:** whether target expression covaries with biomarker status across primary tumours or model systems. This is the weakest modality on its own; used to build mechanistic plausibility for a hypothesis, not to close one.',
        '**Data source:** TCGA, GEO, cBioPortal, CCLE expression.',
        '**Positive threshold:** Spearman ρ > 0.3 at FDR < 0.05 across a defined tumour cohort.',
        '**Public example:** MSI-H tumours show elevated CD8+ infiltration signature across TCGA colorectal.',
      ],
    },
  ],
  keyInsight:
    'No single modality is enough. Convergence across ≥2 independent modalities is the minimum bar for a STRONG claim; VALIDATED requires isogenic in-vitro + in-vivo + a clinical receipt.',
  linksIntoDepth: {
    axes: ['ddr', 'mapk', 'io', 'rss'],
    modalities: [
      'crispr-dependency',
      'in-vitro-functional',
      'in-vivo',
      'clinical',
      'pharmacologic-prism',
      'pharmacologic-gdsc',
      'expression-association',
    ],
    tiers: ['strong', 'mechanistic'],
    capabilities: ['gate-tier-scoring', 'multi-asset-scoring', 'biomarker-failure-prediction'],
  },
};
