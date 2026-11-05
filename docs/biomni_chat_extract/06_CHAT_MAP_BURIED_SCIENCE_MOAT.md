# 06 — Biomni Chat Map: Buried Science vs Clinical/Commercial Moat

**Authority:** this-turn stream of `docs/biomni_chat_extract/` + Read of locked forensic files. Memory is untrusted.  
**Session:** `sess_be00d436f181` / `proj_0a834004bb`  
**URL:** https://biomni.phylo.bio/projects/proj_0a834004bb/tasks/sess_be00d436f181  
**Extracted:** `2026-11-03T04:22:50.983Z`  
**Moat HEAD (prior-turn `git log -1`, not re-run this fold):** `scientist-monai-moat` branch `feat/ten-capability-delivery-20260928` **`72a8bbd`**  
**Sibling fold (this patch):** `04_BRENUS_CRC_SANOFI_CHAT_EXTRACT.md` (306 lines) and `05_GBM_VECTOR_8D_GATES_FORMULAS.md` (827 lines) **Read this turn**. Crosswalk = §1.4. Contradictions = §1.5. Existing `04_IRON_LEASH_AND_NEXT_STEPS.md` is the BrM leash — **different file** from `04_BRENUS_*` (04 U-12 numbering collision stays OPEN). No PASS.

**One-line verdict:** This chat **started as Brenus/STC-1010/8D/CRC** (msg `0`, `2026-04-28`) and **ended by asking to zip “2 door + brenus + resistance prophet”** (msg `28611`, `2026-11-03`). In between, **July alone is 17,585 / 28,570 messages (61.5%)** of ovarian/MFAP4/MBD4/KELIM/Resistance-Prophet volume. The BrM GSE/AF3 fraud audited in `docs/brm.md` is a **different transcript**. Mixing the two is how CRC/8D/GBM get buried.

No PASS. No new science computed. No secrets copied into this file.

---

## 1. Extract inventory + how this extract differs from `docs/brm.md` and the 1,010-file lab zip

### 1.1 Files on disk (this-turn `ls` / `stat` / JSON header)

| Path | Bytes | What it is | This-turn count |
| :--- | ---: | :--- | :--- |
| `docs/biomni_chat_extract/biomni_sess_be00d436f181_full_messages.json` | `51,245,558` (~49 MB) | Full dump | **28,570** messages: **user 903 / assistant 13,198 / tool 14,469**. Keys: `session_id`, `project_id`, `extracted_at`, `message_count`, `messages[]` |
| `docs/biomni_chat_extract/biomni_sess_be00d436f181_user_assistant.json` | `14,783,339` (~14 MB) | User+assistant only | **14,101** messages (903+13198) |
| `docs/biomni_chat_extract/biomni_sess_be00d436f181_transcript.md` | `6,525,079` (~6.2 MB) | Markdown transcript | **132,717** lines; **903** `## [N] USER` headers |
| `docs/brm_handoff_v1/biomni_chat_extract/` | — | Listed in the mission | **ABSENT** |

**Index rule (do not sandbag this):** JSON array index is `0..28569`. Session `message_index` is `0..28676` with **107 holes**. Cite **`message_index`**, not array position. First: `[0] USER 2026-04-28T02:48:00.937000`. Last stored: `[28676] ASSISTANT 2026-11-03T04:19:12.318000` (empty).

**User-prompt inflation:** 903 USER headers include `[SYSTEM NOTIFICATION]` and `System notice:` idle-timeout kills. Real Alpha prompts ≈ **593**.

### 1.2 Three corpora — do not collapse them

| Corpus | Size | Time span | What it actually is | What it is not |
| :--- | :--- | :--- | :--- | :--- |
| **This Biomni chat** | 28,570 msgs / 132,717 transcript lines | 2026-04-28 → 2026-08-19, then **75.4-day gap**, then 2026-11-03 zip | Operating log of Brenus/CRC/8D → Sanofi/CEACAM5 → ovarian/RP/KELIM/MBD4/MFAP4 | Not the BrM DESeq2 lab notebook |
| **`docs/brm.md`** | **5,707 lines this-turn `wc -l`** (prior 06 prose said 5,708 — off-by-one, see C-11), 9 Cursor sessions (forensic S1–S9) | Mapped in `02_STRUCTURED_MAP_5708_LINES.md` | Where phantom `GSE131907`/`GSE186344` padj, `GSE223499` Option-D swap, AF3 chain-index, Table S2 scramble, Daraxonrasib abandonment were introduced | Not this 20k-msg chat |
| **Lab zip `Biomni_lab_downloads_20261103_034902`** | **1,010** payload files, zip `405,501,045` B, SHA-256 `1d831b2c67ac39f5cb095bcbff55aadb0f895c00adfd4804523c29fa5f091a6c` | Staged `docs/biomni_lab_downloads_20261103_034902/` (**1,012** files this-turn `find`) | `/mnt/results` of **this** chat: Brenus bundle (136 commits), `8d_admissibility_key.md`, MFAP4 tables, ARTISTRY-7 schemas, BriTROC, execution notebooks | Not a substitute for `crispro_brm_full_handoff_v1.zip` (175 BrM files, 8.13 MB) |

`docs/brm.md` is **23.3× shorter** than the Biomni transcript (5,707 vs 132,717 lines) and **covers a different job**. The 1,010-file lab zip is **49.9× larger** than the BrM handoff zip and has **zero relative-path overlap** with `docs/brm_handoff_v1/` (lab forensic §1.1).

### 1.3 Monthly traffic (this-turn JSON stream)

| Month | user | assistant | tool | total | % of session |
| :--- | ---: | ---: | ---: | ---: | ---: |
| 2026-04 (from 28th) | 48 | 455 | 534 | 1,037 | 3.6% |
| 2026-05 | 197 | 1,462 | 1,464 | 3,123 | 10.9% |
| 2026-06 | 39 | 489 | 445 | 973 | 3.4% |
| **2026-07** | **529** | **8,088** | **8,968** | **17,585** | **61.5%** |
| 2026-08 (to 19th) | 88 | 2,672 | 3,028 | 5,788 | 20.3% |
| 2026-09 | 0 | 0 | 0 | 0 | gap |
| 2026-10 | 0 | 0 | 0 | 0 | gap |
| 2026-11 (3rd only) | 2 | 32 | 30 | 64 | 0.2% |

**Gaps >7 days:** msg `3818` (8.8d, May 21→30), `4776` (17.0d, Jun 2→19), `4900` (11.4d, Jun 19→30), `28611` (**75.4d**, Aug 19→Nov 3).

### 1.4 Sibling fold crosswalk (04 + 05) — not a table dump

Do **not** copy 04/05 ledgers here. Cite headings + the counts that change this map.

**`04_BRENUS_CRC_SANOFI_CHAT_EXTRACT.md`**

