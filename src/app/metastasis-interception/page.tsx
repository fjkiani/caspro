import React from 'react';
import MetastasisInterception from '@/components/metastasis/MetastasisInterception';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata = {
  title: 'Metastasis Interception | Engineering Biological Certainty',
  description: 'The first AI-powered platform to design stage-specific CRISPR therapeutics against cancer\'s deadliest threat: metastasis.',
};

export default function MetastasisInterceptionPage() {
  return (
    <main>
      <MetastasisInterception />
      <RelatedLinks route="/metastasis-interception" />
    </main>
  );
}
