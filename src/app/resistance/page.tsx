import { redirect } from 'next/navigation';

/** @deprecated Use `/ledger/capri/` — was incorrectly used as a category slug. */
export default function ResistanceRedirect() {
  redirect('/ledger/capri/');
}
