'use client';

/**
 * /demo — chooser page.
 *
 * Three cards routing to /demo/patient, /demo/pharma, /demo/tumor-board.
 * Layout matches the manuscript / SL page idiom: max-w-[1600px] container,
 * grid background, sticky-lite header, three-column card row.
 *
 * Data source: src/data/demos/demo_index.json (verbatim, no re-shaping).
 */

import Link from 'next/link';
import { ListTree, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { loadDemoIndex, loadPatientDemo, loadPharmaDemo, loadTumorBoardDemo } from '@/data/demos/loader';
import DemoChooserCard from '@/components/demos/DemoChooserCard';
import { UI_LABELS } from '@/components/demos/labels';

export default function DemoChooserPage() {
  const { isDarkMode } = useTheme();
  const index = loadDemoIndex();
  const patient = loadPatientDemo();
  const pharma = loadPharmaDemo();
  const tumorBoard = loadTumorBoardDemo();

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-sm ${
          isDarkMode ? 'border-white/5 bg-black/60' : 'border-zinc-200 bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded border ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
              }`}
            >
              <ListTree
                className={isDarkMode ? 'h-4 w-4 text-cyan-400' : 'h-4 w-4 text-indigo-500'}
              />
            </div>
            <span
              className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {UI_LABELS.brand_chip}
            </span>
          </div>
          <Link
            href="/"
            className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
              isDarkMode
                ? 'text-zinc-400 hover:text-cyan-400'
                : 'text-zinc-600 hover:text-indigo-600'
            }`}
          >
            {UI_LABELS.brand_back_home}
          </Link>
        </div>
      </header>

      {/* Title strip */}
      <div
        className={`mx-auto max-w-[1600px] border-b px-6 py-10 ${
          isDarkMode ? 'border-white/5' : 'border-zinc-200'
        }`}
      >
        <p
          className={`mb-3 text-[10px] font-black uppercase tracking-[0.4em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.demos_eyebrow}
        </p>
        <h1
          className={`mb-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-4xl ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {UI_LABELS.demos_title}
        </h1>
        <p
          className={`max-w-3xl text-[14px] leading-relaxed ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          {UI_LABELS.demos_subtitle}
        </p>
        <p
          className={`mt-5 inline-flex items-center rounded border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
            isDarkMode
              ? 'border-fuchsia-500/40 bg-fuchsia-950/30 text-fuchsia-300'
              : 'border-fuchsia-500/40 bg-fuchsia-50 text-fuchsia-700'
          }`}
        >
          governance · {index.governance_mode}
        </p>
      </div>

      {/* Chooser cards */}
      <main className="mx-auto max-w-[1600px] px-6 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DemoChooserCard
            href="/demo/patient"
            eyebrow={UI_LABELS.chooser_eyebrow_patient}
            title={patient.title}
            subtitle={patient.subtitle}
            stageCount={patient.stages.length}
          />
          <DemoChooserCard
            href="/demo/pharma"
            eyebrow={UI_LABELS.chooser_eyebrow_pharma}
            title={pharma.title}
            subtitle={pharma.subtitle}
            stageCount={pharma.stages.length}
          />
          <DemoChooserCard
            href="/demo/tumor-board"
            eyebrow={UI_LABELS.chooser_eyebrow_tumor_board}
            title={tumorBoard.title}
            subtitle={tumorBoard.subtitle}
            stageCount={tumorBoard.stages.length}
          />
        </div>
      </main>

      {/* Cross-link footer */}
      <footer className={`border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-6 py-8 md:grid-cols-3">
          <Link
            href="/insilico"
            className={`group rounded border p-4 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50'
                : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
            }`}
          >
            <p
              className={`mb-1 text-[10px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {UI_LABELS.chooser_footer_insilico}
            </p>
            <ChevronRight
              className={`mt-3 h-4 w-4 ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
              aria-hidden
            />
          </Link>
          <Link
            href="/engine/synthetic-lethality/tabs"
            className={`group rounded border p-4 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50'
                : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
            }`}
          >
            <p
              className={`mb-1 text-[10px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {UI_LABELS.chooser_footer_sl}
            </p>
            <ChevronRight
              className={`mt-3 h-4 w-4 ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
              aria-hidden
            />
          </Link>
          <Link
            href="/tumor-board"
            className={`group rounded border p-4 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50'
                : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
            }`}
          >
            <p
              className={`mb-1 text-[10px] font-black uppercase tracking-[0.3em] ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {UI_LABELS.chooser_footer_tumor_board}
            </p>
            <ChevronRight
              className={`mt-3 h-4 w-4 ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
              aria-hidden
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}
