'use client';

/**
 * BenchCoverageCard — surfaces the honest per-tumor bench numbers for the
 * active patient. Read-only. Every field maps to a real value in
 * /mnt/results/spe_audit/w4_pancancer_grid.json.
 *
 * Design principle (from "show it all" honesty knob): if the tumor type has
 * ZERO benched archetypes, the card renders as an amber discovery-only warning.
 * If it has coverage, it shows n / top-1 / recall@3 in plain view.
 *
 * Theme-aware. Mobile-safe (px-4 md:px-8; metric grid drops to 3-col below md
 * and 4-col at md+ with the aggregate metric hidden below md).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';
import { PAN_CANCER_AGGREGATE, perTumorBench } from '@/data/patients/registry';

export default function BenchCoverageCard() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();
  const { cancerType, subtype } = patient.tumorContext;
  const bench = perTumorBench(cancerType);
  const isDiscovery = bench.n === 0 || patient.discoveryOnly === true;

  const shell   = isDarkMode
    ? 'border-b border-white/10 bg-black/30'
    : 'border-b border-zinc-200 bg-zinc-50';
  const eyebrow = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const heading = isDarkMode ? 'text-white' : 'text-zinc-900';
  const amberChip = isDarkMode
    ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
    : 'border-amber-300 bg-amber-50 text-amber-800';
  const cyanChip = isDarkMode
    ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200'
    : 'border-indigo-300 bg-indigo-50 text-indigo-800';
  const discoveryText = isDarkMode ? 'text-amber-200/90' : 'text-amber-800';

  const metricWrap = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-white';
  const metricLabel = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const metricValue = isDarkMode ? 'text-white' : 'text-zinc-900';
  const metricSub   = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const path        = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const ovarianWarn = isDarkMode ? 'text-amber-300/80' : 'text-amber-800';

  return (
    <section className={`py-6 ${shell}`}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-4 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.24em] ${eyebrow}`}>
              Pan-cancer bench coverage · calibration, not marketing
            </p>
            <h3 className={`mt-1 text-base font-semibold ${heading}`}>
              How well does the CrisPRO backend cover {cancerTypeLabel(cancerType)}?
            </h3>
          </div>
          {isDiscovery ? (
            <span
              className={`rounded border px-2 py-1 text-[10px] uppercase tracking-widest ${amberChip}`}
            >
              discovery only
            </span>
          ) : (
            <span
              className={`rounded border px-2 py-1 text-[10px] uppercase tracking-widest ${cyanChip}`}
            >
              {bench.n} archetypes tested
            </span>
          )}
        </div>

        {isDiscovery ? (
          <p className={`text-sm ${discoveryText}`}>
            Zero archetypes were benched for{' '}
            <span className="font-mono">{cancerType}</span> in the v1 pan-cancer sweep.
            Recommendations for this patient rest on the published pivotal trials cited
            in the evidence anchors — not on the CrisPRO backend having demonstrated
            recall for this tumor type. Read the recommendations as hypothesis, not
            benchmark output.
          </p>
        ) : (
          <div
            className={`grid grid-cols-3 gap-4 rounded-lg border p-4 md:grid-cols-4 md:gap-6 ${metricWrap}`}
          >
            <div>
              <p className={`text-[10px] uppercase tracking-widest ${metricLabel}`}>
                Archetypes benched
              </p>
              <p className={`mt-1 font-mono text-lg ${metricValue}`}>{bench.n}</p>
              <p className={`text-[10px] ${metricSub}`}>on {cancerTypeLabel(cancerType)}</p>
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-widest ${metricLabel}`}>
                Top-1 hit rate
              </p>
              <p className={`mt-1 font-mono text-lg ${metricValue}`}>
                {(bench.top1 * 100).toFixed(1)}%
              </p>
              <p className={`text-[10px] ${metricSub}`}>predicted #1 = expected leader</p>
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-widest ${metricLabel}`}>
                Recall @ 3
              </p>
              <p className={`mt-1 font-mono text-lg ${metricValue}`}>
                {(bench.recallAt3 * 100).toFixed(1)}%
              </p>
              <p className={`text-[10px] ${metricSub}`}>expected leader in top-3</p>
            </div>
            <div className="hidden md:block">
              <p className={`text-[10px] uppercase tracking-widest ${metricLabel}`}>
                Pan-cancer aggregate
              </p>
              <p className={`mt-1 font-mono text-sm ${metricValue}`}>
                n={PAN_CANCER_AGGREGATE.nArchetypes} · top-1{' '}
                {(PAN_CANCER_AGGREGATE.top1 * 100).toFixed(1)}% · r@3{' '}
                {(PAN_CANCER_AGGREGATE.recallAt3 * 100).toFixed(1)}%
              </p>
              <p className={`text-[10px] ${metricSub}`}>
                across {PAN_CANCER_AGGREGATE.nWithExpected}/
                {PAN_CANCER_AGGREGATE.nArchetypes} archetypes with expected leaders
              </p>
            </div>
          </div>
        )}

        {cancerType === 'ovarian_cancer' && !isDiscovery ? (
          <p className={`text-[11px] ${ovarianWarn}`}>
            ⚠ Known ovarian issue in current bench: carboplatin and olaparib share
            identical <span className="font-mono">pathway_weights</span> in the scorer,
            so the two rank equal for HRD substrates. Fix pending in backend PR —
            sub-select on manuscript_claim_type in the meantime.
          </p>
        ) : null}

        <p className={`font-mono text-[10px] ${path}`}>
          Substrate: {PAN_CANCER_AGGREGATE.source} · patient: {patient.meta.patientId} ·
          tumor: {subtype ?? cancerType}
        </p>
      </div>
    </section>
  );
}

function cancerTypeLabel(cancerType: string): string {
  const map: Record<string, string> = {
    ovarian_cancer: 'ovarian cancer',
    breast_cancer: 'breast cancer',
    colorectal_cancer: 'colorectal cancer',
    brain_metastasis: 'brain metastasis',
    prostate_cancer: 'prostate cancer',
    melanoma: 'melanoma',
    multiple_myeloma: 'multiple myeloma',
    glioblastoma: 'glioblastoma',
  };
  return map[cancerType] ?? cancerType;
}
