# 04 — Brenus / CRC / Sanofi Chat Extract (Adversarial)

**Extractor:** Zo  
**Session:** `sess_be00d436f181` / `proj_0a834004bb`  
**Extracted_at (JSON header):** `2026-11-03T04:22:50.983Z`  
**This-turn rule:** every number cites a path + line or `message_index`. UNCLEAR ≠ ASSUMED. No L rows.  
**Not claimed:** PASS / complete review of all 132,717 transcript lines. Method = Grep then Read windows + JSON index scan + git-show of the S3 bundle.

**Burial labels used here**
- **SURFACED** — present in the live session extract (`docs/biomni_chat_extract/`) with a citable `message_index`.
- **BURIED** — present in lab downloads / git bundle / `docs/brm.md` / Downloads, **absent or nearly absent** from the session extract.
- **SANDBAGGED** — claim without receipt; phantom p-value; dropped confounder; swapped dataset; fabricated score later walked back; dual-canon left on disk.

---

## 1. Inventory of extract files used

| Path | Bytes | SHA-256 (prefix) | What it is | This-turn evidence |
|---|---:|---|---|---|
| `docs/biomni_chat_extract/biomni_sess_be00d436f181_full_messages.json` | 51,245,558 | `048354657b66467e…` | Full dump. Header `message_count=28570`. Types implied: user 903 + assistant 13,198 + tool 14,469 = 28,570 | JSON header `session_id/message_count`; UA type counts below |
| `docs/biomni_chat_extract/biomni_sess_be00d436f181_user_assistant.json` | 14,783,339 | `8f07adcc89950315…` | User+assistant only. `message_count=14101`. Types `{user:903, assistant:13198}`. `message_index` 0→28676. `created_at` `2026-04-28T02:48:00.937000` → `2026-11-03T04:19:12.318000` | Python parse this turn |
| `docs/biomni_chat_extract/biomni_sess_be00d436f181_transcript.md` | 6,525,079 | `b3f5b0d9524e0885…` | Rendered transcript. **132,717 lines** | `wc`/line count this turn |
| `docs/brm_handoff_v1/biomni_chat_extract/` | — | — | **ABSENT on disk** | `ls` this turn: `No such file or directory`. Prior `.cursorrules` scratchpad claimed this path; that claim is false. Diff vs (1) = **handoff copy does not exist**. |
| `docs/biomni_lab_downloads_20261103_034902/` | 1,012 files counted this turn | archive SHA in forensic audit `1d831b2c67ac39f5…` | Lab `/mnt/results` export | `find … \| wc -l` = 1012; forensic audit §1.1 |
| `docs/biomni_lab_downloads_20261103_034902_forensic_audit.md` | 1,766 lines | — | Prior Role-1 cartography | Read L1–150 this turn |
| `docs/brm_handoff_v1/03_NO_MERCY_SABOTAGE_AUDIT.md` | — | — | Daraxonrasib C1 / `EXCLUDE_PATTERNS` | Grep hits L59–71 |
| `docs/brm_handoff_v1/brm_forensic_audit.md` | — | — | Same C1 | Grep hits L84, L266–278 |
| `docs/brm.md` | 5,707 lines | — | Unique Daraxonrasib/RASolute dump **not in session chat** | Grep L5017–5048; Read L5037–5048 |
| `docs/brm_handoff_v1/handoff/excluded_assets.csv` | — | — | Rows 2–4 blacklist `daraxonrasib_*` as “Unrelated project” | Read L1–4 this turn |

**UA mention counts (this-turn Python over 14,101 msgs):** Brenus 396 · Sanofi 73 · CEACAM5 83 · CARMEN 28 · Daraxonrasib/RMC-6236 **1** · KRYSTAL **1** (this is **KRYSTAL-1**, not KRYSTAL-10) · RASolute **0**.

---

## 2. Chronological Brenus / CRC / Sanofi milestone table

