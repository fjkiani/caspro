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
  if (!entry) return { title: 'Receipts not found · Tumor Board' };
  return {
    title: `${entry.cancerType} · receipts · Tumor Board`,
    description: entry.headline,
  };
}

/**
 * E2E pipeline receipts (HTML mockup + JSON) — not the Case→Options→Gaps board walk.
 * Board twins: entry.boardHref (NSCLC / AK).
 */
export default async function L5ReceiptsPage({ params }: Props) {
  const { caseId } = await params;
  const entry = getL5Case(caseId);
  if (!entry) notFound();
  redirect(entry.pipelineHref);
}
