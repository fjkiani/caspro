"""
Backfill RSS-sensitive MoA tags for ATRi + gemcitabine trials.

RS-sensitive trials are those where the Konstantinopoulos 2021 (PMID 34552099)
RS biomarker stratification applies — specifically ATRi trials that use
gemcitabine as the backbone (where RS-High patients respond to gem alone
and RS-Low patients need the ATRi addition).

NOT applied to: ceralasertib + olaparib, ceralasertib + immunotherapy —
these have different mechanisms and RS stratification from PMID 34552099
does not directly transfer.

Run:
    python3 scripts/backfill_rss_tags.py
"""
import sqlite3, json, os, sys

DB = os.path.join(os.path.dirname(__file__), "..", "data", "clinical_trials.db")

# Trials where PMID 34552099 RS stratification applies.
# All NCT IDs verified present in DB via sqlite query 2026-02-21.
RSS_SENSITIVE_TRIALS = {
    "NCT02595892",  # Berzosertib + gemcitabine — Phase 2 (primary trial of PMID 34552099)
    "NCT02627443",  # Berzosertib + carboplatin + gemcitabine — Phase 1
    "NCT04491942",  # Elimusertib (BAY 1895344) + cisplatin/gemcitabine — Phase 1/2
    "NCT04616534",  # Elimusertib + gemcitabine — ovarian + pancreatic — Phase 1/2
}

NEW_TAG = "rss_sensitive"


def backfill(dry_run: bool = False) -> None:
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    updated = []
    skipped = []
    not_found = []

    for nct_id in RSS_SENSITIVE_TRIALS:
        row = con.execute(
            "SELECT id, title, moa_tags FROM trials WHERE id = ?", (nct_id,)
        ).fetchone()

        if not row:
            not_found.append(nct_id)
            print(f"  NOT FOUND: {nct_id}")
            continue

        current_tags = json.loads(row["moa_tags"] or "[]")
        if NEW_TAG in current_tags:
            skipped.append(nct_id)
            print(f"  SKIP (already tagged): {nct_id} — {row['title'][:55]}")
            continue

        new_tags = current_tags + [NEW_TAG]
        if not dry_run:
            con.execute(
                "UPDATE trials SET moa_tags = ? WHERE id = ?",
                (json.dumps(new_tags), nct_id),
            )
        updated.append(nct_id)
        print(f"  {'DRY-RUN ' if dry_run else ''}TAGGED: {nct_id} — {row['title'][:55]}")
        print(f"    tags: {current_tags} → {new_tags}")

    if not dry_run:
        con.commit()
    con.close()

    print(f"\nSummary: updated={len(updated)} skipped={len(skipped)} not_found={len(not_found)}")
    if not_found:
        print(f"WARNING: NCT IDs not in DB: {not_found}")


if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    print(f"\n{'DRY RUN — ' if dry_run else ''}Backfilling rss_sensitive tags\n")
    backfill(dry_run=dry_run)
