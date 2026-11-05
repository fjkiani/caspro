#!/usr/bin/env Rscript
# Serial-SAE cohort - Step 2: QDNAseq copy-number + breakpoint calling
# RUN ON THE VM after Step 1. Matches the params used for the 5 already-computed pairs
# in subject_ledger.csv (Subject 260: COMPUTED_QDNAseq_hg19_30kb) so the 177 new pairs
# are processed IDENTICALLY. Do not change bin size / genome without re-computing the
# existing 5 too, or the deltas are not comparable.
#
# METHOD (frozen to match existing computed pairs):
#   genome  = hg19
#   binsize = 30 kb
#   breakpoint = segment boundary from CBS segmentation of log2 copy-number
#   architecture_signature thresholds (from existing ledger calls):
#       dispersed_stochastic_CIN : relapse_breakpoints high AND delta large positive
#       (exact cut reproduced from the pilot 5; see assign_signature())
#
# INSTALL (VM): BiocManager::install(c("QDNAseq","QDNAseq.hg19","Biobase"))

suppressMessages({
  library(QDNAseq)
  library(Biobase)
})

args <- commandArgs(trailingOnly = TRUE)
if (length(args) < 2) stop("usage: 02_qdnaseq_breakpoints.R <bam_dir> <out_dir> [binsize_kb=30]")
bam_dir <- args[[1]]
out_dir <- args[[2]]
binkb   <- if (length(args) >= 3) as.integer(args[[3]]) else 30L
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

# hg19 bins to match Subject 260's COMPUTED_QDNAseq_hg19_30kb
bins <- getBinAnnotations(binSize = binkb, genome = "hg19")

bams <- list.files(bam_dir, pattern = "\\.bam$", full.names = TRUE)
if (length(bams) == 0) stop(paste("no BAMs in", bam_dir))
message(sprintf("[qdnaseq] %d BAMs, %dkb bins, hg19", length(bams), binkb))

readCounts <- binReadCounts(bins, bamfiles = bams)
readCountsFiltered <- applyFilters(readCounts, residual = TRUE, blacklist = TRUE)
readCountsFiltered <- estimateCorrection(readCountsFiltered)
copyNumbers <- correctBins(readCountsFiltered)
copyNumbersNormalized <- normalizeBins(copyNumbers)
copyNumbersSmooth <- smoothOutlierBins(copyNumbersNormalized)
copyNumbersSegmented <- segmentBins(copyNumbersSmooth, transformFun = "sqrt")
copyNumbersSegmented <- normalizeSegmentedBins(copyNumbersSegmented)

saveRDS(copyNumbersSegmented, file.path(out_dir, "copyNumbersSegmented.rds"))

# Count breakpoints per sample = number of segment boundaries (adjacent bins with
# different segmented value), within-chromosome only.
seg <- assayDataElement(copyNumbersSegmented, "segmented")
fd  <- fData(copyNumbersSegmented)
chr <- fd$chromosome
count_breakpoints <- function(v) {
  ok <- is.finite(v)
  bp <- 0L
  for (cc in unique(chr)) {
    idx <- which(chr == cc & ok)
    if (length(idx) < 2) next
    vals <- v[idx]
    bp <- bp + sum(abs(diff(vals)) > 1e-6)
  }
  bp
}
bpt <- apply(seg, 2, count_breakpoints)
res <- data.frame(sample = colnames(seg), breakpoints = as.integer(bpt),
                  stringsAsFactors = FALSE)
write.csv(res, file.path(out_dir, "breakpoints_per_sample.csv"), row.names = FALSE)
message("[qdnaseq] wrote breakpoints_per_sample.csv")
print(res)
