import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getL5Case, listWiredL5Cases } from '@/data/tumor-board/l5-case-registry';

type Props = { params: Promise<{ caseId: string }> };

export function generateStaticParams() {
  return listWiredL5Cases().map((c) => ({ caseId: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caseId } = await params;
  const entry = getL5Case(caseId);
  if (!entry) return { title: 'Case not found · Tumor Board' };
  return {
    title: `${entry.cancerType} · ${entry.label} · Tumor Board`,
    description: entry.headline,
  };
}

/**
 * Legacy alias — /resolve/* permanently redirects to /receipts/*.
 * Do not send new CTAs here.
 */
export default async function L5ResolveAliasPage({ params }: Props) {
  const { caseId } = await params;
  if (!getL5Case(caseId)) notFound();
  redirect(`/tumor-board/receipts/${caseId}/`);
}
