import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INSILICO_TRIALS_PAGE_DATA } from '@/data/pages/products-insilico-trials-page';

export const metadata: Metadata = {
  title: 'In-Silico Trials · CrisPRO',
  description: 'Pressure-test a clinical-development hypothesis before protocol lock. RUO.',
};

export default function insilico_trials_Page() {
  return <VerticalSurface data={INSILICO_TRIALS_PAGE_DATA} />;
}
