import React from 'react';
import { Metadata } from 'next';
import InSilicoHomePage from '@/components/insilico/InSilicoHomePage';

export const metadata: Metadata = {
  title: 'In-Silico Capabilities | Caspro',
  description: 'Research-grade AI capabilities for oncology: variant insights, therapy fit, radiation readiness, CRISPR intelligence, and more.',
};

export default function InSilicoPage() {
  return <InSilicoHomePage />;
}
