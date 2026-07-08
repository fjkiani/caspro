import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { BOLTZ_PAGE_DATA } from '@/data/pages/products-boltz-page';

export const metadata: Metadata = {
  title: 'Boltz · CrisPRO',
  description: 'Structure-informed mechanism-alignment reader.',
};

export default function boltz_Page() {
  return <VerticalSurface data={BOLTZ_PAGE_DATA} />;
}
