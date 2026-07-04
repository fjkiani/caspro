import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Research | CrisPRO.ai",
  description: "Research publications, manuscripts, abstracts, and evidence from CrisPRO.ai on variant interpretation, mechanism alignment, and oncology AI validation.",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
