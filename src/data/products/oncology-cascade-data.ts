import { CascadePhase } from '@/components/products/shared/IntelligenceCascadeModal';

export const oncologyCascadePhases: CascadePhase[] = [
  {
    id: 'data-extraction',
    title: 'Data Extraction',
    description: 'Parsing patient NGS data, clinical notes, and pathology reports',
    icon: '📥',
    duration: 2000,
    color: 'blue',
    agent: 'Data Extractor',
    tabId: 'molecular',
    insights: [
      'NGS VCF file parsed successfully',
      'Clinical notes extracted (3 reports)',
      'Pathology report processed'
    ]
  },
  {
    id: 'biomarker-calculation',
    title: 'Biomarker Analysis',
    description: 'Calculating TMB, MSI, HRD status, and genomic signatures',
    icon: '🧬',
    duration: 3000,
    color: 'purple',
    agent: 'Biomarker Calculator',
    tabId: 'molecular',
    insights: [
      'TMB calculated: 12.3 mut/Mb (TMB-High)',
      'MSI status: MSS (Microsatellite Stable)',
      'HRD score: 42 (suggestive of BRCA deficiency)',
      'IO eligibility: Candidate (TMB-High)'
    ]
  },
  {
    id: 'resistance-analysis',
    title: 'Resistance Prediction',
    description: 'Analyzing mutation patterns and predicting treatment resistance',
    icon: '⚔️',
    duration: 2500,
    color: 'red',
    agent: 'Resistance Predictor',
    tabId: 'molecular',
    insights: [
      'KRAS G12D detected - potential EGFR resistance',
      'PIK3CA mutation - mTOR pathway activation',
      'Platinum sensitivity: 78% (favorable)',
      'MAPK pathway wild-type (good prognosis)'
    ]
  },
  {
    id: 'drug-ranking',
    title: 'Drug Ranking',
    description: 'Evaluating drug efficacy based on molecular profile and evidence',
    icon: '💊',
    duration: 4000,
    color: 'green',
    agent: 'Drug Ranker',
    tabId: 'therapeutic',
    insights: [
      'Olaparib (PARP): 94% confidence (Tier I)',
      'Carboplatin: 88% confidence (Tier I)',
      'Niraparib (PARP): 91% confidence (Tier I)',
      'Pembrolizumab: 76% confidence (IO candidate)',
      'Trametinib: 45% confidence (MEK inhibitor)'
    ]
  },
  {
    id: 'trial-matching',
    title: 'Trial Matching',
    description: 'Finding clinical trials with matching biomarkers and eligibility',
    icon: '🔬',
    duration: 3500,
    color: 'indigo',
    agent: 'Trial Matcher',
    tabId: 'trials',
    insights: [
      'NCT05678901: PARP + ATR (DDR deficient OC)',
      'NCT04729387: Olaparib + Cediranib',
      'NCT03824704: Maintenance Olaparib',
      '3 trials with 94%+ mechanism fit',
      '2 trials recruiting within 50 miles'
    ]
  },
  {
    id: 'nutrition-planning',
    title: 'Nutrition Planning',
    description: 'Designing toxicity-aware nutrition plan with evidence-based dosing',
    icon: '🥗',
    duration: 2000,
    color: 'orange',
    agent: 'Nutritionist',
    tabId: 'therapeutic',
    insights: [
      'NAC 600mg during platinum infusion',
      'Vitamin D 2000 IU daily (deficiency detected)',
      'Curcumin 500mg BID (anti-inflammatory)',
      'Grapefruit avoidance (CYP3A4 interaction)',
      'Omega-3 supplementation recommended'
    ]
  },
  {
    id: 'care-plan-generation',
    title: 'Care Plan Generation',
    description: 'Synthesizing unified care plan with monitoring and next steps',
    icon: '📋',
    duration: 5000,
    color: 'teal',
    agent: 'Care Planner',
    tabId: 'care',
    insights: [
      'Complete unified care plan generated',
      'Monitoring schedule: CA-125 q3weeks, ctDNA q6weeks',
      'NGS re-evaluation recommended at progression',
      'Supportive care integrated (nutrition + supplements)',
      'Patient education materials prepared'
    ]
  }
];

