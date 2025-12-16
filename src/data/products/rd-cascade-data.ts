import { CascadePhase } from '@/components/products/shared/IntelligenceCascadeModal';

export const rdCascadePhases: CascadePhase[] = [
  {
    id: 'target-discovery',
    title: 'Target Discovery',
    description: 'Analyzing variants and identifying therapeutic targets',
    icon: '🎯',
    duration: 2500,
    color: 'blue',
    agent: 'Target Validator',
    tabId: 'target',
    insights: [
      'BRCA1 variant c.123A>T identified',
      'Pathogenicity score: 0.891 (Pathogenic)',
      'Gene essentiality: 0.76 (High dependency)',
      'Synthetic lethal pair detected: PARP + BRCA1'
    ]
  },
  {
    id: 'lead-design',
    title: 'Lead Engineering',
    description: 'Generating therapeutic designs with Evo2 and structural validation',
    icon: '⚡',
    duration: 3500,
    color: 'purple',
    agent: 'Therapeutic Designer',
    tabId: 'design',
    insights: [
      'CRISPR guide RNA designed: 92% on-target efficiency',
      'HDR template generated: 4.2kb homology arms',
      'Therapeutic protein generated: 70% functional coherence',
      'Off-target score: <0.1 (low risk)'
    ]
  },
  {
    id: 'structural-validation',
    title: 'Structural Validation',
    description: 'Validating 3D structures with AlphaFold 3 integration',
    icon: '🛡️',
    duration: 3000,
    color: 'green',
    agent: 'Structural Validator',
    tabId: 'validation',
    insights: [
      'AlphaFold 3 confidence: 95.8%',
      'Binding affinity predicted: High',
      'Complex structure validated',
      '3D folding confirmed'
    ]
  },
  {
    id: 'ind-package',
    title: 'IND Package Generation',
    description: 'Compiling regulatory documentation with complete evidence',
    icon: '📋',
    duration: 4000,
    color: 'orange',
    agent: 'Regulatory Assembler',
    tabId: 'ind',
    insights: [
      'Complete evidence dossier generated',
      'Provenance trail documented',
      'IND-ready documentation compiled',
      'Audit trail complete'
    ]
  },
  {
    id: 'ip-monetization',
    title: 'IP Monetization',
    description: 'Preparing IP documentation and patent strategy',
    icon: '💎',
    duration: 2000,
    color: 'teal',
    agent: 'IP Strategist',
    tabId: 'ind',
    insights: [
      'Novel therapeutic candidate identified',
      'Patent-worthy design confirmed',
      'IP documentation prepared',
      'Commercialization pathway mapped'
    ]
  }
];

