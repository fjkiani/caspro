import { 
  Search, 
  AlertTriangle, 
  Clock, 
  Target, 
  Zap, 
  Shield, 
  CheckCircle,
  FileText,
  Users,
  Database,
  Activity,
  BarChart3,
  ListChecks,
  Beaker,
  Cpu,
  Gauge,
  Lightbulb,
  Dna,
  BookOpen,
  Microscope
} from 'lucide-react';

import { CapabilityJourneyData } from '../capability-journeys';

// Therapy Fit Journey - REAL RUO CAPABILITIES
export const therapyFitJourney: CapabilityJourneyData = {
  title: "The Therapy Selection Journey",
  subtitle: "From therapy selection confusion to AI-powered drug ranking with clear confidence scores and research-grade provenance",
  oldWaySteps: [
    {
      number: 1,
      title: "Manual Drug Selection",
      description: "Oncologists manually review drug options without clear biological rationale or confidence scoring, leading to subjective decision-making.",
      icon: Search,
      problems: [
        "Hours spent reviewing 20+ drug options with no clear ranking or biological rationale",
        "Subjective therapy selection leads to 60% variability in treatment decisions",
        "No confidence scoring creates uncertainty about therapy fit and patient response",
        "Manual literature review takes 2-3 days per case to understand drug mechanisms"
      ]
    },
    {
      number: 2,
      title: "Biology-Therapy Disconnect",
      description: "Difficulty connecting patient genetics and pathway biology to relevant drug mechanisms of action and therapy options.",
      icon: AlertTriangle,
      problems: [
        "No systematic connection between variant biology and drug MoA leads to 70% missed opportunities",
        "Unclear pathway-drug alignment causes 50% of relevant therapies to be overlooked",
        "Manual biology-therapy mapping takes 1-2 days per case with high error rates",
        "Inconsistent therapy recommendations across similar genetic profiles"
      ]
    },
    {
      number: 3,
      title: "Evidence Integration Challenges",
      description: "Difficulty integrating multiple evidence sources (ClinVar, literature, clinical data) into coherent therapy recommendations.",
      icon: Clock,
      problems: [
        "Fragmented evidence sources lead to 80% incomplete therapy assessments",
        "No systematic evidence integration causes 40% of relevant data to be missed",
        "Manual evidence synthesis takes 3-4 days per case with variable accuracy",
        "High risk of overlooking important safety or efficacy signals"
      ]
    },
    {
      number: 4,
      title: "Decision Documentation Issues",
      description: "Lack of standardized documentation and provenance tracking makes therapy decisions difficult to reproduce and validate.",
      icon: Target,
      problems: [
        "No audit trail for therapy decisions leads to 90% reproducibility failures",
        "Inconsistent documentation makes decisions difficult to review and validate",
        "Missing provenance information prevents quality assurance and learning",
        "High variability in therapy selection methodology across different oncologists"
      ]
    }
  ],
  newWaySteps: [
    {
      number: 1,
      title: "Biology-Informed Drug Ranking",
      description: "CrisPRO combines sequence analysis, pathway biology, and evidence to rank therapies with clear biological rationale.",
      icon: Zap,
      solutions: [
        "Sequence analysis identifies how variants affect protein function and drug targets",
        "Pathway analysis connects tumor biology to drug mechanisms of action",
        "Evidence integration synthesizes variant impact with clinical literature",
        "Confidence scoring reflects the strength of biological evidence"
      ]
    },
    {
      number: 2,
      title: "Biology-Therapy Alignment",
      description: "Systematic connection between patient genetics, pathway biology, and drug mechanisms with transparent biological mapping.",
      icon: Shield,
      solutions: [
        "Mechanism-of-action alignment shows which drugs target disrupted pathways",
        "Pathway-drug mapping explains why certain therapies are biologically relevant",
        "Biological context helps clinicians understand the rationale for recommendations",
        "Consistent methodology ensures similar cases receive similar biological analysis"
      ]
    },
    {
      number: 3,
      title: "Integrated Evidence Synthesis",
      description: "Comprehensive evidence integration from variant databases, literature, and clinical data with transparent source attribution.",
      icon: Activity,
      solutions: [
        "Evidence synthesis combines variant impact predictions with published literature",
        "Systematic evidence review captures variant-disease-drug relationships",
        "Transparent evidence tiers show the strength and source of supporting data",
        "Safety and efficacy signals identified through biological pathway analysis"
      ]
    },
    {
      number: 4,
      title: "Transparent Documentation",
      description: "Complete audit trail with biological reasoning, source citations, and provenance tracking for reproducibility.",
      icon: CheckCircle,
      solutions: [
        "Audit trail documents the biological logic behind each recommendation",
        "Source citations show where variant and drug information comes from",
        "Provenance tracking enables review of the biological reasoning process",
        "Research-grade methodology ensures transparent and reproducible analysis"
      ]
    }
  ]
};
