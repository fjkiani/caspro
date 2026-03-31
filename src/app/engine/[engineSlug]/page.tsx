import EngineSlugClient from './EngineSlugClient';
import { normalizeEngineSlug } from '@/data/engine-registry';

type Props = {
  params: { engineSlug: string };
};

export default function EngineSlugRoutePage({ params }: Props) {
  const slug = normalizeEngineSlug(params.engineSlug);
  return <EngineSlugClient slug={slug} />;
}
