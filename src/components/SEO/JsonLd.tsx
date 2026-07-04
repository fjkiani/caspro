import React from 'react';

interface JsonLdProps {
  data: object;
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CrisPRO.ai',
  url: 'https://crispro.ai',
  logo: 'https://crispro.ai/logo.png',
  description:
    'CrisPRO.ai is the AI-powered metastasis prevention platform. Variant interpretation, in silico therapeutic design, and deterministic oncology decision support.',
  sameAs: [
    'https://linkedin.com/in/crispro-ai',
    'https://www.tiktok.com/@crispro.ai',
    'https://crispro.org/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'fahad@crispro.ai',
    availableLanguage: ['English'],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CrisPRO.ai',
  url: 'https://crispro.ai',
  description:
    'AI-powered metastasis prevention platform — Oracle, Forge, and Scribe intelligence.',
  publisher: {
    '@type': 'Organization',
    name: 'CrisPRO.ai',
  },
};
