# YC Application — Progress + Active Users
## Updated: 2026-05-08

---

## How far along are you?

CrisPRO has moved from prototype to production platform with two live oncology programs, five peer-reviewed AACR 2026 abstracts, a growing Trial Failure Prediction Ledger, and a 42-lead qualified commercial pipeline built from AACR San Diego 2026 and CMO Summit 360.

---

### Trial Failure Prediction Ledger

The ledger documents trials CrisPRO decoded before or concurrent with their public failure analysis — mapping the exact mechanism of failure against the 8-domain taxonomy the platform uses to evaluate new programs.

**5/7/26 — CENTRIC (Cilengitide, GBM) — $150M+ wasted**
OS HR 1.02 (26.3 vs 26.3 months). CrisPRO decode: two compounding failures. First, a BBB delivery paradox — cilengitide's mechanism requires disrupting integrin-mediated cell-matrix adhesion, but integrin adhesion also maintains BBB integrity; continuous dosing may have stabilized the barrier it needed to cross. Second, no patient selection — MGMT methylation was prognostic for TMZ response, not predictive for integrin dependency. The ZEB1→ITGAV synthetic lethality axis (delta = −0.72, FDR = 0.001, 24/24 NSCLC lines) is the patient selection logic CENTRIC never had. CrisPRO has now identified cilengitide as the first SL-anchored repurposing candidate for NSCLC brain metastasis, with CNS penetration already established in prior CNS studies.

**4/20/26 — IMblaze370 (Atezolizumab + Cobimetinib, MSS CRC) — $300M+ wasted**
OS HR 1.00. Not 0.99. 1.00. CrisPRO decode: wrong biology for MSS CRC. MEK inhibition upregulates MHC-I in murine models; it does not overcome hepatic immune tolerance, KRAS-driven MDSC recruitment, or TGF-β-mediated T-cell exclusion in human MSS CRC. CrisPRO's PATH A ranker scores IMblaze370 at fit = 0.8262 — the highest score in the MSS CRC comparator set — and flags it as a FALSE POSITIVE. The high score reflects the patient population's MAPK burden, not a positive precedent. This is the platform's most important governance feature: a high mechanism-fit score that correctly warns against the trial rather than endorsing it.

**12/2025 — CAPRI (Olaparib + Ceralasertib, Solid Tumors) — $20–40M wasted**
Zero RECIST responses. Only CA125 signals in BRCA1 carriers. CrisPRO decode: biomarker dilution. Failed to stratify for BRCA1/HRD; broad enrollment buried the signal in a population where the mechanism only works in a defined molecular subset.

---

### Live Clinical Partner

Brenus Pharma is using CrisPRO to generate protocol gap analysis for BreAK CRC-001 (NCT06934538) — a Phase I/II haptenated whole-cell vaccine trial for MSS colorectal cancer, 5 sites across France with Johns Hopkins pending. CrisPRO delivered a complete data room: 7 trial decodes, quantitative PATH A scores across all comparator trials, failure taxonomy, liver-metastasis stratification analysis, and STC-1010 positioning. The highest-priority output: GAP-01, a critical protocol gap — liver-metastasis status is not pre-specified as a stratification variable in BreAK CRC-001, and CO.26 data shows non-liver-met OS HR ~0.50 vs. liver-met HR ~0.90. STC-1010 is a pure IO mechanism maximally sensitive to hepatic immune tolerance. Without stratification, the liver-met majority will dilute the signal exactly as it did in CO.26.

---

### Cross-Indication Engine Proof

The same PATH A formula that scored 7 MSS CRC IO trials for Brenus now scores 6 GBM trial failure classes for NSCLC brain metastasis — same engine, same governance, same FALSE POSITIVE detection pattern. IMblaze370 in MSS CRC (fit = 0.8262, FALSE POSITIVE: MAPK pathway overlap) and EGFR TKIs in KRAS-mutant BrM (mfit = 0.63, FALSE POSITIVE: KRAS downstream of EGFR) are the same failure mode, independently identified by the same formula across two indications. This is the cross-indication proof that the platform is indication-agnostic.

---

### 5 AACR 2026 Peer-Reviewed Abstracts

1. Mechanism-based trial matching reveals 54% of ovarian cancer patients are receiving treatment misaligned with their tumor biology (LB340)
2. CRISPR design for intercepting brain cancer metastasis — the ZEB1→ITGAV synthetic lethality axis (B065)
3. Multi-modal functional genomics reveals epigenetic drivers of brain metastasis invisible to mutation-centric panels (accepted)
4. An agentic platform for designing cancer immunotherapies (B025)
5. [5th abstract title — confirm before submission]

---

### Commercial Pipeline — AACR 2026 + CMO Summit 360

AACR San Diego 2026 and CMO Summit 360 generated a 42-lead qualified pipeline across four segments, scored and triaged by CrisPRO fit. 22 leads are T1 priority (outreach within 24–48 hours). Average lead score: 8.0/10.

**Segment breakdown:**

| Segment | Leads | Avg Score | T1 |
|---------|-------|-----------|-----|
| AACR S-Tier (scientific/POC) | 11 | 8.2 | 6 |
| CMO Summit 360 — S-Tier (commercial) | 16 | 7.5 | 5 |
| AACR Contact List (conference follow-up) | 9 | 8.2 | 5 |
| Investor Targets | 6 | 8.4 | 6 |

**Highest-priority leads by name:**

