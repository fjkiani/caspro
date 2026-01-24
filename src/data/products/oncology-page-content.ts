import { ProductHeroContent } from '@/components/products/shared/ProductHeroSection';
import { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';
import { RelatedProduct } from '@/components/products/shared/RelatedProductsSection';

/**
 * Oncology Product Page Content
 * Separated from code for reusability and maintainability
 */

export const oncologyHeroContent: ProductHeroContent = {
  badge: {
    text: 'CHEMOSENSITIVITY INDEX (CSI)',
    emoji: '📊',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  mainHeadline: 'How Chemosensitive Is This Tumor Right Now?',
  headlineGradient: 'from-blue-600 via-purple-600 to-indigo-600',
  subtitle: 'CSI predicts 6-month PFS probability for next DDR-targeted therapy',
  description: 'A single, calibrated score (0-100) that fuses DDR biology, treatment timing history, and early kinetics into a unified chemosensitivity prediction. Validated in TOPACIO trial (AUROC 0.714, p=0.023).',
  ctas: [
    {
      label: 'Calculate CSI for Your Patient',
      variant: 'primary',
      href: '#csi-score'
    },
    {
      label: 'View TOPACIO Validation →',
      href: '/evidence/csi-validation',
      variant: 'secondary'
    }
  ]
};

export const oncologyProblemContent: ProblemSolutionContent = {
  type: 'problem',
  title: 'The Problem: Chemosensitivity Uncertainty',
  description: 'For patients with advanced, heavily pretreated cancer, clinicians don\'t know: Will platinum, PARPi, or DDR-targeted therapy work again? For how long? When does PFI/PTFI no longer predict response?',
  cards: [
    {
      icon: 'clock',
      title: 'Unknown Response Duration',
      description: 'Will chemo work? For how long? When should we stop?',
      highlight: 'Uncertainty'
    },
    {
      icon: 'alert',
      title: 'PFI/PTFI No Longer Predicts',
      description: 'Treatment intervals become unreliable after multiple lines. Need new prediction method.',
      highlight: 'Outdated'
    },
    {
      icon: 'search',
      title: 'No Unified Score',
      description: 'DDR biology, timing history, and kinetics are siloed. No single chemosensitivity prediction.',
      highlight: 'Fragmented'
    }
  ]
};

export const oncologySolutionContent: ProblemSolutionContent = {
  type: 'solution',
  title: 'The Solution: CSI (ChemoSensitivity Index)',
  description: 'One score that fuses DDR biology, treatment timing history, and early kinetics into a unified chemosensitivity prediction. Validated in TOPACIO trial (AUROC 0.714, p=0.023).',
  cards: [
    {
      icon: 'zap',
      title: 'One Score (0-100)',
      description: 'CSI predicts 6-month PFS probability for next DDR-targeted therapy',
      highlight: 'AUROC 0.714'
    },
    {
      icon: 'check',
      title: 'Multimodal Integration',
      description: 'DDR biology + timing history (PFI/PTPI/TFI) + early kinetics (KELIM/CA-125)',
      highlight: 'Unified'
    },
    {
      icon: 'infinity',
      title: 'Continuous Updates',
      description: 'CSI recalculates as tumor evolves. Track chemosensitivity across treatment lines.',
      highlight: 'Dynamic'
    }
  ]
};

export const oncologySectionHeaders = {
  csiScore: {
    title: 'The CSI Score: One Number, Clear Answer',
    description: 'CSI (0-100) predicts how well chemo will work for this specific patient, right now. See how the score guides treatment decisions.'
  },
  journeyLevels: {
    title: 'One Score. Complete Care Journey.',
    description: 'CSI is just the beginning. As you add more data, we unlock more capabilities to guide the entire treatment journey.'
  },
  monitoringDashboard: {
    title: 'CSI in Action: Continuous Monitoring',
    description: 'See how CSI updates automatically as tumor evolves. Track chemosensitivity across treatment lines with real-time alerts when CSI drops below threshold.'
  },
  validation: {
    title: 'TOPACIO Trial Validation',
    description: 'CSI demonstrates significant predictive power for DDR-targeted therapies in advanced ovarian cancer (AUROC 0.714, p=0.023).'
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

