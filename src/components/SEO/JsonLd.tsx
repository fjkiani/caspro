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
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CrisPRO",
  "url": "https://crispro.ai",
  "logo": "https://crispro.ai/logo.png", // You'll need to add a logo here
  "sameAs": [
    "https://twitter.com/crispro_ai", // Replace with your actual Twitter
    // Add other social media links here
  ]
}; 