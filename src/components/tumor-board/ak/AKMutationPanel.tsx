'use client';

/**
 * Three mutation rows: MBD4, PDGFRA, TP53. Each row shows HGVS, GRCh38
 * coords, consequence, Evo2 scoring state, normalization note if any.
 *
 * Theme-aware (dark: white/cyan/emerald/amber; light: zinc/indigo/emerald/amber)
 * Mobile-safe (px-4 md:px-8, table already has overflow-x-auto).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function AKMutationPanel() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const heading   = isDarkMode ? 'text-white' : 'text-zinc-900';
  const pathMono  = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const tableWrap = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-white';
  const thead     = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const rowBorder = isDarkMode ? 'border-white/5' : 'border-zinc-100';
  const geneMono  = isDarkMode ? 'text-cyan-300' : 'text-indigo-700';
  const hgvsMono  = isDarkMode ? 'text-white/80' : 'text-zinc-800';
  const coordMono = isDarkMode ? 'text-white/60' : 'text-zinc-600';
  const conseq    = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const noteText  = isDarkMode ? 'text-white/50' : 'text-zinc-500';
  const caption   = isDarkMode ? 'text-white/40' : 'text-zinc-500';

  const scoredChip = isDarkMode
    ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
    : 'border-emerald-300 bg-emerald-50 text-emerald-800';
  const excludedChip = isDarkMode
    ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
    : 'border-amber-300 bg-amber-50 text-amber-800';

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className={`text-lg font-semibold ${heading}`}>Mutations · Evo2 scoring receipts</h2>
        <span className={`font-mono text-[10px] ${pathMono}`}>
          levels.L1.inputs_used.mutations[]
        </span>
      </div>
      <div className={`overflow-x-auto rounded-lg border ${tableWrap}`}>
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className={`text-left text-[10px] uppercase tracking-widest ${thead}`}>
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
              <tr key={m.gene} className={`border-t ${rowBorder}`}>
                <td className={`px-4 py-3 font-mono ${geneMono}`}>{m.gene}</td>
                <td className={`px-4 py-3 font-mono text-xs ${hgvsMono}`}>{m.hgvs}</td>
                <td className={`px-4 py-3 font-mono text-xs ${coordMono}`}>
                  {m.chrom ? `chr${m.chrom}:${m.pos} ${m.ref}>${m.alt}` : '—'}
                </td>
                <td className={`px-4 py-3 text-xs ${conseq}`}>{m.consequence}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] ${
                      m.scoredByEvo2 ? scoredChip : excludedChip
                    }`}
                  >
                    {m.scoredByEvo2 ? 'SCORED' : 'EXCLUDED'}
                  </span>
                </td>
                <td className={`px-4 py-3 text-[11px] ${noteText}`}>
                  {m.normalizationNote ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`mt-3 text-[11px] ${caption}`}>
        <MutationCaption />
        <span>
          {' '}Receipts under{' '}
          <span className="font-mono">
            synthetic_lethality.provenance.sequence_scoring.variants_sent_to_engine[]
          </span>
          .
        </span>
      </div>
    </section>
  );
}

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
    m.normalizationNote ? `${m.gene} — ${m.normalizationNote}` : m.gene,
  );
  return (
    <span>
      {parts.join('; ')}. {scored} of {total} mutations scored with receipts.
    </span>
  );
}
