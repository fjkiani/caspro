import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PRODUCTS_HUB_PAGE_DATA } from '@/data/pages/products-hub-page';

export const metadata: Metadata = {
  title: 'Products · CrisPRO',
  description: 'Seven purpose-built surfaces for the mechanism-alignment engine.',
};

export default function products_hub_Page() {
  return <VerticalSurface data={PRODUCTS_HUB_PAGE_DATA} />;
}
