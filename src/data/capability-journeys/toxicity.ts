import { CapabilityJourneyData } from './types';
import { 
  AlertTriangle, 
  Search, 
  MessageSquare, 
  Shield, 
  Database, 
  FileText, 
  Target 
} from 'lucide-react';

export const toxicityJourney: CapabilityJourneyData = {
  title: "Toxicity Risk Assessment Journey",
  subtitle: "From reactive toxicity management to proactive risk identification",

  oldWaySteps: [
    {
      number: 1,
      title: "Reactive Toxicity Management",
      description: "Toxicities discovered only after treatment begins, often too late to prevent serious adverse events",
      icon: AlertTriangle,
      problems: [
        "Toxicities surface during treatment, causing delays and complications",
        "No early warning system for high-risk patients",
        "Reactive approach leads to treatment interruptions",
        "Limited ability to predict which patients will experience severe side effects"
      ]
    },
    {
      number: 2,
      title: "Scattered Risk Information",
      description: "Risk signals scattered across multiple sources, making comprehensive assessment difficult",
      icon: Search,
      problems: [
        "Germline variants not systematically evaluated for toxicity risk",
        "Literature scattered across multiple databases and journals",
        "No centralized risk assessment protocol",
        "Inconsistent evaluation across different care providers"
      ]
    },
    {
      number: 3,
      title: "Communication Challenges",
      description: "Difficulty sharing risk information in a clear, actionable format across care teams",
      icon: MessageSquare,
      problems: [
        "Complex risk information hard to communicate to patients",
        "Inconsistent documentation across team members",
        "No standardized format for risk discussion",
        "Limited time for comprehensive risk counseling"
      ]
    },
    {
      number: 4,
      title: "Limited Prevention Strategies",
      description: "Few tools available to proactively identify and mitigate toxicity risks before treatment",
      icon: Shield,
      problems: [
        "Generic toxicity management without personalization",
        "No genetics-informed risk stratification",
        "Limited ability to modify treatment plans based on risk",
        "Reactive rather than preventive approach to patient safety"
      ]
    }
  ],

  newWaySteps: [
    {
      number: 1,
      title: "Proactive Risk Identification",
      description: "CrisPRO analyzes germline variants in drug-metabolizing enzymes to identify patients at risk for toxicity before treatment begins",
      icon: Shield,
      solutions: [
        "Pharmacogenomic variant analysis identifies variants in DPYD, TPMT, UGT1A1, CYP2D6",
        "Biological reasoning explains how variants affect drug metabolism and clearance",
        "Early identification allows proactive dose adjustment or alternative drug selection",
        "Preventive approach based on understanding drug-gene interactions"
      ]
    },
    {
      number: 2,
      title: "Pathway-Based Risk Assessment",
      description: "Comprehensive risk evaluation connecting drug mechanisms to patient pathway vulnerabilities",
      icon: Database,
      solutions: [
        "Pathway overlap analysis identifies when drug MoA stresses patient's vulnerable pathways",
        "Biological reasoning explains why certain drug-pathway combinations increase risk",
        "Evidence-based risk assessment uses variant impact predictions and literature",
        "Consistent methodology ensures all patients receive thorough biological analysis"
      ]
    },
    {
      number: 3,
      title: "Clear Biological Communication",
      description: "Plain-language explanations of toxicity mechanisms with biological rationale and shareable documentation",
      icon: FileText,
      solutions: [
        "Biological explanations describe how variants affect drug metabolism pathways",
        "Mechanism-based reasoning shows why certain drugs pose higher risk",
        "Shareable documentation includes biological rationale and source citations",
        "Standardized format helps care teams understand the biological basis for recommendations"
      ]
    },
    {
      number: 4,
      title: "Biology-Informed Prevention",
      description: "Genetics-informed risk stratification with pathway-specific mitigation strategies",
      icon: Target,
      solutions: [
        "Personalized risk profiles based on how patient genetics interact with drug mechanisms",
        "Pathway analysis identifies which biological processes are at risk",
        "Mitigation strategies target specific pathways (e.g., DNA repair, inflammation)",
        "Research-grade methodology with transparent biological reasoning"
      ]
    }
  ]
};
