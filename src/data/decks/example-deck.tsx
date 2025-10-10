import React from 'react';

// Example of how to create additional decks
const ExampleSlide: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
    <h1 className="text-5xl font-bold text-gray-900 mb-6">{title}</h1>
    <p className="text-2xl text-gray-600 max-w-4xl">{content}</p>
  </div>
);

export const exampleDeckData = {
  title: "Example Deck",
  description: "This is an example of how to create additional decks using the reusable DeckViewer component.",
  slides: [
    {
      id: 0,
      title: "Slide 1",
      subtitle: "First slide example",
      content: <ExampleSlide title="Welcome" content="This is the first slide of our example deck." />
    },
    {
      id: 1,
      title: "Slide 2", 
      subtitle: "Second slide example",
      content: <ExampleSlide title="About Us" content="This is the second slide with more information." />
    },
    {
      id: 2,
      title: "Slide 3",
      subtitle: "Third slide example", 
      content: <ExampleSlide title="Contact" content="This is the final slide with contact information." />
    }
  ]
};




