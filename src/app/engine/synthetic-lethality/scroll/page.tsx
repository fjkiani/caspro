// ============================================================================
// /engine/synthetic-lethality/scroll — MBD4 manuscript long-scroll surface.
// ============================================================================

import type { Metadata } from 'next';
import SyntheticLethalityScrollSurface from '@/components/tumor-board/SyntheticLethalityScrollSurface';

export const metadata: Metadata = {
  title: 'Synthetic-Lethality · MBD4 · Scroll · CrisPRO',
  description:
    'Long-scroll manuscript surface: MBD4 LOF defines a synthetic-lethal state targetable by ATR inhibition rather than PARP. Four axes tested; PARPi falsified.',
};

export default function Page() {
  return <SyntheticLethalityScrollSurface />;
}
