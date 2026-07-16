import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INTERCEPTION_PAGE_DATA } from '@/data/pages/products-interception-page';

export const metadata: Metadata = {
  title: 'Interception · CrisPRO',
  description:
    'Turn a metastasis hypothesis into a prioritized target-and-experiment package. Ranked targets, CRISPR perturbation design, off-target and structural receipts, wet-lab handoff. Research use only.',
};

export default function InterceptionProductPage() {
  return (
    <VerticalSurface
      data={INTERCEPTION_PAGE_DATA}
      headerLink={{ label: 'Read the public ledger', href: '/ledger' }}
    />
  );
}
