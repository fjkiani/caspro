/**
 * Multiple Myeloma Component-Driven Configuration
 * 
 * This file contains all content data for the Multiple Myeloma use case,
 * following the component-driven architecture for maximum reusability.
 * Based on the validated content from mmdeck.md and existing MM content.
 */

import { Target, Shield, UserCheck, Activity, Bot } from 'lucide-react';
import React from 'react';

// Hero slide configuration
export const mmHeroSlideConfig = {
  title: "Multiple Myeloma",
  subtitle: "In-Silico Co-Pilot (RUO)",
  description: "From genetic chaos to actionable clarity - transforming variant uncertainty into ranked therapeutic strategies",
  metrics: [
    { value: "95.7%", label: "ClinVar AUROC", color: "cyan" },
    { value: "73%", label: "VUS Resolution", color: "green" },
    { value: "89%", label: "WIWFM Confidence", color: "purple" }
  ]
};

// Two-Hit Hypothesis configuration for MM
export const mmTwoHitHypothesisConfig = {
  title: "Two-Hit Hypothesis in Multiple Myeloma",
  subtitle: "The one-two punch that drives myeloma progression",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900",
  steps: [
    {
      title: "Hit 1: Stuck Accelerator",
      subtext: "BRAF/KRAS mutations lock growth signals ON<br/>• MAPK hyperactivation<br/>• Constitutive proliferation<br/>• Growth advantage",
      colorClass: "bg-gradient-to-br from-red-500 to-red-600",
      mutationIcon: "🚗",
      animationClass: "animate-pulse"
    },
    {
      title: "Hit 2: Failed Brakes", 
      subtext: "TP53/DNA repair defects disable safety systems<br/>• Loss of cell cycle control<br/>• Apoptosis resistance<br/>• Genomic instability",
      colorClass: "bg-gradient-to-br from-orange-500 to-orange-600",
      mutationIcon: "🛑",
      animationClass: "animate-bounce"
    },
    {
      title: "Bone Marrow Niche",
      subtext: "Protective environment enables resistance<br/>• Stromal support<br/>• Immune evasion<br/>• Drug sanctuary",
      colorClass: "bg-gradient-to-br from-purple-500 to-purple-600",
      mutationIcon: "🏠",
      animationClass: "animate-pulse"
    }
  ]
};

// Oracle VUS Resolution configuration
export const mmOracleVUSConfig = {
  title: "Oracle VUS Resolution",
  subtitle: "Transforming BRAF V600E uncertainty into actionable pathway insights",
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
      subtitle: "MAPK Hyperactivation → MAPK Inhibitors"
    },
    score: {
      title: "Confidence Score",
      value: "95%"
    }
  },
  metrics: [
    { label: "ClinVar AUROC", value: "95.7%", color: "cyan" },
    { label: "BRCA1 Zero-shot AUROC", value: "89.1%", color: "green" },
    { label: "Splice Variants AUROC", value: "82.6%", color: "purple" },
    { label: "VUS Resolution Rate", value: "73%", color: "orange" }
  ]
};

// Forge Therapeutic Design configuration
export const mmForgeDesignConfig = {
  title: "Forge: Will-It-Work-For-Me (WIWFM)",
  subtitle: "From pathway insights to ranked therapeutic strategies with confidence scores",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
  column1: {
    input: "BRAF V600E + MAPK Hyperactivation",
    mission: "Rank Therapeutic Classes",
    assets: [
      { icon: Target, label: "MAPK Inhibitors" },
      { icon: Shield, label: "Proteasome Inhibitors" },
      { icon: Bot, label: "Anti-CD38 mAbs" }
    ]
  },
  column2: {
    title: "Our Unfair Advantage:",
    highlight: "Evidence-Based Ranking",
    description: "Confidence scores with clear rationale and literature citations for every therapeutic class",
    infoHeader: "Research Use Only",
    infoText: "WIWFM confidence ~0.45-0.51 with transparent methodology and run IDs"
  }
};

// Clinical Impact configuration
export const mmClinicalImpactConfig = {
  title: "Clinical Impact & Research Applications",
  subtitle: "From AI insights to research-ready therapeutic strategies",
  backgroundClass: "bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900",
  benefits: [
    { icon: UserCheck, color: "green", text: "73% VUS resolution rate (research mode)" },
    { icon: Activity, color: "blue", text: "Ranked therapy classes with confidence scores" },
    { icon: Shield, color: "purple", text: "Pathway-aligned therapeutic strategies" },
    { icon: Target, color: "orange", text: "Clinical trials shortlist (50+ → 5-12)" }
  ],
  nextSteps: [
    {
      title: "Research Validation",
      description: "Wet-lab validation of top-ranked therapeutic strategies",
      color: "cyan"
    },
    {
      title: "Clinical Trials Matching", 
      description: "Likely/Potential/Unlikely trial categorization",
      color: "green"
    },
    {
      title: "Dossier Generation",
      description: "Complete research dossier with run IDs and provenance",
      color: "purple"
    },
    {
      title: "Cohort Integration",
      description: "Population-level insights for precision medicine",
      color: "orange"
    }
  ]
};

