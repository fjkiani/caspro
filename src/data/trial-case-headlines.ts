/**
 * Ledger / gated preview headlines — derived only from trial-case-files.
 * Do not hand-author marketing copy here; add fields to the trial module instead.
 */

import { TRIAL_CASE_FILES } from './trial-case-files';
import type { ScoreMetric, TrialCaseFile } from './trial-case-files/types';
import type { EvidenceRow, HeadlineEntry } from './hero-headlines';

function scoreColor(c: ScoreMetric['color']): EvidenceRow['color'] {
  return c === 'cyan' ? 'accent' : 'rose';
}

function buildHeadlines(trial: TrialCaseFile): HeadlineEntry[] {
  const tag = `${trial.id.toUpperCase()} › ${trial.trialId}`;

  return [
    {
      text: trial.oneLiner,
      highlight: trial.primaryEndpoint,
      trial: `${tag} › ${trial.sponsor}`,
      evidence: {
        title: trial.title,
        rows: [
          { label: 'Phase', value: trial.phase },
          { label: 'Drug', value: trial.drug },
          { label: 'Endpoint', value: trial.primaryEndpoint, color: 'rose' },
        ],
        impact: trial.gatesSummary,
        impactValue: trial.deltaImpact,
        proofId: trial.id,
      },
    },
    {
      text: trial.rootCause.summary.slice(0, 120) + (trial.rootCause.summary.length > 120 ? '…' : ''),
      highlight: trial.rootCause.failureKeyword,
      trial: `${tag} › Root Cause`,
      evidence: {
        title: trial.rootCause.statusQuoLabel,
        rows: [
          { label: 'Status Quo', value: trial.rootCause.statusQuo, color: 'rose' },
          { label: 'Intercept', value: trial.rootCause.intercept, color: 'emerald' },
          { label: 'Required', value: trial.rootCause.interceptLabel, color: 'accent' },
        ],
        impact: 'Failure Mode',
        impactValue: trial.rootCause.failureKeyword,
        proofId: trial.id,
      },
    },
    {
      text: trial.responderLabel,
      highlight: trial.nonResponderLabel,
      trial: `${tag} › 8D Archetypes`,
      evidence: {
        title: 'Mechanism Fit',
        rows: [
          { label: 'Responder alignment', value: 'gated', color: 'emerald' },
          { label: 'Non-responder alignment', value: 'gated', color: 'rose' },
          { label: 'Vector Δ', value: trial.deltaImpact, color: 'accent' },
          ...trial.scores.map((s) => ({
            label: s.label,
            value: s.value,
            color: scoreColor(s.color),
          })),
        ],
        impact: 'Vector Δ',
        impactValue: trial.deltaImpact,
        proofId: trial.id,
      },
    },
    {
      text: trial.gates[0]?.label ?? 'Gate Evaluation',
      highlight: trial.gatesSummary,
      trial: `${tag} › Gates`,
      evidence: {
        title: trial.gatesSummary,
        rows: trial.gates.map((g) => ({
          label: g.label.replace(/^Gate \d+: /, ''),
          value: g.pass ? `PASS — ${g.result}` : `FAIL — ${g.result}`,
          color: g.pass ? 'emerald' : 'rose',
        })),
        proofId: trial.id,
      },
    },
    {
      text: trial.biologySummary.slice(0, 100) + (trial.biologySummary.length > 100 ? '…' : ''),
      highlight: trial.biologyCascade[trial.biologyCascade.length - 1] ?? '',
      trial: `${tag} › Biology`,
      evidence: {
        title: 'Biology Cascade',
        rows: trial.vectorFlags.slice(0, 4).map((flag, i) => ({
          label: `Flag ${i + 1}`,
          value: flag.length > 48 ? `${flag.slice(0, 48)}…` : flag,
          color: 'body' as const,
        })),
        proofId: trial.id,
      },
    },
    {
      text: trial.commercial.closingStatement,
      highlight: `${trial.commercial.annualSavings} · ${trial.commercial.savingsUnit}`,
      trial: `${tag} › Commercial`,
      evidence: {
        title: 'Commercial Impact',
        rows: [
          { label: 'Population', value: trial.commercial.targetPopulation, color: 'accent' },
          { label: 'Unit', value: trial.commercial.populationUnit },
          { label: 'Savings', value: trial.commercial.annualSavings, color: 'emerald' },
        ],
        impact: trial.commercial.savingsUnit,
        impactValue: trial.commercial.annualSavings,
        proofId: trial.id,
      },
    },
    {
      text: trial.validationTier,
      highlight: trial.validationStrength,
      trial: `${tag} › Receipt`,
      evidence: {
        title: 'Engine Run',
        rows: [
          { label: 'Receipt', value: trial.engineRun.receiptFile },
          { label: 'Date', value: trial.engineRun.receiptDate, color: 'accent' },
          { label: 'Trials Scored', value: String(trial.engineRun.trialsScored) },
          { label: 'Delta', value: String(trial.engineRun.delta), color: 'accent' },
        ],
        proofId: trial.id,
      },
    },
  ];
}

export function getTrialCaseHeadlines(slug: string): HeadlineEntry[] {
  const trial = TRIAL_CASE_FILES[slug.trim().toLowerCase()];
  if (!trial) return [];
  return buildHeadlines(trial);
}
