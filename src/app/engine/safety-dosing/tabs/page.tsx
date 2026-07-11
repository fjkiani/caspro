import type { Metadata } from 'next';
import SafetyDosingTabsSurface from '@/components/engine/SafetyDosingTabsSurface';

export const metadata: Metadata = {
  title: 'Safety & Dosing — Tabs | CrisPRO Engine',
  description:
    'Tabbed L5 Safety & Dosing receipt browser: PREPARE, CYP2C19-clopidogrel, Nguyen 2024 DPYD, CPIC concordance, Tier 2 heuristic.',
};

export default function SafetyDosingTabsRoute() {
  return <SafetyDosingTabsSurface />;
}
