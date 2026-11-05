# TARGET ACQUISITION PLAYBOOK — HGSOC True-Resistance Controlled Data

Discovery + ingestion-engineering output for the controlled/authenticated clinical-trial
datasets needed to replace watered-down proxy endpoints. **This is a discovery + ready-to-run
ingestion package, not a data dump.** No framework code was modified; no controlled data was
downloaded (it cannot be, from here — see the honesty boundary).

## Honesty boundary (read first)
Controlled-access **data** can only be pulled with **your** signed-DUA / DAC-approved per-user
login. This environment has **no** PDS/dbGaP/EGA credentials (only a Synapse token). Therefore:
- Public **metadata** was retrieved and verified where possible (marked `verified_metadata_bool: true`).
- Controlled **data** access is scripted and gated behind your credentials (`SCRIPT_READY_PENDING_USER_AUTH`).
- Nothing is called "downloaded/reviewed" unless it was genuinely connected this run.

`access_state` values: `METADATA_VERIFIED_PUBLIC` · `OPEN_PULLABLE_NOW` ·
`SCRIPT_READY_PENDING_USER_AUTH` · `REQUEST_FROM_AUTHORS` · `UNAVAILABLE`.

---

## What each target cures

| Watered-down claim (prior run) | Cure dataset(s) | Endpoint enabled | Access state |
|---|---|---|---|
| KELIM pointed at PLCO **screening** CA-125 | **PDS: GOG-0218 / ICON7 / AGO-OVAR16** (in-treatment serial CA-125) | KELIM on real chemo-response | SCRIPT_READY_PENDING_USER_AUTH |
| OS used as **proxy** for platinum resistance | **dbGaP: GOG-0218** (NRG) primary; **TCGA-OV `phs000178.v11.p8`** alternate | true PFI + HRR→platinum-PFS | SCRIPT_READY_PENDING_USER_AUTH |
| Sig7 / Serial-SAE unvalidated on real resistance | **EGA: BriTROC-1 `EGAD00001011049`** — **182 paired diagnosis+relapse subjects** | CN signatures + serial SAE on **acquired** resistance | METADATA_VERIFIED_PUBLIC (files) / pending-auth (download) |
| ctDNA locked `WIRED_PROGNOSTIC_ONLY_V1` | **BriTROC-1 plasma** (TIER1-direct, EGA-controlled) | ctDNA-TF → resistance-probability calibration | SCRIPT_READY_PENDING_USER_AUTH |

---

## W1 — Project Data Sphere (KELIM / in-treatment CA-125)
- **Targets (ranked):** GOG-0218 (NCT00262847, n=1873, CA-125 in outcomes) → strongest KELIM anchor;
  ICON7 (NCT00483782, n=1520); AGO-OVAR16 (NCT00866697, n=940); GOG-0262; MITO-7.
- **Verified:** all 8 candidate trials resolved on ClinicalTrials.gov (phase, enrollment, CA-125-in-outcomes flag).
- **Honest gap:** PDS dataset IDs are **portal-internal** — only enumerable after a signed DUA + Research
  Access login. The NCT + sponsor is the stable public handle to locate each deposit.
- **KELIM data need:** ≥3 serial CA-125 within the first ~100 days of platinum (t0 = first platinum dose).
- **Ingest:** `ingest_master.py --source pds --trial GOG-0218` (needs `PDS_USER`/`PDS_PASSWORD` + DUA).

## W2 — dbGaP (true PFI + germline/somatic HRR)
- **GOG-0218:** specimen/germline deposit is under **NRG Oncology** dbGaP submissions; exact `phs` is
  confirmed from the NRG/GOG **study report at DAR time**. `"GOG-0218"` is **not** a dbGaP search token
  (verified: e-utils `gap` esummary returns empty study names and no `phs`).
- **Alternate (confirmed):** **TCGA-OV `phs000178.v11.p8`** (study page resolves; "Ovarian/Serous/TCGA";
  version history v1.p1→v11.p8) — PFS/PFI + germline + somatic HRR at n≈580.
