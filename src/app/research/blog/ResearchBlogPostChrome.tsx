'use client';

import { usePathname } from 'next/navigation';
import ResearchChrome from '@/components/research/ResearchChrome';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';

/** Breadcrumb + back link on individual blog posts under /research/blog/[slug]. */
export default function ResearchBlogPostChrome() {
  const pathname = usePathname() || '';
  const isPost = /^\/research\/blog\/[^/]+\/?$/.test(pathname);
  if (!isPost) return null;

  return (
    <ResearchChrome
      section="blog"
      backHref={RESEARCH_SECTIONS.blog}
      backLabel="Back to All Articles"
    />
  );
}
