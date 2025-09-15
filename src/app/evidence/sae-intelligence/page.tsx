import { SAESection } from '@/components/evidence';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAE Intelligence - Interpretable Genomic Features',
  description: 'Go beyond the score. See the exact biological features that drive a prediction and understand why a variant is disruptive.',
};

export default function SAEIntelligencePage() {
  return <SAESection />;
}