*Score 9.5 — Immediate outreach:*
- **Kevan M. Shokat, PhD** (UCSF/Genentech) — Prof. of Cellular & Molecular Pharmacology. Session chair for KRAS degraders and RAS(ON) inhibitors at AACR. Pain point: KRAS resistance prediction and degrader target identification. CrisPRO fit: SL target ID for undruggable targets — the same problem CrisPRO solves computationally that Shokat solves chemically.
- **Steven Bellon, PhD** (Foghorn Therapeutics, CSO) — FHD-909 (SMARCA2 inhibitor) in Phase 1 with Lilly. Pain point: patient stratification for FHD-909 and paralog SL pipeline expansion. CrisPRO fit: chromatin modulator SL network mapping; paralog SL expansion for SMARCA2/4, ARID1A/B. Existing Foghorn relationship — highest-probability near-term conversion.

*Score 9.0 — AstraZeneca (3 leads, highest commercial priority):*
- **Mark J. O'Connor, PhD** (VP Clinical Biomarker Sciences) — Leads saruparib (AZD5305, selective PARP1 inhibitor) biomarker strategy. Pain point: patient stratification for PARP1 and combo design with cerlasertib/AZD7648. CrisPRO fit: genome-wide SL prediction for PARP1-dependent tumors; combo discovery. Direct pain point alignment — saruparib needs exactly what CrisPRO provides.
- **Sonia Iyer** (Director, IO Strategy & Translational Medicine) — Manages research collaborations at the IO/ADC/small molecule intersection. Pain point: patient stratification for saruparib, resistance prediction, IO integration. CrisPRO fit: PARP1 SL stratification + IO+ADC+SM combo discovery. Sits at the exact intersection CrisPRO addresses.
- **John F. Kurland** (VP, Global Product Leader — IO, GI/H&N) — Leads IO combination development for GI cancers. Pain point: IO resistance in GI tumors, combo design, biomarker development. CrisPRO fit: SL+IO combo prediction for GI tumors; cold-to-hot tumor conversion. Strategic regimen design role is exactly what CrisPRO enables.

*Score 9.0 — Scientific validators (AACR session chairs and field founders):*
- **Timothy A. Yap, MD** (MD Anderson) — SL champion and AACR session chair. PARP1/ATR combo prediction.
- **Alan D. D'Andrea, MD** (Dana-Farber) — MMEJ SL expert. DDR network validation.
- **Mathew J. Garnett, PhD** (Wellcome Sanger Institute) — Computational SL pioneer. CRISPR screen data integration.
- **Peter J. O'Dwyer, MBBCh, MD** (ECOG-ACRIN/UPenn) — ComboMATCH co-chair. SL for KRAS-mutant PDAC; trial enrichment.

*Score 9.0 — Investor:*
- **Jorge Conde** (a16z Bio + Health, GP) — Platform investment thesis: SL engine + trial failure prediction + clinical validation (Brenus).

**CMO Summit 360 — 16 S-Tier CMOs, 5 T1:**
- **Jason Sager, MD** (Accent Therapeutics, CMO) — Score 8.5. Lead program DHX9i terminated; company in crisis. Needs computational de-risking for ATX-295. Highest urgency in the CMO cohort.
- **Marcella Ruddy, MD** (Tectonic Therapeutic, CMO) — Score 8.0. Cash burning; DDR pathway crowding. SL/DDR pathway modeling.
- **John Goldberg, MD** (Nanology/Incendia, CMO) — Score 8.0. Phase 2 planned 2026; small company vs. large competitors. DDR1 SL mapping.
- **Jeremy Sokolove, MD** (VOR Bio, CMO) — Score 8.0. Laid off 95% of staff; rebuilding. CRISPR optimization + SL for AML.
- **Leena Gandhi, MD, PhD** (NextPoint Therapeutics, CMO) — Score 8.0. Brutally competitive IO space. SL-informed target ID.

**Investor pipeline — 6 leads, all T1:**
a16z (Jorge Conde, 9.0), Third Rock Ventures (David Kaufman, 8.5), ARCH Venture Partners (Carol Suh, 8.5), Lightspeed (Shelley Chu, 8.5), Venrock Healthcare (8.0), RA Capital (Peter Kolchinsky, 8.0).

**Active discussions with AstraZeneca executives and science team.**

---

## How many active users or customers do you have? How many are paying? Who is paying you the most, and how much do they pay you?

Brenus Pharma is an active partner on BreAK CRC-001 (NCT06934538). The engagement is currently validation-stage — Brenus is not paying CrisPRO directly, but is generating the clinical validation data that converts to the first paying contracts. The deliverable CrisPRO produced (7-trial decode, protocol gap analysis, PATH A scores, GAP-01 identification) is the same work a clinical-stage biotech would pay a CRO or consulting firm $150–300K to produce. We produced it in days, not months, and with mechanistic depth that no CRO offers. The Brenus engagement is the reference case for the first commercial contracts.

The 42-lead pipeline from AACR and CMO Summit 360 represents the conversion funnel. The three AstraZeneca leads (O'Connor, Iyer, Kurland) are the highest-priority commercial targets — AZ has an active saruparib program with a documented patient stratification gap that CrisPRO directly addresses. Steven Bellon at Foghorn is the highest-probability near-term conversion given the existing relationship and a live Phase 1 trial (FHD-909) with an active stratification need.

First paying contracts are the immediate conversion target from this pipeline.

---

## Data quality note (internal — do not include in YC submission)

The raw AACR tracker CSV had 12 misrouted emails (each email was offset by one row throughout the CMO Summit and Investor sections). All have been corrected in the enhanced tracker. The 9 AACR Contact List emails (Yap, D'Andrea, Garnett, Munster, White, Rodrigo Imedio, Brainin, Wu, Attinger) were reconstructed from the misrouted chain — correct based on canonical sources but should be verified against conference badge scans or LinkedIn before sending.
