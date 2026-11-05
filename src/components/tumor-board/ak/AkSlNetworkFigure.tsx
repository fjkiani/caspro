'use client';

/**
 * AK case SL network figure — assets + copy from @/data/ak-case-structure.
 */

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { AK_SL_NETWORK } from '@/data/ak-case-structure';

export default function AkSlNetworkFigure() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className={`rounded border p-4 space-y-3 ${panel}`}>
      <div>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
          {AK_SL_NETWORK.eyebrow}
        </p>
        <p className={`mt-1 text-sm font-black tracking-tight ${main}`}>{AK_SL_NETWORK.title}</p>
        <p className={`mt-1 text-[12px] leading-relaxed ${body}`}>{AK_SL_NETWORK.caption}</p>
      </div>
      <div
        className={`relative w-full overflow-hidden rounded border ${
          isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <Image
          src={AK_SL_NETWORK.png}
          alt={AK_SL_NETWORK.alt}
          width={1200}
          height={720}
          className="h-auto w-full"
          priority={false}
        />
      </div>
    </div>
  );
}
