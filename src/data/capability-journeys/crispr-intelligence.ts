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
      title: 'Biological Target Validation',
      description: 'CrisPRO analyzes potential CRISPR targets to understand variant impact and functional consequences before guide design.',
      icon: BrainCircuit,
      solutions: [
        'Variant impact analysis predicts how edits will affect gene function',
        'Biological reasoning explains which targets are most likely to have therapeutic effect',
        'Functional analysis identifies targets with clear disease-driving mechanisms',
        'De-risked pipeline by validating biological rationale before experimental work'
      ]
    },
    {
      number: 2,
      title: 'Biology-Informed Guide RNA Design',
      description: 'CrisPRO designs guide RNAs considering sequence context, chromatin accessibility, and off-target potential.',
      icon: BrainCircuit,
      solutions: [
        'Sequence analysis identifies optimal cutting sites within target regions',
        'Chromatin accessibility analysis predicts which guides can access their targets',
        'Off-target prediction identifies potential unintended editing sites',
        'Biological context informs guide selection for therapeutic outcomes'
      ]
    },
    {
      number: 3,
      title: 'Mechanism-Based Experiment Design',
      description: 'CrisPRO helps design experiments by predicting biological outcomes based on editing mechanisms and repair pathways.',
      icon: BrainCircuit,
      solutions: [
        'Repair pathway analysis predicts how cells will respond to DNA breaks',
        'Editing efficiency predictions based on sequence context and chromatin state',
        'Biological reasoning guides experimental design for therapeutic goals',
        'Mechanism-based predictions inform which experiments are most informative'
      ]
    },
    {
      number: 4,
      title: 'Biology-Driven Therapeutic Design',
      description: 'CrisPRO connects editing outcomes to therapeutic mechanisms, enabling more predictable therapeutic development.',
      icon: BrainCircuit,
      solutions: [
        'Biological analysis predicts how edits will affect disease pathways',
        'Mechanism-based reasoning explains therapeutic rationale',
        'Repair pathway preferences inform editing strategy for desired outcomes',
        'Therapeutic development guided by understanding of biological mechanisms'
      ]
    }
  ]
};

