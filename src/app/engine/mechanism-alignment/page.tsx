import type { Metadata } from 'next';
import MechanismAlignmentIntroPage from '@/components/engine/MechanismAlignmentIntroPage';

export const metadata: Metadata = {
  title: 'Mechanism Alignment | CrisPRO Engine',
  description:
    'L2 Mechanism Alignment — PATH A ranker fit = clip((p·t) / ‖t‖₂, 0, 1), composite gate 0.7·eligibility + 0.3·mechanism_fit, 7 canonical mechanism axes + 1 opt-in RSS. Signed 2026-04-28.',
};

export default function MechanismAlignmentIntroRoute() {
  return <MechanismAlignmentIntroPage />;
}
