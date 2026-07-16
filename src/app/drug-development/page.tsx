import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { DRUG_DEVELOPMENT_PAGE_DATA } from '@/data/pages/drug-development-page';

export const metadata: Metadata = {
  title: 'Drug development · CrisPRO',
  description: 'Mechanism-alignment research substrate for pharma and biotech target-discovery, translational, and program teams. Educational research substrate — not clinical decision support.',
};

const HEADER_LINK = { label: 'Read the public ledger', href: '/ledger' } as const;

export default function DrugDevelopmentPage() {
  return <VerticalSurface data={DRUG_DEVELOPMENT_PAGE_DATA} headerLink={HEADER_LINK} />;
}
