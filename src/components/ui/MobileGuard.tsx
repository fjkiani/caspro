'use client';
import { ShieldAlert } from 'lucide-react';
import React from 'react';

export function MobileGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="md:hidden fixed inset-0 z-[10000] bg-[var(--background)] flex flex-col items-center justify-center p-8 text-center text-[var(--foreground)]">
        <div className="w-16 h-16 mb-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
          <ShieldAlert className="w-8 h-8 text-cyan-500" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-4 mt-2">
          Environment Not Supported
        </h2>
        <p className="text-sm font-bold opacity-60 leading-relaxed max-w-xs">
          CrisPRO.ai is not optimized to be viewed on Mobile - please switch to a Computer to view.
        </p>
      </div>
      <div className="hidden md:contents">
        {children}
      </div>
    </>
  );
}
