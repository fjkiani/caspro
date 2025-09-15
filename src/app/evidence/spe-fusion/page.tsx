import { SpeFusionSection } from '@/components/evidence/SpeFusionSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'S/P/E Fusion - Unified Variant Interpretation',
  description: 'Integrate Structure, Phenotype, and Expression data for a comprehensive, multi-dimensional view of variant impact.',
};

export default function SpeFusionPage() {
  return <SpeFusionSection />;
}
