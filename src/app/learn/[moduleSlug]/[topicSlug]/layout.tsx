import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type Params = { moduleSlug: string; topicSlug: string };

const humanize = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const topic = humanize(params.topicSlug);
  const mod = humanize(params.moduleSlug);
  return {
    title: `${topic} — ${mod}`,
    description: `${topic}: an applied walkthrough in the ${mod} module of the CrisPRO.ai Learning Center.`,
    alternates: { canonical: `/learn/${params.moduleSlug}/${params.topicSlug}` },
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
