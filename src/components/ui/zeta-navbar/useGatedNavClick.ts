'use client';

import { useCallback, useState } from 'react';
import type { NavDropdownItem } from './nav-items';

export type GatedNavTarget = {
  href: string;
  label: string;
};

/** Navigate or open passcode modal for gated ledger dropdown items. */
export function useGatedNavClick(navigate: (href: string) => void) {
  const [gateTarget, setGateTarget] = useState<GatedNavTarget | null>(null);

  const handleDropdownClick = useCallback(
    (sub: NavDropdownItem) => {
      if (sub.gated) {
        const label = sub.label.split(' //')[0]?.trim() || sub.label;
        setGateTarget({ href: sub.href, label });
        return;
      }
      if (sub.external) {
        window.open(sub.href, '_blank', 'noopener,noreferrer');
        return;
      }
      navigate(sub.href);
    },
    [navigate],
  );

  const closeGate = useCallback(() => setGateTarget(null), []);

  return { gateTarget, handleDropdownClick, closeGate };
}
