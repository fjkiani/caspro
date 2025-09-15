// War stories extractor - pulls real success stories from co-pilot observed outcomes
import React from 'react';
import { coPilotDetailsData } from '@/data/copilots';
import { CoPilotDetailContent, ObservedOutcome } from '@/types/copilot-types';
import * as LucideIcons from 'lucide-react';

export interface WarStoryCard {
  id: string;
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  outcome: string;
  keyMetric: string;
  timeline: string;
  impact: string;
  icon: React.ReactNode;
  color: string;
  href?: string;
  sourceSlug: string;
}

// Dynamic icon mapping - uses actual icon names from co-pilot data
const getIconComponent = (iconName: string): React.ReactNode => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return React.createElement(IconComponent, { className: "w-6 h-6" });
  }
  // Fallback to Target if icon not found
  return React.createElement(LucideIcons.Target, { className: "w-6 h-6" });
};

// Extract war stories from co-pilot observed outcomes
export const extractWarStories = (): WarStoryCard[] => {
  const warStories: WarStoryCard[] = [];

  Object.entries(coPilotDetailsData).forEach(([slug, data]) => {
    if (!data.observedOutcomes || data.observedOutcomes.length === 0) return;

    // Get the most impactful observed outcomes (top 3)
    const topOutcomes = data.observedOutcomes.slice(0, 3);
    
    topOutcomes.forEach((outcome, index) => {
      if (typeof outcome === 'string') {
        // Handle legacy string format
        const warStory = createWarStoryFromString(slug, data, outcome, index);
        if (warStory) warStories.push(warStory);
      } else {
        // Handle structured ObservedOutcome format
        const warStory = createWarStoryFromOutcome(slug, data, outcome, index);
        if (warStory) warStories.push(warStory);
      }
    });
  });

  // Sort by impact and return top stories
  return warStories
    .sort((a, b) => getImpactScore(b) - getImpactScore(a))
    .slice(0, 6); // Return top 6 war stories
};

// Create war story from structured ObservedOutcome
const createWarStoryFromOutcome = (
  slug: string, 
  data: CoPilotDetailContent, 
  outcome: ObservedOutcome, 
  index: number
): WarStoryCard | null => {
  const challenge = extractChallengeFromData(data);
  const solution = extractSolutionFromData(data);
  const timeline = extractTimelineFromData(data);
  const primaryIcon = extractPrimaryIconFromData(data);
  const primaryColor = extractPrimaryColorFromData(data);
  
  return {
    id: `${slug}-${outcome.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: outcome.title,
    subtitle: `${data.pageTitle} Success Story`,
    challenge,
    solution,
    outcome: outcome.description,
    keyMetric: outcome.keyMetric,
    timeline,
    impact: `Achieved ${outcome.keyMetric} improvement in ${outcome.title.toLowerCase()}, demonstrating the power of AI-driven precision medicine.`,
    icon: getIconComponent(outcome.icon),
    color: outcome.color,
    href: `/platform/${slug}`,
    sourceSlug: slug
  };
};

// Create war story from legacy string format
const createWarStoryFromString = (
  slug: string, 
  data: CoPilotDetailContent, 
  outcome: string, 
  index: number
): WarStoryCard | null => {
  const challenge = extractChallengeFromData(data);
  const solution = extractSolutionFromData(data);
  const keyMetric = extractMetricFromString(outcome);
  const timeline = extractTimelineFromData(data);
  const primaryIcon = extractPrimaryIconFromData(data);
  const primaryColor = extractPrimaryColorFromData(data);
  
  if (!keyMetric) return null;

  return {
    id: `${slug}-outcome-${index}`,
    title: generateTitleFromOutcome(outcome),
    subtitle: `${data.pageTitle} Achievement`,
    challenge,
    solution,
    outcome,
    keyMetric,
    timeline,
    impact: `Real-world validation of our platform's capability: ${outcome}`,
    icon: primaryIcon,
    color: primaryColor,
    href: `/platform/${slug}`,
    sourceSlug: slug
  };
};

// Dynamic helper functions that extract from actual co-pilot data
const extractChallengeFromData = (data: CoPilotDetailContent): string => {
  // Use coreProblemIntro and coreProblemPoints to construct the challenge
  if (data.coreProblemIntro && data.coreProblemPoints) {
    const problemSummary = data.coreProblemPoints.slice(0, 2).map(point => 
      point.replace(/\*\*(.*?)\*\*/g, '$1').replace(/:/g, ' -')
    ).join('. ');
    return `${data.coreProblemIntro} ${problemSummary}`;
  }
  return data.coreProblemIntro || `Traditional approaches to ${data.pageTitle.toLowerCase()} require extensive manual work and expert interpretation.`;
};

const extractSolutionFromData = (data: CoPilotDetailContent): string => {
  // Use vision, buildsOn, or heroSubtitle as the solution description
  return data.vision || data.buildsOn || data.heroSubtitle || `Our AI-powered ${data.pageTitle} platform automates complex analysis with validated predictions and transparent methodology.`;
};

