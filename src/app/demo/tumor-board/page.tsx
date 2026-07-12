/**
 * /demo/tumor-board — Multi-disciplinary case review demo (7 stages).
 *
 * Route-implied persona: 'oncologist' (auto-set on mount inside DemoWalker).
 *
 * Data source: src/data/demos/demo_tumor_board_spec.json, byte-identical to
 * the uploaded spec (SHA-256 pinned in manifest.frozen.json). Every rendered
 * string traces to a spec field or UI_LABELS.
 */

import DemoWalker from '@/components/demos/DemoWalker';
import { loadTumorBoardDemo } from '@/data/demos/loader';
import { UI_LABELS } from '@/components/demos/labels';

export const metadata = {
  title: 'CrisPRO Demos · Tumor Board',
};

export default function TumorBoardDemoPage() {
  const spec = loadTumorBoardDemo();

  return (
    <DemoWalker
      demo={spec}
      autoSetPersona="oncologist"
      routeLabel={UI_LABELS.route_label_tumor_board}
      siblingLinks={[
        { href: '/demo/patient', label: UI_LABELS.sibling_patient },
        { href: '/demo/pharma', label: UI_LABELS.sibling_pharma },
        { href: '/demo', label: UI_LABELS.demos_nav_link },
      ]}
    />
  );
}
