import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { ProductHeroContent } from '@/components/products/shared/ProductHeroSection';
import { ProblemSolutionContent } from '@/components/products/shared/ProblemSolutionSection';

/**
 * Content Transformers
 * Transform co-pilot data into outcome-focused content for product page pattern
 */

const coPilotEmojis: Record<string, string> = {
  'toxicity-risk': '🛡️',
  'chemo': '💊',
  'clinical-trials': '🔬',
  'therapy-fit': '🎯',
  'pathway': '🧬',
  'crispr-intelligence': '✂️',
};

/**
 * Transform co-pilot content to hero content
 */
export function transformToHeroContent(content: CoPilotDetailContent): ProductHeroContent {
  // Extract outcome-focused headline from pageTitle or create from vision
  const mainHeadline = extractOutcomeHeadline(content);
  const emoji = coPilotEmojis[content.slug] || '⚡';
  
  return {
    badge: {
      text: content.pageTitle.split(':')[0] || 'CAPABILITY',
      emoji: emoji,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
    },
    mainHeadline: mainHeadline,
    subtitle: content.pageTitle,
    description: extractOutcomeDescription(content),
    headlineGradient: 'from-blue-600 via-purple-600 to-indigo-600',
    ctas: [
      {
        label: 'Try Live Demo →',
        href: '#demo',
        variant: 'secondary' as const,
      },
      {
        label: 'Learn More',
        href: '#technical',
        variant: 'secondary' as const,
      },
    ],
  };
}

/**
 * Extract outcome-focused headline
 */
function extractOutcomeHeadline(content: CoPilotDetailContent): string {
  // Try to extract from observedOutcomes first
  if (content.observedOutcomes && content.observedOutcomes.length > 0) {
    const primaryOutcome = content.observedOutcomes[0];
    // Transform outcome title to headline
    if (primaryOutcome.title.includes('Prevent')) {
      return primaryOutcome.title;
    }
    if (primaryOutcome.title.includes('Reduce')) {
      return primaryOutcome.title.replace('Reduced', 'Prevent').replace('Reduction', 'Prevention');
    }
  }
  
  // Fallback: Transform pageTitle or vision
  if (content.pageTitle.includes('Prevent') || content.pageTitle.includes('Risk')) {
    return content.pageTitle.split(':')[0] || content.pageTitle;
  }
  
  // Generic transformation
  return content.vision.split('.')[0] || content.pageTitle;
}

/**
 * Extract outcome-focused description
 */
function extractOutcomeDescription(content: CoPilotDetailContent): string {
  // Use heroSubtitle if it's outcome-focused
  if (content.heroSubtitle && (
    content.heroSubtitle.includes('prevent') ||
    content.heroSubtitle.includes('reduce') ||
    content.heroSubtitle.includes('improve') ||
    content.heroSubtitle.includes('coverage')
  )) {
    return content.heroSubtitle;
  }
  
  // Use vision if it's outcome-focused
  if (content.vision && content.vision.length < 150) {
    return content.vision;
  }
  
  // Fallback to heroSubtitle
  return content.heroSubtitle || content.vision;
}

/**
 * Transform co-pilot content to problem content
 */
export function transformToProblemContent(content: CoPilotDetailContent): ProblemSolutionContent {
  const problemTitle = extractProblemTitle(content);
  
  return {
    type: 'problem',
    title: `The Problem: ${problemTitle}`,
    description: content.coreProblemIntro || 'Traditional approaches fall short when dealing with complex challenges.',
    cards: content.coreProblemPoints?.slice(0, 3).map((point, idx) => {
      const { title, description } = parseProblemPoint(point);
      return {
        title: title,
        description: description || title,
        icon: getProblemIcon(point, idx),
        highlight: extractHighlight(point),
      };
    }) || [],
  };
}

/**
 * Transform co-pilot content to solution content
 */
export function transformToSolutionContent(content: CoPilotDetailContent): ProblemSolutionContent {
  const solutionTitle = extractSolutionTitle(content);
  
  return {
    type: 'solution',
    title: `The Solution: ${solutionTitle}`,
    description: extractSolutionDescription(content),
    cards: content.observedOutcomes?.slice(0, 3).map((outcome) => ({
      title: outcome.title,
      description: outcome.description,
      icon: mapOutcomeToIcon(outcome.icon),
      highlight: outcome.keyMetric,
    })) || [],
  };
}

