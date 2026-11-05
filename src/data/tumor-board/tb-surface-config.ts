/**
 * Tumor Board live surface — routes, rail, strip copy (decision surface, not engineer tour).
 */

import type { LucideIcon } from 'lucide-react';
import { User, ListOrdered, FileWarning } from 'lucide-react';
import type { Persona } from '@/context/PersonaContext';

export const TB_ROUTES = {
  picker: '/tumor-board/',
  product: '/products/tumor-board/',
  contact: '/contact/',
  /** @deprecated use receipts — resolve/* aliases to receipts/* */
  resolve: '/tumor-board/resolve/',
  receipts: '/tumor-board/receipts/',
  /** AK E2E receipts (HTML mockup) — not the board walk. */
  akReceipts: '/tumor-board/receipts/ak_mbd4_lof/',
  /** @deprecated alias of akReceipts */
  akPipeline: '/tumor-board/receipts/ak_mbd4_lof/',
  /** AK Track-B board walk — not the same surface as akReceipts. */
  akBoard: '/tumor-board/AK/',
  /** NSCLC CT board walk — React twin. */
  nsclcBoard: '/tumor-board/nsclc/',
  nsclcReceipts: '/tumor-board/receipts/nsclc_luna16/',
} as const;

/** Three surfaces: biology → ranked options → gaps/receipts. */
export type TbTopTab = 'case' | 'options' | 'gaps';

export const TB_TOP_TABS: { key: TbTopTab; label: string; icon: LucideIcon }[] = [
  { key: 'case', label: 'Case', icon: User },
  { key: 'options', label: 'Options', icon: ListOrdered },
  { key: 'gaps', label: 'Gaps & evidence', icon: FileWarning },
];

export const TB_DEFAULT_TAB_FOR_PERSONA: Record<Persona, TbTopTab> = {
  oncologist: 'options',
  patient: 'case',
  pharma: 'gaps',
};

/** Glossary ids — never paste AK/MBD4 terms onto other fixtures. */
export function tbTabTermsForPatient(patientId: string, tab: TbTopTab): string[] {
  const isAk = patientId === 'AK' || patientId === 'AK01';
  if (tab === 'case') {
    return isAk ? ['mbd4_lof', 'target_lock'] : ['target_lock'];
  }
  if (tab === 'options') {
    return isAk ? ['sl_axis', 'mechanism_fit', 'atr_axis'] : ['sl_axis', 'mechanism_fit'];
  }
  return [];
}

/** @deprecated use tbTabTermsForPatient — kept empty to fail closed if still imported */
export const TB_TAB_TERMS: Record<TbTopTab, string[]> = {
  case: [],
  options: [],
  gaps: [],
};

export function tbStripCopy(
  tab: TbTopTab,
  ctx: { compPct: number; capPct: number; driverChips: string; suggested?: string },
): string {
  switch (tab) {
    case 'case':
      return `What CrisPRO read for this fixture · drivers ${ctx.driverChips} · data completeness ${ctx.compPct}%.`;
    case 'options':
      return ctx.suggested
        ? `Worth discussing first: ${ctx.suggested}. Then what to skip — with trial anchors on Gaps.`
        : 'What fits this biology — and what does not.';
    case 'gaps':
      return `Missing tests (cap ${ctx.capPct}%) · published trial citations · RUO receipts.`;
  }
}

export const TB_EMBED_CLASS =
  '[&_section]:!mx-0 [&_section]:!max-w-none [&_section]:!px-0 [&_section]:!py-4 [&_header]:!border-0 [&_header]:!bg-transparent [&_header]:!py-0 [&_header>div]:!px-0 [&_header>div]:!max-w-none';
