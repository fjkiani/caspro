import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { FOR_ONCOLOGISTS_PAGE_DATA } from '@/data/pages/for-oncologists-page';

export const metadata: Metadata = {
  title: 'For oncologists & molecular tumor boards · CrisPRO',
  description: 'Oncologists, molecular tumor boards, and translational teams use CrisPRO to prepare complex molecular cases. Educational research substrate — the clinical team remains the decision owner.',
};

const HEADER_LINK = { label: 'Open the Tumor Board landing', href: '/tumor-board' } as const;

export default function ForOncologistsPage() {
  return <VerticalSurface data={FOR_ONCOLOGISTS_PAGE_DATA} headerLink={HEADER_LINK} />;
}
