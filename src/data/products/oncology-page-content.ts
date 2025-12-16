import { ProductHeroContent } from '@/components/products/shared/ProductHeroSection';
import { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';
import { RelatedProduct } from '@/components/products/shared/RelatedProductsSection';

/**
 * Oncology Product Page Content
 * Separated from code for reusability and maintainability
 */

export const oncologyHeroContent: ProductHeroContent = {
  badge: {
    text: 'ONCOLOGY INTELLIGENCE PLATFORM',
    emoji: '🏥',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  mainHeadline: 'Upload Once. Track Forever. Never Miss a Signal.',
  headlineGradient: 'from-blue-600 via-purple-600 to-indigo-600',
  subtitle: 'CrisPRO Oncology: From VUS to Validated Care Plan',
  description: 'Replace static genomic reports with continuous agentic intelligence. From initial analysis to Month 18+, our agents never stop working—tracking CA-125 kinetics, monitoring ctDNA mutations, matching new trials, and alerting you to resistance 3-6 weeks before imaging confirms it.',
  ctas: [
    {
      label: '🚀 Generate Care Plan',
      variant: 'primary',
      onClick: () => {
        // This will be handled by GenerateCarePlanButton component
        // We'll pass a ref or callback
      }
    },
    {
      label: 'Experience Live Demos →',
      href: '#interactive-showcase',
      variant: 'secondary'
    }
  ]
};

export const oncologyProblemContent: ProblemSolutionContent = {
  type: 'problem',
  title: 'The Problem: Genomic Testing is Stuck in 2015',
  description: 'Static reports are point-in-time snapshots that capture mutations once, generate recommendations once, then sit untouched.',
  cards: [
    {
      icon: 'document',
      title: 'One-Time Analysis',
      description: 'Report generated once, then forgotten. No updates, no continuous monitoring.',
      highlight: 'Static'
    },
    {
      icon: 'clock',
      title: 'Resistance Detected Late',
      description: '3-6 months after it starts. Window to intervene is gone.',
      highlight: 'Too Late'
    },
    {
      icon: 'search',
      title: 'Trials Missed',
      description: "Can't manually track 20,000+ active studies. Perfect matches slip through.",
      highlight: 'Manual'
    }
  ]
};

export const oncologySolutionContent: ProblemSolutionContent = {
  type: 'solution',
  title: 'The Solution: Continuous Agentic Intelligence',
  description: 'What if your genomic report was alive? Upload once, and our 8-agent pipeline orchestrates everything—from Day 1 to Month 18+. The agents never stop working.',
  cards: [
    {
      icon: 'zap',
      title: 'Day 1: Instant Analysis',
      description: 'Upload report → 30 seconds → Complete care plan with biomarkers, drug rankings, trials, nutrition.',
      highlight: '30 seconds'
    },
    {
      icon: 'infinity',
      title: 'Month 18+: Never Stops',
      description: 'Continuous monitoring: CA-125 kinetics, ctDNA mutations, trial matching, resistance alerts 3-6 weeks early.',
      highlight: 'Always On'
    }
  ]
};

export const oncologySectionHeaders = {
  monitoringDashboard: {
    title: 'Live Monitoring: Patient AK Journey',
    description: 'See how continuous intelligence tracks CA-125 kinetics, detects resistance mutations, matches new trials, and alerts oncologists to critical changes—automatically.'
  },
  cascadeExperience: {
    title: 'The 8-Agent Pipeline: From Upload to Care Plan',
    description: 'Experience how our agent swarm orchestrates data extraction, biomarker calculation, resistance prediction, synthetic lethality detection, drug ranking, trial matching, nutrition planning, and continuous monitoring—all in one seamless cascade.'
  }
};

export const oncologyRelatedProducts: RelatedProduct[] = [
  {
    slug: 'r-d',
    title: 'CrisPRO R&D',
    subtitle: 'Design the Undruggable. Validate in Silico.'
  },
  {
    slug: 'research',
    title: 'CrisPRO Research',
    subtitle: 'Accelerate Discovery from Years to Hours.'
  }
];

