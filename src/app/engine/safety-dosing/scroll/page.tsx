import type { Metadata } from 'next';
import SafetyDosingScrollSurface from '@/components/engine/SafetyDosingScrollSurface';

export const metadata: Metadata = {
  title: 'Safety & Dosing — Scroll | CrisPRO Engine',
  description:
    'Deep-scroll walk-through of L5 Safety & Dosing receipts: PREPARE, CYP2C19-clopidogrel, Nguyen 2024 DPYD, CPIC concordance, Tier 2 heuristic.',
};

export default function SafetyDosingScrollRoute() {
  return <SafetyDosingScrollSurface />;
}
