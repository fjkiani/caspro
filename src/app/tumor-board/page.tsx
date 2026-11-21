import type { Metadata } from 'next';
import TumorBoardPicker from '@/components/tumor-board/TumorBoardPicker';

export const metadata: Metadata = {
  title: 'Tumor board · CrisPRO',
  description: 'Open a case. Rank options. Rule out mismatches.',
};

export default function TumorBoardPage() {
  return <TumorBoardPicker />;
}
