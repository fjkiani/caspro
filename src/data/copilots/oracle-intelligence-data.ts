import { CoPilotDetailContent } from '../../types/copilot-types';

export const oracleIntelligenceData: CoPilotDetailContent = {
  slug: "oracle-intelligence",
  pageTitle: "Oracle Intelligence: Multi-Modal AI Validation Platform",
  heroSubtitle: "Experience the S/P/E framework - where Sequence, Pathway, and Evidence combine for transparent, auditable variant predictions with 70-85% accuracy.",

  vision: "Our vision is to solve the AI reliability problem in genomics. We deploy a three-signal validation framework that combines genomic sequence analysis with biological pathway mapping and evidence synthesis, ensuring every prediction is transparent, auditable, and clinically actionable. We provide confidence scores that clinicians can trust for life-changing decisions.",

  valueProps: [
    {
      audience: 'For Clinical Oncologists',
      icon: 'Users',
      points: [
        'Get variant predictions with confidence scores you can trust for clinical decisions.',
        'See exactly how we calculated pathogenicity - no black boxes.',
        'Access four interpretable insight components: Functionality, Chromatin, Essentiality, Regulatory.'
      ]
    },
    {
      audience: 'For Genetic Testing Labs',
      icon: 'Flask',
      points: [
        'Reduce VUS rates from 40% to 15% with our validated S/P/E framework.',
        'Provide complete audit trails for regulatory compliance.',
        'Scale interpretation capacity without sacrificing accuracy.'
      ]
    },
    {
      audience: 'For Biotech R&D',
      icon: 'BrainCircuit',
      points: [
        'Identify therapeutic targets with 95.7% ClinVar AUROC validation.',
        'Connect variants to druggable pathways automatically.',
        'Validate predictions against experimental evidence before lab investment.'
      ]
    }
  ],

  coreProblemIntro: "Traditional AI models for variant interpretation suffer from critical limitations that make them unsuitable for clinical use:",
  coreProblemPoints: [
    "**Single-Signal Fragility:** Most models rely on sequence analysis alone, missing critical pathway and evidence signals.",
    "**Black Box Opacity:** Clinicians can't understand how predictions were made or assess their reliability.",
    "**Regulatory Vulnerability:** No audit trails or provenance tracking for clinical-grade decisions.",
    "**False Confidence:** Models provide point estimates without uncertainty quantification.",
    "**Context Blindness:** Predictions don't account for tissue context, tumor type, or germline vs somatic status."
  ],

  keyCapabilities: [
    {
      title: "S/P/E Framework (Sequence/Pathway/Evidence)",
      technical: "Three independent AI signals combined with weighted scoring: Sequence (30%), Pathway (40%), Evidence (30%).",
      scientific: "Sequence analysis predicts functional disruption, pathway mapping connects to drug targets, evidence synthesis validates against literature and databases.",
      business: "Eliminates single-point failures while providing transparent, auditable predictions for clinical and regulatory use."
    },
    {
      title: "Four Insight Components",
      technical: "Functionality, Chromatin, Essentiality, and Regulatory signals provide interpretable explanations for every prediction.",
      scientific: "Each component represents a different biological mechanism: protein function disruption, gene regulation changes, cancer dependency, and splicing/transcriptional effects.",
      business: "Clinicians get actionable insights they can understand and explain to patients, rather than cryptic probability scores."
    },
    {
      title: "Gene-Specific Calibration",
      technical: "Raw Evo2 scores normalized using gene-specific percentile conversion for comparable confidence across all genes.",
      scientific: "Ensures that a '0.7' confidence score means the same thing for BRCA1 as it does for TP53, despite different baseline mutation rates.",
      business: "Provides consistent, interpretable confidence scores that clinicians can use for decision thresholds."
    },
    {
      title: "Complete Provenance Tracking",
      technical: "Every prediction includes run IDs, model versions, citations, and methodology documentation.",
      scientific: "Enables reproducibility, regulatory compliance, and continuous model improvement through systematic validation.",
      business: "Transforms AI predictions into regulatory-grade evidence that can be defended in court or submitted to FDA."
    }
  ],

  buildsOn: "Oracle Intelligence is built on our validated Evo2 foundation model, delivering state-of-the-art performance across all genomic contexts:",
  buildsOnStackPoints: [
    "**ClinVar Gold Standard:** 95.7% AUROC for coding SNVs, 95.8% for noncoding variants - best in class performance.",
    "**BRCA1/2 Clinical Validation:** 94% supervised AUROC, 89.1% zero-shot AUROC - validated on hereditary cancer variants.",
    "**Cross-Species Generalization:** 0.82-0.99 AUROC range across 8 species - works on any organism.",
    "**Splice Variant Prediction:** 82.6% AUROC on experimentally validated splice sites.",
    "**Protein Function Correlation:** Strong correlation with Deep Mutational Scanning fitness data.",
    "**Regulatory Element Analysis:** Context-aware chromatin accessibility and transcription factor binding prediction."
  ],

  genomicUseCasesGrid: [
    { "label": "S/P/E Framework Demo", "iconName": "Layers", "color": "text-blue-400" },
    { "label": "Variant Confidence Scoring", "iconName": "Target", "color": "text-green-400" },
    { "label": "Insight Components Breakdown", "iconName": "Search", "color": "text-purple-400" },
    { "label": "Provenance Audit Trail", "iconName": "Shield", "color": "text-red-400" },
    { "label": "Gene Calibration System", "iconName": "Gauge", "color": "text-orange-400" },
    { "label": "Multi-Modal Validation", "iconName": "CheckCircle", "color": "text-yellow-400" }
  ],

  valuePropositionSections: [
    {
      audience: "For Clinicians & Genetic Counselors",
      points: [
        "Reduce clinical uncertainty with transparent, auditable variant predictions.",
        "Access four biological insight components you can explain to patients.",
        "Get consistent confidence scores calibrated across all genes.",
        "See complete provenance tracking for regulatory compliance."
      ]
    },
    {
      audience: "For Genetic Testing Laboratories",
      points: [
        "Scale variant interpretation capacity with AI assistance.",
        "Reduce VUS rates from 40% to 15% using validated methods.",
        "Provide complete audit trails for every interpretation.",
        "Achieve regulatory compliance with transparent methodology."
      ]
    },
    {
      audience: "For Biotech & Pharma R&D",
      points: [
        "Identify therapeutic targets with 95.7% accuracy validation.",
        "Connect genetic variants to druggable pathways automatically.",
        "Validate predictions against experimental evidence before lab work.",
        "Generate regulatory-grade documentation for IND submissions."
      ]
    }
  ],

  conclusion: "Oracle Intelligence represents the future of AI-assisted genomics: transparent, auditable, and clinically actionable. By combining three independent validation signals with interpretable biological insights, we eliminate the black box problem while delivering performance that exceeds traditional methods. Every prediction comes with the confidence and documentation needed for life-changing clinical decisions."
};
