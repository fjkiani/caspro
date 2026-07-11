import type { Metadata } from 'next';
import SafetyDosingIntroPage from '@/components/engine/SafetyDosingIntroPage';

export const metadata: Metadata = {
  title: 'Safety & Dosing | CrisPRO Engine',
  description:
    'L5 Safety & Dosing engine · deterministic CPIC veto gate · PREPARE outcome-linked · CYP2C19 clopidogrel · Nguyen 2024 real-world DPYD · Tier 2 heuristic.',
};

export default function SafetyDosingIntroRoute() {
  return <SafetyDosingIntroPage />;
}
