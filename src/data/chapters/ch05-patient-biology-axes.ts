// ============================================================================
// ch05-patient-biology-axes.ts — Chapter 5: The patient biology axes
//
// Public-safe: describes the eight mechanism axes without disclosing that
// they compose a scored vector or its dimensionality.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_05_PATIENT_BIOLOGY_AXES: ResearchChapter = {
  slug: 'patient-biology-axes',
  order: 5,
  title: 'The patient biology axes',
  subtitle: 'The measurable mechanism features that describe a tumour biology profile',
  readMinutes: 9,
  publicAnchors: [
    'DDR: BRCA1/2, ATM, PALB2, HRD, MSI',
    'MAPK: KRAS/NRAS/BRAF subtype resolution',
    'PI3K: PTEN loss vs PIK3CA hotspot',
    'IO: TMB, MSI-H, PD-L1 CPS, CD8+',
    'Efflux: ABC-transporters',
    'RSS: CCNE1, MYC, ARID1A, TP53, MSI-H',
  ],
  sections: [
    {
      heading: 'What the axes are',
      body: [
        'A patient biology profile is described on a fixed set of mechanism axes. Each axis captures a measurable feature of tumour biology that carries a real, published therapeutic signal.',
        'The axis set is: DNA damage response, MAPK pathway state, PI3K / AKT / mTOR axis, angiogenesis / VEGF signalling, HER-family receptor state, immune / IO axis, drug-efflux capacity, and replication-stress signature.',
      ],
    },
    {
      heading: 'DNA damage response (DDR)',
      body: [
        'Captures somatic and germline status of DDR genes (BRCA1/2, ATM, PALB2, RAD51 paralogs, mismatch-repair genes), homologous-recombination-deficiency signature, and microsatellite-instability status.',
        'Public anchor: BRCA1/2 loss + PARP inhibitor sensitivity is the canonical DDR-vulnerability signal across ovarian, breast, prostate, and pancreatic cancer (SOLO-1, OlympiAD, PROfound, POLO).',
      ],
    },
    {
      heading: 'MAPK pathway state',
      body: [
        'Captures which node of the MAPK cascade is active, with subtype resolution. KRAS G12C differs from G12D differs from G12V. BRAF V600E differs from class II / III BRAF alterations.',
        'Public anchor: KRAS-G12C responds to sotorasib and adagrasib; BRAF-V600E responds to BRAF+MEK combinations; the same "MAPK-driven" tumour has very different admissible therapy sets by subtype.',
      ],
    },
    {
      heading: 'PI3K / AKT / mTOR axis',
      body: [
        'Captures PTEN loss (protein and copy-number), PIK3CA hotspot mutations (E545K, H1047R), and PI3K-pathway activation signatures.',
        'Public anchor: PTEN-null tumours behave differently from PIK3CA-mutant tumours even when both look "PI3K-active" on a shallow read.',
      ],
    },
    {
      heading: 'Angiogenesis / VEGF signalling',
      body: [
        'Captures VEGF-A / VEGF-C expression, VEGF-receptor status, and hypoxia signalling (HIF1A, hypoxia signatures).',
        'Public anchor: bevacizumab, aflibercept, and TKI angiogenesis inhibitors have established but heterogeneous benefit. The axis identifies where VEGF-directed therapy is a real gate rather than an averaged effect.',
      ],
    },
    {
      heading: 'HER-family receptor state',
      body: [
        'Captures HER2 (ERBB2) amplification and mutation, EGFR (ERBB1) amplification and mutation, HER3 (ERBB3) expression, and downstream PI3K/MAPK activation.',
        'Public anchor: HER2-amplified tumours respond to HER2-directed antibodies and ADCs; HER2-mutant (non-amplified) tumours use a different admissible set (tucatinib, neratinib, T-DXd context).',
      ],
    },
    {
      heading: 'Immune / IO axis',
      body: [
        'Captures tumour mutational burden (tissue TMB and blood TMB), MSI-H status, PD-L1 combined positive score (CPS), CD8+ T-cell infiltration, and interferon-γ signature.',
        'Public anchor: MSI-H and TMB-high tumours drive most durable checkpoint-inhibitor responses (KEYNOTE-158, CheckMate-142); MSS tumours require different logic.',
      ],
    },
    {
      heading: 'Drug-efflux capacity',
      body: [
        'Captures ABC-transporter expression: MDR1 (ABCB1), BCRP (ABCG2), and the MRP family (ABCC1–6). High efflux capacity is a known resistance mechanism for many oral small molecules.',
        'Public anchor: efflux status is systematically under-used as a gate/no-gate signal even though it explains a real fraction of small-molecule non-response — the axis brings it into the alignment layer explicitly.',
      ],
    },
    {
      heading: 'Replication-stress signature',
      body: [
        'Captures CCNE1 amplification, MYC amplification, ARID1A loss-of-function, TP53 loss-of-function, and MSI-H status — all drivers of replication stress that create ATR / CHK1 / WEE1 inhibitor vulnerability.',
        'Public anchor: CCNE1-amplified tumours are the canonical ATR-inhibitor-sensitive population; the replication-stress axis identifies mechanistically related vulnerabilities across histologies.',
      ],
    },
  ],
  keyInsight:
    'The axis set is fixed and mechanism-anchored — not a bag of biomarkers assembled per project. A tumour’s biology profile is described on the same axes whether it is measured today for ovarian cancer or a year from now for gastric cancer, so the axes stay comparable across programs.',
  linksIntoDepth: {
    axes: ['ddr', 'mapk', 'pi3k', 'vegf', 'her2', 'io', 'efflux', 'rss'],
    modalities: ['clinical', 'crispr-dependency', 'expression-association'],
    tiers: ['strong', 'mechanistic'],
    capabilities: ['gate-tier-scoring', 'multi-asset-scoring', 'mechanism-divergence'],
  },
};
