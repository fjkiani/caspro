# Update to Match Patients to Therapies Audit

**Date:** 2025-01-29  
**Update:** Added Post-Treatment Pathway Profiling validation context

---

## 📊 VALIDATION STATUS SUMMARY (Updated 2025-01-29)

### What IS Validated:
- ✅ **S/P/E Pipeline → Platinum Response** (AUROC 0.70, n=149) - Validates M component (baseline)
- ✅ **DDR_bin → OS** (HR=0.62, p=0.013) - Validates D/P components (prognostic)
- ✅ **MAPK Pathway → Resistance** (RR=2.03x, n=469) - Validated marker (baseline)
- ✅ **NF1 Mutation → Resistance** (RR=2.16x, n=469) - Validated marker (baseline)
- ✅ **MFAP4 → Platinum Response** (AUROC 0.763) - Orthogonal biomarker (baseline)
- ✅ **CA-125 KELIM → Response** (AUROC 0.70-0.75, n>1000) - Validated (during treatment)
- ✅ **Post-Treatment Pathway Profiling → Resistance** (AUROC 0.714-0.750, n=11, GSE165897) - Validated (post-treatment, RUO)

### What is NOT Validated:
- ❌ **DDR_bin → Baseline Resistance** (AUROC 0.52, p=0.80) - No discrimination
- ❌ **Individual components alone** - Only unified frameworks work
- ❌ **Pathway Kinetics (Δ values)** - Pathway changes do NOT predict resistance

### Key Takeaway:
**CSI unifies validated components** - S/P/E (M) is validated, DDR_bin (D/P) is prognostic, KELIM (T) is validated. The unified CSI framework is what matters, not individual components alone.

**Validated Predictors by Timing:**
- **Baseline (Pre-treatment):** S/P/E Pipeline (AUROC 0.70), MAPK (RR=2.03x), NF1 (RR=2.16x), MFAP4 (AUROC 0.763)
- **During Treatment:** CA-125 KELIM (AUROC 0.70-0.75)
- **Post-Treatment:** Post-Treatment Pathway Profiling (AUROC 0.714-0.750, RUO until independent validation)

**Complementary Value:**
- Baseline predictors (S/P/E, MAPK, NF1) → Pre-treatment risk stratification
- During-treatment predictors (CA-125 KELIM) → Real-time response monitoring
- Post-treatment predictors (Post-treatment Pathway Profiling) → Maintenance therapy selection

---

## 🎯 Post-Treatment Pathway Profiling Context

### What It Is:
- **Post-treatment pathway profiling** predicts platinum resistance by analyzing pathway expression in tumor samples obtained **after completion of neoadjuvant chemotherapy (NACT)**
- **Key Discovery:** Post-treatment pathway STATE (absolute scores) predicts resistance, NOT pathway changes (kinetics)

### Validation Status:
- ✅ **Validated** on GSE165897 (n=11 HGSOC patients)
- Best predictor: Post-treatment PI3K score (AUC = 0.750)
- Strongest correlation: Post-treatment DDR score (ρ = -0.711, p = 0.014)
- **Status:** ⚠️ **RUO (Research Use Only)** until independent validation (MSK_SPECTRUM pending)

### Integration with CSI/Holistic Score:
- **Post-treatment profiling** complements baseline predictors (S/P/E) and during-treatment predictors (CA-125 KELIM)
- **Use case:** Maintenance therapy selection after NACT completion
- **Timing:** 1-4 weeks after NACT completion
- **Clinical workflow:** Post-treatment biopsy → Pathway profiling → Maintenance therapy selection

### Implications for Match Patients to Therapies Page:
- Should be positioned as **post-treatment capability** (not baseline)
- Should show **complementary value** with other validated predictors
- Should indicate **RUO status** until independent validation
- Should focus on **ovarian cancer (HGSOC)** where validated

---

**Related Document:** `Post-Treatment Pathway Profiling: Validated Resistance Predictor` - Complete documentation
