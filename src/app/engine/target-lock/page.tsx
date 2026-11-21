import type { Metadata } from 'next';
import TargetLockBrainMetTabSurface from '@/components/tumor-board/TargetLockBrainMetTabSurface';

export const metadata: Metadata = {
  title: 'Target Lock · Brain-Met Cascade | CrisPRO Engine',
  description:
    'Target Lock Brain-Met: pick a metastatic step, review driver genes and protein folds. Deep evidence in scroll dossier.',
};

/** Canonical Target Lock route — tab surface (retired intro brochure). */
export default function TargetLockRoute() {
  return <TargetLockBrainMetTabSurface />;
}
