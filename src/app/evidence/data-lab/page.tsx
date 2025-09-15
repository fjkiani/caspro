import { DataLabSection } from '@/components/evidence/DataLabSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Lab - Interactive Study Browser',
  description: 'Navigate complex genomic and clinical datasets in real-time with the CrisPRO.ai Data Lab.',
};

export default function DataLabPage() {
  return <DataLabSection />;
}
