import type { Metadata } from 'next';
import TargetLockBrainMetTabSurface from '@/components/tumor-board/TargetLockBrainMetTabSurface';

export const metadata: Metadata = {
  title: 'Target Lock · Brain-Met Cascade (Tabs) | CrisPRO Engine',
  description:
    'Tab-strip BrM cascade surface — one tab per step, plus Live Variants, Scoring, Disclosure tabs. WEIGHTS_BRAIN_MET, AUROC 0.6889.',
};

export default function TargetLockBrainMetTabsRoute() {
  return <TargetLockBrainMetTabSurface />;
}
