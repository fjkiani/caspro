'use client';

/**
 * Compact biology chips. TabSurface uses mode broken|essential.
 * Legacy scroll surfaces pass mode="both".
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export type PathwayMode = 'broken' | 'essential' | 'both';

export default function SLPathwayGrid({ mode = 'both' }: { mode?: PathwayMode }) {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const danger = isDarkMode
    ? 'border-rose-500/30 bg-rose-500/10 text-rose-100'
    : 'border-rose-200 bg-rose-50 text-rose-900';
  const ok = isDarkMode
    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
    : 'border-emerald-200 bg-emerald-50 text-emerald-900';

  const broken = patient.brokenPathways.map((p) => ({
    id: p.pathwayId,
    label: p.pathwayId.replace(/_/g, ' '),
    meta: p.genesAffected.join(', '),
    tone: danger,
  }));
  const essential = patient.essentialPathways.map((p) => ({
    id: p.pathwayId,
    label: p.pathwayId.replace(/_/g, ' '),
    meta: p.genesAffected?.join(', ') || (p.description ? p.description.slice(0, 80) : ''),
    tone: ok,
  }));

  const Pane = ({
    title,
    blurb,
    rows,
  }: {
    title: string;
    blurb: string;
    rows: typeof broken;
  }) => (
    <section className="flex h-full min-h-0 flex-col">
      <p className={`shrink-0 text-[11px] leading-snug line-clamp-2 ${muted}`}>{blurb}</p>
      <p className={`mt-2 shrink-0 text-[10px] font-black uppercase tracking-widest ${muted}`}>{title}</p>
      <ul className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
        {rows.map((r) => (
          <li key={r.id} className={`rounded border px-2.5 py-1.5 text-[12px] ${r.tone}`}>
            <span className="font-semibold">{r.label}</span>
            {r.meta ? <span className={`ml-2 ${muted}`}>{r.meta}</span> : null}
          </li>
        ))}
        {rows.length === 0 ? <li className={`text-[12px] ${muted}`}>None on this fixture.</li> : null}
      </ul>
    </section>
  );

  if (mode === 'broken') {
    return (
      <Pane
        title="Broken pathways"
        blurb={patient.doubleHit?.description ?? 'No double-hit pattern on this fixture.'}
        rows={broken}
      />
    );
  }
  if (mode === 'essential') {
    return (
      <Pane
        title="Dependencies to lean on"
        blurb="Where the tumor must lean when primary pathways fail."
        rows={essential}
      />
    );
  }

  return (
    <div className="grid min-h-0 gap-3 md:grid-cols-2">
      <Pane
        title="Broken pathways"
        blurb={patient.doubleHit?.description ?? 'No double-hit pattern on this fixture.'}
        rows={broken}
      />
      <Pane
        title="Dependencies to lean on"
        blurb="Where the tumor must lean when primary pathways fail."
        rows={essential}
      />
    </div>
  );
}
