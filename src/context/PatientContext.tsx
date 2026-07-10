'use client';

/**
 * PatientContext — surfaces a single active PatientBundle to the tumor-board
 * subtree. Every AK/* component reads via usePatient() so switching patients
 * is one URL change.
 */
import { createContext, useContext, type ReactNode } from 'react';
import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';

const PatientContext = createContext<PatientBundle | null>(null);

export function PatientProvider({
  bundle,
  children,
}: {
  bundle: PatientBundle;
  children: ReactNode;
}) {
  return (
    <PatientContext.Provider value={bundle}>{children}</PatientContext.Provider>
  );
}

export function usePatient(): PatientBundle {
  const ctx = useContext(PatientContext);
  if (!ctx) {
    throw new Error(
      'usePatient() called outside <PatientProvider>. Wrap the tumor-board route in PatientProvider with an explicit bundle.'
    );
  }
  return ctx;
}

export function useOptionalPatient(): PatientBundle | null {
  return useContext(PatientContext);
}
