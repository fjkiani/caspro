// Clinical Oncology Transformation Content
// Extracted from src2/data/oracleContent.ts

import type { IndustryProblem, ValueProposition, TransformationSummary } from './biotech-transformation-content';

export const clinicalTransformationContent = {
  industryProblem: {
    title: 'The VUS Crisis in Precision Oncology',
    metrics: [
      { label: 'VUS rate', value: '40%', subtitle: 'Variants of unknown significance' },
      { label: 'Treatment selection time', value: '18 months', subtitle: 'From diagnosis to optimal therapy' },
      { label: 'Cost per patient workup', value: '$150K', subtitle: 'Including failed approaches' },
    ],
    description: 'Half of all genetic variants remain unactionable, forcing clinicians to make treatment decisions without clear evidence. Patients suffer while doctors navigate uncertainty with limited tools.',
  } as IndustryProblem,
  
  valuePropositions: [
    {
      title: 'Resolve VUS Ambiguity with Zero-Shot Clinical Predictions',
      description: 'Transform uncertain variants into actionable clinical decisions using calibrated pathogenicity scores and explainable evidence.',
      comparison: {
        traditional: [
          { label: 'Manual literature review', cost: '40 hours' },
          { label: 'Family studies coordination', cost: '$25K' },
          { label: 'Functional assays (if available)', cost: '$50K' },
          { label: '50% remain VUS', cost: 'No action' },
        ],
        oracle: [
          { label: 'Zero-shot prediction', cost: '5 minutes' },
          { label: 'SAE explainable features', cost: 'Included' },
          { label: 'Calibrated confidence scores', cost: 'Included' },
          { label: '73% VUS resolved', cost: 'Actionable' },
        ],
      },
      impact: [
        { label: 'VUS resolution rate', before: '50%', after: '73%' },
        { label: 'Time to clinical decision', before: '6 weeks', after: '1 day' },
        { label: 'Cost per variant analysis', before: '$75K', after: '$50' },
        { label: 'Patient treatment delay', before: '6 weeks', after: 'Same day' },
      ],
    },
    {
      title: 'Predict Tumor Evolution and Resistance Patterns',
      description: 'Anticipate likely mutation paths and design preemptive combination therapies before resistance develops.',
      comparison: {
        traditional: [
          { label: 'React to resistance', cost: 'After failure' },
          { label: 'Sequential monotherapies', cost: '$200K/year' },
          { label: 'Limited resistance insight', cost: 'Guesswork' },
          { label: 'Average 6-month response', cost: 'Then resistance' },
        ],
        oracle: [
          { label: 'Predict resistance paths', cost: 'Before treatment' },
          { label: 'Combination therapy design', cost: '$250K/year' },
          { label: 'Evolution pathway mapping', cost: 'Systematic' },
          { label: 'Extended response duration', cost: '+6 months' },
        ],
      },
      impact: [
        { label: 'Resistance prediction', before: 'Reactive', after: '6 months early' },
        { label: 'Treatment durability', before: '6 months', after: '12 months' },
        { label: 'Combination therapy success', before: '30%', after: '75%' },
        { label: 'Patient progression-free survival', before: 'baseline', after: '+40%' },
      ],
    },
    {
      title: 'Design Personalized Cancer Immunotherapies',
      description: 'Generate patient-specific neoantigens, CAR-T designs, and TCR sequences with structural validation.',
      comparison: {
        traditional: [
          { label: 'Standard protocol selection', cost: '$100K' },
          { label: 'Population-based dosing', cost: 'One-size-fits-all' },
          { label: 'Limited personalization', cost: '25% response' },
          { label: '12 months protocol selection', cost: 'Trial and error' },
        ],
        oracle: [
          { label: 'Patient-specific design', cost: '$120K' },
          { label: 'Personalized immunotherapy', cost: 'Bespoke design' },
          { label: 'Neoantigen/CAR-T optimization', cost: '65% response' },
          { label: '4 weeks design completion', cost: 'Rational approach' },
        ],
      },
      impact: [
        { label: 'Treatment response rate', before: '25%', after: '65%' },
        { label: 'Design time', before: '12 months', after: '4 weeks' },
        { label: 'Personalization level', before: 'Population', after: 'Individual' },
        { label: 'Adverse events', before: 'High', after: 'Reduced toxicity' },
      ],
    },
  ] as ValueProposition[],
  
  summary: {
    title: 'Clinical Decision Revolution',
    metrics: [
      { label: 'VUS resolution', value: '73%', subtitle: 'Previously uncertain variants' },
      { label: 'Treatment selection', value: '12x faster', subtitle: '18 months → 6 weeks' },
      { label: 'Resistance prediction', value: '6 months early', subtitle: 'Preemptive therapy design' },
      { label: 'Patient outcomes', value: '+40%', subtitle: 'Improved response rates' },
    ],
    description: 'Oracle transforms oncology from reactive medicine into predictive precision therapy. Instead of guessing at treatments, clinicians can systematically design personalized interventions with scientific confidence and measurable patient benefit.',
  } as TransformationSummary,
};

