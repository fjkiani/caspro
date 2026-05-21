import type { Metadata } from 'next';
import TargetLockIntroPage from '@/components/engine/TargetLockIntroPage';

export const metadata: Metadata = {
  title: 'Target Lock | CrisPRO Engine',
  description:
    'L1 Target-Lock and L2 mechanism fit — two-layer prediction before enrollment. CEACAM5, LATIFY, and FDA archive context.',
};

export default function TargetLockIntroRoute() {
  return <TargetLockIntroPage />;
}
