import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Engines | CrisPRO.ai",
  description: "The CrisPRO.ai engine stack — specialized engines for target locking, mechanism alignment, synthetic lethality, and safety/dosing in oncology.",
};


export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
