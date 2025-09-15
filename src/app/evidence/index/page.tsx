import React from 'react';
import { Metadata } from 'next';
import { EvidencePageContent } from '@/components/evidence/EvidencePageContent';

export const metadata: Metadata = {
  title: 'Evidence Intelligence - CrisPRO.ai',
  description: 'Turn raw findings into a clear evidence story: confidence, tier, badges, and citations — all with provenance (RUO).',
};


export default function EvidencePage() {
  return <EvidencePageContent />;
}
