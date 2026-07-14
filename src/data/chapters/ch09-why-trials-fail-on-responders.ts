// ============================================================================
// ch09-why-trials-fail-on-responders.ts — Chapter 9: Why trials fail on responders
//
// Public-safe abstract of the mechanism-divergence pattern.
// ============================================================================

import type { ResearchChapter } from '../chapters-index';

export const CH_09_WHY_TRIALS_FAIL: ResearchChapter = {
  slug: 'why-trials-fail-on-responders',
  order: 9,
  title: 'Why trials still fail on responders',
  subtitle: 'How the same asset can succeed in one trial and fail in the next, and what the mechanism signal is',
  readMinutes: 7,
  publicAnchors: [
    'BEACON-CRC vs single-agent BRAF in BRAF-V600E CRC',
    'CheckMate-9LA vs earlier single-agent IO in NSCLC',
    'PARP-inhibitor cross-trial variance in HR-deficient ovarian cancer',
  ],
  sections: [
    {
      heading: 'The pattern',
      body: [
        'A therapy shows a real response in Trial A and fails on the primary endpoint in Trial B — same asset, same indication, similar backbone. The industry response is often to blame execution: dose selection, geography, competing standard-of-care, timing. Sometimes those explanations are right.',
        'Often they are not. Often the two trials enrolled populations that look identical on disease + stage but are mechanistically different. The failure in Trial B is not the therapy — it is a subgroup shift that pushed the mechanism-fit distribution below the response threshold.',
      ],
    },
    {
      heading: 'What the platform surfaces',
      body: [
        'When two trials in the same indication give opposite results, the divergence between them can be decomposed onto the mechanism axes. The axis that carries the largest signed contribution difference is the mechanistic explanation.',
        'The output is not a claim that "Trial B was wrong". It is a labelled attribution: the axis that shifted, the direction of the shift, and the fraction of the divergence that the axis accounts for. That attribution is what a program team needs to decide whether to re-run Trial B with a different eligibility rule, split the population, or fold the asset.',
      ],
    },
    {
      heading: 'Public examples of the pattern',
      body: [
        '**BEACON-CRC.** Single-agent BRAF-V600E inhibition in colorectal cancer produced modest response; combined BRAF + anti-EGFR (encorafenib + cetuximab) transformed the mechanism-fit picture and delivered the BEACON-CRC primary endpoint. Not different asset — different mechanism-alignment structure.',
        '**IO combinations in NSCLC.** Early single-agent PD-1 trials in unselected NSCLC underperformed; PD-L1 CPS stratification (KEYNOTE-024) and chemotherapy backbone combinations (CheckMate-9LA, KEYNOTE-189) changed the enrolled mechanism-fit distribution and produced clean OS signals.',
        '**PARP inhibitors in ovarian cancer.** Cross-trial variance in HR-deficient ovarian cancer is largely attributable to how tightly each trial defined "HR deficient" — germline BRCA only, somatic BRCA, HRD-signature-positive tumours. The therapy is the same; the mechanism-fit distribution the trial enrolled is not.',
      ],
    },
    {
      heading: 'What this changes for a program team',
      body: [
        'The default program response to a failed trial is either to fold the asset or to run another trial with a different design. Both are expensive, and both benefit from having a labelled mechanism attribution before the decision is made.',
        'A mechanism-divergence output does not tell a team to run another trial. It tells them **which axis** the next trial would have to gate on to produce a mechanistic case that is materially different from the one that failed. If no such axis exists, the honest read is that the asset is exhausted in this indication.',
      ],
    },
  ],
  keyInsight:
    'A trial that fails on the primary endpoint is not always a failed therapy. Often it is a mechanism-fit distribution shift the eligibility criteria did not catch. The divergence-decomposition output tells a program team which axis to gate on next — or when to stop.',
  linksIntoDepth: {
    axes: ['ddr', 'mapk', 'io', 'rss'],
    modalities: ['clinical', 'in-vivo'],
    tiers: ['strong', 'mechanistic'],
    capabilities: ['mechanism-divergence', 'biomarker-failure-prediction'],
  },
};
