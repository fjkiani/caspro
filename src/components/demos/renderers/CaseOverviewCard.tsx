'use client';

import { useTheme } from '@/context/ThemeContext';
import { UI_LABELS } from '../labels';
import type { CaseOverview } from '@/data/demos/types';

/**
 * CaseOverviewCard — Stage 1 tumor board demo.
 *
 * Two panels:
 *   Left  — patient_summary (age, sex, diagnosis, stage, prior_treatment,
 *           disease_burden, key_biomarkers dict, germline, missing_data list)
 *   Right — run_metadata (analysis_levels_available list, current_level,
 *           efficacy_mode)
 */
export default function CaseOverviewCard({ data }: { data: CaseOverview }) {
  const { isDarkMode } = useTheme();
  const p = data.patient_summary;
  const m = data.run_metadata;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
      {/* Patient summary */}
      <article
        className={`rounded border p-5 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Field label={UI_LABELS.age_label} value={String(p.age)} isDark={isDarkMode} />
          <Field label={UI_LABELS.sex_label} value={p.sex} isDark={isDarkMode} />
          <Field label={UI_LABELS.stage_label} value={p.stage} isDark={isDarkMode} />
        </div>
        <div className="mt-4 space-y-4">
          <Block label={UI_LABELS.diagnosis_label} value={p.diagnosis} isDark={isDarkMode} />
          <Block
            label={UI_LABELS.prior_treatment_label}
            value={p.prior_treatment}
            isDark={isDarkMode}
          />
          <Block
            label={UI_LABELS.disease_burden_label}
            value={p.disease_burden}
            isDark={isDarkMode}
          />
          <Block label={UI_LABELS.germline_label} value={p.germline} isDark={isDarkMode} />
        </div>

        {/* Key biomarkers */}
        <div className="mt-5">
          <p
            className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {UI_LABELS.key_biomarkers_label}
          </p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {Object.entries(p.key_biomarkers).map(([k, v]) => (
              <div
                key={k}
                className={`flex items-baseline justify-between gap-3 rounded border px-3 py-2 ${
                  isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
                }`}
              >
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {k}
                </span>
                <span
                  className={`font-mono text-[12px] ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing data */}
        <div className="mt-5">
          <p
            className={`mb-2 text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
            }`}
          >
            {UI_LABELS.missing_data_label}
          </p>
          <div className="flex flex-wrap gap-2">
            {p.missing_data.map((item) => (
              <span
                key={item}
                className={`inline-flex items-center rounded border px-2 py-1 text-[11px] ${
                  isDarkMode
                    ? 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-100'
                    : 'border-fuchsia-500/30 bg-fuchsia-50 text-fuchsia-800'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Run metadata */}
      <article
        className={`rounded border p-5 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
        }`}
      >
        <p
          className={`mb-3 text-[9px] font-black uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {UI_LABELS.run_metadata_label}
        </p>

        <p
          className={`mb-1 text-[9px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
          }`}
        >
          {UI_LABELS.analysis_levels_label}
        </p>
        <ul className="mb-4 space-y-1">
          {m.analysis_levels_available.map((lvl) => (
            <li
              key={lvl}
              className={`font-mono text-[12px] ${
                isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              · {lvl}
            </li>
          ))}
        </ul>

        <Block label={UI_LABELS.current_level_label} value={m.current_level} isDark={isDarkMode} />
        <div className="mt-3">
          <Block
            label={UI_LABELS.efficacy_mode_label}
            value={m.efficacy_mode}
            isDark={isDarkMode}
          />
        </div>
      </article>
    </div>
  );
}

function Field({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded border px-3 py-2 ${
        isDark ? 'border-zinc-800 bg-black/40' : 'border-zinc-200 bg-zinc-50'
      }`}
    >
      <p
        className={`text-[9px] font-black uppercase tracking-[0.3em] ${
          isDark ? 'text-zinc-500' : 'text-zinc-500'
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-[13px] font-black ${
          isDark ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Block({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) {
  return (
    <div>
      <p
        className={`mb-1 text-[9px] font-black uppercase tracking-[0.3em] ${
          isDark ? 'text-zinc-500' : 'text-zinc-500'
        }`}
      >
        {label}
      </p>
      <p
        className={`text-[12px] leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
