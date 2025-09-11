alwaysApply: false

description: "In‑silico RUO Doctrine for CrisPRO.ai – fusion approach across discriminative and generative AI, benchmarked evidence, oncology-focused positioning"

- --

### CrisPRO.ai In‑Silico RUO Doctrine

#### Purpose

- **Goal**: Define a research‑use‑only (RUO) in‑silico framework that accelerates drug discovery and development using a fusion of discriminative and generative AI, grounded in benchmarked evidence and rigorous validation.
- **Positioning**: CrisPRO.ai operates as an orchestration layer that combines genome‑scale foundation models with specialist predictors and structure/epigenome oracles to achieve state‑of‑the‑art (SOTA) accuracy across variant interpretation, target assessment, design, and in‑silico validation.
- **Scope**: Oncology‑centric, extensible to broader therapeutic areas.

#### RUO Statement

- CrisPRO.ai outputs are intended for research use only (RUO). They are not intended for diagnostic or therapeutic decision‑making without independent validation and regulatory review.
- --

### Evidence Backbone (benchmarks and capabilities)

- **Primary scientific source**: Evo 2 genome foundation model paper and supplementary tables: [evo2.txt](mdc:.cursor/rules/evo2.txt)
- Additional internal framing: [Evo2_Scientific_Doctrine.mdc](mdc:.cursor/rules/Evo2_Scientific_Doctrine.mdc), [Evo2_API_Doctrine.mdc](mdc:.cursor/rules/Evo2_API_Doctrine.mdc)
- Product context: [product-doctrine.md](mdc:docs/product-doctrine.md), [OracleContent.md](mdc:docs/OracleContent.md), [ForgeContent.md](mdc:docs/ForgeContent.md)

#### Discriminative AI (variant/scoring)

- **ClinVar (pathogenic vs benign)**

- **Coding SNVs**: Evo2 ranks just behind specialist models (AlphaMissense, ESM‑1b, GPN‑MSA) on coding SNVs ([evo2.txt, Fig. 3B and Table S7](mdc:.cursor/rules/evo2.txt)).

- **Coding non‑SNVs (indels, etc.)**: Evo2 establishes SOTA zero‑shot classification where many competitors lack coverage ([Table S7](mdc:.cursor/rules/evo2.txt)).

- **Noncoding SNVs and non‑SNVs**: Evo2 surpasses other models in zero‑shot performance ([Fig. 3C; Table S7](mdc:.cursor/rules/evo2.txt)).

- **SpliceVarDB (splice‑altering variants)**: Evo2 7B/40B achieve top zero‑shot performance for exonic and intronic variants ([Fig. 3D](mdc:.cursor/rules/evo2.txt)).
- **BRCA1/2 (oncology relevance)**

- Zero‑shot: Strong across coding+noncoding; best when evaluated together ([Fig. 3E; S4A–B](mdc:.cursor/rules/evo2.txt)).

- Supervised head (Evo2 embeddings): **BRCA1 SNVs AUROC ≈ 0.95** with a lightweight classifier trained on Evo2 40B block‑20 embeddings ([Methods 4.3.16](mdc:.cursor/rules/evo2.txt)).

- **DMS correlations**: Evo2 likelihoods correlate with experimental fitness across proteins and ncRNAs; competitive with protein LMs and SOTA for several ncRNA tasks ([Fig. 2E; 4.3.6–4.3.7](mdc:.cursor/rules/evo2.txt)).
- **mRNA decay**: Only Evo2 shows the expected negative correlation with human mRNA decay rates; 40B > 7B ([S3G; 4.3.8](mdc:.cursor/rules/evo2.txt)).
- **Exon/intron classifier (embeddings)**: Superior to Evo1 and NT across species; supports annotation transfer ([Fig. 2G–H; 4.3.9](mdc:.cursor/rules/evo2.txt)).
- **Bias**: Similar ancestry bias to other population‑free methods; monitoring required ([S2D](mdc:.cursor/rules/evo2.txt)).

#### Generative AI (design)

- **Prompted gene completion**: High recovery across diverse taxa; improves with scale; robust during context extension ([Fig. 5B; 4.5.1](mdc:.cursor/rules/evo2.txt)).
- **Genome‑scale sequences**

