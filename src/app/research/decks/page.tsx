import type { Metadata } from 'next';
import { getDeckPosts } from '@/services';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import DecksListing from '@/components/research/listings/DecksListing';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Decks | CrisPRO Research',
  description: "Research decks and presentations from CrisPRO.ai — visual deep dives into metastasis prevention, engine architecture, and validation methodology.",
};

export default async function ResearchDecksPage() {
  const deckPosts = await getDeckPosts().catch(() => []);

  return (
    <ResearchSectionShell
      chrome={{
        section: 'decks',
        backHref: '/research',
        backLabel: 'Back to Research',
      }}
    >
      <DecksListing deckPosts={deckPosts} />
    </ResearchSectionShell>
  );
}
