import { redirect } from 'next/navigation';
import { RESEARCH_HUB } from '@/lib/research/paths';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog",
  description: "Evidence notes, platform releases, and CrisPRO.ai research write-ups on metastasis prevention, VUS resolution, and in silico therapeutic design.",
  alternates: { canonical: "/blog" },
};


export const dynamic = 'force-dynamic';

/** Legacy /blog → research knowledge-base hub. */
export default function BlogPage() {
  redirect(RESEARCH_HUB);
}
