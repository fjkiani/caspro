# ARGO Audit — Adjudication of External Critiques (measured evidence)

Date: 2026-07-25. Token under test: the 30-day ARGO API token issued to this session.
Endpoint tested: `https://api.platform.icgc-argo.org/graphql` (ARGO platform) and
`https://api.platform.icgc-argo.org/storage-api` (Score download gateway).

Every verdict below is backed by a live API response captured this session, not by
recollection or by either critique's assertions.

---

## Summary table

| Critique claim | Verdict | Evidence |
|---|---|---|
| "response_to_therapy is OPEN ACCESS; agent hit wrong endpoint; re-query platform GraphQL with Bearer token" | **REFUTED for ARGO** | `clinicalData(...)` with the token → `403 Request forbidden / UNAUTHENTICATED`; without token → `401`. `programDonorSummary` with token → `UNAUTHORIZED`. `response_to_treatment` is **not even a queryable field** on the public `fileAggregations` schema. |
| Token failure was an "endpoint mistake"; a valid DACO token would work at platform GraphQL | **REFUTED** | `self` → `jwt malformed`. The API token is an opaque key, not a JWT. The clinical GraphQL requires an EGO **JWT** (interactive login), a different auth path from the Score storage API key. |
| Relapse-proxy count (1,003) is an undercount because 4 metastatic sub-types were queried as one | **REFUTED** | Audit code matches by prefix: `key.startswith("Metastatic")` / `startswith("Recurrent")`. This captures every sub-type ("... metastasis to distant location", "... local to lymph node", "... additional metastatic"). Full-index aggregation confirms those sub-types (256 + 24 files) were within scope. |
| POG-CA contains gynecologic/ovarian cases (~8%); "no ovarian" was too strong | **PARTIALLY CORRECT — caveat adopted** | POG (BC Cancer Personalized OncoGenomics) is documented pan-cancer and plausibly contains gynecologic cases. BUT this **cannot be confirmed via this token**: `clinical__donor__primary_site` for POG-CA = `__missing__` for all 36,421 files; `specimen_tissue_source` has no ovary/gyn category. Caveat softened accordingly; specific "44 ovarian / 37 metastatic / 12 PD" numbers are **not reproducible** with the credential held. |
| The "Final Report" figures: 44 ovarian donors, 1,775 files, response labels populated (40 PR / 12 PD / 10 SD), 100% clinical data available | **NOT VERIFIABLE — treated as un-sourced** | These are portal-UI-style figures. They cannot be produced from the token via API (clinical fields gated + primary_site `__missing__`). Not adopted into any deliverable as fact. |
| Computed copy numbers / CN calls are open access | **MIXED** | ICGC (legacy DCC) policy did tier computed CN as open. In **ARGO**, the CN VCF/TGZ objects I pulled were served through the **controlled** Score storage-api and required the DACO-gated token; 97.5% of files are file_access=controlled. So "open access CN" is true of legacy ICGC-DCC, not of ARGO as accessed here. |

---

## The core conflation in both critiques

The critiques cite the **ICGC Data Access Framework v3.0** ("Open vs Controlled" field table).
That framework governs the **legacy ICGC 25K / DCC portal** (`dcc.icgc.org`). The dataset
audited here is **ICGC ARGO** (`platform.icgc-argo.org`) — a *different* platform with a
*different* access model. In ARGO:

- The public **file index** (Arranger GraphQL, no token) exposes file-level facets only
  (study, specimen_type, data_type, file_access, tissue_source). Donor clinical fields
  (`primary_site`, `vital_status`, `response_to_treatment`, `relapse_type`) are present in
  the schema but return `__missing__` or are not queryable there.
- The **clinical service** (`programDonorSummary`, `clinicalData`) is DACO-gated and requires
  an **EGO JWT** via login. The API key returns `jwt malformed` / `UNAUTHORIZED` / `403`.
- The **Score storage-api** accepts the API key and serves controlled molecular objects
  (BAM/VCF/TGZ) — this is what was proven end-to-end (55 MB ASCAT download, checksum verified;
  631 CN VCFs pulled).

So the token unlocks **controlled molecular files**, not **controlled clinical tables**.
That is the precise, non-obvious boundary, and it is why therapy-response labels remain
inaccessible with the credential held — not an endpoint typo.

---

## What the critiques got right (adopted)

1. **Specimen-type vocabulary is richer than a two-word summary.** The full ARGO vocabulary
   includes granular metastatic sub-types. My audit already captured them via prefix-match,
   but the feasibility doc now lists the full vocabulary explicitly for transparency.
2. **"No ovarian" was too absolute.** Corrected to: *no dedicated ovarian program; POG-CA is
   pan-cancer and may contain gynecologic/ovarian cases, but this cannot be confirmed or counted
   with the current API token because primary_site/histology are gated/unpopulated in the public index.*

## What the critiques got wrong (rejected, with receipts)

1. Therapy-response labels are **not** openly queryable in ARGO with this token (403/UNAUTHORIZED).
2. The 1,003 relapse-proxy count is **not** an undercount from missing sub-types (prefix-match caught them).
3. The precise ovarian/response figures are **not reproducible** from the API and are not adopted.

---

## Separate dataset note (EGA / BriTROC-1 / Zenodo)

The second critique pivots to a **different dataset** — EGA `EGAD00001011049` (BriTROC-1,
276 patients / 67 platinum-resistant / 679 BAMs) and a Zenodo pre-processed CN release.
**No such EGA/BriTROC/Zenodo analysis was performed in this ARGO session.** That critique is
not about the ARGO deliverables in this folder; it describes work on a different cohort that
this session did not run. It is logged here only to avoid conflating the two. If a BriTROC-1
platinum-resistance CN-signature analysis is wanted, that is a new, separate task (open-access
Zenodo CN profiles would indeed be the right, DAC-free entry point — that specific point is sound).
