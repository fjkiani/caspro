import type { Metadata } from 'next';
import { getAllUseCasesCms } from '@/lib/docs/hygraph/use-case-queries';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import ManuscriptsListing from '@/components/research/listings/ManuscriptsListing';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Manuscripts | CrisPRO Research',
  description: "Peer-reviewed manuscripts and research publications from CrisPRO.ai on variant interpretation, mechanism alignment, and oncology AI validation.",
};

export default async function ResearchManuscriptsPage() {
  const manuscripts = await getAllUseCasesCms().catch(() => []);

  return (
    <ResearchSectionShell
      chrome={{
        section: 'manuscripts',
        backHref: '/research',
        backLabel: 'Back to Research',
      }}
    >
      <ManuscriptsListing manuscripts={manuscripts} />
    </ResearchSectionShell>
  );
}
