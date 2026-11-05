#!/usr/bin/env python3
"""
A2 — MBD4-LOF dual-axis therapeutic reframe (Manuscript 00, mechanism model / Fig 5).

Deep chaptered 2D mechanistic animation. All numbers quoted verbatim from the manuscript.
This is a mechanism/pathway diagram, NOT a molecular structure and NOT molecular dynamics.

Story (chapters):
  1. Title
  2. Biology: MBD4 is a BER glycosylase; LOF -> U:G mismatches at CpG accumulate
  3. Convergence: unresolved lesions stall replication forks -> constitutive replication stress
  4. Axis 1 (VALIDATED): cytidine analogs (gemcitabine/cytarabine); isogenic ~10x (IC50 2.3 vs 20.1 nM, P=2.82e-3)
  5. Axis 2 (STRONG): ATR inhibition (ceralasertib); p=0.021, d=-0.50, hardened by 4 stress tests
  6. Removed: PARP axis falsified (PARP1 not upregulated, p=0.605)
  7. Therapeutic implication: cytidine + ATRi combination cohort
  8. Caveats / RUO
Citations on-frame: Chabot et al. 2022 (cytidine SL); this study (ATR, PARP null).
"""
from pathlib import Path
import sys
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import anim_common as ac
import numpy as np

OUT = Path("/mnt/results/manuscript_animations/M00_A2_MBD4_dual_axis_mechanism.gif")
FRAMES = Path("/workspace/afwork/frames/manuscripts/a2")
STILL = Path("/workspace/afwork/a2_laststill.png")
TOTAL_CH = 8