| When (UTC) | msg idx | Source | Milestone | Decision | Conf |
|---|---:|---|---|---|---|
| 2026-04-28T02:48:00 | 0 | UA JSON; transcript L16–18 | Session opens on **Brenus Pharma Use-Case Plan**; anchor = STC-1010 | Customer/partner framing: Brenus as target account | H |
| 2026-04-28T02:49:32 | 5 | UA; transcript L443 | LTPA pancreatic cell-line audit flag; BreAK CRC-001 bev optional | Flag SURFACED | H |
| 2026-04-28T02:56:26 | 43 | UA | Agent 2: NCT06934538 = BreAK CRC-001 | Protocol facts entering | H |
| 2026-04-28T02:58:48 | 71 | UA; transcript L969–979 | Agent 1 corporate dossier complete | Brenus = Lyon clinical-stage; STC-1010 | H |
| 2026-04-28T03:24:17 | 124 | UA; transcript L1462–1468 | Six-agent wrap: liver-met gap called “single most important finding” | Design-gap decision (later nuanced) | H |
| 2026-04-28T06:45:50 | 181 | UA; transcript L2017 | PhD rebuild: “Do not preserve prior canon unless independently re-verified” | Canon reset ordered | H |
| 2026-04-28T07:13:54 | 217 | UA; transcript L2177–2192 | Verified Claim Ledger v1.0: MSI-H arm 2A-2 exists; MSS-only framing **CORRECTED** | Prior MSS-only = SANDBAGGED | H |
| 2026-04-28 (file date) | — | `brenus_canon_v2_freeze.md` L1–49 | Engine-safe canon v2.1-FREEZE; Hard Stops 1–10 | B-001 cell lines VERIFIED; n=6/DCR BLOCKED; SC-001 HT29/BRAF conflict ACTIVE | H |
| 2026-04-28 (file date) | — | `brenus_activation_decisions.md` L1–297 | 17 capabilities ACTIVATE/HOLD/BLOCK | See §A | H |
| 2026-04-28 (file date) | 356 / 411 | UA; `formula_decision_onepager.md` L1–28 | PATH A vs PATH B memo. File header still says **DECISION PENDING** | Dual-canon vs later “SIGNED” claim | H |
| 2026-04-30T20:04:01 | 910 | UA; transcript L6227–6231 | Adjudication committed `c79ef68` to `fjkiani/Brenus` | 6-trial failure map locked | H |
| 2026-05-01T01:55:20 | 1235 | UA | Agent 8D routing after PATH A lock language | Formula used as operational lock despite one-pager PENDING | M |
| 2026-05-09T06:17:11 | 2138 | UA; transcript L19115–19318 | **Only** Daraxonrasib/RMC-6236 hit in UA: AACR 2026 speaker table (PDAC / Revolution Medicines) | Not a CRC rescue campaign | H |
| 2026-05-13T09:50:33 | 3166 | UA; `break_crc001_comparator_floor.json` | Comparator floor JSON written | OS floor 18.3 / ceiling 19.7; must-beat OS 22.0 | H |
| 2026-05-13T09:53:00 | 3193 | UA | BRAF V600E + bev ceiling patched into floor JSON | Floor file date field `"2026-05-13"` | H |
| 2026-05-30T03:09:54 | 3818 | UA; transcript L31213 | Alpha: build Sanofi opportunity / pitch | Sanofi campaign starts | H |
| 2026-05-30T03:23:58 | 3846 | UA; transcript L31320–31322 | Hook: NCT07500298 SAR445877 + mFOLFOX6 + bev = same backbone as BreAK | Partner framing | H |
| 2026-05-30T03:43:07 | 3853 | UA | User paste of FDA archive; **KRYSTAL-1** (G12C CRC approval) — **not KRYSTAL-10** | Sole “krystal” string in UA | H |
| 2026-05-30T03:53:58 | 3946 | UA; transcript L31653–31660 | `crispro_sanofi_pitch_anchor_v1.mdc` SHA `993aecd`; CARMEN-LC03 decode locked | Deck later on disk as pptx | H |
| 2026-05-31T18:13:09 | 4052 | UA; transcript L32085–32100 | Sanofi “we already know ≥80%” rebuttal + HR table | CEACAM5 IP thesis | H |
| 2026-07-05T13:47:19 | 6684 | UA JSON | CRC Ranker v1: 485 MSS × 8 trials, commit `c9d9a72` | STC-1010 mean fit 0.5605 unselected; TMB≥25 n=9 rank-1 100% | H |
| 2026-07-07 | — | bundle `a0e106b` / `d20d711` | RAG pipeline v4 then v5 commits | See §A | H |
| 2026-07-13T22:13:56 | — | bundle `093639c` | GAP-04 + `RESCUE-DARAX-CRC-001` **never mentioned in session chat** | BURIED | H |
| 2026-07-13 | — | bundle `b4dbaf5` | Fabricated Daraxonrasib fits 0.72/0.74/0.76/0.68/0.65 → **UNSCORED**; KRYSTAL-10 causal claim removed | SANDBAGGED then remediating **in git**, not in chat | H |
| 2026-08-04 | — | bundle `c9d9a72` already 2026-07-05; `2c17773` PATH A inventory kill run | STC-1010 / BreAK MoA-fit leaderboard | In repo, not re-litigated in late chat | H |
| 2026-08-19 | 28592 | UA; bundle HEAD `def6460` | `publish/brenus_s3_review_branch.bundle` named in chat | S3 review branch packed | H |
| `docs/brm.md` L5037–5048 | — | `docs/brm.md` (not this session) | Agent promises 5 workers for RASolute 302, then pivots to backend tests | ABANDONED / BURIED from this session | H |
| 2026-11-03T04:17:35 | 28649 | UA | User re-pastes 6-domain biomarker map (KRAS G12D vs G12V/G13D/WT IRF2/CXCL3) | Late CRC biology, still no KRYSTAL-10 | H |

---

## 3. A. Brenus campaign

### What Brenus is in this corpus

Brenus Pharma = Lyon clinical-stage biotech; product **STC-1010** (haptenated allogeneic whole-cell CRC vaccine, DNFB 12.7 µg/mL); registrational/clinical vehicle **BreAK CRC-001 / NCT06934538** (Phase I/IIA, 1L KRAS-mut BRAF-WT CRC, mFOLFOX6 ± bev, **no CPI**). Sources: `brenus_canon_v2_freeze.md` L53–86; UA idx 71; transcript L1065–1171.

Partner framing (idx 0, transcript L27–28): “translational and clinical-strategy support… not as a claim that Brenus lacks scientific direction.”

### Engagement / RAG / S3 branch

