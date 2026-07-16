import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INSILICO_TRIALS_PAGE_DATA } from '@/data/pages/products-insilico-trials-page';

export const metadata: Metadata = {
  title: 'In-Silico Trials · CrisPRO',
  description:
    'Pressure-test a clinical-development hypothesis before protocol lock. Mechanism fit, biomarker gates, decoded trial evidence, resistance mapping, and evidence-tiered program dossiers. Research use only.',
};

export default function InSilicoTrialsProductPage() {
  return (
    <VerticalSurface
      data={INSILICO_TRIALS_PAGE_DATA}
      headerLink={{ label: 'Read the public ledger', href: '/ledger' }}
    />
  );
}
