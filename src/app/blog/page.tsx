import { redirect } from 'next/navigation';
import { RESEARCH_HUB } from '@/lib/research/paths';

export const dynamic = 'force-dynamic';

/** Legacy /blog → research knowledge-base hub. */
export default function BlogPage() {
  redirect(RESEARCH_HUB);
}
