import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Proof",
  description: "Proof on the CrisPRO.ai platform — AI-powered metastasis prevention and oncology Co-Pilot.",
};


export default function ProofLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
