#!/usr/bin/env python3
"""
OBL#3 step 0 - Build the patient-level master table for the s3 (HRD-axis)
diagnosis-stage association, joining published BriTROC-1 source data:

  figure_4A.tsv        -> CN signature exposures s1-s7 (diagnosis 'arx' + relapse 'rlps'), PATIENT_ID
  figure_1B_layer_1.tsv-> overall survival (status deceased/alive, OS time)
  figure_2.tsv         -> confounders: age, stage, histology, BRCA/HR gene mutation status, pt_sensitivity_at_reg

Signature identity (resolved from source literature, see OBL3_SIGNATURE_IDENTITY.md):
  s3 = BRCA1/2-related HRD axis (Macintyre 2018 Nat Genet; positively prognostic).
  Nature Comm 2023: s3 is LOWER and s1 HIGHER in the primary-resistant population at diagnosis.
  => higher s3 associates with SENSITIVITY (protective direction).

Outcome for the resistance analysis: platinum status at registration
  (pt_sensitivity_at_reg), the field Nature uses for "primary platinum resistant".

Writes: tables/obl3_patient_master.csv
"""
import numpy as np
import pandas as pd

DATA = "/workspace/obl_work/data/moesm10/source_data"
OUT = "/mnt/results/serial_sae_validation/obligations/tables"


def patient_num(pid):
    """'BRITROC-55' -> 55 (int) to join with figure_1B/figure_2 britroc_number."""
    return int(str(pid).split("-")[-1])


def main():
    # ---- exposures (diagnosis + relapse), per patient ----
    f = pd.read_csv(f"{DATA}/figure_4A.tsv", sep="\t")
    f["value"] = pd.to_numeric(f["value"], errors="coerce")
    diag = f[f["group"] == "arx"].pivot_table(index="PATIENT_ID", columns="signature", values="value", aggfunc="mean")
    rel = f[f["group"] == "rlps"].pivot_table(index="PATIENT_ID", columns="signature", values="value", aggfunc="mean")
    diag.columns = [f"{c}_diag" for c in diag.columns]
    rel.columns = [f"{c}_rel" for c in rel.columns]
    expo = diag.join(rel, how="outer")
    expo["britroc_number"] = [patient_num(p) for p in expo.index]
    expo = expo.reset_index().rename(columns={"PATIENT_ID": "patient_id"})

    # ---- survival: one OS time + event per patient ----
    s = pd.read_csv(f"{DATA}/figure_1B_layer_1.tsv", sep="\t")
    os_rows = s[s["event"] == "os"].copy()
    os_rows["os_time"] = pd.to_numeric(os_rows["time"], errors="coerce")
    os_rows["os_event"] = (os_rows["status"] == "deceased").astype(int)  # 1 = death
    surv = os_rows[["britroc_number", "pt_sensitivity_at_reg", "os_time", "os_event"]].drop_duplicates("britroc_number")

    # ---- confounders (one row/patient): age, stage, histology, HR-gene mutation ----
    c = pd.read_csv(f"{DATA}/figure_2.tsv", sep="\t")
    # BRCA/HR pathogenic status: any 'mutation' (shared/private) in BRCA1/BRCA2 -> BRCA-mutant
    c["is_mut"] = c["variant_type"].astype(str).str.contains("mutation", case=False) & \
                  ~c["variant_type"].astype(str).str.contains("no mutation", case=False)
    brca_genes = ["BRCA1", "BRCA2"]
    hr_genes = ["BRCA1", "BRCA2", "BARD1", "BRIP1", "PALB2", "RAD51B", "RAD51C", "RAD51D", "CDK12"]
    brca_status = c[c["gene_list"].isin(brca_genes)].groupby("britroc_number")["is_mut"].any().rename("brca_mut")
    hr_status = c[c["gene_list"].isin(hr_genes)].groupby("britroc_number")["is_mut"].any().rename("hr_gene_mut")
    demo = c.drop_duplicates("britroc_number").set_index("britroc_number")[
        ["age", "histological_type", "tumour_stage_at_diagnosis", "num_lines", "pt_sensitivity_at_reg"]
    ]
    conf = demo.join(brca_status).join(hr_status).reset_index()

    # ---- merge everything on britroc_number ----
    m = expo.merge(surv, on="britroc_number", how="left", suffixes=("", "_surv"))
    m = m.merge(conf, on="britroc_number", how="left", suffixes=("", "_conf"))

    # unify platinum-status label (prefer figure_2, fall back to survival file)
    def norm_status(x):
        if pd.isna(x):
            return np.nan
        x = str(x).lower()
        if "resist" in x:
            return "resistant"
        if "sensit" in x:
            return "sensitive"
        return np.nan
    m["pt_status"] = m["pt_sensitivity_at_reg"].map(norm_status)
    m.loc[m["pt_status"].isna(), "pt_status"] = m["pt_sensitivity_at_reg_conf"].map(norm_status)
    m["resistant"] = (m["pt_status"] == "resistant").astype("Int64")

    keep = ["patient_id", "britroc_number", "pt_status", "resistant",
            "s1_diag", "s2_diag", "s3_diag", "s4_diag", "s5_diag", "s6_diag", "s7_diag",
            "s1_rel", "s2_rel", "s3_rel", "s4_rel", "s5_rel", "s6_rel", "s7_rel",
            "os_time", "os_event", "age", "histological_type", "tumour_stage_at_diagnosis",
            "num_lines", "brca_mut", "hr_gene_mut"]
    keep = [k for k in keep if k in m.columns]
    master = m[keep].drop_duplicates("britroc_number").reset_index(drop=True)
    master.to_csv(f"{OUT}/obl3_patient_master.csv", index=False)

    print("=== obl3_patient_master.csv ===")
    print("shape:", master.shape)
    print("patients with s3_diag:", master["s3_diag"].notna().sum())
    print("patients with pt_status:", master["pt_status"].notna().sum())
    print("resistance split (all with status):")
    print(master["pt_status"].value_counts(dropna=False))
    print()
    print("patients with BOTH s3_diag AND pt_status:",
          (master["s3_diag"].notna() & master["pt_status"].notna()).sum())
    both = master[master["s3_diag"].notna() & master["pt_status"].notna()]
    print("  of those, resistance split:", both["pt_status"].value_counts().to_dict())
    print("patients with OS (event/time):", (master["os_time"].notna() & master["os_event"].notna()).sum())
    print("  OS deaths:", int(master["os_event"].fillna(0).sum()))
    print("BRCA-mutant (any):", int(master["brca_mut"].fillna(False).sum()),
          "| HR-gene mutant (any):", int(master["hr_gene_mut"].fillna(False).sum()))
    print("resistance events among those with s3_diag (the modeling set):",
          int(both["resistant"].sum()))


if __name__ == "__main__":
    main()
