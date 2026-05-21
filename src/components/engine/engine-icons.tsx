'use client';

import {
  Target,
  Fingerprint,
  Cpu,
  ShieldCheck,
  Beaker,
  FlaskConical,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';

const ENGINE_ICONS: Record<string, LucideIcon> = {
  'target-lock': Target,
  'mechanism-alignment': Fingerprint,
  'kill-chain': Cpu,
  'io-risk-benefit': ShieldCheck,
  'synthetic-lethality': Beaker,
  'safety-dosing': FlaskConical,
  safety: ClipboardList,
  'evidence-matrix': ClipboardList,
};

export function getEngineIcon(slug: string): LucideIcon {
  return ENGINE_ICONS[slug] ?? Target;
}
