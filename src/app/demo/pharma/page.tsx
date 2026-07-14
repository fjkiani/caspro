/**
 * /demo/pharma — Pharma landing demo (7 stages).
 *
 * Route-implied persona: 'pharma' (auto-set on mount inside DemoWalker).
 *
 * Data source: src/data/demos/demo_pharma_spec.json, byte-identical to the
 * uploaded spec (SHA-256 pinned in manifest.frozen.json). Every rendered
 * string traces to a spec field or UI_LABELS.
 */

import DemoWalker from '@/components/demos/DemoWalker';
import { loadPharmaDemo } from '@/data/demos/loader';
import { UI_LABELS } from '@/components/demos/labels';

export const metadata = {
  title: 'CrisPRO Demos · Pharma',
};

export default function PharmaDemoPage() {
  const spec = loadPharmaDemo();

  return (
    <DemoWalker
      demo={spec}
      autoSetPersona="pharma"
      routeLabel={UI_LABELS.route_label_pharma}
      siblingLinks={[
        { href: '/demo/patient', label: UI_LABELS.sibling_patient },
        { href: '/demo/tumor-board', label: UI_LABELS.sibling_tumor_board },
        { href: '/demo', label: UI_LABELS.demos_nav_link },
      ]}
    />
  );
}