- **Ingest:** `ingest_master.py --source dbgap --phs phs000178.v11.p8` (needs `DBGAP_NGC` from approved DAR;
  phenotype/PFI tables are in the study's dbGaP phenotype files, not SRA).

## W3 — EGA BriTROC-1 `EGAD00001011049` (Sig7 + Serial-SAE) — FLAGSHIP, metadata verified
- **Verified from public metadata:** 679 files, **475.8 GiB**, **349 BAMs**, each with EGAF accession +
  MD5 + CRG/EBI mirrors.
- **Pairing (verified):** 265 subjects; **385 "diagnosis tumour DNA" + 294 "relapse tumour DNA"**;
  **182 subjects carry BOTH** → 182 diagnosis/relapse pairs for Serial-SAE and CN-signature (Sig7) analysis
  on a **true acquired-resistance** endpoint. Join key = `subject_id` + sample `title`.
- **Alternates:** AOCS / OV-AU (ICGC), PCAWG ovarian.
- **Ingest:** `ingest_master.py --source ega --dataset EGAD00001011049` (needs `EGA_CREDENTIALS` + BriTROC-1 DAC).

## W4 — ctDNA tumor-fraction ↔ resistance calibration
- **Ranked by directness:** TIER1_DIRECT = **BriTROC-1 plasma** (per-patient longitudinal TF paired with
  true relapse; EGA-controlled, overlaps W3). TIER2 = PLD-monitoring PROC trial (NCT05976932),
  Christie/Manchester sWGS-TF-vs-CA125, HGSOC MRD cohorts. TIER3 = MITO16a/Paracchini (prognostic-only, already held).
- **Honest gap:** **no open cohort** ships per-patient longitudinal ctDNA TF paired with a resistance label
  as a download. Removing `WIRED_PROGNOSTIC_ONLY_V1` requires a **TIER1** cohort that must be **applied for**
  (BriTROC-1 plasma is the concrete path) — it is **not** satisfiable from open data today.
- **Calibration need:** `ctdna_tumor_fraction` × `timepoint_day` × `platinum_resistance_label (PFI<182d)` per patient.

## W5 — Author mining (Scholar `yS47gHMAAAAJ`) — CONNECTED
- **Resolved:** **Marc J Williams** (cancer-evolution / tumour genomics). Profile scraped (HTTP 200, no captcha).
- **Dataset-yielding papers (HGSOC, relevant):**
  1. *Ovarian cancer mutational processes drive site-specific immune evasion* — Nature 2022, 10.1038/s41586-022-05496-1
     (**MSK SPECTRUM**: 42 HGSOC pts, 160 multi-site biopsies; scRNA-seq + tumour-normal WGS + MSK-IMPACT).
     Accessions: Synapse **`syn25569736`** (open) · dbGaP **`phs002857`** (controlled) · cBioPortal `msk_spectrum_tme_2022`.
  2. *Ongoing genome doubling shapes evolvability and immunity in ovarian cancer* — Nature 2025, 10.1038/s41586-025-09240-3.
     Accessions: Synapse `syn66366718`/`syn66366960`/`syn33521743`/`syn66477498` · dbGaP `phs002857.v3.p1` · GEO **`GSE180661`**.
- **Genuinely connected this run:** the MSK SPECTRUM Synapse project **`syn25569736`** was opened live via the
  in-session Synapse token (Sage Project, created 2021-04-19), with child folders for both papers confirmed.
  Open-tier = `OPEN_PULLABLE_NOW`; raw WGS/scWGS = dbGaP-controlled.
- **Relevance:** HGSOC WGS mutational-signature classes (HRD-Dup/HRD-Del/FBI), CCNE1/MYC amplification, WGD
  dynamics — directly feeds **Sig7** signature biology from a cohort we can actually reach.

---

## How to run (safe by default)
```bash
# 1) Dry-run: reachability + exact request shape, touches NO controlled data
./INGEST_MASTER.sh
python3 ingest_master.py --all --dry-run

# 2) Export YOUR credentials (never committed, never in these files)
export EGA_CREDENTIALS=/path/to/ega_credentials.json     # BriTROC-1 DAC approved
export DBGAP_NGC=/path/to/prj_XXXXX.ngc                   # dbGaP DAR approved
export DBGAP_PHS=phs000178.v11.p8
export PDS_USER=...  PDS_PASSWORD=...                     # PDS DUA signed
export SYNAPSE_AUTH_TOKEN=...                             # open-tier pullable now

# 3) Execute a specific source once creds + approvals are in place
./INGEST_MASTER.sh --execute ega
./INGEST_MASTER.sh --execute all
```

## Files in this package
- `CONTROLLED_DATA_MANIFEST.json` — 17 records, schema-locked, per-record `access_state` + `verified_metadata_bool`.
- `ingest_master.py` — unified driver (`--dry-run` default; `--execute` gated on your env creds).
- `INGEST_MASTER.sh` — one-touch wrapper.
- `w2_dbgap_ingest.sh`, `w3_ega_ingest.sh` — standalone per-source pull scripts.
- Per-worker evidence: `w1_pds_targets.json`, `w2_dbgap_targets.json`, `w3_ega_targets.json`,
  `w4_ctdna_targets.json`, `w5_author_datasets.json`.

## Immediate user actions to unblock real acquisition
1. **EGA:** apply to the BriTROC-1 DAC for `EGAD00001011049` (flagship; 182 verified pairs).
2. **dbGaP:** file a DAR — `phs000178.v11.p8` now (works immediately) and resolve the GOG-0218 NRG `phs` from its study report.
3. **PDS:** register for Research Access + sign the DUA, then locate the GOG-0218/ICON7 deposits.
4. **ctDNA:** decide whether to pursue BriTROC-1 plasma (only TIER1 route) — no open substitute exists.
