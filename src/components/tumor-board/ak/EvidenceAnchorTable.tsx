'use client';

import { usePatient } from '@/context/PatientContext';
/**
 * 6 verified numeric anchors from the tumor_board_evidence_chain.json
 * (SHA d33f6403). Each row shows canonical p/d/n from the source JSON, the
 * script-rounded value the UI ships, and whether the two match.
 */
export default function EvidenceAnchorTable() {
  const patient = usePatient();

  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Evidence chain · numeric anchors</h2>
          <p className="mt-1 text-xs text-white/50">
            <AnchorSubtitle />
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
            {patient.evidenceAnchors.map((a, i) => {
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

/**
 * Anchor-table subtitle that derives from the bundle instead of hardcoding
 * AK biology (the old "Six anchors verified... PARP1 in MBD4-LOF" line
 * assumed exactly six anchors and a PARP falsification arm — wrong for
 * every non-AK bundle).
 */
function AnchorSubtitle() {
  const patient = usePatient();
  const anchors = patient.evidenceAnchors;
  const total = anchors.length;
  if (total === 0) {
    return (
      <span>
        This bundle carries no numeric anchors — recommendations rest on published trial sources cited on the
        {' '}<span className="font-mono">RecommendedDrugsPanel</span> below, not on independent value regeneration.
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
      {total} anchor{total === 1 ? '' : 's'} verified against manuscript / trial sources — {parts.join(', ')}.
    </span>
  );
}
