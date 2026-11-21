'use client';

/**
 * /tumor-board/ — open a clinical case with clear labels.
 */
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { listPatientCards } from '@/data/patients/registry';

type CasePath = {
  id: string;
  title: string;
  blurb: string;
  boardHref: string;
};

const CASE_PATHS: CasePath[] = [
  {
    id: 'lung-ct',
    title: 'Lung CT Case',
    blurb: 'Chest CT in. Rank biopsy, PET, or follow-up for the room.',
    boardHref: '/tumor-board/nsclc/',
  },
  {
    id: 'ovarian-mbd4',
    title: 'Ovarian MBD4 Case',
    blurb: 'Post-chemo biology: prioritize escape lines; block PARP on dormant disease.',
    boardHref: '/tumor-board/AK/',
  },
  {
    id: 'breast-brca1',
    title: 'Breast BRCA1 Case',
    blurb: 'After chemo, which targeted options fit — and which tests are missing.',
    boardHref: '/tumor-board/BR01/',
  },
];

const MORE_IDS = new Set(['CRC01', 'BM01']);

const MORE_LABELS: Record<string, string> = {
  CRC01: 'Colorectal KRAS Case',
  BM01: 'Brain Met Case',
};

export default function TumorBoardPicker() {
  const { isDarkMode } = useTheme();
  const more = listPatientCards().filter((c) => MORE_IDS.has(c.patientId));

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600';
  const panel = isDarkMode
    ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/40'
    : 'border-slate-200 bg-white hover:border-indigo-400';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const border = isDarkMode ? 'border-white/5' : 'border-slate-200';
  const dash = isDarkMode ? 'border-zinc-800' : 'border-slate-200';

  return (
    <div className={`flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden font-mono ${shell}`}>
      <header
        className={`shrink-0 border-b ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="flex shrink-0 items-center gap-2 group">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded border ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50'
                    : 'border-slate-200 bg-white group-hover:border-indigo-400'
                }`}
              >
                <ShieldCheck className={`h-3.5 w-3.5 ${accent}`} />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode
                    ? 'text-white group-hover:text-cyan-400'
                    : 'text-slate-900 group-hover:text-indigo-600'
                }`}
              >
                CrisPRO
              </span>
            </Link>
            <span className={`hidden h-5 w-px sm:block ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <div className="min-w-0">
              <div className={`truncate text-sm font-black uppercase tracking-[0.15em] sm:text-base ${main}`}>
                Open a case
              </div>
              <div className={`truncate text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Rank the patient · then the drug list
              </div>
            </div>
          </div>
          <Link
            href="/products/tumor-board/"
            className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Tumor Board product
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-8">
        <p className={`shrink-0 text-[13px] leading-snug ${body}`}>
          Boards open drug lists first. Pick a case — PRIORITIZE fits, BLOCK mismatches.
        </p>

        <section className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-3">
          {CASE_PATHS.map((path) => (
            <Link
              key={path.id}
              href={path.boardHref}
              className={`flex flex-col rounded border p-4 transition-colors ${panel}`}
            >
              <h2 className={`text-base font-black tracking-tight ${main}`}>{path.title}</h2>
              <p className={`mt-1.5 flex-1 text-[12px] leading-snug ${body}`}>{path.blurb}</p>
              <p className={`mt-3 text-[11px] font-black uppercase tracking-widest ${accent}`}>
                Open Case →
              </p>
            </Link>
          ))}
        </section>

        {more.length > 0 ? (
          <section className={`shrink-0 border-t border-dashed pt-4 ${dash}`}>
            <p className={`mb-2 text-[11px] font-black uppercase tracking-widest ${muted}`}>
              Additional cases
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {more.map((c) => (
                <Link
                  key={c.patientId}
                  href={`/tumor-board/${c.patientId}/`}
                  className={`rounded border p-3 transition-colors ${panel}`}
                >
                  <p className={`text-[12px] font-black leading-snug ${main}`}>
                    {MORE_LABELS[c.patientId] ?? c.displayName}
                  </p>
                  <p className={`mt-1 text-[11px] ${body}`}>{c.tumorSubtype}</p>
                  <p className={`mt-2 text-[10px] font-black uppercase tracking-widest ${accent}`}>
                    Open Case →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <footer
        className={`shrink-0 border-t ${border} ${isDarkMode ? 'bg-black/40' : 'bg-white/80'}`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest sm:px-8 ${muted}`}
        >
          <span>Case workspace · RUO</span>
          <Link
            href="/products/tumor-board/"
            className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
          >
            Product framing →
          </Link>
        </div>
      </footer>
    </div>
  );
}