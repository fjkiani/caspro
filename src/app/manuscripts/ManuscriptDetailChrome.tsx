'use client';

import { usePathname } from 'next/navigation';
import ResearchChrome from '@/components/research/ResearchChrome';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';

export default function ManuscriptDetailChrome() {
  const pathname = usePathname() || '';
  const isDetail = /^\/manuscripts\/[^/]+\/?$/.test(pathname);
  if (!isDetail) return null;

  return (
    <ResearchChrome
      section="manuscripts"
      backHref={RESEARCH_SECTIONS.manuscripts}
      backLabel="Back to All Manuscripts"
    />
  );
}
