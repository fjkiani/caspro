import type { Metadata } from 'next';
import TumorBoardProductWorkspace from '@/components/products/tumor-board/TumorBoardProductWorkspace';

export const metadata: Metadata = {
  title: 'Tumor Board · CrisPRO',
  description:
    'Rank options · rule out mismatches. Walk into the room with a ranked case package — Research use only.',
};

export default function TumorBoardProductPage() {
  return <TumorBoardProductWorkspace />;
}
