import Script from 'next/script';

export interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  imageUrl?: string;
  id?: string;
}

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  const {
    title,
    description,
    url,
    authorName = 'CrisPRO.ai',
    datePublished,
    dateModified,
    imageUrl,
    id = 'article-jsonld',
  } = props;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    author: { '@type': 'Organization', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'CrisPRO.ai',
      logo: { '@type': 'ImageObject', url: 'https://crispro.ai/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;
  if (imageUrl) data.image = imageUrl;
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
