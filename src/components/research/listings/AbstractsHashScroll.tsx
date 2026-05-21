'use client';

import { useEffect } from 'react';

/** Scroll to `#slug` when landing on the abstracts index from legacy nav hashes. */
export default function AbstractsHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return null;
}
