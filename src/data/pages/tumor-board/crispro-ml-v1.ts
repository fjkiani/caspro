/**
 * CrisPRO-ML v1 — frozen weights + on-disk meters (receipt fields only).
 * Stage copy leads with clinical clocks / concordance; AUROC in meter detail only.
 */
import decoderLoto from '@/data/brenus/crispro_8d_bilinear_decoder_v1.json';
import { loadOvarianPfiMeters } from '@/data/clinical-evidence-from-receipts';

const PUB15 =
  '/Users/fahadkiani/Desktop/development/crispr-assistant-main/publications/15-ovarian-hibernation-two-door';
const PUB04_MM =
  '/Users/fahadkiani/Desktop/development/crispr-assistant-main/publications/04-mm-drug-efficacy';

export const CRISPRO_ML_V1_RUO = 'Research use only.';

export type CrisproMlWeightArtifact = {
  id: string;
  stageId: CrisproMlStageId;
  label: string;
  role: string;
  /** Path cited in UI / audits — may live outside caspro repo */
  sourcePath: string;
  /** In-repo copy when present */
  casproPath?: string;
  status: 'CURRENT' | 'LEGACY_REFERENCE';
};

export type CrisproMlMeter = {
  id: string;
  label: string;
  value: string;
  detail?: string;
  sourcePath: string;
};

export type CrisproMlStageId = 'stage1_encoders' | 'stage2_decoders' | 'stage3_escape';

export const CRISPRO_ML_V1_STAGES: {
  id: CrisproMlStageId;
  n: string;
  title: string;
  headline: string;
  body: string[];
  bullets?: string[];
  outputs: string[];
}[] = [
  {
    id: 'stage1_encoders',
    n: '01',
    title: 'Stage 1 · Biology read',
    headline: 'Lock biology before the drug debate.',
    body: [
      'Name drivers first. BLOCK options that ignore that biology.',
    ],
    bullets: [
      'Separate likely drivers from noise in the assay.',
      'Same biology picture feeds trial matching and resistance routing.',
      'Version-locked — no silent re-fit during the walk.',
    ],
    outputs: [
      'Pathway summary for the case',
      'Cohort context when relevant',
      'Source trail for every axis',
    ],
  },
  {
    id: 'stage2_decoders',
    n: '02',
    title: 'Stage 2 · Options & trials',
    headline: 'Separate responders before debating class.',
    body: [
      'PRIORITIZE bortezomib when the split fits. BLOCK blind class switches.',
    ],
    bullets: [
      'Rank — discuss highest-alignment options first.',
      'Rule out — mismatched classes stay visible, not hidden.',
      'Trial fit — enroll the split the trial already proved, not all-comers.',
    ],
    outputs: [
      'Regimen fit ordered for this profile',
      'Trials that match the biology read',
      'Rule-out list for the room',
    ],
  },
  {
    id: 'stage3_escape',
    n: '03',
    title: 'Stage 3 · Resistance & window',
    headline: 'Name dormant escape before the next chemo cycle.',
    body: [
      'PRIORITIZE dasatinib with navitoclax on dormant residual disease. BLOCK PARP retries that fail there.',
    ],
    bullets: [
      'Branch labels follow locked clinical policy — not raw model tags alone.',
      'Switch menu when escape biology is plausible.',
      'Gaps — which assays flip the branch.',
    ],
    outputs: [
      'Resistance branch (when supported)',
      'Switch-candidate scores',
      'Platinum-window flags',
      'Named testing gaps',
    ],
  },
];

