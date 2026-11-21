'use client';

import Link from 'next/link';
import { ArrowRight, Crosshair } from 'lucide-react';

import { TB_PRODUCT_CTAS, TB_PRODUCT_HERO } from '@/data/pages/tumor-board-workspace-data';
import { CRISPRO_ML_V1_RUO } from '@/data/pages/tumor-board/crispro-ml-v1';
import type { TbProductChrome } from './useTbProductChrome';

export function TumorBoardProductHeader({ chrome }: { chrome: TbProductChrome }) {
  return (
    <header className={`shrink-0 border-b ${chrome.header}`}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2.5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border ${chrome.iconBox}`}
          >
            <Crosshair className={`h-3.5 w-3.5 ${chrome.accent}`} />
          </div>
          <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${chrome.main}`}>
            {TB_PRODUCT_HERO.brand}
          </span>
          <span
            className={`hidden h-5 w-px sm:block ${chrome.isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`}
          />
          <div className="min-w-0">
            <h1
              className={`truncate text-sm font-black uppercase tracking-[0.15em] sm:text-base ${chrome.main}`}
            >
              {TB_PRODUCT_HERO.title}
            </h1>
            <p className={`truncate text-[10px] font-black uppercase tracking-widest ${chrome.muted}`}>
              {TB_PRODUCT_HERO.subtitle}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className={`hidden max-w-[14rem] text-[8px] leading-tight lg:inline ${chrome.muted}`}>
            {CRISPRO_ML_V1_RUO}
          </span>
          <Link
            href={TB_PRODUCT_CTAS.secondary.href}
            className={`hidden items-center gap-1.5 text-[10px] font-black uppercase tracking-widest sm:inline-flex ${chrome.muted} hover:opacity-80`}
          >
            Live workspace
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href={TB_PRODUCT_CTAS.primary.href}
            className={`rounded-sm border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${chrome.cta}`}
          >
            {TB_PRODUCT_CTAS.primary.label}
          </Link>
        </div>
      </div>
    </header>
  );
}