| Artifact | Path | Decision vs parked | Evidence | Conf |
|---|---|---|---|---|
| Activation ledger (17 caps) | `biomni_lab_downloads_20261103_034902/brenus_activation_decisions.md` | **ACTIVATE NOW:** Cap 6, 16, 17. **ACTIVATE WITH GUARDRAILS:** 1,3,4,5,9,10,12,14. **HOLD:** 2,7,8,13. **BLOCK:** 11 (Enformer), 15 (DTH modeling) | File L20–240 | H |
| Canon freeze | `brenus_canon_v2_freeze.md` | Frozen 2026-04-28 v2.1; Hard Stops 1–10 | L1–49 | H |
| RAG v4 | `brenus_rag_pipeline_v4.py` L1–46; bundle commit `a0e106b` 2026-07-07 | Demo `pass_rate=0.667` (n=3), faith 0.758, rel 0.719 | `brenus_rag_demo_results_v4.json` | H |
| RAG v5 | `brenus_rag_pipeline_v5.py` L1–54; commit `d20d711` | Same `pass_rate=0.667` (n=3). File contains **live OpenRouter keys** (not copied here) | v5.py L31–35; results v5 | H |
| RAG v6 | `brenus_rag_demo_results_v6.json` / `_v6_final.json` | `pass_rate=1.0` on **n=3 queries** — not a production eval | JSON keys this turn | H |
| S3 review bundle | `resistance_prophet_s3/publish/brenus_s3_review_branch.bundle` (24,357,576 B, sha `8c560450c786c64a…`) | HEAD `def64609d72bd76d…` `refs/heads/review/resistance-prophet-s3-candidate`; **136 commits, 918 files** | `git bundle verify` + `rev-list --count` this turn | H |

**S3 bundle commits that matter for CRC/Brenus (exact subjects):**

| SHA | Date | Subject |
|---|---|---|
| `a0e106b` | 2026-07-07 | `feat(rag): add Brenus BD RAG pipeline v4` |
| `d20d711` | 2026-07-07 | `feat(rag): add pipeline v5 — OpenRouter LLM-as-judge` |
| `c9d9a72` | 2026-07-05 | `feat: CRC ranker v1 — PATH A fit scores, 485 MSS patients × 8 trials` |
| `093639c7d375fa9e9d56a66feafd02f94247ba3a` | 2026-07-13 | `feat(synapse): GAP-04 KRAS G12/13+TP53 biomarker data + daraxonrasib rescue campaign` |
| `b4dbaf534738b0a40f17e25f8c2f7aa412741912` | 2026-07-13 | `fix(remediation): 8-step governance remediation — UNSCORED scores, Wilson CIs, lane separation, causal claim removed` |
| `def64609d72bd76d64a3583d6a43ae512ef75a62` | 2026-08-19 | `Resistance Prophet S3: audit, evidence reconstruction, clinical-proof program, candidate v0.2.0` |

Customer/partner materials on disk (not all re-read cover-to-cover): `brenus_corporate_dossier_agent1.md`, `outreach_email_brenus_agent6.md`, `crispro_brenus_outreach_brief.md`, `brenus_data_room/`.

**SC-001 (must not be dropped):** HT29 is BRAF V600E; trial Exclusion #7 requires BRAF WT; HT29 is a clinical vaccine line (`brenus_canon_v2_freeze.md` L43–49). HCT116/LoVo = KRAS G13D, SC-001-safe (`brenus_activation_decisions.md` L92).

---

## 4. Decided-trials ledger

Operational definition: a trial is **decided** if the corpus assigns FAIL / TERMINATED / NULL BENCHMARK / PRIMARY NEGATIVE / RESCUE / WATCH / ABANDONED with an NCT (or unambiguous name) and a dated source.

