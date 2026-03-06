/**
 * Three Validated Engines — Journey Data
 * Source: docs/landingpage.mdc (THE BIGGER PICTURE section)
 * 
 * Trimmed from 5 levels → 3 engine cards.
 * Each engine maps to a validated product with real metrics from MDC.
 */

import { BarChart3, Pill, AlertTriangle, Shield, FileText } from 'lucide-react';

export interface JourneyLevel {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  data: string;
  unlocks: string[];
  color: 'blue' | 'purple' | 'orange' | 'green' | 'indigo';
  icon: string;
  metric: string;
  time: string;
  href: string;
  validation?: {
    status: 'proof-of-concept' | 'retrospective-tested' | 'production';
    metric?: string;
    source?: string;
  };
}

export const csiJourneyLevels: JourneyLevel[] = [
  {
    level: 1,
    title: "INTERCEPTION (CRISPR)",
    subtitle: "Target-Lock: 0.988 AUROC",
    description: "Therapeutic target identification via 4-signal composite (Evo2 + Enformer) across 304 gene-step combinations. 11/11 FDA-approved targets prospectively predicted.",
    data: "NGS panel + metastatic gene context",
    unlocks: [
      "Target-Lock composite score (4-signal: Functionality, Essentiality, Regulatory, Chromatin)",
      "Stage-specific targeting across 8 metastatic steps",
      "AlphaFold3 structural pass rate: 100% (mean pLDDT 65.6)",
      "Prospective FDA prediction: 11/11 targets, AUROC 1.000"
    ],
    color: "blue",
    icon: "🎯",
    metric: "0.988 AUROC",
    time: "In silico",
    href: "/products/forge",
    validation: {
      status: 'retrospective-tested',
      metric: '0.988 AUROC, Precision@3 = 1.000, 304 gene-step combinations',
      source: 'landingpage.mdc — Target-Lock section'
    }
  },
  {
    level: 2,
    title: "IO ENGINE",
    subtitle: "8-Pathway Model: AUC 0.806",
    description: "Will IO work for this patient? 8-pathway transcriptomic model predicts IO response with held-out AUC 0.806 and KEYNOTE-158 proxy delta +0.358.",
    data: "Tumor transcriptomic profile + IO pathway scores",
    unlocks: [
      "8-pathway transcriptomic scoring (EXHAUSTION, TIL, T_EFFECTOR, ANGIOGENESIS, etc.)",
      "3x responder enrichment (10-15% → 30-50%)",
      "KEYNOTE-158 proxy validated: delta +0.358 (3.5x threshold)",
      "STK11/KEAP1-loss identification for IO-refractory routing"
    ],
    color: "purple",
    icon: "🛡️",
    metric: "AUC 0.806",
    time: "Held-out + external validated",
    href: "/products/oracle",
    validation: {
      status: 'retrospective-tested',
      metric: 'AUC 0.806 held-out, AUC 0.714 external (NeoPembrOV), KEYNOTE-158 delta +0.358',
      source: 'landingpage.mdc — IO ENGINE section'
    }
  },
  {
    level: 3,
    title: "KILL CHAIN + SPE",
    subtitle: "680 Patients / 6 Datasets",
    description: "What resistance class is active right now? Monitors 10 resistance classes validated across 680 patients from 6 independent datasets with temporal ctDNA modeling.",
    data: "Post-treatment pathway profiling + resistance markers + ctDNA",
    unlocks: [
      "10 resistance class detection (BRCA reversion, ABCB1 efflux, SLFN11, lineage plasticity)",
      "6 independent datasets (ARIEL, Patch, Christie, TCGA-OV, Abbott, MSK-SPECTRUM)",
      "Temporal ctDNA resistance modeling (27 paired ARIEL profiles)",
      "SLFN11 33.6% dual PARPi+platinum resistance detection"
    ],
    color: "orange",
    icon: "⚡",
    metric: "680 Patients",
    time: "6 Datasets",
    href: "/products/oncology",
    validation: {
      status: 'retrospective-tested',
      metric: '680 patients, 10 resistance classes, 6 datasets, SLFN11 33.6% detection',
      source: 'kill-chain-assault-2-debrief.mdc + io-validation-receipt.mdc'
    }
  }
];

/**
 * Transform journey levels to SolutionInteractiveBase format
 */
export const csiJourneyToVisualFlow = csiJourneyLevels.map((level, idx) => ({
  number: level.level,
  title: level.title,
  description: level.description,
  icon: 'BarChart3',
  color: level.color,
  details: [
    { label: 'Data Required', value: level.data },
    ...level.unlocks.map((unlock, i) => ({
      label: `Unlock ${i + 1}`,
      value: unlock
    }))
  ],
  metrics: level.validation ? [
    { label: 'Status', value: level.validation.status },
    ...(level.validation.metric ? [{ label: 'Validation', value: level.validation.metric }] : [])
  ] : []
}));
