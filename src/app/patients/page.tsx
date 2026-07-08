import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PATIENTS_PAGE_DATA } from '@/data/pages/patients-page';

export const metadata: Metadata = {
  title: 'Patients & advocates · CrisPRO',
  description: 'Precision oncology in language patients and advocates can use.',
};

export default function PatientsPage() {
  return <VerticalSurface data={PATIENTS_PAGE_DATA} />;
}
