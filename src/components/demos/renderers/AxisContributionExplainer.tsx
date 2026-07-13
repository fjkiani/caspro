'use client';

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { AxisContribution } from '@/data/demos/types';

/**
 * AxisContributionExplainer — Stage 5 pharma demo.
 *
 * explanation blurb + crossover_point highlighted callout + pathway_comparison
 * table (drug → dominant pathway) + optional receipt figure. Standard
 * "explainer + callout + table" pattern with a receipt-figure tail.
 */
export default function AxisContributionExplainer({ data }: { data: AxisContribution }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <section
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.explanation_label}
        </p>
        <p className={`text-[13px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {data.explanation}
        </p>
      </section>

      <section
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-fuchsia-500/30 bg-fuchsia-950/20'
            : 'border-fuchsia-500/30 bg-fuchsia-50'
        }`}
      >
        <p
          className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-700'
          }`}
        >
          {UI_LABELS.crossover_point_label}
        </p>
        <p
          className={`text-[13px] leading-relaxed ${
            isDarkMode ? 'text-fuchsia-100' : 'text-fuchsia-900'
          }`}
        >
          {data.crossover_point}
        </p>
      </section>

      <section>
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.pathway_comparison_label}
        </p>
        <div
          className={`overflow-hidden rounded border ${
            isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
          }`}
        >
          {Object.entries(data.pathway_comparison).map(([drug, pathway], i) => (
            <div
              key={drug}
              className={`grid gap-3 p-4 md:grid-cols-[minmax(0,180px)_1fr] ${
                i > 0 ? (isDarkMode ? 'border-t border-zinc-800' : 'border-t border-zinc-200') : ''
              } ${isDarkMode ? 'bg-zinc-950/40' : 'bg-white'}`}
            >
              <div>
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
                  }`}
                >
                  {UI_LABELS.drug_label}
                </p>
                <p
                  className={`mt-1 text-[13px] font-black ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {drug}
                </p>
              </div>
              <div>
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                  }`}
                >
                  {UI_LABELS.primary_pathway_label}
                </p>
                <p
                  className={`mt-1 text-[12px] leading-relaxed ${
                    isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  {pathway}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {data.figure_asset ? (
        <section>
          <p
            className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {UI_LABELS.figure_label}
          </p>
          <figure
            className={`rounded border ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
            }`}
          >
            <Image
              src={data.figure_asset}
              alt={data.figure_caption ?? UI_LABELS.figure_label}
              width={1200}
              height={800}
              className="h-auto w-full rounded-t"
            />
            {data.figure_caption ? (
              <figcaption
                className={`px-4 py-3 text-[12px] leading-relaxed ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {data.figure_caption}
              </figcaption>
            ) : null}
          </figure>
        </section>
      ) : null}
    </div>
  );
}
