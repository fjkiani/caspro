'use client';

/**
 * MetricChip
 * ─────────────────────────────────────────────────────────────────────────────
 * Persona-aware primitive for technical metric labels.
 *
 *   Oncologist / pharma persona → renders the technical label verbatim
 *                                   (e.g. "LN_IC50", "Cohen's d").
 *   Patient persona            → renders the technical label PLUS a small
 *                                   glossary chip with the plain-English
 *                                   translation.
 *
 * Usage:
 *
 *   <MetricChip metric="LN_IC50" />
 *   <MetricChip metric="pLDDT" value="41.59" />
 *   <MetricChip metric="cohens_d" tone="dark" />
 *
 * The metric key must exist in METRIC_GLOSSARY (see below). Add new metrics
 * there — the chip is deterministic per metric so voice drift is impossible.
 *
 * SOURCE: D11 persona-sweep preamble (2026-07-14).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { usePersona } from '@/context/PersonaContext';
import { useTheme } from '@/context/ThemeContext';

/**
 * Metric key → plain-English translation for patient persona. This is the ONE
 * place a metric's plain-language definition lives. Every consuming surface
 * uses the same string.
 */
export const METRIC_GLOSSARY: Record<string, { patient: string; unit?: string }> = {
  // Efficacy / drug response
  LN_IC50: { patient: 'how much drug it takes to kill half the tumor cells (log scale — lower is more potent)', unit: 'ln(µM)' },
  IC50: { patient: 'how much drug it takes to kill half the tumor cells (lower is more potent)', unit: 'µM' },
  cohens_d: { patient: 'how big the difference is between two groups (0.2 small · 0.5 medium · 0.8 large)' },
  auroc: { patient: 'how well the model separates real drivers from noise (1.0 perfect · 0.5 random)' },
  auprc: { patient: 'how well the model finds the true positives without false alarms (1.0 perfect)' },
  p_value: { patient: 'the odds the finding is just chance (lower is stronger — 0.05 is the usual cutoff)' },
  padj: { patient: 'the p-value corrected for testing many things at once (0.05 is the usual cutoff)' },
  fdr: { patient: 'the fraction of "findings" expected to be false alarms (0.05 = 1 in 20)' },
  hr: { patient: 'hazard ratio — how much faster (or slower) one group progresses (1.0 = no difference)' },
  or: { patient: 'odds ratio — how many times more likely an outcome is in one group (1.0 = no difference)' },

  // Structure / confidence
  pLDDT: { patient: 'how confident the 3D model is about each part of the protein (70 confident · 90 very high)' },
  iPTM: { patient: 'how confident the model is about how two molecules fit together (0.5+ is the protein cut; 0.3+ is the RNA-DNA cut)' },

  // Model outputs
  target_lock_score: { patient: 'how strong the evidence is that this gene actually drives the cancer (0.35+ = real driver)' },
  fit: { patient: 'how well a drug matches the patient\'s tumor vector (0 = no match · 1 = perfect match)' },
  evo2_delta_ll: { patient: 'how much the Evo2 model thinks a mutation changes the DNA (bigger = more disruptive)' },

  // Biomarkers / clinical shorthand
  MSS: { patient: 'microsatellite-stable — the tumor keeps DNA copies intact (opposite of MSI-high)' },
  MSI_H: { patient: 'microsatellite-high — the tumor makes lots of DNA errors, which usually means it responds to immune-based drugs' },
  CPS: { patient: 'PD-L1 combined positive score — measures how much of the tumor is "flagging" for immune attack' },
  TPS: { patient: 'PD-L1 tumor proportion score — the fraction of tumor cells directly displaying the immune-flag molecule' },
  TMB: { patient: 'tumor mutational burden — how many DNA changes the tumor has accumulated' },
};

interface Props {
  /** Key into METRIC_GLOSSARY (case-sensitive). If unknown, renders as plain literal. */
  metric: string;
  /** Optional numeric value to render inline with the label. */
  value?: string | number;
  /** Optional override label (defaults to `metric`). */
  label?: string;
  /** Visual tone — 'dark' pairs with darker card backgrounds. */
  tone?: 'default' | 'dark';
  className?: string;
}

export default function MetricChip({ metric, value, label, tone = 'default', className = '' }: Props) {
  const { persona } = usePersona();
  const { isDarkMode } = useTheme();
  const glossary = METRIC_GLOSSARY[metric];
  const display = label ?? metric;
  const isPatient = persona === 'patient';

  const badgeClass =
    tone === 'dark'
      ? 'bg-white/5 border-white/10 text-white/70'
      : isDarkMode
      ? 'bg-white/10 border-white/15 text-white/80'
      : 'bg-neutral-100 border-neutral-300 text-neutral-700';

  return (
    <span
      className={`inline-flex items-baseline gap-1 rounded-md border px-1.5 py-0.5 text-[0.7rem] font-mono ${badgeClass} ${className}`}
      title={glossary ? glossary.patient : undefined}
    >
      <span>{display}</span>
      {value !== undefined ? <span className="opacity-90">{value}</span> : null}
      {isPatient && glossary ? (
        <span className="ml-1 border-l pl-1 opacity-70">{glossary.patient}</span>
      ) : null}
    </span>
  );
}
