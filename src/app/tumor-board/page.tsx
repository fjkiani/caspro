import type { Metadata } from 'next';
import TumorBoardSurface from '@/components/tumor-board/TumorBoardSurface';

export const metadata: Metadata = {
  title: 'Tumor board · CrisPRO',
  description:
    'The full CrisPRO tumor board: 5 capability engines — gate-tier admissibility, multi-asset compare, biomarker admissibility, population funnel, and mechanism divergence — every one bound to the same substrate and receipted under governance.',
};

export default function TumorBoardPage() {
  return <TumorBoardSurface />;
}