| 04 heading | What 06 absorbs | Key counts / quotes |
| :--- | :--- | :--- |
| §1 Inventory | Extract lives in `docs/biomni_chat_extract/` — handoff copy still **ABSENT**. UA mention counts | Brenus 396 · Sanofi 73 · CEACAM5 83 · CARMEN 28 · Daraxonrasib/RMC-6236 **1** · KRYSTAL **1** (= **KRYSTAL-1**, not −10) · RASolute **0** |
| §2 Chronological milestone table | Aligns with this file’s P0/P4/P6/P10. PATH A memo idxs **356 / 411** (this map’s P0 still says `405` — C-12, do not rewrite the 11-phase table) | First Brenus lock msg `0` `2026-04-28T02:48:00` |
| §3 Brenus campaign | Activation 17 caps; RAG v4/v5 `pass_rate=0.667` n=3; S3 bundle 136 commits / 918 files; SC-001 HT29 BRAF conflict | Bundle HEAD `def6460` |
| **§4 Decided-trials ledger** | This map’s BS-03 named 3 IO comparators only. 04 locks **19 decided trials** (FAIL / TERMINATED / NULL / RESCUE / WATCH / ABANDONED) | **19**. Includes NCT04793958 **KRYSTAL-10** and NCT06625320 **RASolute 302** as **BURIED from this session (0 hits)** |
| **§5 Buried / sandbagged CRC (17)** | New rows BS-25 / BS-26 / BS-27. KRYSTAL-10 / RASolute / fabricated fits were already BS-19 | **17** (CRC-01…CRC-17). CRC-01 KRYSTAL-10 0 transcript hits. CRC-02 RASolute 0. CRC-04 fabricated **0.72 / 0.74 / 0.76 / 0.68 / 0.65** → bundle **UNSCORED** (`b4dbaf5`) |
| §6 Sanofi IP | Matches BS-05 KEEP website / QUARANTINE pitch. Royalty $15–30M = phantom | CARMEN-LC03 ITT PFS HR 1.14 |
| §7 Dataset existence | GAP-04 raw syn21435333 / syn2325330 **PHANTOM-on-this-disk**. Downloads rescue JSON still dirty | Dual-canon Downloads vs `b4dbaf5` |
| §8 Exact quotes | PATH A `fit(p, t) = clip( (p · t) / ‖t‖₂ , 0, 1 )`. PATH B prohibited. Floor JSON quoted 22.0 (C-02) | One-pager header still **DECISION PENDING** vs chat “SIGNED” (C-01) |
| §10 OPEN | Folded into this file’s §7 as U-13…U-18 | 04 U-01…U-12 |

**`05_GBM_VECTOR_8D_GATES_FORMULAS.md`**

| 05 heading | What 06 absorbs | Key counts / quotes |
| :--- | :--- | :--- |
| §0 How to read | Three things named “8D” must not be mixed | Pathway axes ≠ Agent-8D D1–D8 ≠ Brenus decode-wall D1–D8 |
| **§1 Formula ledger (F01–F32)** | Formula count **32**. F01 = same PATH A string as 04 §8. F04 combined `0.7·elig + 0.3·fit`. GBM/CRC **eligibility = 0.75 HARDCODED** | **32 formulas**. GBM note: `"All eligibility scores set to 0.75 (uniform)"` |
| **§2 8D axis table** | Canonical ranker axes **8**: `ddr, mapk, pi3k, vegf, her2, io, efflux, rss`. RSS opt-in. PATH A lock v1 Brenus comparators are **7D** (RSS omitted) | **8 pathway axes**. 7D vs 8D = C-14 |
| §3 Gate architecture | Mechanism-fit gates + Iron Leash 1–10 + ovarian 0–3 + immuno compartments. Not one engine | CRC/GBM elig cutpoint **0.75 HARDCODED** |
| **§4 GBM asset ledger** | Kills “05 ABSENT / path UNCLEAR”. Datasets on disk. 8D run is **CURATED / SYNTHETIC**. GLASS ZEB1 **DOWN** | GSE174554 n=8 **SC_UNDERPOWERED**; GLASS n=123 ZEB1 Δ −0.34 p=0.000184 **PERMANENTLY_CLOSED**; `8d_vector_run_results.json` **PHANTOM** in caspro (notebook only) |
| §5 Vector glossary | User “8d vector mechanism” = V1+V3 (pathway `p` + PATH A), not nanocarrier V6 | Do not launder V4/V5 into the ranker |
| §6 Chat vs wired | `mechanism_fit_ranker.py` **ABSENT** from caspro. CRC 0.7375 (lab) vs 0.6944 (caspro) dual-canon | Receipt frozen; builder not vendored |
| §7 Sandbag shortcuts S1–S20 | S4 hardcoded 0.75; S5 CRC mapk=0.70 fixed; S12 synthetic GBM vectors; S17 0.7375 vs 0.6944 | New BS-26 / BS-27 |
| §8 / §9 | 05 U1–U13; exec recon: no “we proved GBM”; formula 32; axes 8 | Folded below |

**Counts this fold now treats as cited (not re-computed):** 19 decided trials · 17 buried CRC · KRYSTAL-10 **0** hits · RASolute **0** hits · PATH A formula as quoted · 8 pathway axes · 32 formulas · GBM/CRC curated eligibility **0.75** · fabricated **0.72 / 0.74 / 0.76** vs bundle **UNSCORED**.

### 1.5 Contradiction evidence (04 vs 05 vs 06) — do not average