| NCT | Sponsor / drug | Indication | Decision | Date / idx | Receipt path | Conf |
|---|---|---|---|---|---|---|
| NCT06934538 | Brenus / STC-1010 · BreAK CRC-001 | 1L KRAS-mut BRAF-WT CRC (MSS arm 2A-1 + MSI-H arm 2A-2) | **ACTIVE recruiting.** Design gaps decided: liver-met stratify, ctDNA enrich, no-CPI. n=6/DCR **BLOCKED** | idx 43, 217; freeze L53–86 | `brenus_canon_v2_freeze.md`; `break_crc001_trial_analysis_agent2.md` | H |
| NCT03414983 | BMS / nivo + mFOLFOX6 + bev · CheckMate 9X8 | 1L mCRC (~95% MSS) | **FAILED** primary (HR 0.81, p=0.30). Class: **NULL BENCHMARK — identical backbone** | idx 910; adjudication L40–50, L129 | `canon_reconciliation_v2/trial_failure_adjudication_break_crc001.md` | H |
| NCT03050814 | NCI/others / Ad-CEA + avelumab + mFOLFOX6 + bev · QUILT-2.004 | 1L mCRC | **TERMINATED futility** HR 1.061 (0.380–2.966), p=0.91, n=30. Class: **PRIMARY NEGATIVE BENCHMARK**. Prior wrong NCT02853604 + HR 1.02 **CORRECTED** | freeze L36–38; idx 137, 217 | freeze Hard Stops 3–5; adjudication L52–66 | H |
| NCT05141721 | Gritstone / GRANITE GO-010 | 1L MSS mCRC | **Not significant**; ctDNA-low HR 0.50 press-release-only; sponsor Ch.11. Class: **BIOMARKER-ENRICHMENT WARNING** | adjudication L70–80, L131 | same adjudication file | H |
| NCT05608044 | Agenus / BOT/BAL | Refractory MSS mCRC, no-liver-met | **NOT a failure** in selected pop (cORR 19%). Class: **PATIENT SELECTION LESSON** | adjudication L98–108, L132 | same | H |
| NCT04194359 | Sintilimab + bev + XELOX | 1L RAS-mut MSS mCRC | **Uninterpretable positive** (n=25 single-arm). Do not use as STC-1010 bar | adjudication L84–94, L133 | same | H |
| NCT07500298 | Sanofi / SAR445877 + mFOLFOX6 + bev | 1L MSS mCRC | **WATCH / STRUCTURAL PRECEDENT** — no data, identical backbone | idx 3846; adjudication L112–119, L134 | adjudication + Sanofi chat | H |
| NCT05171660 | Sintilimab Phase III follow-on | MSS mCRC | **WATCH** Phase III bar-raiser | adjudication L133 | same | H |
| CARMEN-LC03 (tusamitamab ravtansine) | Sanofi | NSCLC CEACAM5 ADC | **FAILED** ITT PFS HR 1.14; drug discontinued; pivot to SGN-CEACAM5C | transcript L32091–32100; idx 4052 | chat + `CrisPRO_Sanofi_PitchDeck_v1.pptx` | H |
| NCT06131840 | Sanofi / SGN-CEACAM5C | CEACAM5 ADC (no IHC gate) | **Ongoing; no CEACAM5 threshold** — decision noted, not killed | transcript L32100 | chat | H |
| NCT05245071 | Sanofi / CARMEN-LC06 | IHC-neg/mod + high cCEA | Ran; IHC-imperfect-proxy acknowledgment | transcript L32177; UA 1 msg | chat | M |
| NCT04793958 | BMS/Mirati / adagrasib+cetux · **KRYSTAL-10** | KRAS G12C mCRC n=461 | **FAILED** 2026-07-03 ESMO GI: mPFS 7.5 vs 8.1; mOS 21.6 vs 21.7. **BURIED from session chat (0 hits)** | bundle JSON salvage_layer | git-show `daraxonrasib_rescue_campaign.json`; Downloads copy still has fabricated fits | H |
| NCT03981614 | ACCRU-GI-1618 bini+palbo vs TAS-102 | KRAS/NRAS-mut mCRC | **FAILED** futility | bundle salvage_layer | same JSON | H |
| NCT03271047 | Bini + nivo ± ipi | KRAS-mut MSS mCRC | **FAILED** 0% ORR doublet / 7.4% triplet | bundle salvage_layer | same | H |
| NCT04006301 | JNJ-74699157 | KRAS G12C solids (CRC 4/10) | **TERMINATED** toxicity + no CRC OR | bundle salvage_layer | same | H |
| NCT06445062 | RevMed / Daraxonrasib + mFOLFOX6/mFOLFIRINOX + bev Subprotocol A | RAS-mut GI / CRC | **RESCUE TARGET** — actions listed; fit **UNSCORED** | bundle rescue_layer | same JSON post-`b4dbaf5` | H |
| NCT06625320 | RevMed / Daraxonrasib · **RASolute 302** | 2L met PDAC | **PDAC readout treated as succeeded** in bundle lane_separation (`mOS HR 0.40`). **5-worker PDAC package ABANDONED** at `docs/brm.md` L5040. **0 hits in this session extract** | `docs/brm.md` L5017–5048; bundle lane_separation | brm.md + excluded_assets.csv L2–4 | H |
| NCT07491445 | RASolute 303 | 1L PDAC | PDAC lane only; not executed in this session | bundle trial_portfolio trials[2] | git-show portfolio JSON | H |
| NCT05379985 | RMC-6236 Ph1/1b | RAS-mut solids / PDAC | Foundational Ph1; not in session chat | portfolio trials[0] | same | H |

**Count of decided trials in this ledger: 19.**

Capability de-risk (not trials): Enformer **BLOCK**; DTH modeling **BLOCK**; HolisticScore PATH B **HOLD**; MoA ranker **ACTIVATE WITH GUARDRAILS** (`brenus_activation_decisions.md`).

---

## 5. Buried / sandbagged CRC signal table (revive path)

