'use client';

import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import type { ArtifactEntry } from '@/data/trial-case-files';

interface ArtifactRowProps {
  doc: string;
  path: string;
  slug?: string;
  summary?: string;
  type?: 'json' | 'py' | 'mdc' | 'md';
  status?: 'LOCKED' | 'VERIFIED' | 'PENDING';
  isDarkMode: boolean;
}

const TYPE_COLORS: Record<string, { dark: string; light: string }> = {
  json: { dark: 'bg-emerald-500/10 text-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
  py:   { dark: 'bg-amber-500/10 text-amber-400',     light: 'bg-amber-50 text-amber-600' },
  mdc:  { dark: 'bg-cyan-500/10 text-cyan-500',       light: 'bg-cyan-50 text-cyan-700' },
  md:   { dark: 'bg-violet-500/10 text-violet-400',    light: 'bg-violet-50 text-violet-600' },
};

export const ArtifactRow: React.FC<ArtifactRowProps> = ({ doc, path, slug, summary, type, status, isDarkMode }) => {
  const Tag = slug ? 'a' : 'div';
  const linkProps = slug ? { href: slug, target: '_blank', rel: 'noopener noreferrer' } : {};
  const tc = type && TYPE_COLORS[type];

  return (
    <Tag
      {...linkProps}
      className={`group flex flex-col gap-2 py-4 border-b transition-all px-2 sm:px-3 min-w-0 ${
        slug ? 'cursor-pointer' : ''
      } ${isDarkMode ? 'border-zinc-900/50 hover:bg-cyan-500/5' : 'border-slate-100 hover:bg-indigo-50/50'}`}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className={`p-2 rounded-sm shrink-0 ${isDarkMode ? 'bg-zinc-900 text-zinc-400' : 'bg-slate-100 text-slate-600'}`}>
            <FileText className="w-4 h-4 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div className="min-w-0 flex-1">
            <span className={`text-[11px] sm:text-[12px] font-bold transition-colors block ${isDarkMode ? 'text-zinc-300 group-hover:text-white' : 'text-slate-700 group-hover:text-indigo-900'}`}>
              {doc}
            </span>
            <span className={`text-[9px] font-mono mt-1 block ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{path}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {type && tc && (
            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${isDarkMode ? tc.dark : tc.light}`}>
              {type}
            </span>
          )}
          {status && (
            <span className={`text-[8px] font-black uppercase tracking-widest ${
              status === 'VERIFIED' ? 'text-emerald-500' : status === 'LOCKED' ? (isDarkMode ? 'text-cyan-700' : 'text-indigo-400') : 'text-amber-500'
            }`}>{status}</span>
          )}
          {slug && (
            <ExternalLink className={`w-3.5 h-3.5 transition-colors ${isDarkMode ? 'text-zinc-400 group-hover:text-cyan-400' : 'text-slate-500 group-hover:text-indigo-600'}`} />
          )}
        </div>
      </div>
      {summary && (
        <p className={`text-[10px] sm:text-[11px] leading-relaxed pl-11 sm:pl-[3.25rem] ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
          {summary}
        </p>
      )}
    </Tag>
  );
};

/** Render a list of ArtifactRows from typed data */
export const ArtifactList: React.FC<{ artifacts: ArtifactEntry[]; isDarkMode: boolean }> = ({ artifacts, isDarkMode }) => (
  <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide min-h-0">
    {artifacts.map((art, i) => (
      <ArtifactRow key={i} doc={art.doc} path={art.path} slug={art.slug} summary={art.summary} type={art.type} status={art.status} isDarkMode={isDarkMode} />
    ))}
  </div>
);
