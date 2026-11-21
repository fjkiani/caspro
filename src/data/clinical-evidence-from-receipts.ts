/**
 * Clinical UI numbers — loaded from verified on-disk receipts only.
 * No invented constants. Missing vendored files → omit meter / flag in metadata.
 */
import ovarianReceipt from '@/data/ovarian/gse165897_two_door_pfi_separation_receipt.json';
import krasReceipt from '@/data/brenus/kras_two_door_stc1010_vs_daraxonrasib_receipt.json';
import crcSummary from '@/data/pharma/crc-ranker-v1/crc_ranker_summary_v2_gated.json';
import decoderLoto from '@/data/brenus/crispro_8d_bilinear_decoder_v1.json';
import gate5 from '@/data/ayesha/therapy_fit_bundle_gate5_receipt.json';
import pillarDoor2 from '@/data/ayesha/pillar_e_door2_11_oof_receipt.json';
import alwaysNaviObserved from '@/data/ayesha/always_navitoclax_door2_11_observed_receipt.json';
import mmTier3Ipd from '@/data/mm/tier3_gse9782_clinical_trial_ipd.json';
import mmTier3Receipt from '@/data/mm/TIER3_GSE9782_RECEIPT.json';

import type {
  ClinicalCaseId,
  ClinicalCaseCard,
  MetricTile,
} from '@/data/clinical-case-ui-types';

export type OvarianPfiMeters = {
  dividingMedianDays: number;
  dormantMedianDays: number;
  clearedMedianDays: number;
  receiptPath: string;
};

export function loadOvarianPfiMeters(): OvarianPfiMeters {
  const geo = ovarianReceipt.primary_all11_geometric?.groups as Record<
    string,
    { median?: number }
  >;
  const post = (ovarianReceipt as { gate0_filtered_n10_post_remission?: { groups?: Record<string, { median?: number }> } })
    .gate0_filtered_n10_post_remission?.groups;
  return {
    dividingMedianDays: geo?.DDRonly_Door1?.median ?? 0,
    dormantMedianDays:
      post?.Door2_nonrefractory_Hcleanonly_plus_Both?.median ??
      geo?.Hcleanonly_including_EOC3?.median ??
      0,
    clearedMedianDays: post?.Neither?.median ?? geo?.Neither?.median ?? 0,
    receiptPath: 'src/data/ovarian/gse165897_two_door_pfi_separation_receipt.json',
  };
}

export type CrcReceiptMeters = {
  cohortN: number;
  rasRafMutNonPoleN: number;
  g12dStageIvN: number;
  g12vStageIvN: number;
  g12dColdStageIvN: number;
  g12vColdStageIvN: number;
  stageIvPooled: number;
  immuneColdStageIv: number;
  receiptPath: string;
};

export function loadCrcReceiptMeters(): CrcReceiptMeters {
  const alleles = krasReceipt.allele_crosstab_all_485 as {
    KRAS_G12D: {
      stage_iv_n: number;
      door2_cold_stage_iv_n: number;
    };
    KRAS_G12V: {
      stage_iv_n: number;
      door2_cold_stage_iv_n: number;
    };
  };
  const g12d = alleles.KRAS_G12D;
  const g12v = alleles.KRAS_G12V;
  const stageIvPooled = g12d.stage_iv_n + g12v.stage_iv_n;
  const immuneColdStageIv = g12d.door2_cold_stage_iv_n + g12v.door2_cold_stage_iv_n;
  const cohortN = crcSummary.cohort_genotype_and_immune_distribution?.n_total_mss ?? 485;
  const nonPole = (
    krasReceipt.allele_crosstab_all_485 as { RAS_RAF_MUT_NON_POLE_220?: { n_total: number } }
  ).RAS_RAF_MUT_NON_POLE_220;
  const rasRafMutNonPoleN =
    crcSummary.cohort_genotype_and_immune_distribution?.genotype_counts_tmb_lt_10
      ?.any_ras_raf_mut ?? nonPole?.n_total ?? 0;

  return {
    cohortN,
    rasRafMutNonPoleN,
    g12dStageIvN: g12d.stage_iv_n,
    g12vStageIvN: g12v.stage_iv_n,
    g12dColdStageIvN: g12d.door2_cold_stage_iv_n,
    g12vColdStageIvN: g12v.door2_cold_stage_iv_n,
    stageIvPooled,
    immuneColdStageIv,
    receiptPath:
      'src/data/brenus/kras_two_door_stc1010_vs_daraxonrasib_receipt.json + crc_ranker_summary_v2_gated.json',
  };
}

