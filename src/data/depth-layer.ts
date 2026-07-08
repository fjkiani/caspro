// ============================================================================
// depth-layer.ts — the substrate that backs every product capability.
//
// Sources:
//   - Internal capability registry + governance audit (kept off-site)
//   - Public science: BRCA/PARP mechanism, DepMap dependency signal,
//     CIViC, ClinicalTrials.gov, PMID 35428381 (MBD4-LOF + gemcitabine)
//
// Discipline:
//   - PUBLISHED here: axis names, modality definitions, tier criteria,
//     governance commitments, public gene/target anchors, PMIDs.
//   - NEVER published here: client program identifiers, ranker math,
//     dimensionality claims, cosine/dot-product notation, retired numerics.
//     The caspro-lint/forbidden_values.py scanner is the source of truth.
//   - Every capability MUST resolve substrateSlugs + governanceSlugs against
//     entries in this file (enforced by caspro-lint/capability_depth_lint.py).
// ============================================================================

// ---------------------------------------------------------------------------
// PATIENT_VECTOR_AXES — the biology axes we score a patient on.
// Each axis is a measurable feature of tumour biology; the site describes
// what each axis captures, not how the axes combine into a score.
// ---------------------------------------------------------------------------

export interface PatientVectorAxis {
  axis: string;
  name: string;
  oneLiner: string;
  whatMeasures: string;
  publicAnchor: string;
  capabilitiesThatUseIt: string[]; // capability slugs from CAPABILITY_REGISTRY
}