| ID | Signal | Label | Source (line/idx) | What was buried or faked | Path to revive | Conf |
|---|---|---|---|---|---|---|
| CRC-01 | **KRYSTAL-10 NCT04793958** failure (adagrasib+cetux, n=461, mPFS 7.5 vs 8.1) | **BURIED** | UA KRYSTAL hits = 1 and it is **KRYSTAL-1** (idx 3853). Transcript Grep `KRYSTAL-10` = 0. Bundle salvage_layer | Session never names the Phase 3 CRC failure. Lab RAG chunks mention it only as outreach target (`brenus_bd_rag_chunks_v1.json` L833) | git-show bundle `engagements/brenus/data/synapse_extraction/daraxonrasib_rescue_campaign.json` salvage trial 1; do **not** use Downloads copy for scores | H |
| CRC-02 | **RASolute 302 NCT06625320** 5-worker PDAC de-risk | **BURIED + ABANDONED** | UA RASolute=0, NCT06625320=0. `docs/brm.md` L5037 promise / L5040 pivot. `excluded_assets.csv` L2–4 | Agent promised workers, then cloned backend and never returned. Handoff labeled daraxon files “Unrelated project” | Restore `daraxonrasib_*` from bundle; strip `EXCLUDE_PATTERNS`; execute the 5-worker ask at brm.md L5014–5035 **without** CRC↔PDAC evidence transfer (`lane_separation_governance`) | H |
| CRC-03 | **GAP-04** MSS CRC KRAS G12/13 24.5% (82/335), TP53 65.4% (219/335), co-mut **14.9% (50/335)**, Stage IV **28.9% (13/45) = 1.94×** | **BURIED** from session chat | Raw `syn21435333`/`syn2325330` **not on caspro docs disk**. Numbers in bundle `gap04_kras_tp53_comutation.json` and Downloads copy | Session never cites 14.9%/1.94×. Raw Synapse matrices absent | `git show …:engagements/brenus/data/synapse_extraction/gap04_kras_tp53_comutation.json` + `gap04_provenance_audit.json`. Re-pull Synapse; hashes claimed in `b4dbaf5` body: syn21435333 `1e0e2ed617b0da7c…`, syn2325330 `16dca37e443a3277…` (hashes **not re-verified** against raw files this turn — see OPEN U-02) | H |
| CRC-04 | Fabricated Daraxonrasib PATH A scores **0.72 / 0.74 / 0.76 / 0.68 / 0.65** analogized to retired **0.7375** | **SANDBAGGED** then remediating in git | Downloads JSON still has `score: 0.7375` and `score_estimate: 0.72/0.74/0.76`. Bundle after `b4dbaf5` marks **UNSCORED**. Commit message: “no trial vectors defined” | Dual-canon: Downloads = dirty; bundle = remediating. Session never scored these | Delete/quarantine Downloads copy; only cite post-`b4dbaf5` JSON; recompute PATH A only after a real trial vector exists | H |
| CRC-05 | Causal story “GAP-04 prevalence explains KRYSTAL-10 failure” | **SANDBAGGED** then removed | `b4dbaf5` subject/body: “KRYSTAL-10 causal claim removed”. Bundle `failure_mechanism_note` + `lane_separation.mss_crc_lane.prohibited` | Prevalence ≠ mechanism of Phase 3 miss | Keep prevalence as **exploratory**; do not cite as cause of NCT04793958 | H |
| CRC-06 | PDAC HR 0.40 used as CRC evidence (or reverse) | **SANDBAGGED** then prohibited | bundle `lane_separation_governance.cross_contamination_rule` | Cross-disease evidence transfer banned 2026-07-13 | Enforce two lanes: PDAC efficacy vs CRC prevalence | H |
| CRC-07 | STC-1010 fit **0.7375** as canonical | **SANDBAGGED** then retired | UA: 23 msgs contain `0.7375`, 11 contain `0.6944`. RAG v4 guardrail L35: “NEVER cite STC-1010 fit=0.7375 (RETIRED → 0.6944)”. Ranker idx 6684 unselected mean **0.5605** | Three numbers in circulation | Lock one: ranker 0.5605 (n=485) vs KG 0.7375 RETIRED vs code 0.6944. Do not mix | H |
| CRC-08 | CRC Ranker TMB≥25 n=9, STC-1010 rank-1 100%, recall@3=1.0 | **SURFACED** with small-n risk | UA idx 6684 2026-07-05; commit `c9d9a72` | n=9 hypermutated slice is not a product proof for unselected MSS (mean fit 0.5605, Δ **−0.165**, rank-1 1.9%) | Surface both rows together; never lead with n=9 alone | H |
| CRC-09 | NCT03050814 miss in Agent 3 | **SANDBAGGED** then recovered | transcript L1568–1570, L1807 | Closest structural precedent buried in wrong NCT / table row | Keep QUILT-2.004 as primary negative; NCT03050814 not NCT02853604 | H |
| CRC-10 | BreAK CRC-001 “MSS-only” | **SANDBAGGED** then corrected | freeze L35–36, L71–79; idx 217 A-006 | MSI-H arm 2A-2 is registered | Always three arms | H |
| CRC-11 | n=6 / 100% DCR / DTH from press / AACR CT051 | **SANDBAGGED** (blocked) | freeze Hard Stop 9 L41; Cap 15 BLOCK | BusinessWire/BioSpace not retrieved | Keep `[BLOCKED — B-003]` | H |
| CRC-12 | “200+ antigens” as verified science | **SANDBAGGED** | freeze Hard Stop 2 L36; transcript L1602–1604 | Company claim only | Tag `[COMPANY_CLAIM]` | H |
| CRC-13 | Liver mets = “single strongest predictor of IO failure” without Immunoscore-IC | **SANDBAGGED** then nuanced | idx 124 vs transcript L6786, L6899 | AtezoTRIBE Pint PFS 0.166 / OS 0.473 (and later Pint OS 0.800 / PFS 0.990 in critique) — interaction **not** confirmatory | Framing: “liver mets + Immunoscore-IC-low = hypothesis,” not validated biomarker | H |
| CRC-14 | Comparator Hunter matrix “Randomized (assumed)” for BreAK | **SANDBAGGED** | `comparator_hunter/break_crc001_positioning_matrix.md` L16 vs freeze L66 “non-randomized, sequential” | Design invented | Prefer NCT registry | H |
| CRC-15 | PATH A never run on CT-01/CT-02/DL-03/PC-05 | **BURIED / unexecuted** | transcript L13509 | “unblocked since April 28, never executed” | Run PATH A on those IDs with locked formula; write receipt | H |
| CRC-16 | RAG v4/v5 billed as production while n=3 pass_rate 0.667 | **SANDBAGGED** | v4.py L3 “Production Pipeline (FINAL)”; results pass_rate 0.667 | n=3 is not a gate | Either expand eval or label DEMO | H |
| CRC-17 | KRAS subtype (G12D MDSC/CXCL3) called out for protocol but not used as Daraxonrasib CRC gate in chat | **BURIED in chat vs SURFACED as Brenus protocol ask** | adjudication L149; idx 28649 | Session ends on IRF2/CXCL3 qualitative map; never ties to RMC-6236 | Join GAP-04 variant table (G12D 6.3%, G12V 7.2%, G12C 1.5%) to NCT06445062 amendment | H |

