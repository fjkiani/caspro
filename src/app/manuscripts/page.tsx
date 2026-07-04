import { redirect } from 'next/navigation';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manuscripts",
  description: "Peer-review-ready manuscripts and preprints from the CrisPRO.ai research team.",
  alternates: { canonical: "/manuscripts" },
};


export const dynamic = 'force-dynamic';

export default function ManuscriptsListPage() {
  redirect(RESEARCH_SECTIONS.manuscripts);
}