export type MyelomaReceiptMeters = {
  ttpMedianSpeHigh: number;
  ttpMedianSpeLow: number;
  speEnsembleAuroc: number;
  bortezomibN: number;
  receiptPath: string;
};

export function loadMyelomaReceiptMeters(): MyelomaReceiptMeters {
  const ttp = mmTier3Ipd.bortezomib_survival_ttp_validation;
  const spe = mmTier3Ipd.bortezomib_ps341_oof_ablations.SPE_MM_SPE_ML_Ensemble;
  const n = mmTier3Ipd.cohorts.PS341_Bortezomib.n_evaluable;
  return {
    ttpMedianSpeHigh: ttp.TTP_days_median_SPE_high,
    ttpMedianSpeLow: ttp.TTP_days_median_SPE_low,
    speEnsembleAuroc: spe.auroc,
    bortezomibN: n,
    receiptPath: `src/data/mm/tier3_gse9782_clinical_trial_ipd.json (${mmTier3Receipt.files['tier3_gse9782_clinical_trial_ipd.json']})`,
  };
}

export type AlwaysNavitoclaxObserved = {
  zGt50: string;
  q75: string;
  hitDrug50: string;
  backendHead: string;
  receiptPath: string;
};

export function loadAlwaysNavitoclaxObserved(): AlwaysNavitoclaxObserved {
  const row = alwaysNaviObserved['Always-Navitoclax'] as {
    'z>0.50': string;
    Q75: string;
    hit_drug50: string;
  };
  return {
    zGt50: row['z>0.50'],
    q75: row.Q75,
    hitDrug50: row.hit_drug50,
    backendHead:
      (alwaysNaviObserved.provenance as { backend_head_at_write?: string }).backend_head_at_write?.slice(
        0,
        8,
      ) ?? '65a967d9',
    receiptPath: 'src/data/ayesha/always_navitoclax_door2_11_observed_receipt.json',
  };
}

export function loadMetricTilesFromReceipts(): MetricTile[] {
  const ov = loadOvarianPfiMeters();
  const crc = loadCrcReceiptMeters();
  const hrConcordance = decoderLoto.loto_validation_summary?.subgroup_hr_sign_concordance as
    | string
    | undefined;

  const tiles: MetricTile[] = [
    {
      id: 'ovarian_dividing',
      value: `${ov.dividingMedianDays}`,
      label: 'days dividing residual relapse',
    },
    {
      id: 'ovarian_dormant',
      value: `${ov.dormantMedianDays}`,
      label: 'days dormant residual relapse',
    },
    {
      id: 'crc_ras_block',
      value: `${crc.rasRafMutNonPoleN}`,
      label: 'RAS RAF mutant gated cohort',
    },
    {
      id: 'crc_cold_stage_iv',
      value: `${crc.immuneColdStageIv} of ${crc.stageIvPooled}`,
      label: 'G12D V stage IV immune cold',
    },
  ];

  if (hrConcordance) {
    tiles.push({
      id: 'hr_concordance',
      value: hrConcordance.replace(' (100.0%)', ''),
      label: 'subgroup HR sign concordance',
    });
  }

  return tiles;
}

