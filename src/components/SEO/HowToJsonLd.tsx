import React from 'react';

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  id?: string;
}

/**
 * HowTo JSON-LD helper.
 * Uses plain <script> tag — do NOT switch to next/script beforeInteractive.
 */
export const HowToJsonLd = ({
  name,
  description,
  steps,
  totalTime,
  id = 'howto-jsonld',
}: HowToJsonLdProps) => {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  };

  if (totalTime) data.totalTime = totalTime;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default HowToJsonLd;