| ID | Topic | 04 | 05 | Prior 06 | Verdict | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **C-01** | PATH A lock status | `formula_decision_onepager.md` L5 **DECISION PENDING**; chat L35747 “SIGNED 2026-04-28” | F01 tagged **LOCKED**; same one-pager cited | BS-02 KEEP as locked | **UNCLEAR dual-canon.** Formula string KEEP. Status line not averaged. | Alpha (04 U-01) |
| **C-02** | BreAK must-beat OS | Quoted `os_threshold_months` **22.0** (20% over floor 18.3) | Board primary **23.6** (20% over 19.7); also documents secondary 22.0 | BS-03 named trials, not months | **Not a math fight.** Same floor JSON holds **both** (`os_threshold_months` 22.0 **and** `os_threshold_vs_primary_benchmark` 23.6). 04 under-quoted. Operational bar **UNCLEAR**. Do not average 22.8. | Alpha (protocol primary endpoint) |
| **C-03** | STC-1010 canonical fit | Three numbers: **0.7375 RETIRED** / **0.6944** / ranker unselected **0.5605** (n=485) | Lab JSON still “Canonical fit 0.7375”; caspro JSON **0.6944**; F10 unselected **0.5605** | §5.1 omitted these | **Agree on the three numbers.** Prior 06 incomplete, not opposed. Lock **0.5605** as frozen receipt. **KILL 0.7375**. | Zo (BS-27) |
| **C-04** | KRYSTAL-10 in this chat | Transcript `KRYSTAL-10` = **0**; sole `krystal` = **KRYSTAL-1** idx 3853 | n/a | BS-19 said 0 | **Agree.** | — |
| **C-05** | RASolute / NCT06625320 in this chat | UA **0 / 0**. Lives in `docs/brm.md` L5037–5048 | n/a | BS-19 said 0 | **Agree.** | — |
| **C-06** | Fabricated Daraxonrasib fits | Downloads still **0.72 / 0.74 / 0.76**; bundle after `b4dbaf5` **UNSCORED** | n/a (does not re-score Daraxon) | BS-19 KILL analogy | **Agree.** | Zo (quarantine Downloads copy — 04 U-03) |
| **C-07** | GBM decode path | n/a | §4A–4C cite `gbm_gse174554_canonical_verdict.json`, `gbm_crc_canonical_board.json`, `trial_decode_registry_v2.json` EM-02-A, worker-0 notebook | BS-04 **QUARANTINE until path cited**; U-02 “05 ABSENT” | **Prior 06 stale.** Paths exist. Split BS-04 (KEEP datasets / QUARANTINE curated 8D / KILL ZEB1-up transfer). | This fold |
| **C-08** | GBM/CRC eligibility 0.75 | n/a | F04 / S4 **HARDCODED** uniform 0.75 | Not in ledger | **05 adds.** New **BS-26 KILL-as-meter**. PATH A fit column stays KEEP. | This fold |
| **C-09** | What “8D” means | PATH A formula only | Three taxonomies (V1 pathway / V4 Agent-8D / V5 decode-wall) | P0/P2 used “8D” loosely | **06 under-specified, not fact-wrong.** 11-phase labels stay. Do not treat V4/V5 as ranker axes. | Map authors |
| **C-10** | Immuno Gide 0.804 / HR 0.370 / GSE120575 0.877 | n/a | Conf **M** — present in contract file, specific rows **not line-quoted** this extract | BS-12 KEEP as locked | **UNCLEAR exact floats in this fold.** Do not drop moat KEEP. Do not promote Conf H. | Zo (05 U5) |
| **C-11** | `docs/brm.md` line count | 5,707 | n/a | Header table 5,708; later 5,707 | **Resolved this turn:** `wc -l` = **5707**. 5,708 was off-by-one. | This fold |
| **C-12** | PATH A memo `message_index` | 356 / 411 | n/a | P0 “memo at `405`” | **UNCLEAR which index is the wrap.** 11-phase map **kept**. | Map authors |
| **C-13** | `mechanism_fit_ranker.py` in caspro | n/a | **ABSENT**; TS constants only | BS-02 “wire locked fit” | **05 adds.** Chat over-claimed code presence. Revive path stays “wire,” not “already executes.” | Next CRC wire |
| **C-14** | 7D vs 8D.v1 | Formula has no axis count | F26 Brenus lock **7D** (RSS omitted); CRC ranker **8D.v1** | Did not distinguish | **UNCLEAR version** on any LATIFY/Brenus score that omits the axis list. Do not mix. | Next CRC wire |
| **C-15** | Two files named `04_*` | U-12 | Cites `04_IRON_LEASH_AND_NEXT_STEPS.md` | Header already said IRON_LEASH ≠ Brenus extract | **Agree.** Numbering collision OPEN. | Alpha |

---

## 2. Chronological phase map

11 phases. Not a 20k-row dump. `message_index` ranges are inclusive of the dominant work, not a promise that no other topic appears.

| Phase | Date span | Msg index | Dominant topics | Key artifacts / forks | Forensic note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P0 — Brenus lock** | 2026-04-28 → 05-01 | `0`–`1236` | STC-1010 / BreAK CRC-001 canon, MSS CRC IO comparators, 8D-readiness, PhD freeze | Opening user dump is the Brenus Use-Case Plan. Agents 1–4: corporate dossier, trial protocol, comparator history, biomarker map. `fjkiani/Brenus` push at `465`. 8D PATH A vs PATH B memo at `405` | **This is the commercial door the rest of the session is supposed to serve.** |
| **P1 — Foghorn / YC / Kim** | 2026-05-02 → 05-08 | `1237`–`1861` | Foghorn pipeline hunt (`1237`), YC PDF hallucination + reconstruction (`1426`–`1515`), Dr Kim equity contract (`1553`) | Grant/YC copy starts leaking BACE1/NOM1 as brochure genes (`1324`) | Brochure, not meters. |
| **P2 — GBM/BrM 8D + therapy-fit v3** | 2026-05-08 → 05-13 | `1862`–`3054` | User: “we will now work on the GIB / BrM dataroom” (`1862`). Therapy-fit v3 / SL bridge (`2149`). Resistance API crash (`2450`) | BACE1 n=39 session-wide; first user hit `1324` is framework text, not GSE DE | BrM **mentions** enter here. `GSE223499` still **0**. |
| **P3 — GBM escape + IP/YC** | 2026-05-13 → 05-21 | `3055`–`3817` | GBM lane (`3055`, `3287`). a16z Speedrun / YC forms (`3471`–`3522`). IP/SL graveyard audit (`3525`) | — | User later (`4780`) accuses sandbag on GBM escape map. |
| **P4 — Sanofi / CEACAM5 / CARMEN** | 2026-05-30 → 06-02 | `3818`–`4772` | Sanofi pitch (`3818`). “we already decoded CEACAM5” (`3853`). CARMEN-LC03 (`4023`). CEACAM5 through 8D (`4619`) | PLCO first appears as **tool** listing (`3877`), not a user science ask | First real LATIFY/CEACAM5 **work** cluster. Literal `LATIFY` is **not** in msg `0` (this-turn check); family regex `LATIFY\|NCT05450692\|ceralasertib` can false-hit earlier. |
| **P5 — GBM recall + STC-1010 productize** | 2026-06-19 | `4776`–`4859` | “where are all the GBM trials saved?” (`4776`). “dont sandbag - we did not use escape map for GBM” (`4780`). Turn Brenus memos into a deliverable (`4859`) | — | **Proof of burial:** Alpha cannot find GBM outputs 11 days later. |
| **P6 — Kim contracts / vector master / RAG** | 2026-06-30 → 07-08 | `4900`–`8400` | IP/moat vs Kim contracts (`4900`,`4973`,`5035`). `brenus_vector_master_v1/v2` (`6821`,`6951`). Qdrant RAG, 50 stress queries | Daraxonrasib still **1** hit session-wide (`2138` AACR extract) | Matches BrM audit **C1**: PDAC strike never happens here either. |
| **P7 — LATIFY retrodiction + KB** | 2026-07-12 → 07-15 | `8410`–`9215` | Responders for Brenus/CRC + CEACAM5 (`8410`). `retroactive_prediction_run.py` LATIFY/CAPRI (`8442`). 609-trial registry (`8457`). KB clone (`8669`) | LATIFY n=373, peak July (215) | Website LATIFY receipts are the locked commercial surface; chat asks why reconstruction is not production. |
| **P8 — Ovarian / MBD4 / MFAP4 / ARTISTRY / PLCO / KELIM** | 2026-07-16 → 07-31 | `9427`–`22379` | `GSE165897` first tool hit `10581` (n=257). MFAP4 clinical-validation ask `12620`. PLCO worker `13668`/`14979`. EGA `EGAD00001011049` `15402`. MBD4 fake-test accusation `19853` | July keyword density: ovarian 1,656, MFAP4 482, MBD4 484, KELIM 310, Resistance Prophet 759 | **Volume burial engine.** CRC/8D still occur but are no longer the majority. |
| **P9 — Resistance Prophet / Zeta-Core / PAT theater** | 2026-08-04 → 08-19 | `22793`–`28593` | Manuscripts push (`22793`). GENIE (`23362`). BriTROC EPV fight (`23692`). Zeta-Core v4 PSA (`25204`). “infinitely sandbag” (`27109`). NFE unblockers (`28297`) | Resistance Prophet 237 in August | Agent stalls on git/PAT; Alpha pastes PATs (do not copy; rotate). |
| **P10 — 75-day silence + zip order** | 2026-11-03 | `28611`–`28676` | Zip home-folder signals, vectors, **“2 door”**, Brenus, Resistance Prophet (`28611`). Last scientific user (`28649`) is again **STC-1010 MSS CRC biomarker map** | This zip **is** the 1,010-file lab archive | Session returns to P0. Two-door was never named until this zip prompt (`two-door`/`two_door` = **0** hits; `2 door` = **1**). |

