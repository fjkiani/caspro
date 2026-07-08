import type { Metadata } from 'next';
import ScrollBoardSurface from '@/components/tumor-board/ScrollBoardSurface';

export const metadata: Metadata = {
  title: 'Tumor board (scroll view) · CrisPRO',
  description:
    'CrisPRO tumor board in one continuous scroll: DNA hero, then the 5 capability engines with substrate cards between them. Every readout is substrate-only and every guardrail links out to governance.',
};

export default function TumorBoardScrollPage() {
  return <ScrollBoardSurface />;
}
