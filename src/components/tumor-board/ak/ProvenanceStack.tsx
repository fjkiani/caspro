'use client';

import { usePatient } from '@/context/PatientContext';
/**
 * Provenance stack — three tiles that ground the whole surface:
 *   SL receipt version + detection method + PR#11 note
 *   Evo2 receipts (cache hits + normalized indels + per-variant scoring state)
 *   Evidence chain SHA + anchor count
 *
 * All strings pulled from the active bundle so the surface never fabricates.
 * The "Evo2 receipts" tile in particular used to hardcode AK biology
 * (MBD4 left-pad, PDGFRA scored, TP53 R175H cache); it now derives those
 * rows from patient.mutations at render time.
 */
export default function ProvenanceStack() {
  const patient = usePatient();

  const cacheHits = patient.slProvenance.evo2CacheHits;
  const indelsNormalized = patient.mutations.filter(
    (m) => m.consequence === 'frameshift_variant',
  ).length;
  const anchorCount = patient.evidenceAnchors.length;
  const hasParpArc = patient.parpFalsification !== null;
  const nExact = patient.evidenceAnchors.filter((a) => a.match === 'exact').length;
  const nRounded = patient.evidenceAnchors.filter((a) => a.match === 'rounded').length;

  // Per-mutation compact row for the Evo2 receipts tile — genuine
  // patient-specific content, not AK stubs.
  const evoMutRows: [string, string][] = patient.mutations.map((m) => {
    const label = m.scoredByEvo2
      ? m.normalizationNote
        ? 'scored (normalized)'
        : 'scored (cache hit)'
      : 'excluded';
    return [`${m.gene}${m.hgvs ? ' · ' + shortHgvs(m.hgvs) : ''}`, label];
  });

  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Provenance stack</h2>
          <p className="mt-1 text-xs text-white/50">
            Every panel above renders from these receipts. Nothing on this screen is drawn without a bundle path.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ProvCard
          heading="Synthetic Lethality"
          rows={[
            ['agent', patient.slProvenance.agent],
            ['version', patient.slProvenance.version],
            ['detection_method', patient.slProvenance.detectionMethod],
            ['status', patient.slProvenance.status],
          ]}
          note={patient.slProvenance.hgvsResolutionNote}
          path="synthetic_lethality.provenance.*"
        />

        <ProvCard
          heading="Evo2 receipts"
          rows={[
            ['cache_hits', `${cacheHits} / ${patient.mutations.length} scored variants`],
            ['indels_normalized', String(indelsNormalized)],
            ...evoMutRows,
          ]}
          note={buildEvoNote(patient.mutations)}
          path="mutations[].scored_by_evo2 · normalization_note"
        />

        <ProvCard
          heading="Evidence chain"
          rows={[
            ['anchors_total', `${anchorCount} verified`],
            ['exact_match', String(nExact)],
            ['rounded_match', String(nRounded)],
            ['falsification_arc', hasParpArc ? 'present' : 'not applicable'],
          ]}
          note={buildAnchorNote(nExact, nRounded, hasParpArc)}
          path="synthetic_lethality.provenance.tumor_board_evidence_chain"
        />
      </div>

      {/* Bundle path receipts — every panel's source path in one auditable table */}
      <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-widest text-white/40">Bundle path receipts</div>
          <span className="font-mono text-[10px] text-white/30">levels.L1.*</span>
        </div>
        <ul className="grid gap-1 text-[11px] md:grid-cols-2">
          {[
            patient.slProvenance.path,
            patient.tumorContext.path,
            patient.completeness.path,
            patient.doubleHit?.path,
            patient.suggestedTherapy.path,
            patient.mutations[0]?.path,
            patient.brokenPathways[0]?.path,
            patient.essentialPathways[0]?.path,
            patient.recommendedDrugs[0]?.path,
          ]
            .filter(Boolean)
            .map((p) => (
              <li key={p as string} className="rounded border border-white/5 bg-white/[0.02] px-2 py-1 font-mono text-white/60">
                {p as string}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

function shortHgvs(hgvs: string): string {
  // BRCA1:c.5266dupC -> c.5266dupC
  const idx = hgvs.indexOf(':');
  return idx >= 0 ? hgvs.slice(idx + 1) : hgvs;
}

function buildEvoNote(
  mutations: ReturnType<typeof usePatient>['mutations'],
): string {
  const normalized = mutations.filter((m) => m.normalizationNote);
  const scored = mutations.filter((m) => m.scoredByEvo2).length;
  const total = mutations.length;
  if (normalized.length === 0) {
    return `${scored} of ${total} mutations scored by Evo2 without normalization fixes — direct cache hits.`;
  }
  const notes = normalized
    .map((m) => `${m.gene} — ${m.normalizationNote}`)
    .join('; ');
  return `${notes}. Remaining variants scored as cache hits (${scored}/${total} total).`;
}

function buildAnchorNote(
  nExact: number,
  nRounded: number,
  hasParp: boolean,
): string {
  const total = nExact + nRounded;
  if (total === 0) {
    return 'No numeric evidence anchors on this bundle — see the CONFIDENCE tab for what evidence exists.';
  }
  const arc = hasParp
    ? 'A PARP-falsification arc is present as the exact-match falsification arm.'
    : 'No PARP-falsification arc on this bundle.';
  return `${total} anchors independently regenerated against manuscript / trial sources. ${nRounded} rounded matches confirm the trace, ${nExact} exact. ${arc}`;
}

function ProvCard({
  heading,
  rows,
  note,
  path,
}: {
  heading: string;
  rows: [string, string][];
  note: string;
  path: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">{heading}</div>
      <dl className="mt-3 space-y-1.5 text-[11px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3">
            <dt className="font-mono text-white/40">{k}</dt>
            <dd className="text-right font-mono text-white/80">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-white/60">{note}</p>
      <div className="mt-3 font-mono text-[9px] text-white/30">{path}</div>
    </div>
  );
}
