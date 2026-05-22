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
        <div className="pt-14 min-h-[100dvh] bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          <ResearchBlogPostChrome />
          {children}
        </div>
      </>
    );
  }

  return <>{children}</>;
}
