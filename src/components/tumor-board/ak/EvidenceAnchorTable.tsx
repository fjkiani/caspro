'use client';

import { AK_EVIDENCE_ANCHORS } from '@/data/tumor-board/ak-l1-bundle';

/**
 * 6 verified numeric anchors from the tumor_board_evidence_chain.json
 * (SHA d33f6403). Each row shows canonical p/d/n from the source JSON, the
 * script-rounded value the UI ships, and whether the two match.
 */
export default function EvidenceAnchorTable() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Evidence chain · numeric anchors</h2>
          <p className="mt-1 text-xs text-white/50">
            Six anchors verified against the manuscript. Five rounded matches confirm the trace, and one exact match{' '}
            (<span className="font-mono">PARP1 in MBD4-LOF</span>) is the falsification arm.
          </p>
        </div>
        <span className="font-mono text-[10px] text-white/30">
          synthetic_lethality.provenance.tumor_board_evidence_chain.anchors[]
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02]">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-white/40">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Anchor</th>
              <th className="px-4 py-3">Canonical (JSON)</th>
              <th className="px-4 py-3">Script (UI)</th>
              <th className="px-4 py-3">Match</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {AK_EVIDENCE_ANCHORS.map((a, i) => {
              // QA-friendly key labels — surface both the manuscript pattern
              // ("Primary ceralasertib", "TP53-stratified LN_IC50", "TP53-stratified AUC",
              // "MSI-purge LN_IC50", "PARP1 in MBD4-LOF", "Pan-cancer PARP1↔PARPi")
              // plus the bundle's own `claim` string.
              return (
                <tr key={i} className="border-t border-white/5 align-top">
                  <td className="px-4 py-3 font-mono text-xs text-white/40">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="text-white/85">{keyLabel(a.claim)}</div>
                    <div className="mt-1 text-[11px] text-white/50">{a.claim}</div>
                    <div className="mt-1 font-mono text-[9px] text-white/30">{a.canonicalPath}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-white/70">{a.canonicalValue}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-white/70">{a.scriptValue}</td>
                  <td className="px-4 py-3">
                    <MatchBadge match={a.match} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// Deterministic short label so QA assertions can search for canonical phrases
// while the row also carries the bundle's own claim string.
function keyLabel(claim: string): string {
  if (/^Primary screen/.test(claim)) return 'Primary ceralasertib LN_IC50';
  if (/^TP53-mut stratification, LN_IC50/.test(claim)) return 'TP53-stratified LN_IC50';
  if (/^TP53-mut stratification, AUC/.test(claim)) return 'TP53-stratified AUC';
  if (/^MSI-purge/.test(claim)) return 'MSI-purge LN_IC50';
  if (/PARP1 expression in MBD4-LOF/.test(claim)) return 'PARP1 in MBD4-LOF';
  if (/Pan-cancer PARP1/.test(claim)) return 'Pan-cancer PARP1↔PARPi';
  return claim;
}

function MatchBadge({ match }: { match: 'exact' | 'rounded' | 'positive_control' }) {
  if (match === 'exact')
    return (
      <span className="rounded border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-emerald-200">
        ✓ exact
      </span>
    );
  if (match === 'rounded')
    return (
      <span className="rounded border border-cyan-400/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cyan-200">
        ✓ rounded
      </span>
    );
  return (
    <span className="rounded border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-200">
      ✓ positive control
    </span>
  );
}
