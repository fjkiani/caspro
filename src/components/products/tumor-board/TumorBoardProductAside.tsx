'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { TB_PRODUCT_CTAS } from '@/data/pages/tumor-board-workspace-data';
import type { TbProductTab } from '@/data/pages/tumor-board-workspace-data';
import type { TbProductChrome } from './useTbProductChrome';

export function TumorBoardProductAside({
  chrome,
  tab,
}: {
  chrome: TbProductChrome;
  tab: TbProductTab;
}) {
  return (
    <aside className={`flex shrink-0 flex-col justify-center gap-2 rounded border p-3 lg:self-stretch ${chrome.rail}`}>
      {tab === 'engage' ? (
        <>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${chrome.accent}`}>
            Do this next
          </p>
          <p className={`text-[12px] leading-snug ${chrome.body}`}>
            Run live scoring or open a full case walk.
          </p>
          <Link
            href={TB_PRODUCT_CTAS.secondary.href}
            className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${chrome.accent}`}
          >
            Open case board
            <ArrowRight className="h-3 w-3" />
          </Link>
        </>
      ) : tab === 'proof' ? (
        <>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${chrome.accent}`}>
            Ledger
          </p>
          <p className={`text-[12px] leading-snug ${chrome.body}`}>
            Timestamped trial receipts for LATIFY-style failures.
          </p>
          <Link
            href={TB_PRODUCT_CTAS.ledger.href}
            className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${chrome.accent}`}
          >
            {TB_PRODUCT_CTAS.ledger.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </>
      ) : tab === 'package' ? (
        <>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${chrome.accent}`}>
            You leave with
          </p>
          <ol className={`space-y-1 text-[11px] ${chrome.body}`}>
            {['PRIORITIZE list', 'BLOCK list', 'Named gaps'].map((s, i) => (
              <li key={s} className="flex gap-2">
                <span className={`font-black ${chrome.accent}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <>
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${chrome.accent}`}>
            Try it
          </p>
          <p className={`text-[12px] leading-snug ${chrome.body}`}>
            Switch disease. Open a case board when ready.
          </p>
          <Link
            href={TB_PRODUCT_CTAS.secondary.href}
            className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${chrome.accent}`}
          >
            {TB_PRODUCT_CTAS.secondary.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </>
      )}
    </aside>
  );
}