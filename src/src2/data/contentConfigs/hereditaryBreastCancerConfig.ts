/**
 * Hereditary Breast Cancer Content Configuration
 * 
 * This file contains all content data for the hereditary breast cancer use case,
 * following the component-driven architecture for maximum reusability.
 */

import { Target, Shield, UserCheck, Activity, Dna, AlertTriangle, TrendingUp } from 'lucide-react';

// Hero slide configuration
export const heroSlideConfig = {
  title: "Hereditary Breast Cancer",
  subtitle: "In-Silico Co-Pilot (RUO)",
  description: "Transforming BRCA1/2 variant uncertainty into actionable precision prevention strategies through AI-powered discriminative and generative analysis",
  metrics: [
    { value: "95.7%", label: "ClinVar AUROC", color: "cyan" },
    { value: "73%", label: "VUS Resolution", color: "green" },
    { value: "89.1%", label: "BRCA1 AUROC", color: "purple" }
  ]
};

// Two-Hit Hypothesis configuration
export const twoHitHypothesisConfig = {
  title: "The Two-Hit Hypothesis",
  subtitle: "Understanding hereditary breast cancer through the lens of tumor suppressor gene inactivation",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
  steps: [
    {
      title: "First Hit",
      subtext: "Inherited mutation in BRCA1/2<br/>• Germline variant<br/>• Family history<br/>• 50% risk inheritance",
      colorClass: "bg-gradient-to-br from-red-500 to-red-600",
      mutationIcon: "⚠️",
      animationClass: "animate-pulse"
    },
    {
      title: "Second Hit", 
      subtext: "Somatic mutation in remaining allele<br/>• Loss of heterozygosity<br/>• Point mutation<br/>• Chromosomal deletion",
      colorClass: "bg-gradient-to-br from-orange-500 to-orange-600",
      mutationIcon: "🎯",
      animationClass: "animate-bounce"
    },
    {
      title: "Cancer Development",
      subtext: "Loss of tumor suppression<br/>• Uncontrolled cell growth<br/>• DNA repair failure<br/>• Tumor formation",
      colorClass: "bg-gradient-to-br from-red-600 to-red-700",
      mutationIcon: "📈",
      animationClass: "animate-pulse"
    }
  ]
};

// Oracle VUS Resolution configuration
export const oracleVUSConfig = {
  title: "Oracle VUS Resolution",
  subtitle: "Transforming BRCA1/2 variants of uncertain significance into actionable clinical decisions",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900",
  demoData: {
    left: {
      title: "Traditional Analysis",
      value: "VUS",
      subtitle: "Variant of Uncertain Significance"
    },
    right: {
      title: "CrisPRO Oracle",
      value: "PATHOGENIC",
      subtitle: "High-confidence classification"
    },
    score: {
      title: "Zeta Score",
      value: "-26.8"
    }
  },
  metrics: [
    { label: "ClinVar AUROC", value: "95.7%", color: "cyan" },
    { label: "BRCA1 Zero-shot AUROC", value: "89.1%", color: "green" },
    { label: "BRCA2 Zero-shot AUROC", value: "90.1%", color: "purple" },
    { label: "VUS Resolution Rate", value: "73%", color: "orange" }
  ]
};

// Forge Therapeutic Design configuration
export const forgeDesignConfig = {
  title: "Forge Therapeutic Design",
  subtitle: "Generating precision prevention strategies for hereditary breast cancer risk management",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
  column1: {
    input: "BRCA1/2 Pathogenic Variant",
    mission: "Generate Precision Prevention Strategy",
    assets: [
      { icon: Dna, label: "CRISPR Guide Design" },
      { icon: Shield, label: "Risk Stratification" },
      { icon: Target, label: "Monitoring Protocol" }
    ]
  },
  column2: {
    title: "Our Unfair Advantage:",
    highlight: "1M Token Context",
    description: "Complete genomic neighborhood analysis for comprehensive therapeutic design",
    infoHeader: "Research Use Only",
    infoText: "For research purposes only. Not for clinical decision making."
  }
};

// Clinical Impact configuration
export const clinicalImpactConfig = {
  title: "Clinical Impact & Next Steps",
  subtitle: "From AI-powered insights to actionable clinical decisions",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900",
  benefits: [
    { icon: UserCheck, color: "green", text: "73% VUS resolution rate" },
    { icon: Activity, color: "blue", text: "Precision prevention strategies" },
    { icon: Shield, color: "purple", text: "Risk stratification" },
    { icon: Target, color: "orange", text: "Personalized monitoring" }
  ],
  nextSteps: [
    {
      title: "Clinical Validation",
      description: "Prospective validation in clinical cohorts",
      color: "cyan"
    },
    {
      title: "Regulatory Pathway", 
      description: "FDA Breakthrough Therapy Designation",
      color: "green"
    },
    {
      title: "Clinical Integration",
      description: "Integration with existing clinical workflows",
      color: "purple"
    },
    {
      title: "Population Impact",
      description: "Scalable precision prevention programs",
      color: "orange"
    }
  ]
};

// Complete slide configuration array
export const hereditaryBreastCancerSlides = [
  {
    type: 'hero' as const,
    data: heroSlideConfig
  },
  {
    type: 'two-hit-hypothesis' as const,
    data: twoHitHypothesisConfig
  },
  {
    type: 'oracle-vus' as const,
    data: oracleVUSConfig
  },
  {
    type: 'forge-design' as const,
    data: forgeDesignConfig
  },
  {
    type: 'clinical-impact' as const,
    data: clinicalImpactConfig
  }
];

// Branding configuration
export const hereditaryBreastCancerBranding = {
  company: "CrisPRO.ai",
  icon: "🧬"
};

// Complete deck configuration
export const hereditaryBreastCancerDeckConfig = {
  title: "Hereditary Breast Cancer: In-Silico Co-Pilot",
  subtitle: "BRCA1/2 variant analysis and precision prevention strategies",
  slides: hereditaryBreastCancerSlides,
  branding: hereditaryBreastCancerBranding
};

