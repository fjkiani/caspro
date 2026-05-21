import type { Metadata } from 'next';
import TargetIdentificationEngine from '@/components/mockups/targetLock';

export const metadata: Metadata = {
  title: 'Target Lock Archive | CrisPRO Engine',
  description:
    'FDA retroactive and prospective archive, LATIFY chain of custody, and full target cascade simulator.',
};

export default function TargetLockArchivePage() {
  return <TargetIdentificationEngine />;
}
