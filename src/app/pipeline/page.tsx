import type { Metadata } from 'next';
import PipelineMasterSurface from '@/components/pipeline/PipelineMasterSurface';

export const metadata: Metadata = {
  title: 'Pipeline — CrisPRO',
  description:
    'Seven programs · 32+ decoded trials · IP estate · active engagements. Sourced from the master pipeline JSON (external-safe unless flagged internal_only).',
};

export default function PipelinePage() {
  return <PipelineMasterSurface />;
}
