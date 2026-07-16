// ============================================================================
// /engine/synthetic-lethality/tabs — MBD4 manuscript tab-strip surface.
// ============================================================================

import type { Metadata } from 'next';
import SyntheticLethalityTabSurface from '@/components/tumor-board/SyntheticLethalityTabSurface';

export const metadata: Metadata = {
  title: 'Synthetic-Lethality · MBD4 · Tabs · CrisPRO',
  description:
    'Tab-strip surface for the MBD4 manuscript story with per-axis panels: cytidine, immunotherapy, ATRi, PARPi falsified, convergence, v3 engine, ovarian hits, disclosure.',
};

export default function Page() {
  return <SyntheticLethalityTabSurface />;
}
