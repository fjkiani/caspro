'use client';

import { usePatient } from '@/context/PatientContext';
/**
 * Three mutation rows: MBD4, PDGFRA, TP53. Each row shows HGVS, GRCh38
 * coords, consequence, Evo2 scoring state, normalization note if any.
 */
export default function AKMutationPanel() {
  const patient = usePatient();

  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-white">Mutations · Evo2 scoring receipts</h2>
        <span className="font-mono text-[10px] text-white/30">levels.L1.inputs_used.mutations[]</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02]">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-white/40">
              <th className="px-4 py-3">Gene</th>
              <th className="px-4 py-3">HGVS</th>
              <th className="px-4 py-3">Coords (GRCh38)</th>
              <th className="px-4 py-3">Consequence</th>
              <th className="px-4 py-3">Evo2</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {patient.mutations.map((m) => (
              <tr key={m.gene} className="border-t border-white/5">
                <td className="px-4 py-3 font-mono text-cyan-300">{m.gene}</td>
                <td className="px-4 py-3 font-mono text-xs text-white/80">{m.hgvs}</td>
                <td className="px-4 py-3 font-mono text-xs text-white/60">
                  {m.chrom ? `chr${m.chrom}:${m.pos} ${m.ref}>${m.alt}` : '—'}
                </td>
                <td className="px-4 py-3 text-xs text-white/70">{m.consequence}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      m.scoredByEvo2
                        ? 'rounded border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-200'
                        : 'rounded border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-200'
                    }
                  >
                    {m.scoredByEvo2 ? 'SCORED' : 'EXCLUDED'}
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] text-white/50">{m.normalizationNote ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-[11px] text-white/40">
        <MutationCaption />
        <span> Receipts under <span className="font-mono">synthetic_lethality.provenance.sequence_scoring.variants_sent_to_engine[]</span>.</span>
      </div>
    </section>
  );
}

/**
 * Derives the mutation-row caption from the active bundle instead of
 * hardcoding AK biology. Falls back to a generic count-only sentence when
 * no normalization notes are present.
 */
function MutationCaption() {
  const patient = usePatient();
  const total = patient.mutations.length;
  const scored = patient.mutations.filter((m) => m.scoredByEvo2).length;
  const normalized = patient.mutations.filter((m) => m.normalizationNote);
  if (normalized.length === 0) {
    return (
      <span>
        {scored} of {total} mutations scored by Evo2 without normalization fixes.
      </span>
    );
  }
  const parts = normalized.map((m) =>
    m.normalizationNote
      ? `${m.gene} — ${m.normalizationNote}`
      : `${m.gene}`,
  );
  return (
    <span>
      {parts.join('; ')}. {scored} of {total} mutations scored with receipts.
    </span>
  );
}
