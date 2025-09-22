import React from 'react';
import RAndDDeck from '@/app/decks/R&D';

// Simple wrapper to make the R&D deck work as a slide
const RAndDDeckSlide: React.FC = () => {
  return (
    <div className="w-full h-full">
      <RAndDDeck />
    </div>
  );
};

export const rAndDDeckData = {
  title: "Learn More About CrisPRO.ai",
  description: "The complete story of how we're transforming drug development from a $2.6B gamble into deterministic engineering through our integrated AI platform.",
  slides: [
    {
      id: 0,
      title: "The Certainty Engine",
      subtitle: "Transforming a $2.6 Billion Gamble into a Deterministic Science",
      content: <RAndDDeckSlide />
    }
  ]
};
