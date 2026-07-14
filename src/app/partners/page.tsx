import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PARTNERS_HUB_PAGE_DATA } from '@/data/pages/partners-hub-page';

export const metadata: Metadata = {
  title: 'Partners · CrisPRO',
  description: 'Academic host, identity provider, and professional society.',
};

export default function partners_hub_Page() {
  return <VerticalSurface data={PARTNERS_HUB_PAGE_DATA} />;
}
