import { permanentRedirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

/** @deprecated Use `/manuscripts/[slug]/` */
export default async function UseCaseDetailRedirect({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/manuscripts/${encodeURIComponent(slug)}/`);
}
