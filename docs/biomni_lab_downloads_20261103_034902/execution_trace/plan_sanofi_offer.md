# PLAN: Sanofi Offer Rebuild — Grounded Components Only
**Version:** 1.0 | **Date:** 2026-06-01 | **Status:** APPROVED FOR EXECUTION

---

## Scope

Produce `sanofi_offer_grounded_v1.md` — a Sanofi-facing commercial offer document built exclusively from grounded register components. Five required deliverables:

1. **Proprietary vs public decomposition** — what Sanofi already has vs what CrisPRO adds
2. **Gate bundle ranking** — least to most de-risked, with evidence tier per bundle
3. **Screening cost and dilution tradeoffs** — quantified from CS01–CS06, F09, with quarantine disclosures
4. **EXPECTED-tier disclosure** — explicit statement of what Sanofi buys if CEACAM5 Target-Lock is EXPECTED rather than COMPUTED
5. **Grounded offer structure** — CB-1 through CB-5 commercial paths with evidence tier per path

---

## Input Sources (all from register v3)

### SOURCED (no quarantine, usable directly)
- P01/P02/P03: mCRC pool (55K → 46,750 MSS)
- CL01/CL02/CL03/CL04: CARMEN-LC03 signal (HR 1.38, HR 0.71, prognostic, 90% archival)
- G04/G05/G06: cCEA gate (ORR 41.7% vs 8.1%, ρ=0.43)
- G09: pTMB ≥28 prevalence 21% (CO.26, n=163)
- IO01/IO02/IO03: IO gate signals (HR 0.34, HR 0.55, HR 0.10)
- CS01/CS02: IHC cost $150–300, cCEA cost $30–80 (CMS fee schedule)

### COMPUTED/QUARANTINED (usable with disclosure)
- G03: Gate 1b pool 13,090/yr (inherits G02)
- G08: Two-gate pool 6,545/yr (inherits G02+G07)
- G11: Three-gate pool 825/yr (inherits G02+G07+G10)
- CS05/CS06/F09: Screening costs (two-gate $2.6M, three-gate $9.7M)
- F05/F07/F08: Revenue/EV/NPV (10 OPEN_ASSUMPTIONs)
- V01/V02: Vector-Scalpel ranking (analyst judgments)

### OPEN_ASSUMPTION (must be labeled, not presented as confirmed)
- G02: CRC prevalence at ≥80% IHC ~28% (CRITICAL — NSCLC transfer)
- G07: cCEA ≥100 prevalence in ≥80% CRC ~50% (HIGH — NSCLC transfer)
- G10: IO anti-correlation in CRC (HIGH — no CRC data)
- F01/F02/F04/F06: Drug price, duration, penetration, P(approval)

### EXPECTED (prospective only — cannot be presented as receipted)
- CAP-04: CEACAM5/CARMEN-LC03 two-layer decode
- CAP-05 (CEACAM5): Target-Lock score
- CAP-10: MSS CRC patient archetypes
- CAP-11: Franchise reuse value

---

## Gate Bundle Definitions

| Bundle | Gates | Evidence tier | Screen ratio | Phase 2 cost |
|---|---|---|---|---|
| B0 | No gate (ITT) | SOURCED (P03) | 1:1 | Lowest screen cost, lowest ORR |
| B1 | IHC ≥80% only | COMPUTED(QUARANTINED, G02) | 4:1 | Low screen cost |
| B2 | IHC ≥80% + cCEA ≥100 | COMPUTED(QUARANTINED, G02+G07) | 7:1 | $2.6M base |
| B3 | B2 + pTMB ≥28 | COMPUTED(QUARANTINED, G02+G07+G10) | 34–57:1 | $9.7M base |
| B4 | B2 + Immunoscore-IC-high | COMPUTED(QUARANTINED, G02+G07+G10) | ~40:1 | ~$8M est |
| B5 | B2 + DetermaIO IOOPT+ | COMPUTED(QUARANTINED, G02+G07+G10) | ~50:1 | ~$9M est |

Ranking from least to most de-risked: B2 > B1 > B3 > B4 > B5 > B0

---

## Output File

`/mnt/results/sanofi_offer_grounded_v1.md`

Sections:
1. Executive summary (3 sentences, grounded claims only)
2. What Sanofi already has (SOURCED only)
3. What CrisPRO adds (by evidence tier)
4. Gate bundle ranking table with cost/dilution/evidence
5. Screening cost and dilution model (with quarantine disclosures)
6. EXPECTED-tier disclosure (explicit: what Sanofi buys if Target-Lock is EXPECTED)
7. Commercial offer structure (CB-1 through CB-5)
8. Open assumptions and de-risk roadmap

---

## Constraints

- No LATIFY delta numbers in CRC/CEACAM5 framing
- No "CrisPRO decoded CARMEN-LC03" language
- No "CEACAM5 Target-Lock score is HIGH" as receipted claim
- No NPV +$31M without quarantine disclosure
- No 28% prevalence as confirmed number
- Every claim tagged with register ID
