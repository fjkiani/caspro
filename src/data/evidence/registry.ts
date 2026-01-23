import { 
  Shield, 
  Layers, 
  Database, 
  Brain, 
  Users, 
  BookOpen,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';
import React from 'react';

// Import existing data structures
import { evidenceData } from './evidence-data';
import { speFusionData } from './spe-fusion-data';
import { dataLabData } from './data-lab-data';
import { saeData } from './sae-data';

// Evidence sections registry using existing data
export const evidenceSectionsRegistry = {
  'evidence-intelligence': evidenceData,
  'spe-fusion': speFusionData,
  'data-lab': dataLabData,
  'sae-intelligence': saeData,
  // Cohort context - minimal data structure for now
  'cohort-context': {
    id: 'cohort-context',
    title: 'Cohort Context',
    description: 'Add small, trustworthy cohort snippets to ground your in-silico results without slowing decisions.',
    interactiveDemo: {
      component: 'CohortContextSimulator',
      title: 'Try Cohort Context Live',
      description: 'See how population data enhances individual predictions',
      features: ['Population analysis', 'Cohort matching', 'Context grounding']
    }
  }
} as const;

// Overview data for the main evidence platform
export const evidenceOverviewData = {
  // hero: {
  //   title: 'Evidence Intelligence Platform',
  //   subtitle: 'Interconnected AI for Evidence-Based Discovery',
  //   description: 'Transform raw research findings into structured, actionable evidence with AI-powered confidence scoring, multi-dimensional analysis, and population context.',
  //   badges: [
  //     { text: '95.7% ClinVar AUROC', color: 'bg-blue-100 text-blue-700' },
  //     { text: '53,210 variants validated', color: 'bg-green-100 text-green-700' },
  //     { text: 'Real-time variant interpretation', color: 'bg-purple-100 text-purple-700' }
  //   ]
  // },

  // capabilities: [
  //   {
  //     id: 'evidence-intelligence',
  //     title: 'Evidence Intelligence',
  //     description: 'Automated evidence tiering with confidence scoring and full provenance tracking',
  //     icon: BookOpen,
  //     iconBg: 'bg-blue-100',
  //     iconColor: 'text-blue-600',
  //     textColor: 'text-blue-600',
  //     hoverBorder: 'hover:border-blue-300',
  //     stats: '95.7% ClinVar AUROC'
  //   },
  //   {
  //     id: 'spe-fusion',
  //     title: 'S/P/E Fusion',
  //     description: 'Integrates Structure, Phenotype, and Expression data for comprehensive variant analysis',
  //     icon: Layers,
  //     iconBg: 'bg-green-100',
  //     iconColor: 'text-green-600',
  //     textColor: 'text-green-600',
  //     hoverBorder: 'hover:border-green-300',
  //     stats: '95.0% BRCA AUROC'
  //   },
  //   {
  //     id: 'data-lab',
  //     title: 'Data Lab',
  //     description: 'Interactive study browser with real-time therapeutic pipeline integration',
  //     icon: Database,
  //     iconBg: 'bg-purple-100',
  //     iconColor: 'text-purple-600',
  //     textColor: 'text-purple-600',
  //     hoverBorder: 'hover:border-purple-300',
  //     stats: 'Rapid cohort extraction'
  //   },
  //   {
  //     id: 'sae-intelligence',
  //     title: 'SAE Intelligence',
  //     description: 'Interpretable AI that explains predictions with biological context and feature attribution',
  //     icon: Brain,
  //     iconBg: 'bg-orange-100',
  //     iconColor: 'text-orange-600',
  //     textColor: 'text-orange-600',
  //     hoverBorder: 'hover:border-orange-300',
  //     stats: 'Transparent AI explanations'
  //   },
  //   {
  //     id: 'cohort-context',
  //     title: 'Cohort Context',
  //     description: 'Population-level insights that enhance individual patient treatment decisions',
  //     icon: Users,
  //     iconBg: 'bg-indigo-100',
  //     iconColor: 'text-indigo-600',
  //     textColor: 'text-indigo-600',
  //     hoverBorder: 'hover:border-indigo-300',
  //     stats: 'Population-level insights'
  //   },
  //   {
  //     id: 'unified-workflow',
  //     title: 'Unified Workflow',
  //     description: 'Seamlessly connected tools that accelerate research from hypothesis to validation',
  //     icon: Target,
  //     iconBg: 'bg-teal-100',
  //     iconColor: 'text-teal-600',
  //     textColor: 'text-teal-600',
  //     hoverBorder: 'hover:border-teal-300',
  //     stats: 'End-to-end R&D acceleration'
  //   }
  // ],

  featureConnections: [
    {
      title: "Evidence → S/P/E Fusion",
      description: "Evidence confidence scores enhance multi-dimensional variant predictions",
      icon: React.createElement(Zap, { className: "w-5 h-5" }),
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "S/P/E Fusion → Data Lab",
      description: "Fusion results feed into study analysis for comprehensive validation",
      icon: React.createElement(TrendingUp, { className: "w-5 h-5" }),
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Data Lab → SAE Intelligence",
      description: "Study findings inform AI feature attribution and disruption scoring",
      icon: React.createElement(Brain, { className: "w-5 h-5" }),
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "SAE → Cohort Context",
      description: "AI explanations provide biological context for population stratification",
      icon: React.createElement(Users, { className: "w-5 h-5" }),
      color: "bg-orange-100 text-orange-600"
    }
  ]
};

// Tab configuration for unified evidence page
export const evidenceTabsConfig = [
  {
    id: 'overview',
    label: 'Evidence Overview',
    icon: Shield,
    sectionId: 'overview' // Special case for overview
  },
  {
    id: 'evidence-intelligence',
    label: 'Evidence Intelligence',
    icon: BookOpen,
    sectionId: 'evidence-intelligence'
  },
  {
    id: 'spe-fusion',
    label: 'S/P/E Fusion',
    icon: Layers,
    sectionId: 'spe-fusion'
  },
  {
    id: 'data-lab',
    label: 'Data Lab',
    icon: Database,
    sectionId: 'data-lab'
  },
  {
    id: 'sae-intelligence',
    label: 'SAE Intelligence',
    icon: Brain,
    sectionId: 'sae-intelligence'
  },
  {
    id: 'cohort-context',
    label: 'Cohort Context',
    icon: Users,
    sectionId: 'cohort-context'
  }
];
