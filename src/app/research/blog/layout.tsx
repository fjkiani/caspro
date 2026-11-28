'use client';

import { usePathname } from 'next/navigation';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import ResearchBlogPostChrome from './ResearchBlogPostChrome';

/** Blog layout under /research/blog — no legacy footer; nav only on post detail pages. */
export default function ResearchBlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isPostDetail = /^\/research\/blog\/[^/]+\/?$/.test(pathname);

  if (isPostDetail) {
    return (
      <>
        <ZetaNavbar />
        {/*
          Do not use min-h-[100dvh] here: Notebook book mode paints a fixed
          viewport shell under the nav. min-h + ResearchChrome + shell was
          stacking past 100dvh and forcing document scroll.
        */}
        <div className="bg-white pt-14 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
          <ResearchBlogPostChrome />
          {children}
        </div>
      </>
    );
  }

  return <>{children}</>;
}
