#!/usr/bin/env Rscript
# W1 — Ovarian prognostic biomarker: train + internal CV + honest reporting.
# Reproduces the published multi-cohort OV survival-signature approach
# (Riester et al. 2014 JNCI; curated data via MetaGxOvarian) as a penalised
# Cox risk score. Feature selection happens INSIDE CV folds; reported metric
# is out-of-fold, never in-sample. External replication is done in W2.
#
# Output: JSON receipt at OUT with train + internal_cv blocks (+ frozen coefs).
.libPaths(c("/workspace/rlib", .libPaths()))
suppressMessages({
  library(MetaGxOvarian); library(Biobase); library(survival)
  library(glmnet); library(survcomp); library(jsonlite)
})
set.seed(7)

OUTDIR <- "/mnt/shared-workspace/shared/biomarker_val"
dir.create(OUTDIR, showWarnings=FALSE, recursive=TRUE)
OUT <- file.path(OUTDIR, "w1_prognostic_results.json")

TRAIN_COHORT <- "TCGAOVARIAN"   # largest curated cohort
# Published OV survival signature (Riester 2014 JNCI, 19-gene predictor of OS).
# HUGO symbols; genes absent from a cohort are simply skipped (recorded).
RIESTER19 <- c("POSTN","CXCL14","FAP","NUAK1","PTCH1","THBS2","TGFBR2","TIMP3",
               "COL11A1","COL5A1","COL6A3","LOX","AEBP1","INHBA","CTSK",
               "DCN","LUM","FBN1","ANGPTL2")

message("Loading MetaGxOvarian esets ...")
esets <- suppressMessages(loadOvarianEsets())[[1]]
stopifnot(TRAIN_COHORT %in% names(esets))

# ---- collapse probe-level expression to HUGO gene symbols (mean of probes) ----
collapse_to_symbol <- function(es) {
  fd <- fData(es)
  sym <- as.character(fd$gene)
  ex <- exprs(es)
  ok <- !is.na(sym) & sym != ""
  ex <- ex[ok, , drop=FALSE]; sym <- sym[ok]
  # mean across probes mapping to the same symbol
  agg <- rowsum(ex, group=sym, reorder=TRUE) / as.numeric(table(sym)[rownames(rowsum(ex, group=sym, reorder=TRUE))])
  agg
}

# ---- helper: build (expr z-scored, time, event, patientID) for a cohort ----
prep <- function(es) {
  pd <- pData(es)
  # OS time: prefer days_to_death; else last follow-up not available uniformly,
  # so we use days_to_death with vital_status (standard for these curated sets).
  time <- suppressWarnings(as.numeric(pd$days_to_death))
  vital <- tolower(as.character(pd$vital_status))
  event <- ifelse(vital %in% c("deceased","dead","1"), 1L,
                  ifelse(vital %in% c("living","alive","0"), 0L, NA))
  # For censored (alive) patients days_to_death is NA -> use recurrence-free fallback? No:
  # curatedOvarianData convention stores follow-up time in days_to_death for both.
  keep <- !is.na(time) & !is.na(event) & time > 0
  ex <- collapse_to_symbol(es)               # genes (HUGO) x samples
  ex <- ex[, keep, drop=FALSE]; time <- time[keep]; event <- event[keep]
  pid <- as.character(pd$unique_patient_ID[keep])
  # z-score genes within cohort
  ex <- t(scale(t(ex)))
  ex[is.na(ex)] <- 0
  list(expr=ex, time=time, event=event, pid=pid, n=length(time), events=sum(event))
}

tr <- prep(esets[[TRAIN_COHORT]])
message(sprintf("Train %s: n=%d events=%d", TRAIN_COHORT, tr$n, tr$events))

# restrict to signature genes present
present <- intersect(RIESTER19, rownames(tr$expr))
message(sprintf("Signature genes present in train: %d / %d", length(present), length(RIESTER19)))
X <- t(tr$expr[present, , drop=FALSE])          # samples x genes
y <- Surv(tr$time, tr$event)

