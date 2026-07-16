import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PRODUCTS_HUB_PAGE_DATA } from '@/data/pages/products-hub-page';

export const metadata: Metadata = {
  title: 'Products · CrisPRO',
  description: 'One oncology-development intelligence layer expressed through three products: Interception, In-Silico Trials, and Tumor Board.',
};

export default function products_hub_Page() {
  return <VerticalSurface data={PRODUCTS_HUB_PAGE_DATA} />;
}
