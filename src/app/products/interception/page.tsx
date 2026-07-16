import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INTERCEPTION_PAGE_DATA } from '@/data/pages/products-interception-page';

export const metadata: Metadata = {
  title: 'Interception · CrisPRO',
  description: 'Turn a metastasis hypothesis into a target-and-experiment package. RUO.',
};

export default function interception_Page() {
  return <VerticalSurface data={INTERCEPTION_PAGE_DATA} />;
}
