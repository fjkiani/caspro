'use client';

import {
  CRISPRO_ML_V1_METERS,
  TB_TAB_TO_ML_STAGE,
  crisproMlStageById,
  crisproMlWeightsForStage,
  type CrisproMlStageId,
} from '@/data/pages/tumor-board/crispro-ml-v1';
import type { TbProductTab } from '@/data/pages/tumor-board-workspace-data';
import type { TbProductChrome } from './useTbProductChrome';

function metersForTab(tab: TbProductTab) {
  const stageKey = TB_TAB_TO_ML_STAGE[tab];
  if (stageKey === 'stage2_decoders') {
    return CRISPRO_ML_V1_METERS.filter((m) =>
      ['8d_hr_concordance', 'mm_tier3_spe_ttp'].includes(m.id),
    );
  }
  if (stageKey === 'stage3_escape') {
    return CRISPRO_ML_V1_METERS.filter((m) =>
      ['pillar_e_door2_menu', 'ovarian_validator'].includes(m.id),
    );
  }
  if (stageKey === 'stage1_encoders') {
    return CRISPRO_ML_V1_METERS.filter((m) => m.id === '8d_hr_concordance');
  }
  return [];
}

export function TumorBoardProductMlStagePanel({
  chrome,
  tab,
  metaBullets,
  metaBody,
}: {
  chrome: TbProductChrome;
  tab: TbProductTab;
  metaBullets?: string[];
  metaBody: string[];
}) {
  const stageKey = TB_TAB_TO_ML_STAGE[tab];
  const stage =
    stageKey === 'ways_in' || stageKey === 'start'
      ? null
      : crisproMlStageById(stageKey as CrisproMlStageId);
  const weights = stage ? crisproMlWeightsForStage(stage.id) : [];
  const meters = metersForTab(tab);

  return (
    <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
      {metaBody.map((p) => (
        <p key={p.slice(0, 48)} className={`text-[13px] leading-snug ${chrome.body}`}>
          {p}
        </p>
      ))}
      {(metaBullets ?? stage?.bullets)?.length ? (
        <ul className={`mt-3 space-y-1.5 text-[12px] leading-snug ${chrome.body}`}>
          {(metaBullets ?? stage?.bullets ?? []).map((b) => (
            <li key={b} className="flex gap-2">
              <span className={chrome.accent}>·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {stage ? (
        <div className="mt-4 grid shrink-0 gap-2 sm:grid-cols-2">
          <StageOutputsCard chrome={chrome} title="What the room gets" items={stage.outputs} />
          <div className={`rounded border p-2.5 ${chrome.meterCard}`}>
            <p className={`text-[9px] font-black uppercase tracking-widest ${chrome.muted}`}>
              Frozen model ledger
            </p>
            <ul className={`mt-2 space-y-1.5 text-[11px] ${chrome.body}`}>
              {weights.map((w) => (
                <li key={w.id}>
                  <span className={`font-semibold ${chrome.main}`}>{w.label}</span>
                  <span className={chrome.muted}> — {w.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {meters.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {meters.map((m) => (
            <div
              key={m.id}
              className={`inline-flex max-w-full flex-col rounded border px-2.5 py-1.5 ${chrome.meterCard}`}
              title={m.sourcePath}
            >
              <p className={`text-[8px] font-black uppercase tracking-widest ${chrome.muted}`}>
                {m.label}
              </p>
              <p className={`font-mono text-sm font-bold ${chrome.main}`}>
                {m.value}
                {m.detail ? (
                  <span className={`ml-1.5 text-[9px] font-normal ${chrome.muted}`}>· {m.detail}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'proof' ? (
        <p className={`mt-3 text-[11px] leading-snug ${chrome.muted}`}>
          Clinical Proof tab holds receipt-backed cohort lines. Public ledger for trial failures.
        </p>
      ) : null}
    </div>
  );
}

function StageOutputsCard({
  chrome,
  title,
  items,
}: {
  chrome: TbProductChrome;
  title: string;
  items: string[];
}) {
  return (
    <div className={`rounded border p-2.5 ${chrome.meterCard}`}>
      <p className={`text-[9px] font-black uppercase tracking-widest ${chrome.muted}`}>{title}</p>
      <ol className={`mt-2 space-y-1 text-[11px] ${chrome.body}`}>
        {items.map((s, i) => (
          <li key={s} className="flex gap-2">
            <span className={`font-black ${chrome.accent}`}>{String(i + 1).padStart(2, '0')}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}