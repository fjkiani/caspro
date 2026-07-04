import React from 'react';

interface Offer {
  price: string;
  priceCurrency: string;
  availability?: string;
}

interface AggregateRating {
  ratingValue: string | number;
  reviewCount: string | number;
}

interface SoftwareApplicationJsonLdProps {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  featureList?: string[];
  offers?: Offer;
  aggregateRating?: AggregateRating;
  softwareVersion?: string;
  id?: string;
}

/**
 * SoftwareApplication JSON-LD helper.
 * Uses plain <script> tag — do NOT switch to next/script beforeInteractive.
 */
export const SoftwareApplicationJsonLd = ({
  name,
  description,
  url,
  applicationCategory = 'HealthApplication',
  operatingSystem = 'Web',
  featureList = [],
  offers,
  aggregateRating,
  softwareVersion,
  id = 'software-jsonld',
}: SoftwareApplicationJsonLdProps) => {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
  };

  if (featureList.length) data.featureList = featureList;
  if (softwareVersion) data.softwareVersion = softwareVersion;

  if (offers) {
    data.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      ...(offers.availability ? { availability: offers.availability } : {}),
    };
  }

  if (aggregateRating) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    };
  }

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default SoftwareApplicationJsonLd;
