# ZetaBridge broker — live source reconnaissance (this session)

API https://zetabridge-api.onrender.com · auth via X-Zeta-Api-Key (401 without) · source tokens server-side.
All three sources authenticate live. What each can actually contribute to the Serial SAE HGSOC resistance-prediction test:

| Source | Live? | Identity / contents | Usable for the ovarian SAE claim? |
|---|---|---|---|
| Synapse (A_MSK) | YES | authenticated fjkiani (ownerId 3572550); project syn25569736 "MSK SPECTRUM" resolves | POTENTIALLY — best candidate; needs the real data-file/fileview syn IDs (entity endpoint returns project node only, no children-walk) |
| EGA (C_EGA) | YES | EGAD00001011049 = 100 files, 77.2 GB, all **BAM** (e.g. EGAF00008095047, 795 MB, MD5 c4ddcc36…) | YES but HEAVY — raw alignments; requires download + quantification pipeline (hrs of compute, tens of GB US→UK transfer) |
| SAS/PDS (B_SAS) | YES | 102 caslibs, 15 cancers (Breast/Colorec/Gastric/Lung/…), **zero ovarian**; ADaM clinical trial data | NO — wrong disease + wrong data type; also tables not loaded into CAS (SWATError), confirming the known auto-load gap |
| Federation layer | seeded=NO | tcga_clinical/genomic_variants/hrd_scores/drug_responses/synthetic_lethality all "not_seeded" | NO — empty placeholders; real data only via direct source endpoints |

## Honest bottom line
- SAS/PDS is OFF-TARGET for this ovarian expression claim (useful elsewhere: CRC backbone, comparator trials).
- EGA is ON-TARGET but is raw BAMs — a real alignment/quantification pipeline, not a quick pull.
- Synapse MSK-SPECTRUM is the most promising for outcome-labeled serial data but needs the specific data-entity syn IDs.