export const PATIENT_VECTOR_AXES: PatientVectorAxis[] = [
  {
    axis: 'ddr',
    name: 'DNA damage response',
    oneLiner: 'How intact the tumour’s DNA repair machinery is.',
    whatMeasures:
      'Somatic and germline status of DDR genes (BRCA1/2, ATM, PALB2, RAD51 paralogs, mismatch-repair genes) plus homologous-recombination deficiency (HRD) signal and microsatellite-instability (MSI) status.',
    publicAnchor:
      'BRCA1/2 loss + PARP inhibitor sensitivity is the canonical DDR-vulnerability signal established in ovarian, breast, prostate, and pancreatic cancer.',
    capabilitiesThatUseIt: [
      'gate-tier-scoring',
      'biomarker-failure-prediction',
      'mechanism-divergence',
    ],
  },
  {
    axis: 'mapk',
    name: 'MAPK pathway state',
    oneLiner: 'Which node of the MAPK cascade is active in this tumour.',
    whatMeasures:
      'KRAS / NRAS / BRAF mutation status and subtype (KRAS-G12C vs G12D vs G12V, BRAF-V600E vs class II/III), plus downstream MEK/ERK activation signals.',
    publicAnchor:
      'KRAS-G12C responds to sotorasib/adagrasib, BRAF-V600E to BRAF+MEK combinations; the same MAPK-driven tumour has very different admissible therapy sets by subtype.',
    capabilitiesThatUseIt: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'mechanism-divergence',
    ],
  },
  {
    axis: 'pi3k',
    name: 'PI3K / AKT / mTOR axis',
    oneLiner: 'How active the PI3K survival axis is, and why.',
    whatMeasures:
      'PTEN loss (protein and copy-number), PIK3CA hotspot mutations (E545K, H1047R), and PI3K-pathway activation signatures.',
    publicAnchor:
      'PTEN-null tumours behave differently from PIK3CA-mutant tumours even when both look "PI3K-active" on a shallow read.',
    capabilitiesThatUseIt: ['gate-tier-scoring', 'multi-asset-scoring'],
  },
  {
    axis: 'vegf',
    name: 'Angiogenesis / VEGF signalling',
    oneLiner: 'How much the tumour depends on new blood-vessel formation.',
    whatMeasures:
      'VEGF-A / VEGF-C expression, VEGF-receptor status, and hypoxia signalling (HIF1A, hypoxia signatures).',
    publicAnchor:
      'Bevacizumab, aflibercept, and TKI angiogenesis inhibitors have established but heterogeneous benefit; the axis identifies where VEGF-directed therapy is a real gate vs a shrug.',
    capabilitiesThatUseIt: ['population-funnel', 'mechanism-divergence'],
  },
  {
    axis: 'her2',
    name: 'HER-family receptor state',
    oneLiner: 'Which HER-family receptor is driving proliferation.',
    whatMeasures:
      'HER2 (ERBB2) amplification and mutation, EGFR (ERBB1) amplification and mutation, HER3 (ERBB3) expression, and downstream PI3K/MAPK activation.',
    publicAnchor:
      'HER2-amplified tumours respond to HER2-directed antibodies and ADCs; HER2-mutant (non-amplified) tumours use a different admissible set (tucatinib, neratinib, T-DXd context).',
    capabilitiesThatUseIt: ['multi-asset-scoring', 'biomarker-failure-prediction'],
  },
  {
    axis: 'io',
    name: 'Immune / IO axis',
    oneLiner: 'How likely this tumour is to see benefit from immunotherapy.',
    whatMeasures:
      'Tumour mutational burden (tissue TMB and blood TMB), MSI-H status, PD-L1 combined positive score (CPS), CD8+ T-cell infiltration, and interferon-γ signature.',
    publicAnchor:
      'MSI-H and TMB-high tumours drive most durable checkpoint-inhibitor responses; MSS tumours require different logic.',
    capabilitiesThatUseIt: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
  },
  {
    axis: 'efflux',
    name: 'Drug-efflux capacity',
    oneLiner: 'How well the tumour pumps small-molecule drugs out.',
    whatMeasures:
      'ABC-transporter expression: MDR1 (ABCB1), BCRP (ABCG2), MRP family (ABCC1-6). High efflux capacity is a known resistance mechanism for many oral small molecules.',
    publicAnchor:
      'Efflux status is under-used as a gate/no-gate signal even though it explains a real fraction of small-molecule non-response.',
    capabilitiesThatUseIt: ['gate-tier-scoring', 'population-funnel'],
  },
  {
    axis: 'rss',
    name: 'Replication-stress signature',
    oneLiner: 'How much the tumour is running on replication-stress signalling.',
    whatMeasures:
      'CCNE1 amplification, MYC amplification, ARID1A loss-of-function, TP53 loss-of-function, and MSI-H status — all drivers of replication stress that create ATR/CHK1/WEE1-inhibitor vulnerability.',
    publicAnchor:
      'CCNE1-amplified tumours are the canonical ATR-inhibitor-sensitive population; the replication-stress axis identifies mechanistically related vulnerabilities across histologies.',
    capabilitiesThatUseIt: [
      'biomarker-failure-prediction',
      'mechanism-divergence',
    ],
  },
];

// ---------------------------------------------------------------------------
// EVIDENCE_MODALITIES_7 — the 7 evidence types we score dependency claims on.
// Each modality has a weight in the internal admissibility scorecard and a
// public-facing example. The modality-weight table is internal; the modality
// definitions themselves are published so the site can show what evidence
// depth means for a claim.
// ---------------------------------------------------------------------------

export interface EvidenceModality {
  modality: string;
  name: string;
  whatItMeasures: string;
  dataSource: string;
  positiveThreshold: string;
  publicExample: string;
}

