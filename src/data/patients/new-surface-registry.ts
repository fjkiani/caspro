/**
 * Route-level bridge: which patients render with the new PatientBoardWalker
 * shell vs. the legacy TumorBoardSurface.
 *
 * Set to true per patient once the walker has been smoke-tested on that
 * bundle. AK ships true out of the gate (D2). BR/CRC/BM flip to true in D5
 * after visual smoke on each bundle.
 *
 * Kept as a plain lookup table (not a bundle field) so the migration is
 * reversible without touching the PatientBundle contract.
 */
export const NEW_SURFACE_ENABLED: Record<string, boolean> = {
  AK:    true,   // walker live 2026-07-14 (D2)
  BR01:  true,   // D5 — bundle fields verified (no anchor panels, no PARP falsification; walker guards both)
  CRC01: true,   // D5 — bundle fields verified (anchorPanels.crc present; CrcAnchorEvidencePanel on confidence tab)
  BM01:  true,   // D5 — bundle fields verified (anchorPanels.brm present; BrmTargetLockPanel on sl-axes tab)
};

export function usesNewSurface(patientId: string): boolean {
  return NEW_SURFACE_ENABLED[patientId] === true;
}