**Count of buried/sandbagged CRC signals in this table: 17** (CRC-08 is SURFACED-with-caveat; counted because the n=9 row was used as a product climax).

---

## 6. Sanofi IP ledger

| Asset / claim | Status | Evidence | Conf |
|---|---|---|---|
| CARMEN-LC03 ITT PFS HR **1.14 (0.86–1.51)** FAILED | **PROVEN** as *quoted from public record in chat* (not re-fetched from WCLC PDF this turn) | transcript L32091 | H |
| ITT OS interim HR **0.85 (0.64–1.11)** | **PROVEN**-in-chat | L32092 | H |
| CEACAM5 50–79% OS HR **1.02**, PFS **1.38** (numerically worse) | **PROVEN**-in-chat | L32093–32094 | H |
| CEACAM5 ≥80% OS HR **0.71 (0.49–1.03)**, PFS **0.87** | **PROVEN**-in-chat; CI crosses 1.0 — underpowered | L32095–32096 | H |
| Prognostic confound (Besse WCLC 2024 quote) | **PROVEN**-in-chat as attributed quote | L32098 | H |
| Tusamitamab ravtansine discontinued; pivot SGN-CEACAM5C; NCT06131840 **no IHC threshold** | **PROVEN**-in-chat | L32100 | H |
| CARMEN-LC06 NCT05245071 cCEA experiment | **PROVEN**-in-chat (1 UA msg) | L32177 | M |
| Two-layer CEACAM5 decode from `fjkiani/crispro` manuscript | **PROVEN as repo-anchored narrative** (agent cites MANUSCRIPT.md L418–439) | transcript L31590–31654 | M |
| Pitch deck on disk | **EXISTS** | `CrisPRO_Sanofi_PitchDeck_v1.pptx` 297,354 B sha `6c04efbf9218f435…` | H |
| Three-gate IP (IHC ≥80% + cCEA ≥100 + IO-permissiveness) as CrisPRO-owned companion diagnostic | **UNCLEAR / proposed** — strategy text, no filed claim, no prospective CRC dataset | L32181–32208 | H |
| “European hold on tusamitamab sonditecan (March 6, 2026)” | **UNCLEAR** — chat claim with citation tags; not independently retrieved this turn | L31660 | M |
| NCT07500298 SAR445877 same backbone as BreAK | **PROVEN**-in-chat + adjudication | idx 3846; adjudication L112 | H |
| LATIFY delta prohibited in Sanofi deck | **PROVEN** instruction | L31666 | H |
| Royalty / $15–30M milestone model | **PHANTOM commercial** — no contract, no Sanofi meeting receipt | L32243 | H |
| CRC glycocalyx / SMAD4 / stem-cell CEACAM5 story as Sanofi-unknowable moat | **UNCLEAR** — mechanistic hypothesis, literature tags in chat, not a computed CrisPRO receipt | L32160–32169 | M |

---

## 7. Dataset existence table