export const EVIDENCE_MODALITIES_7: EvidenceModality[] = [
  {
    modality: 'crispr-dependency',
    name: 'CRISPR dependency (genetic KO)',
    whatItMeasures:
      'Does knocking out gene X selectively kill tumour cells that carry biomarker Y? Genome-scale CRISPR-Cas9 knockout screens across hundreds of cancer cell lines, stratified by biomarker status.',
    dataSource:
      'DepMap Portal (Broad Institute), Sanger Cancer Dependency Map, Achilles project',
    positiveThreshold:
      'Wilcoxon FDR < 0.05 AND Cohen’s d ≥ 0.5 across biomarker-positive vs biomarker-negative lines.',
    publicExample:
      'CDK2 dependency selectively enriched in CCNE1-amplified cell lines in DepMap.',
  },
  {
    modality: 'in-vitro-functional',
    name: 'In vitro functional (pharmacology + isogenic KO)',
    whatItMeasures:
      'Does the drug/target combination produce a real killing effect in a cell-line model, with a matched isogenic KO/rescue?',
    dataSource:
      'PubMed-indexed primary in-vitro pharmacology, isogenic knockout/knock-in studies',
    positiveThreshold:
      'IC50 ratio ≥ 3.0 between biomarker-positive and biomarker-negative isogenic pairs, with rescue on re-expression.',
    publicExample:
      'PARP inhibitor sensitivity in BRCA1-null vs BRCA1-restored isogenic pairs.',
  },
  {
    modality: 'in-vivo',
    name: 'In vivo efficacy (xenograft / PDX)',
    whatItMeasures:
      'Does the drug/target combination produce durable tumour regression in a mouse model that carries the relevant biomarker?',
    dataSource:
      'PubMed-indexed xenograft and patient-derived-xenograft (PDX) studies',
    positiveThreshold:
      'Statistically significant tumour regression (p < 0.05) in biomarker-positive PDX/xenograft vs vehicle control.',
    publicExample:
      'PARP-inhibitor tumour regression in BRCA-mutant ovarian and pancreatic PDX models.',
  },
  {
    modality: 'clinical',
    name: 'Clinical (human evidence)',
    whatItMeasures:
      'Have real patients with this biomarker responded to this therapy in a clinical trial or registry?',
    dataSource:
      'CIViC, Cancer Genome Interpreter, ClinicalTrials.gov, published Phase II/III trial reports',
    positiveThreshold:
      'At least one confirmed clinical response OR Phase II+ trial with pre-specified biomarker subgroup meeting its primary endpoint.',
    publicExample:
      'Olaparib in BRCA-mutant ovarian cancer (SOLO-1, SOLO-2, OlympiAD) — the canonical DDR-clinical anchor.',
  },
  {
    modality: 'pharmacologic-prism',
    name: 'Pharmacologic — PRISM',
    whatItMeasures:
      'Does the compound show biomarker-stratified activity in the PRISM barcoded multiplexed cell-line screen?',
    dataSource: 'Broad PRISM Repurposing Hub',
    positiveThreshold:
      'Delta AUC ≥ 2.0 between biomarker groups at FDR < 0.10.',
    publicExample:
      'PRISM-scored differential activity of ATR inhibitors across CCNE1-amp vs non-amp lines.',
  },
  {
    modality: 'pharmacologic-gdsc',
    name: 'Pharmacologic — GDSC',
    whatItMeasures:
      'Does the compound show biomarker-stratified IC50 in the Sanger GDSC panel?',
    dataSource: 'Genomics of Drug Sensitivity in Cancer (GDSC1 + GDSC2), Sanger Institute',
    positiveThreshold: 'IC50 fold-change ≥ 2.0 between biomarker groups.',
    publicExample:
      'GDSC-scored MEK-inhibitor differential IC50 across KRAS-mutant vs wild-type lines.',
  },
  {
    modality: 'expression-association',
    name: 'Expression association',
    whatItMeasures:
      'Does target expression covary with biomarker status across primary tumours or model systems? This is the weakest modality on its own; used to build mechanistic plausibility for a hypothesis, not to close one.',
    dataSource: 'TCGA, GEO, cBioPortal, CCLE expression',
    positiveThreshold: 'Spearman ρ > 0.3 at FDR < 0.05 across a defined tumour cohort.',
    publicExample:
      'MSI-H tumours show elevated CD8+ infiltration signature across TCGA colorectal.',
  },
];

