import React from 'react';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbListJsonLdProps {
  items: BreadcrumbItem[];
  id?: string;
}

/**
 * BreadcrumbList JSON-LD helper for SEO.
 * Server-rendered via plain <script> tag (Next 14 App Router requirement).
 * DO NOT convert this to next/script with strategy="beforeInteractive" — that
 * strategy silently emits client-only in RSC contexts and Google will not see it.
 */
export const BreadcrumbListJsonLd = ({ items, id = 'breadcrumb-jsonld' }: BreadcrumbListJsonLdProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: entry.name,
      item: entry.item,
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

export default BreadcrumbListJsonLd;