| Dataset / NCT / workbook | Cited for | On disk? | SHA / note | Phantom? | Conf |
|---|---|---|---|---|---|
| UA/FM/transcript extracts | Session | YES `docs/biomni_chat_extract/` | see §1 | No | H |
| `break_crc001_comparator_floor.json` | KRAS-mut MSS FOLFOX floor | YES (7,732 B, sha `dd99cb0dbb6ca1a1…`) | date `2026-05-13` | No | H |
| `brenus_s3_review_branch.bundle` | Brenus git history | YES 23M | sha `8c560450c786c64a…`; 136 commits / 918 files | No | H |
| GAP-04 `gap04_kras_tp53_comutation.json` | MSS KRAS/TP53 | YES in bundle + `/Users/fahadkiani/Downloads/synapse_extraction_gap04_kras_tp53_comutation.json` (4,601 B). **ABSENT** under `docs/biomni_lab_downloads_20261103_034902/` as a loose file | Bundle vs Downloads may differ (Wilson CIs only in `b4dbaf5`) | No (derived). Raw matrices missing | H |
| syn21435333 / syn2325330 raw | GAP-04 inputs | **NO** on caspro docs or Downloads glob | Claimed SHAs only in `b4dbaf5` commit body | Raw = **PHANTOM-on-this-disk** | H |
| `daraxonrasib_rescue_campaign.json` Downloads | Rescue campaign | YES 18,514 B sha `870e7bc1a9b673e3…` | **PRE-remediation scores 0.7375/0.72/0.74/0.76** | Dirty dual-canon | H |
| Same path in bundle after `b4dbaf5` | Rescue campaign | YES via git-show (23,477 B per forensic audit) | UNSCORED | Use this, not Downloads | H |
| `daraxonrasib_trial_portfolio.json` Downloads | 10-trial RevMed list | YES 9,312 B sha `948e89fc830890e9…` | n=10 trials in bundle show | No | H |
| Alzeeb 2024 DOI 10.3389/fonc.2024.1427428 | Murine STC surrogate | Cited; full-text retrieval claimed in chat idx 217 | PDF not hashed this turn | UNCLEAR file presence | M |
| NCT06934538 / ClinicalTrials.gov | BreAK protocol | Registry, not a local XML | freeze L53 | No | H |
| dbGaP phs003428 | N0147 / ESCAPE access | Access drafts in bundle `engagements/brenus/escape_map/access_tracks/` | Not a downloaded phs | Access **UNCLEAR** | M |
| TCGA COAD n=603 / MSS n=335 | GAP-04 | Derived JSON only | Cohort caveat: resected, Stage IV n=45 | Proxy, not metastatic IPD | H |
| CRC ranker 485 MSS × 8 trials | PATH A | Outputs claimed commit `c9d9a72`; not re-hashed as CSV this turn | UA idx 6684 | Existence in git bundle likely; local caspro copy UNCLEAR | M |
| `CrisPRO_Sanofi_PitchDeck_v1.pptx` | Sanofi | YES 297,354 B | sha `6c04efbf9218f435…` | No | H |
| GEO GSE* for CRC/Brenus/Sanofi | — | **Not established this turn** as a CRC-specific GEO workbook in these extracts | Do not invent | UNCLEAR | M |

---

## 8. Exact quotes — formulas, floors, decision rules

**PATH A (do not reconstruct):**

From `formula_decision_onepager.md` L14–16:

```
fit(p, t) = clip( (p · t) / ‖t‖₂ , 0, 1 )
```

PATH B (prohibited for ranking), same file L48–50:

```
fit(p, t) = clip( (p · t) / (‖p‖₂ · ‖t‖₂) , 0, 1 )
```

PATH A ceiling for `p_ref`: **0.8898** (`formula_decision_onepager.md` L28–40). DDR 0.983 is “mathematically impossible” under PATH A (L71).

One-pager status line still reads: **“Status: DECISION PENDING”** (`formula_decision_onepager.md` L5). Later chat (transcript L35747): “PATH A formula decision — SIGNED by Fahad Kiani 2026-04-28.” **Dual-canon.**

**Comparator floor (verbatim JSON fields):** `break_crc001_comparator_floor.json` L5–21:

- `"os_floor_months": 18.3` (PRIME RAS-other, PMID 24024839)
- `"os_ceiling_months": 19.7` (PRIME KRAS exon 2, PMID 20921462)
- `"pfs_floor_months": 8.0` / `"pfs_ceiling_months": 8.8`
- `"twelve_month_pfs_rate_source": "Exponential model: 12mo_PFS = exp(-ln(2)/PFS_median × 12)…"`
- `"os_threshold_months": 22.0` / `"pfs_threshold_months": 9.6` / `"twelve_month_pfs_threshold": 0.4243`
- Rationale: “20% improvement over historical floor is a heuristic…”

**Rescue formula (bundle JSON):** `"formula": "fit = clip((p·t) / ‖t‖₂, 0, 1)"` with `"crispro_version": "PATH A (locked 2026-04-28)"`.

**Remediation rule (`b4dbaf5` body, git-show this turn):**  
“All CrisPRO fit scores (0.72/0.74/0.76/0.68/0.65) marked UNSCORED — no trial vectors defined.”  
“KRYSTAL-10 causal claim removed: GAP-04 prevalence observation does not explain trial failure.”  
“Lane separation enforced: PDAC/RASolute 302 data removed from CRC lane rationale.”

**RAG v4 guardrails (v4.py L33–41):** NEVER cite 0.7375; NEVER LATIFY 0.366/0.2641; NEVER DDR_0983; NEVER PATH B; NEVER “HT29 confirmed”; NEVER CT051 quantitative DTH.

**QUILT-2.004 qualification (activation L105):**  
“QUILT-2.004 (NCT03050814) was TERMINATED for futility at interim analysis (HR 1.061, 95% CI 0.380–2.966, p=0.91; n=30 enrolled vs. target n=70).”

**CARMEN-LC03 HR table:** transcript L32091–32096 (copied in §6).

---

## 9. Finding audit (Decision · Source · Line/idx · Quote · Evidence · Conf)

