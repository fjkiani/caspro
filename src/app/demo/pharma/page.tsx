import { loadDemoByRoute } from '@/data/demos/loader';
import DemoWalker from '@/components/demos/DemoWalker';
import { UI_LABELS } from '@/components/demos/labels';

export const metadata = {
  title: 'CrisPRO Demos · Pharma',
};

export default async function PharmaDemoPage() {
  const demo = await loadDemoByRoute('/demo/pharma/');

  return (
    <DemoWalker
      demo={demo}
      autoSetPersona="pharma"
      routeLabel={UI_LABELS.route_label_pharma}
      siblingLinks={[
        { href: '/demo/patient/', label: UI_LABELS.sibling_patient },
        { href: '/demo/tumor-board/', label: UI_LABELS.sibling_tumor_board },
      ]}
    />
  );
}
