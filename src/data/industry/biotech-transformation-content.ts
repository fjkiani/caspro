// Biotech Transformation Content
// Extracted from src2/data/oracleContent.ts

export type IndustryProblem = {
  title: string;
  metrics: Array<{ label: string; value: string; subtitle: string }>;
  description: string;
};

export type ApproachComparison = {
  traditional: Array<{ label: string; cost: string }>;
  oracle: Array<{ label: string; cost: string }>;
};

export type BusinessImpact = {
  label: string;
  before: string;
  after: string;
};

export type ValueProposition = {
  title: string;
  description: string;
  comparison: ApproachComparison;
  impact: BusinessImpact[];
  components?: {
    primary?: any;
    secondary?: any[];
  };
};

export type TransformationSummary = {
  title: string;
  metrics: Array<{ label: string; value: string; subtitle: string }>;
  description: string;
};

export const biotechTransformationContent = {
  industryProblem: {
    title: 'The $2.6B Problem',
    metrics: [
      { label: 'Drug failure rate', value: '90%', subtitle: 'Phase I-III clinical trials' },
      { label: 'Average cost per drug', value: '$2.6B', subtitle: 'Including failures' },
      { label: 'Development timeline', value: '15 years', subtitle: 'Lab to market' },
    ],
    description: 'Most failures stem from poor target validation and unpredictable variant effects. Biotechs burn through funding on variants that were doomed from the start.',
  } as IndustryProblem,
  
  valuePropositions: [
    {
      title: 'Reduce Wet-Lab Iterations by Triaging Variants',
      description: 'Pre-screen thousands of variants with calibrated zero-shot scores before expensive wet-lab validation.',
      comparison: {
        traditional: [
          { label: 'Screen 1,000 variants', cost: '$500K' },
          { label: '6 months wet-lab', cost: '$2M' },
          { label: '~50 promising hits', cost: '5% success' },
        ],
        oracle: [
          { label: 'Pre-screen 1,000 variants', cost: '$1K' },
          { label: 'Test top 200 variants', cost: '$400K' },
          { label: '~146 promising hits', cost: '73% success' },
        ],
      },
      impact: [
        { label: 'Time to first hit', before: '6 months', after: '2 weeks' },
        { label: 'Success rate', before: '5%', after: '73%' },
        { label: 'Cost per hit', before: '$50K', after: '$2.7K' },
        { label: 'Runway extension', before: 'baseline', after: '+18 months' },
      ],
    },
    {
      title: 'Prioritize Constructs Using Explainable Evidence',
      description: 'Use SAE-derived features (exon/intron boundaries, TF motifs) to rank construct risk and avoid failures.',
      comparison: {
        traditional: [
          { label: 'Test 50 constructs', cost: '$2.5M' },
          { label: '20% success rate', cost: '10 hits' },
          { label: '40 failed constructs', cost: '$2M waste' },
        ],
        oracle: [
          { label: 'Risk-rank constructs', cost: '$5K' },
          { label: 'Test top 12 constructs', cost: '$600K' },
          { label: '83% success rate', cost: '10 hits' },
        ],
      },
      impact: [
        { label: 'Constructs tested', before: '50', after: '12' },
        { label: 'Success rate', before: '20%', after: '83%' },
        { label: 'Failed constructs avoided', before: '40 failures', after: '2 failures' },
        { label: 'Cost savings', before: 'baseline', after: '$1.9M' },
      ],
    },
    {
      title: 'Guide Sequence Generation with Predictable Scaling',
      description: 'Trade compute for design quality with predictable AUROC scaling from draft to production quality.',
      comparison: {
        traditional: [
          { label: '20 design iterations', cost: '$1M' },
          { label: '6 months to candidate', cost: '$3M' },
          { label: 'Random success', cost: 'Unpredictable' },
        ],
        oracle: [
          { label: '3 design iterations', cost: '$150K' },
          { label: '2 weeks to candidate', cost: '$200K' },
          { label: '91% AUROC success', cost: 'Predictable' },
        ],
      },
      impact: [
        { label: 'Design iterations', before: '20', after: '3' },
        { label: 'Time to candidate', before: '6 months', after: '2 weeks' },
        { label: 'Success predictability', before: 'Random', after: '91% AUROC' },
        { label: 'R&D efficiency', before: 'baseline', after: '+400%' },
      ],
    },
  ] as ValueProposition[],
  
  summary: {
    title: 'Total Transformation Impact',
    metrics: [
      { label: 'Cost savings per program', value: '$5.5M', subtitle: 'Variant triaging + construct de-risking' },
      { label: 'Faster to first hit', value: '18x', subtitle: '6 months → 2 weeks' },
      { label: 'Success rate', value: '73%', subtitle: 'vs 5% industry average' },
      { label: 'Extended runway', value: '+2 years', subtitle: 'From cost savings' },
    ],
    description: 'Oracle transforms biotech R&D from a high-risk gamble into a predictable engineering discipline. Instead of burning through funding on doomed variants, biotechs can focus resources on the most promising candidates with scientific confidence.',
  } as TransformationSummary,
};