/**
 * Extract problem title from content
 */
function extractProblemTitle(content: CoPilotDetailContent): string {
  if (content.coreProblemIntro) {
    // Extract first sentence or key phrase
    const sentences = content.coreProblemIntro.split('.');
    if (sentences.length > 0) {
      return sentences[0].replace('Toxicities are', 'Toxicity').replace('hard to', 'Difficult to');
    }
  }
  
  // Fallback based on slug
  if (content.slug === 'toxicity-risk') {
    return 'Toxicity Risk is Unclear';
  }
  
  return 'Traditional Approaches Fall Short';
}

/**
 * Extract solution title from content
 */
function extractSolutionTitle(content: CoPilotDetailContent): string {
  if (content.vision) {
    const visionStart = content.vision.split('.')[0];
    if (visionStart.includes('Turn') || visionStart.includes('Transform')) {
      return visionStart.replace('Turn', 'Transform').replace('Transform', 'Transform');
    }
  }
  
  // Fallback based on slug
  if (content.slug === 'toxicity-risk') {
    return 'Genotype-Informed Toxicity Prevention';
  }
  
  return 'AI-Powered Precision Solution';
}

/**
 * Extract solution description
 */
function extractSolutionDescription(content: CoPilotDetailContent): string {
  if (content.genomicInsightsOverview) {
    return content.genomicInsightsOverview;
  }
  
  if (content.vision) {
    return content.vision;
  }
  
  return 'Our solution transforms how you approach this challenge with AI-powered precision.';
}

/**
 * Parse problem point into title and description
 */
function parseProblemPoint(point: string): { title: string; description: string } {
  // Check if it has a colon
  const colonIndex = point.indexOf(':');
  if (colonIndex !== -1) {
    return {
      title: point.substring(0, colonIndex).trim(),
      description: point.substring(colonIndex + 1).trim(),
    };
  }
  
  // Check if it's a simple sentence
  if (point.length < 60) {
    return { title: point, description: '' };
  }
  
  // Split by period
  const parts = point.split('.');
  return {
    title: parts[0]?.trim() || point.substring(0, 50),
    description: parts.slice(1).join('.').trim() || '',
  };
}

/**
 * Get icon for problem card
 */
function getProblemIcon(point: string, index: number): 'document' | 'clock' | 'search' | 'zap' | 'infinity' | 'check' {
  const lower = point.toLowerCase();
  if (lower.includes('unclear') || lower.includes('uncertain')) return 'search';
  if (lower.includes('scattered') || lower.includes('scatter')) return 'document';
  if (lower.includes('hard') || lower.includes('difficult')) return 'clock';
  if (lower.includes('time') || lower.includes('slow')) return 'clock';
  
  // Default based on index
  const icons: Array<'document' | 'clock' | 'search'> = ['search', 'document', 'clock'];
  return icons[index % icons.length];
}

/**
 * Extract highlight from problem point
 */
function extractHighlight(point: string): string {
  const lower = point.toLowerCase();
  if (lower.includes('unclear')) return 'Unclear';
  if (lower.includes('scattered')) return 'Scattered';
  if (lower.includes('hard') || lower.includes('difficult')) return 'Complex';
  if (lower.includes('time')) return 'Slow';
  
  return 'Challenge';
}

/**
 * Map outcome icon to problem/solution icon
 */
function mapOutcomeToIcon(icon: string): 'document' | 'clock' | 'search' | 'zap' | 'infinity' | 'check' {
  const iconMap: Record<string, 'document' | 'clock' | 'search' | 'zap' | 'infinity' | 'check'> = {
    'AlertTriangle': 'zap',
    'CheckCircle': 'check',
    'TrendingUp': 'zap',
    'Clock': 'clock',
    'Users': 'infinity',
    'Shield': 'check',
    'Target': 'zap',
  };
  
  return iconMap[icon] || 'check';
}


