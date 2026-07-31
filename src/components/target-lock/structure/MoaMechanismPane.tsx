'use client';

/**
 * MoaMechanismPane
 * ----------------
 * Interactive 3D first (Molstar on deposited RCSB endpoints), morph/reveal
 * timeline second. Receipt-backed captions only — no invented biology.
 */

import { useState } from 'react';
import StructureViewer from '@/components/target-lock/structure/StructureViewer';
import {
  MOA_HONESTY,
  moaStructureRecord,
  type MoaMechanismEntry,
} from '@/data/moa-mechanism-manifest';

type EndpointMode = 'primary' | 'apo';

export default function MoaMechanismPane({
  entry,
  height = 360,
  isDarkMode,
}: {
  entry: MoaMechanismEntry;
  height?: number;
  isDarkMode: boolean;
}) {
  const [endpoint, setEndpoint] = useState<EndpointMode>('primary');
  const [showTimeline, setShowTimeline] = useState(false);

  const active: EndpointMode = entry.apo && endpoint === 'apo' ? 'apo' : 'primary';
  const record = moaStructureRecord(entry, active);
  const ep = active === 'apo' && entry.apo ? entry.apo : entry.primary;

  const mute = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  const border = isDarkMode ? 'border-white/10' : 'border-slate-200';
  const chipOn = isDarkMode
    ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/40'
    : 'bg-indigo-50 text-indigo-800 border-indigo-200';
  const chipOff = isDarkMode
    ? 'border-white/10 text-zinc-400'
    : 'border-slate-200 text-slate-500';

  return (
    <div className="flex flex-col gap-3">
      {/* Endpoint toggle — morph pairs only */}
      {entry.apo && (
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[9px] font-black uppercase tracking-[0.25em] ${mute}`}>
            Crystal endpoint
          </span>
          <button
            type="button"
            onClick={() => setEndpoint('apo')}
            className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
              active === 'apo' ? chipOn : chipOff
            }`}
          >
            Apo {entry.apo.pdb}
          </button>
          <button
            type="button"
            onClick={() => setEndpoint('primary')}
            className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
              active === 'primary' ? chipOn : chipOff
            }`}
          >
            Holo {entry.primary.pdb}
          </button>
        </div>
      )}

      {/* Remount key forces fresh Molstar download (no stale canvas). */}
      <StructureViewer
        key={`${entry.id}:${ep.pdb}`}
        record={record}
        height={height}
        autoRotate
      />

      <p className={`text-[12px] leading-relaxed ${body}`}>{entry.biology}</p>

      <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-widest">
        <span className={`rounded border px-2 py-0.5 ${border} ${mute}`}>
          {entry.type.replace('_', ' ')}
        </span>
        {entry.mutation && (
          <span className={`rounded border px-2 py-0.5 ${border} ${body}`}>
            {entry.mutation}
          </span>
        )}
        {entry.drug && (
          <span className={`rounded border px-2 py-0.5 ${border} ${body}`}>
            {entry.drug}
          </span>
        )}
        {entry.statCallout && (
          <span className={`rounded border px-2 py-0.5 ${border} ${mute}`}>
            {entry.statCallout}
          </span>
        )}
        {entry.motionArrow && (
          <span className={`rounded border px-2 py-0.5 ${border} ${mute}`}>
            arrow {entry.motionArrow.drawn ? 'on' : 'off'}
            {entry.motionArrow.centroidShiftA != null
              ? ` · Δc ${entry.motionArrow.centroidShiftA} Å`
              : ''}
          </span>
        )}
      </div>

      {entry.integrityGuard && (
        <div
          className={`rounded border px-3 py-2 text-[11px] leading-relaxed ${
            isDarkMode
              ? 'border-red-500/40 bg-red-500/[0.06] text-red-200'
              : 'border-red-300 bg-red-50 text-red-800'
          }`}
        >
          <span className="font-semibold uppercase tracking-widest">Integrity · </span>
          {entry.integrityGuard}
        </div>
      )}

      {entry.whyRevealNotMorph && (
        <p className={`text-[11px] leading-relaxed ${mute}`}>{entry.whyRevealNotMorph}</p>
      )}

      {entry.motionArrow?.reason && (
        <p className={`text-[11px] leading-relaxed ${mute}`}>{entry.motionArrow.reason}</p>
      )}

      <p className={`text-[10px] leading-relaxed ${mute}`}>{MOA_HONESTY}</p>

      {/* Mechanism timeline — secondary to 3D */}
      <div className={`rounded border ${border}`}>
        <button
          type="button"
          onClick={() => setShowTimeline((v) => !v)}
          className={`w-full px-3 py-2 text-left text-[10px] font-black uppercase tracking-[0.25em] ${mute}`}
        >
          {showTimeline ? 'Hide' : 'Show'} mechanism timeline (pre-rendered morph / reveal)
        </button>
        {showTimeline && (
          <div className={`border-t px-3 py-3 ${border}`}>
            <video
              key={entry.media.mp4}
              src={entry.media.mp4}
              poster={entry.media.still ?? undefined}
              controls
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full max-h-[280px] rounded bg-black object-contain"
            >
              <img src={entry.media.gif} alt="" className="w-full" />
            </video>
            <p className={`mt-2 text-[10px] ${mute}`}>
              Timeline is illustrative interpolation / camera reveal. Interactive structure above
              is the deposited crystal ({ep.pdb}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
