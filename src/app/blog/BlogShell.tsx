'use client';

import React from 'react';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import Footer from '@/components/ui/Footer';

/** Client shell so blog always mounts the same chrome as /proof and /engine (fixed nav + offset). */
export default function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14 min-h-[100dvh] flex flex-col bg-background text-foreground">
        <div className="flex-1 w-full min-h-0">{children}</div>
        <Footer />
      </div>
    </>
  );
}
