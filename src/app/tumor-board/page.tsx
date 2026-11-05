import type { Metadata } from 'next';
import TumorBoardPicker from '@/components/tumor-board/TumorBoardPicker';

export const metadata: Metadata = {
  title: 'Tumor board · CrisPRO',
  description:
    'Rank options and rule out mismatches for a case — with evidence. Research use only.',
};

export default function TumorBoardPage() {
  return <TumorBoardPicker />;
}
