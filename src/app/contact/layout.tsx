import type { ReactNode } from 'react';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact CrisPRO.ai",
  description: "Book a demo, request access to the platform, or talk to the CrisPRO.ai team about partnerships and clinical pilots.",
  alternates: { canonical: "/contact" },
};


export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
