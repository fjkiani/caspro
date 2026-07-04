import React from 'react';

export interface DefinedTermEntry {
  name: string;
  description: string;
  termCode?: string;
  url?: string;
}

interface DefinedTermSetJsonLdProps {
  name: string;
  description: string;
  url: string;
  terms: DefinedTermEntry[];
  id?: string;
}

/**
 * DefinedTermSet JSON-LD helper for glossaries.
 * Uses plain <script> tag — do NOT switch to next/script beforeInteractive.
 */
export const DefinedTermSetJsonLd = ({
  name,
  description,
  url,
  terms,
  id = 'defined-term-set-jsonld',
}: DefinedTermSetJsonLdProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name,
    description,
    url,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.name,
      description: term.description,
      ...(term.termCode ? { termCode: term.termCode } : {}),
      ...(term.url ? { url: term.url } : {}),
      inDefinedTermSet: url,
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

export default DefinedTermSetJsonLd;
