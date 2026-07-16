import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { FOR_PHARMA_PAGE_DATA } from '@/data/pages/for-pharma-page';

export const metadata: Metadata = {
  title: 'For pharma & biotech R&D · CrisPRO',
  description: 'Pharma target-discovery, translational, and program teams use CrisPRO as a mechanism-alignment research substrate before wet-lab weeks or Phase III capital commits. Educational research substrate.',
};

const HEADER_LINK = { label: 'Explore Drug Development', href: '/drug-development' } as const;

export default function ForPharmaPage() {
  return <VerticalSurface data={FOR_PHARMA_PAGE_DATA} headerLink={HEADER_LINK} />;
}
