import type { Metadata } from 'next';
import TumorBoardProductWorkspace from '@/components/products/tumor-board/TumorBoardProductWorkspace';

export const metadata: Metadata = {
  title: 'Tumor Board · CrisPRO',
  description: 'Rank the patient before the drug list. Case walk with clear rule-outs.',
};

export default function TumorBoardProductPage() {
  return <TumorBoardProductWorkspace />;
}