// ---------------------------------------------------------------------------
// EVIDENCE_TIERS_4 — the 4 tiers a dependency claim can hold.
// Every claim on the site is tier-labelled. VALIDATED is a high bar and is
// NEVER auto-assigned by the internal admissibility engine — it requires
// manual sign-off against the entry criteria.
// ---------------------------------------------------------------------------

export interface EvidenceTier {
  tier: string;
  name: string;
  entryCriteria: string;
  clinicalActionability: string;
  canonicalPublicExample: string;
  invariant?: string;
}

export const EVIDENCE_TIERS_4: EvidenceTier[] = [
  {
    tier: 'validated',
    name: 'VALIDATED',
    entryCriteria:
      'In-vitro isogenic KO/KI evidence AND in-vivo PDX/xenograft efficacy AND at least one confirmed clinical receipt (single-patient response, case series, or Phase II+ biomarker-defined arm).',
    clinicalActionability:
      'Sufficient evidence depth to consider as a first-line hypothesis in the mechanism-fit ranker. This is where our confidence bar is set.',
    canonicalPublicExample:
      'MBD4-LOF + gemcitabine sensitivity (PMID 35428381) — isogenic KO + xenograft + confirmed clinical response.',
    invariant:
      'NEVER auto-assigned. Every VALIDATED claim on the site is manually signed off against these three criteria.',
  },
  {
    tier: 'strong',
    name: 'STRONG',
    entryCriteria:
      'In-vitro functional evidence + in-vivo efficacy, OR in-vitro functional evidence + pharmacologic convergence (PRISM or GDSC) at Cohen’s d ≥ 0.5.',
    clinicalActionability:
      'Sufficient depth to prioritise for confirmatory work and to include as a supporting hypothesis in the mechanism-fit ranker.',
    canonicalPublicExample:
      'CDK2 dependency in CCNE1-amplified cell lines (DepMap Cohen’s d ≈ −0.72) + in-vitro CDK2 inhibitor sensitivity.',
  },
  {
    tier: 'mechanistic',
    name: 'MECHANISTIC',
    entryCriteria:
      'Pathway logic + expression association or literature precedent, without direct in-vitro/in-vivo receipts for the specific biomarker–target pair.',
    clinicalActionability:
      'A hypothesis worth pursuing; surfaced as a labelled MECHANISTIC candidate, not as a first-line ranker output.',
    canonicalPublicExample:
      'ATR / WEE1 inhibitor sensitivity in BER-deficient tumours by pathway reasoning + expression covariation.',
  },
  {
    tier: 'insufficient',
    name: 'INSUFFICIENT',
    entryCriteria:
      'Fewer than two independent modalities meet threshold, or the strongest modality is expression-association alone.',
    clinicalActionability:
      'Not surfaced as an actionable claim. Held in the internal audit queue for re-evaluation as evidence accumulates.',
    canonicalPublicExample:
      'Expression-only associations without functional or clinical corroboration.',
  },
];

// ---------------------------------------------------------------------------
// GOVERNANCE_GUARDRAILS — commitments that back every capability output.
// The math of the ranker is internal. What we publish is the operational
// commitments: version-locking, admissibility, receipts, and reproducibility.
// ---------------------------------------------------------------------------

export interface GovernanceGuardrail {
  slug: string;
  name: string;
  whatItLocks: string;
  publicDisclosure: string;
  receiptLocation: string;
  appliesToCapabilities: string[]; // capability slugs
}

