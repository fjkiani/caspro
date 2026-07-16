import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { TUMOR_BOARD_PAGE_DATA } from '@/data/pages/tumor-board-page';

export const metadata: Metadata = {
  title: 'Tumor board · CrisPRO',
  description:
    'Case-resolution research workspace for oncologists, molecular tumor boards, and translational teams. Educational research substrate — not a clinical decision support tool.',
};

const HEADER_LINK = { label: 'Open a demo patient bundle', href: '/tumor-board/AK' } as const;

export default function TumorBoardPage() {
  return <VerticalSurface data={TUMOR_BOARD_PAGE_DATA} headerLink={HEADER_LINK} />;
}
