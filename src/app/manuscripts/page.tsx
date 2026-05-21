import { redirect } from 'next/navigation';
import { RESEARCH_SECTIONS } from '@/lib/research/paths';

export const dynamic = 'force-dynamic';

export default function ManuscriptsListPage() {
  redirect(RESEARCH_SECTIONS.manuscripts);
}
