import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INDUSTRY_RESEARCH_PAGE_DATA } from '@/data/pages/industry-research-page';

export const metadata: Metadata = {
  title: 'Academic research · CrisPRO',
  description: 'Public ledger, public sources, cited receipts.',
};

export default function ResearchPage() {
  return <VerticalSurface data={INDUSTRY_RESEARCH_PAGE_DATA} />;
}
