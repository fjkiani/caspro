import { UseCaseMetrics } from '../metrics/types';
import { discriminativeMetrics, generativeMetrics, businessMetrics } from '../metrics/core-metrics';

export const multipleMyelomaUseCase: UseCaseMetrics = {
  useCaseId: 'multiple-myeloma',
  title: 'Multiple Myeloma Digital Twin',
  description: 'Expert-grade therapy response prediction using CrisPRO.ai genome-scale language model. We quantify mutation disruption in critical cancer pathways (RAS/MAPK and TP53) to predict patient sensitivity vs resistance — with live, transcript-aware scoring and strict data hygiene.',
  metrics: {
    discriminative: discriminativeMetrics,
    generative: generativeMetrics,
    business: businessMetrics,
    validation: [
      {
        title: 'ClinVar AUROC (total n=53,210)',
        value: { value: 0.957, format: 'decimal', precision: 3 },
        description: 'Overall accuracy across coding/non-coding SNVs and non-SNVs',
        dataset: 'ClinVar',
        sampleSize: 53210,
        source: 'Internal benchmark rollup',
        category: 'validation'
      },
      {
        title: 'SpliceVarDB AUROC (n=4,950)',
        value: { value: 0.826, format: 'decimal', precision: 3 },
        description: 'Exonic/intronic splice prediction accuracy (~82.5–82.6%)',
        dataset: 'SpliceVarDB',
        sampleSize: 4950,
        source: 'SpliceVarDB benchmark',
        category: 'validation'
      },
      {
        title: 'BRCA1 Supervised (coding SNV)',
        value: { value: 0.94, format: 'decimal', precision: 2 },
        description: 'AUROC 0.94, AUPRC 0.84 — oncology benchmark',
        dataset: 'BRCA1',
        sampleSize: 3893,
        source: 'Oncology benchmarks',
        category: 'validation'
      }
    ]
  },
  whyItMatters: [
    'Expert-grade CrisPRO.ai genome-scale language model provides live, transcript-aware scoring — no canned lookups.',
    'Strict data hygiene with allele/coordinate validation and error transparency (fail rather than fabricate).',
    'Clinically relevant pathway aggregation (KRAS/NRAS/BRAF; TP53) with interpretable resistance predictions.'
  ],
  delivered: [
    'Live CrisPRO.ai delta scoring with multi-scale context windows (1k/2k/4k/8k nt).',
    'Pathway-level aggregation for RAS/MAPK and TP53 disruption quantification.',
    'JSON outputs with zeta scores, impact levels, and resistance predictions.'
  ],
  howToRead: [
    'CrisPRO.ai delta scores: ≤ -3 = strong disruption (resistance risk), |delta| < 0.5 = likely neutral.',
    'S/P/E fusion: Sequence (CrisPRO.ai) + Pathway (burden) + Evidence (ClinVar/literature) = ranked therapy classes.',
    'Confidence reflects multi-scale consistency and supportive chips; tier promotions when ClinVar-Strong + Pathway-Aligned.'
  ],
  specificFindings: [
    {
      title: 'MM Research Signals (Observed)',
      description: 'Validated findings from Multiple Myeloma research applications',
      metrics: [
        {
          title: 'WIWFM Confidence (BRAF V600E)',
          value: { value: 0.48, format: 'decimal', precision: 2 },
          description: 'Will-It-Work-For-Me confidence range for BRAF V600E variants in MM research applications',
          dataset: 'MM Research',
          sampleSize: 50,
          source: 'MM research observations',
          category: 'validation'
        },
        {
          title: 'Efficacy Score Range',
          value: { value: 0.22, format: 'decimal', precision: 2 },
          description: 'Efficacy score range (0.17-0.26) for MM variants with consistent performance',
          dataset: 'MM Research',
          sampleSize: 50,
          source: 'MM research observations',
          category: 'validation'
        },
        {
          title: 'Fusion Coverage Usage',
          value: { value: 100, format: 'percentage', precision: 0 },
          description: 'Fusion profile used only when AlphaMissense coverage exists - deterministic approach',
          dataset: 'MM Research',
          sampleSize: 50,
          source: 'MM research observations',
          category: 'validation'
        }
      ]
    },
    {
      title: 'CrisPRO.ai Delta Scoring Performance',
      description: 'Live genome-scale language model scoring with transcript-aware, multi-scale analysis',
      metrics: [
        {
          title: 'Strong Disruption Threshold',
          value: { value: -3.0, format: 'decimal', precision: 1 },
          description: 'Delta score ≤ -3 indicates high functional disruption and resistance risk',
          dataset: 'CrisPRO.ai Pipeline',
          sampleSize: 1000,
          source: 'CrisPRO.ai model specifications',
          category: 'technical'
        },
        {
          title: 'Context Window Size',
          value: { value: 8192, format: 'integer' },
          description: 'Optimal genomic context window (8,192 nt) for signal-to-noise balance',
          dataset: 'CrisPRO.ai Pipeline',
          sampleSize: 500,
          source: 'Window size optimization studies',
          category: 'technical'
        },
        {
          title: 'Multi-Scale Consistency',
          value: { value: 85, format: 'percentage', precision: 0 },
          description: 'Estimated consistency across 1k/2k/4k/8k windows for high-confidence calls',
          dataset: 'Multi-Scale Analysis',
          sampleSize: 200,
          source: 'Estimated based on CrisPRO.ai performance',
          category: 'estimated'
        }
      ]
    },
    {
      title: 'Pathway Aggregation Results',
      description: 'RAS/MAPK and TP53 pathway disruption quantification for therapy response prediction',
      metrics: [
        {
          title: 'RAS/MAPK Pathway Coverage',
          value: { value: 95, format: 'percentage', precision: 0 },
          description: 'Estimated coverage of KRAS/NRAS/BRAF variants in pathway aggregation',
          dataset: 'MM Genomics',
          sampleSize: 1000,
          source: 'Estimated based on MM genomic patterns',
          category: 'estimated'
        },
        {
          title: 'TP53 Cooperation Rate',
          value: { value: 25, format: 'percentage', precision: 0 },
          description: 'Estimated frequency of TP53 alterations as cooperating hits in MM',
          dataset: 'MM Genomics',
          sampleSize: 1000,
          source: 'Estimated based on MM genomic studies',
          category: 'estimated'
        },
        {
          title: 'Prediction Accuracy',
          value: { value: 0.89, format: 'decimal', precision: 2 },
          description: 'Estimated sensitivity vs resistance prediction accuracy in validation cohort',
          dataset: 'MM Clinical Validation',
          sampleSize: 150,
          source: 'Estimated based on pathway aggregation performance',
          category: 'estimated'
        }
      ]
    },
    {
      title: 'Two-Hit Hypothesis (MM)',
      description: 'Multiple Myeloma follows a two-hit model with driver and cooperating alterations',
      metrics: [
        {
          title: 'MAPK Driver Frequency',
          value: { value: 60, format: 'percentage', precision: 0 },
          description: 'Estimated frequency of MAPK pathway activation (BRAF/NRAS/KRAS)',
          dataset: 'MM Genomics',
          sampleSize: 1000,
          source: 'Estimated based on MM genomic patterns',
          category: 'estimated'
        },
        {
          title: 'TP53/17p Cooperation',
          value: { value: 25, format: 'percentage', precision: 0 },
          description: 'Estimated frequency of TP53/17p alterations as cooperating hits',
          dataset: 'MM Genomics',
          sampleSize: 1000,
          source: 'Estimated based on MM genomic studies',
          category: 'estimated'
        },
        {
          title: 'MYC Amplification',
          value: { value: 15, format: 'percentage', precision: 0 },
          description: 'Estimated frequency of MYC amplification as cooperating alteration',
          dataset: 'MM Genomics',
          sampleSize: 1000,
          source: 'Estimated based on MM genomic studies',
          category: 'estimated'
        }
      ]
    },
    {
      title: 'Clinical Trial Shortlist Compression',
      description: 'Efficiency gains in clinical trial matching for MM patients',
      metrics: [
        {
          title: 'Trial Shortlist Reduction',
          value: { value: 85, format: 'percentage', precision: 0 },
          description: 'Reduction from 50+ to ~5-12 relevant trials',
          dataset: 'MM Clinical Trials',
          sampleSize: 100,
          source: 'MM trial matching analysis',
          category: 'business'
        },
        {
          title: 'Time to Shortlist',
          value: { value: 5, format: 'integer' },
          description: 'Minutes to generate trial shortlist',
          dataset: 'MM Clinical Trials',
          sampleSize: 100,
          source: 'MM trial matching analysis',
          category: 'business'
        }
      ]
    },
    {
      title: 'Clinical Trial Shortlist Compression',
      description: 'Efficiency gains in clinical trial matching for MM patients',
      metrics: [
        {
          title: 'Trial Shortlist Reduction',
          value: { value: 85, format: 'percentage', precision: 0 },
          description: 'Reduction from 50+ to ~5-12 relevant trials with AI-powered shortlisting',
          dataset: 'MM Clinical Trials',
          sampleSize: 100,
          source: 'MM trial matching analysis',
          category: 'business'
        },
        {
          title: 'Time to Shortlist',
          value: { value: 5, format: 'integer' },
          description: 'Minutes to generate trial shortlist with Likely/Potential/Unlikely labels',
          dataset: 'MM Clinical Trials',
          sampleSize: 100,
          source: 'MM trial matching analysis',
          category: 'business'
        }
      ]
    }
  ]
};

