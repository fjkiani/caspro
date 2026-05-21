import { redirect } from 'next/navigation';

/** @deprecated Use `/ledger/latify/` — was incorrectly used as a category slug. */
export default function MoaRedirect() {
  redirect('/ledger/latify/');
}
