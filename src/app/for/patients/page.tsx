import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { FOR_PATIENTS_PAGE_DATA } from '@/data/pages/for-patients-page';

export const metadata: Metadata = {
  title: 'For patients & caregivers · CrisPRO',
  description: 'Patients and caregivers use CrisPRO to explore how molecular information can inform questions for their oncology team. Educational research substrate — your oncology team remains the decision owner.',
};

const HEADER_LINK = { label: 'Explore an evidence-led walkthrough', href: '/demo/patient' } as const;

export default function ForPatientsPage() {
  return <VerticalSurface data={FOR_PATIENTS_PAGE_DATA} headerLink={HEADER_LINK} />;
}
