'use client';

import { useEffect, useState } from 'react';
import type { AbstractNavItem } from '@/lib/docs/hygraph/research-abstract-queries';

export type ManuscriptNavItem = { id: string; slug: string; title: string };
export type BlogNavPost = { slug: string; title: string };
export type BlogNavCategory = { slug: string; name: string };

type ManuscriptsApi = { items?: ManuscriptNavItem[] };
type BlogNavApi = { posts?: BlogNavPost[]; categories?: BlogNavCategory[] };
type AbstractsNavApi = { source?: string; items?: AbstractNavItem[] };

/**
 * Fetches manuscript, blog, and abstract lists for navbar dropdowns.
 */
export function useZetaNavFeed() {
  const [manuscripts, setManuscripts] = useState<ManuscriptNavItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogNavPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogNavCategory[]>([]);
  const [abstracts, setAbstracts] = useState<AbstractNavItem[]>([]);
  const [abstractsSource, setAbstractsSource] = useState<'hygraph' | 'local' | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mRes, bRes, aRes] = await Promise.all([
          fetch('/api/manuscripts').then((r) => r.json() as Promise<ManuscriptsApi>),
          fetch('/api/blog/nav').then((r) => r.json() as Promise<BlogNavApi>),
          fetch('/api/abstracts/nav').then((r) => r.json() as Promise<AbstractsNavApi>),
        ]);
        if (cancelled) return;
        setManuscripts(Array.isArray(mRes.items) ? mRes.items : []);
        setBlogPosts(Array.isArray(bRes.posts) ? bRes.posts : []);
        setBlogCategories(Array.isArray(bRes.categories) ? bRes.categories : []);
        setAbstracts(Array.isArray(aRes.items) ? aRes.items : []);
        setAbstractsSource(aRes.source === 'hygraph' ? 'hygraph' : aRes.source === 'local' ? 'local' : null);
      } catch {
        if (!cancelled) {
          setManuscripts([]);
          setBlogPosts([]);
          setBlogCategories([]);
          setAbstracts([]);
          setAbstractsSource(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { manuscripts, blogPosts, blogCategories, abstracts, abstractsSource };
}