---

## 3. Buried-science ledger

Crosswalk of prior audit findings (A1–A9, B1–B7, C1–C7, D1–D4) and chat-native science. **Revive path** is the next honest move, not a claim it is already wired.

| ID | Finding | Introduced in chat (`message_index`) | How it was sandbagged | Revive path | Moat |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BS-01** | Brenus STC-1010 / BreAK CRC-001 canon + 8D-readiness | User `0` (2026-04-28); freeze `331`; 8D audit `1050` | July 61.5% volume + 75-day gap. CRC is **not** a website page. 04 now on disk (§3 campaign + §4 **19** decided trials) | Cite 04; keep PATH A string (`lab: path_a_recomputation_lock_v1.md`, diamond **D-10**). Status line = C-01 | **KEEP** |
| **BS-02** | 8D PATH A vs PATH B formula decision | 04 idxs **356 / 411**; this map P0 still says `405` (C-12) | Treated as memo, not a fail-closed ranker. caspro has TS constants only (`mechanism_fit_ranker.py` **ABSENT** — 05 §6 / C-13) | Wire locked `fit = clip((p·t)/‖t‖₂, 0, 1)` only; no `mission_fit_discount`; no PATH B | **KEEP** (formula) / status **UNCLEAR** (C-01) |
| **BS-03** | MSS CRC IO comparator floor (CheckMate 9X8, QUILT, GRANITE) + 04’s 19-trial ledger | User `879`/`912` (2026-04-30); 04 §4 | Recycled into pitch decks; not a live in-silico trial page. Must-beat OS **22.0 vs 23.6** = C-02 | Keep FAIL/TERMINATED rows as comparator floor. Do not pick 22.0 or 23.6 until Alpha names the protocol bar. Do not upgrade to “we predicted the failure” without a receipt path | **KEEP** (decisions) / must-beat months **UNCLEAR** |
| **BS-04** | GBM / GIB 8D decode | User `1862` (2026-05-08); recall `4776`/`4780` (2026-06-19) | Alpha could not locate saved trials. 05 now cites paths. 8D run = curated vectors + **elig 0.75 hardcoded**. ZEB1-up escape **contradicted** (GLASS DOWN) | KEEP dataset verdicts in 05 §4A. QUARANTINE curated 8D combined scores (05 §4C). KILL ZEB1-up BrM-transfer | **KEEP** (GSE174554 underpowered / GLASS ZEB1 DOWN) / **QUARANTINE** (curated 8D run) / **KILL** (ZEB1-up transfer) |
| **BS-05** | CEACAM5 / CARMEN-LC03 / Sanofi transfer | User `3818`/`3853`/`4023`/`4619` (May 30–Jun 2) | Agent “corrected evidence tiers” instead of re-running 8D (`4558`–`4605`) | Website `/proof` already carries CEACAM5. Chat adds Sanofi-specific BD package in lab zip (`CrisPRO_Sanofi_PitchDeck_v1.pptx`) | **KEEP** (receipted website) / **QUARANTINE** unsourced pitch claims |
| **BS-06** | LATIFY retrodiction (`retroactive_prediction_run.py`) | User `8442` (2026-07-12); family n=373 | Asked “why isn’t this production?” — not answered with a live endpoint | Website LATIFY card is locked. Do not re-derive scores from chat prose | **KEEP** |
| **BS-07** | PLCO worker (`w4_plco`) | First tool `3877`; user `13668`; system `14979` (2026-07-20) | Homepage doctrine already dropped PLCO/KELIM as identity; chat still ran PLCO workers | Keep website PLCO receipts; do not resurrect as homepage identity | **KEEP** (proof page) / **KILL** as homepage identity |
| **BS-08** | MBD4 LOF SL (gemcitabine + ceralasertib) | Assistant `1746`; user peak `9140`/`9816`/`19853` (July); n=543 | User `19853`: “tests R fake… copied the same thing for MBD4”. BH honesty later locked in moat manuscript (unadj 0.021 vs padj 0.063) | Already locked at `72a8bbd` Gate 1. Do not re-litigate from chat | **KEEP** |
| **BS-09** | MFAP4 platinum / stromal cage | Tool `2476`; user `12620` (2026-07-19); n=585 | Honest meter is **n=75 AUROC 0.6836** (probe `212713_at`). Retracted n=101 0.7625 is forbidden (caspro lesson) | Wired `POST /v1/hgsoc/mfap4/score` + Gate 2. Chat adds ARTISTRY-7 schemas | **KEEP** (0.6836) / **KILL** (0.7625) |
| **BS-10** | ARTISTRY-7 Tier 1A/1B stromal-cage window | User `11148`/`11361` (2026-07-18); n=175 | User ordered DEFAULT-OFF simulation, not clinical promotion (`11361`) | Lab: `artistry7_platinum_window/`. Not a caspro route yet | **QUARANTINE** as product claim / **KEEP** as RUO schema |
| **BS-11** | `GSE165897` n=11 (chat) vs two-door (locked) | First tool `10581` (2026-07-16); n=257. String `two-door`=**0**. User `28611` says “2 door” | Lab forensic: Serial-SAE headline `rho = -0.71, p = 0.014` was a **hardcoded string**; recompute `rho = -0.2091, p = 0.5372`. Locked two-door uses different meters (KW/MWU receipts in moat `docs/proofs/`) | Use moat receipts only. Kill chat-era SAE headline | **KEEP** (moat two-door) / **KILL** (hardcoded rho) |
| **BS-12** | Immuno contract v12 (Deng bag 0.881 / GSE290722 0.782 / Gide 0.804) | `GSE290722`=0, `cart_infusion`=0, `immuno v12`=0, `Gide`=1 AACR chair false-hit | **Not in this chat.** Locked only in `scientist-monai-moat` `72a8bbd` | Do not “find” immuno v12 in Biomni prose | **KEEP** (moat) / **n/a in chat** |
| **BS-13** | BACE1 Chafe `GSE237446` + DepMap non-essential + TCGA-EGFR | User/tool from `1324`; `GSE237446` n=17; verubecestat n=38 | Chat uses BACE1 as YC/therapy-fit brochure. Real GSE223499 DE **never runs in this session** | Keep Chafe + DepMap Chronos −0.068 + TCGA p<0.001 from BrM forensic 1A | **KEEP** |
| **BS-14** | `GSE223499` Option C→D malignant-vs-reactive swap (**B1**) | **0 hits** for `GSE223499`, `tumor_like`, `confirmed_tumor`, `Tumor (Not Tumor)` | Introduced in **`docs/brm.md` S1**, not this chat | Quarantine `tumor_like` padj 0.0708 as malignant DE | **KILL** as BrM-vs-primary malignant proof |
| **BS-15** | Phantom `GSE131907`/`GSE186344`/`CPTAC` padj (**B3**) | `GSE131907`=0, `GSE186344`=0, `padj`=**3** (July tools only), `CPTAC` n=10 | Lives in `brm.md` S1–S2. This chat never ran those DESeq2s | Cite forensic: BACE1 GSE131907 padj 0.017→0.574; GSE186344 retired (BrM-only) | **KILL** |
| **BS-16** | NOM1 as druggable target (**B4**) | User `1324`; n=16 | Brochure gene in YC/grant text. Chronos −0.725, 82.5% pan-lethal | Biomarker-only / housekeeping toxic | **KILL** as target |
| **BS-17** | AF3 chain-index / palindrome / missing SpCas9 (**A1–A4**) | AF3 n=74; `SpCas9`=1 (guide-scan, not RNP fold); `chain_pair_iptm`=0; `R-loop`=0; `palindrome`=0 | Fraud + correction live in `docs/brm.md` S6 + handoff `clean_signals/af3_corrected_cif_chain_iptm_and_pae.*` | Keep 25/25 CIF R-loop after reindex; kill “classic duplex vs R-loop” split | **KEEP** (corrected CIF) / **KILL** (misindex narrative) |
| **BS-18** | Target-Lock `0.976` / `mission_fit_discount` (**A7/D1**) | `mission_fit` family n=31 from `4366` (manuscript tool dump); `mission_fit_discount` literal = **0** | Website doctrine still leads with AUROC 0.976. Forensic: label encoding, FDA 11-target flatline 0.353±0.000 | Honest class-aware AUROC without Enformer 0.6889/0.7478 (forensic 1B) | **KILL** as FDA proof. **OPEN** vs live website copy |
| **BS-19** | Daraxonrasib / RMC-6236 / NCT06625320 (**C1**) + KRYSTAL-10 | **n=1** (`2138`, AACR extract). 04 §1/§5: KRYSTAL-10 **0** hits, RASolute **0** hits (C-04, C-05) | Chat never executes the 5-worker PDAC package. Lab zip recovers campaign; `b4dbaf5` strips fabricated **0.72 / 0.74 / 0.76 / 0.68 / 0.65** to **UNSCORED** (C-06). 04 CRC-01/02/04 | Keep trial-portfolio facts from bundle post-`b4dbaf5`; never restore Downloads scores | **KEEP** (UNSCORED portfolio) / **KILL** (analogy scores) |
| **BS-20** | Serial-SAE / BriTROC / Resistance Prophet as “clinical product” | RP n=1,026; user `27807` (2026-08-19): treat S3 as candidate, **not** clinical product | Hardcoded rho (lab forensic); SYNTH_001 fake FIFO; 5/182 pairs; EPV fights | Keep BriTROC breakpoint **Spearman ρ = 0.830, p = 5.77e-23, n=86** as technical concordance (D-09). Do not promote RP | **KEEP** (ρ=0.830 technical) / **KILL** (hardcoded rho, SYNTH_001) / **QUARANTINE** (RP product) |
| **BS-21** | Zeta-Core v4 PSA / prostate KELIM-proxy | User `25204` (2026-08-13) | Shipped before stability gate (user `25852`) | Not ovarian KELIM. Not website. | **QUARANTINE** |
| **BS-22** | LRP1 peritumoral sink (**B6**) | Literal `LRP1` = 1 hit and it is **`LRP1B`** (tool `1958`) | Chat never inspected Zhang MOESM6 Row 326. Forensic found +1.8066 log2FC | Use `clean_signals/zhang2022_moesm6_brm_and_lrp1_sink_hits.csv` | **KEEP** (forensic) |
| **BS-23** | Test-gate gutting / xfail / frontend stubbing (**C2/C6**, lab S17) | `xfail` n=42, first user `2149` | 310→15 tests in `brm.md`; lab zip: 3-route frontend strip, `supabase = null` | Zero-xfail leash already in `04_IRON_LEASH` | **KILL** |
| **BS-24** | Foghorn / YC pitch | User `1237`, `1426`; YC n=117, Foghorn n=137 | Hallucinated CrisPRO as “source-catcher” (`1467`). Not a meter | Do not cite as science | **BROCHURE** |
| **BS-25** | GAP-04 MSS CRC KRAS G12/13 + TP53 (04 CRC-03) | **0** in session chat. Bundle `gap04_kras_tp53_comutation.json` | Session never cites 14.9% / 1.94×. Raw syn21435333 / syn2325330 **absent** on this disk (04 §7) | Cite derived JSON only; re-pull Synapse before treating as IPD (04 U-02) | **KEEP** (derived JSON) / **QUARANTINE** (raw matrices absent) |
| **BS-26** | Hardcoded eligibility **0.75** on CRC ranker + GBM 8D (05 F04 / S4) | CRC `crc_ranker_summary.json` L8; GBM worker-0 `eligibility_note` | Uniform constant, not a patient eligibility model. Combined `0.7·0.75 + 0.3·fit` launders fit as a board-ready score | Publish PATH A **fit** only. Do not ship `combined` as clinical eligibility | **KILL** (elig-as-meter) |
| **BS-27** | STC-1010 three-number sandbag (04 CRC-07 / 05 S17) | UA 23 msgs `0.7375`, 11 msgs `0.6944`; ranker idx 6684 **0.5605** n=485 | KG 0.7375 RETIRED; code 0.6944; unselected mean 0.5605 (Δ −0.165, rank-1 1.9%). n=9 TMB≥25 is not the product climax | Surface 0.5605 + n=9 together; never lead with n=9 or 0.7375 | **KEEP** (0.5605 unselected) / **KILL** (0.7375) |