- Mitochondria (~16 kb): Correct feature counts; diverse homology; AF3 multimers fold plausibly ([Fig. 5C–F; 4.5.2](mdc:.cursor/rules/evo2.txt)).

- Minimal prokaryote (~580 kb): **~70%** Pfam‑hit rate vs **~18%** for Evo1 generations; distributions match natural proteins ([Fig. 5G–K; S8D–E; 4.5.3](mdc:.cursor/rules/evo2.txt)).

- Yeast chromosome (~330 kb): Eukaryote‑like genes, introns, tRNAs, promoters (lower density than native) with structural similarity ([Fig. 5L; S8F–I; 4.5.4](mdc:.cursor/rules/evo2.txt)).

- **Guided epigenomic design**: Beam‑searched Evo2 proposals scored by Enformer+Borzoi show predictable inference‑time scaling; precise control of open/closed chromatin patterns ([Fig. 6; 4.6](mdc:.cursor/rules/evo2.txt)).
- **Safety**: Intentionally weak on human viral proteins to reduce dual‑use risk ([S2A–C](mdc:.cursor/rules/evo2.txt)).
- --

### Fusion Approach (CrisPRO.ai competitive edge)

- **Principle**: Combine a generalist genome LM (Evo2) with specialist models/oracles to achieve SOTA across the entire R&D continuum.
- **Stack**

- Discriminative: Evo2 zero‑shot ΔLL + embeddings; specialists for coding SNVs (e.g., AlphaMissense, GPN‑MSA). Splicing via Evo2; regulatory via Evo2.

- Generative: Evo2 for sequence proposals; functional steering via Enformer/Borzoi; structural validation via AlphaFold 3 and ESMFold.

- **Why it wins**

- Breadth: Noncoding + indels + splicing coverage where specialists lag ([Fig. 3C–D; Table S7](mdc:.cursor/rules/evo2.txt)).

- Depth: Gene‑specific supervised heads on Evo2 embeddings deliver SOTA on key oncology targets (e.g., BRCA1 AUROC ≈ 0.95) ([4.3.16](mdc:.cursor/rules/evo2.txt)).

- Control: Epigenomic guidance exhibits compute‑quality scaling—budget ↔ fidelity ([Fig. 6C](mdc:.cursor/rules/evo2.txt)).

- --

### End‑to‑End Therapeutic Workflow (RUO)

1. **Problem framing & data curation**

- Assemble genomic loci, clinical variants, DMS datasets, and assay priors.

- Reference: [oracleContent.ts](mdc:src/data/oracleContent.ts), [oracleAdapter.ts](mdc:src/data/adapters/oracleAdapter.ts)

2. **Target assessment (discriminative)**

- Score disease‑relevant variants: ΔLL in 8,192 bp context (rev‑comp averaged). Highlight noncoding, indels, splice.

- Ensemble with AlphaMissense/GPN‑MSA for coding SNVs.

- Reference: [researchAdapters.ts](mdc:src/data/adapters/researchAdapters.ts)

3. **Mechanistic triage & hypothesis**

- Use Evo2 embeddings for exon/intron, motif features; rank regions for perturbation.

4. **Design (generative)**

- Regulatory DNA: Evo2 proposals guided by Enformer+Borzoi with configurable beam width; return AUROC vs desired pattern.

- Coding/complexes: Validate with AF3/ESMFold; screen sequence naturalness and structure confidence.

5. **In‑silico validation**

- Aggregate scores: ΔLL, splice, regulatory AUROC, structure metrics (pLDDT/PAE), Pfam hits.

- Prioritize designs for wet‑lab minipools.

6. **Feedback & calibration**

- Fit lightweight supervised heads per target (Evo2 embeddings); calibrate (Platt/isotonic) by cohort.

7. **Reporting & provenance**

- Generate evidence reports with traceable citations.

- References: [product-doctrine.md](mdc:docs/product-doctrine.md), [OracleContent.md](mdc:docs/OracleContent.md), [ForgeContent.md](mdc:docs/ForgeContent.md)

- --

