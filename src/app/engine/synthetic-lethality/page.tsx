import type { Metadata } from 'next';
import SyntheticLethalityIntroPage from '@/components/engine/SyntheticLethalityIntroPage';

export const metadata: Metadata = {
  title: 'Synthetic-Lethality | CrisPRO Engine',
  description:
    'L5 Synthetic-Lethality engine · MBD4-LOF dual therapeutic vulnerability · ATR inhibition rather than PARP · v3 pharma /sl-bridge API.',
};

export default function SyntheticLethalityIntroRoute() {
  return <SyntheticLethalityIntroPage />;
}
