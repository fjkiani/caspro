import type { Metadata } from 'next';
import GovernanceSurface from '@/components/governance/GovernanceSurface';

export const metadata: Metadata = {
  title: 'Governance — CrisPRO',
  description:
    'Five operational guardrails, two mandatory disclosures, four prohibited claims. Every capability inherits this substrate.',
};

export default function GovernancePage() {
  return <GovernanceSurface />;
}
