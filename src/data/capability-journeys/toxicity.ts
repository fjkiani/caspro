import { CapabilityJourneyData } from './types';

export const toxicityJourney: CapabilityJourneyData = {
  title: "Toxicity Risk Assessment Journey",
  subtitle: "From reactive toxicity management to proactive risk identification",

  oldWaySteps: [
    {
      number: 1,
      title: "Reactive Toxicity Management",
      description: "Toxicities discovered only after treatment begins, often too late to prevent serious adverse events",
      icon: "AlertTriangle",
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
      icon: "Search",
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
      icon: "MessageSquare",
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
      icon: "Shield",
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
      description: "AI-powered germline analysis identifies toxicity risks before treatment begins",
      icon: "Shield",
      solutions: [
        "Real-time germline variant analysis with 95.7% AUROC accuracy",
        "Early identification of high-risk patients before treatment",
        "Proactive risk mitigation strategies",
        "Preventive approach to patient safety"
      ]
    },
    {
      number: 2,
      title: "Centralized Risk Assessment",
      description: "Comprehensive risk evaluation using ClinVar database and evidence synthesis",
      icon: "Database",
      solutions: [
        "Systematic evaluation of 53,210 variants from ClinVar database",
        "Centralized risk assessment protocol",
        "Evidence-based risk scoring with confidence metrics",
        "Consistent evaluation across all patients"
      ]
    },
    {
      number: 3,
      title: "Clear Communication Tools",
      description: "Plain-language caution chips with confidence scores and shareable documentation",
      icon: "FileText",
      solutions: [
        "One-sentence helper text in plain language",
        "Confidence scores and evidence tiers for transparency",
        "Shareable one-page summaries with run IDs",
        "Standardized format for team communication"
      ]
    },
    {
      number: 4,
      title: "Personalized Prevention",
      description: "Genetics-informed risk stratification with actionable mitigation strategies",
      icon: "Target",
      solutions: [
        "Personalized risk profiles based on germline variants",
        "Repair/inflammation pathway analysis for targeted risk assessment",
        "Actionable recommendations for treatment modification",
        "Research-grade validation with transparent methodology"
      ]
    }
  ]
};
