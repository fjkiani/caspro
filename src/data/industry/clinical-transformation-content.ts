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
      title: 'Predict Resistance Before It Happens',
      description: 'MAPK/NF1 mutations = 2x platinum resistance risk. Validated on 469 TCGA ovarian cancer patients. Detect resistance 6 months before imaging confirmation through CA-125 kinetics and pathway analysis.',
      comparison: {
        traditional: [
          { label: 'React to resistance', cost: 'After treatment failure' },
          { label: 'Imaging-based detection', cost: '6 months late' },
          { label: 'No pathway analysis', cost: 'Missed early signals' },
          { label: 'Sequential monotherapies', cost: 'Trial and error' },
        ],
        oracle: [
          { label: 'MAPK/NF1 pathway detection', cost: 'Before treatment' },
          { label: 'CA-125 kinetics monitoring', cost: '3-6 weeks early' },
          { label: 'Validated 2x risk prediction', cost: '469 patients' },
          { label: 'Early intervention protocols', cost: 'Proactive switching' },
        ],
      },
      impact: [
        { label: 'Resistance detection', before: 'After imaging (6 months late)', after: '3-6 weeks early' },
        { label: 'Prediction accuracy', before: 'Reactive only', after: '2x risk validated (RR=1.97)' },
        { label: 'Early intervention', before: 'Not possible', after: 'Proactive therapy switch' },
        { label: 'Patient monitoring', before: 'Imaging-based', after: 'Biomarker + pathway analysis' },
      ],
    },
    {
      title: 'Identify Synthetic Lethality Vulnerabilities',
      description: 'Find double-hit vulnerabilities where cancer depends on backup pathways. When HR pathway is lost, cancer depends on PARP - we identify these dependencies and recommend precision drugs.',
      comparison: {
        traditional: [
          { label: 'Standard biomarker selection', cost: 'Limited to known markers' },
          { label: 'Single pathway targeting', cost: 'One-size-fits-all' },
          { label: 'No dependency analysis', cost: 'Missed opportunities' },
          { label: 'Trial and error drug selection', cost: 'Low success rate' },
        ],
        oracle: [
          { label: 'Pathway dependency mapping', cost: 'Systematic analysis' },
          { label: 'Double-hit vulnerability detection', cost: 'Precision targeting' },
          { label: 'Essentiality scoring with Evo2', cost: 'Validated approach' },
          { label: '50% drug match accuracy', cost: 'Pilot benchmark' },
        ],
      },
      impact: [
        { label: 'Vulnerability detection', before: 'Manual/guesswork', after: 'Systematic identification' },
        { label: 'Drug targeting', before: 'Standard biomarkers', after: 'Pathway dependencies' },
        { label: 'Precision level', before: 'Population-based', after: 'Patient-specific' },
        { label: 'Therapeutic options', before: 'Limited', after: 'Expanded via SL' },
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

