import type { Metadata } from 'next';
import ChaptersIndex from '@/components/research/ChaptersIndex';

export const metadata: Metadata = {
  title: 'Research chapters — CrisPRO',
  description:
    'Nine chapters covering the mechanism-alignment layer end-to-end. Public science only.',
};

export default function ChaptersIndexPage() {
  return <ChaptersIndex />;
}
