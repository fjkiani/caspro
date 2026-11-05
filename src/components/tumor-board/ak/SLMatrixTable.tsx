'use client';

/**
 * Options axes — mode support|ruleOut for tabs; both for legacy surfaces.
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';
import type { SLAxisRow } from '@/data/tumor-board/patient-bundle-types';

function axisLabel(axis: string): string {
  const map: Record<string, string> = {
    cytidine_analogs: 'Cytidine analogs',
    atr_wee1: 'ATR / WEE1 (replication stress)',
    parp_inhibitors: 'PARP inhibitors',
    immunotherapy: 'Immunotherapy',
    pkmyt1: 'PKMYT1',
    wrn: 'WRN',
    her2_targeting: 'HER2-targeted (CNS-capable)',
    her2_adc: 'HER2 antibody–drug conjugate',
    pi3k_axis: 'PI3K pathway',
  };
  return map[axis] ?? axis.replace(/_/g, ' ');
}

function isSupported(row: SLAxisRow): boolean {
  const t = (row.prodTier || '').toLowerCase();
  if (t.includes('not supported') || t.includes('negative')) return false;
  if (row.manuscriptClaimType === 'falsified_mechanism') return false;
  return true;
}

export type MatrixMode = 'support' | 'ruleOut' | 'both';

export default function SLMatrixTable({ mode = 'both' }: { mode?: MatrixMode }) {
  const patient = usePatient();
  const { isDarkMode } = useTheme();
  const rows = patient.slMatrix;

  const heading = isDarkMode ? 'text-white' : 'text-zinc-900';
  const muted = isDarkMode ? 'text-white/45' : 'text-zinc-500';
  const ok = isDarkMode ? 'text-emerald-300' : 'text-emerald-800';
  const skip = isDarkMode ? 'text-rose-300' : 'text-rose-800';

  const support = rows.filter(isSupported);
  const ruleOut = rows.filter((r) => !isSupported(r));

  const List = ({
    title,
    titleCls,
    list,
    empty,
  }: {
    title: string;
    titleCls: string;
    list: SLAxisRow[];
    empty: string;
  }) => (
    <section className="flex h-full min-h-0 flex-col">
      <p className={`shrink-0 text-[10px] font-black uppercase tracking-widest ${titleCls}`}>{title}</p>
      <ul className="mt-2 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {list.map((row) => (
          <li key={row.axis}>
            <p className={`text-sm font-semibold ${heading}`}>{axisLabel(row.axis)}</p>
            <p className={`mt-0.5 text-[11px] line-clamp-1 ${muted}`}>{row.prodTier}</p>
          </li>
        ))}
        {list.length === 0 ? <li className={`text-[12px] ${muted}`}>{empty}</li> : null}
      </ul>
    </section>
  );

  if (mode === 'support') {
    return (
      <List
        title="Worth discussing"
        titleCls={ok}
        list={support}
        empty="No supported axes on this fixture."
      />
    );
  }
  if (mode === 'ruleOut') {
    return (
      <List title="Rule out" titleCls={skip} list={ruleOut} empty="No explicit rule-outs on this fixture." />
    );
  }

  return (
    <div className="grid min-h-0 gap-4 md:grid-cols-2">
      <List
        title="Worth discussing"
        titleCls={ok}
        list={support}
        empty="No supported axes on this fixture."
      />
      <List title="Rule out" titleCls={skip} list={ruleOut} empty="No explicit rule-outs on this fixture." />
    </div>
  );
}
