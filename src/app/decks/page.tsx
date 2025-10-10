import React from 'react';
import { Metadata } from 'next';
import DeckViewer from '@/components/decks/DeckViewer';

export const metadata: Metadata = {
  title: 'Presentation Decks - CrisPRO.ai',
  description: 'Explore our comprehensive presentation decks covering drug development, AI capabilities, and platform features.',
};

export default function DecksPage() {
  return <DeckViewer />;
}
