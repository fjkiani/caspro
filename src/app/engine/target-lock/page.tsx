import type { Metadata } from 'next';
import TargetLockBrainMetTabSurface from '@/components/tumor-board/TargetLockBrainMetTabSurface';

export const metadata: Metadata = {
  title: 'Target Lock · Brain-Met Cascade | CrisPRO Engine',
  description:
    'Target Lock Brain-Met: nested Score this step (7 BrM cascade) · Assassin · Mission Fit · Live variants · Scoring · Structures · Next Steps. WEIGHTS_BRAIN_MET.',
};

/** Canonical Target Lock route — tab surface (retired intro brochure). */
export default function TargetLockRoute() {
  return <TargetLockBrainMetTabSurface />;
}
