import { TRIAL_CASE_FILES, HAND_AUTHORED_TRIAL_IDS, type TrialCaseFile } from './trial-case-files';

const TRIAL_LABELS: Record<string, string> = {
  latify: 'LATIFY',
  ceacam5: 'CEACAM5',
  adavosertib: 'ADAVOSERTIB',
  capri: 'CAPRI',
  berzosertib: 'BERZOSERTIB',
};

function receiptNavDesc(t: TrialCaseFile): string {
  const combo = t.drugLine.includes('//') ? t.drugLine.split('//')[0]!.trim() : t.drug;
  return `${t.trialId} · ${combo} · ${t.cancer}`;
}

export type TrialReceiptNavItem = {
  id: string;
  label: string;
  desc: string;
};

/** Trial receipts dropdown — copy is generated from trial-case-files only. */
export const TRIAL_RECEIPT_NAV: TrialReceiptNavItem[] = HAND_AUTHORED_TRIAL_IDS.map((id) => ({
  id,
  label: TRIAL_LABELS[id] ?? id.toUpperCase(),
  desc: receiptNavDesc(TRIAL_CASE_FILES[id]),
}));
