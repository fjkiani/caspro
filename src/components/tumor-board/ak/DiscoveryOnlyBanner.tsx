'use client';

/**
 * DiscoveryOnlyBanner — top-of-page red warning that renders on any patient
 * bundle with discoveryOnly=true. The message is patient-specific; the
 * banner is not a generic warning — it names the exact reason.
 */
import { usePatient } from '@/context/PatientContext';

export default function DiscoveryOnlyBanner() {
  const patient = usePatient();
  if (!patient.discoveryOnly) return null;
  return (
    <div className="w-full border-b border-amber-500/40 bg-amber-500/10 py-3">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-1 px-8">
        <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200">
          Discovery-only recommendation surface
        </p>
        <p className="text-sm text-amber-100">
          <span className="font-semibold">{patient.meta.patientId}:</span>{' '}
          {patient.discoveryOnlyReason ??
            'This tumor type has zero benched archetypes in the CrisPRO pan-cancer sweep. Recommendations rest on published trials, not on backend calibration.'}
        </p>
      </div>
    </div>
  );
}
