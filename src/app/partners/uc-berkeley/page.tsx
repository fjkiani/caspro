import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PARTNERS_BERKELEY_PAGE_DATA } from '@/data/pages/partners-berkeley-page';

export const metadata: Metadata = {
  title: 'Academic host · CrisPRO',
  description: 'Public-university hosting for the research corpus.',
};

export default function partners_berkeley_Page() {
  return <VerticalSurface data={PARTNERS_BERKELEY_PAGE_DATA} />;
}
