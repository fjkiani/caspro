/**
 * governance-master.ts
 * SOURCE: crispro_master_pipeline.json · governance section
 */

export interface GovernanceQuarantine {
  id: string;
  status: string;
  description: string;
  date_flagged?: string;
  rationale?: string;
}

export const GOVERNANCE_MASTER = {
  "formula": {
    "name": "LATIFY PATH A",
    "formula": "fit = clip((p\u00b7t) / \u2016t\u2016\u2082, 0, 1)",
    "status": "LOCKED",
    "signed": "2026-04-28",
    "signer": "Fahad Kiani",
    "PATH_B": "PROHIBITED"
  },
  "formula_status": "",
  "formula_signed": "",
  "quarantine_log": [
    {
      "id": "DL-07",
      "status": "QUARANTINED",
      "description": "DDR 0.983 figure \u2014 publication-blocking. Do not use in any external output."
    },
    {
      "id": "LATIFY_delta",
      "status": "QUARANTINED",
      "description": "CT-03 blocker: patent delta +0.366 vs receipt delta +0.2641 \u2014 vector version unresolved."
    }
  ],
  "downgrade_log": [
    {
      "id": "PC-02",
      "status": "PERMANENTLY_DOWNGRADED",
      "description": "retroactive_prediction_run.py --trial-vectors has not cleanly reproduced documented deltas."
    }
  ],
  "active_conflicts": [
    {
      "id": "SC-001",
      "status": "ACTIVE_CONFLICT",
      "description": "HT29 BRAF V600E conflict \u2014 blocks L4 CLEAN."
    }
  ],
  "permanently_closed": [
    {
      "id": "GBM_ZEB1",
      "status": "PERMANENTLY_CLOSED",
      "description": "ZEB1 as GBM recurrence escape marker \u2014 3 datasets, all null/contradicted. Do not reopen without new evidence."
    }
  ],
  "remediation": {
    "status": "8D_remediation_approved_2026-04-28",
    "immediate_downgrades_applied": true,
    "formula_dependent_items": "QUARANTINED \u2014 PATH A recomputation pending",
    "path_a_vs_path_b_decision": "PATH A SIGNED \u2014 PATH B PROHIBITED"
  }
} as const;
