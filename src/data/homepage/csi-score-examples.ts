/**
 * Three Validated Engines — Data Cards
 * Source: docs/landingpage.mdc (THE BIGGER PICTURE section)
 * 
 * Replaces old CSI score (72/50/28) cards with 3 engine validation cards.
 * Uses same interface shape so ScoreVisualization component works unchanged.
 */

import { Target, Shield, Zap, CheckCircle2 } from 'lucide-react';

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
    score: 0.988,
    label: "INTERCEPTION",
    recommendation: "Target-Lock Engine",
    benefit: "304 gene-step combinations",
    description: "4-signal composite (Evo2 + Enformer). 11/11 FDA-approved targets prospectively predicted. AlphaFold3 structural validation: 100% pass rate. Precision@3 = 1.000.",
    icon: Target,
    color: "green",
    bgColor: "bg-slate-800/50 backdrop-blur-md",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    iconColor: "text-blue-400"
  },
  {
    score: 0.806,
    label: "IO ENGINE",
    recommendation: "Immunotherapy Prediction",
    benefit: "KEYNOTE-158 validated",
    description: "8-pathway transcriptomic model. Held-out AUC 0.806, external AUC 0.714 (NeoPembrOV). KEYNOTE-158 proxy delta +0.358. 3x responder enrichment (10-15% → 30-50%).",
    icon: Shield,
    color: "yellow",
    bgColor: "bg-slate-800/50 backdrop-blur-md",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    iconColor: "text-purple-400"
  },
  {
    score: 680,
    label: "KILL CHAIN + SPE",
    recommendation: "Resistance Detection",
    benefit: "6 independent datasets",
    description: "10 resistance classes across 680 patients (ARIEL, Patch, Christie, TCGA-OV, Abbott, MSK-SPECTRUM). Temporal ctDNA modeling. SLFN11 33.6% dual-resistance detection.",
    icon: Zap,
    color: "red",
    bgColor: "bg-slate-800/50 backdrop-blur-md",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    iconColor: "text-rose-400"
  }
];

/**
 * Get score example by index
 */
export const getScoreExample = (score: number): CSIScoreExample => {
  if (score >= 70) return csiScoreExamples[0];
  if (score >= 40) return csiScoreExamples[1];
  return csiScoreExamples[2];
};
