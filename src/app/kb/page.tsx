import type { Metadata } from 'next';
import KBIndexSurface from '@/components/kb/KBIndexSurface';

export const metadata: Metadata = {
  title: 'Knowledge base — CrisPRO',
  description: 'Capabilities, governance, research chapters — one index, three tabs.',
};

export default function KBPage() {
  return <KBIndexSurface />;
}
