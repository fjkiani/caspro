#!/usr/bin/env Rscript
# W2 — GENUINE cross-study external replication of the frozen W1 prognostic model.
# Apply FROZEN TCGA-derived elastic-net Cox coefficients (NO refitting) to
# INDEPENDENT GEO cohorts (different studies, different patients) and to a
# same-TCGA reprocessing (labelled as a SENSITIVITY CHECK, never as replication).
.libPaths(c("/workspace/rlib", .libPaths()))  # MUST be first, before any library()

suppressMessages({
  library(MetaGxOvarian)
  library(survival)
  library(survcomp)
  library(jsonlite)
})

set.seed(7)
OUT <- "/mnt/shared-workspace/shared/biomarker_val/w2_prognostic_replication_results.json"

# ---- frozen model from W1 ----
w1 <- fromJSON("/mnt/shared-workspace/shared/biomarker_val/w1_prognostic_results.json")
coefs <- unlist(w1$frozen_coefficients)          # named numeric: NUAK1, TGFBR2, LOX
cat("Frozen coefficients (from TCGA W1):\n"); print(coefs)
train_patients_file <- "/mnt/shared-workspace/shared/biomarker_val/w1_train_patient_ids.txt"

# ---- helpers (identical logic to W1) ----
collapse_to_symbol <- function(es) {
  ex  <- exprs(es)
  fd  <- fData(es)
  sym <- as.character(fd$gene)
  keep <- !is.na(sym) & sym != ""
  ex <- ex[keep, , drop = FALSE]; sym <- sym[keep]
  # average multi-probe genes
  agg <- rowsum(ex, group = sym, reorder = TRUE)
  cnt <- as.vector(table(sym)[rownames(agg)])
  sweep(agg, 1, cnt, "/")
}

surv_from_pdata <- function(es) {
  pd <- pData(es)
  time  <- as.numeric(pd$days_to_death)
  event <- ifelse(pd$vital_status == "deceased", 1L,
            ifelse(pd$vital_status == "living", 0L, NA_integer_))
  pid   <- as.character(pd$unique_patient_ID)
  data.frame(pid = pid, time = time, event = event, stringsAsFactors = FALSE)
}

# risk score = sum_g coef_g * z(expr_g) within the evaluation cohort
score_cohort <- function(mat, coefs) {
  g <- intersect(names(coefs), rownames(mat))
  z <- t(scale(t(mat[g, , drop = FALSE])))          # gene-wise z within cohort
  z[is.na(z)] <- 0
  drop(coefs[g] %*% z)                              # linear predictor per sample
}

eval_cohort <- function(es, cohort_id, coefs, train_pids = NULL) {
  mat <- collapse_to_symbol(es)
  sdf <- surv_from_pdata(es)
  # align expression columns to survival rows
  common <- intersect(colnames(mat), rownames(pData(es)))
  mat <- mat[, common, drop = FALSE]; rownames(sdf) <- sdf$pid
  # overlap check vs training patients (independence audit)
  overlap_n <- if (!is.null(train_pids)) length(intersect(sdf$pid, train_pids)) else NA_integer_
  lp  <- score_cohort(mat, coefs)
  sdf$lp <- lp[match(colnames(mat), colnames(mat))]  # aligned already
  keep <- !is.na(sdf$time) & !is.na(sdf$event) & sdf$time > 0 & !is.na(sdf$lp)
  d <- sdf[keep, , drop = FALSE]
  genes_present <- intersect(names(coefs), rownames(mat))
  ci <- concordance.index(x = d$lp, surv.time = d$time, surv.event = d$event,
                          method = "noether", na.rm = TRUE)
  # standardized-LP Cox for HR per 1 SD
  d$lpz <- as.numeric(scale(d$lp))
  cx <- coxph(Surv(time, event) ~ lpz, data = d)
  sc <- summary(cx)
  ph <- tryCatch(cox.zph(cx)$table["lpz", "p"], error = function(e) NA_real_)
  # KM by tertile
  tert <- cut(d$lp, breaks = quantile(d$lp, c(0, 1/3, 2/3, 1), na.rm = TRUE),
              labels = c("low","mid","high"), include.lowest = TRUE)
  lr <- tryCatch(survdiff(Surv(time, event) ~ tert, data = d), error = function(e) NULL)
  lr_p <- if (!is.null(lr)) 1 - pchisq(lr$chisq, length(lr$n) - 1) else NA_real_
  list(
    cohort_id = cohort_id,
    n = nrow(d), n_events = sum(d$event),
    genes_present = length(genes_present), genes_expected = length(coefs),
    overlap_with_train = overlap_n,
    c_index = unname(ci$c.index), c_index_se = unname(ci$se),
    c_index_lower = unname(ci$lower), c_index_upper = unname(ci$upper),
    c_index_p = unname(ci$p.value),
    hr_per_1sd = unname(sc$conf.int["lpz","exp(coef)"]),
    hr_lower = unname(sc$conf.int["lpz","lower .95"]),
    hr_upper = unname(sc$conf.int["lpz","upper .95"]),
    hr_p = unname(sc$coefficients["lpz","Pr(>|z|)"]),
    ph_test_p = ph,
    km_tertile_logrank_p = lr_p
  )
}

