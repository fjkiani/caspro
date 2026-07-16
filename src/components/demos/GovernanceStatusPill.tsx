'use client';

import { ShieldCheck, Wrench, Beaker } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { GOVERNANCE_STATUS_LABELS } from './labels';
import type { GovernanceStatus } from '@/data/demos/types';

/**
 * GovernanceStatusPill — validated / in_development / mechanistic_hypothesis
 *
 * Palette matches the tumor-board and SL page conventions:
 *   validated              → emerald (dark) / emerald (light) · ShieldCheck
 *   in_development         → amber   (dark) / amber   (light) · Wrench
 *   mechanistic_hypothesis → indigo  (dark) / indigo  (light) · Beaker
 *
 * `size` follows the AK bundle chip pattern used across engine pages.
 */

const ICONS = {
  validated: ShieldCheck,
  in_development: Wrench,
  mechanistic_hypothesis: Beaker,
} as const;

export default function GovernanceStatusPill({
  status,
  size = 'sm',
}: {
  status: GovernanceStatus;
  size?: 'xs' | 'sm';
}) {
  const { isDarkMode } = useTheme();
  const Icon = ICONS[status];

  const tint =
    status === 'validated'
      ? isDarkMode
        ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
        : 'border-emerald-500/40 bg-emerald-50 text-emerald-700'
      : status === 'in_development'
      ? isDarkMode
        ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
        : 'border-amber-500/40 bg-amber-50 text-amber-700'
      : isDarkMode
      ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300'
      : 'border-indigo-500/40 bg-indigo-50 text-indigo-700';

  const sizing =
    size === 'xs'
      ? 'text-[9px] px-1.5 py-0.5 gap-1'
      : 'text-[10px] px-2 py-0.5 gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded border font-black uppercase tracking-widest ${sizing} ${tint}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {GOVERNANCE_STATUS_LABELS[status]}
    </span>
  );
}