const extractTimelineFromData = (data: CoPilotDetailContent): string => {
  // Extract timeline from KPIs that mention time
  if (data.kpis) {
    const timeKpi = data.kpis.find(kpi => 
      kpi.label.toLowerCase().includes('time') || 
      kpi.value.toLowerCase().includes('minute') ||
      kpi.value.toLowerCase().includes('second') ||
      kpi.value.toLowerCase().includes('real-time')
    );
    if (timeKpi) {
      return timeKpi.value;
    }
  }
  return 'Real-time';
};

const extractPrimaryIconFromData = (data: CoPilotDetailContent): React.ReactNode => {
  // Extract primary icon from genomicUseCasesGrid or valueProps
  if (data.genomicUseCasesGrid && data.genomicUseCasesGrid.length > 0) {
    return getIconComponent(data.genomicUseCasesGrid[0].iconName);
  }
  if (data.valueProps && data.valueProps.length > 0) {
    return getIconComponent(data.valueProps[0].icon);
  }
  return getIconComponent('Target');
};

const extractPrimaryColorFromData = (data: CoPilotDetailContent): string => {
  // Extract primary color from genomicUseCasesGrid or observedOutcomes
  if (data.genomicUseCasesGrid && data.genomicUseCasesGrid.length > 0) {
    const colorMatch = data.genomicUseCasesGrid[0].color.match(/text-(\w+)-/);
    if (colorMatch) return colorMatch[1];
  }
  if (data.observedOutcomes && data.observedOutcomes.length > 0 && typeof data.observedOutcomes[0] !== 'string') {
    return (data.observedOutcomes[0] as ObservedOutcome).color;
  }
  return 'blue';
};

const extractMetricFromString = (outcome: string): string => {
  // Extract percentage, ratio, or time improvements from outcome strings
  const percentageMatch = outcome.match(/(\d+(?:\.\d+)?%)/);
  if (percentageMatch) return percentageMatch[1];
  
  const ratioMatch = outcome.match(/(\d+(?:\.\d+)?[x×])/);
  if (ratioMatch) return ratioMatch[1];
  
  const timeMatch = outcome.match(/(minutes?|seconds?|hours?|days?)/i);
  if (timeMatch) return `${timeMatch[1]} improvement`;
  
  const numberMatch = outcome.match(/(\d+(?:\.\d+)?)/);
  if (numberMatch) return `${numberMatch[1]} improvement`;
  
  return 'Significant improvement';
};

const generateTitleFromOutcome = (outcome: string): string => {
  if (outcome.includes('VUS') || outcome.includes('uncertainty')) return 'VUS Resolution Success';
  if (outcome.includes('confidence')) return 'Confidence Enhancement';
  if (outcome.includes('time') || outcome.includes('faster')) return 'Speed Improvement';
  if (outcome.includes('tier') || outcome.includes('promotion')) return 'Evidence Upgrade';
  if (outcome.includes('pathway')) return 'Pathway Analysis';
  if (outcome.includes('trial')) return 'Trial Optimization';
  return 'Clinical Success';
};

const getImpactScore = (warStory: WarStoryCard): number => {
  // Score based on metric type and magnitude
  let score = 0;
  
  // Higher scores for percentage improvements
  const percentageMatch = warStory.keyMetric.match(/(\d+(?:\.\d+)?)%/);
  if (percentageMatch) {
    score += parseFloat(percentageMatch[1]);
  }
  
  // Higher scores for time/speed improvements
  if (warStory.keyMetric.includes('faster') || warStory.keyMetric.includes('x')) {
    score += 50;
  }
  
  // Higher scores for cost savings
  if (warStory.keyMetric.includes('$') || warStory.keyMetric.includes('cost')) {
    score += 75;
  }
  
  // Bonus for VUS resolution (high impact)
  if (warStory.title.includes('VUS') || warStory.title.includes('Uncertainty')) {
    score += 100;
  }
  
  return score;
};

// Get specific war story by co-pilot slug and outcome index
export const getWarStoryBySlug = (slug: string, outcomeIndex: number = 0): WarStoryCard | null => {
  const data = coPilotDetailsData[slug];
  if (!data || !data.observedOutcomes || data.observedOutcomes.length <= outcomeIndex) {
    return null;
  }

  const outcome = data.observedOutcomes[outcomeIndex];
  if (typeof outcome === 'string') {
    return createWarStoryFromString(slug, data, outcome, outcomeIndex);
  } else {
    return createWarStoryFromOutcome(slug, data, outcome, outcomeIndex);
  }
};

// Get all war stories for a specific co-pilot
export const getWarStoriesForCoPilot = (slug: string): WarStoryCard[] => {
  const data = coPilotDetailsData[slug];
  if (!data || !data.observedOutcomes) return [];

  return data.observedOutcomes.map((outcome, index) => {
    if (typeof outcome === 'string') {
      return createWarStoryFromString(slug, data, outcome, index);
    } else {
      return createWarStoryFromOutcome(slug, data, outcome, index);
    }
  }).filter(Boolean) as WarStoryCard[];
};