**Ledger counts:** 27 rows (24 + BS-25/26/27). Canonical class tally in **§5.4** (splits counted in every class they earn).

---

## 4. Map to LOCKED work — what the chat adds that is NOT yet wired

This-turn moat HEAD: `72a8bbd` `feat(ovarian-v9): lock ovarian_two_door_standalone_v9.py and Subtype 2A/2B VDR+EPHA2 Door 2 routing`.

| Locked surface | What is already true (do not re-implement) | What this chat adds that is **not** wired | Conf |
| :--- | :--- | :--- | :--- |
| **Ovarian two-door v3/v9** | Gate 0 EOC3, Gate 1 MBD4, Gate 2 MFAP4 0.6836 + AACR A065, Gate 3 Door1 vs Door2, Subtype 2A/2B VDR+EPHA2. `POST /v1/ovarian/arbiter/score`. GSE165897 11-patient FastAPI receipt | Chat never names two-door. Adds ARTISTRY-7 doctor-portal JSON, stromal-cage manuscript, BriTROC CN concordance, Serial-SAE (contaminated). `GSE165897` in chat is the **same cohort id**, different (partly fraudulent) SAE headline | H on lock / H on chat-absent name / M on which SAE files are still live |
| **Immuno v12 / contract v3** | `cart_infusion_bag` Deng 0.881, `cart_in_vivo_blood` GSE290722 0.782, `ici_tumor_biopsy` Gide 0.804 / HR=0.370 | **Nothing.** Those tokens are absent from 28,570 messages | H |
| **LATIFY / CEACAM5 / PLCO (website)** | Home/proof doctrine: LATIFY delta +0.3658, CEACAM5 no-expression-gate, PLCO 19.75 vs 0.035 U/mL/month | Chat adds Sanofi-facing CEACAM5 8D transfer, LATIFY “why not production” (`8442`), PLCO worker (`w4_plco`). **CRC is not a site page** despite CRC n=1,312 vs LATIFY n=373 | H |
| **BrM AF3 R-loop correction** | `clean_signals/af3_corrected_cif_chain_iptm_and_pae.*` — all 5 guides R-loop after CIF reindex | This chat did not introduce or correct chain indices (`chain_pair_iptm`=0). AF3 talk is grant/manuscript dump | H |
| **caspro Tumor Board UI** | Still July `e2aa31a` snapshot (scratchpad 2026-11-01) | Chat ovarian/RP work is **not** on `/tumor-board/` | M (UI not re-crawled this turn) |

