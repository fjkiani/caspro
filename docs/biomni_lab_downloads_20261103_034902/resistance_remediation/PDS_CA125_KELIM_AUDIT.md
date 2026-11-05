# PDS / Project Data Sphere — Live CA-125 Audit (KELIM source check)

**Date:** 2026-08-05  **Access:** live CAS connection, service account `mpm0fxk2`
**Question:** Does Project Data Sphere hold serial ovarian CA-125 that could calibrate the KELIM shim?
**Answer:** No — not for this account. Proven live, with signed receipts.

## Method
- Connected directly to the PDS CAS server (`swat.CAS`, REST/443) with the supplied service-account credentials.
- Credentials were loaded into a **local-only, non-repo env file, used in-memory, and shredded** after the run. Nothing was written to any repository or user-facing output; no secret is echoed here.
- Enumerated all caslibs (`table.caslibInfo`), inventoried every table (`table.fileInfo`), and for the 34 lab/marker/chemistry tables loaded each and enumerated its analyte panel (`columnInfo` + format-cleared `simple.freq` / raw `fetch`).

## What is in the account
- **102 caslibs → 94 disease trials across 15 indications.** Prostate 19, Breast 17, Colorectal 16, Lung (NSCLC+SCLC) 15, Pancreas 6, "Multiple" 6, Gastric 4, Head & Neck 4, Glioma 2, Kidney/Liver/Lymphoma/Melanoma/Myelodysplasia 1 each; plus SAS system/sample libraries.
- **ZERO ovarian or gynecologic trials.** The only "Clovis" library is `Pancrea_ClovisO_2010_186` — Clovis Oncology's **pancreatic** CO-101 study, not the ARIEL ovarian program.
- The CAS-visible platform catalog (`PDSInfo`, `PDSSamples`, `Samples`) exposes only this account's provisioned libraries plus generic SAS demo data (a prostate sample table, retail/water/warranty samples) — no requestable-trial index.

## CA-125 search result
- **472 tabular tables → 0 with CA-125 in the filename.**
- **34 lab/marker/chemistry tables load-scanned and analyte-enumerated → 0 CA-125** (column names or analyte values), regex `ca[\s._-]?125|cancer\s*antigen\s*125|\bca125\b`.
- Tumour markers **actually present** (disease-appropriate, not CA-125):
  - **CEA** (Carcinoembryonic Antigen) — colorectal Amgen 20040249/262/263/264/309/310, Pfizer 114 (`LBTEST`/`LBTESTCD=CEA`).
  - **CA 19-9** — Clovis pancreatic `Pancrea_ClovisO_2010_186/adlb` (`PARAM=Cancer Antigen 19-9 (U/mL)`, `PARAMCD=CA19_9AG`).
  - **AFP** (Alpha Fetoprotein) — `Liver_Pfizer_2008_124/lab_safe`.
  - **beta-hCG** — colorectal Amgen 262, SCLC EliLill 287.
- Note: the `CA` column seen in prostate sample tables is **calcium**, not CA-125.

## Conclusion
- **PDS (account `mpm0fxk2`) cannot source serial on-treatment ovarian CA-125.** KELIM therefore remains a **GENUINE DATA GAP**, not a sandbagged/relabelable one. This is the airtight, receipted version of the earlier "PDS has no ovarian arm" statement — now verified by a live connection and a full analyte scan rather than a stale broker summary.
- CA-125 is absent for the expected biological reason: it is the ovarian marker, and there is no ovarian trial in the account.

## The only PDS path to ovarian CA-125
- Submit a **web-portal data request** (`data.projectdatasphere.org`) for a specific ovarian donation that collected serial on-treatment CA-125. Once granted, it appears as a new CAS caslib and is extractable. This is an owner-gated **acquisition** step (days–weeks), outside today's CAS access, and requires the portal email login (not the CAS service account).
- KELIM-appropriate acquisition targets remain: front-line HGSOC trials with ≥3 dated on-treatment CA-125 (e.g., GINECO/You-et-al validation cohorts, ICON7, GOG-218, AGO-OVAR) — some may be requestable via PDS; availability must be confirmed on the portal.

## Receipts (sha256-signed)
- `receipts/pds_ca125_inventory.json` — full caslib + 472-table inventory, candidate flagging, platform-catalog probe.
- `receipts/pds_ca125_value_scan.json` (+ `.sha256`) — first analyte value scan (0 hits; some formatted columns skipped).
- `receipts/pds_ca125_rescan.json` (+ `.sha256`) — format-safe re-scan closing that gap; per-table analyte panels; 0 CA-125.
