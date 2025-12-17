// Genetic Testing Labs Transformation Content
// Extracted from src2/data/oracleContent.ts

import type { IndustryProblem, ValueProposition, TransformationSummary } from './biotech-transformation-content';

export const geneticTestingTransformationContent = {
  industryProblem: {
    title: 'The VUS Crisis in Genetic Testing',
    metrics: [
      { label: 'VUS rate', value: '40-60%', subtitle: 'Variants of uncertain significance' },
      { label: 'Turnaround time', value: '2-4 weeks', subtitle: 'For complex variant interpretation' },
      { label: 'Manual review cost', value: '$150', subtitle: 'Per complex variant' },
      { label: 'Reanalysis rate', value: '25%', subtitle: 'Cases requiring expert review' },
    ],
    description: 'Genetic testing labs struggle with massive VUS rates, forcing expensive manual reviews and leaving patients in limbo. Traditional variant interpretation tools fail on complex loci and non-coding variants.',
  } as IndustryProblem,
  
  valuePropositions: [
    {
      title: 'Resolve VUS with Zero-Shot Variant Interpretation',
      description: 'Instantly classify variants across coding and non-coding regions with calibrated confidence scores, eliminating manual review bottlenecks.',
      comparison: {
        traditional: [
          { label: '40-60% VUS rate', cost: '$150/variant' },
          { label: '2-4 weeks turnaround', cost: '$2M/year delays' },
          { label: 'Manual expert review', cost: '25% reanalysis' },
        ],
        oracle: [
          { label: '15% VUS rate', cost: '$5/variant' },
          { label: '24-hour turnaround', cost: '$200K/year' },
          { label: 'Automated classification', cost: '5% reanalysis' },
        ],
      },
      impact: [
        { label: 'VUS reduction', before: '40-60%', after: '15%' },
        { label: 'Turnaround time', before: '2-4 weeks', after: '24 hours' },
        { label: 'Cost per variant', before: '$150', after: '$5' },
        { label: 'Manual review load', before: '25%', after: '5%' },
      ],
    },
    {
      title: 'Handle Complex Loci with Long-Context Analysis',
      description: 'Process variants in challenging genomic regions like HLA, immunoglobulin loci, and repetitive elements with 1M-token context windows.',
      comparison: {
        traditional: [
          { label: 'Complex loci failures', cost: '80% VUS' },
          { label: 'Short-read limitations', cost: '$500K/year' },
          { label: 'Manual curation', cost: '40 hours/case' },
        ],
        oracle: [
          { label: 'Complex loci resolved', cost: '25% VUS' },
          { label: 'Long-context analysis', cost: '$50K/year' },
          { label: 'Automated processing', cost: '2 hours/case' },
        ],
      },
      impact: [
        { label: 'Complex loci success', before: '20%', after: '75%' },
        { label: 'Processing time', before: '40 hours', after: '2 hours' },
        { label: 'Cost reduction', before: 'baseline', after: '90% savings' },
        { label: 'Analyst productivity', before: '1 case/week', after: '20 cases/week' },
      ],
    },
    {
      title: 'Design Quality Controls with Forge Integration',
      description: 'Generate synthetic positive and negative controls for assay validation, ensuring robust test performance across diverse populations.',
      comparison: {
        traditional: [
          { label: 'Manual control design', cost: '$50K/panel' },
          { label: '6-month validation', cost: '$200K' },
          { label: 'Population bias', cost: '30% failure' },
        ],
        oracle: [
          { label: 'AI-designed controls', cost: '$5K/panel' },
          { label: '2-week validation', cost: '$20K' },
          { label: 'Population-aware', cost: '5% failure' },
        ],
      },
      impact: [
        { label: 'Control design cost', before: '$50K', after: '$5K' },
        { label: 'Validation time', before: '6 months', after: '2 weeks' },
        { label: 'Population coverage', before: '70%', after: '95%' },
        { label: 'Assay failure rate', before: '30%', after: '5%' },
      ],
    },
  ] as ValueProposition[],
  
  summary: {
    title: 'Complete Lab Transformation',
    metrics: [
      { label: 'VUS reduction', value: '73%', subtitle: '40-60% → 15% VUS rate' },
      { label: 'Turnaround acceleration', value: '12x', subtitle: '2-4 weeks → 24 hours' },
      { label: 'Cost reduction', value: '97%', subtitle: '$150 → $5 per variant' },
      { label: 'Throughput increase', value: '20x', subtitle: '1 → 20 cases per analyst per week' },
    ],
    description: 'Oracle transforms genetic testing from a bottlenecked, manual process into a high-throughput, automated pipeline. Labs can process 20x more cases with 97% cost reduction while dramatically improving patient outcomes through faster, more accurate results.',
  } as TransformationSummary,
};

