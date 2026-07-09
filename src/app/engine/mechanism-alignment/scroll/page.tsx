import type { Metadata } from 'next';
import MechanismAlignmentScrollSurface from '@/components/tumor-board/MechanismAlignmentScrollSurface';

export const metadata: Metadata = {
  title: 'Mechanism Alignment · Scroll | CrisPRO Engine',
  description:
    'L2 scroll surface — 3 illustrative divergence cases (MEK escape, ATRi cold TME, cetuximab RAS-mutant). PATH A projection, composite gate, DL-07 compliant.',
};

export default function MechanismAlignmentScrollRoute() {
  return <MechanismAlignmentScrollSurface />;
}
