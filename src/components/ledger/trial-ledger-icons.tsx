'use client';

import { Target, Fingerprint, Cpu, type LucideIcon } from 'lucide-react';
import type { TrialReceiptPreview } from '@/data/trial-ledger-registry';

const ICON_BY_PREVIEW: Record<TrialReceiptPreview, LucideIcon> = {
  'target-lock': Target,
  'moa-align': Fingerprint,
  'kill-chain': Cpu,
  'vector-map': Target,
};

export function getTrialLedgerIcon(preview: TrialReceiptPreview): LucideIcon {
  return ICON_BY_PREVIEW[preview] ?? Target;
}
