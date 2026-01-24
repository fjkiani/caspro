/**
 * CSI Score Examples - Data-Driven Score Visualization
 * Extracted from FOCUSED_HERO_CONFIG
 * 
 * Source: FOCUSED_HERO_CONFIG.primaryUseCase.example
 */

import { CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';

export interface CSIScoreExample {
  score: number;
  label: string;
  recommendation: string;
  benefit: string;
  description: string;
  icon: typeof CheckCircle2;
  color: 'green' | 'yellow' | 'red';
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
}

export const csiScoreExamples: CSIScoreExample[] = [
  {
    score: 72,
    label: "High Score",
    recommendation: "Continue Treatment",
    benefit: "6+ months benefit",
    description: "Chemo will likely work. Proceed with confidence, monitor for optimal duration.",
    icon: CheckCircle2,
    color: "green",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    iconColor: "text-green-600"
  },
  {
    score: 50,
    label: "Medium Score",
    recommendation: "Re-Evaluate",
    benefit: "3-6 months",
    description: "Consider combination therapies or re-evaluation. Benefit is uncertain.",
    icon: TrendingUp,
    color: "yellow",
    bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    iconColor: "text-yellow-600"
  },
  {
    score: 28,
    label: "Low Score",
    recommendation: "Avoid Unnecessary Treatment",
    benefit: "<3 months",
    description: "Avoid unnecessary treatment. Explore alternative strategies or trials.",
    icon: XCircle,
    color: "red",
    bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    iconColor: "text-red-600"
  }
];

/**
 * Get score example by score value
 */
export const getScoreExample = (score: number): CSIScoreExample => {
  if (score >= 70) return csiScoreExamples[0];
  if (score >= 40) return csiScoreExamples[1];
  return csiScoreExamples[2];
};
