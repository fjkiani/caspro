import type { Metadata } from 'next';
import KBIndexSurface from '@/components/kb/KBIndexSurface';

export const metadata: Metadata = {
  title: 'Knowledge base — CrisPRO',
  description: 'Chapters, modules, capabilities — the mechanism-alignment layer, indexed.',
};

export default function KBPage() {
  return <KBIndexSurface />;
}
