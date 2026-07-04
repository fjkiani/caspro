import React from 'react';

export interface FaqEntry {
  question: string;
  answer: string;
}

interface FaqPageJsonLdProps {
  entries: FaqEntry[];
  id?: string;
}

/**
 * FAQPage JSON-LD helper.
 * Uses plain <script> tag — do NOT switch to next/script beforeInteractive.
 */
export const FaqPageJsonLd = ({ entries, id = 'faq-jsonld' }: FaqPageJsonLdProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default FaqPageJsonLd;
