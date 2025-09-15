import React from 'react';
import { Metadata } from 'next';
import UnifiedEvidencePage from '@/components/evidence/UnifiedEvidencePage';

export const metadata: Metadata = {
  title: 'Evidence Intelligence Platform - CrisPRO.ai',
  description: 'Transform raw findings into structured, actionable evidence with AI-powered confidence scoring, multi-dimensional analysis, and population context.',
};

export default function EvidencePage() {
  return <UnifiedEvidencePage />;
}
