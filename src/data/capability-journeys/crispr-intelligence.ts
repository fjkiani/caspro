import { CapabilityJourneyData } from './types';
import { BrainCircuit } from 'lucide-react';

export const crisprIntelligenceJourney: CapabilityJourneyData = {
  title: 'CRISPR Intelligence Journey',
  subtitle: 'The transformation from speculative gene editing to predictable therapeutic design with AI-powered target validation and guide RNA optimization.',
  oldWaySteps: [
    {
      number: 1,
      title: 'Manual Target Validation',
      description: 'Researchers manually sift through databases and literature to validate potential gene targets, a process fraught with uncertainty and high failure rates.',
      icon: BrainCircuit,
      problems: [
        'High failure rate of 60-70% due to manual validation overlooking critical genetic variants',
        'Time consuming process taking weeks or months for single target validation',
        'Limited understanding of off-target effects and safety profiles',
        'No systematic approach to guide RNA design and optimization'
      ]
    },
    {
      number: 2,
      title: 'Speculative Guide RNA Design',
      description: 'Guide RNA sequences are designed using basic algorithms without comprehensive off-target analysis or efficacy prediction.',
      icon: BrainCircuit,
      problems: [
        'Basic algorithms miss 40% of potential off-target sites',
        'No efficacy prediction leads to 50% guide RNA failure rate',
        'Limited understanding of sequence context and chromatin accessibility',
        'Manual optimization process takes 2-3 weeks per target'
      ]
    },
    {
      number: 3,
      title: 'Trial and Error Experiments',
      description: 'Extensive experimental validation required due to lack of predictive models, leading to resource waste and delayed timelines.',
      icon: BrainCircuit,
      problems: [
        'Experimental validation required for every guide RNA design',
        'High resource consumption with 70% experimental failure rate',
        'Delayed project timelines by 4-6 weeks per target',
        'Limited scalability for multiple target validation'
      ]
    },
    {
      number: 4,
      title: 'Unpredictable Outcomes',
      description: 'Without predictive models, CRISPR experiments yield unpredictable results, making therapeutic development risky and inefficient.',
      icon: BrainCircuit,
      problems: [
        'Unpredictable editing efficiency across different cell types',
        'High variability in off-target effects between experiments',
        'Limited understanding of repair pathway preferences',
        'Therapeutic development delayed by 6-12 months due to unpredictability'
      ]
    }
  ],
  newWaySteps: [
    {
      number: 1,
      title: 'AI-Powered Target Validation',
      description: 'CrisPRO\'s Oracle engine analyzes targets with 95.7% AUROC accuracy, de-risking the entire pipeline from day one.',
      icon: BrainCircuit,
      solutions: [
        '95.7% AUROC ClinVar validation for target impact prediction',
        'Comprehensive variant analysis across 53,210 validated variants',
        'De-risked pipeline with high confidence target validation',
        'Accelerated discovery from hypothesis to validated target in hours'
      ]
    },
    {
      number: 2,
      title: 'Intelligent Guide RNA Design',
      description: 'Advanced AI algorithms design optimal guide RNA sequences with comprehensive off-target analysis and efficacy prediction.',
      icon: BrainCircuit,
      solutions: [
        'Advanced off-target prediction with 90% accuracy',
        'Efficacy prediction models reduce guide RNA failure rate by 60%',
        'Context-aware design considering chromatin accessibility',
        'Automated optimization process completed in minutes'
      ]
    },
    {
      number: 3,
      title: 'Predictive Experiment Design',
      description: 'AI models predict experimental outcomes, reducing the need for extensive trial-and-error validation.',
      icon: BrainCircuit,
      solutions: [
        'Predictive models reduce experimental validation by 70%',
        'Resource optimization with 85% experimental success rate',
        'Accelerated project timelines by 3-4 weeks per target',
        'Scalable validation for multiple targets simultaneously'
      ]
    },
    {
      number: 4,
      title: 'Predictable Therapeutic Outcomes',
      description: 'Comprehensive AI models ensure predictable CRISPR outcomes, enabling reliable therapeutic development.',
      icon: BrainCircuit,
      solutions: [
        'Predictable editing efficiency across cell types with 90% accuracy',
        'Minimized off-target effects through advanced prediction models',
        'Optimized repair pathway preferences for therapeutic outcomes',
        'Therapeutic development accelerated by 6-8 months with predictable results'
      ]
    }
  ]
};

