import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { FORGE_PAGE_DATA } from '@/data/pages/products-forge-page';

export const metadata: Metadata = {
  title: 'Forge · CrisPRO',
  description: 'IST design & prospective gate definition.',
};

export default function forge_Page() {
  return <VerticalSurface data={FORGE_PAGE_DATA} />;
}
