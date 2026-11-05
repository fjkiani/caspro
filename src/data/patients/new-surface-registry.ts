/**
 * Route-level bridge (historical): which patients used PatientBoardWalker.
 * RETIRED 2026-07-18 — all patients mount TumorBoardTabSurface.
 * Table kept so prior call sites / docs do not break.
 */
export const NEW_SURFACE_ENABLED: Record<string, boolean> = {
  AK: true,
  BR01: true,
  CRC01: true,
  BM01: true,
};

export function usesNewSurface(patientId: string): boolean {
  return NEW_SURFACE_ENABLED[patientId] === true;
}
