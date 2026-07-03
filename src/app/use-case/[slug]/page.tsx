import { permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Use Case Detail — CrisPRO.ai",
  description: "Use case detail on CrisPRO.ai — how the platform resolves a specific clinical or research question with evidence-backed, audit-ready reasoning.",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ slug: string }>;
}

/** @deprecated Use `/manuscripts/[slug]/` */
export default async function UseCaseDetailRedirect({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/manuscripts/${encodeURIComponent(slug)}/`);
}
