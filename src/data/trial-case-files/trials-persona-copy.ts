/**
 * trials-persona-copy.ts
 *
 * D15 persona overlay side-car for trial-case-files/trials/*.ts.
 *
 * WHY A SIDE-CAR
 *   The hand-authored TrialCaseFile records under trials/ are dense
 *   substrate objects — 8-axis vectors, gate results, artifacts,
 *   engine-run scores, playbook steps, cited HRs and PMIDs. Retrofitting
 *   persona overlays in-line would clutter those files and mix voice
 *   variants with substrate. Instead the persona-varied narrative
 *   headers live here, keyed by TrialCaseFile.id.
 *
 * COVERS (D15 first pass)
 *   Trial-level narrative headers only:
 *     - title      (headline sentence-fragment)
 *     - drugLine   (regimen // sponsor phase indication)
 *     - oneLiner   (2–3 sentence trial takeaway)
 *
 * NOT COVERED (deferred)
 *   - rootCause.{summary, statusQuo, intercept}  — precision-sensitive
 *   - gates[].{condition, result}                 — audit-trail-grade
 *   - biologySummary / biologyCascade[]           — mechanism precision
 *   - playbook[].{title, desc}                    — protocol-grade guidance
 *   - engineRun.* / scores[].* / cosine*         — quantitative substrate
 *   - artifacts[].summary                         — chain-of-custody
 *   - moaGlyphs[].note / verdict.caption          — mechanism callouts
 *   - commercial.closingStatement                 — commercial framing
 *   These carry cited HRs, ORRs, and PMIDs; plain-English patient rewrite
 *   risks losing numeric precision. Separate chunk pending reviewer.
 *
 * READ SITE
 *   import { getTrialPersonaHeaders } from
 *     '@/data/trial-case-files/trials-persona-copy';
 *   const headers = getTrialPersonaHeaders(trial, persona);
 *   // { title, drugLine, oneLiner } — falls back to English root
 */

import type { Persona } from '@/context/PersonaContext';
import type { TrialCaseFile } from './types';

export interface TrialCaseHeaderCopyFields {
  title: string;
  drugLine: string;
  oneLiner: string;
}

export type TrialCaseHeaderPersonaOverlay = Partial<
  Record<Persona, Partial<TrialCaseHeaderCopyFields>>
>;

/**
 * Persona overlay keyed by TrialCaseFile.id. Populated for the 5
 * hand-authored trials currently in trial-case-files/trials/. Add a
 * new key here when a new TrialCaseFile is added.
 */
