/**
 * AK therapy-fit bundle — TestClient receipts (not re-derived).
 * Source: crispr-assistant-main/oncology-coPilot/oncology-backend-minimal
 *   tests/test_therapy_fit_v4.py::test_bundle_top_level_v4_fields
 *   + live TestClient capture 2026-11-15 @ backend checkout 65a967d9 (Alpha lock f7d52461).
 */
import gate5 from '@/data/ayesha/therapy_fit_bundle_gate5_receipt.json';

export type TherapyFitAkScenario = 'day0' | 'door2';

export const THERAPY_FIT_BUNDLE_QUERY =
  '?level=l1&include_synthetic_lethality=false' as const;

export const THERAPY_FIT_AK_REQUEST: Record<TherapyFitAkScenario, Record<string, unknown>> = {
  day0: gate5.request_day0 as Record<string, unknown>,
  door2: gate5.request_door2_post_nact as Record<string, unknown>,
};

export const THERAPY_FIT_AK_SNAPSHOT: Record<
  TherapyFitAkScenario,
  {
    door_state: string;
    ranked_drugs: string[];
    contraindicated_blacklist: { drug_name: string; status: string }[];
  }
> = {
  day0: gate5.response_day0,
  door2: gate5.response_door2,
};

export const THERAPY_FIT_GATE5_META = gate5.meta;