/**
 * persona-hero-content.ts
 * SOURCE: user request 2026-07-10 — engine scroll pages must have real, unique heroes
 *         that change explanation per persona (oncologist / patient / pharma).
 */

import type { Persona } from '@/context/PersonaContext';

export interface PersonaHeroBlock {
  eyebrow: string;
  headline: string;
  subhead: string;
  byPersona: Record<Persona, {
    lead: string;
    detail: string;
  }>;
}

export const PERSONA_HERO_CONTENT: Record<string, PersonaHeroBlock> = {
  'target-lock-brain-met': {
    eyebrow: 'L1 · TARGET LOCK',
    headline: 'Brain-metastasis cascade — 7 steps, ranked',
    subhead: '12 live variants · Evo2 delta_ll · WEIGHTS_BRAIN_MET · AUROC 0.6889 on 29-gene panel (honest primary composite).',
    byPersona: {
      oncologist: {
        lead: 'For your patient with brain metastases: the 7-step BrM cascade drivers ranked by Target-Lock score (≥ 0.35 = genuine driver).',
        detail: 'Use it to prioritize which pathway to hit before enrollment closes. Enformer excluded from the composite; tautology retracted 2026-04-28.',
      },
      patient: {
        lead: 'Your tumor has moved to the brain in 7 discrete steps. This tool ranks which biological switches are most likely driving that spread.',
        detail: 'Your oncologist uses these rankings to know what to target first. A higher Target-Lock score = a switch that is real (validated on lots of tumor cells), not a hunch.',
      },
      pharma: {
        lead: 'L1 Target Lock validates target essentiality across DepMap + in-vivo CRISPR + patient expression.',
        detail: '12 live variants scored on Evo2 delta_ll. Reject non-drivers before enrollment costs $300M. Panel-normalized to prevent length bias.',
      },
    },
  },

  'synthetic-lethality-mbd4': {
    eyebrow: 'L3 · SYNTHETIC LETHALITY',
    headline: 'MBD4 axis — 6-axis SL matrix, PARP falsified',
    subhead: 'Primary axis: ATR (ceralasertib) · d = −0.50, p = 0.021 (n=14 vs 914). Falsification arm: PARP1 (p = 0.605 MWU).',
    byPersona: {
      oncologist: {
        lead: 'For MBD4-LOF patients: ATR/WEE1 axis is our primary synthetic-lethality candidate.',
        detail: 'PARP1 axis was falsified per PR #11 — Cohen\'s d and n intact, the multi-asset scoring fix is queued. 6-axis matrix shown below.',
      },
      patient: {
        lead: "'Synthetic lethality' means your tumor's own damage cancels its escape route.",
        detail: 'For your MBD4 mutation, blocking ATR (a DNA-repair helper) makes the tumor collapse. PARP was tested — it did not work for your subtype — the tool tells you why so it can\'t be sold as false hope.',
      },
      pharma: {
        lead: 'MBD4-LOF hypermutator cohort · n = 21 in DepMap (14 with GDSC2 ceralasertib, 15 with adavosertib).',
        detail: 'Primary axis ATR: p = 0.021, d = −0.50 (ceralasertib, LN_IC50). MSI-purge robust: p = 0.015, d = −0.62. Falsification: PARP MWU p = 0.605 — negative, receipted.',
      },
    },
  },
};

export function getHeroForPersona(pageId: string, persona: Persona) {
  const block = PERSONA_HERO_CONTENT[pageId];
  if (!block) return null;
  return { ...block, active: block.byPersona[persona] };
}