// Use Case JSON slide configuration (from mmdeck.md content)
export const mmUseCaseJSONConfig = {
  title: "Multiple Myeloma: Live JSON Output",
  subtitle: "Real-time therapeutic analysis with highlighted research metrics",
  jsonOutput: `{
  "oracle_analysis": {
    "variant": "BRAF V600E",
    "classification": "PATHOGENIC",
    "confidence": 0.95, // 🎯 High confidence classification
    "pathway_impact": "MAPK Hyperactivation",
    "auroc": 0.957, // 🏆 ClinVar validation (n=14,319)
    "vus_resolution": 0.73 // 🎯 73% VUS → actionable
  },
  "forge_wiwfm": {
    "therapy_ranking": [
      {
        "class": "MAPK Inhibitors",
        "confidence": 0.89, // 🎯 Top-ranked for BRAF V600E
        "rationale": "Direct pathway targeting",
        "tier": "Likely"
      },
      {
        "class": "Proteasome Inhibitors",
        "confidence": 0.76, // 📊 Standard of care
        "rationale": "Synergy with MAPK targeting",
        "tier": "Likely"
      },
      {
        "class": "Anti-CD38 mAbs",
        "confidence": 0.68, // 📋 Evidence-based
        "rationale": "Immunotherapy backbone",
        "tier": "Consider"
      }
    ],
    "context_window": "1M_tokens", // 🧬 Full genomic context
    "wiwfm_confidence": 0.51 // 📊 Research-mode expectation
  },
  "clinical_trials": {
    "shortlist_compression": "50+ → 7", // ⚡ Efficient screening
    "categories": {
      "likely": 3, // 🎯 High-priority trials
      "potential": 4, // 📋 Worth considering
      "unlikely": 0 // ❌ Filtered out
    }
  },
  "provenance": {
    "model": "Evo2-40B",
    "validation": "ClinVar_53210_variants",
    "run_id": "mm_${Date.now().toString(36)}",
    "profile": "Fusion_AM_eligible", // 🔬 AlphaMissense coverage
    "research_mode": true // ⚠️ Not clinical claims
  }
}`,
  explanations: [
    {
      title: "Evidence-Based Confidence",
      description: "All confidence scores backed by ClinVar validation (95.7% AUROC) and transparent methodology",
      icon: React.createElement(UserCheck, { size: 24, className: "text-green-400" })
    },
    {
      title: "Pathway-Aligned Ranking",
      description: "Therapeutic classes ranked by pathway relevance - MAPK inhibitors top-ranked for BRAF V600E",
      icon: React.createElement(Target, { size: 24, className: "text-blue-400" })
    },
    {
      title: "Research Transparency",
      description: "Complete audit trail with run IDs, model versions, and research-mode disclaimers for reproducibility",
      icon: React.createElement(Activity, { size: 24, className: "text-purple-400" })
    }
  ]
};

// Complete slide configuration array
export const multipleMyelomaComponentSlides = [
  {
    type: 'hero' as const,
    data: mmHeroSlideConfig
  },
  {
    type: 'two-hit-hypothesis' as const,
    data: mmTwoHitHypothesisConfig
  },
  {
    type: 'oracle-vus' as const,
    data: mmOracleVUSConfig
  },
  {
    type: 'forge-design' as const,
    data: mmForgeDesignConfig
  },
  {
    type: 'use-case-json' as const,
    data: mmUseCaseJSONConfig
  },
  {
    type: 'clinical-impact' as const,
    data: mmClinicalImpactConfig
  }
];

// Branding configuration
export const multipleMyelomaComponentBranding = {
  company: "CrisPRO.ai",
  icon: "🧬"
};

// Complete deck configuration
export const multipleMyelomaComponentDeckConfig = {
  title: "Multiple Myeloma: In-Silico Co-Pilot",
  subtitle: "From genetic chaos to actionable therapeutic clarity (RUO)",
  slides: multipleMyelomaComponentSlides,
  branding: multipleMyelomaComponentBranding
};
