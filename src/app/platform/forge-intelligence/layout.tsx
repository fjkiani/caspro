import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Forge Intelligence",
  description: "In silico therapeutic design with Forge: target binding, on-target selectivity, and mechanism alignment.",
  alternates: { canonical: "/platform/forge-intelligence" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
