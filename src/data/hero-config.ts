import { Dna, Brain, FileText } from 'lucide-react';

// Hero Section Configuration
export const HERO_CONFIG = {
  titlePart1: "In-Silico Therapeutic",
  titlePart2: "Transform 90% Drug Failure into 95% Success",
  subtitle: "CrisPRO accelerates research with validated AI engines: 95.7% AUROC ClinVar validation, 73% VUS resolution, and 1M token context for comprehensive genomic analysis..",
  ctaPrimaryText: "Platform",
  ctaPrimaryLink: "/platform",
  ctaSecondaryText: "Research",
  ctaSecondaryLink: "/blog",
  keyFeatures: [
    {
      id: 'genomic',
      name: 'CRISPR Intelligence Platform',
      description: 'An end-to-end co-pilot for therapeutic gene editing. Accelerate your R&D from discovery to pre-clinical with AI-powered guide design, variant effect prediction, and automated experiment planning.',
      icon: Dna,
      link: '/platform/crispr-intelligence'
    },
    {
      id: 'oncology',
      name: 'PrecisionRad™ Co-Pilot',
      description: 'Fuse multi-modal data to hyper-personalize radiation therapy. Predict patient-specific radiosensitivity and toxicity by integrating deep genomic profiles with medical imaging to optimize treatment plans.',
      icon: Brain,
      link: '/platform/precision-rad'
    },
    {
      id: 'emr',
      name: 'AgenticEMR™ Co-Pilot',
      description: 'Transform unstructured clinical data into a strategic asset. Automate patient record summarization, cohort identification, and clinical trial matching to unlock deep clinical insights from your EMR.',
      icon: FileText,
      link: '/platform/agentic-emr'
    }
  ]
};
