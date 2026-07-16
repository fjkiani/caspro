'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from './labels';

/**
 * DemoChooserCard — one card on the /demo/ chooser page.
 *
 * Card styling matches the tumor-board KPI cards + SL footer cross-links:
 *   bg-zinc-950/60 + border-zinc-800 (dark), white + border-zinc-200 (light)
 *   micro-eyebrow, title, subtitle, stage-count badge, chevron affordance.
 */
export default function DemoChooserCard({
  href,
  eyebrow,
  title,
  subtitle,
  stageCount,
}: {
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  stageCount: number;
}) {
  const { isDarkMode } = useTheme();

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col justify-between rounded border p-6 transition-colors ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-950/60 hover:border-cyan-500/50'
          : 'border-zinc-200 bg-white hover:border-indigo-500/50'
      }`}
    >
      <div>
        <p
          className={`mb-3 text-[10px] font-black uppercase tracking-[0.4em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mb-3 text-xl font-black uppercase leading-tight tracking-tight ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-[13px] leading-relaxed ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-700'
          }`}
        >
          {subtitle}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded border px-2 py-1 text-[10px] font-black uppercase tracking-widest ${
            isDarkMode
              ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
              : 'border-indigo-500/40 bg-indigo-50 text-indigo-700'
          }`}
        >
          {stageCount} {UI_LABELS.stages_count}
        </span>
        <span
          className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
            isDarkMode
              ? 'text-zinc-500 group-hover:text-cyan-400'
              : 'text-zinc-500 group-hover:text-indigo-600'
          }`}
        >
          {UI_LABELS.read_the_demo}
          <ChevronRight className="h-3 w-3" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
