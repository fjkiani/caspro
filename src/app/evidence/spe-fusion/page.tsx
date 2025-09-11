import React from 'react';
import { Metadata } from 'next';
import { SPEFusion } from '@/components/use-cases';

export const metadata: Metadata = {
  title: 'S/P/E Fusion - Evidence Intelligence | CrisPRO.ai',
  description: 'Sequence + Pathway + Evidence fusion methodology for explainable therapy ranking with confidence and citations.',
};

export default function SPEFusionPage() {
  return (
    <div className="min-h-screen bg-white">
      <SPEFusion />
    </div>
  );
}
