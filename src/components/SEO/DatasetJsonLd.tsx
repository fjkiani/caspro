import React from 'react';

interface VariableMeasured {
  name: string;
  value?: string | number;
  unitText?: string;
  description?: string;
}

interface Distribution {
  encodingFormat: string;
  contentUrl: string;
}

interface DatasetJsonLdProps {
  name: string;
  description: string;
  url: string;
  license?: string;
  creator?: string;
  keywords?: string[];
  measurementTechnique?: string;
  variableMeasured?: VariableMeasured[];
  distribution?: Distribution[];
  dateModified?: string;
  id?: string;
}

/**
 * Dataset JSON-LD helper (for /benchmarks and other public data pages).
 * Uses plain <script> tag — do NOT switch to next/script beforeInteractive.
 */
export const DatasetJsonLd = ({
  name,
  description,
  url,
  license = 'https://creativecommons.org/licenses/by/4.0/',
  creator = 'CrisPRO.ai',
  keywords = [],
  measurementTechnique,
  variableMeasured = [],
  distribution = [],
  dateModified,
  id = 'dataset-jsonld',
}: DatasetJsonLdProps) => {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name,
    description,
    url,
    license,
    creator: {
      '@type': 'Organization',
      name: creator,
      url: 'https://crispro.ai',
    },
  };

  if (keywords.length) data.keywords = keywords;
  if (measurementTechnique) data.measurementTechnique = measurementTechnique;
  if (dateModified) data.dateModified = dateModified;

  if (variableMeasured.length) {
    data.variableMeasured = variableMeasured.map((v) => ({
      '@type': 'PropertyValue',
      name: v.name,
      ...(v.value !== undefined ? { value: v.value } : {}),
      ...(v.unitText ? { unitText: v.unitText } : {}),
      ...(v.description ? { description: v.description } : {}),
    }));
  }

  if (distribution.length) {
    data.distribution = distribution.map((d) => ({
      '@type': 'DataDownload',
      encodingFormat: d.encodingFormat,
      contentUrl: d.contentUrl,
    }));
  }

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default DatasetJsonLd;
