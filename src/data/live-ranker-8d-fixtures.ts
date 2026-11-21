/** MOAT POST /v1/ranker/8d/bilinear — proxy defaults when LiveRunner sends only caseId. */
export const RANKER_8D_AK_OVARIAN = {
  patient_id: 'AK_DAY0_MBD4_TP53',
  domain: 'ovarian' as const,
  clinical_features: {
    mbd4_lof: true,
    tp53_mut: true,
    fga: 0.42,
    s3_z: 1.25,
    h_clean: -0.85,
    s_sen: -0.6,
  },
};

export const RANKER_8D_AK_P_SIGNED = {
  patient_id: 'AK_DAY0_MBD4_TP53',
  domain: 'ovarian' as const,
  p_signed_8d: [0.85, -0.45, 0.0, -0.3, 0.25, -0.2, 0.15, 0.35],
};

/** CRC bilinear uses clinical_features from STC-1010 immune-hot gate stratum when live. */
export const RANKER_8D_CRC_GATE2_HOT = {
  patient_id: 'CRC01_MSS_GATE2_IMMUNE_HOT',
  domain: 'crc' as const,
  p_signed_8d: [0.1, 0.3, 0.1, 0.2, 0.0, 0.8, 0.1, 0.1],
};