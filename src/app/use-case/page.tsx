import { permanentRedirect } from 'next/navigation';

/** @deprecated Use `/manuscripts/` */
export default function UseCaseListRedirect() {
  permanentRedirect('/manuscripts/');
}
