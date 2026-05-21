import type { Metadata } from 'next';
import { getDeckPosts } from '@/services';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import DecksListing from '@/components/research/listings/DecksListing';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Decks | CrisPRO Research',
  description: 'Slide decks and programmatic posters.',
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
