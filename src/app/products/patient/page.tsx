import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PATIENT_PAGE_DATA } from '@/data/pages/products-patient-page';

export const metadata: Metadata = {
  title: 'Patient product · CrisPRO',
  description: 'Family-facing mechanism-alignment briefs.',
};

export default function patient_Page() {
  return <VerticalSurface data={PATIENT_PAGE_DATA} />;
}
