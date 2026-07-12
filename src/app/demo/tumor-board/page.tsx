import { loadDemoByRoute } from '@/data/demos/loader';
import DemoWalker from '@/components/demos/DemoWalker';
import { UI_LABELS } from '@/components/demos/labels';

export const metadata = {
  title: 'CrisPRO Demos · Tumor Board',
};

export default async function TumorBoardDemoPage() {
  const demo = await loadDemoByRoute('/demo/tumor-board/');

  return (
    <DemoWalker
      demo={demo}
      autoSetPersona="oncologist"
      routeLabel={UI_LABELS.route_label_tumor_board}
      siblingLinks={[
        { href: '/demo/patient/', label: UI_LABELS.sibling_patient },
        { href: '/demo/pharma/', label: UI_LABELS.sibling_pharma },
      ]}
    />
  );
}
