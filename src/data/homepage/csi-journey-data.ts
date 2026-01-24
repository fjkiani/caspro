/**
 * CSI Journey Data - Data-Driven Journey Levels
 * Extracted from validation context + medical hierarchy
 * 
 * Source:
 * - PLATFORM_CAPABILITY_SUMMARY.md (Static → Real-Time → Evolution)
 * - FOCUSED_HERO_CONFIG.medicalHierarchy.dataDependencies
 * - CORE_DIFFERENTIATOR_STATIC_TO_EVOLUTION.md
 */

import { BarChart3, Pill, AlertTriangle, Shield, FileText } from 'lucide-react';

export interface JourneyLevel {
  level: number;
  title: string;
  subtitle: string; // Metric shown at top (e.g., "AUROC 0.714")
  description: string; // Short description (line-clamp-3)
  data: string;
  unlocks: string[];
  color: 'blue' | 'purple' | 'orange' | 'green' | 'indigo';
  icon: string;
  metric: string; // Main metric (e.g., "AUROC 0.714")
  time: string; // Time estimate (e.g., "30 seconds")
  href: string; // Route to detail page
  validation?: {
    status: 'proof-of-concept' | 'retrospective-tested' | 'production';
    metric?: string;
    source?: string;
  };
}

export const csiJourneyLevels: JourneyLevel[] = [
  {
    level: 1,
    title: "The Score",
    subtitle: "AUROC 0.714",
    description: "Basic CSI calculation from stage and cancer type. Predicts 6-month PFS probability for next DDR-targeted therapy with validated mechanism fit.",
    data: "Basic patient info (stage, cancer type)",
    unlocks: [
      "CSI Score (0-100)",
      "Will chemo work? Yes/No answer",
      "Expected benefit duration (6-month PFS probability)"
    ],
    color: "blue",
    icon: "📊",
    metric: "AUROC 0.714",
    time: "30 seconds",
    href: "/products/oncology", // Route to CSI detail
    validation: {
      status: 'retrospective-tested',
      metric: 'TOPACIO validation (p=0.023)',
      source: 'FOCUSED_HERO_CONFIG.primaryClaim'
    }
  },
  {
    level: 2,
    title: "Therapies & Trials",
    subtitle: "S/P/E Framework",
    description: "Drug recommendations and clinical trial matching with genomic context. Mechanism-based matching with transparent S/P/E scoring.",
    data: "+ Genomic test results (NGS)",
    unlocks: [
      "Top 5 drug recommendations ranked by match",
      "Clinical trials you qualify for",
      "Why each therapy fits your specific tumor (S/P/E framework)",
      "Mechanism map and pathway analysis"
    ],
    color: "purple",
    icon: "💊",
    metric: "AUROC 0.70",
    time: "45 seconds",
    href: "/products/oncology/match-patients-to-therapies",
    validation: {
      status: 'retrospective-tested',
      metric: 'S/P/E Pipeline (n=149)',
      source: 'PLATFORM_CAPABILITY_SUMMARY.md - Baseline Resistance Prediction'
    }
  },
  {
    level: 3,
    title: "Resistance Prediction",
    subtitle: "3-6 Weeks Early",
    description: "Predict when chemo might stop working and when to retest. Post-treatment pathway profiling captures tumor evolution after treatment.",
    data: "+ Treatment history (PFI, PTPI, TFI, PFS, OS)",
    unlocks: [
      "When chemo might stop working (resistance timeline)",
      "Early warning signs to watch for",
      "When to retest and recalculate CSI",
      "Post-treatment pathway profiling (evolution tracking)"
    ],
    color: "orange",
    icon: "⚠️",
    metric: "3-6 Weeks Earlier",
    time: "60 seconds",
    href: "/products/oncology/predict-resistance",
    validation: {
      status: 'retrospective-tested',
      metric: 'Post-treatment profiling AUROC 0.714-0.750 (n=11)',
      source: 'CORE_DIFFERENTIATOR_STATIC_TO_EVOLUTION.md - Post-Treatment Pathway Profiling'
    }
  },
  {
    level: 4,
    title: "Safety & Dosing",
    subtitle: "100% PGx Coverage",
    description: "Prevent dangerous side effects with genetic safety screening. Life-threatening prevention with drug interaction checking.",
    data: "+ Genetic safety screening (germline variants)",
    unlocks: [
      "Prevent dangerous side effects before they happen",
      "Personalized dosing recommendations",
      "Drug interactions to avoid",
      "PGx-guided therapy selection"
    ],
    color: "green",
    icon: "🛡️",
    metric: "100% Coverage",
    time: "30 seconds",
    href: "/products/oncology/prevent-toxicity",
    validation: {
      status: 'retrospective-tested',
      metric: '83.1% toxicity reduction (PREPARE trial)',
      source: 'PGX_VALIDATION_CONTEXT.md'
    }
  },
  {
    level: 5,
    title: "Complete Care Plan",
    subtitle: "Platform Journey",
    description: "Continuous monitoring with automatic CSI updates and complete treatment timeline. Static → Real-Time → Evolution tracking.",
    data: "+ Continuous monitoring (CA-125, biomarkers, completeness L2)",
    unlocks: [
      "CSI updates automatically as tumor changes",
      "Complete treatment timeline (baseline → during treatment → post-treatment)",
      "Exportable care plan for your medical team",
      "Platform journey: Static → Real-Time → Evolution"
    ],
    color: "indigo",
    icon: "📋",
    metric: "Complete Platform",
    time: "Real-time",
    href: "/products/oncology",
    validation: {
      status: 'proof-of-concept',
      metric: 'Platform architecture complete',
      source: 'PLATFORM_CAPABILITY_SUMMARY.md'
    }
  }
];

/**
 * Transform journey levels to SolutionInteractiveBase format
 */
export const csiJourneyToVisualFlow = csiJourneyLevels.map((level, idx) => ({
  number: level.level,
  title: level.title,
  description: level.description,
  icon: 'BarChart3', // Will be mapped by SolutionInteractiveBase
  color: level.color,
  details: [
    { label: 'Data Required', value: level.data },
    ...level.unlocks.map((unlock, i) => ({
      label: `Unlock ${i + 1}`,
      value: unlock
    }))
  ],
  metrics: level.validation ? [
    { label: 'Status', value: level.validation.status },
    ...(level.validation.metric ? [{ label: 'Validation', value: level.validation.metric }] : [])
  ] : []
}));
