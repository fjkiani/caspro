import React from 'react';
import { Metadata } from 'next';
import { CohortSection } from '@/components/cohort';

export const metadata: Metadata = {
  title: 'Cohort Context - CrisPRO.ai',
  description: 'Add small, trustworthy cohort snippets to ground your in-silico results — without slowing decisions (RUO).',
};

export default function CohortPage() {
  return (
    <div className="min-h-screen bg-white">
      <CohortSection />
    </div>
  );
}