def draw(t):
    fig, ax = ac.new_axes()
    ch = int(t)  # chapter index

    # ---------- CHAPTER 1: title ----------
    if ch == 1:
        ac.draw_banner(ax, "STRONG", "Manuscript 00 — MBD4-LOF therapeutic reframe (dual-axis model)")
        ac.draw_chapter_title(ax, 1, TOTAL_CH,
                              "MBD4 loss: wrong drug class,\nreal vulnerability",
                              "BER glycosylase loss defines an ATR checkpoint state — not a PARP target")
        ac.draw_footer(ax, cite="Alzeeb/CrisPRO MBD4-LOF manuscript")
        return fig

    # persistent banner for content chapters (status shifts per axis chapter)
    status = {2: "FUNCTIONAL EVIDENCE", 3: "FUNCTIONAL EVIDENCE", 4: "VALIDATED",
              5: "CONFOUNDER-HARDENED (STRONG)", 6: "FALSIFIED", 7: "STRONG", 8: "STRONG"}.get(ch, "STRONG")
    sub = {2: "The base-excision-repair defect", 3: "Convergence on the replication fork",
           4: "Axis 1 — cytidine analog synthetic lethality", 5: "Axis 2 — ATR checkpoint inhibition",
           6: "The PARP hypothesis this study removes", 7: "Translational priority",
           8: "Scope & limitations"}.get(ch, "")
    ac.draw_banner(ax, status, sub)

    # ---------- CHAPTER 2: BER defect biology ----------
    if ch == 2:
        ac.rbox(ax, (0.9, 5.4), 3.2, 1.05, "MBD4\nBER glycosylase\n(p.K431Nfs*54, LOF)", ac.CB_RED)
        a = ac.fade(2, t, 2.0, 0.5)
        ac.arrow(ax, (4.1, 5.9), (5.2, 5.9), ac.CB_RED, alpha=a, label="loss of function")
        ac.rbox(ax, (5.3, 5.4), 3.4, 1.05,
                "U:G / T:G mismatches\naccumulate at CpG\n(5-mC deamination)", ac.CB_ORANGE, alpha=max(a,0.05))
        a2 = ac.fade(2, t, 2.5, 0.5)
        ac.rbox(ax, (9.0, 5.4), 2.6, 1.05, "CpG>TpG\nhypermutator\nphenotype", ac.CB_PURPLE, alpha=max(a2,0.05))
        ac.draw_caption(ax, "MBD4 excises T/U from G:T mismatches at methylated CpG sites. Its loss lets base "
                             "lesions accumulate, producing the CpG>TpG hypermutator phenotype of MSI tumors.")
        ac.draw_footer(ax, cite="Hendrich 1999; Bader 1999; Chabot 2022")
        return fig

    # ---------- CHAPTER 3: replication-fork convergence ----------
    if ch == 3:
        ac.rbox(ax, (4.4, 6.0), 3.2, 0.95, "Unresolved base lesions", ac.CB_ORANGE)
        a = ac.fade(3, t, 3.0, 0.5)
        ac.arrow(ax, (6.0, 6.0), (6.0, 5.2), ac.CB_ORANGE, alpha=a, rad=0)
        ac.rbox(ax, (3.9, 4.1), 4.2, 1.05, "REPLICATION FORK STALLING\nconstitutive replication stress",
                ac.CB_BLUE, alpha=max(a,0.05), fontsize=11.5)
        a2 = ac.fade(3, t, 3.5, 0.5)
        ac.arrow(ax, (6.0, 4.1), (6.0, 3.4), ac.CB_BLUE, alpha=a2)
        ac.rbox(ax, (4.3, 2.5), 3.4, 0.85, "ATR checkpoint activation", ac.CB_GREEN, alpha=max(a2,0.05))
        ac.draw_caption(ax, "Both actionable dependencies converge on ONE point of failure: the replication "
                             "fork. Stalled forks from unrepaired base damage drive constitutive ATR signaling.")
        ac.draw_footer(ax, cite="this study — mechanism model")
        return fig

    # ---------- CHAPTER 4: Axis 1 cytidine (VALIDATED) ----------
    if ch == 4:
        ac.rbox(ax, (0.8, 5.6), 3.0, 1.0, "MBD4-LOF cell\n(BER-defective)", ac.CB_RED)
        ac.arrow(ax, (3.8, 6.1), (4.9, 6.1), ac.CB_GREEN, label="synthetic lethal")
        ac.rbox(ax, (5.0, 5.6), 3.3, 1.0, "Cytidine analogs\ngemcitabine / cytarabine", ac.CB_GREEN)
        a = ac.fade(4, t, 4.0, 0.6)
        ac.stat_callout(ax, (0.9, 3.6), "~10\u00d7", "gemcitabine sensitivity\n(isogenic HAP1)", ac.CB_GREEN)
        ac.stat_callout(ax, (4.0, 3.6), "2.3 vs 20.1 nM", "IC50 (KO vs WT)", ac.CB_GREEN, w=3.2, value_fs=14)
        ac.stat_callout(ax, (7.5, 3.6), "P=2.82\u00d710\u207b\u00b3", "isogenic KO + rescue", ac.CB_GREEN, w=3.0, value_fs=14)
        ac.draw_caption(ax, "Axis 1 is the gold standard: MBD4-knockout cells are ~10\u00d7 more sensitive to "
                             "gemcitabine, with re-expression restoring resistance (isogenic KO, rescue, PDX).")
        ac.draw_footer(ax, cite="Chabot et al. 2022")
        return fig

    # ---------- CHAPTER 5: Axis 2 ATR (STRONG, hardened) ----------
    if ch == 5:
        ac.rbox(ax, (0.8, 6.0), 3.0, 0.95, "MBD4-LOF\nreplication stress", ac.CB_BLUE)
        ac.arrow(ax, (3.8, 6.45), (4.9, 6.45), ac.CB_BLUE, label="dependency")
        ac.rbox(ax, (5.0, 6.0), 3.4, 0.95, "ATR inhibitor\nceralasertib (AZD6738)", ac.CB_BLUE)
        ac.stat_callout(ax, (0.9, 4.3), "p=0.021", "ceralasertib LN_IC50\n(n=14 LOF vs 942 WT)", ac.CB_BLUE, value_fs=15)
        ac.stat_callout(ax, (4.0, 4.3), "d=\u22120.50", "effect size (Cohen)", ac.CB_BLUE, value_fs=15)
        ac.stat_callout(ax, (7.2, 4.3), "\u0394=\u22120.74", "log-unit shift to\nsensitivity", ac.CB_BLUE, w=3.0, value_fs=15)
        # four stress tests appear
        a = ac.fade(5, t, 5.0, 0.7)
        tests = ["MSI-H purge\np=0.015 (strengthens)", "TP53-matched\np=0.003, d=\u22120.74",
                 "Leave-one-out\nall 14 significant", "Lineage\nheld across 8 tissues"]
        for i, txt in enumerate(tests):
            ac.rbox(ax, (0.7 + i * 2.85, 2.55), 2.6, 0.9, txt, ac.TINT_GREEN, edgecolor=ac.CB_GREEN,
                    textcolor=ac.INK, alpha=max(a, 0.05), fontsize=8.8)
        ac.draw_caption(ax, "Axis 2: the ATR vulnerability HARDENED under four confounder tests designed to "
                             "break it \u2014 it is not an MSI-H proxy and adds >1 log-unit beyond TP53 status.")
        ac.draw_footer(ax, cite="this study — GDSC2; 4 orthogonal stress tests")
        return fig

    # ---------- CHAPTER 6: PARP falsified ----------
    if ch == 6:
        ac.rbox(ax, (0.8, 5.8), 3.2, 1.0, "MBD4-LOF", ac.CB_RED)
        ac.arrow(ax, (4.0, 6.3), (5.1, 6.3), ac.CB_RED, ls="dashed", label="hypothesized (fails)")
        ac.rbox(ax, (5.2, 5.8), 3.4, 1.0, "PARP1 upregulation\n\u2192 PARPi sensitivity", ac.CB_RED,
                ls="dashed", textcolor="white")
        # big X over the arrow region
        ac.stat_callout(ax, (0.9, 3.7), "p=0.605", "PARP1 expr: LOF vs WT\n(6.77 vs 6.66, ns)", ac.CB_RED, value_fs=16)
        ac.stat_callout(ax, (4.2, 3.7), "\u03c1=\u22120.416", "PARP1 expr \u2192 PARPi\n(pan-cancer, n=481)", ac.CB_PURPLE, w=3.2, value_fs=15)
        a = ac.fade(6, t, 6.0, 0.6)
        ac.rbox(ax, (7.9, 3.7), 3.3, 1.05, "Marker decoupled\nfrom genotype:\nselect on PARP1 expr,\nNOT MBD4 status",
                ac.CB_PURPLE, alpha=max(a,0.05), fontsize=9.2)
        ac.draw_caption(ax, "The PARP hypothesis is FALSIFIED at its origin: MBD4-LOF does not upregulate PARP1 "
                             "(p=0.605). PARP1 expression still predicts PARPi response \u2014 but MBD4 does not create it.")
        ac.draw_footer(ax, cite="this study — DepMap 24Q2; GDSC2")
        return fig

    # ---------- CHAPTER 7: therapeutic implication ----------
    if ch == 7:
        ac.rbox(ax, (4.3, 6.2), 3.4, 0.95, "MBD4-LOF tumor", ac.CB_RED)
        ac.arrow(ax, (5.2, 6.2), (3.0, 5.2), ac.CB_GREEN, rad=0.15)
        ac.arrow(ax, (6.8, 6.2), (9.0, 5.2), ac.CB_BLUE, rad=-0.15)
        ac.rbox(ax, (1.2, 4.2), 3.4, 0.95, "Cytidine analog\n(Axis 1, VALIDATED)", ac.CB_GREEN)
        ac.rbox(ax, (7.4, 4.2), 3.4, 0.95, "ATR inhibitor\n(Axis 2, STRONG)", ac.CB_BLUE)
        a = ac.fade(7, t, 7.0, 0.6)
        ac.arrow(ax, (2.9, 4.2), (5.0, 3.2), ac.CB_GREEN, alpha=a, rad=-0.15)
        ac.arrow(ax, (9.1, 4.2), (7.0, 3.2), ac.CB_BLUE, alpha=a, rad=0.15)
        ac.rbox(ax, (3.9, 2.2), 4.2, 1.0, "PRIORITY:\ncytidine analog / ATR inhibitor\ncombination cohort",
                ac.CB_ORANGE, alpha=max(a,0.05), fontsize=11)
        ac.draw_caption(ax, "Because both axes converge on the replication fork, the priority translational step "
                             "is a cytidine-analog / ATR-inhibitor combination cohort in MBD4-deficient tumors.")
        ac.draw_footer(ax, cite="this study — translational recommendation")
        return fig

    # ---------- CHAPTER 8: caveats ----------
    if ch == 8:
        ac.draw_chapter_title(ax, 8, TOTAL_CH, "Scope & limitations",
                              "A computational study on cell-line pharmacology")
        pts = [
            "\u2022  MBD4-LOF ceralasertib cohort is small (n=14 with GDSC2 data).",
            "\u2022  Zygosity inferred from LikelyLoF annotation, not sequenced.",
            "\u2022  Immunotherapy axis (anti-PD1, CpG>TpG) rests on case-level, not cohort, evidence.",
            "\u2022  PARP null does not exclude non-transcriptional routes to PARPi response.",
            "\u2022  RUO \u2014 not a prescribing recommendation; each limit defines the next experiment.",
        ]
        for i, p in enumerate(pts):
            ax.text(1.4, 3.0 - i * 0.42, p, fontsize=10.4, color=ac.INK)
        ac.draw_footer(ax, cite="this study — Discussion")
        return fig

    # fallback (should not hit)
    ac.draw_chapter_title(ax, ch, TOTAL_CH, "MBD4 dual-axis model")
    return fig


def main():
    # schedule: each chapter gets a hold; content chapters longer to read text/stats
    schedule = []
    holds = {1: 16, 2: 26, 3: 26, 4: 30, 5: 34, 6: 30, 7: 28, 8: 30}
    for ch in range(1, TOTAL_CH + 1):
        n = holds[ch]
        # within a chapter, ramp t from ch..ch+0.99 so fades trigger
        schedule += list(np.linspace(ch, ch + 0.99, n))
    gif, nframes, mb = ac.render_sequence(draw, schedule, FRAMES, OUT, still_path=STILL, duration=0.085)
    print(f"A2 GIF: {gif}  ({mb:.2f} MB, {nframes} frames)")
    print(f"last still: {STILL}")


if __name__ == "__main__":
    main()
