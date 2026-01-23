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
  Activity
} from 'lucide-react';

import { CapabilityJourneyData } from '../capability-journeys';

// Clinical Trials Matching Journey - REAL RUO CAPABILITIES
export const clinicalTrialsJourney: CapabilityJourneyData = {
  title: "The Clinical Trial Matching Journey",
  subtitle: "From manual trial searching chaos to intelligent, AI-powered trial matching with clear eligibility and provenance",
  oldWaySteps: [
    {
      number: 1,
      title: "Manual Trial Search",
      description: "Clinicians manually search through hundreds of clinical trials using basic keyword matching and outdated databases.",
      icon: Search,
      problems: [
        "Hours spent searching through 50+ irrelevant trials per patient",
        "Keyword-based search misses 40% of relevant biomarker synonyms",
        "No understanding of patient-specific eligibility criteria leads to 60% false positives",
        "Fragmented databases with inconsistent information across 15+ sources"
      ]
    },
    {
      number: 2,
      title: "Eligibility Confusion",
      description: "Complex eligibility criteria create confusion about patient fit, leading to missed opportunities and wasted time.",
      icon: AlertTriangle,
      problems: [
        "Unclear inclusion/exclusion criteria interpretation causes 70% uncertainty",
        "No structured eligibility assessment leads to 3-5 days per trial review",
        "High false positive rates in trial matching waste 80% of clinical time",
        "Manual eligibility checking takes 2-3 days per trial on average"
      ]
    },
    {
      number: 3,
      title: "Time-Consuming Review",
      description: "Each trial requires extensive manual review, creating bottlenecks in patient care and research participation.",
      icon: Clock,
      problems: [
        "Average 2-3 days per trial eligibility assessment across 5+ team members",
        "Multiple team members needed for comprehensive review increases costs by 300%",
        "High risk of missing 25% of relevant trials due to time constraints",
        "Delayed patient enrollment in potentially beneficial trials by 2-4 weeks"
      ]
    },
    {
      number: 4,
      title: "Trial Matching Failures",
      description: "Without intelligent matching, patients miss opportunities for cutting-edge treatments and research participation.",
      icon: Target,
      problems: [
        "40% of eligible patients never matched to relevant trials due to poor search",
        "High dropout rates of 60% due to poor initial matching and confusion",
        "Research teams miss 30% of qualified participants due to manual processes",
        "Delayed access to potentially life-saving treatments by 6-8 weeks on average"
      ]
    }
  ],
  newWaySteps: [
    {
      number: 1,
      title: "Biology-Aware Trial Search",
      description: "CrisPRO searches trials by understanding patient biomarkers and connecting them to trial eligibility criteria through biological reasoning.",
      icon: Zap,
      solutions: [
        "Biomarker analysis identifies patient's genetic and molecular profile",
        "Biological matching connects patient biomarkers to trial drug mechanisms",
        "Synonym mapping recognizes different names for the same biomarkers",
        "Trial database integration searches across multiple sources simultaneously"
      ]
    },
    {
      number: 2,
      title: "Clear Eligibility Assessment",
      description: "Structured eligibility analysis with biological reasoning explaining why patients meet or don't meet each criterion.",
      icon: Shield,
      solutions: [
        "Biological analysis evaluates how patient genetics align with trial requirements",
        "Clear Likely/Potential/Unlikely labels with biological explanations",
        "Transparent reasoning shows the biological basis for each eligibility determination",
        "Mechanism-based matching connects patient pathways to trial drug targets"
      ]
    },
    {
      number: 3,
      title: "Efficient Trial Shortlisting",
      description: "CrisPRO generates trial shortlists by matching patient biology to trial mechanisms, with clear provenance and export capabilities.",
      icon: Activity,
      solutions: [
        "Biology-based ranking prioritizes trials that target patient's pathway vulnerabilities",
        "One-pager export includes biological rationale for trial relevance",
        "Shareable results help care teams understand why trials are good matches",
        "Export capabilities enable tracking and documentation of matching logic"
      ]
    },
    {
      number: 4,
      title: "Transparent Trial Matching",
      description: "Research-grade methodology with biological reasoning and auditable provenance for clinical decision support.",
      icon: CheckCircle,
      solutions: [
        "Biological reasoning explains how patient biomarkers connect to trial eligibility",
        "Variant impact analysis informs eligibility for biomarker-driven trials",
        "Auditable provenance documents the biological logic behind each match",
        "Research-use-only positioning with transparent methodology"
      ]
    }
  ]
};
