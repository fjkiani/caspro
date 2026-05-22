'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import AppLoading from '@/components/ui/AppLoading';

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor) return;
      if (anchor.getAttribute('target') === '_blank') return;
      if (anchor.hasAttribute('download')) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
        return;
      }

      try {
        const next = new URL(rawHref, window.location.origin);
        if (next.origin !== window.location.origin) return;
        const nextUrl = `${next.pathname}${next.search}`;
        if (nextUrl === currentUrl) return;
        setPending(true);
      } catch {
        /* ignore malformed href */
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [currentUrl]);

  useEffect(() => {
    setPending(false);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setPending(false), 120);
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [pathname, searchParams]);

  if (!pending) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-background/85 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <AppLoading />
    </div>
  );
}

/** Global overlay during in-app link navigations (complements route `loading.tsx`). */
export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderInner />
    </Suspense>
  );
}
