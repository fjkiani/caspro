import React from 'react';
import { rAndDDeckData } from './r-and-d-deck';
import SafetyDeck from './safety';
import EfficacyDeck from './efficacy';
import TrialsDeck from './trials';
import CrisPRO101Deck from './CrisPRO101';
import MetastasisDeckWrapper from './Metastasis/MetastasisDeckWrapper';

// Simple wrapper component for R&D deck
const RAndDDeckWrapper: React.FC = () => {
  return React.createElement('div', { className: 'w-full h-full' }, rAndDDeckData.slides[0].content);
};

// Deck metadata interface
export interface DeckMetadata {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'efficacy' | 'trials' | 'r-and-d' | 'crispro-101' | 'metastasis' | 'oracle' | 'forge' | 'boltz' | 'command-center';
  icon: string;
  component: React.ComponentType;
  slideCount?: number;
  tags: string[];
}

// Registry of all available decks
export const deckRegistry: DeckMetadata[] = [
  {
    id: 'safety',
    title: 'ZETA Safety',
    description: 'Predictive toxicity assessment and safety profiling for precision medicine',
    category: 'safety',
    icon: '🛡️',
    component: SafetyDeck,
    slideCount: 11,
    tags: ['toxicity', 'safety', 'pharmacogenomics', 'DPYD', 'evo2', 'proactive-care']
  },
  {
    id: 'efficacy',
    title: 'ZETA Efficacy',
    description: 'S/P/E Fusion Engine for ranked therapeutic efficacy prediction',
    category: 'efficacy',
    icon: '🎯',
    component: EfficacyDeck,
    slideCount: 12,
    tags: ['efficacy', 's-p-e-fusion', 'therapeutic-ranking', 'gene-essentiality', 'variant-impact', 'pathway-analysis']
  },
  {
    id: 'trials',
    title: 'ZETA Trials',
    description: 'In-silico clinical trial simulation and patient recruitment optimization',
    category: 'trials',
    icon: '🧪',
    component: TrialsDeck,
    slideCount: 12,
    tags: ['clinical-trials', 'patient-recruitment', 'in-silico-simulation', 'digital-twin', 'trial-optimization']
  },
  {
    id: 'r-and-d',
    title: 'R&D Transformation',
    description: 'Complete story of transforming drug development from $2.6B gamble to deterministic engineering',
    category: 'r-and-d',
    icon: '🧬',
    component: RAndDDeckWrapper,
    slideCount: 1,
    tags: ['drug-development', 'ai-platform', 'oracle', 'forge']
  },
  {
    id: 'crispro-101',
    title: 'CrisPRO 101',
    description: 'The End of Biological Gambling - An Agentic Platform for Engineering Therapeutic Certainty',
    category: 'crispro-101',
    icon: '🎯',
    component: CrisPRO101Deck,
    slideCount: 9,
    tags: ['overview', 'platform-intro', 'biological-simulation', 'therapeutic-certainty', 'evo2', 'agentic-platform']
  },
  {
    id: 'metastasis',
    title: 'Metastasis Interception',
    description: 'The First AI-Powered Platform for Stage-Specific CRISPR Therapeutics Against Cancer\'s Deadliest Threat',
    category: 'metastasis',
    icon: '🎯',
    component: MetastasisDeckWrapper,
    slideCount: 14,
    tags: ['metastasis', 'crispr-therapeutics', 'stage-specific', 'cancer-interception', 'ai-platform', 'therapeutic-design']
  }
];

// Get deck by ID
export const getDeckById = (id: string): DeckMetadata | undefined => {
  return deckRegistry.find(deck => deck.id === id);
};

// Get decks by category
export const getDecksByCategory = (category: string): DeckMetadata[] => {
  return deckRegistry.filter(deck => deck.category === category);
};

// Get all deck categories
export const getDeckCategories = (): string[] => {
  return [...new Set(deckRegistry.map(deck => deck.category))];
};

// Search decks by tags or title
export const searchDecks = (query: string): DeckMetadata[] => {
  const lowercaseQuery = query.toLowerCase();
  return deckRegistry.filter(deck => 
    deck.title.toLowerCase().includes(lowercaseQuery) ||
    deck.description.toLowerCase().includes(lowercaseQuery) ||
    deck.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
