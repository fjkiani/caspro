import type { Metadata } from 'next';
import MechanismAlignmentTabSurface from '@/components/tumor-board/MechanismAlignmentTabSurface';

export const metadata: Metadata = {
  title: 'Mechanism Alignment · Tabs | CrisPRO Engine',
  description:
    'L2 tab strip — one tab per illustrative divergence case + governance tab covering PATH A signature, RSS opt-in, DL-07 quarantine.',
};

export default function MechanismAlignmentTabsRoute() {
  return <MechanismAlignmentTabSurface />;
}
