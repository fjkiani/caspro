/**
 * /demo/patient — Ayesha's demo (6 stages).
 *
 * Route-implied persona: 'patient' (auto-set on mount inside DemoWalker).
 *
 * Data source: src/data/demos/demo_patient_spec.json, byte-identical to the
 * uploaded spec (SHA-256 pinned in manifest.frozen.json). Every rendered
 * string traces to a spec field or UI_LABELS.
 */

import DemoWalker from '@/components/demos/DemoWalker';
import { loadPatientDemo } from '@/data/demos/loader';
import { UI_LABELS } from '@/components/demos/labels';

export const metadata = {
  title: 'CrisPRO Demos · Patient',
};

export default function PatientDemoPage() {
  const spec = loadPatientDemo();

  return (
    <DemoWalker
      demo={spec}
      autoSetPersona="patient"
      routeLabel={UI_LABELS.route_label_patient}
      siblingLinks={[
        { href: '/demo/pharma', label: UI_LABELS.sibling_pharma },
        { href: '/demo/tumor-board', label: UI_LABELS.sibling_tumor_board },
        { href: '/demo', label: UI_LABELS.demos_nav_link },
      ]}
    />
  );
}
