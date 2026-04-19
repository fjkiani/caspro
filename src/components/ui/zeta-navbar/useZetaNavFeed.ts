'use client';

import { useEffect, useState } from 'react';

export type ManuscriptNavItem = { id: string; slug: string; title: string };
export type BlogNavPost = { slug: string; title: string };
export type BlogNavCategory = { slug: string; name: string };

type ManuscriptsApi = { items?: ManuscriptNavItem[] };
type BlogNavApi = { posts?: BlogNavPost[]; categories?: BlogNavCategory[] };

/**
 * Fetches manuscript + blog lists for navbar dropdowns (same sources as pages).
 */
export function useZetaNavFeed() {
  const [manuscripts, setManuscripts] = useState<ManuscriptNavItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogNavPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogNavCategory[]>([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mRes, bRes] = await Promise.all([
          fetch('/api/manuscripts').then((r) => r.json() as Promise<ManuscriptsApi>),
          fetch('/api/blog/nav').then((r) => r.json() as Promise<BlogNavApi>),
        ]);
        if (cancelled) return;
        setManuscripts(Array.isArray(mRes.items) ? mRes.items : []);
        setBlogPosts(Array.isArray(bRes.posts) ? bRes.posts : []);
        setBlogCategories(Array.isArray(bRes.categories) ? bRes.categories : []);
      } catch {
        if (!cancelled) {
          setManuscripts([]);
          setBlogPosts([]);
          setBlogCategories([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { manuscripts, blogPosts, blogCategories };
}