**Not-yet-wired list (chat/lab → product):**

1. BreAK CRC-001 / PATH A ranker / STC-1010 8D package → no `/proof/crc` and no CRC card on home. 04 §4 = **19** decided trials; caspro has no Python ranker (C-13).  
2. GBM 8D trial decode → **paths now cited** in 05 §4A–4C. Still **not wired**. Curated 8D run + elig 0.75 stay QUARANTINE/KILL (BS-04 / BS-26).  
3. ARTISTRY-7 `doctor_portal_platinum_window.schema.json` → not mounted on caspro ovarian board.  
4. LATIFY `retroactive_prediction_run.py` production endpoint → website is receipts, not that worker.  
5. Daraxonrasib UNSCORED rescue campaign → excluded from BrM zip; present in lab Brenus bundle post-`b4dbaf5` only.  
6. Resistance Prophet S3 → explicitly **not** clinical (`27807`); do not wire as arbiter.

---

## 5. Moat isolation (numbers first)

### 5.1 Clinical / commercial moat (KEEP)

Lead with the meter, then the sentence.

- **0.6836 AUROC (n=75, GSE63885, probe 212713_at)** — MFAP4 univariate platinum; Gate 2. Chat asked to “bring this into clinical validation” at `12620`.  
- **MBD4-KO gemcitabine IC50 2.3 nM vs 20.1 nM WT, p=2.82e-3** — Gate 1 causal isogenic. Chat MBD4 n=543, then fake-test fight `19853`.  
- **LATIFY subgroup delta +0.3658 (0.8936 vs 0.6295)** — website proof. Chat `8442` is the retrodiction-production gap.  
- **CEACAM5: real target, no expression gate** — website proof. Chat `3853`–`4619` is the Sanofi 8D transfer that never became a CRC/Sanofi page.  
- **PLCO CA-125 velocity 19.75 vs 0.035 U/mL/month (500-fold)** — website proof, not homepage identity.  
- **GSE165897 two-door (moat proofs, not chat SAE):** all-11 KW p=0.051429; n=10 KW p=0.003333; Door1 vs Door2 MWU p=0.02857.  
- **Immuno v12:** Deng bag 0.881 / GSE290722 0.782 / Gide 0.804 — **moat only, chat-absent**.  
- **BACE1:** Chafe GSE237446 #1 BrM driver; DepMap mean Chronos **−0.068** (0.1% dependent); TCGA-LUAD EGFR-mut p<0.001.  
- **AF3:** 25/25 models R-loop after CIF reindex; spacer PAE 15.73–16.33 Å.  
- **LRP1 TIME-B vs LB +1.8066 log2FC (3.50×, q=1.48e-6)** — forensic, not chat.  
- **BriTROC-1 breakpoint concordance ρ=0.830, p=5.77e-23, n=86** — technical, not a clinical endpoint.  
- **PATH A locked comparator scores** (IMblaze370 0.8262 vs 0.6751, etc.) — CRC commercial spine in lab zip, unwired. 7D lock (05 F26) ≠ CRC ranker 8D.v1 (C-14).  
- **STC-1010 unselected MSS mean fit 0.5605 (n=485)** — frozen ranker receipt (04 CRC-07 / 05 F10). Not 0.7375.  
- **GSE174554 n=8 SC_UNDERPOWERED; GLASS ZEB1 DOWN p=1.84e-4** — GBM datasets KEEP as negative/underpowered receipts, not a fitted GBM engine.

### 5.2 Brochure (not moat)

- YC/Foghorn/a16z decks (P1/P3).  
- “AI-powered” without a mechanism sentence (banned by website doctrine).  
- 0.976 / 11/11 FDA copy **as currently written** if it still rides `mission_fit_discount` (forensic A7 vs website doctrine — **OPEN contradiction**).  
- Therapy-fit “LIVE Enformer” badges (forensic D2).

