#!/usr/bin/env Rscript
# W4 — Baseline discovery scan of OUR OWN in-repo gene panels (PI3K/mTOR, DDR)
# as candidate PROGNOSTIC signatures on curated OV cohorts. Each panel is scored
# as a mean-z signature and evaluated by Cox/C-index in EACH cohort independently.
# NOTHING here is labelled validated unless it replicates across independent
# cohorts; the harness flags all as discovery_only and records per-cohort signal.
.libPaths(c("/workspace/rlib", .libPaths()))  # MUST be first

suppressMessages({
  library(MetaGxOvarian)
  library(survival)
  library(survcomp)
  library(jsonlite)
})
set.seed(7)
OUT <- "/mnt/shared-workspace/shared/biomarker_val/w4_baseline_scan_results.json"

# ---- our validated in-repo panels (gene symbols) ----
# PI3K/mTOR panel + DDR panel: read from repo JSON if present, else inline fallback.
read_panel <- function(paths, fallback) {
  for (p in paths) if (file.exists(p)) {
    j <- tryCatch(fromJSON(p), error=function(e) NULL)
    if (!is.null(j)) {
      g <- unlist(j$genes %||% j$gene_panel %||% j$panel %||% j$symbols)
      if (length(g)) return(list(genes=as.character(g), src=p))
    }
  }
  list(genes=fallback, src="inline_fallback")
}
`%||%` <- function(a,b) if (is.null(a)) b else a

pi3k_paths <- c("/workspace/Synthetic-Lethality/sl_agent/data/gene_panels/pi3k_mtor_panel.json",
                "/mnt/results/pi3k_mtor_axis/validation/pi3k_mtor_gene_panel.json")
ddr_paths  <- c("/workspace/Synthetic-Lethality/sl_agent/data/gene_panels/ddr_panel_v1.json")

# fallbacks (canonical members) if files not resolvable
pi3k_fb <- c("PIK3CA","PIK3CB","PIK3R1","PTEN","AKT1","AKT2","MTOR","RPTOR","RICTOR","TSC1","TSC2","STK11","INPP4B")
ddr_fb  <- c("BRCA1","BRCA2","ATM","ATR","CHEK1","CHEK2","RAD51","PALB2","FANCA","PARP1","MRE11","NBN","RAD50")

panels <- list(
  pi3k_mtor = read_panel(pi3k_paths, pi3k_fb),
  ddr       = read_panel(ddr_paths,  ddr_fb)
)
for (nm in names(panels)) cat("panel", nm, "->", length(panels[[nm]]$genes), "genes from", panels[[nm]]$src, "\n")

collapse_to_symbol <- function(es) {
  ex <- exprs(es); fd <- fData(es); sym <- as.character(fd$gene)
  keep <- !is.na(sym) & sym != ""; ex <- ex[keep,,drop=FALSE]; sym <- sym[keep]
  agg <- rowsum(ex, group=sym, reorder=TRUE); cnt <- as.vector(table(sym)[rownames(agg)])
  sweep(agg, 1, cnt, "/")
}
surv_from_pdata <- function(es) {
  pd <- pData(es)
  data.frame(time=as.numeric(pd$days_to_death),
             event=ifelse(pd$vital_status=="deceased",1L,ifelse(pd$vital_status=="living",0L,NA_integer_)),
             stringsAsFactors=FALSE)
}
# signature score = mean of gene-wise z (unsupervised, no fitting to outcome)
score_meanz <- function(mat, genes) {
  g <- intersect(genes, rownames(mat))
  if (length(g) < 3) return(list(lp=NULL, n_genes=length(g)))
  z <- t(scale(t(mat[g,,drop=FALSE]))); z[is.na(z)] <- 0
  list(lp=colMeans(z), n_genes=length(g))
}
eval_panel_cohort <- function(es, genes, cohort_id) {
  mat <- collapse_to_symbol(es); sdf <- surv_from_pdata(es)
  stopifnot(ncol(mat)==nrow(sdf))
  sc <- score_meanz(mat, genes)
  if (is.null(sc$lp)) return(list(cohort_id=cohort_id, n_genes=sc$n_genes, note="fewer than 3 panel genes present"))
  sdf$lp <- as.numeric(sc$lp)
  keep <- !is.na(sdf$time) & !is.na(sdf$event) & sdf$time>0 & !is.na(sdf$lp)
  d <- sdf[keep,,drop=FALSE]
  ci <- concordance.index(x=d$lp, surv.time=d$time, surv.event=d$event, method="noether", na.rm=TRUE)
  d$lpz <- as.numeric(scale(d$lp)); cx <- summary(coxph(Surv(time,event)~lpz, data=d))
  list(cohort_id=cohort_id, n=nrow(d), n_events=sum(d$event), n_genes=sc$n_genes,
       c_index=unname(ci$c.index), c_index_lower=unname(ci$lower), c_index_upper=unname(ci$upper),
       c_index_p=unname(ci$p.value),
       hr_per_1sd=unname(cx$conf.int["lpz","exp(coef)"]),
       hr_lower=unname(cx$conf.int["lpz","lower .95"]), hr_upper=unname(cx$conf.int["lpz","upper .95"]),
       hr_p=unname(cx$coefficients["lpz","Pr(>|z|)"]))
}

esets <- MetaGxOvarian::loadOvarianEsets()[[1]]
cohorts <- c("TCGAOVARIAN","GSE9891","GSE32062","GSE49997")  # multiple independent cohorts

results <- list()
for (pn in names(panels)) {
  per_cohort <- list()
  for (cid in cohorts) {
    r <- tryCatch(eval_panel_cohort(esets[[cid]], panels[[pn]]$genes, cid),
                  error=function(e) list(cohort_id=cid, error=conditionMessage(e)))
    per_cohort[[cid]] <- r
  }
  # replication logic: signal present (C-index CI excludes 0.5) in >=2 independent cohorts, same direction
  sig <- sapply(per_cohort, function(r) !is.null(r$c_index_lower) && r$c_index_lower > 0.5)
  dir_up <- sapply(per_cohort, function(r) !is.null(r$hr_per_1sd) && r$hr_per_1sd > 1)
  replicates <- sum(sig & dir_up, na.rm=TRUE) >= 2 || sum(sig & !dir_up, na.rm=TRUE) >= 2
  results[[pn]] <- list(
    panel = pn, source = panels[[pn]]$src, n_genes_panel = length(panels[[pn]]$genes),
    per_cohort = per_cohort,
    replicates_across_independent = replicates,
    status = if (replicates) "candidate_replicated_discovery" else "discovery_only",
    status_note = "W4 is a DISCOVERY scan of our own panels; even 'candidate_replicated' stays discovery-only until formally frozen + prospectively externally validated."
  )
}

out <- list(
  analysis = "w4_baseline_discovery_scan",
  purpose = "Quantify prognostic signal of our OWN validated in-repo gene panels across independent OV cohorts; seed subsystem with our features, honestly flagged.",
  cohorts = cohorts,
  panels = results,
  global_caveat = "All W4 results are DISCOVERY-ONLY. Unsupervised mean-z panel scores, not outcome-fitted models. No panel here is a validated prognostic biomarker.",
  seed = 7
)
write_json(out, OUT, auto_unbox=TRUE, pretty=TRUE, digits=6, na="null")
cat("Wrote", OUT, "\n")
for (pn in names(results)) cat(pn, "-> replicates:", results[[pn]]$replicates_across_independent, "\n")