/** Four frozen weight artifacts — prefer these over manuscript prose */
export const CRISPRO_ML_V1_WEIGHTS: CrisproMlWeightArtifact[] = [
  {
    id: 'crispro_8d_bilinear_decoder_v1',
    stageId: 'stage2_decoders',
    label: 'Trial & regimen alignment model',
    role: 'Stage 2 — trial/regimen scoring (frozen weights)',
    sourcePath: `${PUB15}/data/locked/crispro_8d_bilinear_decoder_v1.json`,
    casproPath: 'src/data/brenus/crispro_8d_bilinear_decoder_v1.json',
    status: 'CURRENT',
  },
  {
    id: 'ovarian_hibernation_two_door_contract_v3',
    stageId: 'stage3_escape',
    label: 'Ovarian two-door routing',
    role: 'Sensitive vs escape branches — locked cutpoints',
    sourcePath: `${PUB15}/data/locked/ovarian_hibernation_two_door_contract_v3.json`,
    status: 'CURRENT',
  },
  {
    id: 'pillar_e_v12_model',
    stageId: 'stage3_escape',
    label: 'Escape switch panel',
    role: 'Senescence-escape switch menu (frozen)',
    sourcePath: `${PUB15}/data/pillar_e_v12/pillar_e_v12_model.json`,
    status: 'CURRENT',
  },
  {
    id: 'analysis_contract_v9',
    stageId: 'stage3_escape',
    label: 'Dose-response consensus',
    role: 'Subtype routing + screen consensus (frozen)',
    sourcePath: `${PUB15}/data/locked/analysis_contract_v9.json`,
    status: 'CURRENT',
  },
];

export const CRISPRO_ML_V1_LEGACY_ARTIFACTS: { id: string; sourcePath: string; supersededBy: string }[] = [
  {
    id: 'ovarian_hibernation_two_door_contract_v1',
    sourcePath: `${PUB15}/data/locked/ovarian_hibernation_two_door_contract_v1.json`,
    supersededBy: 'ovarian_hibernation_two_door_contract_v3',
  },
  {
    id: 'ovarian_two_door_standalone_v3',
    sourcePath: `${PUB15}/scripts/ovarian_two_door_standalone_v3.py`,
    supersededBy: 'ovarian_two_door_standalone_v9',
  },
  {
    id: 'MANUSCRIPT_DRAFT',
    sourcePath: `${PUB15}/manuscript/MANUSCRIPT_DRAFT.md`,
    supersededBy: 'data/locked/* + receipts/submission_validation_receipt.json',
  },
];

/** Meters — clinical value first; computational detail in footnote */
export const CRISPRO_ML_V1_METERS: CrisproMlMeter[] = [
  {
    id: '8d_hr_concordance',
    label: 'Phase III trials matched',
    value:
      (decoderLoto.loto_validation_summary?.subgroup_hr_sign_concordance as string | undefined) ??
      '—',
    detail: 'Evidence drawer / Proof & Methods',
    sourcePath: 'src/data/brenus/crispro_8d_bilinear_decoder_v1.json',
  },
  {
    id: 'mm_tier3_spe_ttp',
    label: 'myeloma tier3 receipt',
    value: '—',
    detail: 'Tier3 GSE9782 IPD not vendored under src/data — Alpha must pin path',
    sourcePath: `${PUB04_MM}/results_v2_ml/tier3_gse9782_clinical_trial_ipd.json`,
  },
  {
    id: 'pillar_e_door2_menu',
    label: 'ovarian PFI medians (d)',
    value: (() => {
      const ov = loadOvarianPfiMeters();
      return `${ov.dividingMedianDays} / ${ov.dormantMedianDays} / ${ov.clearedMedianDays}`;
    })(),
    detail: 'From gse165897_two_door_pfi_separation_receipt.json',
    sourcePath: 'src/data/ovarian/gse165897_two_door_pfi_separation_receipt.json',
  },
];

/** Maps product tab keys → ML stage + engage/lanes */
export const TB_TAB_TO_ML_STAGE: Record<
  string,
  CrisproMlStageId | 'ways_in' | 'start'
> = {
  decision: 'stage1_encoders',
  package: 'stage2_decoders',
  proof: 'stage3_escape',
  engage: 'start',
};

export function crisproMlStageById(id: CrisproMlStageId) {
  return CRISPRO_ML_V1_STAGES.find((s) => s.id === id) ?? CRISPRO_ML_V1_STAGES[0];
}

export function crisproMlWeightsForStage(stageId: CrisproMlStageId) {
  return CRISPRO_ML_V1_WEIGHTS.filter((w) => w.stageId === stageId);
}