### 5.3 Fraud / kill (never cite)

- `GSE223499` Option D `tumor_like` as malignant BrM-vs-primary.  
- `GSE131907` BACE1 padj 0.017; `GSE186344` NOM1 p=1.33e-184.  
- NOM1 as a drug target (Chronos −0.725, 82.5% pan-lethal).  
- AF3 `[0=RNA]` indexing; palindrome spacers; Table S2 scrambled `baseMean` (FAM72A 9.1×, SLC45A4 16.3×).  
- Serial-SAE hardcoded `rho = -0.71, p = 0.014` vs recompute `−0.2091, p = 0.5372`.  
- Daraxonrasib fit **0.72 / 0.74 / 0.76** (stripped **UNSCORED**).  
- SYNTH_001 fake FIFO; xfail-as-green; 310→15 tests.  
- MFAP4 retracted 0.7625 (n=101 NA-as-sensitive).  
- Uniform eligibility **0.75** as a clinical meter (CRC ranker + GBM 8D).  
- STC-1010 canonical **0.7375**.  
- ZEB1-up at GBM recurrence as BrM-transferable escape.

### 5.4 Canonical tally

| Class | Count | IDs |
| :--- | ---: | :--- |
| **KEEP** | **15** | BS-01, 02-formula, 03-decisions, 04-datasets, 06, 08, 09-honest, 12-moat, 13, 17-CIF, 19-portfolio, 20-ρ, 22, 25-json, 27-0.5605 |
| **QUARANTINE** | **6** | BS-04-8D-run, 05-pitch, 10 ARTISTRY product, 20-RP product, 21 Zeta-Core v4, 25-raw-Synapse |
| **KILL** | **11** | BS-04-ZEB1-up, 07-homepage, 11-rho, 14, 15, 16, 17-misindex, 18-FDA-tautology, 23, 26-elig-0.75, 27-0.7375 |
| **BROCHURE** | **1** | BS-24 |
| **UNCLEAR (not a class)** | **4** | C-01 PATH A status, C-02 must-beat 22.0 vs 23.6, C-12 memo idx, C-14 7D vs 8D |

---

## 6. Leash for the next iteration (checklist, not essay)

Copy this. Fail-closed. Complements `04_IRON_LEASH_AND_NEXT_STEPS.md` (BrM gates) — does **not** replace it.

```text
[CHAT-MAP LEASH — sess_be00d436f181 / caspro 06]

1. THREE CORPORA: (a) this Biomni chat, (b) docs/brm.md, (c) lab zip 1,010 files.
   Never cite a GSE padj from (b) as if it ran in (a). GSE131907/GSE186344/GSE223499
   are 0 hits in (a).

2. CRC/BRENUS/8D CANNOT GO TO ZERO: any turn that touches proof/website/TB must
   either (i) show the BreAK CRC-001 / PATH A / STC-1010 artifact path, or (ii)
   write PENDING with message_index of last CRC user prompt. Silence = burial.

3. GBM: cite 05 §4A paths (GSE174554 verdict JSON, GLASS EM-02-A, board JSON).
   Curated 8D run + elig=0.75 are QUARANTINE/KILL. Do not reconstruct from May
   prose. "42 GBM trials" is registry overload (05 §4D).

4. TWO-DOOR NAME: the chat says "2 door" once (msg 28611). The lock lives in
   scientist-monai-moat 72a8bbd. Do not invent two-door math from Biomni SAE.

5. IMMUNO V12: GSE290722 / cart_infusion / contract v3 are absent here. Cite
   moat JSON sha 5692cbcb… or do not speak.

6. MFAP4: 0.6836 n=75 only. 0.7625 is a kill. Probe 212713_at.

7. SERIAL-SAE: if a script writes rho=-0.71 as a string, it is fraud. Recompute
   or omit.

8. DARAXONRASIB: UNSCORED unless PATH A arithmetic is on disk this turn.
   n=1 AACR mention in this chat is not a campaign.

9. WEBSITE 0.976: forensic retracted it. Do not re-print as FDA proof without
   a non-leaking AUROC receipt. Doctrine vs forensic = OPEN, not assumed resolved.

10. NO SECRET PASTE: this extract contains GitHub PATs, Synapse JWTs, Qdrant
    keys in USER messages. Do not echo them. Rotate. Do not git-add the JSON
    to a public remote.

11. SIBLING FOLD: 04 + 05 folded this patch (§1.4 / §1.5). Do not duplicate
    their tables. Re-Read 04/05 before changing a CRC/GBM number.

12. VOLUME TEST: if a month is >50% of messages (July=61.5%), the original
    door (P0 Brenus) is presumed buried until a KEEP artifact is re-cited.
```

---

## 7. OPEN / UNCLEAR table

