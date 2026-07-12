import type { ReactNode } from 'react';

/**
 * /demo layout — no chrome wrapper; each demo route ships its own
 * DemoWalker shell (sticky header + rail + footer). This layout only
 * exists so Next groups the routes cleanly.
 */

export const metadata = {
  title: 'CrisPRO · Demos',
  description:
    'Persona-specific CrisPRO landing demos — patient, pharma, tumor board. Each demo is driven by a frozen spec.',
};

export default function DemoLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
