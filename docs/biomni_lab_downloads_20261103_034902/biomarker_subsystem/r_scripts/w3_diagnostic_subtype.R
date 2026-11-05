#!/usr/bin/env Rscript
# W3 — Diagnostic subtype classifier (consensusOV) reproduced across INDEPENDENT
# cohorts. Emits per-cohort subtype distribution, margin/entropy calibration,
# cross-cohort concordance analogue, and an HONEST composition-confound check
# (subtype vs percent_tumor_cells / percent_stromal_cells) per Geistlinger 2020.
.libPaths(c("/workspace/rlib", .libPaths()))  # MUST be first

suppressMessages({
  library(MetaGxOvarian)
  library(consensusOV)
  library(Biobase)
  library(jsonlite)
})
set.seed(7)
OUT <- "/mnt/shared-workspace/shared/biomarker_val/w3_diagnostic_results.json"

# published consensusOV subtype label order: 1=IMR,2=DIF,3=PRO,4=MES
SUBTYPE_LEVELS <- c("IMR_immunoreactive","DIF_differentiated","PRO_proliferative","MES_mesenchymal")

entropy <- function(p) { p <- p[p>0]; -sum(p*log(p))/log(length(p)) }  # normalized 0..1

classify_cohort <- function(es, cohort_id) {
  fd <- fData(es)
  ex <- exprs(es)
  entrez <- as.character(fd$EntrezGene.ID)
  keep <- !is.na(entrez) & entrez != ""
  ex <- ex[keep, , drop=FALSE]; entrez <- entrez[keep]
  # de-duplicate entrez by max variance probe
  if (any(duplicated(entrez))) {
    v <- apply(ex, 1, var, na.rm=TRUE)
    ord <- order(v, decreasing=TRUE)
    ex <- ex[ord, , drop=FALSE]; entrez <- entrez[ord]
    dup <- duplicated(entrez)
    ex <- ex[!dup, , drop=FALSE]; entrez <- entrez[!dup]
  }
  rownames(ex) <- entrez
  cat(cohort_id, ": classifying", ncol(ex), "samples,", nrow(ex), "entrez genes\n")
  # consensusOV needs entrez.ids explicitly when given a raw matrix
  res <- get.subtypes(ex, entrez.ids = as.character(rownames(ex)), method = "consensusOV")
  # res$consensusOV.subtypes = factor; res$rf.probs = probability matrix
  st <- as.character(res$consensusOV.subtypes)
  probs <- res$rf.probs
  # margin = top prob - 2nd prob; entropy of prob row
  marg <- apply(probs, 1, function(r){ s<-sort(r,decreasing=TRUE); s[1]-s[2] })
  ent  <- apply(probs, 1, entropy)
  dist <- as.list(round(prop.table(table(factor(st, levels=levels(res$consensusOV.subtypes)))), 4))
  list(
    cohort_id = cohort_id,
    n = ncol(ex),
    subtype_levels = levels(res$consensusOV.subtypes),
    subtype_distribution = dist,
    mean_margin = round(mean(marg, na.rm=TRUE), 4),
    median_margin = round(median(marg, na.rm=TRUE), 4),
    mean_entropy = round(mean(ent, na.rm=TRUE), 4),
    low_confidence_frac = round(mean(marg < 0.2, na.rm=TRUE), 4),  # ambiguous calls
    subtypes = st,
    margins = as.numeric(marg),
    pdata = pData(es)
  )
}

# composition-confound check: does subtype track tumor/stromal content?
composition_check <- function(cl) {
  pd <- cl$pdata
  st <- factor(cl$subtypes, levels = cl$subtype_levels)
  out <- list()
  for (v in c("percent_tumor_cells","percent_stromal_cells","percent_normal_cells")) {
    if (v %in% colnames(pd)) {
      x <- suppressWarnings(as.numeric(as.character(pd[[v]])))
      ok <- !is.na(x) & !is.na(st)
      if (sum(ok) >= 20 && length(unique(st[ok])) >= 2) {
        # Kruskal-Wallis: is composition var different across subtypes?
        kw <- tryCatch(kruskal.test(x[ok] ~ st[ok]), error=function(e) NULL)
        if (!is.null(kw)) {
          means <- tapply(x[ok], st[ok], mean, na.rm=TRUE)
          out[[v]] <- list(
            n = sum(ok),
            kruskal_p = unname(kw$p.value),
            group_means = as.list(round(means, 2))
          )
        }
      }
    }
  }
  if (length(out) == 0) out <- list(note = "no composition variable with >=20 usable values in this cohort")
  out
}

esets <- MetaGxOvarian::loadOvarianEsets()[[1]]

cohorts <- c("TCGAOVARIAN", "GSE9891")
cls <- list(); comp <- list(); slim <- list()
for (cid in cohorts) {
  cl <- classify_cohort(esets[[cid]], cid)
  cls[[cid]] <- cl
  comp[[cid]] <- composition_check(cl)
  # slim receipt (no per-sample vectors / pdata in JSON headline)
  slim[[cid]] <- cl[c("cohort_id","n","subtype_levels","subtype_distribution",
                      "mean_margin","median_margin","mean_entropy","low_confidence_frac")]
  slim[[cid]]$composition_confound <- comp[[cid]]
}

# cross-cohort concordance analogue: compare subtype PROPORTIONS between cohorts
# (we cannot match patients across different studies, so we test whether the
# subtype *mixture* is stable — a distributional concordance, reported honestly).
props <- sapply(cohorts, function(c) {
  d <- slim[[c]]$subtype_distribution
  sapply(cls[[c]]$subtype_levels, function(k) as.numeric(d[[k]]))
})
rownames(props) <- cls[[cohorts[1]]]$subtype_levels
# total variation distance between the two cohorts' subtype mixtures
tvd <- 0.5 * sum(abs(props[,1] - props[,2]))

out <- list(
  method_id = "consensusOV_diagnostic_ov",
  source_pmid = "30084834",
  source_doi = "10.1158/1078-0432.ccr-18-0784",
  source_note = "consensusOV (Chen et al. 2018 CCR) HGSOC molecular-subtype classifier, run as-published across independent cohorts.",
  classifier = "consensusOV::get.subtypes(method='consensusOV') [random-forest consensus of Helland/Bentink/Verhaak/Konecny]",
  cohorts = slim,
  subtype_mixture_matrix = as.data.frame(props),
  cross_cohort_total_variation_distance = round(tvd, 4),
  concordance_note = paste(
    "Patients are NOT shared across GSE9891 and TCGAOVARIAN (different studies),",
    "so subtype concordance is assessed at the DISTRIBUTIONAL level (total variation",
    "distance between subtype mixtures), not per-patient agreement."),
  composition_caveat = paste(
    "HGSOC transcriptomic subtypes are partly driven by tumor cellular composition",
    "and TME (Geistlinger 2020, Cancer Res; Tanis 2026). Subtype calls are labelled",
    "composition-aware, not intrinsic epithelial subtype. Kruskal-Wallis tests report",
    "whether subtype tracks tumor/stromal content in each cohort."),
  seed = 7
)
write_json(out, OUT, auto_unbox = TRUE, pretty = TRUE, digits = 6, na = "null")
cat("\n=== subtype distributions ===\n"); print(props)
cat("cross-cohort TVD:", round(tvd,4), "\n")
cat("Wrote", OUT, "\n")
