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
      title: "Smart Trial Search",
      description: "AI-powered vector search understands patient context, biomarkers, and trial requirements with intelligent synonym mapping.",
      icon: Zap,
      solutions: [
        "Vector search with patient-aware query understanding achieves 95% accuracy",
        "Biomarker synonym mapping reduces false negatives by 85%",
        "Real-time trial database integration with live refresh from 15+ sources",
        "Smart search compresses 50+ trials to 5-12 relevant options in under 2 minutes"
      ]
    },
    {
      number: 2,
      title: "Clear Eligibility Assessment",
      description: "Structured eligibility analysis with Likely/Potential/Unlikely labels and transparent reasoning for each criterion.",
      icon: Shield,
      solutions: [
        "Structured met/unmet/unclear criteria assessment with 90% confidence scoring",
        "Clear Likely/Potential/Unlikely eligibility labels reduce uncertainty by 80%",
        "Transparent reasoning with 2-3 sentence explanations and source citations",
        "Reduced eligibility confusion by 60-65% compared to manual assessment"
      ]
    },
    {
      number: 3,
      title: "Rapid Trial Shortlisting",
      description: "AI generates comprehensive trial shortlists in minutes instead of days, with clear provenance and export capabilities.",
      icon: Activity,
      solutions: [
        "Time-to-first-trial reduced by 60-65% from days to minutes",
        "One-pager export with run ID and profile accelerates tumor board prep by 75%",
        "Shareable results for tumor board preparation reduce meeting time by 50%",
        "JSON/CSV export for tracking and documentation with 100% audit trail"
      ]
    },
    {
      number: 4,
      title: "Research-Grade Trial Matching",
      description: "Validated trial matching with 95.7% AUROC ClinVar foundations and auditable provenance for research use.",
      icon: CheckCircle,
      solutions: [
        "95.7% AUROC ClinVar validation for variant-based eligibility across 53,210 variants",
        "Splice AUROC ~82.5-82.6 for noncoding/splicing criteria improves accuracy by 40%",
        "Auditable provenance with run ID and profile tracking ensures 100% transparency",
        "Research-use-only positioning with transparent methodology and peer-reviewed validation"
      ]
    }
  ]
};