| ID | UNCLEAR | Assumed-leak if ignored | CLEAR strategy | Owner |
| :--- | :--- | :--- | :--- | :--- |
| U-01 | ~~`04_BRENUS_*` absent~~ | — | **CLEARED this fold.** File on disk; §1.4 cites it | — |
| U-02 | ~~`05_GBM_*` absent~~ | — | **CLEARED this fold.** File on disk; §1.4 cites it | — |
| U-03 | GBM “42 trials” vs 3 EscapeMap analyses after `4776` | “We decoded 42 GBM trials” | 05 §4D: registry v2 has 42 trials **across programs**; `GBM_ESCAPEMAP: 3`. Paths exist. Residual: original `t` vectors for the curated 8D run (05 U2) | Zo if Alpha wants `t` recovery; else OPEN |
| U-04 | Website still serving 0.976 / Enformer LIVE (forensic D2) | Shipping tautology as moat | Re-Read `src/data/tumor-board/anchor/bm01_evo2.ts` this turn before any site claim | Zo on website task |
| U-05 | caspro TB still `e2aa31a` snapshot vs moat `72a8bbd` | Chat ovarian work looks “shipped” | Browser-verify `/tumor-board/` | Zo on UI task |
| U-06 | Which Serial-SAE files in lab zip still contain hardcoded rho | Re-citing −0.71 | Grep `serial_sae_validation` for `-0.71` | Next agent |
| U-07 | LATIFY `retroactive_prediction_run.py` vs website receipt identity | Two LATIFY scores | Diff worker output vs `latify_curl_receipts.json` | Next agent |
| U-08 | Chat extract JSON contains live PATs/JWTs | Credential leak if pushed | Rotate PATs; gitignore or redact extract; do not print tokens | Alpha (rotate) + Zo (redact) |
| U-09 | Immuno v12 totally absent from chat | “Chat supports immuno v12” | Stop looking here | — |
| U-10 | LUNA FROC@2 | Clinical imaging DONE | Unrelated to this chat; still UNPROVEN per moat ledger | Moat imaging |
| U-11 | 107 missing `message_index` holes | Citing a hole as a message | Treat holes as dropped/system; do not invent | Map authors |
| U-12 | Keyword scan used first 20k chars then no-truncate for absences | Buried GSE id after char 20k | Absences confirmed no-truncate = 0. Non-absent keywords may be under-counted in long tool dumps | Map authors |
| U-13 | PATH A “SIGNED” vs one-pager “DECISION PENDING” (C-01 / 04 U-01) | Shipping ranker as manager-locked | Alpha records one status on the one-pager | Alpha |
| U-14 | Must-beat OS 22.0 vs 23.6 (C-02) | Averaging into 22.8 or picking silently | Same JSON holds both bars. Alpha names protocol primary | Alpha |
| U-15 | Raw syn21435333 / syn2325330 absent (04 U-02 / BS-25) | Citing 14.9% as if IPD were here | Re-download Synapse; sha256 vs `b4dbaf5` body | Zo (if Alpha authorizes network) |
| U-16 | Downloads rescue JSON still has 0.72–0.76 (04 U-03 / C-06) | Next agent re-injects fabricated fits | Quarantine Downloads copy; git-show `b4dbaf5:` only | Zo |
| U-17 | 7D vs 8D.v1 on LATIFY/Brenus scores (C-14) | Mixing RSS-on and RSS-off fits | State axis list on every score | Next CRC wire |
| U-18 | Two files named `04_*` (04 U-12 / C-15) | Handoff opens the leash when they meant Brenus | Alpha pick numbering | Alpha |
| U-19 | Gide 0.804 / HR 0.370 / GSE120575 0.877 not line-quoted in 05 (C-10) | Conf H on rounded scratchpad | Line-quote contract / `zeta_immunotherapy_external_validation_v3.json` | Zo leftover |
| U-20 | `TMB → io` function for the 485-row CSV (05 U1) | Treat io=0.226 at TMB=3.3 as a fitted law | Recover builder from Brenus clone | Zo if Alpha grants clone |
| U-21 | OpenRouter keys in `brenus_rag_pipeline_v5.py` (04 U-09) | Key reuse / leak | Rotate; redact file | Alpha |

### This-turn audit (anti-sandbagging)

| Item | Action/Answer | Source path or evidence | Conf |
| :--- | :--- | :--- | :--- |
| Extract counts | 28570 / 903 / 13198 / 14469 | JSON header + role counter | H |
| Transcript lines | 132,717 | `wc -l` | H |
| Lab zip files | 1,010 payload / 1,012 find | lab forensic + `find \| wc -l` | H |
| `docs/brm.md` | 5,707 lines | `wc -l` this fold (C-11 resolved) | H |
| GSE223499 etc. absent | 0 no-truncate | Python full-content scan (prior turn) | H |
| Moat HEAD | `72a8bbd` | Prior-turn `git log -1`; not re-run this fold | M |
| Sibling 04 | 306 lines; 19 trials / 17 buried CRC | Read `04_BRENUS_CRC_SANOFI_CHAT_EXTRACT.md` this turn | H |
| Sibling 05 | 827 lines; 32 formulas / 8 axes / elig 0.75 | Read `05_GBM_VECTOR_8D_GATES_FORMULAS.md` this turn | H |
| Floor JSON both bars | 22.0 **and** 23.6 | Read `break_crc001_comparator_floor.json` L19 + L28 this turn | H |
| Forensic A/B/C/D | Not rewritten; cited | Prior-turn Reads; 04/05 fold only | H |
| Website 0.976 still live | UNCLEAR this turn | Not re-grepped in `src/` this turn | M |
| TB UI still e2aa31a | UNCLEAR this turn | Scratchpad 2026-11-01, not re-verified | M |

No Confidence **L** rows. **M** rows: U-04, U-05, moat HEAD not re-logged this fold — not submitted as PASS.

---

### Part-2 / v2 Gated Ranker Sync Block (2026-11-03 — 9/9 `U1–U9` CLOSED)

- **U-03 / U2 CLEARED (GBM 6×3=18/18 `t` recovery):** `full_alignment = p_i * t_i` in `8d_vector_run_results.json` recovers exact `t` and reproduces 18/18 fits (`05` §10A).
- **U-04 / U4 CLEARED (`bm01_evo2.ts` / `BrmTargetLockPanel.tsx` / `brm_pipeline_20260328T070235Z.json`):** Retracted `0.976` `mission_fit_discount` quarantined (`RETRACTED_LABEL_LEAK_QUARANTINED`); honest `0.6889` (`n_genes=29` across `n_steps=7` cascade steps; legacy 36/38-gene × 8-step prose alias reconciled) / `0.7478` (`24` observed-only) surfaced; Enformer set to `DISABLED_DEFAULT_0.5`.
- **U-19 / U5 CLEARED (Immuno v3 line-quotes):** `zeta_immunotherapy_contract_v3.json` (`5692cbcb…`) line-quoted in `05` §10E (`Gide` `0.8038` / OS HR `0.3697`, `Riaz` `0.6996`, `TCGA-SKCM` adj HR `0.7179`, `GSE120575` `0.8767`).
- **U-20 / U1 / U8 / U9 CLEARED (485-row `TMB -> io`, v2 Gated Ranker, & 42-Trial Audit):** `io = clip(0.20 + (tmb/50.0)*0.40, 0.20, 0.60)` + cell-732 `fga or 0.2671` reproduces 3,880/3,880 v1 cells. Landed `crc_ranker_results_v2_gated.csv` (`05971fa3…`) + `crc_ranker_summary_v2_gated.json` + `all_42_trials_vector_audit_v2.json` (`797eaca7…`, 42/42 rows audited: `8 LOCKED_VERIFIED`, `5 APPROXIMATE_QUARANTINED`, `29 METADATA_ONLY` + secondary `ATR_DDR`/`CEACAM5` rescue on 327 Cold MSS patients) + moat `pathway_8d_ranker.py` (`33351847…`) & `test_pathway_8d_ranker.py` (`e79e0d8f…`, 5/5 passed).
- **U3 / U6 / U7 CLEARED:** `U3` fixed in `patient_vector_builder.py` (`+0.15 additive DDR boost`); `U6` quarantined as `UNVERIFIED_PROSE_CLAIM_QUARANTINED (no local DepMap glioma CSV receipt; worker-0.ipynb computed ΔChronos=-0.72, FDR=0.013 on n=95 NSCLC lines, not 24/24 glioma)`; `U7` locked as `LOCKED_CURATED_ARCHETYPE_CONSTANTS (RS-High=0.6, RS-Intermediate=0.4, RS-Low=0.2 in GBM_PROFILE_VECTORS_8D)`.

*End of `06_CHAT_MAP_BURIED_SCIENCE_MOAT.md`. 04/05 folded & U1–U9 closed 2026-11-03. No PASS.*
