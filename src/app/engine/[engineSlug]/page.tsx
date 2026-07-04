import EngineSlugClient from './EngineSlugClient';
import { normalizeEngineSlug } from '@/data/engine-slug';
import type { Metadata } from 'next';

const ENGINE_SLUG_COPY_INJECTED: Record<string, { title: string; body: string[] }> = {
  'mechanism-alignment': { title: 'Mechanism Alignment engine', body: ["The Mechanism Alignment engine answers a single question: does this therapy actually hit the driver in this patient's tumor?", "Standard oncology decision support scores 'genomically matched' vs 'not matched.' Mechanism Alignment goes deeper. It projects the tumor's driver map onto the therapy's target profile, weighs off-mechanism activity, and returns a signed alignment score with a mechanistic story.", "This is where a naive AUC misleads. A drug can be 'genomically matched' to a variant but hit an off-pathway target that does nothing in this patient's biology. Mechanism Alignment catches that and downgrades the recommendation with a specific, reviewable rationale.", 'See Oracle for variant scoring, Forge for design, and the evidence ledger for validation.'] },
  'safety-dosing': { title: 'Safety & Dosing engine', body: ['The Safety & Dosing engine is the risk-benefit governor on every CrisPRO recommendation.', "It ingests the patient's clinical picture — organ function, comorbidities, prior toxicities, concomitant medications — and projects it against the candidate regimen's toxicity envelope. The engine returns a dose recommendation, a monitoring plan, and an explicit list of the assumptions that produced it.", 'Dose intensity is a mechanism variable, not a fixed number. Safety & Dosing treats it that way: the same drug at a different intensity engages a different subset of the target space, and the engine reflects that in its scoring.', 'Every dose call is Scribe-narratable and tumor-board-defensible.'] },
  'safety': { title: 'Safety engine', body: ['The Safety engine is the always-on toxicity guardrail across the CrisPRO platform.', 'It watches every regimen recommendation, every design produced by Forge, and every combination proposed by Synthetic Lethality, and flags known-serious toxicity signals, contraindicated combinations, and off-mechanism liabilities.', 'The engine is deliberately conservative. When it flags, it downgrades or blocks — with a specific, auditable reason and a link to the primary evidence.', 'Safety composes with Safety & Dosing to give both a Boolean gate and a graded dosing recommendation.'] },
  'synthetic-lethality': { title: 'Synthetic Lethality engine', body: ['Synthetic Lethality is the CrisPRO engine that opens combination-therapy space when single-agent options are exhausted.', "It maps the tumor's driver mutations and expression profile onto published and internally-curated synthetic-lethal interactions, ranks candidate combinations by mechanistic strength and evidence weight, and hands the top candidates to Forge for design and to Safety for toxicity gating.", 'This is not a lookup table. Synthetic Lethality reasons about paralog buffering, pathway redundancy, and clone-level heterogeneity — because a naive SL call that ignores paralog compensation is worse than none.', 'See the case studies for examples on resistant tumors where SL opened a viable path.'] },
};

export async function generateMetadata({
  params,
}: {
  params: { engineSlug: string };
}): Promise<Metadata> {
  const slug = normalizeEngineSlug(params.engineSlug);
  const humanized = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const copy = ENGINE_SLUG_COPY_INJECTED[slug];
  const title = copy ? `${copy.title} | CrisPRO Engine` : `${humanized} | CrisPRO Engine`;
  const description = copy
    ? copy.body[0]
    : `${humanized}: a CrisPRO.ai engine for oncology decision support and AI-driven metastasis prevention.`;
  return {
    title,
    description,
    alternates: { canonical: `/engine/${slug}` },
    openGraph: { title, description, url: `https://crispro.ai/engine/${slug}`, type: 'article' },
  };
}

type Props = {
  params: { engineSlug: string };
};


export default function EngineSlugRoutePage({ params }: Props) {
  const slug = normalizeEngineSlug(params.engineSlug);
  const copy = ENGINE_SLUG_COPY_INJECTED[slug];
  return (
    <>
      {copy && (
        <section className="mx-auto max-w-3xl px-6 py-12 text-zinc-300">
          <h1 className="text-3xl font-black tracking-tight text-white mb-4">
            {copy.title}
          </h1>
          {copy.body.map((p, i) => (
            <p key={i} className="mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      )}
      <EngineSlugClient slug={slug} />
    </>
  );
}

