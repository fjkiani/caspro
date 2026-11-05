import type { Metadata } from 'next';
import InterceptionWorkspace from '@/components/products/interception/InterceptionWorkspace';

export const metadata: Metadata = {
  title: 'Interception · CrisPRO',
  description:
    'Discover the next metastasis target worth testing. 7-step BrM cascade, multi-modal rank, CRISPR design, local AlphaFold structures. Research use only.',
};

export default function InterceptionProductPage() {
  return <InterceptionWorkspace />;
}
