#!/usr/bin/env python3
"""
run_w2.py -- W2: from-source reproduction and denominator reconciliation.

Acquires the published source under checksum enforcement, rebuilds the patient
table, diffs it cell-by-cell against BOTH archived tables, and reconciles the two
competing denominators (n=98 vs n=67).

Reproduction is claimed only if the diff is clean. Otherwise the discrepancy is
the deliverable.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
import pandas as pd

sys.path.insert(0, "/workspace/s3work")
from s3_pipeline import build_cohort, provenance

OUT = Path("/mnt/results/resistance_prophet_s3")
WORK = Path("/workspace/s3work/verified")
ARCHIVED_OBL3 = "/mnt/results/serial_sae_validation/obligations/tables/obl3_patient_master.csv"
ARCHIVED_BRENUS = "/workspace/Brenus/clinical_validation/trackA/britroc_master_published.csv"
CACHE = "/tmp/moesm10_test.zip"


def main():
    (OUT / "tables").mkdir(parents=True, exist_ok=True)
    (OUT / "figures").mkdir(parents=True, exist_ok=True)
    report = {}

    # ---- Gate A: verified acquisition ----
    man = provenance.acquire(WORK, archive_cache=CACHE if Path(CACHE).exists() else None)
    man.to_json(OUT / "source_manifest.json")
    report["source_manifest"] = json.loads(json.dumps(man.__dict__, default=str))
    report["env_fingerprint"] = provenance.env_fingerprint()
    print("[Gate A] archive verified:", man.archive_sha256[:16], "...", man.archive_bytes, "bytes")
    for k, v in man.member_sha256.items():
        print(f"         {k}: {v}")

    # ---- rebuild ----
    faithful = build_cohort.build(man.extracted_to, strict_missing=False)
    strict = build_cohort.build(man.extracted_to, strict_missing=True)
    m = faithful.master
    print(f"\n[rebuild] shape={m.shape}  patients={m['britroc_number'].nunique()}")
    print("[rebuild] pt_status:", m["pt_status"].value_counts(dropna=False).to_dict())

    # ---- diff vs archived tables ----
    obl3 = pd.read_csv(ARCHIVED_OBL3)
    d_obl3 = build_cohort.diff_tables(m, obl3)
    report["diff_vs_obl3_patient_master"] = d_obl3
    print(f"\n[diff vs obl3_patient_master] clean={d_obl3['clean']} "
          f"mismatched_cells={d_obl3['total_mismatched_cells']}")
    if not d_obl3["clean"]:
        for c, v in d_obl3["per_column"].items():
            if v["n_mismatch"]:
                print(f"   {c}: {v['n_mismatch']} mismatches, max_abs={v['max_abs_diff']}, "
                      f"eg={v['example_keys']}")

    bren = pd.read_csv(ARCHIVED_BRENUS)
    bren_ren = bren.rename(columns={"patient": "britroc_number"})
    if bren_ren["britroc_number"].dtype == object:
        bren_ren["britroc_number"] = bren_ren["britroc_number"].astype(str).str.extract(r"(\d+)$")[0].astype(int)
    d_bren = build_cohort.diff_tables(m, bren_ren)
    report["diff_vs_britroc_master_published"] = d_bren
    print(f"[diff vs britroc_master_published] clean={d_bren['clean']} "
          f"mismatched_cells={d_bren['total_mismatched_cells']}")
    for c, v in d_bren["per_column"].items():
        if v["n_mismatch"]:
            print(f"   {c}: {v['n_mismatch']} mismatches, max_abs={v['max_abs_diff']}, "
                  f"eg={v['example_keys']}")

    # ---- denominator reconciliation ----
    recon = faithful.reconciliation
    recon.to_csv(OUT / "denominator_reconciliation.csv", index=False)
    print("\n[denominator ladder]")
    print(recon.to_string(index=False))

    sel = build_cohort.selection_test(m)
    report["selection_tests"] = sel
    print("\n[selection tests]")
    print(json.dumps(sel, indent=2, default=str))

    report["build_notes"] = faithful.notes
    report["strict_missing_delta"] = {
        "faithful_n_resistant_encoded": int(pd.to_numeric(faithful.master["resistant"],
                                                          errors="coerce").fillna(-1).eq(1).sum()),
        "faithful_n_zero_encoded": int(pd.to_numeric(faithful.master["resistant"],
                                                     errors="coerce").fillna(-1).eq(0).sum()),
        "strict_n_missing_label": int(strict.master["resistant"].isna().sum()),
        "consequence": ("in the faithful (archived) encoding, patients with NO platinum label "
                        "are encoded resistant=0; any analysis that filters on `resistant` "
                        "rather than on `pt_status.notna()` would silently treat unlabelled "
                        "patients as platinum-sensitive"),
    }
    print("\n[strict-missing delta]", json.dumps(report["strict_missing_delta"], indent=2))

    m.to_csv(OUT / "tables" / "rebuilt_patient_master.csv", index=False)
    with open(OUT / "w2_reproduction.json", "w") as fh:
        json.dump(report, fh, indent=2, default=str)
    print("\n[written]", OUT / "w2_reproduction.json")
    return report


if __name__ == "__main__":
    main()
