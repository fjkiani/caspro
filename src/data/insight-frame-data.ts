// ==============================================================================
// INSIGHT FRAME DATA — configurable insight layers for the homepage
// Each config drives a distinct InsightFrame slide:
//  - headline + highlight (the "punchline")
//  - column definitions
//  - benchmark rows (header + industry standard)
//  - trial rows are always auto-derived from trial-case-files.ts
//  - closing CTA
// Add new configs here to scale — InsightFrame renders them all.
// ==============================================================================

import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Bug, ShieldAlert, Crosshair } from 'lucide-react';

export interface InsightConfig {
  id: string;                    // unique key
  icon: LucideIcon;
  tagLabel: string;              // e.g. "Root Cause Analysis"
  headline: string;              // main text
  highlight: string;             // colored highlight text
  highlightColor: string;        // tailwind text color
  col1: { header: string; sub: string; color: string };
  col2: { header: string; sub: string; color: string };
  benchmarkRows: {
    label: string;
    col1: { text: string; pass: boolean };
    col2: { text: string; pass: boolean };
  }[];
  closing: string;
  ctaLabel: string;
  ctaRoute: string;
}

export const INSIGHT_CONFIGS: InsightConfig[] = [
  // ─── Layer 2: MoA / Enrollment ──────────────────────────────────────────────
  {
    id: 'layer-2-enrollment',
    icon: AlertTriangle,
    tagLabel: 'Root Cause Analysis',
    headline: 'Most cancer trials fail for a simple reason.',
    highlight: 'Nobody checks Layer 2.',
    highlightColor: 'text-red-400',
    col1: {
      header: 'Layer 1: Target-Lock',
      sub: 'Is the biology real?',
      color: 'text-cyan-400',
    },
    col2: {
      header: 'Layer 2: Mechanism Fit',
      sub: 'Are the right patients enrolled?',
      color: 'text-red-400/80',
    },
    benchmarkRows: [
      {
        label: 'Question',
        col1: { text: 'Is the target a real cancer driver?', pass: true },
        col2: { text: 'Are the right patients enrolled?', pass: false },
      },
      {
        label: 'Industry standard',
        col1: { text: 'Usually checked', pass: true },
        col2: { text: 'Rarely checked', pass: false },
      },
    ],
    closing: 'Different cancers. Different companies. Same root cause. Identified retroactively by the same engine.',
    ctaLabel: 'Open The Receipts',
    ctaRoute: '/proof/latify',
  },

  // ─── Layer 3: Resistance Monitoring ─────────────────────────────────────────
  {
    id: 'layer-3-resistance',
    icon: Bug,
    tagLabel: 'Resistance Intelligence',
    headline: 'Current approaches treat cancer like it\'s static.',
    highlight: 'Nobody checks for resistance — until it\'s too late.',
    highlightColor: 'text-amber-400',
    col1: {
      header: 'Standard Oncology',
      sub: 'Wait for progression, then react.',
      color: 'text-zinc-400',
    },
    col2: {
      header: 'Layer 3: Kill Chain',
      sub: 'Detect resistance before it escapes.',
      color: 'text-amber-400',
    },
    benchmarkRows: [
      {
        label: 'Resistance Detection',
        col1: { text: 'Wait for tumor growth (months)', pass: false },
        col2: { text: 'ctDNA + 12-class detection (days)', pass: true },
      },
      {
        label: 'Protocol Switch',
        col1: { text: 'Only after clinical failure', pass: false },
        col2: { text: 'Intercept before progression', pass: true },
      },
      {
        label: 'Escape Classes',
        col1: { text: 'Not tracked', pass: false },
        col2: { text: '12-class taxonomy monitored', pass: true },
      },
    ],
    closing: 'Tumors evolve in real time. Your monitoring should too.',
    ctaLabel: 'View Kill Chain',
    ctaRoute: '/engine/kill-chain/',
  },

  // ─── Layer 4: IO Safety Gate ────────────────────────────────────────────────
  {
    id: 'layer-4-io-safety',
    icon: ShieldAlert,
    tagLabel: 'Harm Prevention',
    headline: 'Immunotherapy saves lives — when given to the right patient.',
    highlight: 'Nobody gates for harm.',
    highlightColor: 'text-rose-400',
    col1: {
      header: 'Standard IO Selection',
      sub: 'PD-L1 alone. Binary yes/no.',
      color: 'text-zinc-400',
    },
    col2: {
      header: 'Layer 4: IO Risk-Benefit Gate',
      sub: 'Net Clinical Benefit before enrollment.',
      color: 'text-rose-400',
    },
    benchmarkRows: [
      {
        label: 'Biomarker Depth',
        col1: { text: 'PD-L1 only', pass: false },
        col2: { text: '8-pathway transcriptomic panel', pass: true },
      },
      {
        label: 'Harm Prevention',
        col1: { text: 'Monitor irAE after dosing', pass: false },
        col2: { text: 'Pre-enrollment GATE check', pass: true },
      },
      {
        label: 'Net Clinical Benefit',
        col1: { text: 'Not computed', pass: false },
        col2: { text: 'Dynamic NCB score', pass: true },
      },
    ],
    closing: 'The first system that prevents IO harm before the first dose.',
    ctaLabel: 'View IO Gate',
    ctaRoute: '/engine/io-risk-benefit/',
  },

  // ─── Layer 1: Target Identification ─────────────────────────────────────────
  {
    id: 'layer-1-target',
    icon: Crosshair,
    tagLabel: 'Target Validation',
    headline: '94% of oncology drugs fail in clinical trials.',
    highlight: 'Most target the wrong biology.',
    highlightColor: 'text-cyan-400',
    col1: {
      header: 'Standard Discovery',
      sub: 'Candidate from literature review.',
      color: 'text-zinc-400',
    },
    col2: {
      header: 'Layer 1: Target-Lock',
      sub: 'Evo2 + Enformer structural validation.',
      color: 'text-cyan-400',
    },
    benchmarkRows: [
      {
        label: 'FDA Concordance',
        col1: { text: 'Post-hoc confirmation', pass: false },
        col2: { text: '9/9 retroactive (2023-2024)', pass: true },
      },
      {
        label: 'Prospective Predictions',
        col1: { text: 'None published', pass: false },
        col2: { text: '6 locked, 1 confirmed failure', pass: true },
      },
    ],
    closing: 'The only engine that predicted CEACAM5 failure before Phase III unblinding.',
    ctaLabel: 'View Target Lock',
    ctaRoute: '/engine/target-lock/',
  },
];

// Helper to get config by ID
export const getInsightConfig = (id: string) => INSIGHT_CONFIGS.find(c => c.id === id);
