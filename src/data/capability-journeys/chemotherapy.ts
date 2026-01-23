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
      description: "CrisPRO analyzes patient genetics and tumor biology to rank chemotherapy options based on mechanism-of-action alignment.",
      icon: Zap,
      solutions: [
        "Sequence analysis identifies functional disruptions in key genes",
        "Pathway analysis maps tumor vulnerabilities to drug mechanisms",
        "Evidence integration combines variant impact with literature support"
      ]
    },
    {
      number: 2,
      title: "Biological Variant Interpretation",
      description: "Oracle analyzes pharmacogenomic variants to understand how patient genetics affect drug metabolism and response pathways.",
      icon: Shield,
      solutions: [
        "Variant impact analysis identifies drug-metabolizing enzyme variants (DPYD, TPMT, UGT1A1)",
        "Biological reasoning explains how variants affect drug breakdown and clearance",
        "Transparent explanations show which pathways are disrupted and why"
      ]
    },
    {
      number: 3,
      title: "Mechanism-Based Drug Selection",
      description: "CrisPRO connects patient biology to drug mechanisms of action, identifying which chemotherapy classes align with tumor vulnerabilities.",
      icon: Target,
      solutions: [
        "Pathway analysis identifies which biological processes are disrupted in the tumor",
        "Drug mechanism mapping shows which chemotherapy classes target those pathways",
        "Biological rationale explains why certain drugs are more likely to be effective"
      ]
    },
    {
      number: 4,
      title: "Transparent Chemotherapy Guidance",
      description: "Research-grade methodology with clear biological explanations and complete audit trail for clinical decision support.",
      icon: CheckCircle,
      solutions: [
        "Research-use-only positioning with transparent biological reasoning",
        "Clear explanations of how patient genetics inform drug selection",
        "Auditable results with complete provenance showing the biological logic"
      ]
    }
  ]
};
