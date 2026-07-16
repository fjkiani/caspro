// ==============================================================================
// /products/ — Hub tab-list linking to the 7 product surfaces.
// ==============================================================================
import type { VerticalPageData } from '@/components/audience/VerticalSurface';
export const PRODUCTS_HUB_PAGE_DATA: VerticalPageData = {
  eyebrow: 'Products',
  title: 'One intelligence layer, three product surfaces.',
  subtitle:
    'CrisPRO is one oncology-development intelligence layer expressed through three products — Interception, In-Silico Trials, and Tumor Board — built from the same biology intelligence, not competing silos. Every surface consumes the same spine and every claim traces to the public ledger. Research use only.',
  sections: [
    {
      id: 'interception',
      label: 'Interception',
      eyebrow: 'Product 1 · Interception',
      headline: 'Turn a metastasis hypothesis into a target-and-experiment package.',
      iconKey: 'target',
      body: [
        'For metastasis programs deciding what to test first. Prioritizes targets for the relevant step of spread, generates CRISPR perturbation candidates, and delivers a traceable experimental package with a method-version tag on every stage.',
      ],
      cta: { label: 'Open Interception', href: '/products/interception/' },
    },
    {
      id: 'insilico-trials',
      label: 'In-Silico Trials',
      eyebrow: 'Product 2 · In-Silico Trials',
      headline: 'Pressure-test a development hypothesis before protocol lock.',
      iconKey: 'git-branch',
      body: [
        'For program teams facing a protocol-strategy decision. Combines mechanism fit, biomarker logic, decoded trial and comparator evidence, resistance liabilities, and named gaps into an evidence-tiered program decision package.',
      ],
      cta: { label: 'Open In-Silico Trials', href: '/products/insilico-trials/' },
    },
    {
      id: 'tumor-board',
      label: 'Tumor Board',
      eyebrow: 'Product 3 · Tumor Board',
      headline: 'Turn molecular complexity into a traceable case resolution.',
      iconKey: 'microscope',
      body: [
        'The human decision surface of the platform. Organizes a patient\u2019s biology, vulnerabilities, mechanism-aligned options, trial landscape, evidence, and missing data into one reviewable research workspace. Research use only \u2014 not clinical decision support.',
      ],
      cta: { label: 'Open Tumor Board', href: '/products/tumor-board/' },
    },
    {
      id: 'oncology',
      label: 'Oncology',
      eyebrow: 'Surface 1 · Oncology',
      headline: 'Mechanism-alignment for oncology programs.',
      iconKey: 'target',
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
      iconKey: 'layers',
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
      iconKey: 'users',
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
      iconKey: 'terminal',
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
      iconKey: 'zap',
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
      iconKey: 'hammer',
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
      iconKey: 'eye',
      body: [
        'Oracle is the pre-Phase-I gate. It scores a mechanism-alignment hypothesis before capital enters the clinic — the input into the gate-tier-scoring capability.',
      ],
      cta: { label: 'Open the Oracle surface', href: '/products/oracle/' },
    },
  ],
};
