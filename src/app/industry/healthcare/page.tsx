import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INDUSTRY_HEALTHCARE_PAGE_DATA } from '@/data/pages/industry-healthcare-page';

export const metadata: Metadata = {
  title: 'Health systems & oncology programs · CrisPRO',
  description: 'For tumor boards asking why the last trial had responders.',
};

export default function HealthcarePage() {
  return <VerticalSurface data={INDUSTRY_HEALTHCARE_PAGE_DATA} />;
}
