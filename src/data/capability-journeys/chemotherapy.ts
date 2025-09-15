import { 
  Brain, 
  AlertTriangle, 
  Clock, 
  Target, 
  Zap, 
  Shield, 
  CheckCircle
} from 'lucide-react';

import { CapabilityJourneyData } from '../capability-journeys';

// Chemotherapy Treatment Journey - REAL RUO CAPABILITIES
export const chemotherapyJourney: CapabilityJourneyData = {
  title: "The Chemotherapy Treatment Journey",
  subtitle: "From genetic testing confusion to precision, biology-aware chemotherapy selection with CrisPRO's Oracle & Forge Engines",
  oldWaySteps: [
    {
      number: 1,
      title: "Genetic Testing",
      description: "Patient receives genetic test results with unclear drug response predictions.",
      icon: Brain,
      problems: [
        "Limited pharmacogenomic guidance for chemo selection",
        "Standard protocols ignore patient-specific genetics",
        "No clear drug ranking based on tumor biology"
      ]
    },
    {
      number: 2,
      title: "Clinical Confusion",
      description: "Oncologist struggles to match chemotherapy drugs to patient's genetic profile.",
      icon: AlertTriangle,
      problems: [
        "Physicians rely on standard protocols, not personalized biology",
        "Limited understanding of drug-gene interactions",
        "Treatment decisions based on incomplete pharmacogenomic data"
      ]
    },
    {
      number: 3,
      title: "Trial & Error Treatment",
      description: "Patient undergoes chemotherapy that may not match their genetic drug response profile.",
      icon: Clock,
      problems: [
        "Average 2-3 chemo attempts before finding effective therapy",
        "Precious time lost during cancer progression",
        "Unnecessary toxicity from ineffective drug combinations"
      ]
    },
    {
      number: 4,
      title: "Treatment Resistance",
      description: "Without precision drug matching, cancer develops resistance and becomes increasingly difficult to treat.",
      icon: Target,
      problems: [
        "Drug resistance develops from suboptimal initial selection",
        "Limited treatment options once resistance occurs",
        "Exponentially higher treatment costs and patient suffering"
      ]
    }
  ],
  newWaySteps: [
    {
      number: 1,
      title: "Biology-Aware Drug Ranking",
      description: "CrisPRO's Oracle Engine provides MoA-aligned drug class ranking with 95.7% AUROC ClinVar validation and transparent explanations.",
      icon: Zap,
      solutions: [
        "95.7% AUROC ClinVar validation for variant impact prediction",
        "S/P/E fusion: Sequence, Pathway, Evidence for drug ranking",
        "Real-time drug class recommendations with confidence scores"
      ]
    },
    {
      number: 2,
      title: "Validated Pharmacogenomic Insights",
      description: "Oracle delivers peer-reviewed variant impact prediction with CrisPRO.ai embeddings and BRCA1 supervised AUROC ≈ 0.95 for drug-gene interactions.",
      icon: Shield,
      solutions: [
        "BRCA1 supervised AUROC ≈ 0.95 with CrisPRO.ai 40B block-20 embeddings",
        "Cross-species generalization for drug response pathways",
        "Transparent explanations with auditable provenance"
      ]
    },
    {
      number: 3,
      title: "Precision Chemo Design",
      description: "Forge Engine generates personalized chemotherapy strategies with 1M token context window and guided epigenomic design.",
      icon: Target,
      solutions: [
        "1M token context window for comprehensive genomic analysis",
        "Guided epigenomic design with Enformer+Borzoi scoring",
        "Configurable beam width for inference-time scaling (beam width ↔ AUROC)"
      ]
    },
    {
      number: 4,
      title: "Research-Validated Chemo Outcomes",
      description: "End-to-end chemotherapy workflow with validated performance metrics and transparent methodology.",
      icon: CheckCircle,
      solutions: [
        "Research-use-only positioning with transparent methodology",
        "Validated performance metrics with peer-reviewed benchmarks",
        "Auditable results with complete provenance and run IDs"
      ]
    }
  ]
};
