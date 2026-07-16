import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { TUMOR_BOARD_PAGE_DATA } from '@/data/pages/products-tumor-board-page';

export const metadata: Metadata = {
  title: 'Tumor Board · CrisPRO',
  description:
    'Turn molecular complexity into a traceable research case resolution. Biology map, vulnerability hypotheses, mechanism-aligned options, trial exploration, evidence trace, and governance flags. Research use only \u2014 not clinical decision support.',
};

export default function TumorBoardProductPage() {
  return (
    <VerticalSurface
      data={TUMOR_BOARD_PAGE_DATA}
      headerLink={{ label: 'Read the public ledger', href: '/ledger' }}
    />
  );
}
