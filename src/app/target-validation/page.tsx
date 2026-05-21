import { redirect } from 'next/navigation';

/** @deprecated Trial ledger hub — was a mistaken category URL. */
export default function TargetValidationRedirect() {
  redirect('/ledger/');
}
