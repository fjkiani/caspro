'use client';

/**
 * useInViewportOnce
 * ─────────────────────────────────────────────────────────────────────────────
 * Latching IntersectionObserver hook. Returns { ref, hasEntered }.
 *
 *   - `hasEntered` starts as `false`.
 *   - When the observed element intersects the viewport at the configured
 *     `threshold` (default 0.2 = 20%), `hasEntered` flips to `true`
 *     PERMANENTLY. The observer disconnects itself once triggered.
 *   - Element stays alive in the DOM after triggering — the caller decides
 *     what to render before/after. This is intentional: the r3f Canvas
 *     mounts once, initializes WebGL, and keeps its scene resident so that
 *     leaving the viewport doesn't destroy expensive shader compilation.
 *
 * Falls back to `hasEntered: true` when running in a non-browser environment
 * (SSR) so that server-rendered markup is not empty for accessibility /
 * SEO / print. In practice, ThreeSceneMount is client-only anyway.
 */

import { useEffect, useRef, useState } from 'react';

export interface UseInViewportOnceOptions {
  /** Fraction of the element that must be visible to trigger. Default: 0.2 */
  threshold?: number;
  /** Root margin for the IntersectionObserver. Default: '0px' */
  rootMargin?: string;
  /** Override the root element (defaults to viewport). */
  root?: Element | null;
}

export interface UseInViewportOnceResult<T extends HTMLElement = HTMLDivElement> {
  ref: React.MutableRefObject<T | null>;
  hasEntered: boolean;
}

export function useInViewportOnce<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewportOnceOptions = {},
): UseInViewportOnceResult<T> {
  const { threshold = 0.2, rootMargin = '0px', root = null } = options;
  const ref = useRef<T | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  useEffect(() => {
    // Once latched, never re-observe.
    if (hasEntered) return;

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      // SSR / very old browsers: mount immediately.
      setHasEntered(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (cancelled) return;
            setHasEntered(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold, rootMargin, root },
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, hasEntered]);

  return { ref, hasEntered };
}
