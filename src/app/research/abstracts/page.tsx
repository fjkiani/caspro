import type { Metadata } from 'next';
import { getResearchAbstracts } from '@/lib/docs/hygraph/research-abstract-queries';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import AbstractsListing from '@/components/research/listings/AbstractsListing';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Abstracts | CrisPRO Research',
  description: 'Conference abstracts from AACR and related venues.',
};

export default async function ResearchAbstractsPage() {
  const { items } = await getResearchAbstracts().catch(() => ({ items: [] }));

  return (
    <ResearchSectionShell
      chrome={{
        section: 'abstracts',
        backHref: '/research',
        backLabel: 'Back to Research',
      }}
    >
      <AbstractsListing abstracts={items} />
    </ResearchSectionShell>
  );
}
