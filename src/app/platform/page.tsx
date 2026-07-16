import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PLATFORM_PAGE_DATA } from '@/data/pages/platform-page';

export const metadata: Metadata = {
  title: 'Platform · CrisPRO',
  description: 'One mechanism-alignment research substrate. Three product surfaces. Educational research substrate — engine status disclosed inline.',
};

const HEADER_LINK = { label: 'Read the evidence ledger', href: '/ledger' } as const;

export default function PlatformPage() {
  return <VerticalSurface data={PLATFORM_PAGE_DATA} headerLink={HEADER_LINK} />;
}
