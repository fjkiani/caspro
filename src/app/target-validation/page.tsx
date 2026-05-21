import { redirect } from 'next/navigation';

/** @deprecated Use `/ledger/ceacam5/` — was incorrectly used as a category slug. */
export default function TargetValidationRedirect() {
  redirect('/ledger/ceacam5/');
}