# ---- 5-fold CV elastic-net Cox; feature selection INSIDE folds ----
set.seed(7)
nfold <- 5
folds <- sample(rep(1:nfold, length.out=nrow(X)))
oof_score <- rep(NA_real_, nrow(X))
for (k in 1:nfold) {
  tri <- which(folds != k); tei <- which(folds == k)
  cvfit <- cv.glmnet(X[tri,,drop=FALSE], y[tri], family="cox", alpha=0.5, nfolds=5)
  # linear predictor on held-out fold (selection happened via glmnet penalty on train only)
  lp <- predict(cvfit, newx=X[tei,,drop=FALSE], s="lambda.min", type="link")
  oof_score[tei] <- as.numeric(lp)
}
# out-of-fold concordance
ci_oof <- survcomp::concordance.index(x=oof_score, surv.time=tr$time, surv.event=tr$event,
                                      method="noether", na.rm=TRUE)
message(sprintf("OOF C-index = %.3f (p=%.3g)", ci_oof$c.index, ci_oof$p.value))

# ---- final model on ALL train data (frozen coefficients for W2) ----
set.seed(7)
final <- cv.glmnet(X, y, family="cox", alpha=0.5, nfolds=5)
coefs <- as.matrix(coef(final, s="lambda.min"))
coef_list <- setNames(as.list(coefs[,1]), rownames(coefs))
coef_list <- coef_list[abs(unlist(coef_list)) > 0]   # non-zero only

# in-sample risk score + Cox HR per 1 SD (for reference; NOT the headline metric)
train_lp <- as.numeric(predict(final, newx=X, s="lambda.min", type="link"))
train_lp_z <- scale(train_lp)[,1]
cox_tr <- summary(coxph(Surv(tr$time, tr$event) ~ train_lp_z))
ph_tr <- cox.zph(coxph(Surv(tr$time, tr$event) ~ train_lp_z))$table["train_lp_z","p"]
epv <- tr$events / max(1, length(coef_list))

receipt <- list(
  method_id = "riester2014_prognostic_ov",
  source_pmid = "24700968",
  source_doi = "10.1093/jnci/dju048",
  source_note = paste("Penalised (elastic-net) Cox reproduction of the Riester 2014 multi-cohort",
                      "OV OS signature; curated data via MetaGxOvarian; feature selection in-fold."),
  gene_panel = present,
  frozen_coefficients = coef_list,
  train = list(
    cohort_id = paste0("MetaGxOvarian:", TRAIN_COHORT),
    n = tr$n, n_events = tr$events,
    is_independent = FALSE,
    metric_name = "HR_per_1SD_insample",
    metric_value = unname(cox_tr$coefficients[1,"exp(coef)"]),
    p_value = unname(cox_tr$coefficients[1,"Pr(>|z|)"]),
    ph_test_p = unname(ph_tr),
    epv = epv, seed = 7,
    method_detail = "in-sample reference only"
  ),
  internal_cv = list(
    cohort_id = paste0("MetaGxOvarian:", TRAIN_COHORT, " (5-fold OOF)"),
    n = tr$n, n_events = tr$events,
    is_independent = FALSE,
    metric_name = "c_index",
    metric_value = ci_oof$c.index,
    ci95_low = ci_oof$lower, ci95_high = ci_oof$upper,
    p_value = ci_oof$p.value,
    seed = 7,
    method_detail = "out-of-fold elastic-net Cox, alpha=0.5, feature selection in-fold"
  )
)
write(toJSON(receipt, auto_unbox=TRUE, pretty=TRUE, digits=6), OUT)
message("Wrote ", OUT)
cat("W1_DONE c_index_oof=", round(ci_oof$c.index,3), " genes=", length(present),
    " nonzero_coef=", length(coef_list), "\n", sep="")
