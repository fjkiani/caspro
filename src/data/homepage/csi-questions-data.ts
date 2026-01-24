/**
 * CSI Three Questions Data - Data-Driven Questions Section
 * Extracted from FOCUSED_HERO_CONFIG.problem
 * 
 * Source: FOCUSED_HERO_CONFIG.problem.description
 */

import { CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export interface CSIQuestion {
  question: string;
  answer: string;
  icon: typeof CheckCircle2;
  color: 'blue' | 'purple' | 'green';
}

export const csiThreeQuestions: CSIQuestion[] = [
  {
    question: "Will this chemo work?",
    answer: "CSI ≥70 = Yes, likely to work. CSI <40 = No, probably won't work.",
    icon: CheckCircle2,
    color: "blue"
  },
  {
    question: "For how long?",
    answer: "CSI predicts 6-month benefit probability. Higher score = longer expected benefit.",
    icon: Clock,
    color: "purple"
  },
  {
    question: "When should we stop?",
    answer: "If CSI drops below 40, chemo is unlikely to help. Save patient from unnecessary side effects.",
    icon: TrendingUp,
    color: "green"
  }
];
