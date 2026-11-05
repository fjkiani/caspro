# Submission Checklist

## ✅ Included Files

- [x] `MANUSCRIPT_DRAFT.md` - Complete manuscript
- [x] `COVER_LETTER.md` - Submission cover letter
- [x] `DATA_CODE_AVAILABILITY.md` - Data and code availability
- [x] `AUTHOR_CONTRIBUTIONS.md` - CRediT taxonomy
- [x] `COMPETING_INTERESTS.md` - Conflicts of interest
- [x] `FIGURES_TABLES_LIST.md` - Figure and table inventory
- [x] `TABLES.md` - All tables
- [x] `SUPPLEMENT.md` - Supplementary materials

---

## 📝 Fill Before Portal Upload

### Author Information
- [ ] Author list (first name, middle initial, last name)
- [ ] Author affiliations (institution, department, city, country)
- [ ] Corresponding author (name, email, phone, address)
- [ ] Running title (max 50 characters)
- [ ] Keywords (5-10 keywords)

### Funding and Ethics
- [ ] Funding sources (grant numbers, agencies)
- [ ] Ethics statement (IRB approval, informed consent)
- [ ] Data use agreements (if applicable)

### Journal Selection
- [ ] Target journal selected (Clinical Cancer Research OR NPJ Precision Oncology)
- [ ] Journal-specific formatting checked (author guidelines)
- [ ] Word count verified (abstract <250 words, main text limits)

### Figures and Tables
- [ ] All figures generated and validated
- [ ] Figure legends complete
- [ ] Tables formatted correctly
- [ ] Supplementary materials prepared

### References
- [ ] All references formatted correctly (journal-specific style)
- [ ] PubMed IDs verified
- [ ] In-text citations match reference list
- [ ] Reference count within journal limits

---

## ✅ Claims Discipline

### Validated Claims (From Receipts)
- [x] MFAP4 single-gene AUROC = 0.684 (95% CI 0.557–0.805, bootstrap n=5000; GSE63885, honest n=75)
- [x] MFAP4 is weak and cohort-unstable (range 0.529–0.797; cross-cohort SD 0.110)
- [x] STROMAL_CAGE (FAP, POSTN, ACTA2, MFAP4) does not beat the single gene on discrimination (DeLong p = 0.157, 0.666, 0.894) but more than halves cross-cohort variance (SD 0.110 → 0.046)
- [x] Multi-cohort validation (GSE63885, GSE30161, GSE51373; pooled n=161, 56 resistant)
- [x] Cohort characteristics (GSE63885 honest n=75: 34 resistant, 41 sensitive; GSE30161 n=58: 10 resistant; GSE51373 n=28: 12 resistant)
- [x] Bootstrap confidence intervals (n=5000 iterations, seed=7)

### Retracted (do not claim)
- [x] MFAP4 AUROC = 0.763 (n=101) — **retracted**; counted 26 unevaluable samples as sensitive (+0.079 inflation). See `MFAP4_verification_report.md`.

### Not Claimed (Requires Additional Validation)
- [ ] Clinical outcome benefit (prospective validation needed)
- [ ] Treatment selection guidance (clinical trial validation needed)
- [ ] Platform translation (RNA-seq/ctDNA validation needed; all cohorts are GPL570 microarray)

---

## 🔍 Pre-Submission Review

### Reproducibility Check
- [ ] Run `scripts/mfap4_multicohort_validation.py` - verify results match manuscript (deterministic)
- [ ] Check receipt file: `mfap4_multicohort_results.json`
- [ ] Verify all metrics are exact (no rounding discrepancies)

### Manuscript Quality
- [ ] Abstract <250 words
- [ ] Introduction sets up problem clearly
- [ ] Methods section complete and reproducible
- [ ] Results match receipts exactly
- [ ] Discussion addresses limitations
- [ ] Conclusions are supported by data

### Data and Code Availability
- [ ] Data artifacts accessible (GSE63885 public, in-repo artifacts)
- [ ] Code scripts accessible and documented
- [ ] Reproduce commands tested and working
- [ ] Provenance tracking complete

---

## 📤 Portal Upload Checklist

### Required Files
- [ ] Manuscript (formatted per journal guidelines)
- [ ] Cover letter
- [ ] Figures (high-resolution, publication-ready)
- [ ] Tables (formatted correctly)
- [ ] Supplementary materials (if applicable)

### Author Information
- [ ] All authors listed with affiliations
- [ ] Corresponding author designated
- [ ] Author contributions completed
- [ ] Competing interests disclosed

### Additional Materials
- [ ] Data availability statement
- [ ] Code availability statement
- [ ] Ethics approval (if required)
- [ ] Funding acknowledgments

---

## 🎯 Final Validation

Before clicking "Submit":

1. **Receipts Match**: All reported numbers match `mfap4_multicohort_results.json`
2. **Reproducibility**: Scripts run successfully and regenerate results
3. **Claims Discipline**: Only validated claims are made
4. **Journal Compliance**: Formatting matches journal guidelines
5. **Author Approval**: All authors have reviewed and approved

---

**Status**: ✅ Draft complete, ready for author review  
**Last Updated**: January 28, 2025  
**Next Step**: Author review and finalization
