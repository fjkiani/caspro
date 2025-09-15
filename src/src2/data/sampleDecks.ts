import type { SlideDeck, DeckCategory } from '../types/slides';
import { customDecks } from './customDecks';

export const categories: DeckCategory[] = [
  {
    id: 'research',
    name: 'case studies',
    description: 'case studies presentations and findings',
    icon: '🔬',
    color: 'blue'
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Product demos and showcases',
    icon: '📦',
    color: 'green'
  },
  {
    id: 'marketing',
    name: 'validation',
    description: 'Clinical and Scientific Validation',
    icon: '📈',
    color: 'purple'
  },
];

export const sampleDecks: SlideDeck[] = [
  // Add custom decks
  ...customDecks,
]; 