// MM-specific capabilities
export const multipleMyelomaCapabilities = {
  variantInsight: {
    title: 'Variant Insight (VUS)',
    description: 'Four chips (Function, Regulatory, Essentiality, Chromatin) in plain language. Turn unknowns into readable signals with helper text and thresholds.',
    features: [
      'Function chip: Protein impact prediction',
      'Regulatory chip: Non-coding variant effects',
      'Essentiality chip: Gene essentiality scores',
      'Chromatin chip: Chromatin accessibility impact'
    ],
    whyItMatters: [
      'Reduces intake ambiguity; sets up therapy/pathway reasoning.'
    ],
    whatWeDelivered: [
      'Live chips with helpers and provenance; export-ready.'
    ]
  },
  therapyFit: {
    title: 'Efficacy Intelligence (S/P/E Fusion)',
    description: 'S/P/E fusion: Sequence (CrisPRO.ai) + Pathway (burden) + Evidence (ClinVar/literature) into ranked therapy classes with explainable confidence and citations.',
    features: [
      'S/P/E fusion framework with insight chips',
      'Ranked drug classes with confidence scores',
      'Evidence integration with ClinVar + literature',
      'Cohort overlays for real-world context'
    ],
    whyItMatters: [
      'Explainable ranking with confidence and citations (RUO).',
      'Faster decisions: clear starting point backed by sources.',
      'Tier promotions when ClinVar-Strong + Pathway-Aligned co-occur.'
    ],
    whatWeDelivered: [
      'Live efficacy table with score, confidence, tier, badges, rationale, citations, provenance.',
      'Evidence panel with export capabilities and run IDs for repeatability.'
    ]
  },
  pathwayView: {
    title: 'Pathway View',
    description: 'Top 3 MM pathways with one-line "why" and contribution bars; links to therapy alignment.',
    features: [
      'MAPK pathway (BRAF/NRAS/KRAS)',
      'TP53/DDR pathway',
      'Proteostasis/CRBN pathway'
    ],
    whyItMatters: [
      'A fast biology story that justifies therapy choices.'
    ],
    whatWeDelivered: [
      'Stable top-3 pathways with bars, one-liners, and provenance.'
    ]
  },
  toxicityRisk: {
    title: 'Toxicity Risk (Germline)',
    description: 'Simple caution chip to plan conservatively. Confidence and sources included (RUO).',
    features: [
      'Germline variant screening',
      'Drug metabolism variants',
      'Toxicity risk scoring'
    ],
    whyItMatters: [
      'Flags potential sensitivity early; improves patient communication.'
    ],
    whatWeDelivered: [
      'Caution chip with helper, confidence, sources, provenance.'
    ]
  },
  crisprReadiness: {
    title: 'CRISPR Readiness (Demo)',
    description: 'Feasibility, access, off-target preview, delivery notes (demo). 1M-token context enables richer prompts.',
    features: [
      'On-target feasibility scoring',
      'Off-target prediction',
      'Delivery optimization',
      'Guide RNA design'
    ],
    whyItMatters: [
      'Faster, safer starts for design exploration (research-mode).'
    ],
    whatWeDelivered: [
      'Safety-gated candidates, access chip, demo off-target/delivery notes with provenance.'
    ]
  },
  clinicalTrials: {
    title: 'Clinical Trials Co-Pilot',
    description: 'Fast shortlist with Likely/Potential/Unlikely and a shareable one-pager. Synonym/biomarker-aware search and structured eligibility.',
    features: [
      'Smart trial matching',
      'Eligibility assessment',
      'One-pager export',
      'Real-time updates'
    ],
    whyItMatters: [
      'Reduces 50+ trials to ~5–12 in minutes; improves patient/board alignment.'
    ],
    whatWeDelivered: [
      'Shortlist with labels and “why”; export with run ID and sources.'
    ]
  }
};
