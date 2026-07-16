import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INDUSTRY_BIOTECH_PAGE_DATA } from '@/data/pages/industry-biotech-page';

export const metadata: Metadata = {
  title: 'Biotech & pharma R&D · CrisPRO',
  description: 'Stop paying for the wrong patients. Mechanism-alignment before Phase III.',
};

export default function BiotechPage() {
  return <VerticalSurface data={INDUSTRY_BIOTECH_PAGE_DATA} />;
}
