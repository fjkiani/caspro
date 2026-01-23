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
  Map,
  Dna,
  BookOpen,
  Microscope
} from 'lucide-react';

import { CapabilityJourneyData } from '../capability-journeys';

// Pathway View Journey - REAL RUO CAPABILITIES
export const pathwayJourney: CapabilityJourneyData = {
  title: "The Pathway Discovery Journey",
  subtitle: "From scattered gene lists to clear pathway stories with therapy alignment and research-grade provenance",
  oldWaySteps: [
    {
      number: 1,
      title: "Manual Gene Analysis",
      description: "Researchers manually analyze long lists of variants and genes without clear pathway context or biological story.",
      icon: Search,
      problems: [
        "Hours spent reviewing 200+ gene lists with no clear biological narrative",
        "No pathway-level interpretation leads to 70% confusion about biological drivers",
        "Manual literature review takes 3-5 days per case to understand pathway relevance",
        "Fragmented gene information across multiple databases with inconsistent annotations"
      ]
    },
    {
      number: 2,
      title: "Pathway Confusion",
      description: "Complex pathway interactions create confusion about which biological processes are most relevant to the case.",
      icon: AlertTriangle,
      problems: [
        "Unclear pathway prioritization causes 80% uncertainty in biological interpretation",
        "No systematic way to rank pathway importance leads to inconsistent conclusions",
        "High false positive rates in pathway identification waste 60% of research time",
        "Manual pathway analysis takes 2-4 days per case with variable accuracy"
      ]
    },
    {
      number: 3,
      title: "Therapy Disconnect",
      description: "Difficulty connecting biological pathway findings to relevant therapeutic options and drug mechanisms.",
      icon: Clock,
      problems: [
        "No clear bridge from pathway biology to therapy selection increases decision time by 300%",
        "Missing therapy alignment leads to 50% of relevant drug classes being overlooked",
        "Manual therapy-pathway mapping takes 1-2 days per case with high error rates",
        "Inconsistent therapy recommendations across similar pathway profiles"
      ]
    },
    {
      number: 4,
      title: "Reproducibility Issues",
      description: "Lack of standardized methodology and provenance tracking makes results difficult to reproduce and validate.",
      icon: Target,
      problems: [
        "No audit trail for pathway analysis decisions leads to 90% reproducibility failures",
        "Inconsistent methodology across cases makes results difficult to compare",
        "Missing provenance information prevents validation and quality assurance",
        "High variability in pathway interpretation between different analysts"
      ]
    }
  ],
  newWaySteps: [
    {
      number: 1,
      title: "Biological Pathway Mapping",
      description: "CrisPRO maps genes to biological pathways, showing how variants disrupt key cellular processes.",
      icon: Zap,
      solutions: [
        "Gene-to-pathway mapping identifies which biological processes are affected",
        "Variant impact analysis explains how mutations disrupt pathway function",
        "Pathway burden calculations show the extent of disruption in each pathway",
        "Biological narrative emerges from understanding pathway contributions"
      ]
    },
    {
      number: 2,
      title: "Pathway Prioritization",
      description: "Systematic pathway ranking based on biological evidence and functional impact.",
      icon: Shield,
      solutions: [
        "Biological analysis prioritizes pathways with strongest evidence of disruption",
        "Consistent methodology ensures reproducible pathway interpretation",
        "Biological context helps explain why certain pathways are most relevant",
        "Clear pathway stories emerge from systematic biological analysis"
      ]
    },
    {
      number: 3,
      title: "Therapy Alignment",
      description: "Connection from pathway biology to drug mechanisms, showing which therapies target disrupted pathways.",
      icon: Activity,
      solutions: [
        "Mechanism-of-action alignment identifies drugs that target disrupted pathways",
        "Pathway-to-drug mapping explains biological rationale for therapy selection",
        "Biological reasoning shows why certain drugs are relevant to pathway disruptions",
        "Research-mode positioning with transparent biological methodology"
      ]
    },
    {
      number: 4,
      title: "Transparent Provenance",
      description: "Complete audit trail with biological reasoning, source citations, and methodology documentation.",
      icon: CheckCircle,
      solutions: [
        "Audit trail documents the biological logic behind pathway analysis",
        "Source citations show where pathway and gene information comes from",
        "Standardized format ensures consistent biological interpretation",
        "Research-use-only positioning with transparent methodology"
      ]
    }
  ]
};
