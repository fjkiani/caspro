'use client';

/**
 * DiscoveryOnlyBanner — top-of-page amber warning that renders on any
 * patient bundle with discoveryOnly=true. Now theme-aware (dark: amber
 * with high alpha; light: amber-50 tint with darker text for contrast)
 * and mobile-safe (px-4 → md:px-8).
 */

import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function DiscoveryOnlyBanner() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();
  if (!patient.discoveryOnly) return null;

  const wrapper = isDarkMode
    ? 'border-b border-amber-500/40 bg-amber-500/10'
    : 'border-b border-amber-400 bg-amber-100';
  const eyebrow = isDarkMode ? 'text-amber-200' : 'text-amber-800';
  const body    = isDarkMode ? 'text-amber-100' : 'text-amber-900';

  return (
    <div className={`w-full py-3 ${wrapper}`}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-1 px-4 md:px-8">
        <p className={`text-[10px] uppercase tracking-[0.24em] ${eyebrow}`}>
          Discovery-only recommendation surface
        </p>
        <p className={`text-sm ${body}`}>
          <span className="font-semibold">{patient.meta.patientId}:</span>{' '}
          {patient.discoveryOnlyReason ??
            'This tumor type has zero benched archetypes in the CrisPRO pan-cancer sweep. Recommendations rest on published trials, not on backend calibration.'}
        </p>
      </div>
    </div>
  );
}