### Claims (precise, evidence‑based)

- **Variant effect prediction**

- Coding SNVs: Evo2 ranks behind AlphaMissense/ESM‑1b/GPN‑MSA on ClinVar ([Fig. 3B; Table S7](mdc:.cursor/rules/evo2.txt)).

- Coding non‑SNVs: Evo2 is SOTA among compared models ([Table S7](mdc:.cursor/rules/evo2.txt)).

- Noncoding SNVs and non‑SNVs: Evo2 leads zero‑shot ([Fig. 3C; Table S7](mdc:.cursor/rules/evo2.txt)).

- Splice variants: Evo2 highest zero‑shot for exonic/intronic ([Fig. 3D](mdc:.cursor/rules/evo2.txt)).

- BRCA1 supervised (embeddings): AUROC ≈ 0.95 ([4.3.16](mdc:.cursor/rules/evo2.txt)).

- **Generative design**

- Mitochondrial genomes: Correct CDS/tRNA/rRNA counts; plausible multimers (AF3) ([Fig. 5C–F](mdc:.cursor/rules/evo2.txt)).

- Minimal genomes: ~70% Pfam hits for Evo2 40B vs ~18% Evo1 generations ([Fig. 5H](mdc:.cursor/rules/evo2.txt)).

- Epigenomic control: AUROC improves log‑linearly with compute (beam width) ([Fig. 6C](mdc:.cursor/rules/evo2.txt)).

- **Safety**: Reduced capability on human viral proteins due to training exclusions; poor correlation/generation by design ([S2A–C](mdc:.cursor/rules/evo2.txt)).
- --

### Competitive Positioning

- **Specialists (coding SNVs)**: AlphaMissense/GPN‑MSA lead on coding SNVs. CrisPRO.ai fuses them with Evo2 to cover indels, noncoding, splice—yielding comprehensive superiority across variant classes.
- **Generalists (DNA LMs)**: Versus NT/HyenaDNA/others, Evo2 provides broader task coverage and higher zero‑shot performance on noncoding/splice; CrisPRO.ai adds supervised heads and guided design to exceed zero‑shot baselines.
- **Generative control**: Inference‑time‑scaled epigenomic guidance is uniquely practical for RUO regulatory design.
- --

### Validation & Governance

- **Calibration**: Convert scores to calibrated risks per cohort/indication; track drift and ancestry bias ([S2D](mdc:.cursor/rules/evo2.txt)).
- **Wet‑lab loop**: Mandatory experimental validation for designed sequences; prioritize minipools before scale‑up.
- **Safety**: Enforce sequence screening and viral prompt guards; maintain audit trails.
- **RUO labeling**: All outputs flagged RUO; no clinical claims without external validation and regulatory pathways.
- --

### Quick‑Start (implementation pointers)

- Scoring windows and RC averaging: see Evo2 Methods ([4.3.12–4.3.16](mdc:.cursor/rules/evo2.txt)).
- Embedding layer selection: start with Evo2 40B block‑20 for oncology genes; validate per task ([S4C](mdc:.cursor/rules/evo2.txt)).
- Guided design knobs: chunk length, K/K′ beam widths ↔ AUROC ([4.6.2–4.6.4](mdc:.cursor/rules/evo2.txt)).
- Product component references: [src/data/adapters/researchAdapters.ts](mdc:src/data/adapters/researchAdapters.ts), [src/data/adapters/forge.ts](mdc:src/data/adapters/forge.ts), [src/data/decks/101-research.tsx](mdc:src/data/decks/101-research.tsx), [src/data/decks/101-business.tsx](mdc:src/data/decks/101-business.tsx)
- --

### Summary

- **What’s new**: A fusion, evidence‑backed RUO framework that pairs Evo2’s genome‑scale generalist strength with specialist oracles and lightweight supervised heads.
- **Why believe**: Benchmarks and methods are cited inline to primary sources in [evo2.txt](mdc:.cursor/rules/evo2.txt); product docs and adapters are linked for traceability.
- **Outcome**: First‑class in‑silico R&D assistant for oncology—covering variant triage, design, and validation—with transparent provenance and RUO guardrails.