export const GOVERNANCE_GUARDRAILS: GovernanceGuardrail[] = [
  {
    slug: 'ranker-version-lock',
    name: 'Ranker version lock',
    whatItLocks:
      'The mechanism-fit ranking function is version-locked. Every score carries the ranker version that produced it, and the ranker is immutable within a release. Any ranker change is a labelled release with a re-run of every affected output.',
    publicDisclosure:
      'CrisPRO reports a single deterministic fit score for any patient-biology / trial-target pair under a given ranker version. The score is reproducible on demand.',
    receiptLocation: 'Internal ranker manifest signed at release cut.',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
  },
  {
    slug: 'ranker-variant-prohibition',
    name: 'Ranker-variant prohibition',
    whatItLocks:
      'Alternative scoring variants that were considered and rejected during ranker design are prohibited from production outputs. The prohibited-variant list is enforced by the caspro-lint scanner.',
    publicDisclosure:
      'CrisPRO does not fall back to a rejected scoring variant if the primary output looks unfavourable. Only the released ranker version is admissible.',
    receiptLocation: 'caspro-lint/forbidden_values.py',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
  },
  {
    slug: 'admissibility-policy',
    name: 'Admissibility policy',
    whatItLocks:
      'Every claim, every score, every population estimate must be traceable to a source receipt. No claim is admissible without a source; unsourced aggregates are downgraded to a labelled OPEN_ASSUMPTION.',
    publicDisclosure:
      'CrisPRO reports carry source receipts for every claim. Any aggregate that cannot be traced is labelled as an assumption on the surface it appears on.',
    receiptLocation: 'Internal source-receipt audit + KG quantitative anchors.',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
  },
  {
    slug: 'forbidden-string-audit',
    name: 'Forbidden-string audit',
    whatItLocks:
      'Retired numerics, quarantined identifiers, and prohibited terminology are blocked from every commit before merge. The scanner runs on every build and is a hard gate.',
    publicDisclosure:
      'CrisPRO ships with an open lint layer (caspro-lint) that blocks quarantined values from ever reaching the site. The lint is a hard gate on every release.',
    receiptLocation: 'caspro-lint/forbidden_values.py',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
  },
  {
    slug: 'reproducibility-lock',
    name: 'Reproducibility lock',
    whatItLocks:
      'Every capability output must be reproducible from source data + the released ranker version. Any output that cannot be re-derived is quarantined until the delta is resolved.',
    publicDisclosure:
      'CrisPRO commits to reproducibility on every capability. An output that cannot be re-derived from source + ranker version is not surfaced to a partner.',
    receiptLocation: 'src/data/capability-registry.ts + release audit trail.',
    appliesToCapabilities: [
      'gate-tier-scoring',
      'multi-asset-scoring',
      'biomarker-failure-prediction',
      'population-funnel',
      'mechanism-divergence',
    ],
  },
];

// ---------------------------------------------------------------------------
// PUBLIC_MANDATORY_DISCLOSURES — the subset we surface on the site.
// Client-tainted disclosures stay in the internal audit trail.
// ---------------------------------------------------------------------------

export const PUBLIC_MANDATORY_DISCLOSURES: string[] = [
  'All deal figures, patient-population estimates, and cost-avoidance ranges are benchmarks derived from comparable transactions and industry data. They are not guaranteed outcomes for any specific program.',
  'CrisPRO does NOT predict individual patient outcomes and is NOT a clinical decision-support tool. Every output is intended for research and program-strategy use, not for direct patient care.',
];

// ---------------------------------------------------------------------------
// PUBLIC_PROHIBITED_CLAIMS — the commitments we publish alongside our claims.
// ---------------------------------------------------------------------------

export const PUBLIC_PROHIBITED_CLAIMS: string[] = [
  'CrisPRO does not claim to predict individual patient outcomes.',
  'CrisPRO does not claim FDA clearance or CE marking. It is not a regulated medical device.',
  'CrisPRO does not fall back to a rejected scoring variant when the primary ranker output looks unfavourable. Only the released ranker version is admissible.',
  'CrisPRO does not claim to be a clinical decision-support tool.',
];

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export const getAxis = (axis: string) => PATIENT_VECTOR_AXES.find((a) => a.axis === axis);
export const getModality = (modality: string) =>
  EVIDENCE_MODALITIES_7.find((m) => m.modality === modality);
export const getTier = (tier: string) => EVIDENCE_TIERS_4.find((t) => t.tier === tier);
export const getGuardrail = (slug: string) =>
  GOVERNANCE_GUARDRAILS.find((g) => g.slug === slug);