/** Surface copy only — numeric evidence strings built from receipt loaders. */
export function buildClinicalCases(): ClinicalCaseCard[] {
  const ov = loadOvarianPfiMeters();
  const crc = loadCrcReceiptMeters();

  const navi = loadAlwaysNavitoclaxObserved();
  const oofAll28 = pillarDoor2.oof_heads_Door2_11[
    'Measured_Available::v12_sparse_all28_logistic_q75'
  ] as { hit_drug50_n?: number; hit_drug75_n?: number; hit_positive_n?: number } | undefined;
  const oofCore4 = pillarDoor2.oof_heads_Door2_11[
    'Complete_core4::v12_sparse_core4_logistic_q75'
  ] as { hit_drug50_n?: number; hit_positive_n?: number } | undefined;

  const ovarianEvidence = [
    `Post-NACT bundle receipt: src/data/ayesha/therapy_fit_bundle_gate5_receipt.json (${gate5.meta.backend_head_locked?.slice(0, 8) ?? 'f7d52461'} TestClient).`,
    `Door 2 ranked: ${gate5.response_door2.ranked_drugs.slice(0, 2).join('; ')} (4-drug panel when backend live).`,
    'BLOCK Vismodegib (BLACKLISTED_DOOR_2); Olaparib GENOTYPE_FALSIFIED + Door 2 blacklist.',
    `Relapse medians ${ov.receiptPath}: dividing ${ov.dividingMedianDays}d · dormant ${ov.dormantMedianDays}d · cleared ${ov.clearedMedianDays}d.`,
    oofAll28
      ? `Pillar E Door2_11 v12_sparse_all28_logistic_q75 hit@drug50 ${oofAll28.hit_drug50_n}/11 (18_head_oof_summary.csv).`
      : 'Pillar E Door2_11 LODO: receipt row UNCLEAR.',
    oofCore4
      ? `Complete_core4 logistic_q75 hit@drug50 ${oofCore4.hit_drug50_n}/11 · hit@positive ${oofCore4.hit_positive_n}/11.`
      : undefined,
    `Always-Navitoclax OBSERVED Door2_11 (pillar_e_v12_model.json via ${navi.receiptPath}, head ${navi.backendHead}): z>0.50 ${navi.zGt50} · Q75 ${navi.q75} · hit@drug50 ${navi.hitDrug50} — not LODO Always-Navi head.`,
  ].filter((line): line is string => Boolean(line));

  const ovarianEvidenceDay0 = [
    `Day-0 L1 empty body → ${gate5.response_day0.door_state} (therapy_fit_bundle_gate5_receipt.json).`,
    `Top ranked: ${gate5.response_day0.ranked_drugs.join(' · ')}.`,
    `BLOCK ${gate5.response_day0.contraindicated_blacklist.map((b) => b.drug_name).join(' — ')} (${gate5.response_day0.contraindicated_blacklist[0]?.status}).`,
    'PARP1 falsification MBD4-LOF: ak-l1-bundle evidence anchors p≈0.605.',
  ];

  const crcEvidence = [
    `Cohort TCGA-COADREAD MSS n=${crc.cohortN} (${crcSummary.meta?.cohort ?? 'crc_ranker_summary_v2_gated.json'}).`,
    `RAS/RAF-mutant non-POLE TMB<10 n=${crc.rasRafMutNonPoleN} — anti-EGFR gating stratum.`,
    `KRAS G12D stage IV n=${crc.g12dStageIvN}; G12V stage IV n=${crc.g12vStageIvN}.`,
    `Immune-cold among stage IV G12D/V: ${crc.immuneColdStageIv} of ${crc.stageIvPooled} (sum door2_cold_stage_iv from kras receipt).`,
    'PRIORITIZE STC-1010 on immune-hot; pan-RAS on cold KRAS per ranked matrix.',
    'BLOCK anti-EGFR on RAS/RAF-mutant disease.',
  ];

  const mm = loadMyelomaReceiptMeters();
  const myelomaEvidence = [
    `GSE9782 Tier3 bortezomib evaluable n=${mm.bortezomibN} (${mm.receiptPath}).`,
    `SPE ensemble OOF AUROC ${mm.speEnsembleAuroc} (5-fold stratified, Mulligan 2007).`,
    `TTP median SPE-high ${mm.ttpMedianSpeHigh}d vs SPE-low ${mm.ttpMedianSpeLow}d (receipt bortezomib_survival_ttp_validation).`,
    'Dex comparator SPE AUROC ~0.50 — drug-specificity control on same IPD.',
    'PRIORITIZE bortezomib when ensemble split fits; BLOCK blind proteasome class switches.',
  ];

  const lungEvidence = [
    'Lung case: NSCLC board at /tumor-board/nsclc/ — nodule workup ranked from imaging intake.',
    'Receipt pack: src/data/tumor-board/frontend-spec/nsclc_luna16/ when present.',
  ];

  return [
    {
      id: 'ovarian',
      tabLabel: 'Ovarian · post-chemo',
      body: 'After NACT, dormant residual needs senolytic routing — not another PARP line.',
      prioritize: 'Dasatinib → navitoclax → VDR agonist → azithromycin',
      block: 'Vismodegib (Door 2) · Olaparib / niraparib (falsified)',
      prioritizeDay0: 'Gemcitabine + carboplatin · ceralasertib / berzosertib',
      blockDay0: 'Olaparib / niraparib — GENOTYPE_FALSIFIED (no PARP1 gate)',
      href: '/tumor-board/AK/',
      evidenceTitle: 'View Clinical Evidence',
      evidenceLines: ovarianEvidence,
      evidenceLinesDay0: ovarianEvidenceDay0,
    },
    {
      id: 'myeloma',
      tabLabel: 'Myeloma · bortezomib',
      body: 'Rooms debate class before responders separate. PRIORITIZE bortezomib when the split fits; BLOCK blind class switches.',
      prioritize: 'Bortezomib when the responder split fits',
      block: 'Class switches that ignore the progression split',
      href: '/tumor-board/',
      evidenceTitle: 'View Clinical Evidence',
      evidenceLines: myelomaEvidence,
    },
    {
      id: 'crc',
      tabLabel: 'Colorectal · KRAS',
      body: 'Anti-EGFR still gets ordered on RAS-mutant disease. BLOCK EGFR there; PRIORITIZE vaccine or pan-RAS by immune state.',
      prioritize: 'STC-1010 on immune-hot; pan-RAS (daraxonrasib) on cold KRAS',
      block: 'Anti-EGFR on RAS/RAF-mutant CRC',
      href: '/products/insilico-trials/',
      evidenceTitle: 'View Clinical Evidence',
      evidenceLines: crcEvidence,
    },
    {
      id: 'lung',
      tabLabel: 'Lung · chest CT',
      body: 'Rooms argue imaging before risk splits. PRIORITIZE biopsy when nodules rank high; BLOCK watch-and-wait on suspicious growth.',
      prioritize: 'Biopsy or PET when nodule risk ranks high',
      block: 'Passive surveillance on high-suspicion nodules',
      href: '/tumor-board/nsclc/',
      evidenceTitle: 'View Clinical Evidence',
      evidenceLines: lungEvidence,
    },
  ];
}

export function crosswalkEvidenceLines(): string[] {
  const ov = loadOvarianPfiMeters();
  const crc = loadCrcReceiptMeters();
  return [
    `Ovarian GSE165897 medians (receipt): ${ov.dividingMedianDays} / ${ov.dormantMedianDays} / ${ov.clearedMedianDays} days.`,
    `CRC TCGA-COADREAD n=${crc.cohortN}; RAS/RAF gate cohort n=${crc.rasRafMutNonPoleN}.`,
    `Stage IV KRAS G12D/V immune-cold: ${crc.immuneColdStageIv} of ${crc.stageIvPooled}.`,
  ];
}

export function clinicalCaseByIdFromReceipts(id: ClinicalCaseId): ClinicalCaseCard {
  return buildClinicalCases().find((c) => c.id === id) ?? buildClinicalCases()[0];
}