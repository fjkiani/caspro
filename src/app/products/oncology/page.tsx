import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { ONCOLOGY_PAGE_DATA } from '@/data/pages/products-oncology-page';

export const metadata: Metadata = {
  title: 'Oncology · CrisPRO',
  description: 'Mechanism-alignment for oncology programs.',
};

export default function oncology_Page() {
  return <VerticalSurface data={ONCOLOGY_PAGE_DATA} />;
}
