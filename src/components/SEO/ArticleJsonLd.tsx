import React from 'react';

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  imageUrl?: string;
  id?: string;
}

/**
 * Article / TechArticle JSON-LD helper.
 * Uses plain <script> tag — do NOT switch to next/script beforeInteractive.
 */
export const ArticleJsonLd = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'CrisPRO.ai',
  publisherName = 'CrisPRO.ai',
  imageUrl = 'https://crispro.ai/logo.png',
  id = 'article-jsonld',
}: ArticleJsonLdProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://crispro.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://crispro.ai/logo.png',
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default ArticleJsonLd;
