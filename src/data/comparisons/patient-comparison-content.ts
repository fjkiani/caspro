import { ProductHeroContent } from '@/components/products/shared/ProductHeroSection';
import { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';
import { RelatedProduct } from '@/components/products/shared/RelatedProductsSection';

/**
 * Patient Comparison Page Content
 * Separated from code for reusability and maintainability
 */

export const patientComparisonHeroContent: ProductHeroContent = {
  badge: {
    text: 'COMPARISON BENCHMARK',
    emoji: '🏆',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  },
  mainHeadline: 'GPT vs CrisPRO: See the Difference',
  headlineGradient: 'from-purple-600 via-indigo-600 to-blue-600',
  subtitle: 'Real Benchmarks: Average MOAT Advantage 0.86',
  description: 'Compare real GPT responses with CrisPRO\'s genotype-informed, actionable recommendations. Based on 6-question benchmark showing CrisPRO\'s superiority in personalized genomics, pathway analysis, and evidence-backed dosages.',
  ctas: [
    {
      label: 'Start Comparison →',
      href: '#comparison-showcase',
      variant: 'primary'
    },
    {
      label: 'View All Scenarios',
      href: '#scenarios',
      variant: 'secondary'
    }
  ]
};

export const patientComparisonProblemContent: ProblemSolutionContent = {
  type: 'problem',
  title: 'The Problem: Generic AI Can\'t Do Precision Medicine',
  description: 'GPT and other LLMs provide generic medical advice based on training data, but they lack the biological foundation models needed for genotype-specific, actionable recommendations.',
  cards: [
    {
      icon: 'document',
      title: 'Generic Responses',
      description: 'Same advice for everyone, regardless of genotype or pathway status.',
      highlight: 'One-Size-Fits-All'
    },
    {
      icon: 'document',
      title: 'No Pathway Analysis',
      description: 'Cannot analyze functional pathway disruptions or predict genotype-specific effects.',
      highlight: 'Surface-Level'
    },
    {
      icon: 'clock',
      title: 'No Predictive Modeling',
      description: 'Cannot predict TMB, resistance, or synthetic lethality from genotype alone.',
      highlight: 'Reactive'
    }
  ]
};

export const patientComparisonSolutionContent: ProblemSolutionContent = {
  type: 'solution',
  title: 'The Solution: Biological Foundation Models',
  description: 'CrisPRO uses Evo2 foundation models with 32,768 learned biological features to provide genotype-specific, pathway-informed recommendations that generic AI cannot match.',
  cards: [
    {
      icon: 'zap',
      title: 'Genotype-Specific',
      description: 'YOUR MBD4 deficiency means BER pathway is impaired. Specific recommendations based on YOUR genotype.',
      highlight: 'Personalized'
    },
    {
      icon: 'search',
      title: 'Pathway-Informed',
      description: 'Functional pathway analysis enables synthetic lethality detection, TMB prediction, and timing protocols.',
      highlight: 'Mechanistic'
    },
    {
      icon: 'check',
      title: 'Actionable',
      description: 'Precise recommendations: "Stop NAC 24h before, resume 24h after" - not generic "avoid antioxidants".',
      highlight: 'Specific'
    }
  ]
};

export const patientComparisonRelatedProducts: RelatedProduct[] = [
  {
    slug: 'oncology',
    title: 'CrisPRO Oncology',
    subtitle: 'Experience the full platform'
  },
  {
    slug: 'r-d',
    title: 'CrisPRO R&D',
    subtitle: 'See therapeutic design capabilities'
  }
];

