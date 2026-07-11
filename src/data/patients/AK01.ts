/**
 * AK01 · Ovarian HGSOC MBD4-LOF hypermutator (reference demo patient).
 *
 * Thin re-export of the AK bundle that lives in
 * src/data/tumor-board/ak-l1-bundle.ts. Keeping the substrate colocated with
 * the other AK_* consts avoids duplicating 400 lines, and this shim gives the
 * patient registry a stable import path.
 */
export { AK01 } from '../tumor-board/ak-l1-bundle';
