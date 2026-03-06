/**
 * Three Core Questions — Mapped to 3 Validated Engines
 * Source: docs/landingpage.mdc (THE BIGGER PICTURE section)
 * 
 * INTERCEPTION (CRISPR) → Target identification
 * IO ENGINE → Will IO work?
 * KILL CHAIN + SPE → Resistance class detection
 */

import { Target, Shield, Zap } from 'lucide-react';

export interface CSIQuestion {
  question: string;
  answer: string;
  icon: typeof Target;
  color: 'blue' | 'purple' | 'green';
}

export const csiThreeQuestions: CSIQuestion[] = [
  {
    question: "What targets should we pursue?",
    answer: "Target-Lock evaluates targets with a 4-signal composite (Evo2 + Enformer) across 304 gene-step combinations — achieving 0.988 AUROC and prospectively predicting 11/11 newly FDA-approved targets.",
    icon: Target,
    color: "blue"
  },
  {
    question: "Will IO work for this patient?",
    answer: "The 8-pathway transcriptomic model achieves held-out AUC 0.806 and a KEYNOTE-158 proxy delta of +0.358 — enriching responder identification by 3x (from 10-15% to 30-50%).",
    icon: Shield,
    color: "purple"
  },
  {
    question: "What resistance is active right now?",
    answer: "Kill Chain monitors 10 resistance classes validated across 680 patients from 6 independent datasets (ARIEL, TCGA-OV, MSK-SPECTRUM) — with temporal ctDNA modeling and SLFN11 33.6% dual-resistance detection.",
    icon: Zap,
    color: "green"
  }
];