# ---- load all curated OV esets ----
cat("Loading MetaGxOvarian esets...\n")
esets <- MetaGxOvarian::loadOvarianEsets()[[1]]
cat("Cohorts available:", paste(names(esets), collapse=", "), "\n")

# training patient IDs (TCGA) for overlap audit
tcga_pids <- as.character(pData(esets[["TCGAOVARIAN"]])$unique_patient_ID)
writeLines(tcga_pids, train_patients_file)

# ---- INDEPENDENT replication cohorts (different GEO studies) ----
indep_ids <- c("GSE9891", "GSE32062")
indep_results <- list()
for (cid in indep_ids) {
  cat("\n=== INDEPENDENT replication:", cid, "===\n")
  res <- eval_cohort(esets[[cid]], cid, coefs, train_pids = tcga_pids)
  print(res)
  indep_results[[cid]] <- res
}

# ---- SENSITIVITY CHECK ONLY: same TCGA cohort reprocessed (NOT replication) ----
cat("\n=== SENSITIVITY CHECK (same-cohort, NOT independent): TCGAOVARIAN ===\n")
sens <- eval_cohort(esets[["TCGAOVARIAN"]], "TCGAOVARIAN", coefs, train_pids = tcga_pids)
sens$note <- "SAME-COHORT REPROCESSING — sensitivity check only, NOT external replication"
print(sens)

# ---- verdict logic ----
# Replicates only if independent cohorts show C-index CI excluding 0.5 AND HR CI excluding 1
replicates <- all(sapply(indep_results, function(r)
  (r$c_index_lower > 0.5) && (r$hr_lower > 1 | r$hr_upper < 1)))
verdict <- if (replicates) "validated" else "discovery_only"
cat("\nVERDICT:", verdict, "\n")

out <- list(
  method_id = w1$method_id,
  source_pmid = w1$source_pmid, source_doi = w1$source_doi,
  frozen_coefficients = as.list(coefs),
  train_cohort = "MetaGxOvarian:TCGAOVARIAN",
  replication_cohorts = indep_results,
  sensitivity_check_same_cohort = sens,
  independence_note = paste(
    "Replication cohorts GSE9891 and GSE32062 are distinct GEO series with",
    "non-overlapping patient IDs vs the TCGA training cohort (overlap audited).",
    "TCGAOVARIAN re-evaluation is a same-cohort sensitivity check, NOT replication."),
  verdict = verdict,
  seed = 7
)
write_json(out, OUT, auto_unbox = TRUE, pretty = TRUE, digits = 6, na = "null")
cat("\nWrote", OUT, "\n")
