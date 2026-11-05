#!/usr/bin/env python3
"""
Serial-SAE pipeline - Step 4: merge QDNAseq breakpoint counts back into the ledger.

Takes breakpoints_per_sample.csv (from 02_qdnaseq_breakpoints.R) + the subject ledger,
matches dx/relapse samples per subject, computes breakpoint_delta, and assigns a PROVISIONAL
architecture_signature using a transparent delta-based rule calibrated to the 5 pilot pairs.

IMPORTANT — the architecture_signature cutoffs are PROVISIONAL. They are the simplest monotonic
rule consistent with the 5 already-computed pairs (deltas -7, 18, 60, 101, 253). With only 5
points the exact boundaries are under-determined; if the source study defines the signature by a
different criterion (e.g. absolute relapse breakpoint burden, or a segmentation-based dispersion
metric), pass --signature-rule none and assign it yourself. This script does NOT decide the
biology; it fills a transparent placeholder and flags it.

It also validates a platinum_status column if present (does NOT create one).

USAGE:
    python3 04_fill_ledger.py --ledger subject_ledger.csv \
        --breakpoints /data/qdnaseq/breakpoints_per_sample.csv \
        --out subject_ledger_FILLED.csv
"""
import argparse, csv, sys

# PROVISIONAL cutoffs — consistent with pilot pairs (subj 109=-7 modest, 119=18 intermediate,
# 260/6/191 = 60/101/253 dispersed). Documented, overridable.
def assign_signature(delta):
    if delta is None:
        return ""
    if delta >= 50:
        return "dispersed_stochastic_CIN"
    if delta >= 10:
        return "intermediate_rearrangement"
    return "modest_gain"

def load_breakpoints(path):
    m = {}
    with open(path) as fh:
        for r in csv.DictReader(fh):
            # QDNAseq sample name usually derives from BAM filename; map by exact 'sample'
            m[r["sample"].strip()] = int(float(r["breakpoints"]))
    return m

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", required=True)
    ap.add_argument("--breakpoints", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--signature-rule", choices=["delta", "none"], default="delta",
                    help="'delta' = provisional delta-based label; 'none' = leave blank for manual assignment")
    args = ap.parse_args()

    bpt = load_breakpoints(args.breakpoints)
    rows = list(csv.DictReader(open(args.ledger)))
    hdr = rows[0].keys() if rows else []

    n_filled, n_missing, unresolved = 0, 0, []
    for r in rows:
        dx_s = (r.get("dx_sample") or "").strip()
        rl_s = (r.get("relapse_sample") or "").strip()
        dxb = bpt.get(dx_s)
        rlb = bpt.get(rl_s)
        if dxb is not None:
            r["dx_breakpoints"] = dxb
        if rlb is not None:
            r["relapse_breakpoints"] = rlb
        if dxb is not None and rlb is not None:
            delta = rlb - dxb
            r["breakpoint_delta"] = delta
            if args.signature_rule == "delta":
                r["architecture_signature"] = assign_signature(delta)
            r["cn_status"] = "COMPUTED_QDNAseq_hg19_30kb"
            n_filled += 1
        else:
            n_missing += 1
            if not dx_s or dx_s not in bpt:
                unresolved.append((r["subject"], "dx", dx_s))
            if not rl_s or rl_s not in bpt:
                unresolved.append((r["subject"], "relapse", rl_s))

    with open(args.out, "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=list(hdr))
        w.writeheader()
        w.writerows(rows)

    print(f"[fill] {n_filled} pairs filled, {n_missing} pairs missing a breakpoint match.")
    if args.signature_rule == "delta":
        print("[fill] architecture_signature assigned by PROVISIONAL delta rule "
              "(>=50 dispersed_stochastic_CIN, 10-49 intermediate_rearrangement, <10 modest_gain). "
              "Override with --signature-rule none if the source definition differs.")
    if unresolved:
        print(f"[fill] {len(unresolved)} unresolved sample->breakpoint matches (first 10):", file=sys.stderr)
        for subj, side, s in unresolved[:10]:
            print(f"        subject {subj} {side} sample '{s}' not in breakpoints file", file=sys.stderr)

    # validate platinum_status if present
    labels = [(r.get("platinum_status") or "").strip().lower() for r in rows]
    present = [x for x in labels if x]
    if present:
        vocab = {"resistant", "sensitive"}
        bad = sorted({x for x in present if x not in vocab})
        n_res = present.count("resistant"); n_sen = present.count("sensitive")
        print(f"[labels] platinum_status present on {len(present)} subjects: {n_res} resistant / {n_sen} sensitive.")
        if bad:
            print(f"[labels] ERROR: out-of-vocabulary values {bad}; expected only resistant/sensitive.", file=sys.stderr)
            sys.exit(2)
        # power-gate preview (matches 03_resistance_association thresholds)
        n_delta = sum(1 for r in rows if str(r.get("breakpoint_delta") or "").strip() not in ("", "None"))
        if n_delta >= 40 and n_res >= 15 and n_sen >= 15:
            print(f"[labels] power gate: PASS preview ({n_delta} deltas, {n_res}/{n_sen}) -> step 03 can run.")
        else:
            print(f"[labels] power gate: UNDERPOWERED preview ({n_delta} deltas, {n_res}/{n_sen}); "
                  "step 03 will return discovery_only until >=40 deltas and >=15 per group.")
    else:
        print("[labels] no platinum_status column populated yet. Add it (resistant/sensitive) before step 03.")

if __name__ == "__main__":
    main()