| Decision | Source file | Line / msg idx | Rule/quote | Evidence | Conf |
|---|---|---|---|---|---|
| Handoff extract copy missing | `docs/brm_handoff_v1/biomni_chat_extract/` | `ls` this turn | Prior scratchpad said files were written there | Path ABSENT; real files in `docs/biomni_chat_extract/` | H |
| Session is a Brenus campaign from msg 0 | UA JSON | idx 0, 2026-04-28T02:48:00 | “Brenus Pharma Use-Case Plan” | Parsed `created_at` + content | H |
| KRYSTAL-10 not in session | UA + transcript Grep | 0 `KRYSTAL-10` hits; 1 `krystal` = KRYSTAL-1 idx 3853 | Burial definition | Python + Grep | H |
| RASolute/NCT06625320 not in session | UA counts | 0 / 0 | Burial | Python | H |
| Daraxonrasib in session = AACR name-drop only | UA | idx 2138 | Not a rescue campaign | Content window | H |
| 5-worker PDAC strike abandoned | `docs/brm.md` | L5037–5048 | “Spinning up now” then “Switching to integration execution” | Read window | H |
| Handoff hid daraxon files | `excluded_assets.csv` | L2–4 | reason = “Unrelated project…” | Read | H |
| Fabricated scores still on Downloads | Downloads rescue JSON | `break_crc_001_baseline.score = 0.7375` | Dual-canon vs bundle UNSCORED | Python print this turn | H |
| GAP-04 n=335 rates | bundle gap04 JSON | `KRAS_G12_G13_combined.rate=0.245 n=82`; co-mut 0.149 n=50 | Exact JSON | git-show | H |
| CRC ranker unselected loss | UA | idx 6684 | mean fit 0.5605; Δ −0.165; rank-1 1.9% | JSON content | H |
| Activation BLOCK Enformer + DTH | `brenus_activation_decisions.md` | L174–179, L229–240 | “BLOCK” | Read | H |
| PATH A vs PENDING one-pager | `formula_decision_onepager.md` L5 vs transcript L35747 | Dual-canon | Both quoted | H |
| Sanofi HR table | transcript | L32091–32096 | Failed ITT PFS 1.14 | Read | H |
| RAG v4/v5 not production-grade | results JSON | pass_rate 0.667 n=3 | vs “Production Pipeline (FINAL)” | JSON + v4.py L3 | H |
| v5.py secret leak | `brenus_rag_pipeline_v5.py` | L31–35 | OpenRouter `sk-or-v1-…` keys present | Read (values not copied) | H |

---

## 10. OPEN / UNCLEAR table

| ID | UNCLEAR | Assumed-leak if ignored | CLEAR strategy | Owner |
|---|---|---|---|---|
| U-01 | Dual-canon PATH A “SIGNED” vs one-pager “DECISION PENDING” | Shipping ranker as manager-locked when memo still pending | Re-read `formula_decision_onepager.md` + any later freeze; Alpha records one status | Alpha |
| U-02 | Raw syn21435333 / syn2325330 bytes absent; SHAs only in commit message | Citing 14.9% as if IPD were here | Re-download Synapse; sha256 match `b4dbaf5` body; keep JSON as derived | Zo (if Alpha authorizes network) |
| U-03 | Downloads rescue JSON still has 0.72–0.76; bundle UNSCORED | Next agent cites Downloads and re-injects fabricated fits | Quarantine Downloads copy; prefer git-show `b4dbaf5:` | Zo |
| U-04 | CRC ranker CSV/figure not hashed inside caspro tree this turn | “485 MSS” treated as local product data | Locate `c9d9a72` blobs in bundle; hash | Zo |
| U-05 | CARMEN-LC03 HRs not re-fetched from WCLC/primary PDF this turn | Treating chat table as primary literature | Pull Besse WCLC 2024 / NEJM-or-equivalent PDF; diff HRs | Zo |
| U-06 | tusamitamab sonditecan EU hold 2026-03-06 | Pitch urgency hook may be hallucinated | Primary regulator URL | Zo |
| U-07 | dbGaP phs003428 actual access | ESCAPE/N0147 IPD assumed available | Read access_status JSON in bundle; DAR status | Zo |
| U-08 | GEO accessions for CRC/Sanofi | Inventing GSE IDs | Grep GEO in remaining lab files if Alpha wants a second pass | Zo |
| U-09 | OpenRouter keys in `brenus_rag_pipeline_v5.py` | Key reuse / leak | Rotate keys; redact file (do not commit keys) | Alpha |
| U-10 | Brenus PAT printed in preflight (`PREFLIGHT_AUDIT.md` L10–12) | Token still live | Confirm GitHub revocation | Alpha |
| U-11 | RASolute 302 NEJM/ASCO numbers in forensic novels vs this session’s silence | Using PDAC HR 0.40 inside CRC decks | Keep lane_separation; independently verify PDAC publication if used at all | Zo |
| U-12 | Whether `docs/brm_handoff_v1/04_IRON_LEASH_AND_NEXT_STEPS.md` should be renamed — this file is a **new** `04_BRENUS_…` beside it | Two “04_” docs confuse handoff | Alpha pick numbering | Alpha |

---

## 11. Anti-sandbagging checklist (this turn)

| Gate | Status |
|---|---|
| Evidence before claim | DONE — Grep/Read/git-show/Python cited above |
| No linear 132k read | DONE — Grep then windows |
| Write preflight 5e | Alpha asked for this exact path |
| No extra dated journals | Only this file |
| UNCLEAR ≠ ASSUMED | §10 |
| No L rows | None in final tables |
| PASS language | **Not claimed** |

**Decided trials: 19.** **Buried/sandbagged CRC signals: 17.**
