/**
 * Public benchmarks (source of truth for /benchmarks and /api/oracle.json).
 *
 * All values here mirror what appears elsewhere on the site (Oracle showcase,
 * ContactSection partner benefits, unifiedEvidenceData.hero.keyMetrics).
 * Do NOT diverge these numbers from those consumers without a coordinated update.
 */

export type BenchmarkCategory = 'discriminative' | 'generative' | 'business' | 'validation';
export type BenchmarkBadge =
  | 'ClinVar-Strong'
  | 'SOTA'
  | 'Validated'
  | 'Pathway-Aligned'
  | 'RCT'
  | 'Guideline';

export interface BenchmarkRecord {
  /** Stable slug — used as JSON-LD `variableMeasured` name and API id. */
  id: string;
  /** Human-readable metric name (short). */
  name: string;
  /** Numeric value + unit (matched to the value string used across the site). */
  value: string;
  /** Long-form description for the /benchmarks page + Dataset JSON-LD. */
  description: string;
  /** Public dataset name (e.g. "ClinVar", "SpliceVarDB"). */
  dataset: string;
  /** Sample size where meaningful, undefined for unbounded/derived metrics. */
  sampleSize?: number;
  /** Which family this metric belongs to. */
  category: BenchmarkCategory;
  /** Evidence badge (matches EvidenceBadge type from unifiedEvidenceData). */
  badge: BenchmarkBadge;
  /** Featured on hero of /benchmarks + dashboards. */
  featured: boolean;
  /** ISO date the metric was last verified against source. */
  lastVerified: string;
}

export const BENCHMARK_LICENSE = 'https://creativecommons.org/licenses/by/4.0/';

export const BENCHMARK_METHODOLOGY_STEPS: {
  name: string;
  text: string;
}[] = [
  {
    name: 'Assemble',
    text:
      'Pull the public validation cohort (e.g. ClinVar, SpliceVarDB) and freeze a versioned snapshot. No patient PHI enters the pipeline.',
  },
  {
    name: 'Apply',
    text:
      'Run Oracle in zero-shot mode across the frozen snapshot. Predictions are logged with model version and run_id for provenance.',
  },
  {
    name: 'Score',
    text:
      'Compute AUROC (or the relevant discriminative metric) against the ground-truth labels held out in the source dataset.',
  },
  {
    name: 'Publish',
    text:
      'Post the number here, in the Oracle showcase, and in `unifiedEvidenceData` — same value in every consumer. Any drift is a bug.',
  },
];

/**
 * Canonical benchmark records.
 *
 * Verified July 2026 against:
 *   - src/data/evidence/unified-evidence-data.ts (hero.keyMetrics + SOTA badge metrics)
 *   - src/components/sections/ContactSection.tsx (CONTACT_CONFIG.partnerBenefits)
 */
export const BENCHMARKS: BenchmarkRecord[] = [
  {
    id: 'clinvar-auroc',
    name: 'ClinVar AUROC',
    value: '95.7%',
    description:
      'Zero-shot area under the ROC across all variant classes in the ClinVar validation set. This is the top-line discriminative number for Oracle.',
    dataset: 'ClinVar',
    sampleSize: 53210,
    category: 'discriminative',
    badge: 'ClinVar-Strong',
    featured: true,
    lastVerified: '2026-07-04',
  },
  {
    id: 'vus-resolution',
    name: 'VUS resolution rate',
    value: '73.0%',
    description:
      'Rate at which Oracle produces a Supported/Consider tier call for variants that came in as Variants of Uncertain Significance in the clinical validation cohort.',
    dataset: 'Clinical validation cohort',
    sampleSize: 1000,
    category: 'business',
    badge: 'Validated',
    featured: true,
    lastVerified: '2026-07-04',
  },
  {
    id: 'splicevardb-auroc',
    name: 'SpliceVarDB AUROC',
    value: '82.5-82.6%',
    description:
      'Zero-shot AUROC on the exonic subset of SpliceVarDB. Reported as a range because the exact figure moves across the two splicing subsets we hold out.',
    dataset: 'SpliceVarDB',
    sampleSize: 4950,
    category: 'discriminative',
    badge: 'SOTA',
    featured: true,
    lastVerified: '2026-07-04',
  },
  {
    id: 'brca1-zero-shot-auroc',
    name: 'BRCA1 zero-shot AUROC',
    value: '89.1%',
    description:
      'Zero-shot AUROC on the BRCA1 saturation-mutagenesis cohort. Oracle is not trained on this cohort — this is out-of-distribution performance.',
    dataset: 'BRCA1 saturation-mutagenesis cohort',
    category: 'discriminative',
    badge: 'SOTA',
    featured: true,
    lastVerified: '2026-07-04',
  },
  {
    id: 'noncoding-snv-sota',
    name: 'Non-coding SNV AUROC (SOTA)',
    value: '95.8%',
    description:
      'State-of-the-art AUROC on the non-coding SNV subset of ClinVar. This is the strongest number in the Oracle SOTA badge.',
    dataset: 'ClinVar (non-coding SNVs)',
    category: 'discriminative',
    badge: 'SOTA',
    featured: false,
    lastVerified: '2026-07-04',
  },
  {
    id: 'coding-non-snv-sota',
    name: 'Coding non-SNV AUROC (SOTA)',
    value: '93.9%',
    description:
      'AUROC on the coding non-SNV subset of ClinVar (indels + complex variants). Held-out companion figure for the non-coding SNV number above.',
    dataset: 'ClinVar (coding non-SNVs)',
    category: 'discriminative',
    badge: 'SOTA',
    featured: false,
    lastVerified: '2026-07-04',
  },
];

export const FEATURED_BENCHMARKS = BENCHMARKS.filter((b) => b.featured);
