'use client';

/**
 * 6 verified numeric anchors from the tumor_board_evidence_chain.json
 * (SHA d33f6403). Each row shows canonical p/d/n from the source JSON, the
 * script-rounded value the UI ships, and whether the two match.
 *
 * Theme-aware. Mobile-safe (px-4 → md:px-8, table already overflow-x-auto).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function EvidenceAnchorTable() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const heading  = isDarkMode ? 'text-white' : 'text-zinc-900';
  const sub      = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const pathTag  = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const wrap     = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-white';
  const thead    = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const rowBd    = isDarkMode ? 'border-white/5' : 'border-zinc-100';
  const idxMono  = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const anchorHi = isDarkMode ? 'text-white/85' : 'text-zinc-900';
  const anchorSub= isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const anchorPath = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const monoValue = isDarkMode ? 'text-white/70' : 'text-zinc-700';

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${heading}`}>
            Evidence chain · numeric anchors
          </h2>
          <p className={`mt-1 text-xs ${sub}`}>
            <AnchorSubtitle />
          </p>
        </div>
        <span className={`font-mono text-[10px] ${pathTag}`}>
          synthetic_lethality.provenance.tumor_board_evidence_chain.anchors[]
        </span>
      </div>

      <div className={`overflow-x-auto rounded-lg border ${wrap}`}>
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className={`text-left text-[10px] uppercase tracking-widest ${thead}`}>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Anchor</th>
              <th className="px-4 py-3">Canonical (JSON)</th>
              <th className="px-4 py-3">Script (UI)</th>
              <th className="px-4 py-3">Match</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {patient.evidenceAnchors.map((a, i) => (
              <tr key={i} className={`border-t ${rowBd} align-top`}>
                <td className={`px-4 py-3 font-mono text-xs ${idxMono}`}>{i + 1}</td>
                <td className="px-4 py-3">
                  <div className={anchorHi}>{keyLabel(a.claim)}</div>
                  <div className={`mt-1 text-[11px] ${anchorSub}`}>{a.claim}</div>
                  <div className={`mt-1 font-mono text-[9px] ${anchorPath}`}>
                    {a.canonicalPath}
                  </div>
                </td>
                <td className={`px-4 py-3 font-mono text-[11px] ${monoValue}`}>
                  {a.canonicalValue}
                </td>
                <td className={`px-4 py-3 font-mono text-[11px] ${monoValue}`}>
                  {a.scriptValue}
                </td>
                <td className="px-4 py-3">
                  <MatchBadge match={a.match} isDarkMode={isDarkMode} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function keyLabel(claim: string): string {
  if (/^Primary screen/.test(claim)) return 'Primary ceralasertib LN_IC50';
  if (/^TP53-mut stratification, LN_IC50/.test(claim)) return 'TP53-stratified LN_IC50';
  if (/^TP53-mut stratification, AUC/.test(claim)) return 'TP53-stratified AUC';
  if (/^MSI-purge/.test(claim)) return 'MSI-purge LN_IC50';
  if (/PARP1 expression in MBD4-LOF/.test(claim)) return 'PARP1 in MBD4-LOF';
  if (/Pan-cancer PARP1/.test(claim)) return 'Pan-cancer PARP1↔PARPi';
  return claim;
}

function MatchBadge({
  match,
  isDarkMode,
}: {
  match: 'exact' | 'rounded' | 'positive_control';
  isDarkMode: boolean;
}) {
  const styles = isDarkMode
    ? {
        exact: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
        rounded: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200',
        positive_control: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
      }
    : {
        exact: 'border-emerald-300 bg-emerald-50 text-emerald-800',
        rounded: 'border-indigo-300 bg-indigo-50 text-indigo-800',
        positive_control: 'border-amber-300 bg-amber-50 text-amber-800',
      };
  const label = {
    exact: '✓ exact',
    rounded: '✓ rounded',
    positive_control: '✓ positive control',
  }[match];
  return (
    <span
      className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${styles[match]}`}
    >
      {label}
    </span>
  );
}

function AnchorSubtitle() {
  const patient = usePatient();
  const anchors = patient.evidenceAnchors;
  const total = anchors.length;
  if (total === 0) {
    return (
      <span>
        This bundle carries no numeric anchors — recommendations rest on published trial
        sources cited on the{' '}
        <span className="font-mono">RecommendedDrugsPanel</span> below, not on independent
        value regeneration.
      </span>
    );
  }
  const exact = anchors.filter((a) => a.match === 'exact').length;
  const rounded = anchors.filter((a) => a.match === 'rounded').length;
  const positive = anchors.filter((a) => a.match === 'positive_control').length;
  const parts: string[] = [];
  if (rounded > 0) parts.push(`${rounded} rounded match${rounded === 1 ? '' : 'es'}`);
  if (exact > 0) parts.push(`${exact} exact match${exact === 1 ? '' : 'es'}`);
  if (positive > 0) parts.push(`${positive} positive control${positive === 1 ? '' : 's'}`);
  return (
    <span>
      {total} anchor{total === 1 ? '' : 's'} verified against manuscript / trial sources —{' '}
      {parts.join(', ')}.
    </span>
  );
}
