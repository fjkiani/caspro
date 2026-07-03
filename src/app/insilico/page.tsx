import React from 'react';
import { Metadata } from 'next';
import InSilicoHomePage from '@/components/insilico/InSilicoHomePage';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata: Metadata = {
  title: 'In-Silico Capabilities | Caspro',
  description: 'Research-grade AI capabilities for oncology: variant insights, therapy fit, radiation readiness, CRISPR intelligence, and more.',
};

export default function InSilicoPage() {
  return (
    <main>
      <InSilicoHomePage />
      <RelatedLinks route="/insilico" />
    </main>
  );
}
