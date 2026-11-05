'use client';

import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';

export default function DiscoveryOnlyBanner() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();
  if (!patient.discoveryOnly) return null;

  const wrapper = isDarkMode
    ? 'border-b border-amber-500/40 bg-amber-500/10'
    : 'border-b border-amber-400 bg-amber-100';
  const body = isDarkMode ? 'text-amber-100' : 'text-amber-900';

  const reason =
    patient.discoveryOnlyReason ??
    'Zero benched archetypes for this substrate — recommendations rest on published trials, not backend calibration.';

  return (
    <div className={`w-full py-2 ${wrapper}`}>
      <p className={`mx-auto max-w-[1600px] truncate px-4 text-[11px] leading-snug md:px-8 ${body}`}>
        <span className="font-black uppercase tracking-widest">Discovery-only · </span>
        <span className="font-semibold">{patient.meta.patientId}</span>
        {' — '}
        {reason}
      </p>
    </div>
  );
}
