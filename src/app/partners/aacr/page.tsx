import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PARTNERS_AACR_PAGE_DATA } from '@/data/pages/partners-aacr-page';

export const metadata: Metadata = {
  title: 'Society partner · CrisPRO',
  description: 'Professional-society context for the mechanism-alignment layer.',
};

export default function partners_aacr_Page() {
  return <VerticalSurface data={PARTNERS_AACR_PAGE_DATA} />;
}