export const TRIAL_CASE_PERSONA_COPY: Record<string, TrialCaseHeaderPersonaOverlay> = {
  adavosertib: {
    patient: {
      title: 'The WEE1-blocking drug adavosertib: patients whose tumors have lost PTEN did not benefit',
      drugLine: 'A WEE1 blocker combined with a PARP blocker, tested in ovarian cancer',
      oneLiner:
        'A WEE1-blocking drug was tested with a PARP-blocking drug. Patients whose tumors still had a working PTEN gene had a real response (about 1 in 4 tumors shrank). Patients whose tumors had lost PTEN had no response at all. That means the trial needed to exclude PTEN-loss patients up front — instead it enrolled them all together and the two signals cancelled out.',
    },
    pharma: {
      title: 'Adavosertib — PTEN-loss is the missing WEE1 franchise-fit exclusion criterion',
      drugLine: 'WEE1i + PARPi franchise combination // AZ Phase II ovarian franchise',
      oneLiner:
        'Adavosertib + olaparib produced ORR 23% in PTEN-intact substrate and ORR 0% in PTEN-loss substrate. PTEN-loss is the mandatory franchise-fit exclusion criterion for the WEE1 inhibitor class on the audit trail.',
    },
  },

  berzosertib: {
    patient: {
      title: 'The ATR-blocking drug berzosertib: patients with a specific tumor state responded, but the trial mixed them with non-responders',
      drugLine: 'An ATR blocker combined with a chemotherapy drug, tested in ovarian cancer where platinum chemotherapy had stopped working',
      oneLiner:
        'When an ATR-blocking drug was combined with gemcitabine chemotherapy, patients whose tumors had lower baseline "replication stress" (called RS-Low) had a real response rate (about 4 in 10 tumors shrank). Patients whose tumors were already saturated with replication stress (RS-High, driven by specific gene changes like CCNE1) did NOT benefit. The trial was designed to include everyone together, so the RS-Low benefit was hidden by the RS-High non-response.',
    },
    pharma: {
      title: 'Berzosertib — RS-High is the missing ATRi franchise-fit responder-gate',
      drugLine: 'Berzosertib (ATRi) + gemcitabine franchise // Merck Phase II ovarian franchise',
      oneLiner:
        'Berzosertib + gemcitabine produced a striking RS-Low franchise-fit signal (ORR 40%) masked by the trial\'s ITT design. RS-High status (CCNE1-amp, RB1-loss, MYC-amp substrate) is the mandatory franchise-fit exclusion criterion for the ATR inhibitor class in ovarian cancer on the audit trail.',
    },
  },

  capri: {
    patient: {
      title: 'CAPRI trial: patients who had NOT previously tried a PARP drug responded; patients who had, did not',
      drugLine: 'A combination of ATR blocker and PARP blocker, tested in ovarian cancer',
      oneLiner:
        'In the CAPRI trial, patients whose ovarian cancer had NOT previously been treated with a PARP-blocking drug responded well (about 1 in 3 tumors shrank). Patients who had already been on PARP-blockers barely responded (fewer than 1 in 20). So any future trial of this ATR + PARP combination has to track "prior PARP exposure" as a separate group up front — otherwise the two biologies get mixed.',
    },
    pharma: {
      title: 'CAPRI — PARPi-naive substrate is the ATRi + PARPi franchise-fit responder gate',
      drugLine: 'ATRi + PARPi combination franchise // AZ Phase II ovarian franchise',
      oneLiner:
        'In CAPRI, PARPi-naive substrate had ORR 36% versus 4% in post-PARPi substrate. Prior PARPi exposure is a mandatory stratification variable on every ATRi + PARPi combination franchise on the audit trail.',
    },
  },

  ceacam5: {
    patient: {
      title: 'CEACAM5 as a drug target: the target is real, but the trials picked the wrong patients',
      drugLine: 'A drug (an antibody-drug conjugate) aimed at the CEACAM5 marker, targeting patients whose tumors carry a lot of that marker',
      oneLiner:
        'CEACAM5 is a real target on tumors — the marker is there and the drug can hit it. The Phase III trial (CARMEN-LC03) failed because it enrolled patients with a middle amount of CEACAM5 on the tumor (a signal called IHC ≥50%), and those patients could not respond. A two-condition selection rule (a HIGHER CEACAM5 threshold, plus a signal that the tumor is immune-friendly) is what rescues this drug class going forward.',
    },
    pharma: {
      title: 'CEACAM5 — from Phase III franchise-failure to a two-gate franchise-fit selection framework',
      drugLine: 'CEACAM5-DM4 ADC franchise // two-gate rescue architecture',
      oneLiner:
        'CEACAM5 is a real target on the substrate call. CARMEN-LC03 failed because IHC ≥50% enrolled non-admissible substrate. The two-gate franchise-fit framework (higher IHC threshold + IO permissiveness) is the candidate rescue architecture for the next-generation CDx pathway on the franchise-audit trail.',
    },
  },

  latify: {
    patient: {
      title: 'Ceralasertib + durvalumab: the overall trial failed, but a specific tumor subgroup may be the real responder',
      drugLine: 'A combination of an ATR-blocking drug and an immunotherapy, tested in lung cancer after chemotherapy had stopped working',
      oneLiner:
        'The overall Phase III trial did not meet its main goal — most patients did not benefit. But there is a specific tumor subgroup (patients whose tumors have lost two genes called STK11 and KEAP1 together) that looks like the real responder biology. Precise numbers on how strong that alignment is are still under internal review — for now, the only outside claim is that this subgroup is the candidate mechanistic responder.',
    },
    pharma: {
      title: 'Ceralasertib + durvalumab — under continued franchise-audit review',
      drugLine: 'Ceralasertib (ATRi) + durvalumab (PD-L1) franchise // AZ Phase III NSCLC franchise-failure',
      oneLiner:
        'Ceralasertib + durvalumab failed ITT franchise-fit on the 2L+ NSCLC substrate. The STK11/KEAP1 co-loss subgroup is a candidate mechanistic responder franchise archetype. Quantitative alignment magnitude is under continued canon review on the franchise-audit trail; external claims are franchise-limited to the mechanism candidate.',
    },
  },
};

/**
 * Return persona-adjusted trial-case narrative headers.
 * Falls back to the English root fields on the passed-in TrialCaseFile.
 */
export function getTrialPersonaHeaders(
  trial: Pick<TrialCaseFile, 'id' | 'title' | 'drugLine' | 'oneLiner'>,
  persona: Persona,
): TrialCaseHeaderCopyFields {
  const overlay = TRIAL_CASE_PERSONA_COPY[trial.id]?.[persona];
  return {
    title: overlay?.title ?? trial.title,
    drugLine: overlay?.drugLine ?? trial.drugLine,
    oneLiner: overlay?.oneLiner ?? trial.oneLiner,
  };
}
