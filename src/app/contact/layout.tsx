import type { ReactNode } from 'react';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
