import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { R_D_PAGE_DATA } from '@/data/pages/products-rd-page';

export const metadata: Metadata = {
  title: 'R&D · CrisPRO',
  description: 'Pipeline decisions with a mechanism-alignment gate.',
};

export default function rd_Page() {
  return <VerticalSurface data={R_D_PAGE_DATA} />;
}
