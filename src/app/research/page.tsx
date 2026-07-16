import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { RESEARCH_PAGE_DATA } from '@/data/research-page';

export const metadata: Metadata = {
  title: 'Research — CrisPRO',
  description: 'The mechanism-alignment layer, in the open. Chapters, modules, receipts.',
};

export default function ResearchPage() {
  return <VerticalSurface data={RESEARCH_PAGE_DATA} headerLink={{ label: 'Knowledge base', href: '/kb/' }} />;
}
