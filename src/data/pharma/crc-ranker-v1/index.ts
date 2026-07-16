import fs from 'node:fs';
import path from 'node:path';
import type { CrcRankerRow, CrcRankerSummary } from './types';
import summaryJson from './crc_ranker_summary_v1.json';

export * from './types';
export { crcRankerReceipt } from './types';

/**
 * Structured summary of the CRC PATH A ranker v1 receipt.
 *
 * This is a *frozen vendored copy* of `data/ranker_results/crc_ranker_summary_v1.json`
 * from fjkiani/Brenus @ c2d90b6. It ships as static build asset so demo pages
 * can render numbers with zero runtime data fetching.
 */
export const crcRankerSummary = summaryJson as unknown as CrcRankerSummary;

/**
 * Lazy per-patient rows. Only call this from a server component / route handler —
 * the CSV is ~137 KB and never belongs in the client bundle.
 */
export function loadCrcRankerRows(): CrcRankerRow[] {
  const csvPath = path.join(
    process.cwd(),
    'src/data/pharma/crc-ranker-v1/crc_ranker_results_v1.csv',
  );
  const raw = fs.readFileSync(csvPath, 'utf8');
  const lines = raw.trim().split(/\r?\n/);
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cells = line.split(',');
    const row: Record<string, string | number> = {};
    header.forEach((h, i) => {
      const v = cells[i];
      // hyphens in column names (e.g. fit_STC-1010) can't be TS identifiers,
      // so normalize with underscores for the typed shape.
      const key = h.replace(/-/g, '_');
      const n = Number(v);
      row[key] = Number.isFinite(n) && v !== '' ? n : v;
    });
    return row as unknown as CrcRankerRow;
  });
}

/** Public path (from `/public`-equivalent) for the vendored figure. */
export const crcRankerFigureAssetPath =
  '/data/pharma/crc-ranker-v1/crc_ranker_figure_v1.png';
