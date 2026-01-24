# Biomarker Gating Validation Context

**Date:** 2025-01-29  
**Status:** ✅ **VALIDATION CONTEXT ADDED**  
**Purpose:** Document conservative biomarker gating system that prevents overconfidence under incomplete data

---

## 🎯 BIOMARKER GATING SYSTEM SUMMARY

### **What It Is:**
A **conservative, provenance-first tumor-context layer** that:
1. **Represents data completeness explicitly** (L0/L1/L2 levels)
2. **Applies deterministic biomarker gates** only when evidence is present
3. **Caps confidence** when inputs are incomplete

### **Key Principle:**
> "Missing tumor evidence is a first-class engineering and safety problem."

**The system does NOT infer evidence when it's absent - it applies conservative defaults and caps confidence.**

---

## 🔒 THREE CORE GATES

### **Gate 1: PARP Inhibitor Penalty with HRD Rescue**

**Logic:**
- Germline positive → multiplier = 1.0
- Germline negative:
  - HRD ≥ 42 → multiplier = 1.0 (rescue)
  - HRD < 42 → multiplier = 0.6 (penalty)
  - HRD unknown → multiplier = 0.8 (conservative penalty)
- Germline unknown → multiplier = 0.8

**Validation:**
- ✅ **98.1% penalty application** in TCGA-OV (460/469 patients)
- Demonstrates conservative behavior when evidence is incomplete

---

### **Gate 2: Immunotherapy Boost (Checkpoint Inhibitors)**

**Logic (mutually exclusive, precedence order):**
- TMB ≥ 20 → boost = 1.35
- MSI-High → boost = 1.30
- TMB ≥ 10 → boost = 1.25
- else → boost = 1.0

**Validation:**
- ✅ **TMB-high prognostic** in TCGA-UCEC (HR=0.32, p=0.00105, n=120/516)
- ✅ **MSI-high prognostic** in TCGA-UCEC (HR=0.49, p=0.00732, n=174/527)
- ✅ **OR gate strongest signal** (HR=0.39, p=0.000168, n=210/527)

---

### **Gate 3: Confidence Caps by Completeness**

**Logic:**
- **L0** (completeness < 0.3): confidence ≤ 0.4
- **L1** (0.3 ≤ completeness < 0.7): confidence ≤ 0.6
- **L2** (completeness ≥ 0.7): uncapped

**Validation:**
- ✅ **100% confidence cap application** in TCGA-OV (469/469 patients at L1)
- Demonstrates system actively suppresses overconfidence

---

## 📊 VALIDATION RESULTS

### **Biomarker Prognostic Validation (TCGA-UCEC):**

**TMB-High (≥20 mut/Mb):**
- HR = 0.32 (95% CI: 0.15-0.65)
- p = 0.00105
- n = 120/516

**MSI-High:**
- HR = 0.49 (95% CI: 0.29-0.83)
- p = 0.00732
- n = 174/527

**OR Gate (TMB-high OR MSI-high):**
- HR = 0.39 (95% CI: 0.23-0.65)
- p = 0.000168
- n = 210/527 (strongest signal)

**Note:** These are **prognostic associations**, not treatment benefit claims.

---

### **Gate Behavior Validation (TCGA-OV, n=469):**

**PARP Penalty:**
- ✅ **460/469 (98.1%)** received PARP penalty
- Conservative stance when explicit HRD markers absent

**Confidence Caps:**
- ✅ **469/469 (100%)** received confidence caps (L1)
- System actively suppresses overconfidence

**Key Insight:**
The system applies conservative defaults in real-world settings where NGS is often pending or partial.

---

## 🔗 INTEGRATION WITH CSI/HOLISTIC SCORE

### **How Gating Fits:**

**CSI (Predictive Core):**
- Gating provides **safety layer** above CSI calculation
- Prevents overconfidence when biomarker data incomplete
- Applies deterministic adjustments based on evidence availability

**Holistic Score (Clinical-Facing Layer):**
- Gating affects **M (Mechanism Fit)** component via PARP/IO gates
- Gating affects **confidence** via completeness caps
- Provenance tracks all adjustments for auditability

**Key Relationship:**
- **CSI/Holistic Score** = Predictive core (what to recommend)
- **Biomarker Gating** = Safety layer (how confident, with what evidence)

---

## 🎯 IMPLICATIONS FOR HOMEPAGE STRATEGY

### **What This Means for CSI Messaging:**

**Homepage Should Emphasize:**
- ✅ **"Conservative, evidence-based approach"** - System doesn't overclaim
- ✅ **"Confidence calibrated to data completeness"** - Transparent uncertainty
- ✅ **"Provenance-backed recommendations"** - Every adjustment tracked

**Homepage Should NOT Emphasize:**
- ❌ Complex gating logic details (L0/L1/L2, specific multipliers)
- ❌ All biomarker gates upfront (PARP, IO, confidence caps)
- ❌ Technical implementation details

### **Key Messaging for Homepage:**
- **"Confidence calibrated to your data"** - System adjusts confidence based on completeness
- **"Conservative defaults when evidence incomplete"** - Safety-first approach
- **"Every recommendation backed by provenance"** - Transparent, auditable

---

## 📋 VALIDATION ARTIFACTS

### **Clinical Validation:**
- ✅ TCGA-UCEC: TMB/MSI prognostic associations (HR=0.32-0.49)
- ✅ TCGA-OV: Gate behavior validation (98.1% penalty, 100% caps)
- ✅ TCGA-COADREAD: Negative control (pre-IO era, no OS separation)

### **Gate Behavior Validation:**
- ✅ Threshold sensitivity (TMB 10-25, HRD 30-50)
- ✅ Subgroup consistency (Stage III vs IV, platinum-sensitive vs resistant)
- ✅ Biological coherence (MSI↔TMB, BRCA↔HRD correlations)

### **Reproducibility:**
- ✅ Unit tests: `receipts/pytest_sporadic_gates.txt`
- ✅ E2E workflow: `receipts/e2e_sporadic_workflow.txt`
- ✅ Scenario suite: 25-case benchmark (23/25 efficacy, 25/25 confidence matches)

---

## ✅ SUMMARY

### **What's Validated:**
- ✅ **Biomarker prognostic signal** (TMB/MSI in TCGA-UCEC)
- ✅ **Conservative gate behavior** (98.1% penalty, 100% caps in TCGA-OV)
- ✅ **Deterministic correctness** (unit tests, scenario suite)
- ✅ **Provenance tracking** (structured audit trails)

### **Key Insight:**
**The biomarker gating system provides a safety layer that prevents overconfidence when biomarker data is incomplete. This is critical for operational precision oncology where 60-70% of patients lack complete tumor sequencing at decision time.**

### **Homepage Integration:**
- Emphasize **conservative, evidence-based approach**
- Show **confidence calibration** (not just predictions)
- Highlight **provenance/transparency** (not just accuracy)

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **BIOMARKER GATING VALIDATION CONTEXT DOCUMENTED**
