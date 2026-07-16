// ============================================================================
// ch08-therapy-bridge.ts — Chapter 8: The SL therapy bridge (allow/warn/disallow)
//
// Public-safe rewrite of the applicability layer.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_08_THERAPY_BRIDGE: ResearchChapter = {
  slug: 'therapy-bridge',
  order: 8,
  title: 'The therapy bridge',
  subtitle: 'From mechanism claim to a decision the tumour board can act on',
  readMinutes: 6,
  publicAnchors: [
    'Allow: MSI-H + pembrolizumab (KEYNOTE-158)',
    'Warn: BRAF-V600E CRC on BRAF monotherapy (better as BRAF + EGFR combination)',
    'Disallow: KRAS-wildtype cohort receiving a KRAS-G12C inhibitor',
  ],
  sections: [
    {
      heading: 'What the bridge does',
      body: [
        'A mechanism claim on its own does not tell a tumour board what to do. The therapy bridge converts a mechanism-fit output into a labelled clinical decision: **allow**, **warn**, or **disallow** — with a reason attached.',
        'The bridge exists because "high mechanism fit" is a necessary but not sufficient condition for a clinical recommendation. A therapy can align mechanistically and still be blocked by tolerability, prior line, drug–drug interaction, off-target risk, or an actively escaping resistance mechanism.',
      ],
    },
    {
      heading: 'Allow',
      body: [
        'The mechanism aligns, the tier is STRONG or VALIDATED, and no escape feature or safety block is triggered. The therapy is recommended for the patient with confidence bands attached.',
        'Public example: an MSI-H colorectal tumour receiving pembrolizumab. Mechanism aligns (IO axis, MSI-H predicts durable checkpoint response), tier is VALIDATED (KEYNOTE-158 / CheckMate-142 clinical receipts), no escape feature triggered.',
      ],
    },
    {
      heading: 'Warn',
      body: [
        'The mechanism aligns but a labelled caveat applies: single-agent will underperform vs a combination; tier is MECHANISTIC rather than STRONG; or an escape feature is present but not dominant. The therapy is not blocked, but the recommendation carries an explicit caveat.',
        'Public example: BRAF-V600E colorectal cancer on BRAF-monotherapy. The mechanism aligns on the MAPK axis, but the BEACON-CRC data are clear that combined BRAF + anti-EGFR therapy is the superior clinical option. A "warn" recommendation would point the tumour board at the combination.',
      ],
    },
    {
      heading: 'Disallow',
      body: [
        'The mechanism does not align, or an active escape feature dominates, or a safety block applies. The therapy is not recommended for this patient.',
        'Public example: a KRAS-wildtype tumour proposed for a KRAS-G12C inhibitor. Mechanism does not align — the target is not present — so the therapy is disallowed regardless of the tumour’s histology or prior treatment history.',
      ],
    },
    {
      heading: 'Why the label carries the reason',
      body: [
        'Every allow/warn/disallow output carries the mechanism-axis reason attached. A "disallow" is never bare — it names the axis on which alignment failed and the receipt that supports the failure. This is what makes the bridge auditable: a tumour board can accept, override, or contest a recommendation because the reason is explicit.',
        'A bridge that shipped only a label without a reason would be a black box. The platform ships the label AND the reason on every case.',
      ],
    },
  ],
  keyInsight:
    'The bridge is the difference between a mechanism score and a clinical decision. It carries the reason — not just the label — because a tumour board has to be able to interrogate the recommendation, not defer to it.',
  linksIntoDepth: {
    axes: ['io', 'mapk', 'ddr'],
    modalities: ['clinical', 'in-vitro-functional'],
    tiers: ['validated', 'strong', 'mechanistic'],
    capabilities: ['gate-tier-scoring', 'biomarker-failure-prediction'],
  },
};
