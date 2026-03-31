"""
LATIFY Receipt — NCT05450692 (Ceralasertib + Durvalumab)
Uses identical engine logic as retroactive_prediction_run.py.
Reads TAG_VECTORS directly from that module — no hardcoding.
Reads LATIFY moa_tags directly from data/clinical_trials.db.
Outputs a JSON receipt to ../publications/01-metastasis-interception/data/fda_predictions/latify_curl_receipts.json
"""
import sys, os, json, math, sqlite3
from pathlib import Path

# ── Import engine from production script ─────────────────────────────────────
sys.path.insert(0, str(Path(__file__).parent))
from retroactive_prediction_run import (
    TAG_VECTORS, AXES, tags_to_vector, l2_normalize, cosine_sim, score_trials
)

# ── DB ────────────────────────────────────────────────────────────────────────
DB = Path(__file__).parent.parent / "data" / "clinical_trials.db"
con = sqlite3.connect(DB)
con.row_factory = sqlite3.Row

# ── 1. Fetch LATIFY from DB ───────────────────────────────────────────────────
row = con.execute("SELECT id, title, moa_tags FROM trials WHERE id='NCT05450692'").fetchone()
if not row:
    print("ERROR: NCT05450692 not found in DB")
    sys.exit(1)

latify_tags = json.loads(row["moa_tags"] or "[]")
latify_vec  = tags_to_vector(latify_tags)
print(f"Trial:  {row['id']} — {row['title'][:70]}")
print(f"Tags:   {latify_tags}")
print(f"Vector: {dict(zip(AXES, latify_vec))}")

# ── 2. Patient vectors (from published LATIFY biology) ────────────────────────
# RESPONDER: STK11-loss + KEAP1-loss + KRAS-mutant NSCLC
# DDR-burdened (DNA damage accumulation from STK11 loss),
# IO-warm (not yet exhausted, responds to durvalumab)
RESPONDER_DICT = {
    "ddr": 0.80, "mapk": 0.70, "pi3k": 0.10, "vegf": 0.10,
    "her2": 0.00, "io": 0.75, "efflux": 0.10, "rss": 0.00
}
# NON-RESPONDER: STK11-intact, IO-warm, post-ICI
# DDR-intact, weak ATR dependency, IO already exhausted
NON_RESPONDER_DICT = {
    "ddr": 0.20, "mapk": 0.10, "pi3k": 0.10, "vegf": 0.10,
    "her2": 0.00, "io": 0.20, "efflux": 0.40, "rss": 0.00
}

rv  = [RESPONDER_DICT[ax] for ax in AXES]
nrv = [NON_RESPONDER_DICT[ax] for ax in AXES]

# ── 3. Score against ALL trials (to get rank) ─────────────────────────────────
all_trials = con.execute("SELECT id, title, moa_tags FROM trials").fetchall()
all_rows = [dict(r) for r in all_trials]

ranked_r  = score_trials(rv,  all_rows)
ranked_nr = score_trials(nrv, all_rows)

def rank_and_score(ranked, trial_id):
    for i, t in enumerate(ranked, 1):
        if t["id"] == trial_id:
            return i, t["score"]
    return None, None

r_rank,  r_score  = rank_and_score(ranked_r,  "NCT05450692")
nr_rank, nr_score = rank_and_score(ranked_nr, "NCT05450692")
delta = round(r_score - nr_score, 4)

print(f"\nRESULTS:")
print(f"  Responder    score={r_score:.4f}  rank=#{r_rank}")
print(f"  Non-responder score={nr_score:.4f}  rank=#{nr_rank}")
print(f"  delta_fit = {r_score:.4f} - {nr_score:.4f} = +{delta:.4f}")

# ── 4. Write receipt ──────────────────────────────────────────────────────────
out_dir = Path(__file__).parent.parent.parent.parent / \
    "publications/01-metastasis-interception/data/fda_predictions"
out_dir.mkdir(parents=True, exist_ok=True)
out_path = out_dir / "latify_curl_receipts.json"

receipt = {
    "trial": "LATIFY — NCT05450692 (ceralasertib + durvalumab)",
    "computation_date": "2026-02-22",
    "validated_by": "CrisPRO retroactive_prediction_run.py engine (sqlite3 + cosine_sim)",
    "engine_source": "scripts/retroactive_prediction_run.py — same TAG_VECTORS, same score_trials(), same l2_normalize()",
    "db_source": str(DB),
    "latify_tags_from_db": latify_tags,
    "latify_trial_vector": dict(zip(AXES, latify_vec)),
    "responder_vector": RESPONDER_DICT,
    "non_responder_vector": NON_RESPONDER_DICT,
    "responder_biology": "STK11-loss + KEAP1-loss + KRAS-mutant NSCLC — DDR-burdened, IO-warm",
    "non_responder_biology": "STK11-intact + IO-warm + post-ICI NSCLC — DDR-intact, IO-exhausted",
    "cosine_sim_responder": r_score,
    "responder_rank": r_rank,
    "cosine_sim_non_responder": nr_score,
    "non_responder_rank": nr_rank,
    "n_trials_scored": len([t for t in ranked_r]),
    "delta_fit": delta,
    "delta_fit_formatted": f"+{delta:.3f}",
    "note": "Cosine similarity computed using production engine logic. Used as delta_fit in MANUSCRIPT.md Discussion — Two-Layer Drug Failure Prediction section."
}

with open(out_path, "w") as f:
    json.dump(receipt, f, indent=2)
print(f"\nReceipt written: {out_path}")
print(json.dumps({
    "delta_fit": delta,
    "delta_fit_formatted": f"+{delta:.3f}",
    "responder_score": r_score,
    "responder_rank": r_rank,
    "non_responder_score": nr_score,
    "non_responder_rank": nr_rank
}, indent=2))
