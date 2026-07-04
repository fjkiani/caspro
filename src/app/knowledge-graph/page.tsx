'use client';

import KnowledgeGraphExample from '@/components/visualization/KnowledgeGraphExample';
import RelatedLinks from '@/components/shared/RelatedLinks';

export default function KnowledgeGraphPage() {
  return (
    <main>
      <KnowledgeGraphExample />
      <RelatedLinks route="/knowledge-graph" />
    </main>
  );
}
