import type { Metadata } from 'next';
import ScrollBoardSurface from '@/components/tumor-board/ScrollBoardSurface';
import { PatientProvider } from '@/context/PatientContext';
import { AK01 } from '@/data/patients/AK01';

export const metadata: Metadata = {
  title: 'Tumor board (scroll view) · CrisPRO',
  description:
    'CrisPRO tumor board in one continuous scroll: DNA hero, then the 5 capability engines with substrate cards between them. Every readout is substrate-only and every guardrail links out to governance.',
};

// Legacy scroll view — always renders against AK01, the original demo patient.
// The picker + multi-patient routes live at /tumor-board/ and /tumor-board/[patientId]/.
export default function TumorBoardScrollPage() {
  return (
    <PatientProvider bundle={AK01}>
      <ScrollBoardSurface />
    </PatientProvider>
  );
}
