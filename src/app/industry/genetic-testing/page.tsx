import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { INDUSTRY_GENETIC_PAGE_DATA } from '@/data/pages/industry-genetic-page';

export const metadata: Metadata = {
  title: 'Genetic testing & CGP · CrisPRO',
  description: 'The mechanism-alignment layer above the variant call.',
};

export default function GeneticPage() {
  return <VerticalSurface data={INDUSTRY_GENETIC_PAGE_DATA} />;
}
