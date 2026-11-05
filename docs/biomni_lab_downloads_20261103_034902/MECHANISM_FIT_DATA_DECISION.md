# Mechanism-Fit Data Decision

**Runtime:** `SHADOW_ONLY / NOT RELEASED`  
**Audit rows:** 50  
**Audit SHA-256:** `9b7303585918d878c491e3b10e8b58e0c879c88c3ce9ec4c3c418362b07ae54a`

## A. Mechanism-fit relevance benchmark — NOT POSSIBLE FROM AVAILABLE DATA

No eligible source combination exists. The audit found **zero** named, qualified, independent, blinded, attested case-level case-to-trial relevance labels and no qualifying observed wrong-context, missingness, or refusal controls. The available internal case artifacts are either engine-derived traces or lack a provenance-complete source packet. The only present trial database has **2,897** rows and SHA-256 `a9c967270dd0e188eb113a0dcbca49a2dd33c118ee905f30331b8a5d9e4a9926`; it does not match the frozen substrate claim of **3,195** registry records, **1,249** active source-backed vectors, and SHA-256 `c2c248c975dc3dd776ba2cc8b78a7a2eb97b06fe6e9c11bfcd018593468b97a8`. Therefore a blinded review set cannot be constructed from a verified frozen case-plus-trial substrate in this execution.

**Specific blockers:** independent relevance labels and attestation; provenance-complete real case packets; independent negative/refusal controls; matching frozen trial/vector corpus.

## B. Outcome-prediction benchmark — BLOCKED BY SPECIFIC FIELD

Public ovarian cohorts provide strong near-misses but none satisfies the approved gate requiring a pretreatment molecular input, treatment line **and exact systemic-treatment index date**, explicit event/negative status, follow-up, and censoring in the same linked patients.

- **GSE30161:** 58 pre-adjuvant molecular profiles; 54 records have explicit PFI time/event plus follow-up/censoring, but no systemic-treatment start/index date.
- **GSE63885:** 101 molecular samples; 75 linked clinical sample records have first-line regimen, response, DFS/OS, and last status, but no exact treatment index date or endpoint-specific censor date.
- **GSE25203 / E-GEOD-25203:** 30 pretreatment specimens with therapy code, TTR/event, OS/event; outcomes are relative to therapy end but patient-level treatment dates are absent.
- Other GEO/ArrayExpress cohorts lack one or more of treatment index, patient-level PFI/event, response, or censoring fields.

Controlled-source access did not close the gap: EGA authorization was not testable because no EGA secret/private key was visible; PDS patient-file attempts returned HTTP 401; tested Synapse file handles returned HTTP 403 and the rotated token was not visible. These are execution-access findings, not claims that the user's accounts lack approval.

## Decision

`ENGINE_VALIDATION_BLOCKED_DATA_INSUFFICIENT`

No benchmark was constructed, no engine labels were treated as truth, and no engine scoring was run. Audit access counts: `{"ACCESSED": 34, "ACCESS_DENIED": 10, "NOT_ATTEMPTED": 2, "NOT_FOUND": 4}`. Eligibility counts: `{"ACCESSIBLE_ENDPOINT_INCOMPATIBLE": 14, "ACCESS_DENIED_OR_CONTROLLED": 14, "INSUFFICIENT": 22}`.
