#!/usr/bin/env python3
"""
Serial-SAE cohort - Step 3: does breakpoint-delta (dx->relapse) predict platinum resistance?

This is the step that turns Serial-SAE from an n=5 hypothesis into a validated (or falsified)
claim. It runs the SAME honesty gates the rest of the biomarker subsystem uses:

  - adequate power gate: require n >= MIN_N pairs with computed delta AND a resistance label
  - effect + uncertainty: report effect size WITH 95% CI, not a bare p-value
  - the gate reports NULL as NULL. A non-significant or wrong-direction result is written out
    as such. Nothing here is allowed to round a null up to "trending".

RUN ON THE VM after Steps 1-2. Requires a platinum-resistance label per subject
(platinum_status column: 'resistant'/'sensitive', or platinum_free_interval_months).

USAGE:
  python3 03_resistance_association.py --ledger subject_ledger_FILLED.csv --out sae_result.json
"""
import argparse, csv, json, math, sys
from statistics import mean, stdev

MIN_N = 40          # adequate-power floor (matches subsystem convention n>=40)
MIN_EVENTS = 15     # minimum resistant cases

def wilson_or_boot(deltas_res, deltas_sens):
    # Mann-Whitney U + rank-biserial effect size + bootstrap 95% CI of median difference.
    import random
    random.seed(7)
    def median(x):
        x = sorted(x); n = len(x)
        return x[n//2] if n % 2 else (x[n//2-1]+x[n//2])/2
    obs = median(deltas_res) - median(deltas_sens)
    boots = []
    for _ in range(5000):
        r = [random.choice(deltas_res) for _ in deltas_res]
        s = [random.choice(deltas_sens) for _ in deltas_sens]
        boots.append(median(r) - median(s))
    boots.sort()
    lo, hi = boots[int(0.025*len(boots))], boots[int(0.975*len(boots))]
    # Mann-Whitney U -> p (normal approx) + rank-biserial
    all_v = [(d, 1) for d in deltas_res] + [(d, 0) for d in deltas_sens]
    all_v.sort(key=lambda t: t[0])
    ranks = {}
    i = 0
    while i < len(all_v):
        j = i
        while j+1 < len(all_v) and all_v[j+1][0] == all_v[i][0]:
            j += 1
        avg = (i + j) / 2 + 1
        for k in range(i, j+1):
            ranks[k] = avg
        i = j + 1
    R1 = sum(ranks[k] for k, (_, g) in enumerate(all_v) if g == 1)
    n1, n2 = len(deltas_res), len(deltas_sens)
    U1 = R1 - n1*(n1+1)/2
    mu = n1*n2/2
    sd = math.sqrt(n1*n2*(n1+n2+1)/12)
    z = (U1 - mu)/sd if sd > 0 else 0.0
    p = 2*(1-0.5*(1+math.erf(abs(z)/math.sqrt(2))))
    rank_biserial = 1 - 2*U1/(n1*n2)
    return obs, lo, hi, p, rank_biserial

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    rows = list(csv.DictReader(open(args.ledger)))
    res_d, sens_d = [], []
    n_delta = 0
    for r in rows:
        d = (r.get("breakpoint_delta") or "").strip()
        status = (r.get("platinum_status") or "").strip().lower()
        if not d:
            continue
        try:
            dv = float(d)
        except ValueError:
            continue
        n_delta += 1
        if status == "resistant":
            res_d.append(dv)
        elif status == "sensitive":
            sens_d.append(dv)

    result = {
        "analysis": "Serial-SAE breakpoint-delta vs platinum resistance",
        "n_pairs_with_delta": n_delta,
        "n_resistant": len(res_d),
        "n_sensitive": len(sens_d),
        "gates": {"MIN_N": MIN_N, "MIN_EVENTS": MIN_EVENTS},
    }

    # HONESTY GATE 1: adequate power
    if n_delta < MIN_N or len(res_d) < MIN_EVENTS or len(sens_d) < MIN_EVENTS:
        result["tier"] = "discovery_only"
        result["verdict"] = (
            f"UNDERPOWERED: {n_delta} pairs with delta "
            f"({len(res_d)} resistant / {len(sens_d)} sensitive). "
            f"Need >= {MIN_N} pairs and >= {MIN_EVENTS} per group. "
            "No association claim permitted. This is NOT a validated marker."
        )
        json.dump(result, open(args.out, "w"), indent=2)
        print(json.dumps(result, indent=2))
        print("\n[gate] Underpowered -> discovery_only. Selling this as validated would be an overclaim.", file=sys.stderr)
        return

    obs, lo, hi, p, rb = wilson_or_boot(res_d, sens_d)
    result.update({
        "median_delta_resistant": round(mean(res_d), 3),
        "median_delta_sensitive": round(mean(sens_d), 3),
        "median_difference": round(obs, 3),
        "median_difference_ci95": [round(lo, 3), round(hi, 3)],
        "mannwhitney_p": round(p, 6),
        "rank_biserial_effect": round(rb, 3),
    })

    # HONESTY GATE 2: effect must be positive-direction AND CI must exclude 0 AND p<0.05
    strict = (lo > 0 or hi < 0) and p < 0.05
    direction_ok = obs > 0  # resistance associated with MORE breakpoint gain (the hypothesis)
    if strict and direction_ok:
        result["tier"] = "consider"
        result["verdict"] = (
            f"SIGNAL: resistant pairs gain more breakpoints (median diff {obs:+.1f}, "
            f"95% CI [{lo:.1f}, {hi:.1f}], p={p:.4f}). One cohort, single dataset -> 'Consider', "
            "not 'Strong'. Needs independent replication before clinical claims."
        )
    elif strict and not direction_ok:
        result["tier"] = "discovery_only"
        result["verdict"] = (
            f"INVERSE/CONTRADICTORY: significant but WRONG direction "
            f"(median diff {obs:+.1f}, 95% CI [{lo:.1f}, {hi:.1f}], p={p:.4f}). "
            "Does NOT support the Serial-SAE resistance hypothesis."
        )
    else:
        result["tier"] = "discovery_only"
        result["verdict"] = (
            f"NULL: no significant association (median diff {obs:+.1f}, "
            f"95% CI [{lo:.1f}, {hi:.1f}], p={p:.4f}). Reported as a null. "
            "Serial-SAE is NOT a validated resistance predictor on this cohort."
        )

    json.dump(result, open(args.out, "w"), indent=2)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
