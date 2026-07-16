import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { ORACLE_PAGE_DATA } from '@/data/pages/products-oracle-page';

export const metadata: Metadata = {
  title: 'Oracle · CrisPRO',
  description: 'Predictive mechanism-alignment scoring at the Phase-I gate.',
};

export default function oracle_Page() {
  return <VerticalSurface data={ORACLE_PAGE_DATA} />;
}
