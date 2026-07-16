import type { Metadata } from 'next';
import TargetLockBrainMetScrollSurface from '@/components/tumor-board/TargetLockBrainMetScrollSurface';

export const metadata: Metadata = {
  title: 'Target Lock · Brain-Met Cascade (Scroll) | CrisPRO Engine',
  description:
    'Long-scroll BrM cascade surface — 7 steps, 12 live variants, WEIGHTS_BRAIN_MET, AUROC 0.6889 (honest primary composite). Enformer excluded; tautology retracted.',
};

export default function TargetLockBrainMetScrollRoute() {
  return <TargetLockBrainMetScrollSurface />;
}
