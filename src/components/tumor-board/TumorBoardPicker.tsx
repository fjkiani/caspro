'use client';

/**
 * /tumor-board/ — open a case via three doors into one board grammar.
 * Case → Options → Gaps. No fake Ready / Pipeline-run chrome.
 */
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { listPatientCards } from '@/data/patients/registry';
import { getL5Case } from '@/data/tumor-board/l5-case-registry';

type Door = {
  id: string;
  title: string;
  blurb: string;
  /** Primary walk — board when wired; otherwise honest receipts path. */
  boardHref: string;
  boardCta: string;
  receiptsHref?: string;
  badge: string;
};

const DOORS: Door[] = [
  {
    id: 'a-ct',
    title: 'Lung cancer · CT scan',
    blurb:
      'Chest CT in → ranked workup out. Same Case → Options → Gaps walk as molecular.',
    boardHref: '/tumor-board/nsclc/',
    boardCta: 'Open board walk',
    receiptsHref: '/tumor-board/receipts/nsclc_luna16/',
    badge: 'RUO · door A',
  },
  {
    id: 'b-molecular',
    title: 'Ovarian · MBD4 loss',
    blurb: 'Molecular profile in → Case → Options → Gaps. Manuscript-locked twin has receipts.',
    boardHref: '/tumor-board/AK/',
    boardCta: 'Open board walk',
    receiptsHref: getL5Case('ak_mbd4_lof')?.href,
    badge: 'RUO · door B',
  },
  {
    id: 'c-breast',
    title: 'Triple-negative breast · BRCA1',
    blurb:
      'After chemo, which targeted options still fit — and what tests are still missing.',
    boardHref: '/tumor-board/BR01/',
    boardCta: 'Open board walk',
    badge: 'RUO · door C',
  },
];

const MORE_IDS = new Set(['CRC01', 'BM01']);

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
  const badgeNeutral = isDarkMode
    ? 'border-zinc-700 bg-zinc-900 text-zinc-300'
    : 'border-slate-300 bg-slate-100 text-slate-700';

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
                Same board · CT · molecular · breast path · RUO
              </div>
            </div>
          </div>
          <Link
            href="/products/tumor-board/"
            className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            What Tumor Board is
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-8">
        <p className={`shrink-0 text-[13px] leading-snug ${body}`}>
          Same Case → Options → Gaps walk whether you start from a chest CT, a molecular bundle, or a
          breast pathology profile.
        </p>

        <section className="grid shrink-0 grid-cols-1 gap-3 lg:grid-cols-3">
          {DOORS.map((door) => (
            <div key={door.id} className={`flex flex-col rounded border p-4 transition-colors ${panel}`}>
              <Link href={door.boardHref} className="group flex min-w-0 flex-1 flex-col">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
                    Way in
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${badgeNeutral}`}
                  >
                    {door.badge}
                  </span>
                </div>
                <h2
                  className={`mt-2 text-base font-black tracking-tight ${main} ${
                    isDarkMode ? 'group-hover:text-cyan-300' : 'group-hover:text-indigo-700'
                  }`}
                >
                  {door.title}
                </h2>
                <p className={`mt-1.5 flex-1 text-[12px] leading-snug ${body}`}>{door.blurb}</p>
                <p className={`mt-3 text-[11px] font-black uppercase tracking-widest ${accent}`}>
                  {door.boardCta}
                  <ArrowRight className="ml-1 inline h-3 w-3" />
                </p>
              </Link>
              {door.receiptsHref && door.receiptsHref !== door.boardHref ? (
                <Link
                  href={door.receiptsHref}
                  className={`mt-2 border-t border-dashed pt-2 text-[10px] font-black uppercase tracking-widest ${accent} ${dash}`}
                >
                  Receipts →
                </Link>
              ) : null}
            </div>
          ))}
        </section>

        {more.length > 0 ? (
          <section className={`shrink-0 border-t border-dashed pt-4 ${dash}`}>
            <p className={`mb-2 text-[11px] font-black uppercase tracking-widest ${muted}`}>
              More fixtures · early look
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {more.map((c) => (
                <Link
                  key={c.patientId}
                  href={`/tumor-board/${c.patientId}/`}
                  className={`rounded border p-3 transition-colors ${panel}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>
                      {c.patientId}
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 text-[9px] uppercase tracking-widest ${
                        isDarkMode
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                          : 'border-amber-300 bg-amber-50 text-amber-800'
                      }`}
                    >
                      Early look
                    </span>
                  </div>
                  <p className={`mt-1 text-[12px] font-black leading-snug ${main}`}>{c.displayName}</p>
                  <p className={`mt-1 text-[11px] ${body}`}>{c.tumorSubtype}</p>
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
          <span>Research case workspace · RUO · not a prescription</span>
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
