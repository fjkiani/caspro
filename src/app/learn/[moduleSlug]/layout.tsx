import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type Params = { moduleSlug: string };

const humanize = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const moduleName = humanize(params.moduleSlug);
  return {
    title: `${moduleName} — Learning Center`,
    description: `${moduleName} learning module on the CrisPRO.ai platform — primers, walk-throughs, and applied workflows for precision oncology.`,
    alternates: { canonical: `/learn/${params.moduleSlug}` },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
