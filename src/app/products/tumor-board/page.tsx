import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { TUMOR_BOARD_PAGE_DATA } from '@/data/pages/products-tumor-board-page';

export const metadata: Metadata = {
  title: 'Tumor Board · CrisPRO',
  description: 'Research case-resolution workspace. RUO — not clinical decision support.',
};

export default function tumor_board_Page() {
  return <VerticalSurface data={TUMOR_BOARD_PAGE_DATA} />;
}
