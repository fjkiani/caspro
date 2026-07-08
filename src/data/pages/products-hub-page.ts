// ==============================================================================
// /products/ — Hub tab-list linking to the 7 product surfaces.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
import { Target, Layers, Users, Terminal, Zap, Hammer, Eye } from 'lucide-react';

export const PRODUCTS_HUB_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products',
  title: 'One engine, seven decision surfaces.',
  subtitle:
    'CrisPRO is a mechanism-alignment engine with seven purpose-built surfaces — one per decision context. Every surface consumes the same 5-capability spine and every claim traces to the public ledger.',
  sections: [
    {
      id: 'oncology',
      label: 'Oncology',
      eyebrow: 'Surface 1 · Oncology',
      headline: 'Mechanism-alignment for oncology programs.',
      Icon: Target,
      body: [
        'The anchor product. Every offering starts here — decode a trial, name the mechanism-alignment split, cross-link to a comparator, and hand back a receipt.',
      ],
      cta: { label: 'Open the Oncology surface', href: '/products/oncology/' },
    },
    {
      id: 'r-d',
      label: 'R & D',
      eyebrow: 'Surface 2 · R&D',
      headline: 'Pipeline decisions with a mechanism-alignment gate.',
      Icon: Layers,
      body: [
        'For pipeline-scale decisions — which asset to advance, which to gate at Phase I, which to reposition. The R&D surface returns a mechanism-alignment score across a portfolio, ranked by evidence tier.',
      ],
      cta: { label: 'Open the R&D surface', href: '/products/r-d/' },
    },
    {
      id: 'patient',
      label: 'Patient',
      eyebrow: 'Surface 3 · Patient',
      headline: 'Family-facing briefs, plain language.',
      Icon: Users,
      body: [
        'A translation layer for patients and advocates. Same underlying alignment call, delivered as a plain-language brief with a citable evidence chain.',
      ],
      cta: { label: 'Open the Patient surface', href: '/products/patient/' },
    },
    {
      id: 'command-center',
      label: 'Command center',
      eyebrow: 'Surface 4 · Command center',
      headline: 'The BD operator\'s workbench.',
      Icon: Terminal,
      body: [
        'For BD teams running diligence at franchise scope. Multi-asset scoring, comparator overlays, and next-step routing into an offering.',
      ],
      cta: { label: 'Open the Command Center surface', href: '/products/command-center/' },
    },
    {
      id: 'boltz',
      label: 'Boltz',
      eyebrow: 'Surface 5 · Boltz',
      headline: 'Structure-informed mechanism alignment.',
      Icon: Zap,
      body: [
        'A structure-informed reader for mechanism-alignment questions where the target has a well-characterized pocket. Complementary to sequence-based reads.',
      ],
      cta: { label: 'Open the Boltz surface', href: '/products/boltz/' },
    },
    {
      id: 'forge',
      label: 'Forge',
      eyebrow: 'Surface 6 · Forge',
      headline: 'IST design & prospective gate definition.',
      Icon: Hammer,
      body: [
        'The Forge is a design surface — used to define a prospective mechanism-alignment gate for an investigator-sponsored trial before enrollment opens.',
      ],
      cta: { label: 'Open the Forge surface', href: '/products/forge/' },
    },
    {
      id: 'oracle',
      label: 'Oracle',
      eyebrow: 'Surface 7 · Oracle',
      headline: 'Predictive mechanism-alignment scoring at Phase I gate.',
      Icon: Eye,
      body: [
        'Oracle is the pre-Phase-I gate. It scores a mechanism-alignment hypothesis before capital enters the clinic — the input into the gate-tier-scoring capability.',
      ],
      cta: { label: 'Open the Oracle surface', href: '/products/oracle/' },
    },
  ],
};
