import type { Metadata } from 'next';
import { getResearchAbstracts } from '@/lib/docs/hygraph/research-abstract-queries';
import {
  abstractsIndexJsonLd,
  abstractsIndexMetadata,
  extractAbstractSeoMeta,
} from '@/lib/research/abstract-seo';
import { JsonLd } from '@/components/SEO/JsonLd';
import ResearchSectionShell from '@/components/research/ResearchSectionShell';
import AbstractsListing from '@/components/research/listings/AbstractsListing';
import AbstractsHashScroll from '@/components/research/listings/AbstractsHashScroll';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { items } = await getResearchAbstracts().catch(() => ({ source: 'local' as const, items: [] }));
  const seoList = items.map(extractAbstractSeoMeta);
  return abstractsIndexMetadata(seoList);
}

export default async function ResearchAbstractsPage() {
  const { source, items } = await getResearchAbstracts().catch(() => ({
    source: 'local' as const,
    items: [],
  }));
  const seoList = items.map(extractAbstractSeoMeta);

  return (
    <ResearchSectionShell
      chrome={{
        section: 'abstracts',
        backHref: '/research',
        backLabel: 'Back to Research',
      }}
    >
      <JsonLd data={abstractsIndexJsonLd(seoList)} />
      <AbstractsHashScroll />
      <AbstractsListing abstracts={items} source={source} />
    </ResearchSectionShell>
  );
}
