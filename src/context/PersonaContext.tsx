'use client';

/**
 * PersonaContext — global oncologist / patient / pharma persona.
 * Persists to localStorage. SSR-safe default = oncologist.
 * SOURCE: user request 2026-07-10 — tumor-board persona toggle.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Persona = 'oncologist' | 'patient' | 'pharma';

const STORAGE_KEY = 'crispro.persona';
const DEFAULT_PERSONA: Persona = 'oncologist';

interface PersonaContextValue {
  persona: Persona;
  setPersona: (p: Persona) => void;
  isHydrated: boolean;
}

const PersonaContext = createContext<PersonaContextValue>({
  persona: DEFAULT_PERSONA,
  setPersona: () => {},
  isHydrated: false,
});

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(DEFAULT_PERSONA);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Persona | null;
      if (stored === 'oncologist' || stored === 'patient' || stored === 'pharma') {
        setPersonaState(stored);
      } else {
        // Support ?persona=patient search-param on first landing
        const params = new URLSearchParams(window.location.search);
        const q = params.get('persona') as Persona | null;
        if (q === 'oncologist' || q === 'patient' || q === 'pharma') {
          setPersonaState(q);
        }
      }
    } catch (_) {
      // no-op
    }
    setIsHydrated(true);
  }, []);

  const setPersona = (p: Persona) => {
    setPersonaState(p);
    try {
      window.localStorage.setItem(STORAGE_KEY, p);
    } catch (_) {
      // no-op
    }
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona, isHydrated }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextValue {
  return useContext(PersonaContext);
}

export const PERSONA_LABELS: Record<Persona, string> = {
  oncologist: 'Oncologist',
  patient: 'Patient',
  pharma: 'Pharma',
};
