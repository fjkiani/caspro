/**
 * Glossary source of truth for /glossary and the DefinedTermSet JSON-LD emitted
 * on that page. 31 terms across 5 categories: variant, ai-methodology, clinical,
 * oncology, platform.
 *
 * `short` is what goes into DefinedTerm.description in the JSON-LD (kept ≤30
 * words). `long` is the full page copy under the term. Do not diverge them —
 * they should agree in substance.
 */

export type GlossaryCategory =
  | 'variant'
  | 'clinical'
  | 'ai-methodology'
  | 'oncology'
  | 'platform';

export interface GlossaryTerm {
  slug: string;
  name: string;
  termCode?: string;
  category: GlossaryCategory;
  short: string;
  long: string;
  seeAlso?: string[];
  externalRef?: { label: string; url: string };
}

export const GLOSSARY_CATEGORY_ORDER: GlossaryCategory[] = [
  'variant',
  'ai-methodology',
  'clinical',
  'oncology',
  'platform',
];

export const GLOSSARY_CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  variant: 'Variants',
  'ai-methodology': 'AI methodology',
  clinical: 'Clinical evidence',
  oncology: 'Oncology mechanism',
  platform: 'CrisPRO platform',
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ── Variants ────────────────────────────────────────────────────────────
  {
    slug: 'vus',
    name: 'Variant of Uncertain Significance (VUS)',
    termCode: 'VUS',
    category: 'variant',
    short:
      'A genetic variant whose clinical significance cannot be classified as pathogenic or benign given current evidence.',
    long:
      'A Variant of Uncertain Significance is a genetic variant where the available evidence is insufficient to classify it as pathogenic or benign under the ACMG/AMP guidelines. VUS calls block downstream clinical action; resolving them is the highest-leverage step in a variant-interpretation workflow.',
    seeAlso: ['pathogenic-variant', 'benign-variant', 'acmg-amp-guidelines'],
    externalRef: { label: 'ClinVar VUS documentation', url: 'https://www.ncbi.nlm.nih.gov/clinvar/docs/clinsig/' },
  },
  {
    slug: 'pathogenic-variant',
    name: 'Pathogenic variant',
    category: 'variant',
    short:
      'A genetic variant classified as disease-causing under the ACMG/AMP framework.',
    long:
      'A pathogenic variant is a genetic variant whose supporting evidence — segregation, functional, computational, population, allelic — meets the ACMG/AMP pathogenic threshold. Pathogenic calls flow directly into downstream clinical action.',
    seeAlso: ['vus', 'benign-variant', 'acmg-amp-guidelines'],
  },
  {
    slug: 'benign-variant',
    name: 'Benign variant',
    category: 'variant',
    short:
      'A genetic variant classified as not disease-causing under the ACMG/AMP framework.',
    long:
      'A benign variant is a variant with sufficient evidence — high population frequency, no functional impact, non-segregating — to be classified as not disease-causing under ACMG/AMP. Benign calls unblock downstream workflows the same way pathogenic calls do.',
    seeAlso: ['vus', 'pathogenic-variant', 'acmg-amp-guidelines'],
  },
  {
    slug: 'snv',
    name: 'Single Nucleotide Variant (SNV)',
    termCode: 'SNV',
    category: 'variant',
    short:
      'A change in a single nucleotide base pair at a specific genomic position.',
    long:
      'A Single Nucleotide Variant is a change in one nucleotide base (A/C/G/T) at a specific genomic position, versus a reference. SNVs are the most common variant class and dominate the ClinVar validation set.',
    seeAlso: ['coding-variant', 'noncoding-variant'],
  },
  {
    slug: 'coding-variant',
    name: 'Coding variant',
    category: 'variant',
    short:
      'A variant that falls within a protein-coding region of the genome.',
    long:
      'A coding variant is a variant whose genomic position falls within a protein-coding region (an exon). Coding variants can alter the amino-acid sequence directly and often carry higher clinical priors than non-coding variants of comparable computational scores.',
    seeAlso: ['noncoding-variant', 'snv', 'splice-variant'],
  },
  {
    slug: 'noncoding-variant',
    name: 'Non-coding variant',
    category: 'variant',
    short:
      'A variant that falls outside protein-coding regions (introns, regulatory regions, UTRs).',
    long:
      'A non-coding variant is a variant in an intron, regulatory element, UTR, or intergenic region — anywhere outside a protein-coding exon. Interpretation is harder because the mechanism-to-phenotype path is longer. Oracle reports 95.8% AUROC on the ClinVar non-coding SNV subset.',
    seeAlso: ['coding-variant', 'snv', 'splice-variant'],
  },
  {
    slug: 'splice-variant',
    name: 'Splice variant',
    category: 'variant',
    short:
      'A variant that alters mRNA splicing, typically by changing donor/acceptor sites or nearby regulatory sequence.',
    long:
      'A splice variant is a variant that changes how the pre-mRNA is spliced — most commonly by disrupting the canonical GT-AG donor/acceptor sites or nearby regulatory sequence. Splice variants can silently phenocopy pathogenic loss-of-function even when the DNA change looks benign. Oracle reports 82.5–82.6% AUROC on SpliceVarDB.',
    seeAlso: ['coding-variant', 'noncoding-variant', 'splicevardb'],
  },

  // ── AI methodology ─────────────────────────────────────────────────────
  {
    slug: 'zero-shot-prediction',
    name: 'Zero-shot prediction',
    category: 'ai-methodology',
    short:
      'A model prediction produced without any task-specific fine-tuning on the validation dataset.',
    long:
      'Zero-shot prediction means the model has not been trained on the labels of the validation set — the number reported is out-of-distribution performance, not held-out training loss. When Oracle reports 89.1% AUROC on BRCA1, that is zero-shot: the model did not see BRCA1 labels.',
    seeAlso: ['discriminative-ai', 'auroc'],
  },
  {
    slug: 'auroc',
    name: 'AUROC',
    termCode: 'AUROC',
    category: 'ai-methodology',
    short:
      'Area under the receiver operating characteristic curve — a threshold-independent discriminative performance metric.',
    long:
      'AUROC (Area Under the Receiver Operating Characteristic curve) measures how well a model separates positives from negatives across every decision threshold. 0.5 is chance; 1.0 is perfect. AUROC is the primary discriminative metric CrisPRO publishes.',
    seeAlso: ['zero-shot-prediction', 'discriminative-ai'],
  },
  {
    slug: 'discriminative-ai',
    name: 'Discriminative AI',
    category: 'ai-methodology',
    short:
      'AI whose primary output is a classification or scoring decision, not new content.',
    long:
      'Discriminative AI answers "which class does this belong to" or "how strong is this signal". Oracle is discriminative: given a variant, it returns a pathogenicity call plus a confidence tier. This is distinct from generative AI, which produces new content (a protein sequence, a molecule, a clinical narrative).',
    seeAlso: ['auroc', 'zero-shot-prediction', 'oracle'],
  },

  // ── Clinical evidence ──────────────────────────────────────────────────
  {
    slug: 'evidence-tier',
    name: 'Evidence tier',
    category: 'clinical',
    short:
      'The Supported / Consider / Insufficient tiering CrisPRO applies to every recommendation.',
    long:
      'Evidence tier is the confidence label attached to every CrisPRO output. Supported means the evidence is strong and the recommendation is defensible; Consider means the evidence is directional but weaker; Insufficient means the recommendation is not carried by the evidence. Every consumer of CrisPRO output reads the tier alongside the value.',
    seeAlso: ['evidence-badge'],
  },
  {
    slug: 'evidence-badge',
    name: 'Evidence badge',
    category: 'clinical',
    short:
      'A per-metric provenance label (ClinVar-Strong, SOTA, RCT, Guideline, Pathway-Aligned, Validated).',
    long:
      'Evidence badges are per-metric provenance labels: ClinVar-Strong (validated against ClinVar), SOTA (state-of-the-art on a public benchmark), RCT (backed by a randomized controlled trial), Guideline (aligned with NCCN/ASCO), Pathway-Aligned (grounded in the mechanism graph), Validated (clinical-cohort validated). Every number on the site inherits a badge.',
    seeAlso: ['evidence-tier'],
  },
  {
    slug: 'clinvar',
    name: 'ClinVar',
    category: 'clinical',
    short:
      'The NIH public archive of variant-disease relationships and clinical significance assertions.',
    long:
      'ClinVar is the NIH-maintained public archive of variant-disease relationships and clinical significance assertions. It is the primary public validation set for pathogenicity prediction. Oracle reports 95.7% AUROC on the ClinVar validation set (n=53,210).',
    seeAlso: ['splicevardb', 'auroc'],
    externalRef: { label: 'ClinVar home', url: 'https://www.ncbi.nlm.nih.gov/clinvar/' },
  },
  {
    slug: 'splicevardb',
    name: 'SpliceVarDB',
    category: 'clinical',
    short:
      'A public benchmark database for splice-affecting variants.',
    long:
      'SpliceVarDB is a public benchmark database of experimentally validated splice-affecting variants. It is used as an out-of-distribution validation set for splice-variant callers. Oracle reports 82.5–82.6% AUROC on the exonic subset (n=4,950).',
    seeAlso: ['splice-variant', 'clinvar', 'auroc'],
  },
  {
    slug: 'acmg-amp-guidelines',
    name: 'ACMG/AMP guidelines',
    category: 'clinical',
    short:
      'The 2015 ACMG + AMP joint guidelines for variant classification in clinical labs.',
    long:
      'The ACMG/AMP guidelines (2015) are the joint standards from the American College of Medical Genetics and the Association for Molecular Pathology for classifying variants as pathogenic, likely-pathogenic, VUS, likely-benign, or benign. They are the de facto framework in clinical labs.',
    seeAlso: ['vus', 'pathogenic-variant', 'benign-variant'],
  },
  {
    slug: 'grade-3-adverse-event',
    name: 'Grade-3 adverse event',
    category: 'clinical',
    short:
      'A CTCAE grade-3 event — severe or medically significant but not immediately life-threatening.',
    long:
      'A grade-3 adverse event under CTCAE (Common Terminology Criteria for Adverse Events) is severe or medically significant, typically requiring hospitalization or urgent intervention, but not immediately life-threatening. Grade-3 events are the primary endpoint the Toxicity Risk Co-Pilot is scored against.',
    seeAlso: ['immune-related-adverse-event'],
  },

  // ── Oncology mechanism ─────────────────────────────────────────────────
  {
    slug: 'mechanism-alignment',
    name: 'Mechanism alignment',
    category: 'oncology',
    short:
      'Recommending a therapy because it fits the tumor’s biology, not because it matches a diagnosis code.',
    long:
      'Mechanism alignment is the CrisPRO thesis that a therapy should be ranked by how well it targets the residual biology of the tumor — the variant map, the pathway state, the microenvironment — rather than by keyword match to a diagnosis code. Every Co-Pilot ranking is grounded in a mechanism-alignment object.',
    seeAlso: ['pathway-alignment', 'synthetic-lethality'],
  },
  {
    slug: 'pathway-alignment',
    name: 'Pathway alignment',
    category: 'oncology',
    short:
      'Projecting a patient’s variant + expression state onto a curated pathway graph to surface druggable dependencies.',
    long:
      'Pathway alignment is the mechanism substrate that sits under every downstream Co-Pilot. It projects the patient state onto a curated pathway graph (KEGG + Reactome + WikiPathways + drug-target databases) and scores the residual dependencies — which pathways hold the tumor state together and are therefore druggable.',
    seeAlso: ['mechanism-alignment', 'synthetic-lethality'],
  },
  {
    slug: 'synthetic-lethality',
    name: 'Synthetic lethality',
    category: 'oncology',
    short:
      'Two genetic perturbations that are tolerable individually but lethal in combination — a classic mechanism-first cancer target.',
    long:
      'Synthetic lethality is the phenomenon where two individually tolerable genetic perturbations become lethal in combination. The canonical clinical example is BRCA-mutant tumors and PARP inhibitors. Pathway alignment surfaces synthetic-lethality opportunities as pair-wise dependency coverage.',
    seeAlso: ['pathway-alignment', 'mechanism-alignment'],
  },
  {
    slug: 'tumor-microenvironment',
    name: 'Tumor microenvironment (TME)',
    termCode: 'TME',
    category: 'oncology',
    short:
      'The non-tumor cells and matrix surrounding a tumor — a major driver of response and resistance.',
    long:
      'The tumor microenvironment is the ecosystem around the tumor — immune cells, fibroblasts, vasculature, extracellular matrix. TME state is a major driver of response to immunotherapy in particular, and is a first-class feature in the Immunotherapy Co-Pilot response + IRAE calls.',
    seeAlso: ['immune-related-adverse-event'],
  },
  {
    slug: 'immune-related-adverse-event',
    name: 'Immune-related adverse event (irAE)',
    termCode: 'irAE',
    category: 'oncology',
    short:
      'An adverse event driven by immune-checkpoint therapy — organ-system autoimmunity triggered by the therapy.',
    long:
      'An immune-related adverse event is an adverse event caused by immune-checkpoint therapy activating the patient’s immune system against non-tumor tissue (thyroiditis, colitis, pneumonitis, hepatitis, etc.). irAE risk is the second half of the Immunotherapy Co-Pilot dual call.',
    seeAlso: ['tumor-microenvironment', 'grade-3-adverse-event'],
  },
  {
    slug: 'pharmacogenomics',
    name: 'Pharmacogenomics (PGx)',
    termCode: 'PGx',
    category: 'oncology',
    short:
      'The study of how germline variation affects drug metabolism and response.',
    long:
      'Pharmacogenomics is the study of how germline variation (DPYD, UGT1A1, TPMT, NUDT15, CYP2D6, CYP2C19, etc.) affects drug metabolism, efficacy, and toxicity. PGx is a first-class hard-filter input to Chemo Co-Pilot, Therapy Fit, and Toxicity Risk.',
    seeAlso: ['grade-3-adverse-event'],
  },
  {
    slug: 'metastatic-cascade',
    name: 'Metastatic cascade',
    category: 'oncology',
    short:
      'The sequence of biological steps a tumor cell must clear to establish a distant metastasis.',
    long:
      'The metastatic cascade is the sequence a tumor cell must clear to establish a distant metastasis: invasion, intravasation, survival in circulation, extravasation, dormancy, colonization. Preventing metastasis by intercepting the cascade is the top-level CrisPRO thesis.',
    seeAlso: ['mechanism-alignment'],
  },

  // ── CrisPRO platform ───────────────────────────────────────────────────
  {
    slug: 'target-lock',
    name: 'Target Lock',
    category: 'platform',
    short:
      'The CrisPRO workflow that hands a validated target + rationale over to Forge for therapeutic design.',
    long:
      'Target Lock is the CrisPRO workflow that promotes a candidate target from "surfaced by pathway alignment" to "ready for therapeutic design". It packages the target rationale, evidence tier, and companion features, and hands the packet to Forge.',
    seeAlso: ['oracle', 'forge', 'pathway-alignment'],
  },
  {
    slug: 'oracle',
    name: 'Oracle',
    category: 'platform',
    short:
      'CrisPRO’s discriminative AI for variant interpretation and mechanism scoring.',
    long:
      'Oracle is the CrisPRO discriminative-AI intelligence. It reads a variant call and returns a pathogenicity tier plus mechanism score, with full JSON-LD provenance. Oracle is the front door of the Co-Pilot — its outputs feed pathway alignment, therapy fit, and trial matching.',
    seeAlso: ['forge', 'scribe', 'discriminative-ai'],
  },
  {
    slug: 'forge',
    name: 'Forge',
    category: 'platform',
    short:
      'CrisPRO’s generative AI for in-silico therapeutic design.',
    long:
      'Forge is the CrisPRO generative-AI intelligence. Given a target packet from Target Lock, it proposes therapeutic candidates (small molecule, biologic, gene therapy) and scores each candidate’s mechanism alignment against the target rationale.',
    seeAlso: ['oracle', 'scribe', 'target-lock'],
  },
  {
    slug: 'scribe',
    name: 'Scribe',
    category: 'platform',
    short:
      'CrisPRO’s AI for auditable clinical narrative synthesis.',
    long:
      'Scribe is the CrisPRO clinical-narrative intelligence. It synthesizes the structured briefing + Co-Pilot recommendations into a note the physician can sign, with inline citations back to the source lines in the chart.',
    seeAlso: ['oracle', 'forge', 'co-pilot'],
  },
  {
    slug: 'boltz-2',
    name: 'Boltz-2',
    category: 'platform',
    short:
      'The structure-prediction engine used inside Forge for candidate scoring.',
    long:
      'Boltz-2 is the structure-prediction engine CrisPRO uses inside the Forge candidate-scoring loop. Predicted structures ground the mechanism-alignment score against the target rationale, providing a physical prior on the design output.',
    seeAlso: ['forge'],
  },
  {
    slug: 'proof-ledger',
    name: 'Proof Ledger',
    category: 'platform',
    short:
      'The append-only record of every model prediction — model version, features, output, and tier.',
    long:
      'The Proof Ledger is the append-only record of every model prediction the CrisPRO Co-Pilot emits. Each entry carries the model version, feature vector, output, tier, badges, and run_id. It is what makes CrisPRO auditable: every recommendation is traceable back to the exact model call.',
    seeAlso: ['evidence-tier', 'evidence-badge'],
  },
  {
    slug: 'co-pilot',
    name: 'Oncology Co-Pilot',
    category: 'platform',
    short:
      'The composite CrisPRO workflow that combines Oracle, Forge, and Scribe for a single patient case.',
    long:
      'The Oncology Co-Pilot is the composite workflow — Oracle for interpretation, pathway alignment for mechanism, Therapy Fit / Chemo / Immunotherapy for ranking, Scribe for narrative — that operates on one patient case end-to-end. Each downstream call inherits the mechanism substrate from the upstream call.',
    seeAlso: ['oracle', 'forge', 'scribe'],
  },
  {
    slug: 'r-and-d-acceleration',
    name: 'R&D acceleration',
    category: 'platform',
    short:
      'The CrisPRO R&D output cadence — 36× faster campaign iteration, 60% time reduction versus baseline.',
    long:
      'R&D acceleration refers to the CrisPRO Validated-badge metric: 36× faster campaign iteration, 60% time reduction compared to a baseline in-house workflow. The number comes from partner-site pilots and is published as part of the Validated badge in the evidence ledger.',
    seeAlso: ['evidence-badge', 'forge'],
  },
];

/**
 * Grouped, ordered view for the /glossary page (categories in the canonical order).
 */
export const GLOSSARY_BY_CATEGORY: {
  category: GlossaryCategory;
  label: string;
  terms: GlossaryTerm[];
}[] = GLOSSARY_CATEGORY_ORDER.map((category) => ({
  category,
  label: GLOSSARY_CATEGORY_LABELS[category],
  terms: GLOSSARY_TERMS.filter((t) => t.category === category),
}));

export const GLOSSARY_TERM_MAP: Record<string, GlossaryTerm> = Object.fromEntries(
  GLOSSARY_TERMS.map((t) => [t.slug, t]),
);
